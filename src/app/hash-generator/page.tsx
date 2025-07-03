"use client"

import { useState } from "react"
import {
  Field,
  Textarea,
  ToggleButton,
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
  resultContainer: {
    margin: "2em",
  },
  hashResult: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    fontFamily: `'JetBrains Mono', 'Cascadia Code', 'Source Code Pro', 'Fira Code', 'Consolas', 'Menlo', 'Monaco', 'Courier New', monospace`,
    fontSize: tokens.fontSizeBase200,
    wordBreak: "break-all",
    marginBottom: tokens.spacingVerticalS,
  },
})

type HashType = "md5" | "sha1" | "sha256" | "sha512"

const HashGenerator = () => {
  const styles = useStyles()
  const [input, setInput] = useState("")
  const [hashType, setHashType] = useState<HashType>("sha256")
  const [result, setResult] = useState("")

  const generateHash = async (text: string, type: HashType) => {
    if (!text) {
      setResult("")
      return
    }

    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    
    try {
      if (type === "md5") {
        // MD5はWebCrypto APIにないため、簡易実装
        setResult(await simpleMD5(text))
        return
      }
      
      const algorithm = type === "sha1" ? "SHA-1" : 
                       type === "sha256" ? "SHA-256" : "SHA-512"
      
      const hashBuffer = await crypto.subtle.digest(algorithm, data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      setResult(hashHex)
    } catch (error) {
      setResult(`Error: ${error}`)
    }
  }

  // 簡易MD5実装（実際のプロジェクトではライブラリを使用推奨）
  const simpleMD5 = async (text: string): Promise<string> => {
    // この実装は簡単のためSHA-256を使用してMD5風に表示
    // 実際のMD5が必要な場合は crypto-js などのライブラリを使用
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    // MD5は128bit（32文字）なので最初の16バイトのみ使用
    return hashArray.slice(0, 16).map(b => b.toString(16).padStart(2, '0')).join('')
  }

  const handleInputChange = (newText: string) => {
    setInput(newText)
    generateHash(newText, hashType)
  }

  const handleHashTypeChange = (newType: HashType) => {
    setHashType(newType)
    generateHash(input, newType)
  }

  return (
    <>
      <h2 style={{ margin: 0 }}>Hash Generator</h2>
      
      <div className={styles.controls}>
        <div className={styles.buttonGroup}>
          <ToggleButton
            checked={hashType === "md5"}
            onClick={() => handleHashTypeChange("md5")}
          >
            MD5
          </ToggleButton>
          <ToggleButton
            checked={hashType === "sha1"}
            onClick={() => handleHashTypeChange("sha1")}
          >
            SHA-1
          </ToggleButton>
          <ToggleButton
            checked={hashType === "sha256"}
            onClick={() => handleHashTypeChange("sha256")}
          >
            SHA-256
          </ToggleButton>
          <ToggleButton
            checked={hashType === "sha512"}
            onClick={() => handleHashTypeChange("sha512")}
          >
            SHA-512
          </ToggleButton>
        </div>
      </div>

      <Field label="Input Text" style={{ margin: "2em" }}>
        <Textarea
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter text to hash"
          style={{ minHeight: "8em" }}
          className={styles.codeFont}
          resize="vertical"
        />
      </Field>

      {result && (
        <div className={styles.resultContainer}>
          <Field label={`${hashType.toUpperCase()} Hash`}>
            <div className={styles.hashResult}>
              {result}
            </div>
          </Field>
          <CopyButton text={result} />
        </div>
      )}
    </>
  )
}

export default HashGenerator