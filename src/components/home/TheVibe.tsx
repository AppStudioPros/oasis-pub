"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Music, Beer, Users, Heart } from "lucide-react";

const STATS = [
  { value: 20, suffix: "+", label: "Drafts on Rotation", icon: <Beer size={20} /> },
  { value: 365, suffix: "", label: "Days a Year Open", icon: <Heart size={20} /> },
  { value: 100, suffix: "%", label: "Music-Forward", icon: <Music size={20} /> },
  { value: 21, suffix: "+", label: "Only Crowd", icon: <Users size={20} /> },
];

export default function TheVibe() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Diagonal accent stripes */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-oasis-orange)]" />
      <div
        className="absolute -top-2 left-0 w-full h-2 bg-black"
        style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: huge text */}
          <motion.div
            style={{ x: xLeft }}
            className="lg:col-span-7"
          >
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs mb-6"
            >
              ✦ The Vibe ✦
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="poster-title text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-8"
            >
              Real haunt.<br />
              <span className="text-[var(--color-oasis-orange)]">Huge sound.</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-4 text-white/70 text-base md:text-lg leading-relaxed max-w-xl mb-8"
            >
              <p>
                We&apos;re what a real bar is supposed to feel like. No bottle service. No bouncer attitude. No cover charge bullshit.
              </p>
              <p>
                Just twenty-plus craft beers on draught, a wall covered in show posters, and a stage where you might catch the band that&apos;s about to be your favorite.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-[var(--color-oasis-orange)] font-bold uppercase tracking-wider text-sm border-b-2 border-[var(--color-oasis-orange)] pb-1 hover:gap-4 transition-all"
              >
                Read Our Story
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: stats grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  suffix,
  label,
  icon,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
}) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 1500;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => requestAnimationFrame(tick), delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative bg-[var(--color-oasis-ink)] border-2 border-white/10 p-5 md:p-6 hover:border-[var(--color-oasis-orange)] transition-colors group"
    >
      <div className="text-[var(--color-oasis-orange)] mb-3">{icon}</div>
      <div className="poster-title text-4xl md:text-5xl text-white leading-none">
        {current}
        <span className="text-[var(--color-oasis-orange)]">{suffix}</span>
      </div>
      <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-2 leading-tight">
        {label}
      </div>
    </motion.div>
  );
}
