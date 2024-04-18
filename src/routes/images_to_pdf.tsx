import Layout from "../components/layout";
import { useState } from 'react'
import { DocumentPdfRegular } from "@fluentui/react-icons"
import { InputArea } from "../components/images_to_pdf/InputArea.tsx";
import { Setting } from "../components/images_to_pdf/Setting.tsx";
import { ExecuteButton } from "../components/images_to_pdf/ExecuteButton.tsx";
import {
  tokens,
  Button,
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
} from "@fluentui/react-components";


type OutputProps = {
  pdfURL: string,
}

const OutputArea = ({ pdfURL }: OutputProps) => {
  const areaStyles = {
    marginTop: "50px",
    padding: "10px",
  }
  const buttonLinkStyles = {
    color: tokens.colorNeutralForeground1,
    textDecorationLine: "none",
  }
  return (
    <div hidden={pdfURL === ""}>
      <MessageBar intent="success" style={areaStyles}>
        <MessageBarBody>
          <MessageBarTitle >
            PDF is created.
          </MessageBarTitle>
        </MessageBarBody>
        <Button icon={<DocumentPdfRegular />}>
          <a href={pdfURL} target="_blank" style={buttonLinkStyles}>
            Download PDF
          </a>
        </Button>
      </MessageBar>
    </div>
  )
}

const ImagesToPdf = () => {
  const [pdfURL, setPdfURL] = useState("")
  const initialPageSize: [number, number] = [0, 0]
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [inputImages, setInputImages] = useState<FileList>()

  return (
    <Layout>
      <>
        <header>
          <h2 style={{ margin: 0 }}>Base64 Image Encoder</h2>
        </header>
        <main style={{ margin: "15px" }}>
          <h3>Select Images</h3>
          <InputArea setInputImages={setInputImages} />

          <h3>Option</h3>
          <Setting pageSize={pageSize} setPageSize={setPageSize} />

          <ExecuteButton inputImages={inputImages} pageSize={pageSize} setPdfURL={setPdfURL} />
          <OutputArea pdfURL={pdfURL} />
        </main>
      </>
    </Layout>
  )
}

export default ImagesToPdf
