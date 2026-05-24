import type { Metadata } from "next";

import { siteMeta } from "@/lib/site-data";

export const seoKeywords = [
  "Queen City Ishaare",
  "QCI",
  "QCI dance",
  "QCI dance team",
  "QCI Bollywood",
  "Queen City Ishaare dance",
  "Queen City Ishaare QCI",
  "UNC Charlotte Bollywood dance team",
  "UNC Charlotte dance team",
  "UNCC Bollywood fusion",
  "UNCC dance team",
  "UNCC Bollywood dance team",
  "Charlotte Bollywood dance",
  "Charlotte Bollywood dance team",
  "Charlotte dance team",
  "best dance team Charlotte",
  "best dance team in Charlotte NC",
  "South Asian dance team",
  "South Asian dance team Charlotte",
  "Bollywood fusion dance",
  "Bollywood fusion dance team",
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

export type SeoLandingPage = {
  path: `/${string}`;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedLinks: Array<{
    href: `/${string}`;
    label: string;
  }>;
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    path: "/qci",
    eyebrow: "QCI",
    title: "QCI",
    metaTitle: "QCI | Queen City Ishaare Dance Team",
    metaDescription:
      "QCI stands for Queen City Ishaare, UNC Charlotte's Bollywood fusion dance team in Charlotte, North Carolina.",
    heroTitle: "QCI is Queen City Ishaare.",
    heroDescription:
      "When people search QCI at UNC Charlotte, QCI dance, or Queen City Ishaare, they are looking for the student-run Bollywood fusion team based in Charlotte.",
    intro:
      "QCI is short for Queen City Ishaare, a UNC Charlotte Bollywood fusion dance team known for South Asian stage energy, collegiate competition sets, campus showcases, and community performances across Charlotte.",
    sections: [
      {
        title: "What QCI Means",
        body:
          "QCI means Queen City Ishaare. The name connects Charlotte's Queen City identity with Ishaare, a performance language built through movement, expression, musicality, and South Asian dance culture.",
      },
      {
        title: "QCI at UNC Charlotte",
        body:
          "Queen City Ishaare represents UNC Charlotte through Bollywood fusion choreography that blends Bollywood, hip-hop, contemporary, classical, Bhangra, Kuthu, and high-energy collegiate stage production.",
      },
      {
        title: "QCI in Charlotte",
        body:
          "QCI performs for campus events, cultural showcases, competition weekends, and community moments, giving Charlotte audiences a student-led South Asian dance team with a bold visual identity.",
      },
    ],
    faqs: [
      {
        question: "What is QCI?",
        answer:
          "QCI is Queen City Ishaare, UNC Charlotte's Bollywood fusion dance team in Charlotte, North Carolina.",
      },
      {
        question: "Is QCI a dance team?",
        answer:
          "Yes. QCI is a Bollywood fusion dance team that performs South Asian, hip-hop, contemporary, classical, Bhangra, and Kuthu-inspired choreography.",
      },
      {
        question: "Where is QCI based?",
        answer:
          "QCI is based at UNC Charlotte and performs across Charlotte, campus events, showcases, and collegiate competition weekends.",
      },
    ],
    relatedLinks: [
      { href: "/qci-dance", label: "QCI Dance" },
      { href: "/gallery", label: "Performance Gallery" },
      { href: "/calendar", label: "Upcoming Events" },
    ],
  },
  {
    path: "/qci-dance",
    eyebrow: "QCI Dance",
    title: "QCI Dance",
    metaTitle: "QCI Dance | Queen City Ishaare at UNC Charlotte",
    metaDescription:
      "QCI Dance is Queen City Ishaare, UNC Charlotte's Bollywood fusion dance team performing South Asian dance in Charlotte.",
    heroTitle: "QCI Dance at UNC Charlotte.",
    heroDescription:
      "QCI Dance is the search-friendly home for Queen City Ishaare, a Charlotte-based Bollywood fusion team built for campus stages, showcases, and competition weekends.",
    intro:
      "QCI Dance brings together Bollywood, hip-hop, contemporary, classical, Bhangra, Kuthu, and South Asian stage performance. The team trains at UNC Charlotte and carries Queen City energy into every set.",
    sections: [
      {
        title: "Bollywood Fusion Performance",
        body:
          "QCI Dance is rooted in Bollywood fusion, which means the team builds routines with South Asian musicality, storytelling, sharp formations, modern choreography, and crowd-facing stage energy.",
      },
      {
        title: "A Collegiate Dance Team",
        body:
          "Queen City Ishaare is a student-led collegiate dance team. Members balance rehearsals, choreography, travel, fundraising, campus performances, and competition preparation throughout the season.",
      },
      {
        title: "Charlotte Stage Energy",
        body:
          "For anyone searching for QCI dance, Charlotte Bollywood dance, or a South Asian dance team at UNC Charlotte, Queen City Ishaare is the team behind the QCI name.",
      },
    ],
    faqs: [
      {
        question: "What does QCI Dance perform?",
        answer:
          "QCI Dance performs Bollywood fusion with South Asian dance, hip-hop, contemporary, classical, Bhangra, and Kuthu influences.",
      },
      {
        question: "Is QCI Dance the same as Queen City Ishaare?",
        answer:
          "Yes. QCI Dance refers to Queen City Ishaare, UNC Charlotte's Bollywood fusion dance team.",
      },
      {
        question: "Can QCI Dance perform at events?",
        answer:
          "Queen City Ishaare appears at campus events, cultural showcases, community performances, and competition weekends. Event and sponsorship questions can be sent to the team email.",
      },
    ],
    relatedLinks: [
      { href: "/qci", label: "What QCI Means" },
      { href: "/support", label: "Book or Support QCI" },
      { href: "/gallery", label: "Watch QCI" },
    ],
  },
  {
    path: "/unc-charlotte-bollywood-dance-team",
    eyebrow: "UNC Charlotte Bollywood",
    title: "UNC Charlotte Bollywood Dance Team",
    metaTitle: "UNC Charlotte Bollywood Dance Team | Queen City Ishaare",
    metaDescription:
      "Queen City Ishaare is UNC Charlotte's Bollywood fusion dance team, representing Charlotte with South Asian performance and collegiate competition energy.",
    heroTitle: "UNC Charlotte's Bollywood fusion team.",
    heroDescription:
      "Queen City Ishaare gives UNC Charlotte a Bollywood fusion team with campus roots, competition ambition, South Asian performance culture, and a strong Queen City identity.",
    intro:
      "Queen City Ishaare is the UNC Charlotte Bollywood dance team for students, fans, alumni, families, and event organizers looking for a South Asian fusion performance group in Charlotte.",
    sections: [
      {
        title: "Built at UNC Charlotte",
        body:
          "The team represents UNC Charlotte through choreography, rehearsal culture, campus performances, and competition preparation while keeping the QCI identity visible across student life.",
      },
      {
        title: "South Asian Dance Culture",
        body:
          "QCI connects Bollywood, Bhangra, classical, Kuthu, hip-hop, and contemporary influences into performances that feel theatrical, precise, expressive, and high energy.",
      },
      {
        title: "For Campus and Community",
        body:
          "Queen City Ishaare performs for UNC Charlotte events and Charlotte-area cultural moments while also preparing for collegiate Bollywood fusion competitions.",
      },
    ],
    faqs: [
      {
        question: "Does UNC Charlotte have a Bollywood dance team?",
        answer:
          "Yes. Queen City Ishaare, also called QCI, is UNC Charlotte's Bollywood fusion dance team.",
      },
      {
        question: "What styles does Queen City Ishaare dance?",
        answer:
          "Queen City Ishaare blends Bollywood, Bhangra, hip-hop, contemporary, classical, Kuthu, and other South Asian dance styles.",
      },
      {
        question: "How can someone follow Queen City Ishaare?",
        answer:
          "The team posts season updates, performance clips, and announcements through the Queen City Ishaare Instagram and this website.",
      },
    ],
    relatedLinks: [
      { href: "/qci-dance", label: "QCI Dance" },
      { href: "/calendar", label: "Season Calendar" },
      { href: "/about", label: "About the Team" },
    ],
  },
  {
    path: "/charlotte-dance-team",
    eyebrow: "Charlotte Dance Team",
    title: "Charlotte Dance Team",
    metaTitle: "Charlotte Dance Team | Queen City Ishaare Bollywood Fusion",
    metaDescription:
      "Looking for a Charlotte dance team? Queen City Ishaare is a UNC Charlotte Bollywood fusion team performing South Asian dance across campus, showcases, and competitions.",
    heroTitle: "A Charlotte dance team with Queen City energy.",
    heroDescription:
      "Queen City Ishaare is a Charlotte-based Bollywood fusion dance team from UNC Charlotte, built for powerful stage visuals, cultural showcases, and collegiate competition sets.",
    intro:
      "For searches like Charlotte dance team, Charlotte Bollywood dance team, South Asian dance team Charlotte, or best dance team in Charlotte, Queen City Ishaare is a student-led team with a distinctive Bollywood fusion voice.",
    sections: [
      {
        title: "Why Charlotte Searches Find QCI",
        body:
          "QCI is based in Charlotte and carries the Queen City identity in its name. The team performs for campus, community, showcase, and competition audiences that want energetic South Asian fusion dance.",
      },
      {
        title: "Bollywood Fusion in Charlotte",
        body:
          "Queen City Ishaare brings Bollywood fusion choreography to Charlotte through expressive storytelling, tight formations, music edits, costumes, and stage-ready production.",
      },
      {
        title: "One of Charlotte's Most Distinctive Student Teams",
        body:
          "When people search for Charlotte's best dance team, they are often looking for a team with memorable performances, culture, polish, and community. QCI's niche is Bollywood fusion with UNC Charlotte roots.",
      },
    ],
    faqs: [
      {
        question: "What Charlotte dance team is QCI?",
        answer:
          "QCI is Queen City Ishaare, a Charlotte-based Bollywood fusion dance team from UNC Charlotte.",
      },
      {
        question: "Does QCI perform outside UNC Charlotte?",
        answer:
          "QCI performs for campus events, cultural showcases, community moments, and collegiate competition weekends.",
      },
      {
        question: "Is Queen City Ishaare a South Asian dance team in Charlotte?",
        answer:
          "Yes. Queen City Ishaare is a South Asian Bollywood fusion dance team based in Charlotte, North Carolina.",
      },
    ],
    relatedLinks: [
      { href: "/gallery", label: "Charlotte Performance Photos" },
      { href: "/support", label: "Support or Book QCI" },
      { href: "/unc-charlotte-bollywood-dance-team", label: "UNC Charlotte Team" },
    ],
  },
] as const;

