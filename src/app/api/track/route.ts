import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);

function detectDevice(ua: string): string {
  if (!ua) return "unknown";
  if (/mobile|android|iphone|ipod/i.test(ua) && !/ipad|tablet/i.test(ua)) return "mobile";
  if (/ipad|tablet/i.test(ua)) return "tablet";
  return "desktop";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.path) return NextResponse.json({ ok: true });

    // Skip bots
    const ua = req.headers.get("user-agent") || "";
    if (/bot|crawler|spider|slurp|baiduspider|facebookexternalhit/i.test(ua)) {
      return NextResponse.json({ ok: true });
    }

    const country = req.headers.get("x-vercel-ip-country") || null;

    await supabase.from("pageviews").insert({
      path: body.path,
      referrer: body.referrer || null,
      user_agent: ua.slice(0, 500),
      device: detectDevice(ua),
      country,
      venue: "oasis",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
