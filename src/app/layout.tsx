import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "The Oasis Pub — New London CT | Live Music, Craft Beer, Dive Bar",
    template: "%s | The Oasis Pub",
  },
  description:
    "The epicenter of New London's music scene. Tiny hipster haunt serving 20+ craft beers, emerging bands, and DJ nights. 16 Bank Street, New London CT. Open 365 days a year.",
  keywords: [
    "Oasis Pub New London",
    "live music New London CT",
    "dive bar New London",
    "rock club Connecticut",
    "craft beer bar New London",
    "16 Bank Street",
  ],
  openGraph: {
    title: "The Oasis Pub — New London CT",
    description:
      "The epicenter of New London's music scene. Live bands. Craft beer. Open 365 days a year.",
    url: "https://oasisnewlondon.com",
    siteName: "The Oasis Pub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Oasis Pub — New London CT",
    description: "The epicenter of New London's music scene.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
