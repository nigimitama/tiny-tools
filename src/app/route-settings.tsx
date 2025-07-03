import {
  CodeTextEditFilled,
  DocumentPdfRegular,
  DocumentTableSearchFilled,
  ImageBorderRegular,
  QrCodeRegular,
  PasswordRegular,
  DataTreemapRegular,
  LinkRegular,
  DocumentTextRegular,
  TextGrammarArrowLeftRegular,
  TextCaseUppercaseRegular,
  DocumentPageNumberRegular,
} from "@fluentui/react-icons"

export type RouteSetting = {
  title: string
  path: string
  icon: JSX.Element | undefined
}

export const routeSettings = new Map<string, RouteSetting[]>()

routeSettings.set("Text Transformation", [
  {
    title: "Amazon URL Shortener",
    path: "/amazon-url-shortener",
    icon: <CodeTextEditFilled />,
  },
  {
    title: "Space Remover",
    path: "/space-remover",
    icon: <CodeTextEditFilled />,
  },
  {
    title: "Words Replacer",
    path: "/words-replacer",
    icon: <CodeTextEditFilled />,
  },
  {
    title: "JSON / Python Dict Formatter",
    path: "/json-formatter",
    icon: <CodeTextEditFilled />,
  },
  {
    title: "Difference Viewer",
    path: "/diff-viewer",
    icon: <DocumentTableSearchFilled />,
  },
  {
    title: "QR Code Generator",
    path: "/qr-code-generator",
    icon: <QrCodeRegular />,
  },
  {
    title: "Password Generator",
    path: "/password-generator",
    icon: <PasswordRegular />,
  },
  {
    title: "Hash Generator",
    path: "/hash-generator",
    icon: <DataTreemapRegular />,
  },
  {
    title: "URL Encoder/Decoder",
    path: "/url-encoder-decoder",
    icon: <LinkRegular />,
  },
  {
    title: "Base64 Text Encoder",
    path: "/base64-text-encoder",
    icon: <DocumentTextRegular />,
  },
  {
    title: "Line Break Converter",
    path: "/line-break-converter",
    icon: <TextGrammarArrowLeftRegular />,
  },
  {
    title: "Character Counter",
    path: "/character-counter",
    icon: <DocumentPageNumberRegular />,
  },
  {
    title: "Case Converter",
    path: "/case-converter",
    icon: <TextCaseUppercaseRegular />,
  },
])

routeSettings.set("Image Transformation", [
  {
    title: "Base64 Image Encoder",
    path: "/base64-image-encoder",
    icon: <ImageBorderRegular />,
  },
  {
    title: "Images To PDF",
    path: "/images-to-pdf",
    icon: <DocumentPdfRegular />,
  },
])
