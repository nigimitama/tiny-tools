import { useState } from 'react'
import { ImageRegular } from "@fluentui/react-icons"


type InputProps = {
  setInputImages: React.Dispatch<React.SetStateAction<FileList | undefined>>
}

export const InputArea = ({ setInputImages }: InputProps) => {
  const [inputPaths, setInputPaths] = useState<string[]>([])

  return (
    <>
      <div style={{ margin: "10px" }}>
        <input
          type="file"
          accept="image/jpeg, image/png, image/gif"
          onChange={(event) => {
            const inputImages = event.target.files
            if (inputImages === null) return null
            setInputImages(inputImages)

            const fileNames = []
            for (const inputImage of inputImages) {
              fileNames.push(inputImage.name)
            }
            setInputPaths(fileNames)
          }}
          multiple={true}
        />
      </div>

      <div id="inputImageShowArea" style={{ margin: "10px" }}>
        {inputPaths.map((path) => {
          return (
            <div key={path}>
              <ImageRegular /><span style={{ fontSize: "12px" }}>{path}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}
