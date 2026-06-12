"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Music, Beer, Users, Heart, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

const PILLARS = [
  {
    icon: <Music size={28} />,
    title: "Music First",
    body: "Indie rock, metal, bass nights, DJ sets, sea shanty crews. If it's loud and honest, we'll book it. The room where the good bands play before they get too big for the room.",
    rotation: "-rotate-1",
  },
  {
    icon: <Beer size={28} />,
    title: "20+ Drafts",
    body: "Rotating craft beer, heavy on CT-local microbrews. Always something new on tap. Plus seltzers, canned cocktails, CBD drinks, wine, and zero-proof. We take the list seriously so you don't have to.",
    rotation: "rotate-1",
  },
  {
    icon: <Users size={28} />,
    title: "The Crowd",
    body: "Young, weird, and completely unpretentious. 21+. You'll meet musicians, artists, students, lifers, and the occasional touring band member crashing at the bar after soundcheck.",
    rotation: "rotate-2",
  },
  {
    icon: <Heart size={28} />,
    title: "Open 365",
    body: "Every single day of the year. Holidays, blizzards, slow Tuesdays, weird Wednesdays. Other bars close. We don't.",
    rotation: "-rotate-2",
  },
];

export default function AboutClient() {
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://oasisnewlondon.com" },
        { name: "About", url: "https://oasisnewlondon.com/about" },
      ]} />
      <PageHero
        eyebrow="Our Story"
        title="About"
        accent="The Oasis"
        subtitle="We've been called a lot of things. We'll take all of it."
      />

      <SectionDivider
        items={[
          "EST. 1990s",
          "16 BANK ST",
          "NEW LONDON CT",
          "ROCK CLUB",
          "LIVE MUSIC",
          "21+",
        ]}
        speed={40}
      />

      {/* The pitch */}
      <section className="relative bg-[var(--color-oasis-ink)] py-20 md:py-28 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs mb-4">
              ✦ The Real Deal ✦
            </p>
            <h2 className="poster-title text-4xl md:text-6xl text-white leading-[0.9]">
              Tiny haunt.<br />
              <span className="text-[var(--color-oasis-orange)]">Huge sound.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5 text-white/75 text-base md:text-lg leading-relaxed"
          >
            <p>
              We&apos;ve been called a hipster haunt, a dive bar, a rock club, and &ldquo;that place
              that smells like spilled Guinness and ambition.&rdquo; We&apos;ll take all of it.
            </p>
            <p>
              No bottle service. No bouncer attitude. No cover charge bullshit. Just twenty-plus
              craft beers on draught — mostly microbrews, a lot of local — a wall covered in show
              posters, and a stage where you might catch the band that&apos;s about to be your favorite
              before anybody else has heard of them.
            </p>
            <p>
              We&apos;re open 365 days a year. Yes, including the ones nobody else is open. If you
              love rock clubs, indie nights, bass drops, sea shanties, or just a really
              good pint with a stranger — you found the right place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What we're about — poster grid */}
      <section className="relative bg-black py-20 md:py-28 border-y border-white/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.4em] text-xs mb-4">
              ✦ What We&apos;re About ✦
            </p>
            <h2 className="poster-title text-5xl md:text-7xl text-white leading-none">
              Four reasons<br />
              <span className="text-[var(--color-oasis-orange)]">you&apos;ll be back.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={p.rotation}
              >
                <div className="relative bg-[var(--color-oasis-ink)] border-2 border-white/10 hover:border-[var(--color-oasis-orange)] p-6 md:p-8 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-oasis-orange)]">
                  <div className="text-[var(--color-oasis-orange)] mb-4">{p.icon}</div>
                  <h3 className="poster-title text-3xl text-white mb-3 leading-tight">{p.title}</h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider
        items={[
          "✦ LIVE MUSIC ✦",
          "20+ DRAFTS",
          "NO COVER",
          "OPEN 365",
          "21+",
          "CRAFT BEER",
        ]}
        reverse
        speed={45}
      />

      {/* CTA */}
      <section className="relative bg-[var(--color-oasis-orange)] py-16 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(0,0,0,0.1) 30px, rgba(0,0,0,0.1) 32px)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="poster-title text-4xl md:text-6xl text-black mb-8 leading-[0.9]"
          >
            Don&apos;t just take<br />our word for it.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/events"
              className="group inline-flex items-center justify-center gap-2 bg-black text-white font-bold uppercase tracking-wider text-sm px-8 py-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#fff]"
            >
              See Upcoming Shows
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 border-2 border-black text-black font-bold uppercase tracking-wider text-sm px-8 py-4 transition-all hover:-translate-y-1 hover:bg-black hover:text-white"
            >
              Find Us
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
