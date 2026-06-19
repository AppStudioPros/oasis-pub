"use client";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  speed?: number; // seconds for one full loop
}

export default function Marquee({ items, reverse = false, speed = 18 }: MarqueeProps) {
  // Duplicate items to allow seamless looping
  const reel = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden bg-[var(--color-oasis-orange)] border-y-4 border-black py-3 md:py-4">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: `marquee-${reverse ? "rev" : "fwd"} ${speed}s linear infinite`,
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
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

      <style jsx>{`
        @keyframes marquee-fwd {
          0% { transform: translateZ(0) translateX(0); }
          100% { transform: translateZ(0) translateX(-33.333%); }
        }
        @keyframes marquee-rev {
          0% { transform: translateZ(0) translateX(-33.333%); }
          100% { transform: translateZ(0) translateX(0); }
        }
      `}</style>
    </div>
  );
}
