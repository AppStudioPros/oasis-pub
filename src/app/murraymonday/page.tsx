import { createClient } from "@supabase/supabase-js";
import MurrayMondayClient from "./MurrayMondayClient";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface MurraySection {
  section_key: string;
  title: string;
  note: string | null;
  items: { brewery: string; name: string; desc: string; price?: string }[];
}

export const dynamic = "force-dynamic";

export default async function MurrayMondayPage() {
  const { data } = await supabase
    .from("murray_monday_specials")
    .select("section_key, title, note, items")
    .order("section_key");

  const sections: MurraySection[] = (data ?? []).map((r) => ({
    section_key: r.section_key,
    title: r.title,
    note: r.note,
    items: Array.isArray(r.items) ? r.items : [],
  }));

  const ordered = ["can", "draft_5_7", "draft_7_9"]
    .map((k) => sections.find((s) => s.section_key === k))
    .filter(Boolean) as MurraySection[];

  return <MurrayMondayClient sections={ordered} />;
}
