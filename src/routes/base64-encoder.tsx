import Layout from "../components/layout";
import { useState } from 'react'
import { Field, Textarea } from "@fluentui/react-components";


type InputProps = {
  result: string,
  setResult: React.Dispatch<React.SetStateAction<string>>
}


const InputArea = ({ result, setResult }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputAreaStyle = {
    padding: "1em",
    margin: "1em",
    background: "#fff",
  }

  const encodeImage = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const reader = new FileReader();
    const items = event.clipboardData.items;
    for (const item of items) {
      if (item.kind == "file") {
        const file = item.getAsFile()
        if (file) {
          reader.readAsDataURL(file)
        }
      }
    }
    reader.addEventListener("load", () => {
      const base64img = reader.result
      if (typeof (base64img) === "string") {
        setResult(base64img)
      }
    })
  }

  return (
    <div style={inputAreaStyle} hidden={result !== ""}>
      <div
        onFocus={() => { setIsFocused(true) }}
        onBlur={() => { setIsFocused(false) }}
        style={{
          outline: 0,
          borderWidth: "5px",
          borderStyle: "dashed",
          borderColor: isFocused ? "steelblue" : "#333",
          color: "gray",
          padding: "0.5em",
        }}
      >
        <div style={{ marginBottom: "0.5em" }}>
          Use `CTRL + V` to paste screenshot
        </div>
        <div
          contentEditable={true}
          style={{
            outline: 0,
            color: "gray",
            minHeight: "100px",
            maxHeight: "200px",
            overflow: "hidden",
            overflowY: "auto",
          }}
          onPaste={(event) => { encodeImage(event) }}
        >
        </div>
      </div>
    </div>
  )
}


type OutputProps = {
  result: string,
}

const OutputArea = ({ result }: OutputProps) => {
  return (
    <div style={{ margin: "1em" }} hidden={result == ""}>
      <h3>Input Image</h3>
      <img src={result}></img>

      <h3 style={{ marginTop: "2em" }}>Result</h3>
      <h4>Text</h4>
      <Field>
        <Textarea
          style={{ width: "100%", minHeight: "10em" }}
          value={result}
          resize="vertical"
        />
      </Field>

      <h4>img tag</h4>
      <Field>
        <Textarea
          style={{ width: "100%", minHeight: "10em" }}
          value={`<img src="${result}">`}
          resize="vertical"
        />
      </Field>

    </div>
  )
}


const Base64ImageEncoder = () => {
  const [result, setResult] = useState("")

  return (
    <Layout>
      <>
        <header>
          <h2 style={{ margin: 0 }}>Base64 Image Encoder</h2>
        </header>
        <main>
          <InputArea result={result} setResult={setResult} />
          <OutputArea result={result} />
        </main>
      </>
    </Layout>
  )
}

export default Base64ImageEncoder