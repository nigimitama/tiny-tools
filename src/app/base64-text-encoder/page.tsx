"use client"

import { useState } from "react"
import {
  Field,
  Textarea,
  Button,
  makeStyles,
  tokens,
} from "@fluentui/react-components"
import CopyButton from "../components/CopyButton"

const useStyles = makeStyles({
  codeFont: {
    fontFamily: `'JetBrains Mono', 'Cascadia Code', 'Source Code Pro', 'Fira Code', 'Consolas', 'Menlo', 'Monaco', 'Courier New', monospace`,
  },
  actionButtons: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    margin: "2em",
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
  },
})

const Base64TextEncoder = () => {
  const styles = useStyles()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const encode = () => {
    try {
      setError("")
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
    } catch (err) {
      setError(`Encoding error: ${err}`)
      setOutput("")
    }
  }

  const decode = () => {
    try {
      setError("")
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
    } catch (err) {
      setError(`Decoding error: ${err}`)
      setOutput("")
    }
  }

  const clear = () => {
    setInput("")
    setOutput("")
    setError("")
  }

  const swapInputOutput = () => {
    setInput(output)
    setOutput(input)
    setError("")
  }

  return (
    <>
      <h2 style={{ margin: 0 }}>Base64 Text Encoder</h2>
      
      <Field label="Input" style={{ margin: "2em" }}>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encode or Base64 string to decode"
          style={{ minHeight: "8em" }}
          className={styles.codeFont}
          resize="vertical"
        />
      </Field>

      <div className={styles.actionButtons}>
        <Button appearance="primary" onClick={encode}>
          Encode to Base64
        </Button>
        <Button appearance="secondary" onClick={decode}>
          Decode from Base64
        </Button>
        <Button onClick={swapInputOutput}>
          ↕ Swap
        </Button>
        <Button onClick={clear}>
          Clear
        </Button>
      </div>

      {error && (
        <div style={{ margin: "2em" }}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}

      <Field label="Output" style={{ margin: "2em" }}>
        <Textarea
          value={output}
          style={{ 
            minHeight: "8em",
            ...(error ? { borderColor: tokens.colorPaletteRedBorder1 } : {})
          }}
          className={styles.codeFont}
          resize="vertical"
          readOnly
        />
      </Field>

      {output && !error && <CopyButton text={output} />}

      <div style={{ margin: "2em", padding: "1em", backgroundColor: tokens.colorNeutralBackground2, borderRadius: tokens.borderRadiusMedium }}>
        <h3>About Base64 Encoding</h3>
        <p><strong>Base64</strong> is a binary-to-text encoding scheme that represents binary data in an ASCII string format.</p>
        <p>It&apos;s commonly used for:</p>
        <ul>
          <li>Email attachments (MIME)</li>
          <li>Data URLs (data:image/png;base64,...)</li>
          <li>Basic authentication headers</li>
          <li>Storing binary data in text-based formats like JSON or XML</li>
        </ul>
        <p><strong>Note:</strong> This tool supports UTF-8 text encoding/decoding.</p>
      </div>
    </>
  )
}

export default Base64TextEncoder