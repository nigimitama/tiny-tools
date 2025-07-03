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
  buttonsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: tokens.spacingVerticalM,
    margin: "2em",
  },
  outputContainer: {
    margin: "2em",
  },
  outputBox: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    fontFamily: `'JetBrains Mono', 'Cascadia Code', 'Source Code Pro', 'Fira Code', 'Consolas', 'Menlo', 'Monaco', 'Courier New', monospace`,
    fontSize: tokens.fontSizeBase200,
    minHeight: "2em",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    marginBottom: tokens.spacingVerticalS,
  },
  outputLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalXS,
  },
})

const CaseConverter = () => {
  const styles = useStyles()
  const [input, setInput] = useState("")
  const [outputs, setOutputs] = useState<{[key: string]: string}>({})

  const toCamelCase = (str: string) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    }).replace(/\s+/g, '')
  }

  const toPascalCase = (str: string) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
      return word.toUpperCase()
    }).replace(/\s+/g, '')
  }

  const toSnakeCase = (str: string) => {
    return str.replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_')
  }

  const toKebabCase = (str: string) => {
    return str.replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('-')
  }

  const toConstantCase = (str: string) => {
    return toSnakeCase(str).toUpperCase()
  }

  const toDotCase = (str: string) => {
    return str.replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('.')
  }

  const toPathCase = (str: string) => {
    return str.replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('/')
  }

  const toSentenceCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
    })
  }

  const convertAll = () => {
    if (!input.trim()) {
      setOutputs({})
      return
    }

    setOutputs({
      camelCase: toCamelCase(input),
      pascalCase: toPascalCase(input),
      snakeCase: toSnakeCase(input),
      kebabCase: toKebabCase(input),
      constantCase: toConstantCase(input),
      dotCase: toDotCase(input),
      pathCase: toPathCase(input),
      lowercase: input.toLowerCase(),
      uppercase: input.toUpperCase(),
      sentenceCase: toSentenceCase(input),
      titleCase: toTitleCase(input),
    })
  }

  const clear = () => {
    setInput("")
    setOutputs({})
  }

  const caseTypes = [
    { key: 'camelCase', label: 'camelCase', example: 'helloWorld' },
    { key: 'pascalCase', label: 'PascalCase', example: 'HelloWorld' },
    { key: 'snakeCase', label: 'snake_case', example: 'hello_world' },
    { key: 'kebabCase', label: 'kebab-case', example: 'hello-world' },
    { key: 'constantCase', label: 'CONSTANT_CASE', example: 'HELLO_WORLD' },
    { key: 'dotCase', label: 'dot.case', example: 'hello.world' },
    { key: 'pathCase', label: 'path/case', example: 'hello/world' },
    { key: 'lowercase', label: 'lowercase', example: 'hello world' },
    { key: 'uppercase', label: 'UPPERCASE', example: 'HELLO WORLD' },
    { key: 'sentenceCase', label: 'Sentence case', example: 'Hello world' },
    { key: 'titleCase', label: 'Title Case', example: 'Hello World' },
  ]

  return (
    <>
      <h2 style={{ margin: 0 }}>Case Converter</h2>
      
      <Field label="Input Text" style={{ margin: "2em" }}>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert case (e.g., 'hello world', 'HelloWorld', 'hello_world')"
          style={{ minHeight: "6em" }}
          className={styles.codeFont}
          resize="vertical"
        />
      </Field>

      <div className={styles.buttonsContainer}>
        <Button appearance="primary" onClick={convertAll}>
          Convert All Cases
        </Button>
        <Button onClick={clear}>
          Clear
        </Button>
      </div>

      {Object.keys(outputs).length > 0 && (
        <div className={styles.outputContainer}>
          <h3>Results</h3>
          {caseTypes.map(({ key, label, example }) => (
            <div key={key}>
              <div className={styles.outputLabel}>
                {label} <span style={{ color: tokens.colorNeutralForeground3 }}>({example})</span>
              </div>
              <div className={styles.outputBox}>
                {outputs[key] || ''}
              </div>
              {outputs[key] && <CopyButton text={outputs[key]} />}
            </div>
          ))}
        </div>
      )}

      <div style={{ margin: "2em", padding: "1em", backgroundColor: tokens.colorNeutralBackground2, borderRadius: tokens.borderRadiusMedium }}>
        <h3>About Case Conversion</h3>
        <p>This tool converts text between different naming conventions commonly used in programming:</p>
        <ul>
          <li><strong>camelCase:</strong> First word lowercase, subsequent words capitalized</li>
          <li><strong>PascalCase:</strong> All words capitalized, no spaces</li>
          <li><strong>snake_case:</strong> All lowercase, words separated by underscores</li>
          <li><strong>kebab-case:</strong> All lowercase, words separated by hyphens</li>
          <li><strong>CONSTANT_CASE:</strong> All uppercase, words separated by underscores</li>
          <li><strong>dot.case:</strong> All lowercase, words separated by dots</li>
          <li><strong>path/case:</strong> All lowercase, words separated by slashes</li>
        </ul>
      </div>
    </>
  )
}

export default CaseConverter