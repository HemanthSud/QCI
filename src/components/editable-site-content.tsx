"use client";

import { useEffect, useState } from "react";

import type { SiteEditorContent } from "@/lib/site-editor";
import {
  fetchPublishedSiteEditorContent,
  readSiteEditorPreview,
  subscribeToSiteEditorChanges,
} from "@/lib/site-editor-client";

let cachedPublishedContent: SiteEditorContent | null | undefined;
let pendingPublishedContent: Promise<SiteEditorContent | null> | null = null;

function loadPublishedContent() {
  if (cachedPublishedContent !== undefined) {
    return Promise.resolve(cachedPublishedContent);
  }

  if (!pendingPublishedContent) {
    pendingPublishedContent = fetchPublishedSiteEditorContent()
      .then((content) => {
        cachedPublishedContent = content;
        return content;
      })
      .finally(() => {
        pendingPublishedContent = null;
      });
  }

  return pendingPublishedContent;
}

export function useEditableSiteContent() {
  const [content, setContent] = useState<SiteEditorContent | null>(null);

  useEffect(() => {
    let isActive = true;

    const applyCurrentContent = () => {
      setContent(readSiteEditorPreview() ?? cachedPublishedContent ?? null);
    };

    const unsubscribe = subscribeToSiteEditorChanges(applyCurrentContent);

    applyCurrentContent();

    loadPublishedContent().then(() => {
      if (isActive) {
        applyCurrentContent();
      }
    });

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);

  return content;
}
