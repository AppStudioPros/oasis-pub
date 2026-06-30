"use client";

import { useState, useCallback } from "react";
import Turnstile from "@/components/Turnstile";
import { motion } from "framer-motion";
import { MapPin, Mail, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import SectionDivider from "@/components/SectionDivider";

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const handleTurnstile = useCallback((token: string) => setTurnstileToken(token), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not send your message.");
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
        { name: "Contact", url: "https://oasisnewlondon.com/contact" },
      ]} />
      <PageHero
        title="Connect With Us"
        subtitle="We don't bite."
      />

      <SectionDivider
        items={["✦ BAND SUBMISSIONS ✦", "EVENT INQUIRIES", "GET DIRECTIONS"]}
        pixelsPerSecond={214}
      />

      <section className="relative bg-[var(--color-oasis-ink)] py-16 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs mb-4">
              ✦ Find Us ✦
            </p>
            <h2 className="poster-title text-4xl md:text-5xl text-white mb-8 leading-[0.9]">
              The Oasis<br />
              <span className="text-[var(--color-oasis-orange)]">on Bank Street.</span>
            </h2>

            <div className="space-y-5 mb-8">
              <InfoRow
                icon={<MapPin size={20} />}
                label="Address"
                value={<>16 Bank Street<br />New London, CT 06320</>}
              />
              <InfoRow
                icon={<Mail size={20} />}
                label="General"
                value={<a href="mailto:oasisnewlondon@gmail.com" className="hover:text-[var(--color-oasis-orange)] break-all">oasisnewlondon@gmail.com</a>}
              />
              <InfoRow
                icon={<Mail size={20} />}
                label="Bookings"
                value={<a href="mailto:booking@socialnewlondon.com?subject=Booking%20(Oasis)&cc=oasisnewlondon%40gmail.com" className="hover:text-[var(--color-oasis-orange)] break-all">booking@socialnewlondon.com</a>}
              />
              <InfoRow
                icon={<Clock size={20} />}
                label="Hours"
                value={
                  <>
                    Open 365 days a year<br />
                    Mon–Thu: 5pm – 1am<br />
                    Fri: 5pm – 2am<br />
                    Sat: 7pm – 2am<br />
                    Sun: 7pm – 1am
                  </>
                }
              />
            </div>

            {/* Map with chunky shadow */}
            <div className="relative">
              <div className="relative aspect-video w-full border-4 border-black shadow-[10px_10px_0_0_var(--color-oasis-orange)] overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=16+Bank+Street,+New+London,+CT+06320&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.6) contrast(1.2) brightness(0.85)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Oasis Pub Map"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="relative">
                    <div className="absolute inset-0 w-10 h-10 -ml-5 -mt-5 bg-[var(--color-oasis-orange)] rounded-full opacity-30 animate-ping" />
                    <MapPin size={36} className="text-[var(--color-oasis-orange)] drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs mb-4">
              ✦ Drop Us a Line ✦
            </p>
            <h2 className="poster-title text-4xl md:text-5xl text-white mb-3 leading-[0.9]">
              Send us<br />
              <span className="text-[var(--color-oasis-orange)]">a message.</span>
            </h2>
            <p className="text-white/60 text-sm mb-8">
              General inquiries only. For band booking, please use the email provided.
            </p>

            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border-2 border-[var(--color-oasis-orange)] bg-[var(--color-oasis-orange)]/10 p-8 text-center shadow-[8px_8px_0_0_var(--color-oasis-orange)]"
              >
                <p className="poster-title text-3xl text-[var(--color-oasis-orange)] mb-2">Got it!</p>
                <p className="text-white/80">We&apos;ll get back to you as soon as we can. Cheers. 🍻</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Your Name" name="name" required />
                <FormField label="Email" name="email" type="email" required />
                <FormField label="Subject" name="subject" placeholder="Booking, private event, question..." />
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-white/70 mb-2">
                    Message <span className="text-[var(--color-oasis-orange)]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-black border-2 border-white/20 px-4 py-3 text-white focus:border-[var(--color-oasis-orange)] focus:outline-none transition-colors"
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-400 text-sm">{errorMsg}</p>
                )}
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                  onVerify={handleTurnstile}
                  theme="dark"
                />
                <button
                  type="submit"
                  disabled={status === "sending" || !turnstileToken}
                  className="group w-full bg-[var(--color-oasis-orange)] hover:bg-[var(--color-oasis-orange-dark)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold uppercase tracking-wider text-sm px-7 py-4 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000]"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-black border-2 border-[var(--color-oasis-orange)]/60 flex items-center justify-center text-[var(--color-oasis-orange)]">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-white/50 font-bold mb-1">{label}</p>
        <p className="text-white/90">{value}</p>
      </div>
    </div>
  );
}

function FormField({
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
