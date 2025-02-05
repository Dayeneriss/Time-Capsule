/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: '.next',
  images: {
    unoptimized: true,
  },
  // Désactiver le strict mode pour éviter les doubles rendus en développement
  reactStrictMode: false,
  // Configuration pour IPFS
  assetPrefix: '/',
  basePath: '',
  trailingSlash: true,
  // Ignorer les erreurs de build pour les routes API en production
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Désactiver le pré-rendu des pages qui nécessitent des données dynamiques
  experimental: {
    workerThreads: false,
    cpus: 1
  }
}

module.exports = nextConfig
