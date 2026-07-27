import AboutClient from "./AboutClient";
import { getOasisStaff } from "@/lib/supabase";

// Staff changes rarely — revalidate every 5 minutes instead of hitting DB on every request
export const revalidate = 300;

export const metadata = {
  title: "About",
  description:
    "The Oasis Pub — a neighborhood bar in the heart of downtown New London, CT. Craft beer, live music, and good vibes. Open weekdays at 5pm, weekends at 7pm.",
  alternates: { canonical: "https://oasisnewlondon.com/about" },
};

export default async function AboutPage() {
  const staff = await getOasisStaff();
  return <AboutClient staff={staff} />;
}
