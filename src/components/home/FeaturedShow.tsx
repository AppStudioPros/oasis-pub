"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

interface Event {
  slug: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  image: string;
  description: string;
  genre: string;
}

export default function FeaturedShow({ event }: { event: Event }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const posterY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

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
  const month = d.toLocaleString("en-US", { month: "short", timeZone: "America/New_York" }).toUpperCase();
  const day = parseInt(d.toLocaleDateString("en-US", { day: "numeric", timeZone: "America/New_York" }), 10);

  return (
    <section ref={ref} className="relative bg-[var(--color-oasis-ink)] py-20 md:py-32 overflow-hidden">
      {/* Background poster blur */}
      <div className="absolute inset-0 opacity-20">
        <Image src={event.image} alt="" fill className="object-cover blur-3xl scale-125" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-[var(--color-oasis-orange)]/40" />
          <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.4em] text-xs">
            ✦ Next Up ✦
          </p>
          <div className="h-px flex-1 bg-[var(--color-oasis-orange)]/40" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Poster with parallax + tilt */}
          <motion.div
            style={{ y: posterY }}
            initial={{ opacity: 0, rotate: -3 }}
            whileInView={{ opacity: 1, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 w-full"
          >
            <div className="absolute -inset-2 bg-[var(--color-oasis-orange)]/30 blur-2xl" />
            <Link
              href={`/events/${event.slug}`}
              className="relative block w-full h-full group"
            >
              <div className="relative w-full h-full overflow-hidden border-4 border-black shadow-[12px_12px_0_0_var(--color-oasis-orange)] group-hover:shadow-[16px_16px_0_0_var(--color-oasis-orange)] transition-all group-hover:-translate-y-1">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 bg-[var(--color-oasis-orange)] text-black px-3 py-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider leading-none">{month}</div>
                  <div className="poster-title text-3xl leading-none mt-1">{day}</div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-[var(--color-oasis-orange)] text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {event.genre}
            </p>
            <h2 className="poster-title text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[0.9]">
              {event.title}
            </h2>

            <div className="grid grid-cols-3 gap-4 my-8">
              <CountdownBox value={countdown.days} label="Days" />
              <CountdownBox value={countdown.hours} label="Hours" />
              <CountdownBox value={countdown.minutes} label="Mins" />
            </div>

            <div className="space-y-2 text-white/75 mb-8 text-sm">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-[var(--color-oasis-orange)]" />
                <span>{weekday}, {d.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" })}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-[var(--color-oasis-orange)]" />
                <span>{event.startTime}{event.endTime ? ` – ${event.endTime}` : ""}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[var(--color-oasis-orange)]" />
                <span>16 Bank Street · 21+</span>
              </div>
            </div>

            <Link
              href={`/events/${event.slug}`}
              className="group inline-flex items-center gap-2 bg-[var(--color-oasis-orange)] text-white font-bold uppercase tracking-wider text-sm px-8 py-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000]"
            >
              Show Details
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-black/60 border border-[var(--color-oasis-orange)]/40 p-4 text-center backdrop-blur-sm">
      <div className="poster-title text-4xl md:text-5xl text-[var(--color-oasis-orange)] leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
        {label}
      </div>
    </div>
  );
}
