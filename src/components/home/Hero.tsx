"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, Beer } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: background moves slower, content moves slightly down on scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Parallax poster collage */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <Image
          src="/images/heroes/poster-collage.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
      </motion.div>

      {/* Animated grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay animate-grain">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 30%, black 100%)"
      }} />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="poster-title text-white mb-8 leading-[0.9] text-6xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Open Every Day<br />
          <span className="text-[var(--color-oasis-orange)]">365 Days A Year</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-snug font-light"
        >
          Craft Beer. Unique Drinks. Live Music.<br />
          <span className="text-white/60">Open every weekday at 5pm, every weekend at 7pm</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/events"
            className="group relative inline-flex items-center justify-center gap-2 bg-[var(--color-oasis-orange)] text-white font-bold uppercase tracking-wider text-sm px-8 py-4 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000]"
          >
            <Calendar size={18} />
            See Upcoming Events
          </Link>
          <Link
            href="/drinks"
            className="group relative inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 transition-all hover:border-[var(--color-oasis-orange)] hover:bg-[var(--color-oasis-orange)]/10 hover:-translate-y-1"
          >
            <Beer size={18} />
            Pick Your Poison
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(5%, -10%); }
          30% { transform: translate(-10%, 5%); }
          40% { transform: translate(7%, 10%); }
          50% { transform: translate(-5%, 5%); }
          60% { transform: translate(10%, -5%); }
          70% { transform: translate(-7%, -10%); }
          80% { transform: translate(5%, 10%); }
          90% { transform: translate(-5%, 5%); }
        }
        .animate-grain {
          animation: grain-shift 8s steps(10) infinite;
        }
      `}</style>
    </section>
  );
}
