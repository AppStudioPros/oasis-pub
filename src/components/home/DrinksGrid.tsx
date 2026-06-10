"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const TILES = [
  {
    label: "Craft Beer",
    sample: "Tox · Fat Orange Cat · Beer'd",
    rotation: "-rotate-1",
    icon: "/images/icons/craft-beer.png",
  },
  {
    label: "Seltzers & Cans",
    sample: "Truly · Alc-A-Chino · Dogfish",
    rotation: "rotate-1",
    icon: "/images/icons/seltzers.png",
  },
  {
    label: "CBD Drinks",
    sample: "Goodwell · Hooker",
    rotation: "-rotate-2",
    icon: "/images/icons/cbd.png",
  },
  {
    label: "Wine",
    sample: "Archer Roose · Canned & honest",
    rotation: "rotate-2",
    icon: "/images/icons/wine.png",
  },
  {
    label: "Alcohol-Free",
    sample: "Recess · Blind Tiger · Athletic",
    rotation: "-rotate-1",
    icon: "/images/icons/alcohol-free.png",
  },
  {
    label: "Kids Menu",
    sample: "Bud · Yuengling · Miller High Life",
    rotation: "rotate-1",
    icon: "/images/icons/kids-menu.png",
  },
];

export default function DrinksGrid() {
  return (
    <section className="relative bg-[var(--color-oasis-orange)] py-16 md:py-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(0,0,0,0.1) 30px, rgba(0,0,0,0.1) 32px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-black/60 font-bold uppercase tracking-[0.4em] text-xs mb-3">
            ✦ Pick Your Poison ✦
          </p>
          <h2 className="poster-title text-5xl md:text-7xl text-black leading-none">
            The Drinks
          </h2>
          <p className="text-black/70 text-sm md:text-base mt-4 max-w-xl mx-auto">
            Twenty-plus drafts. Canned cocktails. CBD chill. Mocktails. Whatever your night needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                href="/drinks"
                className={`group relative block w-full ${tile.rotation} hover:rotate-0 transition-transform duration-500`}
              >
                <div
                  className="relative bg-white aspect-[4/3] border-2 border-black shadow-[5px_5px_0_0_#000] group-hover:shadow-[7px_7px_0_0_#000] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all overflow-hidden p-4 md:p-5 flex flex-col justify-between"
                >
                  {/* Noise texture */}
                  <div className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none">
                    <svg width="100%" height="100%">
                      <filter id={`grain-${i}`}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
                      </filter>
                      <rect width="100%" height="100%" filter={`url(#grain-${i})`} />
                    </svg>
                  </div>

                  {/* Oversized icon — bleeds off top-right corner, slightly opaque */}
                  <div className="absolute -top-6 right-4 w-64 h-64 md:w-72 md:h-72 pointer-events-none z-0">
                    <Image
                      src={tile.icon}
                      alt={tile.label}
                      fill
                      className="object-contain"
                      style={{ mixBlendMode: "multiply", opacity: 0.88 }}
                      sizes="144px"
                    />
                  </div>

                  {/* Top row: label only */}
                  <div className="relative z-10">
                    <div className="text-black/55 text-[9px] font-bold uppercase tracking-[0.25em] mb-1">
                      Menu /
                    </div>
                    <h3 className="poster-title text-[var(--color-oasis-orange)] leading-[0.95] text-2xl md:text-3xl">
                      {tile.label}
                    </h3>
                  </div>

                  {/* Bottom row: sample + arrow */}
                  <div className="relative z-10 flex items-end justify-between gap-2">
                    <p className="text-black/70 italic text-[10px] md:text-xs leading-tight">
                      {tile.sample}
                    </p>
                    <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-black text-[var(--color-oasis-orange)] flex items-center justify-center group-hover:bg-[var(--color-oasis-orange)] group-hover:text-black transition-colors">
                      <ArrowRight size={14} />
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
          className="text-center text-black/60 text-xs italic mt-8"
        >
          ✦ Tap list rotates often — ask your bartender for tonight&apos;s pour list ✦
        </motion.p>
      </div>
    </section>
  );
}
