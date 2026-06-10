import type { MetadataRoute } from "next";
import { getAllEvents } from "@/lib/supabase";
import staticEvents from "@/data/events.json";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Try live events, fall back to static
  const liveEvents = await getAllEvents();
  const eventSlugs =
    liveEvents.length > 0
      ? liveEvents.map((e) => e.slug)
      : staticEvents.map((e) => e.slug);

  const eventRoutes = eventSlugs.map((slug) => ({
    url: `${base}/events/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes];
}
