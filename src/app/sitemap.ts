import type { MetadataRoute } from "next";
import eventsData from "@/data/events.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://oasisnewlondon.com";
  const lastModified = new Date();

  const staticRoutes = ["/", "/about", "/events", "/drinks", "/work-with-us", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1.0 : 0.7,
    })
  );

  const eventRoutes = eventsData.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes];
}
