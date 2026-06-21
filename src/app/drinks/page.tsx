import DrinksClient from "./DrinksClient";
import { getOasisMenuTabs } from "@/lib/supabase";

// JSON fallbacks (used if Supabase returns empty)
import craftBeerFallback from "@/data/drinks/craft-beer.json";
import seltzersFallback from "@/data/drinks/seltzers.json";
import chillFallback from "@/data/drinks/chill.json";
import wineFallback from "@/data/drinks/wine.json";
import alcoholFreeFallback from "@/data/drinks/alcohol-free.json";
import kidsMenuFallback from "@/data/drinks/kids-menu.json";

export const revalidate = 60;

export const metadata = {
  title: "Drinks — Craft Beer, Cocktails, Wine, CBD & More",
  description:
    "20 drafts, 60+ cans, canned cocktails, CBD & mushroom drinks, social tonics and alcohol-free options at The Oasis Pub in New London, CT.",
  alternates: { canonical: "https://oasisnewlondon.com/drinks" },
};

const FALLBACK_MENUS = {
  "Craft Beer": craftBeerFallback,
  "Canned Drinks": seltzersFallback,
  "CBD & Social Tonics": chillFallback,
  "Wine": wineFallback,
  "Alcohol-Free": alcoholFreeFallback,
  "Kids Menu": kidsMenuFallback,
};

export default async function DrinksPage() {
  const tabs = await getOasisMenuTabs();

  // If Supabase returned data, convert to DrinksClient format
  if (tabs && tabs.length > 0) {
    const supabaseMenus: Record<string, { title: string; subtitle?: string; note?: string; categories: { name: string; note?: string; items?: { name: string; style?: string; abv?: string; origin?: string; size?: string; price?: string; addons?: string; is_subhead?: boolean }[]; subcategories?: { name: string; items: { name: string; style?: string; abv?: string; origin?: string; size?: string; price?: string; addons?: string }[] }[] }[] }> = {};

    for (const tab of tabs) {
      // Group sections by subcategory within each section
      const categories = tab.sections.map((sec) => {
        const mapItem = (item: typeof sec.items[0]) => ({
          name: item.name,
          style: item.description ?? undefined,
          abv: undefined,
          origin: item.note ?? undefined,
          size: undefined,
          price: item.price ?? undefined,
          addons: item.addons ?? undefined,
          is_subhead: item.is_subhead ?? false,
        });

        return {
          name: sec.name,
          note: sec.note ?? undefined,
          items: sec.items.map(mapItem),
        };
      });

      supabaseMenus[tab.name] = {
        title: tab.name,
        subtitle: tab.subtitle ?? undefined,
        categories,
      };
    }

    return <DrinksClient data={supabaseMenus} />;
  }

  // Fallback to static JSON if Supabase is empty
  return <DrinksClient data={FALLBACK_MENUS} />;
}
