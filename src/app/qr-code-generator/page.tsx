"use client"

import { useState } from "react"
import {
  Field,
  Textarea,
  Button,
  makeStyles,
  tokens,
} from "@fluentui/react-components"

const useStyles = makeStyles({
  controls: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    margin: "2em",
    alignItems: "flex-end",
  },
  qrContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2em",
    padding: "2em",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  qrCode: {
    maxWidth: "100%",
    height: "auto",
  },
})

const QRCodeGenerator = () => {
  const styles = useStyles()
  const [input, setInput] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  const generateQRCode = () => {
    if (!input.trim()) return

    // QR Server APIを使用してQRコードを生成
    const encodedText = encodeURIComponent(input)
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`
    setQrCodeUrl(url)
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return

    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = "qrcode.png"
    link.click()
  }

  return (
    <>
      <h2 style={{ margin: 0 }}>QR Code Generator</h2>

      <Field label="Text to encode" style={{ margin: "2em" }}>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text or URL to generate QR code"
          style={{ minHeight: "6em" }}
          resize="vertical"
        />
      </Field>

      <div className={styles.controls}>
        <Button appearance="primary" onClick={generateQRCode}>
          Generate QR Code
        </Button>
      </div>

      {qrCodeUrl && (
        <div className={styles.qrContainer}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrCodeUrl}
              alt="Generated QR Code"
              className={styles.qrCode}
            />
            <div style={{ marginTop: "1em", textAlign: "center" }}>
              <Button onClick={downloadQRCode}>Download QR Code</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default QRCodeGenerator
