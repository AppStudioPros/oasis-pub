"use client";

interface SectionDividerProps {
  items: string[];
  reverse?: boolean;
  speed?: number;
  variant?: "orange" | "black";
}

export default function SectionDivider({
  items,
  reverse = false,
  speed = 40,
  variant = "orange",
}: SectionDividerProps) {
  const reel = [...items, ...items, ...items];
  const bg = variant === "orange" ? "bg-[var(--color-oasis-orange)]" : "bg-black";
  const text = variant === "orange" ? "text-black" : "text-[var(--color-oasis-orange)]";
  const border = variant === "orange" ? "border-black" : "border-[var(--color-oasis-orange)]";
  const sparkle = variant === "orange" ? "text-black/40" : "text-[var(--color-oasis-orange)]/40";

  return (
    <div className={`relative overflow-hidden ${bg} border-y-4 ${border} py-3 md:py-4`}>
      <div
        className="flex gap-12 whitespace-nowrap will-change-transform"
        style={{
          animation: `divider-${reverse ? "rev" : "fwd"} ${speed}s linear infinite`,
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

      <style jsx>{`
        @keyframes divider-fwd {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes divider-rev {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
