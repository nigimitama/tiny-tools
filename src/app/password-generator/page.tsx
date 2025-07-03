"use client"

import { useState } from "react"
import {
  Field,
  Checkbox,
  SpinButton,
  Button,
  makeStyles,
  tokens,
} from "@fluentui/react-components"
import CopyButton from "../components/CopyButton"

const useStyles = makeStyles({
  controls: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    margin: "2em",
  },
  optionGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  lengthControl: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  generateButton: {
    alignSelf: "flex-start",
  },
  result: {
    margin: "2em",
  },
  passwordDisplay: {
    fontFamily: `'JetBrains Mono', 'Cascadia Code', 'Source Code Pro', 'Fira Code', 'Consolas', 'Menlo', 'Monaco', 'Courier New', monospace`,
    fontSize: tokens.fontSizeBase400,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    wordBreak: "break-all",
  },
})

const PasswordGenerator = () => {
  const styles = useStyles()
  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [password, setPassword] = useState("")

  const generatePassword = () => {
    let charset = ""
    
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, "")
    }
    
    if (charset === "") {
      alert("At least one character type must be selected")
      return
    }
    
    let result = ""
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    setPassword(result)
  }

  return (
    <>
      <h2 style={{ margin: 0 }}>Password Generator</h2>
      
      <div className={styles.controls}>
        <div className={styles.lengthControl}>
          <span>Length:</span>
          <SpinButton
            value={length}
            min={4}
            max={128}
            onChange={(_, data) => setLength(data.value ?? 12)}
          />
        </div>
        
        <div className={styles.optionGroup}>
          <Checkbox
            checked={includeUppercase}
            onChange={(_, data) => setIncludeUppercase(data.checked ?? false)}
            label="Include uppercase letters (A-Z)"
          />
          <Checkbox
            checked={includeLowercase}
            onChange={(_, data) => setIncludeLowercase(data.checked ?? false)}
            label="Include lowercase letters (a-z)"
          />
          <Checkbox
            checked={includeNumbers}
            onChange={(_, data) => setIncludeNumbers(data.checked ?? false)}
            label="Include numbers (0-9)"
          />
          <Checkbox
            checked={includeSymbols}
            onChange={(_, data) => setIncludeSymbols(data.checked ?? false)}
            label="Include symbols (!@#$%^&*)"
          />
          <Checkbox
            checked={excludeSimilar}
            onChange={(_, data) => setExcludeSimilar(data.checked ?? false)}
            label="Exclude similar characters (i, l, 1, L, o, 0, O)"
          />
        </div>
        
        <Button 
          appearance="primary" 
          onClick={generatePassword}
          className={styles.generateButton}
        >
          Generate Password
        </Button>
      </div>

      {password && (
        <div className={styles.result}>
          <Field label="Generated Password">
            <div className={styles.passwordDisplay}>
              {password}
            </div>
          </Field>
          <CopyButton text={password} />
        </div>
      )}
    </>
  )
}

export default PasswordGenerator