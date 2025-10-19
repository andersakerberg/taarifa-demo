/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages configuration
  basePath: process.env.NODE_ENV === 'production' ? '/Taarifa' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Taarifa/' : '',
}

module.exports = nextConfig
