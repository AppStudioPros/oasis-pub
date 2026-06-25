import { createClient } from "@supabase/supabase-js";
import MurrayMondayClient from "./MurrayMondayClient";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface MurrayItem {
  id: string;
  name: string;
  description: string | null;
  price: string | null;
  position: number;
}

export interface MurrayTab {
  id: string;
  name: string;
  subtitle: string | null;
  position: number;
  items: MurrayItem[];
}

export const dynamic = "force-dynamic";

export default async function MurrayMondayPage() {
  // Fetch all murray tabs ordered by position
  const { data: tabs } = await supabase
    .from("menu_tabs")
    .select("id, name, subtitle, position")
    .eq("venue", "murray")
    .order("position");

  if (!tabs || tabs.length === 0) {
    return <MurrayMondayClient tabs={[]} />;
  }

  // For each tab, fetch sections and their items
  const tabsWithItems: MurrayTab[] = await Promise.all(
    tabs.map(async (tab) => {
      const { data: sections } = await supabase
        .from("menu_sections")
        .select("id")
        .eq("tab_id", tab.id)
        .order("position");

      if (!sections || sections.length === 0) {
        return { ...tab, items: [] };
      }

      const sectionIds = sections.map((s) => s.id);

      const { data: items } = await supabase
        .from("menu_items")
        .select("id, name, description, price, position")
        .in("section_id", sectionIds)
        .order("position");

      return {
        id: tab.id,
        name: tab.name,
        subtitle: tab.subtitle,
        position: tab.position,
        items: (items ?? []) as MurrayItem[],
      };
    })
  );

  return <MurrayMondayClient tabs={tabsWithItems} />;
}
