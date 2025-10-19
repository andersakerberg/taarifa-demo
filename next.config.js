/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  basePath: process.env.NODE_ENV === 'production' ? '/taarifa-demo' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/taarifa-demo/' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
