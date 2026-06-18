import { notFound } from "next/navigation";
import { getEventBySlug, getAllEvents, toEasternDate, toEasternTime } from "@/lib/supabase";
import staticEvents from "@/data/events.json";
import EventDetailClient from "./EventDetailClient";

type Params = Promise<{ slug: string }>;

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  // Build-time: use static events only (live events handled at runtime)
  return staticEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const live = await getEventBySlug(slug);
  const event = live ?? staticEvents.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found" };
  const title = (event as { title: string }).title;
  const description = (event as { description?: string | null }).description ?? "";
  const image = (event as { image_url?: string | null }).image_url ?? "/images/heroes/poster-collage.jpg";
  const canonical = `https://oasisnewlondon.com/events/${slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | The Oasis Pub`,
      description,
      url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: "website",
    },
  };
}

function mapLive(e: NonNullable<Awaited<ReturnType<typeof getEventBySlug>>>) {
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

export default async function EventDetailPage({ params }: { params: Params }) {
  const { slug } = await params;

  // Try live DB first
  const live = await getEventBySlug(slug);
  const event = live ? mapLive(live) : staticEvents.find((e) => e.slug === slug);
  if (!event) notFound();

  // Build Event JSON-LD schema
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: event.title,
    description: event.description || `Live music at The Oasis Pub — ${event.title}`,
    startDate: live ? live.start_date : `${event.date}T${event.startTime}`,
    endDate: live?.end_date ?? undefined,
    image: event.image || "https://oasisnewlondon.com/images/heroes/poster-collage.jpg",
    url: `https://oasisnewlondon.com/events/${slug}`,
    location: {
      "@type": "MusicVenue",
      name: "The Oasis Pub",
      address: {
        "@type": "PostalAddress",
        streetAddress: "16 Bank Street",
        addressLocality: "New London",
        addressRegion: "CT",
        postalCode: "06320",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "The Oasis Pub",
      url: "https://oasisnewlondon.com",
    },
    ...(event.ticketLink ? { offers: { "@type": "Offer", url: event.ticketLink, availability: "https://schema.org/InStock" } } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <EventDetailClient event={event} />
    </>
  );
}
