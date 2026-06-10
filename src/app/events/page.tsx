import EventsClient from "./EventsClient";
import eventsData from "@/data/events.json";

export const metadata = {
  title: "Events & Live Music",
  description:
    "Upcoming shows at The Oasis Pub — indie rock, metal, sea shanty nights, DJ sets, and more. 16 Bank Street, New London CT. 21+.",
};

export default function EventsPage() {
  return <EventsClient events={eventsData} />;
}
