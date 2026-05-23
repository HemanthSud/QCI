import { calendarBuckets, homePhotoStrip, jalwaImages, nashaImages, siteMeta } from "@/lib/site-data";

export type EditableImage = {
  alt: string;
  caption?: string;
  id: string;
  position?: string;
  src: string;
  storagePath?: string;
};

export type EditableGallerySection = {
  eyebrow: string;
  id: string;
  images: EditableImage[];
  title: string;
};

export type EditableImageSlot = {
  id: string;
  image: EditableImage;
  label: string;
};

export type EditableCalendarBucket = {
  description: string;
  id: string;
  title: string;
};

export type EditableCalendarEvent = {
  date: string;
  description: string;
  id: string;
  kind: string;
  location: string;
  status: string;
  title: string;
};

export type EditableCalendarContent = {
  buckets: EditableCalendarBucket[];
  emptyBody: string;
  emptyTitle: string;
  eventTypesEyebrow: string;
  eventTypesTitle: string;
  events: EditableCalendarEvent[];
  heroEyebrow: string;
  heroTitle: string;
  upcomingEyebrow: string;
  upcomingTitle: string;
};

export type EditableTextBlock = {
  group: string;
  id: string;
  label: string;
  multiline?: boolean;
  value: string;
};

export type EditableThemeMode = "dark" | "light";

export type EditableTheme = Record<EditableThemeMode, Record<string, string>>;

export type SiteEditorContent = {
  calendar: EditableCalendarContent;
  gallerySections: EditableGallerySection[];
  homePhotoStrip: EditableImage[];
  imageSlots: EditableImageSlot[];
  schemaVersion: 1;
  textBlocks: EditableTextBlock[];
  theme: EditableTheme;
  updatedAt: string;
};

export type SiteEditorVersion = {
  createdAt: string;
  path: string;
};

export const siteEditorPreviewStorageKey = "qci-site-editor-preview";
export const siteEditorPreviewEvent = "qci-site-editor-preview-change";

export const editableThemeTokens = [
  { key: "--color-background", label: "Background" },
  { key: "--color-foreground", label: "Foreground" },
  { key: "--color-black", label: "Base" },
  { key: "--color-deep", label: "Deep Surface" },
  { key: "--color-red", label: "Charlotte Green" },
  { key: "--color-red-dark", label: "Deep Green" },
  { key: "--color-on-red", label: "Text On Primary" },
  { key: "--color-cream", label: "Cream/Text" },
  { key: "--color-gold", label: "Niner Gold" },
  { key: "--color-night", label: "Card Text" },
  { key: "--color-flame", label: "Gold Accent" },
  { key: "--color-ember", label: "Jasper Accent" },
  { key: "--color-rose", label: "Support Accent" },
  { key: "--footer-bg", label: "Footer" },
  { key: "--logo-bg", label: "Logo Backing" },
] as const;

const legacyDefaultTheme: EditableTheme = {
  dark: {
    "--color-background": "#080808",
    "--color-foreground": "#f2ede4",
    "--color-black": "#080808",
    "--color-deep": "#100808",
    "--color-red": "#c8102e",
    "--color-red-dark": "#8b0b1f",
    "--color-on-red": "#f2ede4",
    "--color-cream": "#f2ede4",
    "--color-gold": "#d4af37",
    "--color-night": "#f2ede4",
    "--color-flame": "#c8102e",
    "--color-ember": "#ff6f60",
    "--color-rose": "#f3b5ac",
    "--footer-bg": "#040404",
    "--logo-bg": "#000000",
  },
  light: {
    "--color-background": "#fff8ef",
    "--color-foreground": "#281111",
    "--color-black": "#fff8ef",
    "--color-deep": "#fff1e5",
    "--color-red": "#b60e2a",
    "--color-red-dark": "#f3d8d2",
    "--color-on-red": "#fffaf2",
    "--color-cream": "#281111",
    "--color-gold": "#8a640f",
    "--color-night": "#281111",
    "--color-flame": "#b60e2a",
    "--color-ember": "#9f231c",
    "--color-rose": "#8b0b1f",
    "--footer-bg": "#fff1e5",
    "--logo-bg": "#120707",
  },
};

