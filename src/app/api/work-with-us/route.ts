import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      first_name, last_name, email, phone, birthday, position,
      address1, address2, city, state, zip,
      instagram, facebook,
      company1, job1, company2, job2,
      availability, shifts_per_week, priorities, good_fit,
    } = body;

    const name = [first_name, last_name].filter(Boolean).join(" ");

    if (!first_name || !last_name || !email || !phone || !position) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Save to Supabase messages table
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: insertedRows, error: insertError } = await supabase.from("messages").insert({

      name,
      email,
      phone,
      message: good_fit || null,
      source: "jobs-oasis",
      venue: "oasis",
      is_read: false,
      is_archived: false,
      starred: false,
      metadata: {
        position,
        birthday: birthday || null,
        address: [address1, address2, city, state, zip].filter(Boolean).join(", ") || null,
        instagram: instagram || null,
        facebook: facebook || null,
        company1: company1 || null, job1: job1 || null,
        company2: company2 || null, job2: job2 || null,
        availability: availability || null,
        shifts_per_week: shifts_per_week || null,
        priorities: priorities || null,
        good_fit: good_fit || null,
      },
    }).select("id");
    if (insertError) console.error("[contact] DB insert error:", insertError);
    const insertedId = insertedRows?.[0]?.id ?? null;

    // Send email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[work-with-us] RESEND_API_KEY not set");
      if (insertedId) await supabase.from("messages").update({ email_sent: false }).eq("id", insertedId);
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM || "Oasis Website <onboarding@resend.dev>";
    const toAddress = process.env.HIRING_TO || process.env.CONTACT_TO || "oasisnewlondon@gmail.com";

    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `[Oasis Hiring] ${position} application — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Birthday: ${birthday || "(not provided)"}`,
        `Position: ${position}`,
        ``,
        `Address: ${[address1, address2, city, state, zip].filter(Boolean).join(", ") || "(not provided)"}`,
        ``,
        `Instagram: ${instagram || "(none)"}`,
        `Facebook: ${facebook || "(none)"}`,
        ``,
        `Company #1: ${company1 || "(none)"}`,
        `Job Description: ${job1 || "(none)"}`,
        ``,
        `Company #2: ${company2 || "(none)"}`,
        `Job Description: ${job2 || "(none)"}`,
        ``,
        `Availability: ${Array.isArray(availability) ? availability.join(", ") : availability || "(not specified)"}`,
        `Shifts per week: ${shifts_per_week || "(not specified)"}`,
        ``,
        `Work/School Priorities: ${priorities || "(none)"}`,
        ``,
        `Why a good fit: ${good_fit || "(none)"}`,
      ].join("\n"),
    });

    if (sendError) {
      console.error("[work-with-us] Resend error", sendError);
      if (insertedId) await supabase.from("messages").update({ email_sent: false }).eq("id", insertedId);
      return NextResponse.json({ ok: true, emailFailed: true });
    }

    if (insertedId) await supabase.from("messages").update({ email_sent: true }).eq("id", insertedId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[work-with-us] error", err);
    return NextResponse.json(
      { error: "Could not submit your application. Please email oasisnewlondon@gmail.com directly." },
      { status: 500 }
    );
  }
}
