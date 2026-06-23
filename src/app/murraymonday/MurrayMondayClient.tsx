"use client";
import { useState } from "react";
import type { MurraySection } from "./page";

export default function MurrayMondayClient({ sections }: { sections: MurraySection[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (key: string) => setOpen((prev) => (prev === key ? null : key));

  return (
    <div style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url('/images/sean-graphic.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>

      {/* Dark overlay so text stays readable */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.82)", zIndex: 0 }} />

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

        {/* Accordion sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {sections.map((section, idx) => (
            <div key={section.section_key} style={{ borderTop: `1px solid rgba(242,99,33,${idx === 0 ? "0.4" : "0.2"})` }}>
              <button
                onClick={() => toggle(section.section_key)}
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
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: open === section.section_key ? "var(--color-oasis-orange)" : "var(--color-oasis-cream)", transition: "color 0.2s" }}>
                  {section.title}
                </span>
                <span style={{ fontSize: "1.5rem", color: "var(--color-oasis-orange)", lineHeight: 1, fontWeight: 300 }}>
                  {open === section.section_key ? "−" : "+"}
                </span>
              </button>

              {open === section.section_key && (
                <div style={{ paddingBottom: "1.5rem" }}>
                  {section.note && (
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.85rem", color: "var(--color-oasis-cream)", marginBottom: "1.25rem", opacity: 0.7 }}>
                      {section.note}
                    </p>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {section.items.map((item, i) => (
                      <div key={i} style={{ borderLeft: "2px solid var(--color-oasis-orange)", paddingLeft: "1rem" }}>
                        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "var(--color-oasis-cream)", margin: 0 }}>
                          {item.brewery} <em style={{ fontWeight: 400 }}>{item.name}</em>
                        </p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(245,241,234,0.5)", margin: "0.2rem 0 0" }}>
                          {item.desc}
                        </p>
                        {item.price && (
                          <p style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", color: "var(--color-oasis-orange)", margin: "0.15rem 0 0", fontWeight: 700 }}>
                            {item.price}
                          </p>
                        )}
                      </div>
                    ))}
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
