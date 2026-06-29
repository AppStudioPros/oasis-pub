import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";


async function verifyTurnstile(token: string): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // skip in dev if not set
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }).toString(),
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Verify CAPTCHA
    const valid = await verifyTurnstile(body.turnstileToken || "");
    if (!valid) return NextResponse.json({ error: "CAPTCHA verification failed. Please try again." }, { status: 400 });

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Save to DB first, capture row ID to update email_sent after
    const { data: insertedRows, error: insertError } = await supabase.from("messages").insert({

      name,
      email,
      message,
      source: "contact",
      venue: "oasis",
      is_read: false,
      is_archived: false,
      starred: false,
      metadata: { subject: subject || null },
    }).select("id");
    if (insertError) console.error("[contact] DB insert error:", insertError);
    const insertedId = insertedRows?.[0]?.id ?? null;

    // Send email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY not set");
      if (insertedId) await supabase.from("messages").update({ email_sent: false }).eq("id", insertedId);
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM || "Oasis Website <onboarding@resend.dev>";
    const toAddress = process.env.CONTACT_TO || "oasisnewlondon@gmail.com";

    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `[Oasis Site] ${subject || "New message"} — from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "(none)"}\n\n${message}`,
    });

    if (sendError) {
      console.error("[contact] Resend error", sendError);
      if (insertedId) await supabase.from("messages").update({ email_sent: false }).eq("id", insertedId);
      return NextResponse.json({ ok: true, emailFailed: true });
    }

    if (insertedId) await supabase.from("messages").update({ email_sent: true }).eq("id", insertedId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { error: "Could not send your message. Please email us directly at oasisnewlondon@gmail.com." },
      { status: 500 }
    );
  }
}