const previousBlueDefaultTheme: EditableTheme = {
  dark: {
    "--color-background": "#05090d",
    "--color-foreground": "#f3f5f7",
    "--color-black": "#05090d",
    "--color-deep": "#071426",
    "--color-red": "#d8b45f",
    "--color-red-dark": "#061b31",
    "--color-on-red": "#06111c",
    "--color-cream": "#f3f5f7",
    "--color-gold": "#e8cf86",
    "--color-night": "#f3f5f7",
    "--color-flame": "#f1d98e",
    "--color-ember": "#b8c4d1",
    "--color-rose": "#d8dde3",
    "--footer-bg": "#030609",
    "--logo-bg": "#05090d",
  },
  light: {
    "--color-background": "#eef4f8",
    "--color-foreground": "#071426",
    "--color-black": "#eef4f8",
    "--color-deep": "#dfe8ef",
    "--color-red": "#b88932",
    "--color-red-dark": "#d9e0e7",
    "--color-on-red": "#06111c",
    "--color-cream": "#071426",
    "--color-gold": "#8f6824",
    "--color-night": "#071426",
    "--color-flame": "#9f762c",
    "--color-ember": "#536579",
    "--color-rose": "#33485f",
    "--footer-bg": "#dfe8ef",
    "--logo-bg": "#05090d",
  },
};

const defaultTheme: EditableTheme = {
  dark: {
    "--color-background": "#101820",
    "--color-foreground": "#ffffff",
    "--color-black": "#101820",
    "--color-deep": "#005035",
    "--color-red": "#005035",
    "--color-red-dark": "#003d2b",
    "--color-on-red": "#ffffff",
    "--color-cream": "#ffffff",
    "--color-gold": "#a49665",
    "--color-night": "#ffffff",
    "--color-flame": "#a49665",
    "--color-ember": "#f1e6b2",
    "--color-rose": "#f1e6b2",
    "--footer-bg": "#101820",
    "--logo-bg": "#05090d",
  },
  light: {
    "--color-background": "#ffffff",
    "--color-foreground": "#101820",
    "--color-black": "#ffffff",
    "--color-deep": "#f1e6b2",
    "--color-red": "#005035",
    "--color-red-dark": "#e6eddf",
    "--color-on-red": "#ffffff",
    "--color-cream": "#101820",
    "--color-gold": "#7d7046",
    "--color-night": "#101820",
    "--color-flame": "#a49665",
    "--color-ember": "#005035",
    "--color-rose": "#005035",
    "--footer-bg": "#f1e6b2",
    "--logo-bg": "#05090d",
  },
};

function makeImageId(prefix: string, value: string) {
  return `${prefix}-${value.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase()}`;
}

function makeGalleryImage(prefix: string, label: string, image: { alt: string; src: string }) {
  return {
    alt: image.alt || label,
    caption: label,
    id: makeImageId(prefix, image.src),
    src: image.src,
  } satisfies EditableImage;
}

