import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FeaturedShow from "@/components/home/FeaturedShow";
import DrinksGrid from "@/components/home/DrinksGrid";
import UpcomingShows from "@/components/home/UpcomingShows";
import HappyHourBanner from "@/components/home/HappyHourBanner";
import FindUs from "@/components/home/FindUs";
import SectionDivider from "@/components/SectionDivider";
import { getUpcomingEvents, toEasternDate, toEasternTime } from "@/lib/supabase";
import staticEvents from "@/data/events.json";

export const dynamic = "force-dynamic";

// Map Supabase event → shape expected by home components
function mapEvent(e: Awaited<ReturnType<typeof getUpcomingEvents>>[number]) {
  return {
    slug: e.slug,
    title: e.title,
    date: toEasternDate(e.start_date),
    startTime: toEasternTime(e.start_date),
    endTime: e.end_date ? toEasternTime(e.end_date) : "",
    image: e.image_url ?? "/images/heroes/poster-collage.jpg",
    description: e.description ?? "",
    ticketLink: e.ticket_url ?? null,
    genre: e.category ?? "Live Music",
  };
}

// Filter to only live music events for the homepage
function isLiveMusic(event: { genre: string }) {
  const g = (event.genre ?? "").toLowerCase();
  return g.includes("live music") || g.includes("live") || g.includes("music");
}

export default async function HomePage() {
  // Try live DB first, fall back to static JSON
  const liveEvents = await getUpcomingEvents();
  const allEvents =
    liveEvents.length > 0
      ? liveEvents.map(mapEvent)
      : staticEvents.filter(
          (e) => new Date(e.date) >= new Date(new Date().setHours(0, 0, 0, 0))
        );

  // Filter to live music for Next Up section
  const liveMusicEvents = allEvents.filter(isLiveMusic);
  // Use live music events for featured if available, else fall back to all
  const featured = (liveMusicEvents.length > 0 ? liveMusicEvents : allEvents)[0] ?? null;
  const upcomingEvents = liveMusicEvents.length > 0 ? liveMusicEvents : allEvents;

  return (
    <>
      <Hero />

      <Marquee
        items={[
          "OPEN 365",
          "21+ ONLY",
          "20 DRAFTS",
          "60+ CANS",
          "HAPPY HOUR",
          "LIVE MUSIC",
        ]}
        speed={40}
      />

      {featured && <FeaturedShow event={featured} />}

      <DrinksGrid />

      <UpcomingShows events={upcomingEvents} />

      <SectionDivider
        items={[
          "✦ INDIE ROCK ✦",
          "POST-PUNK",
          "EDM",
          "HIP HOP",
          "FOLK",
          "COUNTRY ROCK",
          "DANCE",
        ]}
        reverse
        speed={45}
      />

      <HappyHourBanner />

      <FindUs />

      {/* FAQ schema — AEO / AI answer engine optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is The Oasis Pub?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Oasis Pub is a neighborhood bar and music venue at 16 Bank Street in downtown New London, CT. Known as a sanctuary from sameness, it features craft beer, live music, and is open every weekday at 5pm and every weekend at 7pm.",
                },
              },
              {
                "@type": "Question",
                name: "What are the hours at The Oasis Pub?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Oasis Pub is open 365 days a year. Monday–Thursday: 5pm to 1am. Friday: 5pm to 2am. Saturday: 7pm to 2am. Sunday: 7pm to 1am.",
                },
              },
              {
                "@type": "Question",
                name: "Where is The Oasis Pub located?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Oasis Pub is located at 16 Bank Street, New London, CT 06320.",
                },
              },
              {
                "@type": "Question",
                name: "Does The Oasis Pub have live music?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The Oasis Pub features live music on weekends, plus DJ sets, Bad Movie Nights every Wednesday, and more.",
                },
              },
              {
                "@type": "Question",
                name: "Does The Oasis Pub have happy hour?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Happy hour is every weekday from 5–7pm with cheap beers and shot specials.",
                },
              },
              {
                "@type": "Question",
                name: "What beer does The Oasis Pub serve?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Oasis Pub has 20 rotating craft beers on draft, 60+ cans, canned cocktails, CBD and mushroom drinks, social tonics, and alcohol-free options.",
                },
              },
              {
                "@type": "Question",
                name: "How do I book a band or DJ at The Oasis Pub?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "To book a show at The Oasis Pub, email booking@socialnewlondon.com with your music and contact info.",
                },
              },
              {
                "@type": "Question",
                name: "Is The Oasis Pub 21+?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, The Oasis Pub is a 21+ venue.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
