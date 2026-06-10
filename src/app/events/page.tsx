import EventsClient from "./EventsClient";
import { getAllEvents, toEasternDate } from "@/lib/supabase";
import staticEvents from "@/data/events.json";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events & Live Music",
  description:
    "Upcoming shows at The Oasis Pub — indie rock, metal, sea shanty nights, DJ sets, and more. 16 Bank Street, New London CT. 21+.",
};

function mapEvent(e: Awaited<ReturnType<typeof getAllEvents>>[number]) {
  return {
    slug: e.slug,
    title: e.title,
    date: toEasternDate(e.start_date),
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

export default async function EventsPage() {
  const liveEvents = await getAllEvents();
  const events = liveEvents.length > 0 ? liveEvents.map(mapEvent) : staticEvents;

  return <EventsClient events={events} />;
}
