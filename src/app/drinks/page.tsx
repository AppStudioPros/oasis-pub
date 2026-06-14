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
    "20 drafts, 60+ cans, canned cocktails, CBD & mushroom drinks, social tonics and alcohol-free options at The Oasis Pub in New London, CT.",
};

const menus = {
  "Craft Beer": craftBeer,
  "Canned Drinks": seltzers,
  "CBD & Social Tonics": chill,
  "Wine": wine,
  "Alcohol-Free": alcoholFree,
  "Kids Menu": kidsMenu,
};

export default function DrinksPage() {
  return <DrinksClient data={menus} />;
}
