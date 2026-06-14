"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface Event {
  slug: string;
  title: string;
  date: string;
  startTime: string;
  image: string;
  genre: string;
}

export default function UpcomingShows({ events }: { events: Event[] }) {
  if (!events.length) return null;

  return (
    <section className="relative bg-[var(--color-oasis-ink)] py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs mb-4">
              ✦ The Lineup ✦
            </p>
            <h2 className="poster-title text-5xl md:text-7xl text-white leading-[0.9]">
              Upcoming<br />
              <span className="text-[var(--color-oasis-orange)]">Events.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 text-[var(--color-oasis-orange)] font-bold uppercase tracking-wider text-sm border-b-2 border-[var(--color-oasis-orange)] pb-1 hover:gap-4 transition-all"
            >
              See All Events
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event, i) => {
            const d = new Date(event.date);
            const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
            const day = d.getDate();
            const weekday = d.toLocaleString("en-US", { weekday: "long" });

            return (
              <motion.div
                key={event.slug}
                initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
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
                      sizes="(max-width: 768px) 100vw, 33vw"
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
          })}
        </div>
      </div>
    </section>
  );
}
