import { NextResponse } from "next/server";

import { getPublicSiteEditorContent } from "@/lib/server/site-editor-store";

export const runtime = "nodejs";

export async function GET() {
  try {
    const content = await getPublicSiteEditorContent();

    return NextResponse.json(
      { content },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Site config could not be loaded." },
      {
        headers: {
          "Cache-Control": "no-store",
        },
        status: 503,
      },
    );
  }
}
