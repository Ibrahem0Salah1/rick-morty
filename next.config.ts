import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
      {
        protocol: "https",
        hostname: "s3.us-west-1.wasabisys.com"
      }
    ],
  },
};

export default nextConfig;
