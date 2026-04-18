import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { siteConfig } from "@/lib/site";

type Props = { locale: Locale; dict: Dictionary };

export function BusinessJsonLd({ locale, dict }: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: dict.hero.subtitle,
    url: `${siteConfig.url}/${locale}`,
    image: `${siteConfig.url}/images/semi-truck-port-sunset.jpg`,
    telephone: siteConfig.phones[0],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
      jobTitle: dict.founder.role,
      sameAs: [siteConfig.instagram],
    },
    sameAs: [siteConfig.instagram],
    areaServed: siteConfig.partnerCountries.map((c) => ({
      "@type": "Country",
      name: c.name,
    })),
    serviceType: ["Freight forwarding", "Logistics", "Customs clearance"],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
