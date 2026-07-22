import { notFound } from "next/navigation";
import { getEventBySlug, getAllEvents, toEasternDate, toEasternTime } from "@/lib/supabase";
import staticEvents from "@/data/events.json";
import EventDetailClient from "./EventDetailClient";

const DAY_CODE: Record<string, number> = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };

type RecurrenceRule = { freq?: string; days?: string[]; monthly_type?: string; nth?: number; nth_day?: string };

/** Returns the next upcoming occurrence date for a recurring event, or the original start date */
function getNextOccurrence(startDateISO: string, isRecurring: boolean, rule: RecurrenceRule | null): Date {
  const base = new Date(startDateISO);
  if (!isRecurring || !rule) return base;

  const now = new Date();
  const etNow = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));

  if (rule.freq === "weekly" && rule.days?.length) {
    for (let i = 0; i <= 13; i++) {
      const cand = new Date(etNow);
      cand.setDate(etNow.getDate() + i);
      cand.setHours(base.getHours(), base.getMinutes(), 0, 0);
      if (rule.days.some((d) => DAY_CODE[d] === cand.getDay()) && cand >= now) return cand;
    }
  }

  if (rule.freq === "monthly") {
    const cand = new Date(base);
    if (cand < now) { cand.setMonth(now.getMonth()); cand.setFullYear(now.getFullYear()); }
    if (cand < now) cand.setMonth(cand.getMonth() + 1);
    return cand;
  }

  return base;
}

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
  // For recurring events, show the next upcoming occurrence rather than the original start date
  const nextDate = getNextOccurrence(
    e.start_date,
    e.is_recurring ?? false,
    (e.recurrence_rule as RecurrenceRule | null) ?? null
  );
  const nextDateISO = nextDate.toISOString();

  return {
    slug: e.slug,
    title: e.title,
    date: toEasternDate(nextDateISO),
    startTime: toEasternTime(nextDateISO),
    endTime: e.end_date ? toEasternTime(e.end_date) : "",
    endDate: e.end_date ?? null,
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
    description: event.description || `Live music at The Oasis Pub — ${event.title}. Join us at 16 Bank Street, New London CT.`,
    startDate: live ? live.start_date : `${event.date}T${event.startTime}`,
    ...(live?.end_date ? { endDate: live.end_date } : {}),
    image: event.image || "https://oasisnewlondon.com/images/heroes/poster-collage.jpg",
    url: `https://oasisnewlondon.com/events/${slug}`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
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
    performer: {
      "@type": "MusicGroup",
      name: event.title,
    },
    offers: event.ticketLink
      ? {
          "@type": "Offer",
          url: event.ticketLink,
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          validFrom: new Date().toISOString().split("T")[0],
        }
      : {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://oasisnewlondon.com/events",
          name: "Free Admission",
          validFrom: new Date().toISOString().split("T")[0],
        },
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
