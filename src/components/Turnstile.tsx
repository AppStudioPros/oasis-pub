"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: object) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

interface Props {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  theme?: "light" | "dark" | "auto";
}

export default function Turnstile({ siteKey, onVerify, onExpire, theme = "auto" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    function render() {
      if (!ref.current || !window.turnstile) return;
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        callback: onVerify,
        "expired-callback": onExpire,
        theme,
      });
    }

    if (window.turnstile) {
      render();
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = render;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
      }
    };
  }, [siteKey, onVerify, onExpire, theme]);

  return <div ref={ref} className="mt-2" />;
}
