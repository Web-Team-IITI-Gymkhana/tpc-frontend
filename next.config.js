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
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: "/portal",
};

module.exports = nextConfig;
