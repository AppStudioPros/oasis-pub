"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HiringBanner() {
  return (
    <section className="relative bg-black py-20 md:py-28 overflow-hidden">
      {/* Diagonal stripes */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(242,99,33,0.4) 40px, rgba(242,99,33,0.4) 42px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 items-center">
          {/* Rotating stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative mx-auto md:mx-0"
          >
            <div className="relative w-44 h-44 md:w-52 md:h-52">
              {/* Outer ring with rotating text */}
              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-spin-slow">
                <defs>
                  <path
                    id="stamp-circle"
                    d="M 100,100 m -85,0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                  />
                </defs>
                <text className="fill-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.4em] text-[14px]">
                  <textPath href="#stamp-circle">
                    NOW HIRING · NOW HIRING · NOW HIRING ·
                  </textPath>
                </text>
              </svg>
              {/* Center */}
              <div className="absolute inset-6 border-4 border-[var(--color-oasis-orange)] rounded-full flex items-center justify-center bg-black">
                <div className="text-center">
                  <div className="text-[var(--color-oasis-orange)] text-[10px] font-bold uppercase tracking-[0.3em]">Join</div>
                  <div className="poster-title text-3xl md:text-4xl text-white leading-none mt-1">The<br />Crew</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs mb-4">
              ✦ Work With Us ✦
            </p>
            <h2 className="poster-title text-4xl md:text-6xl text-white leading-[0.9] mb-6">
              We&apos;re hiring<br />
              <span className="text-[var(--color-oasis-orange)]">the right people.</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Bartenders. Door staff. Sound engineers. Booking help. If you love live music and can keep a cool head at 1am on a Friday, drop us a line.
            </p>
            <Link
              href="/work-with-us"
              className="group inline-flex items-center gap-2 bg-[var(--color-oasis-orange)] text-white font-bold uppercase tracking-wider text-sm px-8 py-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#fff]"
            >
              Apply Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        :global(.animate-spin-slow) {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
