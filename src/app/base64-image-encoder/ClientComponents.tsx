"use client"
import { useState, useCallback } from "react"
import {
  Field,
  Textarea,
  Checkbox,
  Input,
  Label,
  Divider,
} from "@fluentui/react-components"
import CopyButton from "../components/CopyButton"

type ImageInfo = {
  originalSize: number
  originalWidth: number
  originalHeight: number
  mimeType: string
}

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const resizeAndEncode = (
  dataUrl: string,
  mimeType: string,
  width: number,
  height: number
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL(mimeType))
    }
    img.src = dataUrl
  })
}

const getImageDimensions = (
  dataUrl: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.src = dataUrl
  })
}

type InputProps = {
  onFile: (file: File) => void
}

const InputArea = ({ onFile }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const items = event.clipboardData.items
    for (const item of items) {
      if (item.kind === "file") {
        const file = item.getAsFile()
        if (file) {
          onFile(file)
        }
      }
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      onFile(file)
    }
  }

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onFile(file)
    }
  }

  return (
    <div style={{ padding: "1em", margin: "1em", background: "#fff" }}>
      <div
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          outline: 0,
          borderWidth: "5px",
          borderStyle: "dashed",
          borderColor: isFocused ? "steelblue" : "#333",
          color: "gray",
          padding: "1em",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "0.5em" }}>
          Use <code>CTRL + V</code> to paste, or drag & drop an image
        </div>
        <div style={{ marginBottom: "0.5em" }}>or</div>
        <label
          style={{
            cursor: "pointer",
            color: "steelblue",
            textDecoration: "underline",
          }}
        >
          Browse file
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileInput}
          />
        </label>
        <div
          contentEditable={true}
          style={{
            outline: 0,
            color: "gray",
            minHeight: "40px",
            overflow: "hidden",
          }}
          onPaste={handlePaste}
        />
      </div>
    </div>
  )
}

type OutputProps = {
  result: string
  imageInfo: ImageInfo
  resizeWidth: number
  resizeHeight: number
  resizeEnabled: boolean
  maintainAspectRatio: boolean
  onResizeEnabledChange: (v: boolean) => void
  onResizeWidthChange: (v: number) => void
  onResizeHeightChange: (v: number) => void
  onMaintainAspectRatioChange: (v: boolean) => void
  onReset: () => void
}

