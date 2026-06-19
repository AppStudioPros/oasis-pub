"use client";

interface SectionDividerProps {
  items: string[];
  reverse?: boolean;
  pixelsPerSecond?: number;
  variant?: "orange" | "black";
}

export default function SectionDivider({
  items,
  reverse = false,
  pixelsPerSecond = 214,
  variant = "orange",
}: SectionDividerProps) {
  // Repeat enough times to guarantee fill on any screen width
  const reel = [...items, ...items, ...items, ...items, ...items, ...items];

  const bg = variant === "orange" ? "bg-[var(--color-oasis-orange)]" : "bg-black";
  const text = variant === "orange" ? "text-black" : "text-[var(--color-oasis-orange)]";
  const border = variant === "orange" ? "border-black" : "border-[var(--color-oasis-orange)]";
  const sparkle = variant === "orange" ? "text-black/40" : "text-[var(--color-oasis-orange)]/40";

  // Duration: lower = faster. We derive from pixelsPerSecond vs a ~2000px wide reel estimate
  const duration = Math.round(2000 / pixelsPerSecond);

  return (
    <div className={`relative overflow-hidden ${bg} border-y-4 ${border} py-3 md:py-4`}>
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: `sd-scroll-${reverse ? "rev" : "fwd"} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {reel.map((item, i) => (
          <div key={i} className="flex items-center gap-12 flex-shrink-0">
            <span className={`poster-title text-2xl md:text-4xl ${text} tracking-tight`}>
              {item}
            </span>
            <span className={`text-3xl ${sparkle}`}>✦</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes sd-scroll-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes sd-scroll-rev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
