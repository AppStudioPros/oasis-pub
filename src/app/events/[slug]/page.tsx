import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import eventsData from "@/data/events.json";

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

  const d = new Date(event.date);
  const weekday = d.toLocaleString("en-US", { weekday: "long" });
  const fullDate = d.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      {/* Hero with poster image */}
      <section className="relative bg-black py-16 md:py-20">
        <div className="absolute inset-0 opacity-30">
          <Image src={event.image} alt="" fill className="object-cover blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[var(--color-oasis-orange)] text-sm font-bold uppercase tracking-wider mb-8"
          >
            <ArrowLeft size={16} /> All Events
          </Link>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Poster */}
            <div className="relative aspect-[3/4] max-w-md mx-auto md:mx-0 w-full bg-[var(--color-oasis-grit)] overflow-hidden border border-white/10">
              <Image
                src={event.image}
                alt={event.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Details */}
            <div>
              <p className="text-[var(--color-oasis-orange)] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                {event.genre}
              </p>
              <h1 className="poster-title text-4xl md:text-6xl text-white mb-6 leading-tight">
                {event.title}
              </h1>
              <div className="space-y-3 mb-8 text-white/85">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-[var(--color-oasis-orange)]" />
                  <span>{weekday}, {fullDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[var(--color-oasis-orange)]" />
                  <span>{event.startTime} – {event.endTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-[var(--color-oasis-orange)]" />
                  <span>16 Bank Street, New London CT</span>
                </div>
              </div>
              <p className="text-white/75 leading-relaxed mb-8">{event.description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                {event.ticketLink ? (
                  <a
                    href={event.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[var(--color-oasis-orange)] hover:bg-[var(--color-oasis-orange-dark)] text-white font-bold uppercase tracking-wider text-sm px-7 py-4 transition-colors"
                  >
                    Get Tickets
                  </a>
                ) : (
                  <div className="inline-flex items-center justify-center bg-[var(--color-oasis-orange)] text-white font-bold uppercase tracking-wider text-sm px-7 py-4">
                    Free Show · 21+
                  </div>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border-2 border-white/30 hover:border-[var(--color-oasis-orange)] hover:text-[var(--color-oasis-orange)] text-white font-bold uppercase tracking-wider text-sm px-7 py-4 transition-colors"
                >
                  Find the Pub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicEvent",
            name: event.title,
            startDate: `${event.date}T21:00:00-04:00`,
            location: {
              "@type": "Place",
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
            image: event.image,
            description: event.description,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          }),
        }}
      />
    </>
  );
}
