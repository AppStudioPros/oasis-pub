"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

interface Event {
  slug: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  image: string;
  description: string;
  ticketLink: string | null;
  genre: string;
}

const TABS = ["Upcoming", "This Month", "All Shows"] as const;
type Tab = (typeof TABS)[number];

export default function EventsClient({ events }: { events: Event[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("Upcoming");

  const filtered = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const sorted = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    if (activeTab === "Upcoming") {
      return sorted.filter((e) => new Date(e.date) >= now);
    }
    if (activeTab === "This Month") {
      return sorted.filter((e) => {
        const d = new Date(e.date);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear() &&
          d >= now
        );
      });
    }
    return sorted;
  }, [activeTab, events]);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[35vh] min-h-[260px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/heroes/poster-collage.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs mb-3">
            Live Music · DJ Sets · Bass Nights
          </p>
          <h1 className="poster-title text-5xl md:text-7xl text-white">Events</h1>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-[var(--color-oasis-ink)] sticky top-16 md:top-20 z-30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[var(--color-oasis-orange)] text-[var(--color-oasis-orange)]"
                    : "border-transparent text-white/60 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events grid */}
      <section className="bg-[var(--color-oasis-ink)] py-12 md:py-16 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-white/60">
              <p className="poster-title text-3xl mb-3">No shows here yet.</p>
              <p>Check back soon — we&apos;re always booking.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="bg-[var(--color-oasis-orange)] py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="poster-title text-3xl md:text-4xl text-black mb-3">
            Want to play the Oasis?
          </h2>
          <p className="text-black/80 mb-6 max-w-xl mx-auto">
            We book emerging bands, DJs, and weird-in-a-good-way one-off nights. Send us a link to your music.
          </p>
          <a
            href="mailto:booking@socialnewlondon.com?subject=Booking%20(Oasis)&cc=oasisnewlondon%40gmail.com"
            className="inline-block bg-black text-white font-bold uppercase tracking-wider text-sm px-7 py-4 hover:bg-[var(--color-oasis-ink)] transition-colors"
          >
            Email Booking
          </a>
        </div>
      </section>
    </>
  );
}

function EventCard({ event }: { event: Event }) {
  const d = new Date(event.date);
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  const weekday = d.toLocaleString("en-US", { weekday: "long" });

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative block bg-black border border-white/10 hover:border-[var(--color-oasis-orange)] transition-colors overflow-hidden"
    >
      <div className="relative aspect-[3/4] bg-[var(--color-oasis-grit)] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-[var(--color-oasis-orange)] text-black w-14 text-center py-2 shadow-lg">
          <div className="text-[10px] font-bold uppercase tracking-wider leading-none">{month}</div>
          <div className="poster-title text-3xl leading-none mt-1">{day}</div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-[var(--color-oasis-orange)] text-xs font-bold uppercase tracking-wider mb-2">
          {event.genre}
        </p>
        <h3 className="poster-title text-xl text-white mb-3 leading-tight group-hover:text-[var(--color-oasis-orange)] transition-colors">
          {event.title}
        </h3>
        <div className="flex items-center gap-4 text-white/60 text-xs">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} /> {weekday}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {event.startTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
