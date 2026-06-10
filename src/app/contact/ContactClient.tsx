"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
      {/* Hero */}
      <section className="relative h-[35vh] min-h-[260px] flex items-center justify-center overflow-hidden">
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
            Get In Touch
          </p>
          <h1 className="poster-title text-5xl md:text-7xl text-white">Contact</h1>
        </div>
      </section>

      <section className="bg-[var(--color-oasis-ink)] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          {/* Info column */}
          <div>
            <h2 className="poster-title text-3xl md:text-4xl text-white mb-6">
              The Oasis Pub
            </h2>
            <div className="space-y-5 mb-8">
              <InfoRow
                icon={<MapPin size={20} />}
                label="Address"
                value={<>16 Bank Street<br />New London, CT 06320</>}
              />
              <InfoRow
                icon={<Phone size={20} />}
                label="Phone"
                value={<a href="tel:+18604473929" className="hover:text-[var(--color-oasis-orange)]">(860) 447-3929</a>}
              />
              <InfoRow
                icon={<Mail size={20} />}
                label="General"
                value={<a href="mailto:oasisnewlondon@gmail.com" className="hover:text-[var(--color-oasis-orange)]">oasisnewlondon@gmail.com</a>}
              />
              <InfoRow
                icon={<Mail size={20} />}
                label="Bookings"
                value={<a href="mailto:booking@socialnewlondon.com?subject=Booking%20(Oasis)&cc=oasisnewlondon%40gmail.com" className="hover:text-[var(--color-oasis-orange)]">booking@socialnewlondon.com</a>}
              />
              <InfoRow
                icon={<Clock size={20} />}
                label="Hours"
                value={
                  <>
                    Open 365 days a year<br />
                    Sun–Thu: 7pm – 1am<br />
                    Fri–Sat: 7pm – 2am
                  </>
                }
              />
            </div>

            <div className="aspect-video w-full border border-white/10 overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=16+Bank+Street,+New+London,+CT+06320&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.4) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Oasis Pub Map"
              />
            </div>
          </div>

          {/* Form column */}
          <div>
            <h2 className="poster-title text-3xl md:text-4xl text-white mb-2">
              Send Us a Message
            </h2>
            <p className="text-white/60 text-sm mb-8">
              Private event? Booking inquiry? Just curious? Hit us up.
            </p>

            {status === "sent" ? (
              <div className="border border-[var(--color-oasis-orange)] bg-[var(--color-oasis-orange)]/10 p-8 text-center">
                <p className="poster-title text-2xl text-[var(--color-oasis-orange)] mb-2">Got it!</p>
                <p className="text-white/80">We&apos;ll get back to you as soon as we can. Cheers. 🍻</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Your Name" name="name" required />
                <FormField label="Email" name="email" type="email" required />
                <FormField label="Subject" name="subject" placeholder="Booking, private event, question..." />
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-white/70 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[var(--color-oasis-orange)] focus:outline-none transition-colors"
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-400 text-sm">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-[var(--color-oasis-orange)] hover:bg-[var(--color-oasis-orange-dark)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold uppercase tracking-wider text-sm px-7 py-4 transition-colors"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-oasis-orange)]/10 border border-[var(--color-oasis-orange)]/40 flex items-center justify-center text-[var(--color-oasis-orange)]">
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
        className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-[var(--color-oasis-orange)] focus:outline-none transition-colors"
      />
    </div>
  );
}
