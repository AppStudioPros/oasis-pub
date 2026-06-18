import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact & Bookings",
  description:
    "Get in touch with The Oasis Pub. 16 Bank Street, New London CT. Book the venue, ask about live music nights, or just say hi.",
  alternates: { canonical: "https://oasisnewlondon.com/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
