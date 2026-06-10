import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FeaturedShow from "@/components/home/FeaturedShow";
import TheVibe from "@/components/home/TheVibe";
import DrinksGrid from "@/components/home/DrinksGrid";
import UpcomingShows from "@/components/home/UpcomingShows";
import HiringBanner from "@/components/home/HiringBanner";
import FindUs from "@/components/home/FindUs";
import { getUpcomingEvents } from "@/lib/supabase";
import staticEvents from "@/data/events.json";

export const dynamic = "force-dynamic";

// Map Supabase event → shape expected by home components
function mapEvent(e: Awaited<ReturnType<typeof getUpcomingEvents>>[number]) {
  return {
    slug: e.slug,
    title: e.title,
    date: e.start_date.split("T")[0],
    startTime: new Date(e.start_date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    }),
    endTime: e.end_date
      ? new Date(e.end_date).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/New_York",
        })
      : "11:30 PM",
    image: e.image_url ?? "/images/events/indigo-folly.png",
    description: e.description ?? "",
    ticketLink: e.ticket_url ?? null,
    genre: e.category ?? "Live Music",
  };
}

export default async function HomePage() {
  // Try live DB first, fall back to static JSON
  const liveEvents = await getUpcomingEvents();
  const events =
    liveEvents.length > 0
      ? liveEvents.map(mapEvent)
      : staticEvents.filter(
          (e) => new Date(e.date) >= new Date(new Date().setHours(0, 0, 0, 0))
        );

  const featured = events[0] ?? null;

  return (
    <>
      <Hero />

      <Marquee
        items={[
          "LIVE MUSIC",
          "20+ DRAFTS",
          "OPEN 365",
          "NO COVER",
          "16 BANK ST",
          "ROCK CLUB",
          "CRAFT BEER",
          "NEW LONDON CT",
        ]}
        speed={40}
      />

      {featured && <FeaturedShow event={featured} />}

      <TheVibe />

      <DrinksGrid />

      <UpcomingShows events={events} />

      <Marquee
        items={[
          "✦ EST. 1990s ✦",
          "21+",
          "INDIE ROCK",
          "BASS NIGHTS",
          "SEA SHANTIES",
          "DJ SETS",
          "METAL",
          "CRAFT BEER",
        ]}
        reverse
        speed={45}
      />

      <HiringBanner />

      <FindUs />
    </>
  );
}
