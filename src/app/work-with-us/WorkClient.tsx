"use client";

import { useState, useCallback } from "react";
import Turnstile from "@/components/Turnstile";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import SectionDivider from "@/components/SectionDivider";

export default function WorkClient() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const handleTurnstile = useCallback((token: string) => setTurnstileToken(token), []);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);
    const payload = { ...Object.fromEntries(formData.entries()), turnstileToken };
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
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://oasisnewlondon.com" },
        { name: "Work With Us", url: "https://oasisnewlondon.com/work-with-us" },
      ]} />
      <PageHero
        title="Join The Fam"
        subtitle="We're pretty cool to work with. We swear."
      />

      <SectionDivider
        items={["✦ BARTENDER ✦", "DOOR PERSON", "SOUND ENGINEER", "BOOKING ASSISTANT"]}
        pixelsPerSecond={214}
      />

      {/* Intro w/ image */}
      <section className="relative bg-black py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(242,99,33,0.4) 40px, rgba(242,99,33,0.4) 42px)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Staff photo — replaces the old spinning circle */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full overflow-hidden border-2 border-[var(--color-oasis-orange)]/40 shadow-[8px_8px_0_0_var(--color-oasis-orange)]" style={{ height: '320px' }}
            >
              <Image
                src="/images/staff-photo.jpg"
                alt="The Oasis crew"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="poster-title text-3xl md:text-5xl text-white leading-[0.9] mb-6">
                Be A Part Of<br />
                <span className="text-[var(--color-oasis-orange)]">The Oasis Fam</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                We&apos;re looking for good people that keep a cool head and can stay upbeat while getting the work done. If this is you, you may be a good fit for the Oasis. Please note: We are not always hiring, but we will take your application under consideration when the time comes.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="relative bg-[var(--color-oasis-ink)] py-16 md:py-24 border-t-2 border-[var(--color-oasis-orange)]/40 overflow-hidden">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="poster-title text-4xl md:text-5xl text-white leading-[0.9]">
              Let&apos;s Hear<br />
              <span className="text-[var(--color-oasis-orange)]">About You</span>
            </h2>
          </motion.div>

          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border-2 border-[var(--color-oasis-orange)] bg-[var(--color-oasis-orange)]/10 p-8 text-center shadow-[8px_8px_0_0_var(--color-oasis-orange)]"
            >
              <p className="poster-title text-3xl text-[var(--color-oasis-orange)] mb-2">Got it!</p>
              <p className="text-white/80">Thanks for applying. We&apos;ll be in touch if there&apos;s a fit. 🍻</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-10"
            >
              {/* NAME */}
              <FormSection label="Name">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name" name="first_name" required />
                  <Field label="Last Name" name="last_name" required />
                </div>
              </FormSection>

              {/* CONTACT */}
              <FormSection label="Contact">
                <div className="space-y-4">
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" required />
                  <Field label="Birthday" name="birthday" type="date" required />
                </div>
              </FormSection>

              {/* ADDRESS */}
              <FormSection label="Address">
                <div className="space-y-4">
                  <Field label="Address Line 1" name="address1" required />
                  <Field label="Address Line 2" name="address2" />
                  <div className="grid grid-cols-3 gap-4">
                    <Field label="City" name="city" required />
                    <Field label="State" name="state" required />
                    <Field label="ZIP Code" name="zip" required />
                  </div>
                </div>
              </FormSection>

              {/* POSITION */}
              <FormSection label="Position Interested In">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
                    Position <span className="text-[var(--color-oasis-orange)]">*</span>
                  </label>
                  <select
                    name="position"
                    required
                    defaultValue=""
                    className="w-full bg-black border-b-2 border-white/20 px-0 py-3 text-white focus:border-[var(--color-oasis-orange)] focus:outline-none appearance-none"
                  >
                    <option value="" disabled>Choose a role...</option>
                    <option value="Bartender">Bartender</option>
                    <option value="Door Person">Door Person</option>
                    <option value="Sound Engineer">Sound Engineer</option>
                    <option value="Booking Assistant">Booking Assistant</option>
                  </select>
                </div>
              </FormSection>

              {/* SOCIAL MEDIA */}
              <FormSection label="Social Media" note="Social media profiles help us discover your interests, hobbies & friend circles. If your profile is private, we may request to follow you.">
                <div className="space-y-4">
                  <Field label="Instagram" name="instagram" placeholder="@instagramname" />
                  <Field label="Facebook" name="facebook" placeholder="Name on Facebook" />
                </div>
              </FormSection>

              {/* EXPERIENCE */}
              <FormSection label="Related Job Experience" note="Experience is not required, but if you have experience in the service industry, customer service or any other relatable field, please describe below.">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Field label="Company Name #1" name="company1" placeholder="Company Name" />
                    <TextareaField label="Job Description" name="job1" placeholder="Please describe relevant duties & responsibilities" />
                  </div>
                  <div className="space-y-3">
                    <Field label="Company Name #2" name="company2" placeholder="Company Name" />
                    <TextareaField label="Job Description" name="job2" placeholder="Please describe relevant duties & responsibilities" />
                  </div>
                </div>
              </FormSection>

              {/* YOU AND THE OASIS */}
              <FormSection label="You and The Oasis">
                <div className="space-y-6">
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">What nights would you regularly be available? <span className="text-[var(--color-oasis-orange)]">*</span></p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                      {[
                        "Sunday","Monday 5–9pm","Monday 9pm–1:30am",
                        "Tuesday 5–9pm","Tuesday 9pm–1:30am",
                        "Wednesday 5–9pm","Wednesday 9pm–1:30am",
                        "Thursday 5–9pm","Thursday 9pm–1:30am",
                        "Friday 5–9pm","Friday 9pm–2:30am","Saturday",
                      ].map((day) => (
                        <label key={day} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="availability"
                            value={day}
                            className="w-4 h-4 border-2 border-white/30 bg-black accent-[var(--color-oasis-orange)] cursor-pointer"
                          />
                          <span className="text-white/70 text-xs uppercase tracking-wider group-hover:text-white transition-colors">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <Field label="How many shifts would you be open to working each week?" name="shifts_per_week" required />
                  <TextareaField label="Please list any current work or school priorities" name="priorities" />
                  <TextareaField label="What makes you a good fit for The Oasis?" name="good_fit" />
                </div>
              </FormSection>

              {status === "error" && <p className="text-red-400 text-sm">{errorMsg}</p>}

              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                onVerify={handleTurnstile}
                theme="dark"
              />
              <button
                type="submit"
                disabled={status === "sending" || !turnstileToken}
                className="group bg-[var(--color-oasis-orange)] hover:bg-[var(--color-oasis-orange-dark)] disabled:opacity-60 text-white font-bold uppercase tracking-wider text-sm px-10 py-4 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] inline-flex items-center gap-2"
              >
                {status === "sending" ? "Submitting..." : <>Send <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <SectionDivider
        items={["✦ LIVE MUSIC ✦", "HAPPY HOUR", "CRAFT BEER", "BAD MOVIE NIGHT"]}
        reverse
        pixelsPerSecond={214}
      />
    </>
  );
}

function FormSection({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 pb-2 border-b border-white/10">
        <p className="text-[var(--color-oasis-orange)] text-xs font-bold uppercase tracking-[0.25em]">{label}</p>
        {note && <p className="text-white/40 text-xs mt-1 leading-relaxed">{note}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, name, type = "text", required = false, placeholder }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
        {label} {required && <span className="text-[var(--color-oasis-orange)]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b-2 border-white/20 px-0 py-2.5 text-white placeholder-white/25 focus:border-[var(--color-oasis-orange)] focus:outline-none transition-colors text-sm"
      />
    </div>
  );
}

function TextareaField({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">{label}</label>
      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-white/25 focus:border-[var(--color-oasis-orange)] focus:outline-none transition-colors text-sm resize-y"
      />
    </div>
  );
}
