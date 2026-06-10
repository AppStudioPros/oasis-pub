import Link from "next/link";
import Image from "next/image";
import { Calendar, Beer, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background poster collage */}
        <div className="absolute inset-0">
          <Image
            src="/images/heroes/poster-collage.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-4">
            16 Bank Street · New London, CT
          </p>
          <h1 className="poster-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-6">
            The Oasis Pub
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2 max-w-2xl mx-auto leading-snug">
            The epicenter of New London&apos;s music scene.
          </p>
          <p className="text-base md:text-lg text-white/70 mb-10 max-w-xl mx-auto">
            Tiny hipster haunt. Big sound. Open 365 days a year.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-oasis-orange)] hover:bg-[var(--color-oasis-orange-dark)] text-white font-bold uppercase tracking-wider text-sm px-7 py-4 transition-colors"
            >
              <Calendar size={18} />
              See Upcoming Shows
            </Link>
            <Link
              href="/drinks"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-[var(--color-oasis-orange)] hover:text-[var(--color-oasis-orange)] text-white font-bold uppercase tracking-wider text-sm px-7 py-4 transition-colors"
            >
              <Beer size={18} />
              Pick Your Poison
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO STRIPE */}
      <section className="bg-[var(--color-oasis-orange)] py-10 md:py-12 border-y-4 border-black">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="poster-title text-2xl md:text-4xl text-black leading-tight">
            Live bands. Craft beer. Loud nights. <br className="hidden md:block" />
            <span className="text-white">No cover charge bullshit.</span>
          </p>
        </div>
      </section>

      {/* WHAT WE'RE ABOUT */}
      <section className="bg-[var(--color-oasis-ink)] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Beer size={32} />}
            title="20+ Drafts"
            body="Curated craft beer rotation. Mostly microbrews, plenty of local. Always something new on tap."
            href="/drinks"
            cta="See What's Pouring"
          />
          <FeatureCard
            icon={<Calendar size={32} />}
            title="Live Music"
            body="Emerging bands. DJs. Sea shanty nights. From indie rock to bass music — the lineup never sits still."
            href="/events"
            cta="View Calendar"
          />
          <FeatureCard
            icon={<MapPin size={32} />}
            title="Downtown NL"
            body="16 Bank Street. Right in the middle of it. 21+. Open every single day of the year."
            href="/contact"
            cta="Find Us"
          />
        </div>
      </section>

      {/* HOURS BANNER */}
      <section className="bg-black py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="poster-title text-4xl md:text-5xl text-[var(--color-oasis-orange)] mb-6">
            Open 365 Days a Year
          </h2>
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto text-white">
            <div className="border border-white/20 p-4">
              <p className="display uppercase tracking-wider text-sm text-white/60 mb-1">Sun – Thu</p>
              <p className="text-2xl font-bold">7pm – 1am</p>
            </div>
            <div className="border border-[var(--color-oasis-orange)]/40 p-4">
              <p className="display uppercase tracking-wider text-sm text-[var(--color-oasis-orange)]/80 mb-1">Fri – Sat</p>
              <p className="text-2xl font-bold">7pm – 2am</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  body,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="border border-white/10 bg-black/40 p-8 hover:border-[var(--color-oasis-orange)] transition-colors group">
      <div className="text-[var(--color-oasis-orange)] mb-4">{icon}</div>
      <h3 className="poster-title text-3xl text-white mb-3">{title}</h3>
      <p className="text-white/70 text-sm leading-relaxed mb-5">{body}</p>
      <Link
        href={href}
        className="inline-block text-sm font-bold uppercase tracking-wider text-[var(--color-oasis-orange)] group-hover:underline"
      >
        {cta} →
      </Link>
    </div>
  );
}
