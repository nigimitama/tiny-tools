export class FormatError extends Error {
  line?: number
  column?: number
  preview?: string

  constructor(
    message: string,
    line?: number,
    column?: number,
    preview?: string
  ) {
    super(message)
    this.name = "FormatError"
    this.line = line
    this.column = column
    this.preview = preview
  }
}

function extractErrorInfo(input: string, error: SyntaxError): FormatError {
  const message = error.message

  // エラー位置を特定
  const positionMatch = message.match(/position (\d+)/)
  if (!positionMatch) {
    return new FormatError(message)
  }

  const position = parseInt(positionMatch[1], 10)

  // エラーが発生した行と列を計算
  const lines = input.slice(0, position).split("\n")
  const line = lines.length
  const column = lines[lines.length - 1].length + 1

  // エラー箇所の前後のコンテキストを抽出
  const allLines = input.split("\n")
  const startLine = Math.max(0, line - 2)
  const endLine = Math.min(allLines.length, line + 2)
  const preview = allLines
    .slice(startLine, endLine)
    .map((l, i) => {
      const lineNum = startLine + i + 1
      const marker = lineNum === line ? "> " : "  "
      return `${marker}${lineNum}: ${l}${
        lineNum === line ? "\n  " + " ".repeat(column) + "^" : ""
      }`
    })
    .join("\n")

  return new FormatError(message, line, column, preview)
}

export function formatJson(input: string, indent: number): string {
  try {
    // 入力が空の場合は早期リターン
    if (!input.trim()) {
      return ""
    }

    // 文字列をパースしてJSONオブジェクトに変換
    const parsed = JSON.parse(input)
    // 整形して文字列に戻す
    return JSON.stringify(parsed, null, indent)
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw extractErrorInfo(input, error)
    }
    throw error
  }
}

export function formatPythonDict(input: string, indent: number): string {
  try {
    // 入力が空の場合は早期リターン
    if (!input.trim()) {
      return ""
    }

    // Python dictの文字列をJSONに変換
    const jsonString = input
      .replace(/'/g, '"') // シングルクォートをダブルクォートに変換
      .replace(/True/g, "true") // Python の True を JavaScript の true に変換
      .replace(/False/g, "false") // Python の False を JavaScript の false に変換
      .replace(/None/g, "null") // Python の None を JavaScript の null に変換

    try {
      // JSONとしてパースして整形
      const parsed = JSON.parse(jsonString)

      // JavaScriptオブジェクトをPython dict形式の文字列に変換
      return JSON.stringify(parsed, null, indent)
        .replace(/"([^"]+)":/g, "'$1':") // キーをシングルクォートに変換
        .replace(/: "([^"]+)"/g, ": '$1'") // 値をシングルクォートに変換
        .replace(/true/g, "True") // JavaScript の true を Python の True に変換
        .replace(/false/g, "False") // JavaScript の false を Python の False に変換
        .replace(/null/g, "None") // JavaScript の null を Python の None に変換
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Python dictからJSONに変換した後のエラーなので、
        // 元のPython dictの対応する位置を計算して表示
        throw extractErrorInfo(input, error)
      }
      throw error
    }
  } catch (error) {
    if (error instanceof FormatError) {
      throw error
    }
    throw new Error("Invalid Python dict format")
  }
}