const defaultTextBlocks: EditableTextBlock[] = [
  {
    group: "Home hero",
    id: "home-hero-eyebrow",
    label: "Hero eyebrow",
    value: "Queen City Ishaare · Est. 2015",
  },
  {
    group: "Home hero",
    id: "home-hero-title-line-1",
    label: "Hero title line 1",
    value: "UNCC's Premier",
  },
  {
    group: "Home hero",
    id: "home-hero-title-line-2",
    label: "Hero title line 2",
    value: "Bollywood Fusion",
  },
  {
    group: "Home hero",
    id: "home-hero-title-line-3",
    label: "Hero title line 3",
    value: "Dance Team",
  },
  {
    group: "Home hero",
    id: "home-hero-kicker",
    label: "Hero ribbon",
    value: "Where Bollywood Meets the Big Stage",
  },
  {
    group: "Home hero",
    id: "home-hero-description",
    label: "Hero description",
    multiline: true,
    value:
      "Queen City Ishaare brings Bollywood, hip-hop, contemporary, and South Asian stage energy together for campus showcases, community events, and competition weekends.",
  },
  {
    group: "Home about",
    id: "home-about-eyebrow",
    label: "About eyebrow",
    value: "About",
  },
  {
    group: "Home about",
    id: "home-about-title",
    label: "About title",
    value: "Bollywood fusion at UNCC.",
  },
  {
    group: "Home about",
    id: "home-about-body",
    label: "About body",
    multiline: true,
    value:
      "Queen City Ishaare is UNCC's competitive Bollywood fusion team, built for campus stages, community shows, and competition weekends.",
  },
  {
    group: "Home events",
    id: "home-events-eyebrow",
    label: "Events eyebrow",
    value: "On Stage",
  },
  {
    group: "Home events",
    id: "home-events-title",
    label: "Events title",
    value: "Comps this year.",
  },
  {
    group: "Home events",
    id: "home-events-body",
    label: "Events body",
    value: "The main competition stops and showcase moments for this season.",
  },
  {
    group: "Home auditions",
    id: "home-auditions-eyebrow",
    label: "Auditions eyebrow",
    value: "Join the Team",
  },
  {
    group: "Home auditions",
    id: "home-auditions-title",
    label: "Auditions title",
    value: "Fall Auditions",
  },
  {
    group: "Home auditions",
    id: "home-auditions-highlight",
    label: "Auditions highlighted text",
    value: "Coming Soon",
  },
  {
    group: "Gallery",
    id: "gallery-hero-eyebrow",
    label: "Gallery hero eyebrow",
    value: "Gallery",
  },
  {
    group: "Gallery",
    id: "gallery-hero-title",
    label: "Gallery hero title",
    value: "2026 recap and photos.",
  },
  {
    group: "Gallery",
    id: "gallery-recap-eyebrow",
    label: "Recap eyebrow",
    value: "Season recap",
  },
  {
    group: "Gallery",
    id: "gallery-recap-title",
    label: "Recap title",
    value: "2026",
  },
];

function makeBucketId(value: string, index: number) {
  const slug = value.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();

  return slug ? `calendar-${slug}` : `calendar-bucket-${index + 1}`;
}

export function createDefaultSiteEditorContent(): SiteEditorContent {
  return {
    calendar: {
      buckets: calendarBuckets.map((bucket, index) => ({
        ...bucket,
        id: makeBucketId(bucket.title, index),
      })),
      emptyBody: "For bookings or updates, use email or Instagram.",
      emptyTitle: "Dates will be posted once they are confirmed.",
      eventTypesEyebrow: "Event types",
      eventTypesTitle: "What may show up here.",
      events: [],
      heroEyebrow: "Calendar",
      heroTitle: "No upcoming events yet.",
      upcomingEyebrow: "Upcoming",
      upcomingTitle: "Calendar is clear right now.",
    },
    gallerySections: [
      {
        eyebrow: "Photos",
        id: "jersey-jalwa",
        images: jalwaImages.map((image) => makeGalleryImage("jalwa", "Jersey Jalwa", image)),
        title: "Jersey Jalwa",
      },
      {
        eyebrow: "Photos",
        id: "nasha-showcase",
        images: nashaImages.map((image) => makeGalleryImage("nasha", "NASHA Showcase", image)),
        title: "NASHA Showcase",
      },
    ],
    homePhotoStrip: homePhotoStrip.map((image, index) => ({
      alt: image.caption,
      caption: image.caption,
      id: makeImageId("home", `${index}-${image.src}`),
      position: image.position,
      src: image.src,
    })),
    imageSlots: [
      {
        id: "site-logo",
        image: {
          alt: "Queen City Ishaare logo",
          id: "site-logo-image",
          src: siteMeta.logoImage,
        },
        label: "Site logo",
      },
      {
        id: "gallery-recap-fallback",
        image: {
          alt: "Queen City Ishaare gallery fallback",
          id: "gallery-recap-fallback-image",
          src: siteMeta.homeImage,
        },
        label: "Gallery recap fallback",
      },
    ],
    schemaVersion: 1,
    textBlocks: defaultTextBlocks,
    theme: defaultTheme,
    updatedAt: new Date(0).toISOString(),
  };
}

