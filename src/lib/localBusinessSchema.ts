import {
  LOCAL_BUSINESS_HOURS,
  LOCAL_BUSINESS_INFO,
  LOCAL_SERVICE_AREAS,
} from "@/content/localSeo";
import { SITE_URL } from "@/lib/site";

export function buildLocalBusinessSchema({
  path,
  serviceName,
  description,
  areaServed = LOCAL_SERVICE_AREAS,
}: {
  path: string;
  serviceName: string;
  description: string;
  // Defaults to the Doylestown/Bucks County/Philadelphia geo-targeting used
  // by the five local service pages. Override for pages like /hospitality
  // that want valid LocalBusiness data without local geo emphasis.
  areaServed?: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: LOCAL_BUSINESS_INFO.name,
    description,
    url: `${SITE_URL}${path}`,
    email: LOCAL_BUSINESS_INFO.email,
    telephone: LOCAL_BUSINESS_INFO.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: LOCAL_BUSINESS_INFO.streetAddress,
      addressLocality: LOCAL_BUSINESS_INFO.addressLocality,
      addressRegion: LOCAL_BUSINESS_INFO.addressRegion,
      postalCode: LOCAL_BUSINESS_INFO.postalCode,
      addressCountry: LOCAL_BUSINESS_INFO.addressCountry,
    },
    areaServed: areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    // [PLACEHOLDER] Sourced from LOCAL_BUSINESS_HOURS — replace those values
    // with real hours once available.
    openingHoursSpecification: LOCAL_BUSINESS_HOURS.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: serviceName,
      },
    },
  };
}
