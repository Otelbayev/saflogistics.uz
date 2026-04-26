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
  verification: {
    google: "kMhsNqHBmEreRqg7G4upchL42Tm8ksL361dsC8xZX3s",
  },
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
