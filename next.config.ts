import type { NextConfig } from "next";
import { locales } from "./lib/locales";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only serves qualities listed here; 70 is what the large
    // photographic backdrops use, 75 is the default for everything else.
    qualities: [70, 75],
    // Default is 4 hours. These sources never change in place — a replaced
    // asset gets a new filename — so a long TTL just removes cold re-encodes.
    minimumCacheTTL: 2678400, // 31 days
  },
  compress: true,
  /**
   * Vercel serves everything in `public/` as `max-age=0, must-revalidate`, so
   * every visit re-requests every photo — painful on a slow link. These files
   * are content-stable, so they get a year.
   *
   * Per the next/image docs this also fixes the optimizer's own output: the
   * Max Age of an optimized image is the larger of `minimumCacheTTL` and the
   * *upstream* file's Cache-Control, and there is no cache-invalidation API.
   *
   * The rule that makes this safe: REPLACING AN IMAGE OR VIDEO MEANS GIVING
   * IT A NEW FILENAME. Overwrite one in place and returning visitors keep the
   * old bytes for a year.
   */
  async headers() {
    return [
      {
        source: "/:dir(images|videos)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  poweredByHeader: false,
  // The site collapsed from three pages into one landing; keep the old URLs alive.
  async redirects() {
    return [
      { from: "services", to: "tariffs" },
      { from: "contact", to: "contact" },
    ].flatMap(({ from, to }) =>
      locales.map((locale) => ({
        source: `/${locale}/${from}`,
        destination: `/${locale}#${to}`,
        permanent: true,
      })),
    );
  },
};

export default nextConfig;
