import { createClient } from "@supabase/supabase-js";

import {
  type EditableImage,
  type SiteEditorContent,
  type SiteEditorVersion,
  createDefaultSiteEditorContent,
  normalizeSiteEditorContent,
} from "@/lib/site-editor";

const defaultGalleryBucket = "qci-gallery";
const draftPath = "site-editor/draft.json";
const publishedPath = "site-editor/published.json";
const uploadFolder = "site-editor/uploads";
const versionsFolder = "site-editor/versions";
const signedUrlExpiresInSeconds = 60 * 60;
const maxUploadBytes = 8 * 1024 * 1024;

const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const extensionByMimeType: Record<string, string> = {
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function getGalleryBucketName() {
  return process.env.QCI_GALLERY_BUCKET?.trim() || defaultGalleryBucket;
}

function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAdminKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAdminKey) {
    throw new Error("Supabase admin storage is not configured.");
  }

  return createClient(supabaseUrl, supabaseAdminKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function isMissingStorageError(error: { message?: string }) {
  const message = error.message?.toLowerCase() ?? "";

  return message.includes("not found") || message.includes("does not exist");
}

async function ensureEditorBucket() {
  const supabaseAdmin = getSupabaseAdminClient();
  const bucketName = getGalleryBucketName();
  const { error: lookupError } = await supabaseAdmin.storage.getBucket(bucketName);

  if (!lookupError) {
    const { error: updateError } = await supabaseAdmin.storage.updateBucket(bucketName, {
      allowedMimeTypes: ["image/*", "application/json"],
      fileSizeLimit: `${maxUploadBytes}`,
      public: false,
    });

    if (updateError) {
      throw updateError;
    }

    return { bucketName, supabaseAdmin };
  }

  const { error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
    allowedMimeTypes: ["image/*", "application/json"],
    fileSizeLimit: `${maxUploadBytes}`,
    public: false,
  });

  if (createError && !createError.message.toLowerCase().includes("already exists")) {
    throw createError;
  }

  return { bucketName, supabaseAdmin };
}

async function downloadJson(path: string): Promise<SiteEditorContent | null> {
  const supabaseAdmin = getSupabaseAdminClient();
  const bucketName = getGalleryBucketName();
  const { data, error } = await supabaseAdmin.storage.from(bucketName).download(path);

  if (error) {
    if (isMissingStorageError(error)) {
      return null;
    }

    throw error;
  }

  const text = await data.text();
  const parsed = JSON.parse(text);

  return normalizeSiteEditorContent(parsed);
}

async function uploadJson(path: string, content: SiteEditorContent) {
  const { bucketName, supabaseAdmin } = await ensureEditorBucket();
  const body = new Blob([JSON.stringify(content, null, 2)], {
    type: "application/json",
  });
  const { error } = await supabaseAdmin.storage.from(bucketName).upload(path, body, {
    cacheControl: "0",
    contentType: "application/json",
    upsert: true,
  });

  if (error) {
    throw error;
  }
}

function collectStoragePaths(content: SiteEditorContent) {
  return [
    ...content.gallerySections.flatMap((section) =>
      section.images.map((image) => image.storagePath).filter(Boolean),
    ),
    ...content.homePhotoStrip.map((image) => image.storagePath).filter(Boolean),
    ...content.imageSlots.map((slot) => slot.image.storagePath).filter(Boolean),
  ] as string[];
}

async function withSignedImageUrls(content: SiteEditorContent): Promise<SiteEditorContent> {
  const paths = collectStoragePaths(content);

  if (paths.length === 0) {
    return content;
  }

  const supabaseAdmin = getSupabaseAdminClient();
  const bucketName = getGalleryBucketName();
  const { data, error } = await supabaseAdmin.storage
    .from(bucketName)
    .createSignedUrls(paths, signedUrlExpiresInSeconds);

  if (error) {
    throw error;
  }

  const signedByPath = new Map(
    (data ?? [])
      .filter((item) => item.path && item.signedUrl)
      .map((item) => [item.path, item.signedUrl]),
  );
  const signImage = (image: EditableImage) => ({
    ...image,
    src: image.storagePath ? signedByPath.get(image.storagePath) ?? image.src : image.src,
  });

  return {
    ...content,
    gallerySections: content.gallerySections.map((section) => ({
      ...section,
      images: section.images.map(signImage),
    })),
    homePhotoStrip: content.homePhotoStrip.map(signImage),
    imageSlots: content.imageSlots.map((slot) => ({
      ...slot,
      image: signImage(slot.image),
    })),
  };
}

