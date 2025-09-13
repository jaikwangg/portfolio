import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: `/portfolio`,
  assetPrefix: `/portfolio/`,
  images: {
    unoptimized: true, // 👈 ปิด Image Optimization
  },
};

export default nextConfig;
