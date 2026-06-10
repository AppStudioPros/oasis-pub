import Link from "next/link";
import { MapPin, Mail } from "lucide-react";

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z"/>
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[var(--color-oasis-black)] border-t-4 border-[var(--color-oasis-orange)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="poster-title text-3xl text-[var(--color-oasis-orange)] mb-3">
              The Oasis Pub
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              The epicenter of New London&apos;s music scene. Tiny hipster haunt. Big sound.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://facebook.com/theoasispub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-[var(--color-oasis-orange)] hover:border-[var(--color-oasis-orange)] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="https://instagram.com/oasispub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-[var(--color-oasis-orange)] hover:border-[var(--color-oasis-orange)] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="display text-lg uppercase tracking-wider text-[var(--color-oasis-orange)] mb-3">
              Hours
            </h4>
            <p className="text-white/70 text-sm mb-3">Open 365 days a year</p>
            <ul className="text-white/80 text-sm space-y-1">
              <li className="flex justify-between max-w-xs">
                <span>Sun – Thu</span>
                <span>7pm – 1am</span>
              </li>
              <li className="flex justify-between max-w-xs">
                <span>Fri – Sat</span>
                <span>7pm – 2am</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="display text-lg uppercase tracking-wider text-[var(--color-oasis-orange)] mb-3">
              Find Us
            </h4>
            <ul className="text-white/80 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[var(--color-oasis-orange)]" />
                <span>16 Bank Street<br />New London, CT 06320</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-[var(--color-oasis-orange)]" />
                <a href="mailto:oasisnewlondon@gmail.com" className="hover:text-[var(--color-oasis-orange)]">
                  oasisnewlondon@gmail.com
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-block mt-4 text-sm font-bold uppercase tracking-wider text-[var(--color-oasis-orange)] hover:underline"
            >
              Book the Venue →
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} The Oasis Pub. 21+. New London, CT.</p>
          <p>Site by <a href="https://webdesignpros365.com" className="hover:text-[var(--color-oasis-orange)]">WebDesignPros365</a></p>
        </div>
      </div>
    </footer>
  );
}
