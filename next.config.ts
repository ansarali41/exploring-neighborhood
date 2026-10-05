import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder photography. Replace with real Bangladesh photos in /public/images over time.
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    qualities: [75, 85],
  },
};

export default nextConfig;
