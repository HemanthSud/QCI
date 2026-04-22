import { homePhotoStrip, jalwaImages, nashaImages, siteMeta } from "@/lib/site-data";

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

export type EditableThemeMode = "dark" | "light";

export type EditableTheme = Record<EditableThemeMode, Record<string, string>>;

export type SiteEditorContent = {
  gallerySections: EditableGallerySection[];
  homePhotoStrip: EditableImage[];
  imageSlots: EditableImageSlot[];
  schemaVersion: 1;
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
  { key: "--color-red", label: "Primary Red" },
  { key: "--color-red-dark", label: "Deep Red" },
  { key: "--color-on-red", label: "Text On Red" },
  { key: "--color-cream", label: "Cream/Text" },
  { key: "--color-gold", label: "Gold" },
  { key: "--color-night", label: "Card Text" },
  { key: "--color-flame", label: "Flame" },
  { key: "--color-ember", label: "Ember" },
  { key: "--color-rose", label: "Rose" },
  { key: "--footer-bg", label: "Footer" },
  { key: "--logo-bg", label: "Logo Backing" },
] as const;

const defaultTheme: EditableTheme = {
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

export function createDefaultSiteEditorContent(): SiteEditorContent {
  return {
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
        theme[mode][token.key] = nextValue.trim();
      }
    }
  }

  return theme;
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
    gallerySections,
    homePhotoStrip: normalizedHomePhotoStrip.length
      ? normalizedHomePhotoStrip
      : fallback.homePhotoStrip,
    imageSlots: normalizedImageSlots,
    schemaVersion: 1,
    theme: normalizeTheme(incoming?.theme),
    updatedAt:
      typeof incoming?.updatedAt === "string" && incoming.updatedAt
        ? incoming.updatedAt
        : new Date().toISOString(),
  };
}
