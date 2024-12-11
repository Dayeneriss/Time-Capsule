/** @type {import('next').NextConfig} */  
const nextConfig = {  
  webpack: (config) => {  
    config.resolve.fallback = {  
      ...config.resolve.fallback,  
      encoding: false,  
      "pino-pretty": false,  
      fs: false,  
      net: false  
    };  
    return config;  
  },  
  output: 'export',  
  images: {  
    unoptimized: true  
  },  
  trailingSlash: true,  
  reactStrictMode: true  
}  

module.exports = nextConfig;  