import Image from "next/image";
import Link from "next/link";
import { Music, Beer, Users, Heart } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "The Oasis Pub — the epicenter of New London's music scene. Tiny hipster haunt, 20+ craft beers, emerging bands, and the best dive bar energy in CT.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/heroes/poster-collage.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs mb-3">
            Our Story
          </p>
          <h1 className="poster-title text-5xl md:text-7xl text-white">About The Oasis</h1>
        </div>
      </section>

      {/* The pitch */}
      <section className="bg-[var(--color-oasis-ink)] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-2xl md:text-3xl text-white leading-snug mb-8 font-light">
            The Oasis is what a real bar is supposed to feel like.
          </p>
          <div className="space-y-5 text-white/75 text-base md:text-lg leading-relaxed">
            <p>
              We&apos;re a tiny hipster haunt tucked into 16 Bank Street in downtown New London — the
              epicenter of the city&apos;s music scene and the hippest little bar in town. We&apos;ve been
              the home for emerging bands, working DJs, and anyone who needs a place to actually
              hear music played the way it&apos;s supposed to be played.
            </p>
            <p>
              No bottle service. No bouncer attitude. No cover charge bullshit. Just twenty-plus
              craft beers on draught — mostly microbrews, a lot of local — a wall covered in show
              posters, and a stage where you might catch the band that&apos;s about to be your favorite
              before anybody else has heard of them.
            </p>
            <p>
              We&apos;re open 365 days a year. Yes, including the ones nobody else is open. If you
              love rock clubs, dive bars, indie nights, bass drops, sea shanties, or just a really
              good pint with a stranger — you found the right place.
            </p>
          </div>
        </div>
      </section>

      {/* What we're about */}
      <section className="bg-black py-16 md:py-20 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="poster-title text-4xl md:text-5xl text-[var(--color-oasis-orange)] mb-12 text-center">
            What We&apos;re About
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Pillar
              icon={<Music size={28} />}
              title="Music First"
              body="Indie rock, metal, bass nights, DJ sets, sea shanty crews. If it&apos;s loud and honest, we&apos;ll book it. The lineup never sits still."
            />
            <Pillar
              icon={<Beer size={28} />}
              title="20+ Drafts"
              body="A curated rotation of craft beer — heavy on microbrews and CT-local. Always something new on tap. Plus seltzers, cocktails, CBD drinks, wine, and zero-proof options."
            />
            <Pillar
              icon={<Users size={28} />}
              title="The Crowd"
              body="Young, weird, friendly. 21+. You&apos;ll meet musicians, artists, students, lifers, and the occasional touring band member crashing at the bar after their set."
            />
            <Pillar
              icon={<Heart size={28} />}
              title="Open 365"
              body="Every single day of the year. Holidays, blizzards, slow Tuesdays, weird Wednesdays. The door&apos;s open."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-oasis-orange)] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="poster-title text-3xl md:text-5xl text-black mb-6">
            Come See What&apos;s On Tonight.
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center bg-black text-white font-bold uppercase tracking-wider text-sm px-7 py-4 hover:bg-[var(--color-oasis-ink)] transition-colors"
            >
              See Upcoming Shows
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-black text-black font-bold uppercase tracking-wider text-sm px-7 py-4 hover:bg-black hover:text-white transition-colors"
            >
              Find Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Pillar({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--color-oasis-orange)]/10 border border-[var(--color-oasis-orange)]/40 flex items-center justify-center text-[var(--color-oasis-orange)]">
        {icon}
      </div>
      <div>
        <h3 className="poster-title text-2xl text-white mb-2">{title}</h3>
        <p className="text-white/70 text-sm md:text-base leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
