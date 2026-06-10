import DrinksClient from "./DrinksClient";
import craftBeer from "@/data/drinks/craft-beer.json";
import seltzers from "@/data/drinks/seltzers.json";
import chill from "@/data/drinks/chill.json";
import wine from "@/data/drinks/wine.json";
import alcoholFree from "@/data/drinks/alcohol-free.json";
import kidsMenu from "@/data/drinks/kids-menu.json";

export const metadata = {
  title: "Drinks — Craft Beer, Cocktails, Wine, CBD & More",
  description:
    "Craft beer drafts at The Oasis Pub. Plus hard seltzers, canned cocktails, CBD drinks, wine, and zero-proof options. Tap list rotates weekly.",
};

const menus = {
  "Craft Beer": craftBeer,
  "Seltzers & Canned Cocktails": seltzers,
  "CBD Drinks": chill,
  "Wine": wine,
  "Alcohol-Free": alcoholFree,
  "Kids Menu": kidsMenu,
};

export default function DrinksPage() {
  return <DrinksClient data={menus} />;
}
