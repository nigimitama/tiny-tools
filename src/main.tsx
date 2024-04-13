import ReactDOM from 'react-dom/client'
import { FluentProvider, webDarkTheme } from '@fluentui/react-components'

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom"
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Base64ImageEncoder from './routes/base64-encoder';
import './styles.css'
import SpaceRemover from './routes/space-remover';

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/base64-image-encoder",
      element: <Base64ImageEncoder />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/space-remover",
      element: <SpaceRemover />,
      errorElement: <ErrorPage />,
    },
  ],
  {
    basename: "/"
  }
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FluentProvider theme={webDarkTheme} style={{ minHeight: "100vh" }}>
    <RouterProvider router={router} />
  </FluentProvider>
)
