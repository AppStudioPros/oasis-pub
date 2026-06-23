"use client";
import { useState } from "react";
import type { MurraySection } from "./page";

export default function MurrayMondayClient({ sections }: { sections: MurraySection[] }) {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => setOpen((prev) => (prev === key ? null : key));

  return (
    <main style={{ minHeight: "100vh", background: "#111", display: "flex", flexDirection: "column" }}>
      {/* Sean face tiled background */}
      <div style={{
        flex: 1,
        backgroundImage: "url('/images/sean-graphic.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "280px auto",
        backgroundPosition: "center top",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 4rem",
        position: "relative",
      }}>
        {/* dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />

        {/* Title */}
        <h1 style={{
          position: "relative",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          color: "white",
          textAlign: "center",
          marginBottom: "2.5rem",
          letterSpacing: "-0.02em",
          zIndex: 1,
        }}>
          murray monday
        </h1>

        {/* White accordion card */}
        <div style={{
          position: "relative",
          zIndex: 1,
          background: "white",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "640px",
          padding: "0.5rem 0",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}>
          {sections.map((section, idx) => (
            <div key={section.section_key}>
              {/* Divider (top of first, between all) */}
              <div style={{ height: 1, background: "#e85d20", margin: "0 2rem", opacity: 0.6 }} />

              {/* Accordion header */}
              <button
                onClick={() => toggle(section.section_key)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.25rem 2rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#e85d20",
                }}>
                  {section.title}
                </span>
                <span style={{ fontSize: "1.4rem", color: "#e85d20", fontWeight: 300, lineHeight: 1 }}>
                  {open === section.section_key ? "−" : "+"}
                </span>
              </button>

              {/* Accordion content */}
              {open === section.section_key && (
                <div style={{ padding: "0 2rem 1.5rem" }}>
                  {section.note && (
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#111", marginBottom: "0.5rem" }}>
                      {section.note}
                    </p>
                  )}
                  <div style={{ borderTop: "2px solid #aaa", marginBottom: "1rem", marginTop: "0.25rem", width: 40 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {section.items.map((item, i) => (
                      <div key={i}>
                        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#111", margin: 0 }}>
                          {item.brewery} <em>{item.name}</em>
                        </p>
                        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", color: "#777", margin: "0.15rem 0 0" }}>
                          {item.desc}
                        </p>
                        {item.price && (
                          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", color: "#e85d20", margin: "0.1rem 0 0", fontWeight: 600 }}>
                            {item.price}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom divider on last */}
              {idx === sections.length - 1 && (
                <div style={{ height: 1, background: "#e85d20", margin: "0 2rem", opacity: 0.6 }} />
              )}
            </div>
          ))}
          <div style={{ height: "0.5rem" }} />
        </div>
      </div>
    </main>
  );
}
