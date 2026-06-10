"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const TILES = [
  {
    label: "Craft Beer",
    sample: "Tox Fugu · Fat Orange Cat · Beer'd",
    accent: "bg-[var(--color-oasis-orange)]",
    rotation: "-rotate-1",
    big: true,
  },
  {
    label: "Seltzers & Cans",
    sample: "Truly · Alc-A-Chino · Dogfish",
    accent: "bg-white",
    rotation: "rotate-1",
  },
  {
    label: "CBD Drinks",
    sample: "Goodwell · Hooker",
    accent: "bg-[var(--color-oasis-orange)]/60",
    rotation: "-rotate-2",
  },
  {
    label: "Wine",
    sample: "Archer Roose · Canned & honest",
    accent: "bg-white/80",
    rotation: "rotate-1",
  },
  {
    label: "Alcohol-Free",
    sample: "Recess · Blind Tiger · Athletic",
    accent: "bg-[var(--color-oasis-orange)]",
    rotation: "-rotate-1",
  },
  {
    label: "Kids Menu",
    sample: "Bud · Yuengling · Miller High Life",
    accent: "bg-white",
    rotation: "rotate-2",
  },
];

export default function DrinksGrid() {
  return (
    <section className="relative bg-[var(--color-oasis-orange)] py-20 md:py-28 overflow-hidden">
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(0,0,0,0.1) 30px, rgba(0,0,0,0.1) 32px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-black/60 font-bold uppercase tracking-[0.4em] text-xs mb-4">
            ✦ Pick Your Poison ✦
          </p>
          <h2 className="poster-title text-6xl md:text-8xl text-black leading-none">
            The Drinks
          </h2>
          <p className="text-black/70 text-base md:text-lg mt-6 max-w-xl mx-auto">
            Twenty-plus drafts. Canned cocktails. CBD chill. Mocktails. Whatever your night needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={tile.big ? "col-span-2 md:col-span-2 row-span-2" : ""}
            >
              <Link
                href="/drinks"
                className={`group relative block w-full h-full ${tile.rotation} hover:rotate-0 transition-transform duration-500`}
              >
                <div
                  className={`relative ${tile.accent} ${
                    tile.big ? "aspect-[4/3] md:aspect-[5/3]" : "aspect-square"
                  } border-4 border-black shadow-[6px_6px_0_0_#000] group-hover:shadow-[10px_10px_0_0_#000] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all overflow-hidden p-6 md:p-8 flex flex-col justify-between`}
                >
                  {/* Noise texture */}
                  <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none">
                    <svg width="100%" height="100%">
                      <filter id={`grain-${i}`}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
                      </filter>
                      <rect width="100%" height="100%" filter={`url(#grain-${i})`} />
                    </svg>
                  </div>

                  <div className="relative">
                    <div className="text-black/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                      Menu /
                    </div>
                    <h3
                      className={`poster-title text-black leading-[0.9] ${
                        tile.big
                          ? "text-5xl md:text-7xl lg:text-8xl"
                          : "text-2xl md:text-4xl"
                      }`}
                    >
                      {tile.label}
                    </h3>
                  </div>

                  <div className="relative flex items-end justify-between gap-3">
                    <p
                      className={`text-black/70 italic ${
                        tile.big ? "text-sm md:text-base" : "text-xs"
                      } leading-snug`}
                    >
                      {tile.sample}
                    </p>
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-black text-[var(--color-oasis-orange)] flex items-center justify-center group-hover:bg-[var(--color-oasis-orange)] group-hover:text-black transition-colors">
                      <ArrowRight size={tile.big ? 18 : 14} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-black/60 text-xs italic mt-10"
        >
          ✦ Tap list rotates often — ask your bartender for tonight&apos;s pour list ✦
        </motion.p>
      </div>
    </section>
  );
}
