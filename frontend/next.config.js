/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false };
    return config;
  }
}

module.exports = nextConfig;
