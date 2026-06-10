import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Save to Supabase messages table
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase.from("messages").insert({
      name,
      email,
      message,
      source: "contact",
      venue: "oasis",
      is_read: false,
      is_archived: false,
      starred: false,
      metadata: { subject: subject || null },
    });

    // Send email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY not set");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM || "Oasis Website <onboarding@resend.dev>";
    const toAddress = process.env.CONTACT_TO || "oasisnewlondon@gmail.com";

    await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `[Oasis Site] ${subject || "New message"} — from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "(none)"}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { error: "Could not send your message. Please email us directly at oasisnewlondon@gmail.com." },
      { status: 500 }
    );
  }
}
