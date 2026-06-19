"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  photo_url?: string | null;
  display_order?: number;
  active?: boolean;
}

const PLACEHOLDER_STAFF: StaffMember[] = [
  {
    id: "ph-1",
    name: "Staff Member",
    role: "Bartender",
    bio: "Photo and bio coming soon.",
    photo_url: null,
  },
  {
    id: "ph-2",
    name: "Staff Member",
    role: "Door",
    bio: "Photo and bio coming soon.",
    photo_url: null,
  },
  {
    id: "ph-3",
    name: "Staff Member",
    role: "Sound",
    bio: "Photo and bio coming soon.",
    photo_url: null,
  },
];

function truncateBio(bio: string, max = 120) {
  if (bio.length <= max) return { short: bio, truncated: false };
  return { short: bio.slice(0, max).trim() + "…", truncated: true };
}

function StaffCard({
  member,
  onReadMore,
}: {
  member: StaffMember;
  onReadMore: (m: StaffMember) => void;
}) {
  const bio = member.bio ?? "";
  const { short, truncated } = truncateBio(bio);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--color-oasis-ink)] border border-white/10 p-6 flex flex-col items-center text-center"
    >
      {/* Photo */}
      <div className="w-28 h-28 rounded-2xl overflow-hidden mb-4 border-2 border-[var(--color-oasis-orange)]/40 bg-black/40 flex-shrink-0">
        {member.photo_url ? (
          <Image
            src={member.photo_url}
            alt={member.name}
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-bold uppercase tracking-wider text-center px-2">
            Photo<br />Coming<br />Soon
          </div>
        )}
      </div>

      <h3 className="poster-title text-xl text-white mb-1 leading-tight">{member.name}</h3>
      <p className="text-[var(--color-oasis-orange)] text-xs font-bold uppercase tracking-wider mb-3">
        {member.role}
      </p>

      {bio && (
        <p className="text-white/60 text-sm leading-relaxed">
          {short}
          {truncated && (
            <button
              onClick={() => onReadMore(member)}
              className="ml-1 text-[var(--color-oasis-orange)] font-bold hover:underline"
            >
              Read more
            </button>
          )}
        </p>
      )}
    </motion.div>
  );
}

function StaffModal({
  member,
  onClose,
}: {
  member: StaffMember;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[var(--color-oasis-ink)] border-2 border-[var(--color-oasis-orange)]/40 max-w-md w-full p-8 relative shadow-[8px_8px_0_0_var(--color-oasis-orange)]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {member.photo_url && (
            <div className="w-32 h-32 rounded-2xl overflow-hidden mb-5 border-2 border-[var(--color-oasis-orange)]/40 mx-auto">
              <Image
                src={member.photo_url}
                alt={member.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h3 className="poster-title text-2xl text-white mb-1 text-center">{member.name}</h3>
          <p className="text-[var(--color-oasis-orange)] text-xs font-bold uppercase tracking-wider mb-4 text-center">
            {member.role}
          </p>
          {member.bio && (
            <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function AboutClient({ staff }: { staff: StaffMember[] }) {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const displayStaff = staff.length > 0 ? staff : PLACEHOLDER_STAFF;

  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://oasisnewlondon.com" },
        { name: "About", url: "https://oasisnewlondon.com/about" },
      ]} />
      <PageHero
        title="About Us"
        subtitle="Open weekdays at 5pm, weekends at 7pm"
      />

      <SectionDivider
        items={[
          "LIVE MUSIC",
          "HAPPY HOUR",
          "CRAFT BEER",
          "BAD MOVIE NIGHT",
        ]}
        pixelsPerSecond={214}
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
              ✦ About Us ✦
            </p>
            <h2 className="poster-title text-4xl md:text-6xl text-white leading-[0.9]">
              A New London<br />
              <span className="text-[var(--color-oasis-orange)]">Staple.</span>
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
              The Oasis Pub is a neighborhood bar in the heart of downtown New London. It&apos;s the kind of place where you can stop in alone and strike up a conversation at the bar, meet friends for a night out or spend an evening discovering a new band.
            </p>
            <p>
              For more than two decades, the Oasis has served as a gathering place for locals, visitors, musicians, artists and anyone looking for a getaway from the average bar. The bar focuses on craft beer, with an ever-changing selection that highlights many local and independent breweries alongside unique canned offerings and a wide selection of non-alcoholic options, including CBD and nootropic beverages. Whether you&apos;re drinking alcohol or not, the Oasis is a place where you can feel comfortable settling in and being part of the room.
            </p>
            <p>
              Beyond the bar, the Oasis offers plenty of ways to spend an evening — challenge friends to shuffleboard, board games, video games and Jackbox, catch live music on weekends, or join us for our popular Bad Movie Night every Wednesday.
            </p>
            <p>
              The Oasis has also played an important role in New London&apos;s music community, hosting hundreds of local, regional, and touring artists over the years. Notable performers who have appeared on the Oasis stage include MGMT, Future Islands, Dr. Dog, Matt &amp; Kim, The Twilight Sad, Ra Ra Riot, Headlights, Large Professor, Sadat X, and many others.
            </p>
            <p>
              At its core, the Oasis is simply a neighborhood pub—a place for conversation, community, music, and good drinks, whether you&apos;re stopping by for a couple beers, a non-alcoholic social tonic or an entire evening with friends.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meet The Fam — staff section */}
      <section className="relative bg-black py-20 md:py-28 border-y border-white/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="poster-title text-5xl md:text-7xl text-white leading-none mb-3">
              Meet The Fam
            </h2>
            <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs">
              Who&apos;s Who Behind The Bar
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayStaff.map((member) => (
              <StaffCard
                key={member.id}
                member={member}
                onReadMore={setSelectedStaff}
              />
            ))}
          </div>
        </div>
      </section>

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
            Come Pay Us A<br />Visit Sometime.
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
              See Upcoming Events
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

      {/* Staff modal */}
      {selectedStaff && (
        <StaffModal member={selectedStaff} onClose={() => setSelectedStaff(null)} />
      )}
    </>
  );
}