function normalizeImage(image: Partial<EditableImage>, fallbackId: string): EditableImage {
  return {
    alt: typeof image.alt === "string" && image.alt.trim() ? image.alt.trim() : "QCI image",
    caption: typeof image.caption === "string" ? image.caption.trim() : "",
    id:
      typeof image.id === "string" && image.id.trim()
        ? image.id.trim()
        : `${fallbackId}-${crypto.randomUUID()}`,
    position: typeof image.position === "string" ? image.position.trim() : "",
    src: typeof image.src === "string" ? image.src.trim() : "",
    storagePath:
      typeof image.storagePath === "string" && image.storagePath.trim()
        ? image.storagePath.trim()
        : undefined,
  };
}

function normalizeTheme(value: unknown): EditableTheme {
  const incoming = value as Partial<EditableTheme> | undefined;
  const theme = structuredClone(defaultTheme);

  for (const mode of ["dark", "light"] as const) {
    for (const token of editableThemeTokens) {
      const nextValue = incoming?.[mode]?.[token.key];

      if (typeof nextValue === "string" && nextValue.trim()) {
        const trimmedValue = nextValue.trim();
        const legacyValue = legacyDefaultTheme[mode][token.key];
        const previousBlueValue = previousBlueDefaultTheme[mode][token.key];

        theme[mode][token.key] =
          trimmedValue.toLowerCase() === legacyValue.toLowerCase() ||
          trimmedValue.toLowerCase() === previousBlueValue.toLowerCase()
            ? defaultTheme[mode][token.key]
            : trimmedValue;
      }
    }
  }

  return theme;
}

function normalizeTextBlocks(value: unknown, fallback: EditableTextBlock[]) {
  const incoming = Array.isArray(value) ? (value as Partial<EditableTextBlock>[]) : [];

  return fallback.map((block) => {
    const incomingBlock = incoming.find((item) => item.id === block.id);

    return {
      ...block,
      value:
        typeof incomingBlock?.value === "string" ? incomingBlock.value.trim() : block.value,
    };
  });
}

function normalizeCalendar(value: unknown, fallback: EditableCalendarContent): EditableCalendarContent {
  const incoming = value as Partial<EditableCalendarContent> | undefined;
  const incomingBuckets = Array.isArray(incoming?.buckets) ? incoming.buckets : fallback.buckets;
  const incomingEvents = Array.isArray(incoming?.events) ? incoming.events : fallback.events;

  return {
    buckets: incomingBuckets.map((bucket, index) => ({
      description:
        typeof bucket.description === "string" ? bucket.description.trim() : "",
      id:
        typeof bucket.id === "string" && bucket.id.trim()
          ? bucket.id.trim()
          : makeBucketId(bucket.title ?? "", index),
      title:
        typeof bucket.title === "string" && bucket.title.trim()
          ? bucket.title.trim()
          : `Event type ${index + 1}`,
    })),
    emptyBody:
      typeof incoming?.emptyBody === "string" && incoming.emptyBody.trim()
        ? incoming.emptyBody.trim()
        : fallback.emptyBody,
    emptyTitle:
      typeof incoming?.emptyTitle === "string" && incoming.emptyTitle.trim()
        ? incoming.emptyTitle.trim()
        : fallback.emptyTitle,
    eventTypesEyebrow:
      typeof incoming?.eventTypesEyebrow === "string" && incoming.eventTypesEyebrow.trim()
        ? incoming.eventTypesEyebrow.trim()
        : fallback.eventTypesEyebrow,
    eventTypesTitle:
      typeof incoming?.eventTypesTitle === "string" && incoming.eventTypesTitle.trim()
        ? incoming.eventTypesTitle.trim()
        : fallback.eventTypesTitle,
    events: incomingEvents.map((event, index) => ({
      date: typeof event.date === "string" ? event.date.trim() : "",
      description: typeof event.description === "string" ? event.description.trim() : "",
      id:
        typeof event.id === "string" && event.id.trim()
          ? event.id.trim()
          : `calendar-event-${index + 1}`,
      kind: typeof event.kind === "string" && event.kind.trim() ? event.kind.trim() : "Event",
      location: typeof event.location === "string" ? event.location.trim() : "",
      status: typeof event.status === "string" ? event.status.trim() : "",
      title:
        typeof event.title === "string" && event.title.trim()
          ? event.title.trim()
          : `Calendar event ${index + 1}`,
    })),
    heroEyebrow:
      typeof incoming?.heroEyebrow === "string" && incoming.heroEyebrow.trim()
        ? incoming.heroEyebrow.trim()
        : fallback.heroEyebrow,
    heroTitle:
      typeof incoming?.heroTitle === "string" && incoming.heroTitle.trim()
        ? incoming.heroTitle.trim()
        : fallback.heroTitle,
    upcomingEyebrow:
      typeof incoming?.upcomingEyebrow === "string" && incoming.upcomingEyebrow.trim()
        ? incoming.upcomingEyebrow.trim()
        : fallback.upcomingEyebrow,
    upcomingTitle:
      typeof incoming?.upcomingTitle === "string" && incoming.upcomingTitle.trim()
        ? incoming.upcomingTitle.trim()
        : fallback.upcomingTitle,
  };
}

