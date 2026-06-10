import { notFound } from "next/navigation";
import eventsData from "@/data/events.json";
import EventDetailClient from "./EventDetailClient";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return eventsData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.description,
    openGraph: { title: event.title, description: event.description, images: [event.image] },
  };
}

export default async function EventDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);
  if (!event) notFound();

  return <EventDetailClient event={event} />;
}
