import { notFound } from "next/navigation";
import { getEventBySlug, getAllEvents, toEasternDate, toEasternTime } from "@/lib/supabase";
import staticEvents from "@/data/events.json";
import EventDetailClient from "./EventDetailClient";

type RecurrenceRule = { freq?: string; days?: string[]; monthly_type?: string; nth?: number; nth_day?: string };

const DAY_CODE: Record<string, number> = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };

/** Returns ET day of week (0=Sun) for a UTC Date using Intl — always correct regardless of server timezone */
function etDayOfWeek(d: Date): number {
  const name = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "America/New_York" }).format(d);
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(name);
}

/** Get ET year/month/day for any Date */
function etComponents(d: Date): { y: number; mo: number; day: number } {
  const s = d.toLocaleString("sv-SE", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" });
  const [y, mo, day] = s.split("-").map(Number);
  return { y, mo, day };
}

/** Build a candidate Date on a target ET date, preserving the original event's UTC time-of-day */
function candidateAt(base: Date, targetY: number, targetM: number, targetD: number): Date {
  const origET = etComponents(base);
  const origETMs = Date.UTC(origET.y, origET.mo - 1, origET.day);
  const targetETMs = Date.UTC(targetY, targetM - 1, targetD);
  const dayDiff = Math.round((targetETMs - origETMs) / (24 * 60 * 60 * 1000));
  return new Date(base.getTime() + dayDiff * 24 * 60 * 60 * 1000);
}

/** Returns the next upcoming occurrence date for a recurring event, or the original start date.
 *  Advances the original UTC timestamp by whole days — preserving exact UTC time-of-day so
 *  ET time is always correct. Day-of-week comparison uses Intl (ET), not getDay() (UTC). */
function getNextOccurrence(startDateISO: string, isRecurring: boolean, rule: RecurrenceRule | null): Date {
  const base = new Date(startDateISO);
  if (!isRecurring || !rule) return base;

  const now = new Date();
  const MS = 24 * 60 * 60 * 1000;

  if (rule.freq === "weekly" && rule.days?.length) {
    const daysElapsed = Math.max(0, Math.floor((now.getTime() - base.getTime()) / MS));
    const searchFrom = new Date(base.getTime() + daysElapsed * MS);
    for (let i = 0; i <= 13; i++) {
      const cand = new Date(searchFrom.getTime() + i * MS);
      if (rule.days.some((d) => DAY_CODE[d] === etDayOfWeek(cand)) && cand >= now) return cand;
    }
  }

  if (rule.freq === "monthly") {
    const { y: nowY, mo: nowMo } = etComponents(now);

    if (rule.monthly_type === "nth_weekday" && rule.nth && rule.nth_day) {
      const targetJsDay = DAY_CODE[rule.nth_day];
      for (let monthOffset = 0; monthOffset <= 12; monthOffset++) {
        const mo2 = ((nowMo - 1 + monthOffset) % 12) + 1;
        const y2 = nowY + Math.floor((nowMo - 1 + monthOffset) / 12);
        let count = 0;
        for (let d = 1; d <= 31; d++) {
          // Use noon UTC so the ET calendar day always matches (avoids midnight-crossing bug)
          const testDate = new Date(Date.UTC(y2, mo2 - 1, d, 12, 0, 0));
          if (testDate.getUTCMonth() !== mo2 - 1) break;
          if (etDayOfWeek(testDate) === targetJsDay) {
            count++;
            if (count === rule.nth) {
              const found = candidateAt(base, y2, mo2, d);
              if (found >= now) return found;
              break;
            }
          }
        }
      }
      return base;
    }

    // day_of_month — same ET calendar day each month
    const startET = etComponents(base);
    const thisMonth = candidateAt(base, nowY, nowMo, startET.day);
    if (thisMonth >= now) return thisMonth;
    const nextMo = nowMo === 12 ? 1 : nowMo + 1;
    const nextY = nowMo === 12 ? nowY + 1 : nowY;
    return candidateAt(base, nextY, nextMo, startET.day);
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
