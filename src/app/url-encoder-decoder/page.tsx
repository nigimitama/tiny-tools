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
  },
  codeFont: {
    fontFamily: `'JetBrains Mono', 'Cascadia Code', 'Source Code Pro', 'Fira Code', 'Consolas', 'Menlo', 'Monaco', 'Courier New', monospace`,
  },
  actionButtons: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    margin: "2em",
  },
})

type Mode = "url" | "component"

const URLEncoderDecoder = () => {
  const styles = useStyles()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<Mode>("url")

  const encode = () => {
    try {
      const result = mode === "url" ? encodeURI(input) : encodeURIComponent(input)
      setOutput(result)
    } catch (error) {
      setOutput(`Error: ${error}`)
    }
  }

  const decode = () => {
    try {
      const result = mode === "url" ? decodeURI(input) : decodeURIComponent(input)
      setOutput(result)
    } catch (error) {
      setOutput(`Error: ${error}`)
    }
  }

  const clear = () => {
    setInput("")
    setOutput("")
  }

  const swapInputOutput = () => {
    setInput(output)
    setOutput(input)
  }

  return (
    <>
      <h2 style={{ margin: 0 }}>URL Encoder/Decoder</h2>
      
      <div className={styles.controls}>
        <div className={styles.buttonGroup}>
          <ToggleButton
            checked={mode === "url"}
            onClick={() => setMode("url")}
          >
            URL Encode/Decode
          </ToggleButton>
          <ToggleButton
            checked={mode === "component"}
            onClick={() => setMode("component")}
          >
            Component Encode/Decode
          </ToggleButton>
        </div>
      </div>

      <Field label="Input" style={{ margin: "2em" }}>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "url" ? 
            "Enter URL to encode/decode (e.g., https://example.com/path with spaces)" :
            "Enter text to encode/decode as URL component (e.g., hello world & symbols)"
          }
          style={{ minHeight: "8em" }}
          className={styles.codeFont}
          resize="vertical"
        />
      </Field>

      <div className={styles.actionButtons}>
        <Button appearance="primary" onClick={encode}>
          Encode
        </Button>
        <Button appearance="secondary" onClick={decode}>
          Decode
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
          style={{ minHeight: "8em" }}
          className={styles.codeFont}
          resize="vertical"
          readOnly
        />
      </Field>

      {output && <CopyButton text={output} />}

      <div style={{ margin: "2em", padding: "1em", backgroundColor: tokens.colorNeutralBackground2, borderRadius: tokens.borderRadiusMedium }}>
        <h3>About URL Encoding</h3>
        <p><strong>URL Encode/Decode:</strong> Encodes only characters that are not allowed in URLs (spaces, non-ASCII characters, etc.). Preserves URL structure.</p>
        <p><strong>Component Encode/Decode:</strong> Encodes all reserved characters including &, =, ?, #, etc. Use this for query parameters and form data.</p>
      </div>
    </>
  )
}

export default URLEncoderDecoder