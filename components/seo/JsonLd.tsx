import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { siteConfig } from "@/lib/site";

type Props = { locale: Locale; dict: Dictionary };

export function BusinessJsonLd({ locale, dict }: Props) {
  const url = `${siteConfig.url}/${locale}`;
  const logoUrl = `${siteConfig.url}${siteConfig.logo}`;
  const ogImage = `${siteConfig.url}${siteConfig.ogImage}`;
  const founderImage = `${siteConfig.url}${siteConfig.founderImage}`;

  const founderPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#founder`,
    name: siteConfig.founder,
    alternateName: siteConfig.founderAlt,
    givenName: "Farrukh",
    familyName: "Mashanpin",
    description:
      "Farrukh Mashanpin — SAF Logistics asoschisi, Guanchjou (Xitoy) ofisi rahbari · Фаррух Машанпин, основатель SAF Logistics, руководитель офиса в Гуанчжоу · Founder of SAF Logistics, head of Guangzhou (China) office.",
    jobTitle: dict.founder.role,
    image: {
      "@type": "ImageObject",
      url: founderImage,
      caption: siteConfig.founder,
    },
    url: `${siteConfig.url}/${locale}#founder`,
    nationality: { "@type": "Country", name: "Uzbekistan" },
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    knowsLanguage: ["uz", "ru", "zh", "en"],
    sameAs: [
      siteConfig.instagram,
      `https://www.instagram.com/${siteConfig.instagramHandle}`,
    ],
  };

  const business = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MovingCompany"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: [
      "SAF Logistics Uzbekistan",
      "САФ Логистикс",
      "SAF Логистика",
      "SAFcargo",
      "Saflogistics",
    ],
    description: dict.seo.homeDescription,
    url,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 1080,
      height: 1080,
    },
    image: [logoUrl, ogImage, `${siteConfig.url}/images/semi-truck-port-sunset.jpg`],
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
    founder: { "@id": `${siteConfig.url}/#founder` },
    employee: { "@id": `${siteConfig.url}/#founder` },
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
      "Aviayuk Xitoy",
      "Dengiz konteyneri",
      "Avtoyo'l yetkazib berish",
      "Bojxona rasmiylashtirish",
      "Авиаперевозки из Китая",
      "Морские контейнерные перевозки",
      "Автомобильные грузоперевозки",
      "Таможенное оформление",
      "Международная логистика",
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
      "Logistika",
      "Yuk tashish",
      "Xitoydan O'zbekistonga yuk",
      "Логистика",
      "Грузоперевозки",
      "Международная доставка",
      "Доставка из Китая",
      "Логистика Узбекистан",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderPerson) }}
      />
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
