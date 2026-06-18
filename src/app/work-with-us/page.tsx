import WorkClient from "./WorkClient";

export const metadata = {
  title: "Work With Us — Jobs at The Oasis Pub",
  description:
    "Now hiring at The Oasis Pub. Bartenders, door staff, and sound engineers. Send us your info — we&apos;re always looking for the right people.",
  alternates: { canonical: "https://oasisnewlondon.com/work-with-us" },
};

export default function WorkWithUsPage() {
  return <WorkClient />;
}
