"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

import type { EditableGallerySection, SiteEditorContent } from "@/lib/site-editor";
import {
  fetchPublishedSiteEditorContent,
  readSiteEditorPreview,
  subscribeToSiteEditorChanges,
} from "@/lib/site-editor-client";
import { SectionHeading } from "@/components/ui";

type EditableGallerySectionsProps = {
  fallbackSections: EditableGallerySection[];
};

export function EditableGallerySections({ fallbackSections }: EditableGallerySectionsProps) {
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

  const sections =
    content?.gallerySections?.filter((section) => section.images.length > 0) ?? fallbackSections;

  return (
    <div className="space-y-14">
      {sections.map((section, index) => (
        <div className="space-y-8" key={section.id}>
          <SectionHeading eyebrow={section.eyebrow || "Photos"} title={section.title} />
          <div className="media-marquee" data-direction={index % 2 === 1 ? "reverse" : "forward"}>
            <div className="media-marquee-track">
              {[...section.images, ...section.images].map((image, imageIndex) => (
                <figure className="media-marquee-card" key={`${image.id}-${imageIndex}`}>
                  <img
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    src={image.src}
                    style={{ objectPosition: image.position || undefined }}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
