"use client";
import { useEffect, useRef } from "react";

interface SectionDividerProps {
  items: string[];
  reverse?: boolean;
  pixelsPerSecond?: number;
  variant?: "orange" | "black";
}

export default function SectionDivider({
  items,
  reverse = false,
  pixelsPerSecond = 80,
  variant = "orange",
}: SectionDividerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setWidth = track.scrollWidth / 2;

    const step = (ts: number) => {
      if (lastRef.current === 0) lastRef.current = ts;
      const delta = (ts - lastRef.current) / 1000;
      lastRef.current = ts;

      posRef.current += pixelsPerSecond * delta * (reverse ? -1 : 1);

      if (!reverse && posRef.current >= setWidth) posRef.current -= setWidth;
      if (reverse && posRef.current <= -setWidth) posRef.current += setWidth;

      track.style.transform = `translateX(${-posRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pixelsPerSecond, reverse]);

  const reel = [...items, ...items, ...items];

  const bg = variant === "orange" ? "bg-[var(--color-oasis-orange)]" : "bg-black";
  const text = variant === "orange" ? "text-black" : "text-[var(--color-oasis-orange)]";
  const border = variant === "orange" ? "border-black" : "border-[var(--color-oasis-orange)]";
  const sparkle = variant === "orange" ? "text-black/40" : "text-[var(--color-oasis-orange)]/40";

  return (
    <div className={`relative overflow-hidden ${bg} border-y-4 ${border} py-3 md:py-4`}>
      <div
        ref={trackRef}
        className="flex gap-12 whitespace-nowrap"
        style={{ willChange: "transform" }}
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
    </div>
  );
}
