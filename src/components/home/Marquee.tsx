"use client";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  pixelsPerSecond?: number;
}

export default function Marquee({ items, reverse = false, pixelsPerSecond = 80 }: MarqueeProps) {
  const reel = [...items, ...items, ...items, ...items, ...items, ...items];
  const duration = Math.round(2000 / pixelsPerSecond);

  return (
    <div className="relative overflow-hidden bg-[var(--color-oasis-orange)] border-y-4 border-black py-3 md:py-4">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: `mq-scroll-${reverse ? "rev" : "fwd"} ${duration}s linear infinite`,
          willChange: "transform",
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
        @keyframes mq-scroll-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes mq-scroll-rev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
