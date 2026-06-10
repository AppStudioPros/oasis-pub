import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oasis-pub.vercel.app",
      },
      {
        protocol: "https",
        hostname: "oasisnewlondon.com",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/valuations", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
