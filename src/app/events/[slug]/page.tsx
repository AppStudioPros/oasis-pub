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
  return { title, description };
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
  if (live) {
    return <EventDetailClient event={mapLive(live)} />;
  }

  // Fall back to static JSON
  const staticEvent = staticEvents.find((e) => e.slug === slug);
  if (!staticEvent) notFound();

  return <EventDetailClient event={staticEvent} />;
}
