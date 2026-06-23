"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

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

export default function EventDetailClient({ event }: { event: Event }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const posterY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const target = new Date(`${event.date}T21:00:00-04:00`).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      });
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [event.date]);

  const d = new Date(event.date + "T12:00:00");
  const weekday = d.toLocaleString("en-US", { weekday: "long", timeZone: "America/New_York" }).toUpperCase();
  const fullDate = d.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric", timeZone: "America/New_York" });
  const nowET = new Date(new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }) + "T00:00:00");
  const isPast = event.endTime
    ? (() => { const [h,m] = event.endTime!.replace(/[^0-9:]/g,"").split(":").map(Number); const d = new Date(event.date + "T12:00:00"); d.setHours(h||0,m||0,0,0); return d < new Date(); })()
    : new Date(event.date + "T12:00:00") < nowET;

  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://oasisnewlondon.com" },
        { name: "Events", url: "https://oasisnewlondon.com/events" },
        { name: event.title, url: `https://oasisnewlondon.com/events/${event.slug}` },
      ]} />
      {/* Hero with blurred poster bg */}
      <section ref={ref} className="relative bg-black py-20 md:py-28 overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-30">
          <Image src={event.image} alt="" fill className="object-cover blur-3xl scale-125" />
        </motion.div>

        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain-event">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-event)" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[var(--color-oasis-orange)] text-sm font-bold uppercase tracking-wider mb-8 transition-colors"
            >
              <ArrowLeft size={16} /> All Events
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Poster */}
            <motion.div
              style={{ y: posterY }}
              initial={{ opacity: 0, rotate: -3 }}
              animate={{ opacity: 1, rotate: -2 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] max-w-md mx-auto md:mx-0 w-full"
            >
              <div className="absolute -inset-2 bg-[var(--color-oasis-orange)]/30 blur-2xl" />
              <div className="relative w-full h-full overflow-hidden border-4 border-black shadow-[12px_12px_0_0_var(--color-oasis-orange)]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.4em] text-xs mb-4">
                ✦ {event.genre} ✦
              </p>
              <h1 className="poster-title text-4xl md:text-6xl text-white mb-6 leading-[0.9]">
                {event.title}
              </h1>

              {/* Countdown — only if future */}
              {!isPast && (
                <div className="grid grid-cols-3 gap-3 my-8">
                  <CountdownBox value={countdown.days} label="Days" />
                  <CountdownBox value={countdown.hours} label="Hours" />
                  <CountdownBox value={countdown.minutes} label="Mins" />
                </div>
              )}

              <div className="space-y-3 mb-8 text-white/85">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-[var(--color-oasis-orange)]" />
                  <span>{weekday}, {fullDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[var(--color-oasis-orange)]" />
                  <span>{event.startTime}{event.endTime ? ` – ${event.endTime}` : ""}</span>
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
                    className="group inline-flex items-center justify-center gap-2 bg-[var(--color-oasis-orange)] text-white font-bold uppercase tracking-wider text-sm px-7 py-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000]"
                  >
                    Get Tickets
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <div className="inline-flex items-center justify-center bg-[var(--color-oasis-orange)] text-white font-bold uppercase tracking-wider text-sm px-7 py-4 shadow-[6px_6px_0_0_#000]">
                    {isPast ? "Past Show" : "Free Show · 21+"}
                  </div>
                )}
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-[var(--color-oasis-orange)] hover:text-[var(--color-oasis-orange)] text-white font-bold uppercase tracking-wider text-sm px-7 py-4 transition-all hover:-translate-y-1"
                >
                  Find the Pub
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider
        items={["✦ LIVE MUSIC ✦", "16 BANK ST", "21+", "NEW LONDON CT", "OPEN 365"]}
        pixelsPerSecond={214}
      />

      {/* JSON-LD */}
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

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-black/60 border border-[var(--color-oasis-orange)]/40 p-3 text-center backdrop-blur-sm">
      <div className="poster-title text-3xl md:text-4xl text-[var(--color-oasis-orange)] leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
        {label}
      </div>
    </div>
  );
}
