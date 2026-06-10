"use client";

import { useState } from "react";
import Image from "next/image";

export default function WorkClient() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("/api/work-with-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not submit your application.");
      }
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/heroes/poster-collage.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs mb-3">
            Now Hiring
          </p>
          <h1 className="poster-title text-5xl md:text-7xl text-white">Work With Us</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-[var(--color-oasis-ink)] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xl text-white/90 mb-3 leading-snug">
            We&apos;re always looking for the right people.
          </p>
          <p className="text-white/60 leading-relaxed">
            Bartenders, door staff, sound engineers, booking help. If you love live music,
            keep a cool head behind a bar at 1am on a Friday, and don&apos;t mind the smell of
            stale beer on your jacket — drop us a line.
          </p>
        </div>
      </section>

      {/* Application form */}
      <section className="bg-black py-16 md:py-20 border-y border-white/10">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="poster-title text-3xl md:text-4xl text-[var(--color-oasis-orange)] mb-8 text-center">
            Apply Now
          </h2>

          {status === "sent" ? (
            <div className="border border-[var(--color-oasis-orange)] bg-[var(--color-oasis-orange)]/10 p-8 text-center">
              <p className="poster-title text-2xl text-[var(--color-oasis-orange)] mb-2">Got it!</p>
              <p className="text-white/80">Thanks for applying. We&apos;ll be in touch if there&apos;s a fit. 🍻</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Full Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" required />
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-white/70 mb-2">
                  Position Interested In <span className="text-[var(--color-oasis-orange)]">*</span>
                </label>
                <select
                  name="position"
                  required
                  defaultValue=""
                  className="w-full bg-[var(--color-oasis-ink)] border border-white/20 px-4 py-3 text-white focus:border-[var(--color-oasis-orange)] focus:outline-none"
                >
                  <option value="" disabled>Choose a role...</option>
                  <option value="Bartender">Bartender</option>
                  <option value="Door Staff / Security">Door Staff / Security</option>
                  <option value="Sound Engineer">Sound Engineer</option>
                  <option value="Barback">Barback</option>
                  <option value="Booking Assistant">Booking Assistant</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <Field label="Years of Experience" name="experience" placeholder="e.g. 2 years bartending" />
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-white/70 mb-2">
                  Tell us about yourself
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Why the Oasis? Any music scene experience? Availability?"
                  className="w-full bg-[var(--color-oasis-ink)] border border-white/20 px-4 py-3 text-white focus:border-[var(--color-oasis-orange)] focus:outline-none transition-colors"
                />
              </div>
              {status === "error" && <p className="text-red-400 text-sm">{errorMsg}</p>}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-[var(--color-oasis-orange)] hover:bg-[var(--color-oasis-orange-dark)] disabled:opacity-60 text-white font-bold uppercase tracking-wider text-sm px-7 py-4 transition-colors"
              >
                {status === "sending" ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold uppercase tracking-wider text-white/70 mb-2">
        {label} {required && <span className="text-[var(--color-oasis-orange)]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[var(--color-oasis-ink)] border border-white/20 px-4 py-3 text-white focus:border-[var(--color-oasis-orange)] focus:outline-none transition-colors"
      />
    </div>
  );
}
