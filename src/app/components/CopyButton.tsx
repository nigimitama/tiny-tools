"use client"
import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components"
import { Copy20Regular } from "@fluentui/react-icons"
import { useState } from "react"

const CopyButton = ({ text }: { text: string }) => {
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessage("Copied!")
        setOpen(true)
      })
      .catch((error) => {
        setMessage("Error: Failed to Copy")
        console.error("Error: Failed to Copy", error)
      })
      .finally(() => {
        setTimeout(() => {
          setOpen(false)
        }, 3000)
      })
  }

  return (
    <Popover withArrow open={open}>
      <PopoverTrigger>
        <Button
          icon={<Copy20Regular />}
          size="small"
          onClick={handleCopy}
          style={{ marginTop: "10px", padding: "8px" }}
        >
          Copy
        </Button>
      </PopoverTrigger>

      <PopoverSurface tabIndex={-1}>
        <div>{message}</div>
      </PopoverSurface>
    </Popover>
  )
}
export default CopyButton
