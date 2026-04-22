"use client";

import {
  type SiteEditorContent,
  editableThemeTokens,
  normalizeSiteEditorContent,
  siteEditorPreviewEvent,
  siteEditorPreviewStorageKey,
} from "@/lib/site-editor";

type SiteConfigResponse = {
  content?: SiteEditorContent;
};

export function readSiteEditorPreview() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(siteEditorPreviewStorageKey);

  if (!raw) {
    return null;
  }

  try {
    return normalizeSiteEditorContent(JSON.parse(raw));
  } catch {
    window.localStorage.removeItem(siteEditorPreviewStorageKey);
    return null;
  }
}

export function writeSiteEditorPreview(content: SiteEditorContent) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(siteEditorPreviewStorageKey, JSON.stringify(content));
  window.dispatchEvent(new Event(siteEditorPreviewEvent));
}

export function clearSiteEditorPreview() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(siteEditorPreviewStorageKey);
  window.dispatchEvent(new Event(siteEditorPreviewEvent));
}

export async function fetchPublishedSiteEditorContent() {
  const response = await fetch("/api/site-config", {
    cache: "no-store",
  });
  const result = (await response.json().catch(() => null)) as SiteConfigResponse | null;

  if (!response.ok || !result?.content) {
    return null;
  }

  return normalizeSiteEditorContent(result.content);
}

export function applySiteTheme(content: SiteEditorContent | null) {
  if (!content || typeof document === "undefined") {
    return;
  }

  const mode = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  const values = content.theme[mode];

  for (const token of editableThemeTokens) {
    const value = values[token.key];

    if (value) {
      document.documentElement.style.setProperty(token.key, value);
    }
  }
}

export function subscribeToSiteEditorChanges(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === siteEditorPreviewStorageKey || event.key === "qci-theme") {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener("qci-theme-change", callback);
  window.addEventListener(siteEditorPreviewEvent, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("qci-theme-change", callback);
    window.removeEventListener(siteEditorPreviewEvent, callback);
  };
}
