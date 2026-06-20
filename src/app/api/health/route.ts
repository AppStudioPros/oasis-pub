import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SLACK_WEBHOOK = process.env.SLACK_MONITOR_WEBHOOK || "";
const SITE = "Oasis Pub";
const SITE_URL = "https://www.oasisnewlondon.com";

async function sendSlackAlert(message: string) {
  if (!SLACK_WEBHOOK) return;
  await fetch(SLACK_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `🚨 *${SITE} — Site Alert*\n${message}\n_Checked at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET_`,
    }),
  });
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const errors: string[] = [];

  // 1. Check Supabase is reachable
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    const { error } = await supabase.from("events").select("id").limit(1);
    if (error) errors.push(`Supabase error: ${error.message}`);
  } catch (e: unknown) {
    errors.push(`Supabase unreachable: ${e instanceof Error ? e.message : String(e)}`);
  }

  // 2. Check Resend API key is set and non-empty
  // Note: we use send-only scoped keys which cannot call /domains — key presence + email_sent
  // tracking (check #4 below) is the correct way to monitor email health with scoped keys
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.trim().length < 10) {
    errors.push("RESEND_API_KEY is not set or appears invalid — contact forms will not send emails");
  }

  // 3. Check site homepage responds
  try {
    const res = await fetch(SITE_URL, { method: "HEAD" });
    if (!res.ok) errors.push(`Homepage returned HTTP ${res.status}`);
  } catch (e: unknown) {
    errors.push(`Homepage unreachable: ${e instanceof Error ? e.message : String(e)}`);
  }


  // 4. Check for failed email sends in the last 5 hours
  try {
    const fiveHoursAgo = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    const { data: failedEmails } = await supabase
      .from("messages")
      .select("id, name, source, created_at")
      .eq("email_sent", false)
      .gte("created_at", fiveHoursAgo);
    if (failedEmails && failedEmails.length > 0) {
      errors.push(`${failedEmails.length} form submission(s) failed to send email in the last 5 hours: ${failedEmails.map(m => `${m.source} from ${m.name}`).join(", ")}`);
    }
  } catch (e: unknown) {
    errors.push(`Could not check failed emails: ${e instanceof Error ? e.message : String(e)}`);
  }

  if (errors.length > 0) {
    await sendSlackAlert(errors.map((e) => `• ${e}`).join("\n"));
    return NextResponse.json({ ok: false, errors });
  }

  return NextResponse.json({ ok: true, site: SITE, checked: new Date().toISOString() });
}
