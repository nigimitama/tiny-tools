import {
  CodeTextEditFilled,
  DocumentPdfRegular,
  DocumentTableSearchFilled,
  ImageBorderRegular,
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
    title: "Difference Viewer",
    path: "/diff-viewer",
    icon: <DocumentTableSearchFilled />,
  },
])

routeSettings.set("Image Transformation", [
  {
    title: "Base64 Imabe Encoder",
    path: "/base64-image-encoder",
    icon: <ImageBorderRegular />,
  },
  {
    title: "Images To PDF",
    path: "/images-to-pdf",
    icon: <DocumentPdfRegular />,
  },
])
