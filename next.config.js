/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  basePath: process.env.NODE_ENV === 'production' ? '/taarifa-demo' : '',
  // Remove assetPrefix to handle manually with getAssetPath
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
