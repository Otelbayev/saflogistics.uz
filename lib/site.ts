import type { Locale } from "./locales";

export type PartnerCountry = {
  code: string;
  name: string;
  lat: number;
  lng: number;
  hub?: boolean;
};

const partnerCountries: PartnerCountry[] = [
  { code: "CN", name: "China", lat: 23.1291, lng: 113.2644, hub: true },
  { code: "UZ", name: "Uzbekistan", lat: 41.3111, lng: 69.2797 },
  { code: "KZ", name: "Kazakhstan", lat: 51.1605, lng: 71.4704 },
  { code: "RU", name: "Russia", lat: 55.7558, lng: 37.6173 },
  { code: "TR", name: "Türkiye", lat: 41.0082, lng: 28.9784 },
  { code: "KR", name: "South Korea", lat: 37.5665, lng: 126.978 },
  { code: "JP", name: "Japan", lat: 35.6762, lng: 139.6503 },
  { code: "DE", name: "Germany", lat: 52.52, lng: 13.405 },
  { code: "AE", name: "UAE", lat: 25.2048, lng: 55.2708 },
  { code: "IN", name: "India", lat: 28.6139, lng: 77.209 },
  { code: "US", name: "USA", lat: 38.9072, lng: -77.0369 },
  { code: "GB", name: "United Kingdom", lat: 51.5072, lng: -0.1276 },
];

export const siteConfig = {
  name: "SAF Logistics",
  shortName: "SAF",
  url: "https://saflogistics.uz",
  founder: "Farrukh Mashanpin",
  phones: ["+998935118484", "+998771730303"],
  email: "info@saflogistics.uz",
  address: "Tashkent, Uzbekistan",
  mapUrl: "https://maps.app.goo.gl/u8wdkLZBd8cnEKNz7",
  mapEmbed:
    "https://www.google.com/maps?q=Tashkent%2C+Uzbekistan&output=embed",
  instagram: "https://www.instagram.com/farrukh_mashanpin",
  hub: { city: "Guangzhou", country: "China", lat: 23.1291, lng: 113.2644 },
  partnerCountries,
};

export const localeHtmlLang: Record<Locale, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};