export const publicSitemapRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/qci", changeFrequency: "monthly", priority: 0.93 },
  { path: "/qci-dance", changeFrequency: "monthly", priority: 0.94 },
  { path: "/unc-charlotte-bollywood-dance-team", changeFrequency: "monthly", priority: 0.9 },
  { path: "/charlotte-dance-team", changeFrequency: "monthly", priority: 0.88 },
  { path: "/about", changeFrequency: "monthly", priority: 0.82 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.9 },
  { path: "/calendar", changeFrequency: "weekly", priority: 0.86 },
  { path: "/support", changeFrequency: "monthly", priority: 0.78 },
] satisfies PublicRoute[];

export function getSeoLandingPage(path: `/${string}`) {
  const page = seoLandingPages.find((item) => item.path === path);

  if (!page) {
    throw new Error(`Missing SEO landing page for ${path}`);
  }

  return page;
}

function absoluteUrl(path: string) {
  return new URL(path, siteMeta.url).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
}: PageMetadataOptions): Metadata {
  const titleIncludesBrand = title.includes(siteMeta.name);
  const fullTitle = path === "/" ? `${siteMeta.name} | ${siteMeta.tagline}` : titleIncludesBrand ? title : `${title} | ${siteMeta.name}`;

  return {
    title: path === "/" || titleIncludesBrand ? { absolute: fullTitle } : title,
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
      "@type": ["Organization", "PerformingGroup"],
      "@id": `${siteMeta.url}/#organization`,
      name: siteMeta.name,
      alternateName: [
        siteMeta.shortName,
        "QCI Dance",
        "Queen City Ishaare Dance Team",
        "UNC Charlotte Bollywood Dance Team",
      ],
      url: siteMeta.url,
      logo: absoluteUrl(siteMeta.logoImage),
      image: absoluteUrl(siteMeta.homeImage),
      description: siteMeta.description,
      email: siteMeta.email,
      sameAs: [siteMeta.instagram],
      slogan: siteMeta.tagline,
      areaServed: {
        "@type": "City",
        name: "Charlotte, North Carolina",
      },
      memberOf: {
        "@type": "CollegeOrUniversity",
        name: "UNC Charlotte",
      },
      knowsAbout: [
        "Bollywood fusion dance",
        "South Asian dance",
        "College dance competitions",
        "Charlotte dance performances",
        "UNC Charlotte student performance",
      ],
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