export async function getPublicSiteEditorContent() {
  try {
    const content = (await downloadJson(publishedPath)) ?? createDefaultSiteEditorContent();

    return await withSignedImageUrls(content);
  } catch (error) {
    if (error instanceof Error && error.message.includes("not configured")) {
      return createDefaultSiteEditorContent();
    }

    throw error;
  }
}

export async function getSiteEditorState() {
  const published = (await downloadJson(publishedPath)) ?? createDefaultSiteEditorContent();
  const draft = (await downloadJson(draftPath)) ?? published;
  const versions = await listSiteEditorVersions();

  return {
    draft: await withSignedImageUrls(draft),
    published: await withSignedImageUrls(published),
    versions,
  };
}

export async function saveSiteEditorDraft(content: SiteEditorContent) {
  const draft = normalizeSiteEditorContent({
    ...content,
    updatedAt: new Date().toISOString(),
  });

  await uploadJson(draftPath, draft);

  return withSignedImageUrls(draft);
}

export async function publishSiteEditorContent(content: SiteEditorContent) {
  const published = normalizeSiteEditorContent({
    ...content,
    updatedAt: new Date().toISOString(),
  });
  const versionPath = `${versionsFolder}/${published.updatedAt.replace(/[:.]/g, "-")}.json`;

  await uploadJson(publishedPath, published);
  await uploadJson(draftPath, published);
  await uploadJson(versionPath, published);

  return {
    published: await withSignedImageUrls(published),
    versions: await listSiteEditorVersions(),
  };
}

export async function resetDraftToPublished() {
  const published = (await downloadJson(publishedPath)) ?? createDefaultSiteEditorContent();

  await uploadJson(draftPath, published);

  return withSignedImageUrls(published);
}

export async function restoreSiteEditorVersion(path: string) {
  if (!path.startsWith(`${versionsFolder}/`) || !path.endsWith(".json")) {
    throw new Error("Choose a valid editor version.");
  }

  const version = await downloadJson(path);

  if (!version) {
    throw new Error("That editor version could not be found.");
  }

  await uploadJson(draftPath, version);

  return withSignedImageUrls(version);
}

export async function listSiteEditorVersions(): Promise<SiteEditorVersion[]> {
  const supabaseAdmin = getSupabaseAdminClient();
  const bucketName = getGalleryBucketName();
  const { data, error } = await supabaseAdmin.storage.from(bucketName).list(versionsFolder, {
    limit: 30,
    sortBy: {
      column: "created_at",
      order: "desc",
    },
  });

  if (error) {
    if (isMissingStorageError(error)) {
      return [];
    }

    throw error;
  }

  return (data ?? [])
    .filter((file) => file.name.endsWith(".json"))
    .map((file) => ({
      createdAt: file.created_at ?? file.name.replace(/\.json$/, ""),
      path: `${versionsFolder}/${file.name}`,
    }));
}

export async function uploadSiteEditorImage(file: File): Promise<EditableImage> {
  if (!acceptedImageTypes.has(file.type)) {
    throw new Error("Choose a JPG, PNG, WebP, or GIF image.");
  }

  if (file.size > maxUploadBytes) {
    throw new Error("Choose an image under 8 MB.");
  }

  const { bucketName, supabaseAdmin } = await ensureEditorBucket();
  const extension = extensionByMimeType[file.type] ?? "jpg";
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const storagePath = `${uploadFolder}/${fileName}`;
  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucketName)
    .upload(storagePath, file, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data, error: signedUrlError } = await supabaseAdmin.storage
    .from(bucketName)
    .createSignedUrl(storagePath, signedUrlExpiresInSeconds);

  if (signedUrlError || !data?.signedUrl) {
    throw signedUrlError ?? new Error("Image uploaded, but preview could not be created.");
  }

  return {
    alt: file.name.replace(/\.[^.]+$/, "").replaceAll("-", " "),
    caption: "",
    id: crypto.randomUUID(),
    src: data.signedUrl,
    storagePath,
  };
}
