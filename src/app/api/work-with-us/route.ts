import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";


async function verifyTurnstile(token: string): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }).toString(),
  });
  const data = await res.json();
  return data.success === true;
}

function row(label: string, value: string) {
  if (!value || value === "(not provided)" || value === "(none)" || value === "(not specified)") {
    value = `<span style="color:#9ca3af;font-style:italic">Not provided</span>`;
  }
  return `
    <tr>
      <td style="padding:10px 16px;width:38%;vertical-align:top;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap;">${label}</td>
      <td style="padding:10px 16px;font-size:15px;color:#111827;vertical-align:top;">${value}</td>
    </tr>`;
}

function section(title: string, rows: string) {
  return `
    <div style="margin-bottom:24px;">
      <div style="background:#f9fafb;border-left:4px solid #f59e0b;padding:8px 14px;margin-bottom:0;">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#92400e;">${title}</span>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e5e7eb;border-top:none;">
        ${rows}
      </table>
    </div>`;
}

function buildHtmlEmail(data: {
  name: string; email: string; phone: string; birthday: string; position: string;
  address: string; instagram: string; facebook: string;
  company1: string; job1: string; company2: string; job2: string;
  availability: string; shifts_per_week: string; priorities: string; good_fit: string;
}) {
  const { name, email, phone, birthday, position, address, instagram, facebook,
    company1, job1, company2, job2, availability, shifts_per_week, priorities, good_fit } = data;

  const contactRows = [
    row("Email", email),
    row("Phone", phone),
    row("Birthday", birthday || ""),
    row("Address", address || ""),
  ].join("");

  const socialRows = [
    row("Instagram", instagram ? `@${instagram.replace(/^@/, "")}` : ""),
    row("Facebook", facebook || ""),
  ].join("");

  const workRows = [
    row("Company", company1 || ""),
    row("Role / Description", job1 || ""),
    company2 ? row("Company #2", company2) : "",
    company2 ? row("Role / Description", job2 || "") : "",
  ].join("");

  const availRows = [
    row("Available Days", availability || ""),
    row("Shifts Per Week", shifts_per_week || ""),
  ].join("");

  const aboutRows = [
    row("Work / School Priorities", priorities || ""),
    row("Why a Good Fit", good_fit || ""),
  ].join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:620px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0a0a0a 0%,#1c1c1c 100%);padding:32px 28px 24px;">
      <div style="display:inline-block;background:#f59e0b;border-radius:6px;padding:3px 10px;margin-bottom:12px;">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#000;">New Application</span>
      </div>
      <h1 style="margin:0 0 4px;font-size:26px;font-weight:800;color:#ffffff;">${name}</h1>
      <p style="margin:0;font-size:16px;color:#f59e0b;font-weight:600;">Applying for: ${position}</p>
    </div>

    <!-- Body -->
    <div style="padding:28px;">

      ${section("Contact Information", contactRows)}
      ${section("Social Media", socialRows)}
      ${section("Work Experience", workRows)}
      ${section("Availability", availRows)}
      ${section("About the Applicant", aboutRows)}

    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 28px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Submitted via <strong>oasisnewlondon.com</strong> · Reply directly to this email to reach the applicant</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      first_name, last_name, email, phone, birthday, position,
      address1, address2, city, state, zip,
      instagram, facebook,
      company1, job1, company2, job2,
      availability, shifts_per_week, priorities, good_fit,
      turnstileToken,
    } = body;

    const name = [first_name, last_name].filter(Boolean).join(" ");

    if (!first_name || !last_name || !email || !phone || !position) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (turnstileToken) {
      const ok = await verifyTurnstile(turnstileToken);
      if (!ok) return NextResponse.json({ error: "CAPTCHA verification failed." }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: insertedRows, error: insertError } = await supabase.from("messages").insert({
      name, email, phone,
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

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[work-with-us] RESEND_API_KEY not set");
      if (insertedId) await supabase.from("messages").update({ email_sent: false }).eq("id", insertedId);
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM || "Oasis Website <onboarding@resend.dev>";
    const toAddress = process.env.HIRING_TO || process.env.CONTACT_TO || "oasisnewlondon@gmail.com";

    const addressStr = [address1, address2, city, state, zip].filter(Boolean).join(", ");
    const availStr = Array.isArray(availability) ? availability.join(", ") : availability || "";

    const html = buildHtmlEmail({
      name, email, phone,
      birthday: birthday || "",
      position,
      address: addressStr,
      instagram: instagram || "",
      facebook: facebook || "",
      company1: company1 || "",
      job1: job1 || "",
      company2: company2 || "",
      job2: job2 || "",
      availability: availStr,
      shifts_per_week: shifts_per_week || "",
      priorities: priorities || "",
      good_fit: good_fit || "",
    });

    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `[Oasis Hiring] ${name} — ${position}`,
      html,
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