const OutputArea = ({
  result,
  imageInfo,
  resizeWidth,
  resizeHeight,
  resizeEnabled,
  maintainAspectRatio,
  onResizeEnabledChange,
  onResizeWidthChange,
  onResizeHeightChange,
  onMaintainAspectRatioChange,
  onReset,
}: OutputProps) => {
  const encodedSize = Math.ceil((result.length * 3) / 4)

  return (
    <div style={{ margin: "1em" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Input Image</h3>
        <button
          onClick={onReset}
          style={{
            cursor: "pointer",
            padding: "0.3em 0.8em",
            fontSize: "0.85em",
          }}
        >
          Clear
        </button>
      </div>

      <img
        src={result}
        alt="input image"
        style={{ maxWidth: "100%", maxHeight: "300px" }}
      />

      <div
        style={{
          marginTop: "1em",
          padding: "0.75em 1em",
          borderRadius: "4px",
          fontSize: "0.9em",
        }}
      >
        <div style={{ display: "flex", gap: "2em", flexWrap: "wrap" }}>
          <span>
            <strong>Original size:</strong>{" "}
            {formatBytes(imageInfo.originalSize)}
          </span>
          <span>
            <strong>Dimensions:</strong> {imageInfo.originalWidth} ×{" "}
            {imageInfo.originalHeight} px
          </span>
          <span>
            <strong>Encoded size:</strong> {formatBytes(encodedSize)}
          </span>
        </div>
      </div>

      <div style={{ marginTop: "1.5em" }}>
        <Checkbox
          label="Resize image"
          checked={resizeEnabled}
          onChange={(_, d) => onResizeEnabledChange(!!d.checked)}
        />
        {resizeEnabled && (
          <div
            style={{
              marginTop: "0.75em",
              marginLeft: "1.5em",
              display: "flex",
              flexDirection: "column",
              gap: "0.75em",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
              <Field label="Width (px)" style={{ width: "120px" }}>
                <Input
                  type="number"
                  value={String(resizeWidth)}
                  onChange={(_, d) => onResizeWidthChange(Number(d.value))}
                  min={1}
                />
              </Field>
              <Label style={{ marginTop: "1.5em" }}>×</Label>
              <Field label="Height (px)" style={{ width: "120px" }}>
                <Input
                  type="number"
                  value={String(resizeHeight)}
                  onChange={(_, d) => onResizeHeightChange(Number(d.value))}
                  min={1}
                />
              </Field>
            </div>
            <Checkbox
              label="Maintain aspect ratio"
              checked={maintainAspectRatio}
              onChange={(_, d) => onMaintainAspectRatioChange(!!d.checked)}
            />
          </div>
        )}
      </div>

      <Divider style={{ margin: "1.5em 0" }} />

      <h3>Result</h3>
      <h4>Text</h4>
      <Field>
        <Textarea
          style={{ width: "100%", minHeight: "10em" }}
          value={result}
          resize="vertical"
        />
      </Field>
      <CopyButton text={result} />

      <h4>img tag</h4>
      <Field>
        <Textarea
          style={{ width: "100%", minHeight: "10em" }}
          value={`<img src="${result}">`}
          resize="vertical"
        />
      </Field>
      <CopyButton text={`<img src="${result}">`} />
    </div>
  )
}

export const Base64ImageEncoder = () => {
  const [originalDataUrl, setOriginalDataUrl] = useState("")
  const [result, setResult] = useState("")
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null)
  const [resizeEnabled, setResizeEnabled] = useState(false)
  const [resizeWidth, setResizeWidth] = useState(0)
  const [resizeHeight, setResizeHeight] = useState(0)
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)

  const applyEncode = useCallback(
    async (
      dataUrl: string,
      info: ImageInfo,
      enabled: boolean,
      w: number,
      h: number
    ) => {
      if (enabled && w > 0 && h > 0) {
        const resized = await resizeAndEncode(dataUrl, info.mimeType, w, h)
        setResult(resized)
      } else {
        setResult(dataUrl)
      }
    },
    []
  )

  const handleFile = useCallback(
    async (file: File) => {
      const reader = new FileReader()
      reader.onload = async () => {
        const dataUrl = reader.result as string
        const dims = await getImageDimensions(dataUrl)
        const info: ImageInfo = {
          originalSize: file.size,
          originalWidth: dims.width,
          originalHeight: dims.height,
          mimeType: file.type,
        }
        setOriginalDataUrl(dataUrl)
        setImageInfo(info)
        setResizeWidth(dims.width)
        setResizeHeight(dims.height)
        await applyEncode(dataUrl, info, resizeEnabled, dims.width, dims.height)
      }
      reader.readAsDataURL(file)
    },
    [resizeEnabled, applyEncode]
  )

  const handleResizeEnabledChange = useCallback(
    async (enabled: boolean) => {
      setResizeEnabled(enabled)
      if (imageInfo && originalDataUrl) {
        await applyEncode(
          originalDataUrl,
          imageInfo,
          enabled,
          resizeWidth,
          resizeHeight
        )
      }
    },
    [imageInfo, originalDataUrl, resizeWidth, resizeHeight, applyEncode]
  )

  const handleWidthChange = useCallback(
    async (w: number) => {
      let newHeight = resizeHeight
      if (maintainAspectRatio && imageInfo && w > 0) {
        newHeight = Math.round(
          (w * imageInfo.originalHeight) / imageInfo.originalWidth
        )
        setResizeHeight(newHeight)
      }
      setResizeWidth(w)
      if (imageInfo && originalDataUrl && resizeEnabled && w > 0) {
        await applyEncode(originalDataUrl, imageInfo, true, w, newHeight)
      }
    },
    [
      resizeHeight,
      maintainAspectRatio,
      imageInfo,
      originalDataUrl,
      resizeEnabled,
      applyEncode,
    ]
  )

  const handleHeightChange = useCallback(
    async (h: number) => {
      let newWidth = resizeWidth
      if (maintainAspectRatio && imageInfo && h > 0) {
        newWidth = Math.round(
          (h * imageInfo.originalWidth) / imageInfo.originalHeight
        )
        setResizeWidth(newWidth)
      }
      setResizeHeight(h)
      if (imageInfo && originalDataUrl && resizeEnabled && h > 0) {
        await applyEncode(originalDataUrl, imageInfo, true, newWidth, h)
      }
    },
    [
      resizeWidth,
      maintainAspectRatio,
      imageInfo,
      originalDataUrl,
      resizeEnabled,
      applyEncode,
    ]
  )

  const handleReset = useCallback(() => {
    setOriginalDataUrl("")
    setResult("")
    setImageInfo(null)
    setResizeEnabled(false)
    setResizeWidth(0)
    setResizeHeight(0)
  }, [])

  return (
    <>
      {result === "" && <InputArea onFile={handleFile} />}
      {result !== "" && imageInfo && (
        <OutputArea
          result={result}
          imageInfo={imageInfo}
          resizeWidth={resizeWidth}
          resizeHeight={resizeHeight}
          resizeEnabled={resizeEnabled}
          maintainAspectRatio={maintainAspectRatio}
          onResizeEnabledChange={handleResizeEnabledChange}
          onResizeWidthChange={handleWidthChange}
          onResizeHeightChange={handleHeightChange}
          onMaintainAspectRatioChange={setMaintainAspectRatio}
          onReset={handleReset}
        />
      )}
    </>
  )
}
