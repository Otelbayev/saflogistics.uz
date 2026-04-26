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
  title: "SAF Logistics",
  description:
    "SAF Logistics — reliable international freight forwarding from China to Uzbekistan and worldwide.",
  icons: {
    icon: "/favicon.ico",
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
