import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FeaturedShow from "@/components/home/FeaturedShow";
import TheVibe from "@/components/home/TheVibe";
import DrinksGrid from "@/components/home/DrinksGrid";
import UpcomingShows from "@/components/home/UpcomingShows";
import HiringBanner from "@/components/home/HiringBanner";
import FindUs from "@/components/home/FindUs";
import eventsData from "@/data/events.json";

export default function HomePage() {
  // Sort upcoming events by date asc
  const upcoming = [...eventsData]
    .filter((e) => new Date(e.date) >= new Date(new Date().setHours(0, 0, 0, 0)))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const featured = upcoming[0] || eventsData[0];

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

      <UpcomingShows events={upcoming} />

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
