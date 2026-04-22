import { NextResponse } from "next/server";

import { getElevatedUserFromRequest } from "@/lib/server/elevated-gallery";
import {
  getSiteEditorState,
  publishSiteEditorContent,
  resetDraftToPublished,
  restoreSiteEditorVersion,
  saveSiteEditorDraft,
  uploadSiteEditorImage,
} from "@/lib/server/site-editor-store";

export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

async function requireElevatedAccess(request: Request) {
  const user = await getElevatedUserFromRequest(request);

  if (!user) {
    return NextResponse.json(
      { error: "Elevated access is required for the site editor." },
      { headers: noStoreHeaders, status: 403 },
    );
  }

  return null;
}

export async function GET(request: Request) {
  const accessError = await requireElevatedAccess(request);

  if (accessError) {
    return accessError;
  }

  try {
    const state = await getSiteEditorState();

    return NextResponse.json(state, { headers: noStoreHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Site editor could not be loaded." },
      { headers: noStoreHeaders, status: 503 },
    );
  }
}

export async function PATCH(request: Request) {
  const accessError = await requireElevatedAccess(request);

  if (accessError) {
    return accessError;
  }

  const body = await request.json().catch(() => null);
  const action = typeof body?.action === "string" ? body.action : "";

  try {
    if (action === "save-draft") {
      const draft = await saveSiteEditorDraft(body?.content);

      return NextResponse.json({ draft }, { headers: noStoreHeaders });
    }

    if (action === "publish") {
      const result = await publishSiteEditorContent(body?.content);

      return NextResponse.json(result, { headers: noStoreHeaders });
    }

    if (action === "revert-to-published") {
      const draft = await resetDraftToPublished();

      return NextResponse.json({ draft }, { headers: noStoreHeaders });
    }

    if (action === "restore-version") {
      const versionPath = typeof body?.path === "string" ? body.path : "";
      const draft = await restoreSiteEditorVersion(versionPath);

      return NextResponse.json({ draft }, { headers: noStoreHeaders });
    }

    return NextResponse.json(
      { error: "Choose a valid site editor action." },
      { headers: noStoreHeaders, status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Site editor action failed." },
      { headers: noStoreHeaders, status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const accessError = await requireElevatedAccess(request);

  if (accessError) {
    return accessError;
  }

  const formData = await request.formData().catch(() => null);
  const image = formData?.get("image");

  if (!(image instanceof File)) {
    return NextResponse.json(
      { error: "Choose an image before uploading." },
      { headers: noStoreHeaders, status: 400 },
    );
  }

  try {
    const uploadedImage = await uploadSiteEditorImage(image);

    return NextResponse.json({ image: uploadedImage }, { headers: noStoreHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image could not be uploaded." },
      { headers: noStoreHeaders, status: 500 },
    );
  }
}
