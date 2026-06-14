"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import SectionDivider from "@/components/SectionDivider";

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
        speed={40}
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
          {/* Copy — full width, no stamp */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
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

        {/* Staff photo — hidden until client provides image */}
        {/* TODO: replace null with "/images/staff-photo.jpg" when client sends photo */}
        {null && (
          <div className="relative max-w-5xl mx-auto px-6 mt-12">
            <div className="relative aspect-[16/7] overflow-hidden border-2 border-[var(--color-oasis-orange)]/40 shadow-[8px_8px_0_0_var(--color-oasis-orange)]" />
          </div>
        )}
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
              className="space-y-4"
            >
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
                  className="w-full bg-black border-2 border-white/20 px-4 py-3 text-white focus:border-[var(--color-oasis-orange)] focus:outline-none"
                >
                  <option value="" disabled>Choose a role...</option>
                  <option value="Bartender">Bartender</option>
                  <option value="Door Person">Door Person</option>
                  <option value="Sound Engineer">Sound Engineer</option>
                  <option value="Booking Assistant">Booking Assistant</option>
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
                  placeholder="Why the Oasis? Music scene experience? When can you work?"
                  className="w-full bg-black border-2 border-white/20 px-4 py-3 text-white focus:border-[var(--color-oasis-orange)] focus:outline-none transition-colors"
                />
              </div>
              {status === "error" && <p className="text-red-400 text-sm">{errorMsg}</p>}
              <button
                type="submit"
                disabled={status === "sending"}
                className="group w-full bg-[var(--color-oasis-orange)] hover:bg-[var(--color-oasis-orange-dark)] disabled:opacity-60 text-white font-bold uppercase tracking-wider text-sm px-7 py-4 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] inline-flex items-center justify-center gap-2"
              >
                {status === "sending" ? "Submitting..." : (
                  <>
                    Submit Application
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <SectionDivider
        items={["✦ LIVE MUSIC ✦", "HAPPY HOUR", "CRAFT BEER", "BAD MOVIE NIGHT"]}
        reverse
        speed={45}
      />
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
        className="w-full bg-black border-2 border-white/20 px-4 py-3 text-white focus:border-[var(--color-oasis-orange)] focus:outline-none transition-colors"
      />
    </div>
  );
}
