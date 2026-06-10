import DrinksClient from "./DrinksClient";
import drinksData from "@/data/drinks.json";

export const metadata = {
  title: "Drinks — Craft Beer, Cocktails, Wine, CBD & More",
  description:
    "20+ craft beer drafts at The Oasis Pub. Plus hard seltzers, canned cocktails, CBD drinks, wine, and zero-proof options. Tap list rotates weekly.",
};

export default function DrinksPage() {
  return <DrinksClient data={drinksData} />;
}
