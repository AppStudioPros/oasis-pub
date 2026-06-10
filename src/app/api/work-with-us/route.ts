import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, position, experience, message } = body;

    if (!name || !email || !phone || !position) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[work-with-us] RESEND_API_KEY not set");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM || "Oasis Website <onboarding@resend.dev>";
    const toAddress = process.env.HIRING_TO || process.env.CONTACT_TO || "oasisnewlondon@gmail.com";

    await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `[Oasis Hiring] ${position} application — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Position: ${position}`,
        `Experience: ${experience || "(not specified)"}`,
        ``,
        `Message:`,
        message || "(none)",
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[work-with-us] error", err);
    return NextResponse.json(
      { error: "Could not submit your application. Please email oasisnewlondon@gmail.com directly." },
      { status: 500 }
    );
  }
}
