"use client";
import { useEffect, useRef } from "react";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  pixelsPerSecond?: number;
}

export default function Marquee({ items, reverse = false, pixelsPerSecond = 80 }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure one "set" width (half the track since we duplicate)
    const setWidth = track.scrollWidth / 2;

    const step = (ts: number) => {
      if (lastRef.current === 0) lastRef.current = ts;
      const delta = (ts - lastRef.current) / 1000; // seconds
      lastRef.current = ts;

      posRef.current += pixelsPerSecond * delta * (reverse ? -1 : 1);

      // Seamless loop: when we've scrolled one full set, reset without jump
      if (!reverse && posRef.current >= setWidth) posRef.current -= setWidth;
      if (reverse && posRef.current <= -setWidth) posRef.current += setWidth;

      track.style.transform = `translateX(${-posRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pixelsPerSecond, reverse]);

  // Triple items so there's always content visible during the loop reset
  const reel = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden bg-[var(--color-oasis-orange)] border-y-4 border-black py-3 md:py-4">
      <div
        ref={trackRef}
        className="flex gap-12 whitespace-nowrap"
        style={{ willChange: "transform" }}
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
    </div>
  );
}
