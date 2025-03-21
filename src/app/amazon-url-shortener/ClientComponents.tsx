"use client"
import { useState } from "react"
import { Field, Textarea } from "@fluentui/react-components"
import CopyButton from "../components/CopyButton"

const shortenUrls = (url: string): string => {
  const urls = url.replace(/http.?:\/\//g, "https://").split("https://")
  return urls
    .filter((url) => url !== "")
    .map((url) => shortenUrl("https://" + url))
    .join("\n")
}

const shortenUrl = (url: string): string | null => {
  const domain = getDomain(url)
  if (domain === null) return null

  const asin = getAsin(url)
  if (asin === null) return null

  return domain + asin
}

const getDomain = (url: string): string | null => {
  const domain = url.match(/http.?:\/\/(www.)?amazon[\w.]+\//g)
  if (Array.isArray(domain)) {
    return domain[0].replace("www.", "").replace(/\/$/g, "")
  }
  return domain
}

const getAsin = (url: string): string | null => {
  let asin
  const isMobile = url.match(/\/gp\/aw\/d\//g) !== null
  if (isMobile) {
    asin = url.match(/\/gp\/aw\/d\/[\d\w]+/g)
  } else {
    url = url.replace(/\/gp\/product\//g, "/dp/").replace("/ASIN/", "/dp/")
    asin = url.match(/\/dp\/[\d\w]+/g)
  }
  if (Array.isArray(asin)) {
    asin = asin[0]
    if (asin.search(/\/$/g) === -1) {
      asin += "/"
    }
  }
  return asin
}

type InputProps = {
  setInput: React.Dispatch<React.SetStateAction<string>>
}

const InputArea = ({ setInput }: InputProps) => {
  return (
    <Field key="output" label="Input" style={{ margin: "2em" }}>
      <Textarea
        onInput={(event: React.FormEvent<HTMLTextAreaElement>) => {
          const inputText = (event.target as HTMLTextAreaElement).value
          setInput(inputText)
        }}
        placeholder="Please paste URL(s) of Amazon here"
        resize="vertical"
      />
    </Field>
  )
}

type OutputProps = {
  input: string
}
const OutputArea = ({ input }: OutputProps) => {
  const output = shortenUrls(input)
  return (
    <div style={{ margin: "2em" }}>
      <Field key="output" label="Result">
        <Textarea
          value={output}
          placeholder="Shortened URL"
          resize="vertical"
        />
      </Field>

      <CopyButton text={output} />
    </div>
  )
}

export const AmazonUrlShortener = () => {
  const [input, setInput] = useState("")

  return (
    <>
      <InputArea setInput={setInput} />
      <OutputArea input={input} />
    </>
  )
}
