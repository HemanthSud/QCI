import { NextResponse } from "next/server";

import {
  getElevatedGalleryLimits,
  getElevatedUserFromRequest,
  listElevatedGalleryImages,
  uploadElevatedGalleryImage,
} from "@/lib/server/elevated-gallery";

export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

export async function GET() {
  try {
    const images = await listElevatedGalleryImages();

    return NextResponse.json({ images }, { headers: noStoreHeaders });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not configured")) {
      return NextResponse.json({ images: [] }, { headers: noStoreHeaders });
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Elevated gallery images could not be loaded.",
      },
      { headers: noStoreHeaders, status: 503 },
    );
  }
}

export async function POST(request: Request) {
  let user = null;

  try {
    user = await getElevatedUserFromRequest(request);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Supabase admin storage is not configured.",
      },
      { headers: noStoreHeaders, status: 503 },
    );
  }

  if (!user) {
    return NextResponse.json(
      { error: "Elevated access is required to upload gallery images." },
      { headers: noStoreHeaders, status: 403 },
    );
  }

  const formData = await request.formData().catch(() => null);
  const image = formData?.get("image");

  if (!(image instanceof File)) {
    return NextResponse.json(
      { error: "Choose an image before uploading." },
      { headers: noStoreHeaders, status: 400 },
    );
  }

  const { acceptedImageTypes, maxUploadBytes } = getElevatedGalleryLimits();

  if (!acceptedImageTypes.has(image.type)) {
    return NextResponse.json(
      { error: "Choose a JPG, PNG, WebP, or GIF image." },
      { headers: noStoreHeaders, status: 400 },
    );
  }

  if (image.size > maxUploadBytes) {
    return NextResponse.json(
      { error: "Choose an image under 8 MB." },
      { headers: noStoreHeaders, status: 400 },
    );
  }

  try {
    const uploadedImage = await uploadElevatedGalleryImage(image);

    return NextResponse.json({ image: uploadedImage }, { headers: noStoreHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image could not be uploaded." },
      { headers: noStoreHeaders, status: 500 },
    );
  }
}
