import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Convert an ISO date string to YYYY-MM-DD in Eastern time */
export function toEasternDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", {
    timeZone: "America/New_York",
  }); // en-CA gives YYYY-MM-DD format
}

export interface OasisEvent {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  image_url: string | null;
  ticket_url: string | null;
  rsvp_url: string | null;
  category: string | null;
  status: "draft" | "published" | "archived";
  location: string | null;
}

/** Fetch all upcoming published Oasis events */
export async function getUpcomingEvents(): Promise<OasisEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("id, slug, title, description, start_date, end_date, image_url, ticket_url, rsvp_url, category, status, location")
    .eq("venue", "oasis")
    .eq("status", "published")
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: true });

  if (error) {
    console.error("[oasis] getUpcomingEvents error:", error.message);
    return [];
  }
  return data ?? [];
}

/** Fetch all published Oasis events (upcoming + past) */
export async function getAllEvents(): Promise<OasisEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("id, slug, title, description, start_date, end_date, image_url, ticket_url, rsvp_url, category, status, location")
    .eq("venue", "oasis")
    .eq("status", "published")
    .order("start_date", { ascending: false });

  if (error) {
    console.error("[oasis] getAllEvents error:", error.message);
    return [];
  }
  return data ?? [];
}

/** Fetch a single event by slug */
export async function getEventBySlug(slug: string): Promise<OasisEvent | null> {
  const { data, error } = await supabase
    .from("events")
    .select("id, slug, title, description, start_date, end_date, image_url, ticket_url, rsvp_url, category, status, location")
    .eq("venue", "oasis")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}
