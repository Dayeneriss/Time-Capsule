/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Désactiver le strict mode pour éviter les doubles rendus en développement
  reactStrictMode: false,
  // Configuration pour IPFS
  assetPrefix: './',
  trailingSlash: true,
  // Exclure la page pricing de l'export
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    const paths = {
      '/': { page: '/' },
      '/create': { page: '/create' },
      '/capsules': { page: '/capsules' },
    }
    return paths
  },
}

module.exports = nextConfig
