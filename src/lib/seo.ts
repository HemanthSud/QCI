import type { Metadata } from "next";

import { siteMeta } from "@/lib/site-data";

export const seoKeywords = [
  "Queen City Ishaare",
  "QCI",
  "UNC Charlotte Bollywood dance team",
  "UNCC Bollywood fusion",
  "Charlotte Bollywood dance",
  "South Asian dance team",
  "Bollywood fusion dance",
  "college dance team Charlotte",
] as const;

const defaultOgImage = siteMeta.homeImage;

type PublicRoute = {
  path: `/${string}`;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}`;
  image?: string;
};

export const publicSitemapRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.82 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.9 },
  { path: "/calendar", changeFrequency: "weekly", priority: 0.86 },
  { path: "/support", changeFrequency: "monthly", priority: 0.78 },
] satisfies PublicRoute[];

function absoluteUrl(path: string) {
  return new URL(path, siteMeta.url).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
}: PageMetadataOptions): Metadata {
  const fullTitle = path === "/" ? `${siteMeta.name} | ${siteMeta.tagline}` : `${title} | ${siteMeta.name}`;

  return {
    title: path === "/" ? fullTitle : title,
    description,
    keywords: [...seoKeywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteMeta.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteMeta.name} dancers and crest`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function createNoIndexMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteMeta.url}/#organization`,
      name: siteMeta.name,
      alternateName: siteMeta.shortName,
      url: siteMeta.url,
      logo: absoluteUrl(siteMeta.logoImage),
      image: absoluteUrl(siteMeta.homeImage),
      description: siteMeta.description,
      email: siteMeta.email,
      sameAs: [siteMeta.instagram],
      areaServed: {
        "@type": "City",
        name: "Charlotte, North Carolina",
      },
      keywords: seoKeywords.join(", "),
    },
    {
      "@type": "WebSite",
      "@id": `${siteMeta.url}/#website`,
      name: siteMeta.name,
      alternateName: siteMeta.shortName,
      url: siteMeta.url,
      description: siteMeta.description,
      publisher: {
        "@id": `${siteMeta.url}/#organization`,
      },
      inLanguage: "en-US",
    },
  ],
} as const;
