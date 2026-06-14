import AboutClient from "./AboutClient";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About",
  description:
    "The Oasis Pub — a neighborhood bar in the heart of downtown New London, CT. Craft beer, live music, and good vibes. Open weekdays at 5pm, weekends at 7pm.",
};

export default async function AboutPage() {
  const { data: staff } = await supabase
    .from("oasis_staff")
    .select("id, name, role, bio, photo_url, display_order")
    .eq("active", true)
    .order("display_order", { ascending: true });

  return <AboutClient staff={staff ?? []} />;
}
