/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // Désactiver le strict mode pour éviter les doubles rendus en développement
  reactStrictMode: false,
  // Configuration pour IPFS
  assetPrefix: './',
  trailingSlash: true,
}

module.exports = nextConfig
