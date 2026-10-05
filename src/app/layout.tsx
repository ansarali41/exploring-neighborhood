import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Inter, Poppins } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getUpcomingEvents } from "@/data/events";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });
// Only used for the few Bangla phrases (lang="bn")
const hindSiliguri = Hind_Siliguri({ variable: "--font-hind-siliguri", subsets: ["bengali"], weight: ["500", "600"], display: "swap" });

// Upcoming/past events are split at build time — rebuild daily so the lists stay fresh.
export const revalidate = 86400;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Nature • Science • Citizen Science • Conservation`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: ["Bangladesh", "nature walks", "bird watching", "frogs", "citizen science", "biodiversity", "astronomy", "environmental education"],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    images: [{ url: "/images/logo.png", width: 512, height: 512, alt: site.name }],
  },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  themeColor: "#14382e",
};

const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  alternateName: site.banglaTagline,
  slogan: site.tagline,
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  email: site.email,
  areaServed: "Bangladesh",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const next = getUpcomingEvents()[0];
  const featuredEvent = next && {
    title: next.title,
    href: `/events/${next.slug}`,
    date: formatDate(next.start, { weekday: "short", day: "numeric", month: "long" }),
    location: next.location,
    image: next.image,
  };

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${hindSiliguri.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }} />
        <Header featuredEvent={featuredEvent} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
