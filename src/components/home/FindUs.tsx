"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function FindUs() {
  return (
    <section className="relative bg-[var(--color-oasis-ink)] py-20 md:py-28 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-stretch">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs mb-6">
              ✦ Find Us ✦
            </p>
            <h2 className="poster-title text-5xl md:text-7xl text-white leading-[0.9] mb-8">
              16 Bank Street.<br />
              <span className="text-[var(--color-oasis-orange)]">New London, CT.</span>
            </h2>

            {/* Neon-style hours sign */}
            <div className="relative bg-black border-2 border-[var(--color-oasis-orange)] p-6 md:p-8 mb-8 shadow-[0_0_30px_-10px_var(--color-oasis-orange)]">
              <div className="absolute -top-3 left-6 bg-[var(--color-oasis-ink)] px-3 text-[var(--color-oasis-orange)] text-xs font-bold uppercase tracking-wider">
                Open Hours
              </div>
              <div className="text-center mb-4">
                <p className="poster-title text-2xl md:text-3xl text-[var(--color-oasis-orange)] animate-flicker">
                  365 Days a Year
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-white">
                <div className="text-center">
                  <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Sun – Thu</div>
                  <div className="poster-title text-2xl">7pm – 1am</div>
                </div>
                <div className="text-center border-l border-white/10 pl-4">
                  <div className="text-[var(--color-oasis-orange)]/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Fri – Sat</div>
                  <div className="poster-title text-2xl text-[var(--color-oasis-orange)]">7pm – 2am</div>
                </div>
              </div>
            </div>

            {/* Contact bits */}
            <div className="space-y-3 mb-8">
              <a href="tel:+18604473929" className="flex items-center gap-3 text-white/80 hover:text-[var(--color-oasis-orange)] transition-colors group">
                <div className="w-10 h-10 border border-white/20 group-hover:border-[var(--color-oasis-orange)] flex items-center justify-center transition-colors">
                  <Phone size={16} />
                </div>
                <span className="text-base">(860) 447-3929</span>
              </a>
              <a href="mailto:oasisnewlondon@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-[var(--color-oasis-orange)] transition-colors group">
                <div className="w-10 h-10 border border-white/20 group-hover:border-[var(--color-oasis-orange)] flex items-center justify-center transition-colors">
                  <Mail size={16} />
                </div>
                <span className="text-base">oasisnewlondon@gmail.com</span>
              </a>
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-[var(--color-oasis-orange)] text-white font-bold uppercase tracking-wider text-sm px-8 py-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] w-fit"
            >
              Book the Venue
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative min-h-[400px] lg:min-h-0"
          >
            <div className="absolute inset-0 border-4 border-black shadow-[10px_10px_0_0_var(--color-oasis-orange)] overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=16+Bank+Street,+New+London,+CT+06320&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.6) contrast(1.2) brightness(0.85)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Oasis Pub Map"
                className="w-full h-full"
              />
              {/* Pulsing pin overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative">
                  <div className="absolute inset-0 w-12 h-12 -ml-6 -mt-6 bg-[var(--color-oasis-orange)] rounded-full opacity-30 animate-ping" />
                  <MapPin size={48} className="text-[var(--color-oasis-orange)] drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]" fill="currentColor" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 10px var(--color-oasis-orange); }
          92% { opacity: 1; }
          93% { opacity: 0.6; }
          94% { opacity: 1; }
          96% { opacity: 0.4; }
          97% { opacity: 1; }
        }
        :global(.animate-flicker) {
          animation: flicker 4s infinite;
        }
      `}</style>
    </section>
  );
}
