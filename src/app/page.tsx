import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FeaturedShow from "@/components/home/FeaturedShow";
import TheVibe from "@/components/home/TheVibe";
import DrinksGrid from "@/components/home/DrinksGrid";
import UpcomingShows from "@/components/home/UpcomingShows";
import HiringBanner from "@/components/home/HiringBanner";
import FindUs from "@/components/home/FindUs";
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
                  text: "The Oasis Pub is a rock club and music venue at 16 Bank Street in downtown New London, CT. Known as the epicenter of New London's music scene, it features emerging bands, 20+ rotating craft beers on draft, and is open 365 days a year.",
                },
              },
              {
                "@type": "Question",
                name: "What are the hours at The Oasis Pub?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Oasis Pub is open 365 days a year. Sunday through Thursday: 7pm to 1am. Friday and Saturday: 7pm to 2am.",
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
                  text: "Yes. The Oasis Pub is New London's primary live music venue, featuring emerging bands, DJ sets, metal nights, indie rock, sea shanty nights, and bass music events regularly throughout the year.",
                },
              },
              {
                "@type": "Question",
                name: "Is there a cover charge at The Oasis Pub?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. The Oasis Pub does not charge a cover charge.",
                },
              },
              {
                "@type": "Question",
                name: "What beer does The Oasis Pub serve?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Oasis Pub has 20+ rotating craft beers on draft, heavily featuring Connecticut local microbreweries. They also serve hard seltzers, canned cocktails, CBD drinks, wine, alcohol-free options, and domestic beers.",
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
