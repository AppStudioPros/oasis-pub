"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import SectionDivider from "@/components/SectionDivider";

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
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://oasisnewlondon.com" },
        { name: "Events", url: "https://oasisnewlondon.com/events" },
      ]} />
      <PageHero
        eyebrow="Live Music · DJ Sets · Bass Nights"
        title="The"
        accent="Lineup."
        subtitle="Emerging bands. Loud nights. Always 21+."
      />

      <SectionDivider
        items={["✦ INDIE ROCK ✦", "METAL", "BASS NIGHTS", "DJ SETS", "SEA SHANTIES", "NO COVER"]}
        speed={40}
      />

      {/* Tabs */}
      <section className="bg-[var(--color-oasis-ink)] sticky top-16 md:top-20 z-30 border-b-2 border-[var(--color-oasis-orange)]/40">
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
        items={["✦ WANT TO PLAY ✦", "BOOK A NIGHT", "EMAIL BOOKING", "EMERGING BANDS WELCOME"]}
        reverse
        speed={45}
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
            We book emerging bands, DJs, and weird-in-a-good-way one-off nights. Send us a link to your music.
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
  const d = new Date(event.date);
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  const weekday = d.toLocaleString("en-US", { weekday: "long" });
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