export function getEditableTextValue(
  content: Pick<SiteEditorContent, "textBlocks"> | null | undefined,
  id: string,
  fallback: string,
) {
  const value = content?.textBlocks.find((block) => block.id === id)?.value;

  return typeof value === "string" && value.trim() ? value : fallback;
}

export function normalizeSiteEditorContent(value: unknown): SiteEditorContent {
  const fallback = createDefaultSiteEditorContent();
  const incoming = value as Partial<SiteEditorContent> | undefined;
  const gallerySections = Array.isArray(incoming?.gallerySections)
    ? incoming.gallerySections.map((section, index) => ({
        eyebrow:
          typeof section.eyebrow === "string" && section.eyebrow.trim()
            ? section.eyebrow.trim()
            : "Photos",
        id:
          typeof section.id === "string" && section.id.trim()
            ? section.id.trim()
            : `section-${index + 1}`,
        images: Array.isArray(section.images)
          ? section.images
              .map((image, imageIndex) => normalizeImage(image, `section-${index + 1}-${imageIndex}`))
              .filter((image) => image.src)
          : [],
        title:
          typeof section.title === "string" && section.title.trim()
            ? section.title.trim()
            : `Section ${index + 1}`,
      }))
    : fallback.gallerySections;
  const normalizedHomePhotoStrip = Array.isArray(incoming?.homePhotoStrip)
    ? incoming.homePhotoStrip
        .map((image, index) => normalizeImage(image, `home-${index}`))
        .filter((image) => image.src)
    : fallback.homePhotoStrip;
  const normalizedImageSlots = Array.isArray(incoming?.imageSlots)
    ? fallback.imageSlots.map((slot) => {
        const incomingSlot = incoming.imageSlots?.find((item) => item.id === slot.id);

        return incomingSlot
          ? {
              id: slot.id,
              image: normalizeImage(incomingSlot.image, `${slot.id}-image`),
              label: slot.label,
            }
          : slot;
      })
    : fallback.imageSlots;

  return {
    calendar: normalizeCalendar(incoming?.calendar, fallback.calendar),
    gallerySections,
    homePhotoStrip: normalizedHomePhotoStrip.length
      ? normalizedHomePhotoStrip
      : fallback.homePhotoStrip,
    imageSlots: normalizedImageSlots,
    schemaVersion: 1,
    textBlocks: normalizeTextBlocks(incoming?.textBlocks, fallback.textBlocks),
    theme: normalizeTheme(incoming?.theme),
    updatedAt:
      typeof incoming?.updatedAt === "string" && incoming.updatedAt
        ? incoming.updatedAt
        : new Date().toISOString(),
  };
}
