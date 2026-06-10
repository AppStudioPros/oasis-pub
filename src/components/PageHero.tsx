"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  accent?: string; // accent line below title (orange)
  subtitle?: string;
}

export default function PageHero({ eyebrow, title, accent, subtitle }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section
      ref={ref}
      className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <Image
          src="/images/heroes/poster-collage.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </motion.div>

      {/* Animated grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.1] mix-blend-overlay animate-grain-page">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain-page">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-page)" />
        </svg>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, black 100%)",
        }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.4em] text-xs mb-5"
        >
          ✦ {eyebrow} ✦
        </motion.p>
        <h1 className="poster-title text-white leading-[0.9]">
          {title.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.1,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl mr-4"
            >
              {word}
            </motion.span>
          ))}
          {accent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-3xl md:text-5xl text-[var(--color-oasis-orange)] mt-3"
            >
              {accent}
            </motion.div>
          )}
        </h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-base md:text-lg text-white/70 mt-6 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>

      <style jsx>{`
        @keyframes grain-shift-page {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-5%, -5%); }
          50% { transform: translate(5%, -10%); }
          75% { transform: translate(-10%, 5%); }
        }
        .animate-grain-page {
          animation: grain-shift-page 8s steps(10) infinite;
        }
      `}</style>
    </section>
  );
}
