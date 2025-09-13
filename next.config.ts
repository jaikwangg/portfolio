import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: `/portfolio`,
  assetPrefix: `/portfolio/`,
  images: {
    unoptimized: true, // 👈 ปิด Image Optimization
  },
};

export default nextConfig;
