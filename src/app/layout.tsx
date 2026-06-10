import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://oasisnewlondon.com"),
  title: {
    default: "The Oasis Pub — New London CT | Live Music, Craft Beer, Rock Club",
    template: "%s | The Oasis Pub",
  },
  description:
    "New London CT's rock club and music venue. Emerging bands, 20+ craft beers, live music 365 nights a year at 16 Bank Street.",
  keywords: [
    "Oasis Pub New London",
    "live music New London CT",
    "music venue New London",
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
        {/* LocalBusiness + BarOrPub schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["BarOrPub", "MusicVenue", "LocalBusiness"],
              name: "The Oasis Pub",
              url: "https://oasisnewlondon.com",
              logo: "https://oasisnewlondon.com/images/logo-white.png",
              image: "https://oasisnewlondon.com/images/heroes/poster-collage.jpg",
              description:
                "New London CT's rock club and music venue. Emerging bands, 20+ craft beers, live music 365 nights a year at 16 Bank Street.",
              telephone: "+18604473929",
              email: "oasisnewlondon@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "16 Bank Street",
                addressLocality: "New London",
                addressRegion: "CT",
                postalCode: "06320",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 41.3538144,
                longitude: -72.093805,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
                  opens: "19:00",
                  closes: "01:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Friday", "Saturday"],
                  opens: "19:00",
                  closes: "02:00",
                },
              ],
              servesCuisine: "Craft Beer",
              priceRange: "$",
              currenciesAccepted: "USD",
              paymentAccepted: "Cash, Credit Card",
              sameAs: [
                "https://www.facebook.com/theoasispub",
                "https://www.instagram.com/oasispub",
              ],
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Live Music", value: true },
                { "@type": "LocationFeatureSpecification", name: "Craft Beer", value: true },
                { "@type": "LocationFeatureSpecification", name: "21+ Only", value: true },
                { "@type": "LocationFeatureSpecification", name: "No Cover Charge", value: true },
              ],
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
