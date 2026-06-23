import EventsClient from "./EventsClient";
import { getAllEvents, toEasternDate, toEasternTime } from "@/lib/supabase";
import staticEvents from "@/data/events.json";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events & Live Music",
  description:
    "Upcoming shows at The Oasis Pub — indie rock, metal, sea shanty nights, DJ sets, and more. 16 Bank Street, New London CT. 21+.",
  alternates: { canonical: "https://oasisnewlondon.com/events" },
};

function mapEvent(e: Awaited<ReturnType<typeof getAllEvents>>[number]) {
  return {
    slug: e.slug,
    title: e.title,
    date: toEasternDate(e.start_date),
    startTime: toEasternTime(e.start_date),
    endTime: e.end_date ? toEasternTime(e.end_date) : "",
    endDate: e.end_date ?? null,
    image: e.image_url ?? "/images/heroes/poster-collage.jpg",
    description: e.description ?? "",
    ticketLink: e.ticket_url ?? null,
    genre: e.category ?? "Live Music",
  };
}

export default async function EventsPage() {
  const liveEvents = await getAllEvents();
  const rawStatic = (staticEvents as typeof staticEvents).map((e) => ({ ...e, endDate: null as string | null }));
  const events = liveEvents.length > 0 ? liveEvents.map(mapEvent) : rawStatic;

  return <EventsClient events={events} />;
}
