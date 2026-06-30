"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import SectionDivider from "@/components/SectionDivider";

const DAY_CODE_O: Record<string, number> = { SU:0, MO:1, TU:2, WE:3, TH:4, FR:5, SA:6 };

function getNextOasisDate(event: Event, now: Date): Date {
  const parseDate = (s: string) => new Date(s + "T12:00:00");
  const base = parseDate(event.date);
  if (!event.isRecurring || !event.recurrenceRule) return base;
  const rule = event.recurrenceRule as { freq?: string; days?: string[]; monthly_type?: string; nth?: number; nth_day?: string };
  if (rule.freq === "weekly" && rule.days?.length) {
    const etNow = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    for (let i = 0; i <= 13; i++) {
      const cand = new Date(etNow);
      cand.setDate(etNow.getDate() + i);
      cand.setHours(base.getHours(), base.getMinutes(), 0, 0);
      if (rule.days.some((d: string) => DAY_CODE_O[d] === cand.getDay()) && cand >= now) return cand;
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

interface Event {
  slug: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  endDate: string | null;
  image: string;
  description: string;
  ticketLink: string | null;
  genre: string;
  isRecurring?: boolean;
  recurrenceRule?: Record<string, unknown> | null;
  originalDate?: string;
}

export default function EventsClient({ events }: { events: Event[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Build category list dynamically from events that exist in the admin
  const categories = useMemo(() => {
    const cats = Array.from(new Set(events.map((e) => e.genre).filter(Boolean)));
    return ["All", ...cats.sort()];
  }, [events]);

  const filtered = useMemo(() => {
    // Use midnight Eastern time as "today" cutoff
    const etMidnight = new Date(
      new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }) + "T00:00:00"
    );
    const now = etMidnight;
    const parseDate = (dateStr: string) => new Date(dateStr + "T12:00:00");

    // Always show only upcoming events, sorted ascending
    let sorted = [...events]
      .filter((e) => {
        const cutoff = e.endDate ? new Date(e.endDate) : parseDate(e.date);
        return cutoff >= now;
      })
      .sort((a, b) => getNextOasisDate(a, etMidnight).getTime() - getNextOasisDate(b, etMidnight).getTime());

    if (activeCategory !== "All") {
      sorted = sorted.filter((e) => e.genre === activeCategory);
    }

    return sorted;
  }, [activeCategory, events]);

  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://oasisnewlondon.com" },
        { name: "Events", url: "https://oasisnewlondon.com/events" },
      ]} />
      <PageHero
        eyebrow="The Lineup"
        title="Upcoming Events"
        accent=""
        subtitle="Emerging bands, eclectic DJs, bad movie nights and much more."
      />

      <SectionDivider
        items={["✦ LIVE MUSIC ✦", "DANCE PARTIES", "BAD MOVIE NIGHTS", "ART OPENINGS"]}
        pixelsPerSecond={214}
      />

      {/* Genre filter pills */}
      {categories.length > 1 && (
        <section className="bg-[var(--color-oasis-ink)] sticky top-16 md:top-20 z-30 border-b-2 border-[var(--color-oasis-orange)]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? "bg-[var(--color-oasis-orange)] text-black"
                      : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events grid */}
      <section className="relative bg-[var(--color-oasis-ink)] py-16 md:py-20 min-h-[50vh] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 text-white/60"
            >
              <p className="poster-title text-4xl text-white mb-3">No shows here yet.</p>
              <p>Check back soon — we&apos;re always booking.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((event, i) => (
                <EventCard key={event.slug} event={event} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <SectionDivider
        items={["✦ INDIE ROCK ✦", "POST-PUNK", "EDM", "HIP HOP", "FOLK", "COUNTRY ROCK", "DANCE"]}
        reverse
        pixelsPerSecond={214}
      />

      {/* Booking CTA */}
      <section className="relative bg-[var(--color-oasis-orange)] py-16 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(0,0,0,0.1) 30px, rgba(0,0,0,0.1) 32px)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="poster-title text-4xl md:text-6xl text-black mb-4 leading-[0.9]"
          >
            Want to play<br />the Oasis?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-black/80 mb-8 max-w-xl mx-auto"
          >
            We get tons of requests to perform. Please be patient and give us time to respond.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="mailto:booking@socialnewlondon.com?subject=Booking%20(Oasis)&cc=oasisnewlondon%40gmail.com"
            className="group inline-flex items-center gap-2 bg-black text-white font-bold uppercase tracking-wider text-sm px-8 py-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#fff]"
          >
            Email Booking
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </section>
    </>
  );
}

function EventCard({ event, index }: { event: Event; index: number }) {
  // Parse YYYY-MM-DD as noon ET to avoid UTC-midnight day rollback
  const d = new Date(event.date + "T12:00:00");
  const month = d.toLocaleString("en-US", { month: "short", timeZone: "America/New_York" }).toUpperCase();
  const day = parseInt(d.toLocaleDateString("en-US", { day: "numeric", timeZone: "America/New_York" }), 10);
  const weekday = d.toLocaleString("en-US", { weekday: "long", timeZone: "America/New_York" });
  const rotation = index % 2 === 0 ? "-rotate-1" : "rotate-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={rotation}
    >
      <Link
        href={`/events/${event.slug}`}
        className="group relative block bg-black border-2 border-white/10 hover:border-[var(--color-oasis-orange)] transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(242,99,33,0.4)]"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
          <div className="absolute top-3 left-3 bg-[var(--color-oasis-orange)] text-black w-14 text-center py-2 shadow-lg">
            <div className="text-[10px] font-bold uppercase tracking-wider leading-none">{month}</div>
            <div className="poster-title text-3xl leading-none mt-1">{day}</div>
          </div>
        </div>
        <div className="p-5">
          <p className="text-[var(--color-oasis-orange)] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
            {event.genre}
          </p>
          <h3 className="poster-title text-xl text-white mb-3 leading-tight group-hover:text-[var(--color-oasis-orange)] transition-colors">
            {event.title}
          </h3>
          <div className="flex items-center gap-4 text-white/50 text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> {weekday}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {event.startTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
