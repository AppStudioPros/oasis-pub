import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Valuations page removed — send old URL home
      { source: "/valuations", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
