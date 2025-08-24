import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
        root: __dirname, // ensures root is the mytasks folder
    },
};

export default nextConfig;

