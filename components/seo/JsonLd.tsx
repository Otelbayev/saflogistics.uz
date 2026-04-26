import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { siteConfig } from "@/lib/site";

type Props = { locale: Locale; dict: Dictionary };

export function BusinessJsonLd({ locale, dict }: Props) {
  const url = `${siteConfig.url}/${locale}`;
  const image = `${siteConfig.url}/images/semi-truck-port-sunset.jpg`;

  const business = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MovingCompany"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: ["SAF Logistics Uzbekistan", "SAFcargo"],
    description: dict.seo.homeDescription,
    url,
    logo: `${siteConfig.url}/images/logo.png`,
    image,
    telephone: siteConfig.phones,
    email: siteConfig.email,
    priceRange: "$$",
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
    serviceType: [
      "Air freight",
      "Sea freight",
      "Road freight",
      "Customs clearance",
      "B2B logistics",
      "China sourcing",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "120",
    },
    knowsAbout: [
      "Freight forwarding",
      "Guangzhou Tashkent route",
      "Customs clearance Uzbekistan",
      "International logistics",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: locale,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.nav.home,
        item: url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dict.nav.services,
        item: `${url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: dict.nav.contact,
        item: `${url}/contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
