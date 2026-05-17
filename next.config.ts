import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */

  // Fluent UI がうまく動かなかったり hydration Errorがでるのを回避するためstrictModeは無効にする
  reactStrictMode: false,

  // GitHub Pages用のStatic Export設定
  output: 'export',

  // 画像最適化を無効化（Static Exportでは必須）
  images: {
    unoptimized: true,
  },
}

export default nextConfig
