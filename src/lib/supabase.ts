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

/** Format a time from ISO string in Eastern time, e.g. "9:00 PM" */
export function toEasternTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
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
    .or(`end_date.gte.${new Date().toISOString()},and(end_date.is.null,start_date.gte.${new Date().toISOString()})`)
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

// ── Menu types ───────────────────────────────────────────────────────────────

export interface OasisMenuItem {
  id: string;
  name: string;
  price?: string | null;
  price_alt?: string | null;
  description?: string | null;
  note?: string | null;
  addons?: string | null;
  subcategory?: string | null;
  is_subhead?: boolean;
  position: number;
}

export interface OasisMenuSection {
  id: string;
  name: string;
  note?: string | null;
  detail?: string | null;
  position: number;
  items: OasisMenuItem[];
}

export interface OasisMenuTab {
  id: string;
  name: string;
  slug: string;
  subtitle?: string | null;
  position: number;
  sections: OasisMenuSection[];
}

/** Fetch all drinks menu tabs for Oasis from Supabase */
export async function getOasisMenuTabs(): Promise<OasisMenuTab[]> {
  const { data, error } = await supabase
    .from("menu_tabs")
    .select(`
      id, name, slug, subtitle, position,
      menu_sections (
        id, name, note, detail, position,
        menu_items ( id, name, price, price_alt, description, note, addons, subcategory, is_subhead, position )
      )
    `)
    .eq("venue", "oasis")
    .eq("type", "drinks")
    .order("position");

  if (error || !data) {
    console.error("[oasis] getOasisMenuTabs error:", error?.message);
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((tab) => ({
    id: tab.id,
    name: tab.name,
    slug: tab.slug,
    subtitle: tab.subtitle ?? null,
    position: tab.position,
    sections: ((tab.menu_sections ?? []) as OasisMenuSection[])
      .sort((a, b) => a.position - b.position)
      .map((sec) => ({
        ...sec,
        items: ((sec as unknown as { menu_items?: OasisMenuItem[] }).menu_items ?? []).sort((a, b) => a.position - b.position),
      })),
  })) as OasisMenuTab[];
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
