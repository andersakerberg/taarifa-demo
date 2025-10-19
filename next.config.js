/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  basePath: process.env.NODE_ENV === 'production' ? '/Taarifa' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Taarifa/' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
