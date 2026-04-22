import { createClient } from "@supabase/supabase-js";

import { isElevatedMember } from "@/lib/authz";

const defaultGalleryBucket = "qci-gallery";
const elevatedGalleryFolder = "hemanth";
const signedUrlExpiresInSeconds = 60 * 60;
const maxUploadBytes = 8 * 1024 * 1024;

const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const extensionByMimeType: Record<string, string> = {
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export type ElevatedGalleryImage = {
  alt: string;
  createdAt: string | null;
  name: string;
  path: string;
  src: string;
};

export function getElevatedGalleryLimits() {
  return {
    acceptedImageTypes,
    maxUploadBytes,
  };
}

function getGalleryBucketName() {
  return process.env.QCI_GALLERY_BUCKET?.trim() || defaultGalleryBucket;
}

function isMissingBucketError(error: { message?: string }) {
  const message = error.message?.toLowerCase() ?? "";

  return message.includes("not found") || message.includes("does not exist");
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

async function ensureGalleryBucket() {
  const supabaseAdmin = getSupabaseAdminClient();
  const bucketName = getGalleryBucketName();
  const { error: lookupError } = await supabaseAdmin.storage.getBucket(bucketName);

  if (!lookupError) {
    return { bucketName, supabaseAdmin };
  }

  const { error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
    allowedMimeTypes: ["image/*"],
    fileSizeLimit: `${maxUploadBytes}`,
    public: false,
  });

  if (createError && !createError.message.toLowerCase().includes("already exists")) {
    throw createError;
  }

  return { bucketName, supabaseAdmin };
}

export async function getElevatedUserFromRequest(request: Request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) {
    return null;
  }

  const supabaseAdmin = getSupabaseAdminClient();
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !isElevatedMember(user)) {
    return null;
  }

  return user;
}

export async function listElevatedGalleryImages(): Promise<ElevatedGalleryImage[]> {
  const supabaseAdmin = getSupabaseAdminClient();
  const bucketName = getGalleryBucketName();
  const { data: files, error } = await supabaseAdmin.storage
    .from(bucketName)
    .list(elevatedGalleryFolder, {
      limit: 60,
      sortBy: {
        column: "created_at",
        order: "desc",
      },
    });

  if (error) {
    if (isMissingBucketError(error)) {
      return [];
    }

    throw error;
  }

  const imageFiles = (files ?? []).filter((file) => file.id && file.name);

  const signedImages = await Promise.all(
    imageFiles.map(async (file) => {
      const path = `${elevatedGalleryFolder}/${file.name}`;
      const { data, error: signedUrlError } = await supabaseAdmin.storage
        .from(bucketName)
        .createSignedUrl(path, signedUrlExpiresInSeconds);

      if (signedUrlError || !data?.signedUrl) {
        return null;
      }

      return {
        alt: `QCI upload ${file.name.replace(/\.[^.]+$/, "").replaceAll("-", " ")}`,
        createdAt: file.created_at ?? null,
        name: file.name,
        path,
        src: data.signedUrl,
      };
    }),
  );

  return signedImages.filter((image): image is ElevatedGalleryImage => Boolean(image));
}

export async function uploadElevatedGalleryImage(file: File) {
  if (!acceptedImageTypes.has(file.type)) {
    throw new Error("Choose a JPG, PNG, WebP, or GIF image.");
  }

  if (file.size > maxUploadBytes) {
    throw new Error("Choose an image under 8 MB.");
  }

  const { bucketName, supabaseAdmin } = await ensureGalleryBucket();
  const extension = extensionByMimeType[file.type] ?? "jpg";
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const path = `${elevatedGalleryFolder}/${fileName}`;

  const { error: uploadError } = await supabaseAdmin.storage.from(bucketName).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });

  if (uploadError) {
    throw uploadError;
  }

  const { data, error: signedUrlError } = await supabaseAdmin.storage
    .from(bucketName)
    .createSignedUrl(path, signedUrlExpiresInSeconds);

  if (signedUrlError || !data?.signedUrl) {
    throw signedUrlError ?? new Error("Image uploaded, but preview could not be created.");
  }

  return {
    alt: "QCI elevated gallery upload",
    createdAt: new Date().toISOString(),
    name: fileName,
    path,
    src: data.signedUrl,
  } satisfies ElevatedGalleryImage;
}
