/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false };
    return config;
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig;
