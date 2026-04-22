"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

import type { EditableImage, SiteEditorContent } from "@/lib/site-editor";
import {
  fetchPublishedSiteEditorContent,
  readSiteEditorPreview,
  subscribeToSiteEditorChanges,
} from "@/lib/site-editor-client";

type EditableHomePhotoStripProps = {
  fallbackImages: EditableImage[];
};

export function EditableHomePhotoStrip({ fallbackImages }: EditableHomePhotoStripProps) {
  const [content, setContent] = useState<SiteEditorContent | null>(null);

  useEffect(() => {
    let isActive = true;
    let publishedContent: SiteEditorContent | null = null;

    const applyCurrentContent = () => {
      setContent(readSiteEditorPreview() ?? publishedContent);
    };

    const loadContent = async () => {
      publishedContent = await fetchPublishedSiteEditorContent();

      if (isActive) {
        applyCurrentContent();
      }
    };

    const unsubscribe = subscribeToSiteEditorChanges(applyCurrentContent);

    loadContent();

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);

  const images = content?.homePhotoStrip?.length ? content.homePhotoStrip : fallbackImages;

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 [transform:rotate(2deg)]">
      {images.slice(0, 4).map((frame, index) => (
        <article
          key={frame.id}
          className={`relative overflow-hidden bg-[#1a1010] p-3 shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition duration-300 hover:z-10 hover:scale-[1.03] hover:rotate-0 ${
            index === 0
              ? "rotate-[-3deg]"
              : index === 1
                ? "mt-6 rotate-[2deg]"
                : index === 2
                  ? "-mt-3 rotate-[1deg]"
                  : "mt-2 rotate-[-2deg]"
          }`}
        >
          <span className="absolute left-1/2 top-[-6px] h-[18px] w-10 -translate-x-1/2 rounded-sm bg-[rgba(212,175,55,0.25)]" />
          <div className="relative aspect-square overflow-hidden bg-[var(--color-red-dark)]">
            <img
              alt={frame.alt}
              className="h-full w-full object-cover"
              src={frame.src}
              style={{ objectPosition: frame.position || undefined }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(200,16,46,0.16),rgba(0,0,0,0.42))]" />
          </div>
        </article>
      ))}
    </div>
  );
}
