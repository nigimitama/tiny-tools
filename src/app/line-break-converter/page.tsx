"use client"

import { useState } from "react"
import {
  Field,
  Textarea,
  ToggleButton,
  Button,
  makeStyles,
  tokens,
} from "@fluentui/react-components"
import CopyButton from "../components/CopyButton"

const useStyles = makeStyles({
  controls: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    margin: "2em",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  buttonGroup: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  codeFont: {
    fontFamily: `'JetBrains Mono', 'Cascadia Code', 'Source Code Pro', 'Fira Code', 'Consolas', 'Menlo', 'Monaco', 'Courier New', monospace`,
  },
  actionButtons: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    margin: "2em",
  },
  infoBox: {
    margin: "2em",
    padding: "1em",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
})

type LineBreakType = "lf" | "crlf" | "cr"

const LineBreakConverter = () => {
  const styles = useStyles()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [targetType, setTargetType] = useState<LineBreakType>("lf")

  const detectLineBreaks = (text: string) => {
    const hasCRLF = text.includes('\r\n')
    const hasLF = text.includes('\n')
    const hasCR = text.includes('\r')
    
    if (hasCRLF) return "CRLF (\\r\\n)"
    if (hasLF) return "LF (\\n)"
    if (hasCR) return "CR (\\r)"
    return "No line breaks detected"
  }

  const convert = () => {
    let result = input
    
    // 最初にCRLFを処理（LFやCRの前に）
    result = result.replace(/\r\n/g, '\n')
    result = result.replace(/\r/g, '\n')
    
    // 目標の改行コードに変換
    switch (targetType) {
      case "crlf":
        result = result.replace(/\n/g, '\r\n')
        break
      case "cr":
        result = result.replace(/\n/g, '\r')
        break
      case "lf":
        // すでにLFに統一されている
        break
    }
    
    setOutput(result)
  }

  const clear = () => {
    setInput("")
    setOutput("")
  }

  const swapInputOutput = () => {
    setInput(output)
    setOutput(input)
  }

  const countLines = (text: string) => {
    if (!text) return 0
    return text.split(/\r\n|\r|\n/).length
  }

  return (
    <>
      <h2 style={{ margin: 0 }}>Line Break Converter</h2>
      
      <div className={styles.controls}>
        <span>Convert to:</span>
        <div className={styles.buttonGroup}>
          <ToggleButton
            checked={targetType === "lf"}
            onClick={() => setTargetType("lf")}
          >
            LF (\n)
          </ToggleButton>
          <ToggleButton
            checked={targetType === "crlf"}
            onClick={() => setTargetType("crlf")}
          >
            CRLF (\r\n)
          </ToggleButton>
          <ToggleButton
            checked={targetType === "cr"}
            onClick={() => setTargetType("cr")}
          >
            CR (\r)
          </ToggleButton>
        </div>
      </div>

      <Field label="Input" style={{ margin: "2em" }}>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text with line breaks to convert"
          style={{ minHeight: "10em" }}
          className={styles.codeFont}
          resize="vertical"
        />
      </Field>

      {input && (
        <div style={{ margin: "2em", fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground2 }}>
          <p>Input info: {countLines(input)} lines, {detectLineBreaks(input)}</p>
        </div>
      )}

      <div className={styles.actionButtons}>
        <Button appearance="primary" onClick={convert}>
          Convert
        </Button>
        <Button onClick={swapInputOutput}>
          ↕ Swap
        </Button>
        <Button onClick={clear}>
          Clear
        </Button>
      </div>

      <Field label="Output" style={{ margin: "2em" }}>
        <Textarea
          value={output}
          style={{ minHeight: "10em" }}
          className={styles.codeFont}
          resize="vertical"
          readOnly
        />
      </Field>

      {output && (
        <div style={{ margin: "2em", fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground2 }}>
          <p>Output info: {countLines(output)} lines, {detectLineBreaks(output)}</p>
        </div>
      )}

      {output && <CopyButton text={output} />}

      <div className={styles.infoBox}>
        <h3>About Line Break Types</h3>
        <ul>
          <li><strong>LF (\n):</strong> Unix/Linux/macOS standard</li>
          <li><strong>CRLF (\r\n):</strong> Windows standard</li>
          <li><strong>CR (\r):</strong> Classic Mac OS (rarely used now)</li>
        </ul>
        <p>This tool helps convert between different line break formats for cross-platform compatibility.</p>
      </div>
    </>
  )
}

export default LineBreakConverter