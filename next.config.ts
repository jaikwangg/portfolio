import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Only use basePath in production builds, not in development
  ...(process.env.NODE_ENV === 'production' && {
    basePath: `/portfolio`,
    assetPrefix: `/portfolio/`,
  }),
  images: {
    unoptimized: true, // 👈 ปิด Image Optimization
  },
};

export default nextConfig;
