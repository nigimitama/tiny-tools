"use client"
import { useState } from "react"
import { Field, Textarea } from "@fluentui/react-components"

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
        placeholder="Paste URL(s) of Amazon here"
        resize="vertical"
      />
    </Field>
  )
}

type OutputProps = {
  input: string
}

const OutputArea = ({ input }: OutputProps) => {
  return (
    <Field key="output" label="Result" style={{ margin: "2em" }}>
      <Textarea
        value={shortenUrls(input)}
        placeholder="Shortened URL"
        resize="vertical"
      />
    </Field>
  )
}

const AmazonUrlShortener = () => {
  const [input, setInput] = useState("")

  return (
    <>
      <h2 style={{ margin: 0 }}>Amazon URL Shortener</h2>
      <InputArea setInput={setInput} />
      <OutputArea input={input} />
    </>
  )
}

export default AmazonUrlShortener
