"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ── Spray paint / graffiti-style SVG icons ──
   Style: filled silhouettes, thick outlines, drips, splatter dots  ── */

// Shared splatter dots for that spray-can edge feel
function Splatter({ x, y, r = 1.2 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill="currentColor" opacity="0.5" />;
}

function PintGlass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" fill="none" className={className} aria-hidden>
      {/* Splatter */}
      <Splatter x={4} y={10} r={1.5} /><Splatter x={60} y={18} r={1} /><Splatter x={8} y={55} r={1.2} /><Splatter x={58} y={60} r={1} /><Splatter x={6} y={30} /><Splatter x={60} y={44} />
      {/* Drip shadow */}
      <path d="M15 14 L11 63 L53 63 L49 14 Z" fill="currentColor" opacity="0.15" transform="translate(2,2)"/>
      {/* Body fill */}
      <path d="M15 14 L11 63 L53 63 L49 14 Z" fill="currentColor" opacity="0.25"/>
      {/* Bold outline */}
      <path d="M15 14 L11 63 L53 63 L49 14 Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Foam */}
      <path d="M14 14 Q20 5 26 12 Q30 4 32 12 Q36 4 40 11 Q45 4 50 14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" opacity="0.3"/>
      {/* Handle */}
      <path d="M49 22 Q62 22 62 36 Q62 50 49 50" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      {/* Drip from bottom */}
      <path d="M28 63 Q27 67 28 70 Q29 67 28 63Z" fill="currentColor"/>
      <path d="M38 63 Q37 68 38 71 Q39 68 38 63Z" fill="currentColor"/>
      {/* Shine */}
      <path d="M18 24 Q20 32 18 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35"/>
    </svg>
  );
}

function SeltzerCan({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 72" fill="none" className={className} aria-hidden>
      <Splatter x={3} y={12} r={1.5} /><Splatter x={49} y={20} r={1} /><Splatter x={4} y={58} r={1.2} /><Splatter x={50} y={55} /><Splatter x={2} y={36} r={1} />
      {/* Shadow */}
      <rect x="11" y="17" width="30" height="46" rx="5" fill="currentColor" opacity="0.15" transform="translate(2,2)"/>
      {/* Body fill */}
      <rect x="11" y="17" width="30" height="46" rx="5" fill="currentColor" opacity="0.2"/>
      {/* Bold outline */}
      <rect x="11" y="17" width="30" height="46" rx="5" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round"/>
      {/* Top + bottom curves */}
      <path d="M11 17 Q26 10 41 17" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="currentColor" opacity="0.3"/>
      <path d="M11 63 Q26 70 41 63" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="currentColor" opacity="0.2"/>
      {/* Pull tab */}
      <path d="M22 14 Q26 6 30 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="26" cy="13" rx="3" ry="2" stroke="currentColor" strokeWidth="2.5"/>
      {/* Ribbing */}
      <line x1="11" y1="27" x2="41" y2="27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
      <line x1="11" y1="54" x2="41" y2="54" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
      {/* Drips */}
      <path d="M22 63 Q21 67 22 70 Q23 67 22 63Z" fill="currentColor"/>
      <path d="M33 63 Q32 68 33 71 Q34 68 33 63Z" fill="currentColor"/>
    </svg>
  );
}

function HempLeaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" fill="none" className={className} aria-hidden>
      <Splatter x={2} y={8} r={1.5} /><Splatter x={62} y={12} r={1} /><Splatter x={4} y={60} r={1.2} /><Splatter x={60} y={58} r={1} /><Splatter x={5} y={35} /><Splatter x={59} y={40} />
      {/* Shadow */}
      <path d="M32 6 L36 20 L50 14 L40 26 L58 28 L44 34 L56 44 L40 40 L38 58 L32 48 L26 58 L24 40 L8 44 L20 34 L6 28 L24 26 L14 14 L28 20 Z" fill="currentColor" opacity="0.15" transform="translate(2,2)"/>
      {/* Leaf fill */}
      <path d="M32 6 L36 20 L50 14 L40 26 L58 28 L44 34 L56 44 L40 40 L38 58 L32 48 L26 58 L24 40 L8 44 L20 34 L6 28 L24 26 L14 14 L28 20 Z" fill="currentColor" opacity="0.25"/>
      {/* Bold outline */}
      <path d="M32 6 L36 20 L50 14 L40 26 L58 28 L44 34 L56 44 L40 40 L38 58 L32 48 L26 58 L24 40 L8 44 L20 34 L6 28 L24 26 L14 14 L28 20 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      {/* Stem */}
      <line x1="32" y1="48" x2="32" y2="68" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Center vein */}
      <line x1="32" y1="16" x2="32" y2="48" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function WineGlass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 74" fill="none" className={className} aria-hidden>
      <Splatter x={2} y={10} r={1.5} /><Splatter x={50} y={16} r={1} /><Splatter x={4} y={55} r={1.2} /><Splatter x={50} y={62} /><Splatter x={2} y={35} r={1} />
      {/* Bowl shadow */}
      <path d="M10 6 Q8 32 26 44 Q44 32 42 6 Z" fill="currentColor" opacity="0.15" transform="translate(2,2)"/>
      {/* Bowl fill */}
      <path d="M10 6 Q8 32 26 44 Q44 32 42 6 Z" fill="currentColor" opacity="0.22"/>
      {/* Bowl outline */}
      <path d="M10 6 Q8 32 26 44 Q44 32 42 6 Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round"/>
      {/* Wine fill */}
      <path d="M14 28 Q26 36 38 28 L42 6 L10 6 Z" fill="currentColor" opacity="0.3"/>
      <path d="M14 28 Q26 36 38 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Stem */}
      <line x1="26" y1="44" x2="26" y2="64" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Base */}
      <path d="M13 64 Q26 70 39 64" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Drip */}
      <path d="M26 70 Q25 74 26 76 Q27 74 26 70Z" fill="currentColor"/>
      {/* Shine */}
      <path d="M14 14 Q16 22 14 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35"/>
    </svg>
  );
}

function EmptyBeerGlass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" fill="none" className={className} aria-hidden>
      <Splatter x={4} y={10} r={1.5} /><Splatter x={60} y={18} r={1} /><Splatter x={6} y={60} r={1.2} /><Splatter x={58} y={58} /><Splatter x={3} y={38} r={1} />
      {/* Glass body — EMPTY, just outline + handle */}
      <path d="M15 14 L11 63 L53 63 L49 14 Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Rim top */}
      <line x1="15" y1="14" x2="49" y2="14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Handle */}
      <path d="M49 22 Q62 22 62 36 Q62 50 49 50" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Residue ring at bottom — classic empty beer */}
      <path d="M18 56 Q32 60 46 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      {/* Lone bubble */}
      <circle cx="32" cy="45" r="2.5" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <circle cx="24" cy="34" r="1.5" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      {/* Shine */}
      <path d="M18 24 Q20 32 18 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35"/>
      {/* "EMPTY" vibe — drip on outside */}
      <path d="M11 63 Q10 67 11 70 Q12 67 11 63Z" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

function BabyBottle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 78" fill="none" className={className} aria-hidden>
      <Splatter x={2} y={12} r={1.5} /><Splatter x={50} y={18} r={1} /><Splatter x={3} y={62} r={1.2} /><Splatter x={50} y={58} />
      {/* Body shadow */}
      <path d="M14 34 Q10 42 10 54 Q10 70 26 70 Q42 70 42 54 Q42 42 38 34 Z" fill="currentColor" opacity="0.15" transform="translate(2,2)"/>
      {/* Body fill */}
      <path d="M14 34 Q10 42 10 54 Q10 70 26 70 Q42 70 42 54 Q42 42 38 34 Z" fill="currentColor" opacity="0.22"/>
      {/* Body outline */}
      <path d="M14 34 Q10 42 10 54 Q10 70 26 70 Q42 70 42 54 Q42 42 38 34 Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Measurement marks */}
      <line x1="11" y1="48" x2="16" y2="48" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
      <line x1="11" y1="56" x2="16" y2="56" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
      <line x1="11" y1="64" x2="16" y2="64" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
      {/* Neck */}
      <rect x="19" y="18" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="3.5"/>
      <rect x="19" y="18" width="14" height="18" rx="3" fill="currentColor" opacity="0.15"/>
      {/* Nipple collar */}
      <ellipse cx="26" cy="18" rx="8" ry="3" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.2"/>
      {/* Nipple tip */}
      <path d="M22 18 Q22 10 26 7 Q30 10 30 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="currentColor" opacity="0.2"/>
      <path d="M24 12 Q26 7 28 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Drip from bottom */}
      <path d="M26 70 Q25 74 26 77 Q27 74 26 70Z" fill="currentColor"/>
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
    icon: HempLeaf,
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
    icon: EmptyBeerGlass,
  },
  {
    label: "Kids Menu",
    sample: "Bud · Yuengling · Miller High Life",
    accent: "bg-white",
    textColor: "text-black",
    rotation: "rotate-1",
    icon: BabyBottle,
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
