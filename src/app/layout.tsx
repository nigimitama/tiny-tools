import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import InnerLayout from "./layout-inner"
import "./globals.css"

export const metadata: Metadata = {
  title: "Tiny Tools",
  description: "Small applications that might help you",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head prefix="og: https://ogp.me/ns#">
        <meta property="og:title" content="Tiny Tools" />
        <meta property="og:site_name" content="Tiny Tools" />
        <meta
          property="og:description"
          content="Small applications that might help you"
        />
        <meta property="og:url" content="https://tiny-tools.net/" />
        <meta property="og:type" content="website" />

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tiny Tools</title>

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6638954171805552"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <InnerLayout>{children}</InnerLayout>
      </body>
      <GoogleAnalytics gaId="G-65QSNH3PZF" />
    </html>
  )
}
