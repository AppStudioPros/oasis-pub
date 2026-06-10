"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ── Graffiti-style SVG icons ── */
function PintGlass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 70" fill="none" className={className} aria-hidden>
      {/* Body */}
      <path d="M14 12 L10 62 L50 62 L46 12 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Foam top */}
      <path d="M13 12 Q18 4 24 10 Q28 3 30 10 Q34 3 38 9 Q43 3 47 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Bubbles */}
      <circle cx="24" cy="38" r="2.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="33" cy="28" r="1.8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="28" cy="50" r="2" stroke="currentColor" strokeWidth="2"/>
      {/* Handle */}
      <path d="M46 20 Q58 20 58 32 Q58 44 46 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

function SeltzerCan({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 70" fill="none" className={className} aria-hidden>
      {/* Can body */}
      <rect x="10" y="15" width="30" height="44" rx="4" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      {/* Top lid */}
      <path d="M10 15 Q25 8 40 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      {/* Bottom curve */}
      <path d="M10 59 Q25 66 40 59" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      {/* Pull tab */}
      <path d="M22 12 Q25 5 28 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="25" cy="11" r="2" stroke="currentColor" strokeWidth="2"/>
      {/* Ribbing lines */}
      <line x1="10" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="10" y1="52" x2="40" y2="52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      {/* Bubbles */}
      <circle cx="21" cy="38" r="2" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="30" cy="31" r="1.5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="26" cy="44" r="1.5" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  );
}

function CbdBottle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 75" fill="none" className={className} aria-hidden>
      {/* Bottle body */}
      <path d="M16 30 L12 68 L38 68 L34 30 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Neck */}
      <rect x="19" y="16" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="3"/>
      {/* Dropper bulb */}
      <ellipse cx="25" cy="10" rx="6" ry="8" stroke="currentColor" strokeWidth="3"/>
      {/* Dropper tip */}
      <line x1="25" y1="18" x2="25" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Drop */}
      <path d="M25 72 Q22 76 25 78 Q28 76 25 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Label lines */}
      <line x1="16" y1="45" x2="34" y2="45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="17" y1="52" x2="33" y2="52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      {/* Leaf */}
      <path d="M22 39 Q25 32 28 39 Q25 38 22 39Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function WineGlass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 75" fill="none" className={className} aria-hidden>
      {/* Bowl */}
      <path d="M10 8 Q8 32 25 44 Q42 32 40 8 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Stem */}
      <line x1="25" y1="44" x2="25" y2="64" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      {/* Base */}
      <path d="M13 64 Q25 68 37 64" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      {/* Wine fill line */}
      <path d="M13 28 Q25 34 37 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      {/* Shine */}
      <path d="M14 16 Q16 22 14 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function UpsideDownGlass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 70" fill="none" className={className} aria-hidden>
      {/* Upside-down glass — trapezoid flipped, wider at top */}
      <path d="M8 12 L14 58 L36 58 L42 12 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Rim (now at bottom) */}
      <path d="M14 58 Q25 64 36 58" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      {/* Opening at top */}
      <line x1="8" y1="12" x2="42" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      {/* Drips from top opening */}
      <path d="M18 12 Q17 6 19 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25 12 Q24 4 26 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 12 Q31 6 33 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* Drop dots */}
      <circle cx="19" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="26" cy="1" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="33" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      {/* Handle */}
      <path d="M42 22 Q54 22 54 34 Q54 46 42 46" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

function BabyBeerBottle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 80" fill="none" className={className} aria-hidden>
      {/* Bottle body */}
      <path d="M16 36 Q12 42 12 56 Q12 70 25 70 Q38 70 38 56 Q38 42 34 36 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Neck */}
      <rect x="19" y="18" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="3"/>
      {/* Baby nipple top */}
      <path d="M19 18 Q19 10 25 8 Q31 10 31 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M22 12 Q25 6 28 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Label */}
      <rect x="15" y="46" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
      {/* Star / label decoration */}
      <path d="M25 50 L26 53 L29 53 L27 55 L28 58 L25 56 L22 58 L23 55 L21 53 L24 53 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.8"/>
    </svg>
  );
}

/* ── Tile config ── */
const TILES = [
  {
    label: "Craft Beer",
    sample: "Tox · Fat Orange Cat · Beer'd",
    accent: "bg-[var(--color-oasis-orange)]",
    textColor: "text-black",
    rotation: "-rotate-1",
    icon: PintGlass,
  },
  {
    label: "Seltzers & Cans",
    sample: "Truly · Alc-A-Chino · Dogfish",
    accent: "bg-white",
    textColor: "text-black",
    rotation: "rotate-1",
    icon: SeltzerCan,
  },
  {
    label: "CBD Drinks",
    sample: "Goodwell · Hooker",
    accent: "bg-[var(--color-oasis-orange)]/85",
    textColor: "text-black",
    rotation: "-rotate-2",
    icon: CbdBottle,
  },
  {
    label: "Wine",
    sample: "Archer Roose · Canned & honest",
    accent: "bg-white/90",
    textColor: "text-black",
    rotation: "rotate-2",
    icon: WineGlass,
  },
  {
    label: "Alcohol-Free",
    sample: "Recess · Blind Tiger · Athletic",
    accent: "bg-[var(--color-oasis-orange)]",
    textColor: "text-black",
    rotation: "-rotate-1",
    icon: UpsideDownGlass,
  },
  {
    label: "Kids Menu",
    sample: "Bud · Yuengling · Miller High Life",
    accent: "bg-white",
    textColor: "text-black",
    rotation: "rotate-1",
    icon: BabyBeerBottle,
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
          {TILES.map((tile, i) => {
            const Icon = tile.icon;
            return (
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
                    className={`relative ${tile.accent} aspect-[4/3] border-2 border-black shadow-[5px_5px_0_0_#000] group-hover:shadow-[7px_7px_0_0_#000] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all overflow-hidden p-4 md:p-5 flex flex-col justify-between`}
                  >
                    {/* Noise texture */}
                    <div className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none">
                      <svg width="100%" height="100%">
                        <filter id={`grain-${i}`}>
                          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
                        </filter>
                        <rect width="100%" height="100%" filter={`url(#grain-${i})`} />
                      </svg>
                    </div>

                    {/* Icon — top right, large, graffiti style */}
                    <div className="relative flex items-start justify-between gap-2">
                      <div>
                        <div className="text-black/55 text-[9px] font-bold uppercase tracking-[0.25em] mb-1">
                          Menu /
                        </div>
                        <h3 className="poster-title text-black leading-[0.95] text-2xl md:text-3xl">
                          {tile.label}
                        </h3>
                      </div>
                      <Icon className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 text-black/70 group-hover:text-black transition-colors" />
                    </div>

                    {/* Bottom row */}
                    <div className="relative flex items-end justify-between gap-2">
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
            );
          })}
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
