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
    default:
      "SAF Logistics — Xitoydan Toshkentga yuk tashish · логистика · logistics",
    template: "%s | SAF Logistics",
  },
  description:
    "SAF Logistics — Xitoydan O‘zbekistonga ishonchli xalqaro logistika va yuk tashish. Грузоперевозки из Китая в Узбекистан. Reliable international freight forwarding from China and worldwide.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo1.jpg", type: "image/jpeg" },
    ],
    apple: "/images/logo1.jpg",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "SAF Logistics — Xitoydan Toshkentga yuk tashish · логистика",
    description:
      "Xitoydan O‘zbekistonga ishonchli logistika · Грузоперевозки Китай — Узбекистан · International freight forwarding.",
    url: "https://saflogistics.uz",
    siteName: "SAF Logistics",
    locale: "uz_UZ",
    alternateLocale: ["ru_RU", "en_US"],
    type: "website",
    images: [
      {
        url: "/images/logo1.jpg",
        width: 1080,
        height: 1080,
        alt: "SAF Logistics — logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAF Logistics — Xitoydan Toshkentga yuk tashish",
    description:
      "Xalqaro logistika · логистика · freight forwarding from China to Uzbekistan.",
    images: ["/images/logo1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
