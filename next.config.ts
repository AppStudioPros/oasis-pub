import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "oasis-pub.vercel.app" },
      { protocol: "https", hostname: "oasisnewlondon.com" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async redirects() {
    return [
      // ── Old Squarespace drink pages → new /drinks ──────────────────
      { source: "/craftbeer", destination: "/drinks", permanent: true },
      { source: "/craft-beer", destination: "/drinks", permanent: true },
      { source: "/seltzers", destination: "/drinks", permanent: true },
      { source: "/chill", destination: "/drinks", permanent: true },
      { source: "/wine", destination: "/drinks", permanent: true },
      { source: "/alcohol-free", destination: "/drinks", permanent: true },
      { source: "/kids-menu", destination: "/drinks", permanent: true },
      { source: "/drinks-menu", destination: "/drinks", permanent: true },

      // ── Old job application page ────────────────────────────────────
      { source: "/application", destination: "/work-with-us", permanent: true },
      { source: "/jobs", destination: "/work-with-us", permanent: true },
      { source: "/apply", destination: "/work-with-us", permanent: true },

      // ── Old event singular → plural ─────────────────────────────────
      { source: "/event/:slug", destination: "/events/:slug", permanent: true },

      // ── Common Squarespace junk ─────────────────────────────────────
      { source: "/home", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },

      // ── Old catch-all for any stale valuations link ─────────────────
      { source: "/valuations", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
