"use client"

import { useState } from "react"
import {
  Field,
  Textarea,
  ToggleButton,
  SpinButton,
  makeStyles,
  tokens,
} from "@fluentui/react-components"
import CopyButton from "../components/CopyButton"
import { formatJson, formatPythonDict } from "./formatter"
import { FormatError } from "./formatter"

const useStyles = makeStyles({
  controls: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    margin: "2em",
    alignItems: "flex-end",
  },
  buttonGroup: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },
  codeFont: {
    fontFamily: `'JetBrains Mono', 'Cascadia Code', 'Source Code Pro', 'Fira Code', 'Consolas', 'Menlo', 'Monaco', 'Courier New', monospace`,
  },
  spinButtonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
  },
})

// サンプルデータを更新
const sampleData = {
  json: `{"sample input": {"id": 12345, "name": "John Doe", "notifications": true, "languages": ["en", "ja", "fr"], "lastLogin": "2024-04-03T10:30:00Z", "settings": null}}`,
  python: `{'sample_input': {'id': 12345, 'name': 'John Doe', 'notifications': True, 'languages': ['en', 'ja', 'fr'], 'last_login': '2024-04-03T10:30:00Z', 'settings': None}}`,
}

type InputProps = {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  mode: "json" | "python"
}

const InputArea = ({ text, setText, mode }: InputProps) => {
  const styles = useStyles()
  return (
    <Field label="Input" style={{ margin: "2em" }}>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={mode === "json" ? '{"key": "value"}' : "{'key': 'value'}"}
        style={{ minHeight: "10em" }}
        className={styles.codeFont}
        resize="vertical"
      />
    </Field>
  )
}

type OutputProps = {
  text: string
  mode: "json" | "python"
  indentSize: number
}

const OutputArea = ({ text, mode, indentSize }: OutputProps) => {
  const styles = useStyles()
  let output = ""
  let error: FormatError | null = null

  try {
    if (mode === "json") {
      output = formatJson(text, indentSize)
    } else {
      output = formatPythonDict(text, indentSize)
    }
  } catch (e) {
    if (e instanceof FormatError) {
      error = e
      output = [
        `Error: ${error.message}`,
        error.line ? `at line ${error.line}, column ${error.column}` : "",
        "",
        "Context:",
        error.preview || "Not available",
      ]
        .filter(Boolean)
        .join("\n")
    } else {
      output = `Error: ${(e as Error).message}`
    }
  }

  return (
    <div style={{ margin: "2em" }}>
      <Field label="Result">
        <Textarea
          value={output}
          style={{
            minHeight: "20em",
            ...(error ? { color: tokens.colorPaletteRedForeground1 } : {}),
          }}
          className={styles.codeFont}
          resize="vertical"
          readOnly
        />
      </Field>
      {!error && <CopyButton text={output} />}
    </div>
  )
}

const JsonFormatter = () => {
  const styles = useStyles()
  const [mode, setMode] = useState<"json" | "python">("json")
  const [input, setInput] = useState(sampleData[mode])
  const [indentSize, setIndentSize] = useState(2)

  // モード切り替え時にサンプルデータも切り替える
  const handleModeChange = (newMode: "json" | "python") => {
    setMode(newMode)
    setInput(sampleData[newMode])
  }

  return (
    <>
      <h2 style={{ margin: 0 }}>JSON/Python Dict Formatter</h2>
      <div className={styles.controls}>
        <div className={styles.buttonGroup}>
          <ToggleButton
            checked={mode === "json"}
            onClick={() => handleModeChange("json")}
          >
            JSON
          </ToggleButton>
          <ToggleButton
            checked={mode === "python"}
            onClick={() => handleModeChange("python")}
          >
            Python Dict
          </ToggleButton>
        </div>

        <div className={styles.spinButtonContainer}>
          <span className={styles.label}>Indent Size</span>
          <SpinButton
            value={indentSize}
            min={1}
            max={8}
            onChange={(_, data) => setIndentSize(data.value ?? 2)}
          />
        </div>
      </div>

      <InputArea text={input} setText={setInput} mode={mode} />
      <OutputArea text={input} mode={mode} indentSize={indentSize} />
    </>
  )
}

export default JsonFormatter
