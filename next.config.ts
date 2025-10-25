import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
        root: __dirname, // ensures root is the mytasks folder
    },
    images: {
      domains: ['localhost', 'https://img.clerk.com', 'img.clerk.com'],
    },
};

export default nextConfig;

