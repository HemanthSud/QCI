"use client";

import { useEffect } from "react";

import {
  applySiteTheme,
  fetchPublishedSiteEditorContent,
  readSiteEditorPreview,
  subscribeToSiteEditorChanges,
} from "@/lib/site-editor-client";

export function SiteRuntimeConfig() {
  useEffect(() => {
    let isActive = true;
    let publishedContent: Awaited<ReturnType<typeof fetchPublishedSiteEditorContent>> = null;

    const applyCurrentContent = () => {
      const previewContent = readSiteEditorPreview();

      applySiteTheme(previewContent ?? publishedContent);
    };

    const loadConfig = async () => {
      publishedContent = await fetchPublishedSiteEditorContent();

      if (isActive) {
        applyCurrentContent();
      }
    };

    const unsubscribe = subscribeToSiteEditorChanges(applyCurrentContent);

    loadConfig();

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);

  return null;
}
