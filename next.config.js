/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  reactStrictMode: false,
  images: {
    domains: ["localhost"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  basePath: process.env.BASE_PATH,
  assetPrefix: process.env.BASE_PATH,
};

module.exports = nextConfig;
