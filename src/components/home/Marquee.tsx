"use client";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  speed?: number;
}

export default function Marquee({ items, reverse = false, speed = 17 }: MarqueeProps) {
  // Double the items for seamless loop — only need 2x with -50% translate
  const reel = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden bg-[var(--color-oasis-orange)] border-y-4 border-black py-3 md:py-4"
      style={{ WebkitMaskImage: 'none' }}
    >
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
      >
        {reel.map((item, i) => (
          <div key={i} className="flex items-center gap-12 flex-shrink-0">
            <span className="poster-title text-2xl md:text-4xl text-black tracking-tight">
              {item}
            </span>
            <span className="text-black/40 text-3xl">✦</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .overflow-hidden > div {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
