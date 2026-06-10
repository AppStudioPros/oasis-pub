"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname.startsWith("/api")) return;

    try {
      const payload = JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
      });

      const blob = new Blob([payload], { type: "application/json" });

      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", blob);
      } else {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Never break the site for tracking
    }
  }, [pathname]);

  return null;
}
