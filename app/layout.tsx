import type { Metadata, Viewport } from "next";
import "./globals.css";
import { themeInitScript } from "@/components/theme/ThemeProvider";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030f31" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://saflogistics.uz"),
  title: {
    default: "SAF Logistics",
    template: "%s | SAF Logistics",
  },
  description:
    "SAF Logistics — reliable international freight forwarding from China to Uzbekistan and worldwide.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SAF Logistics",
    description: "Reliable international freight forwarding services.",
    url: "https://saflogistics.uz",
    siteName: "SAF Logistics",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SAF Logistics",
  url: "https://saflogistics.uz",
  logo: "https://saflogistics.uz/images/logo1.jpg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+998-77-173-03-30",
    contactType: "customer service",
  },
  sameAs: [
    "https://www.instagram.com/saflogistics.uz",
    "https://www.facebook.com/people/Saflogisticsuz/61570887943696/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
