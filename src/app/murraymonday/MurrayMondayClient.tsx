"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { MurrayTab } from "./page";

// Items now use name = brewery (bold) + note = nickname (italic)
// Fallback: split on " · " for legacy items
function parseItem(name: string, note: string | null): { brewery: string; nickname: string } {
  if (note) return { brewery: name, nickname: note };
  const sep = " \u00b7 ";
  const idx = name.indexOf(sep);
  if (idx !== -1) return { brewery: name.slice(0, idx), nickname: name.slice(idx + sep.length) };
  return { brewery: name, nickname: "" };
}

export default function MurrayMondayClient({ tabs }: { tabs: MurrayTab[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen((prev) => (prev === id ? null : id));

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: "var(--color-oasis-black)" }}>

      {/* Single Sean head — right side, vertically centered, breathing animation */}
      <motion.div
        animate={{ opacity: [0.18, 0.26, 0.18], scale: [1, 1.04, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          right: "10%",
          top: "50%",
          translateY: "-50%",
          width: "min(580px, 70vw)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Image
          src="/images/sean-head-solo.png"
          alt=""
          width={580}
          height={607}
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
        />
      </motion.div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-oasis-orange)", marginBottom: "0.75rem" }}>
            Every Monday
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(3rem, 8vw, 5.5rem)", color: "var(--color-oasis-cream)", lineHeight: 1, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Murray<br />Monday
          </h1>
          <div style={{ width: "60px", height: "3px", background: "var(--color-oasis-orange)", borderRadius: "2px" }} />
        </div>

        {/* Accordion sections — each tab is a section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {tabs.map((tab, idx) => (
            <div key={tab.id} style={{ borderTop: `1px solid rgba(242,99,33,${idx === 0 ? "0.4" : "0.2"})` }}>
              <button
                onClick={() => toggle(tab.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.4rem 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: open === tab.id ? "var(--color-oasis-orange)" : "var(--color-oasis-cream)", transition: "color 0.2s" }}>
                  {tab.name}
                </span>
                <span style={{ fontSize: "1.5rem", color: "var(--color-oasis-orange)", lineHeight: 1, fontWeight: 300 }}>
                  {open === tab.id ? "\u2212" : "+"}
                </span>
              </button>

              {open === tab.id && (
                <div style={{ paddingBottom: "1.5rem" }}>
                  {tab.subtitle && (
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.85rem", color: "var(--color-oasis-cream)", marginBottom: "1.25rem", opacity: 0.7 }}>
                      {tab.subtitle}
                    </p>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {tab.items.map((item) => {
                      const { brewery, nickname } = parseItem(item.name, item.note ?? null);
                      return (
                        <div key={item.id} style={{ borderLeft: "2px solid var(--color-oasis-orange)", paddingLeft: "1rem" }}>
                          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "var(--color-oasis-cream)", margin: 0 }}>
                            <strong>{brewery}</strong>
                            {nickname && <>{" "}<em style={{ fontWeight: 400 }}>{nickname}</em></>}
                          </p>
                          {item.description && (
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(245,241,234,0.5)", margin: "0.2rem 0 0" }}>
                              {item.description}
                            </p>
                          )}
                          {item.price && (
                            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", color: "var(--color-oasis-orange)", margin: "0.15rem 0 0", fontWeight: 700 }}>
                              {item.price}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(242,99,33,0.2)" }} />
        </div>
      </div>
    </div>
  );
}
