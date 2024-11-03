import Root from "./root"
import ErrorPage from "./error-page"
import Base64ImageEncoder from "./base64-encoder"
import SpaceRemover from "./space-remover"
import AmazonUrlShortener from "./amazon-url-shortener"
import { CodeTextEditFilled, DocumentPdfRegular, ImageBorderRegular } from "@fluentui/react-icons"
import ImagesToPdf from "./images-to-pdf"
import { WordsReplacer } from "./words-replacer"

type RouteSetting = {
  title: string
  path: string
  element: JSX.Element
  errorElement: JSX.Element
  icon: JSX.Element | undefined
}

const routeSettings: RouteSetting[] = [
  {
    title: "Base64 Imabe Encoder",
    path: "/base64-image-encoder",
    element: <Base64ImageEncoder />,
    errorElement: <ErrorPage />,
    icon: <ImageBorderRegular />,
  },
  {
    title: "Amazon URL Shortener",
    path: "/amazon-url-shortener",
    element: <AmazonUrlShortener />,
    errorElement: <ErrorPage />,
    icon: <CodeTextEditFilled />,
  },
  {
    title: "Space Remover",
    path: "/space-remover",
    element: <SpaceRemover />,
    errorElement: <ErrorPage />,
    icon: <CodeTextEditFilled />,
  },

  {
    title: "Words Replacer",
    path: "/words-replacer",
    element: <WordsReplacer />,
    errorElement: <ErrorPage />,
    icon: <CodeTextEditFilled />,
  },
  {
    title: "Images To PDF",
    path: "/images-to-pdf",
    element: <ImagesToPdf />,
    errorElement: <ErrorPage />,
    icon: <DocumentPdfRegular />,
  },
]

// generate RouteObjects for routing
type RouteObject = {
  path: string
  element: JSX.Element
  errorElement: JSX.Element
}

const rootRoute: RouteObject = {
  path: "/",
  element: <Root />,
  errorElement: <ErrorPage />,
}

export const routes: RouteObject[] = [
  rootRoute,
  ...routeSettings.map((r: RouteSetting) => {
    const routeObject: RouteObject = {
      path: r.path,
      element: r.element,
      errorElement: r.errorElement,
    }
    return routeObject
  }),
]

// generate items for menu
type MenuItem = {
  title: string
  path: string
  icon: JSX.Element | undefined
}

export const menuItems: MenuItem[] = routeSettings.map((r: RouteSetting) => {
  const menuItem: MenuItem = {
    title: r.title,
    path: r.path,
    icon: r.icon,
  }
  return menuItem
})
