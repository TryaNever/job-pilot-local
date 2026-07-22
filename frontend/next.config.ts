import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 100,
        ignored: /node_modules/,
      };
    }
    return config;
  },
};


export default nextConfig;