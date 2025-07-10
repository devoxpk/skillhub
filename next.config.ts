// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* your existing config */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
    ],
  },

  // 1️⃣ Skip ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 2️⃣ Skip TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
