"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import type React from "react";

import { getSupabaseClient } from "@/lib/supabase-client";
import {
  type EditableGallerySection,
  type EditableImage,
  type EditableThemeMode,
  type SiteEditorContent,
  type SiteEditorVersion,
  editableThemeTokens,
  normalizeSiteEditorContent,
  siteEditorPreviewEvent,
} from "@/lib/site-editor";
import { createDefaultSiteEditorContent } from "@/lib/site-editor";
import { clearSiteEditorPreview, writeSiteEditorPreview } from "@/lib/site-editor-client";

type EditorStateResponse = {
  draft?: SiteEditorContent;
  error?: string;
  published?: SiteEditorContent;
  versions?: SiteEditorVersion[];
};

type EditorActionResponse = {
  draft?: SiteEditorContent;
  error?: string;
  image?: EditableImage;
  published?: SiteEditorContent;
  versions?: SiteEditorVersion[];
};

type EditorTab = "gallery" | "home" | "site" | "colors";

const defaultContent = createDefaultSiteEditorContent();

async function getAccessToken() {
  const supabase = getSupabaseClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.access_token) {
    throw new Error("Sign in again before editing the site.");
  }

  return session.access_token;
}

function makeEmptySection() {
  return {
    eyebrow: "Photos",
    id: `section-${crypto.randomUUID()}`,
    images: [],
    title: "New section",
  } satisfies EditableGallerySection;
}

function isHexColor(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value);
}

export function SiteEditorPanel() {
  const [activeSectionId, setActiveSectionId] = useState("");
  const [draft, setDraft] = useState<SiteEditorContent>(defaultContent);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const [tab, setTab] = useState<EditorTab>("gallery");
  const [versions, setVersions] = useState<SiteEditorVersion[]>([]);
  const [versionPath, setVersionPath] = useState("");

  const activeSection = useMemo(
    () =>
      draft.gallerySections.find((section) => section.id === activeSectionId) ??
      draft.gallerySections[0],
    [activeSectionId, draft.gallerySections],
  );

  const loadEditor = async () => {
    setError("");
    setLoading(true);

    try {
      const token = await getAccessToken();
      const response = await fetch("/api/site-editor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = (await response.json().catch(() => null)) as EditorStateResponse | null;

      if (!response.ok || !result?.draft) {
        throw new Error(result?.error ?? "Site editor could not be loaded.");
      }

      const nextDraft = normalizeSiteEditorContent(result.draft);

      setDraft(nextDraft);
      setVersions(result.versions ?? []);
      setActiveSectionId(nextDraft.gallerySections[0]?.id ?? "");
      setVersionPath(result.versions?.[0]?.path ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Site editor could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void Promise.resolve().then(() => loadEditor());
  }, []);

  const updateDraft = (updater: (content: SiteEditorContent) => SiteEditorContent) => {
    setDraft((current) =>
      normalizeSiteEditorContent({
        ...updater(structuredClone(current)),
        updatedAt: new Date().toISOString(),
      }),
    );
  };

  const runEditorAction = async (action: string, content?: SiteEditorContent, path?: string) => {
    setError("");
    setNotice("");

    const token = await getAccessToken();
    const response = await fetch("/api/site-editor", {
      body: JSON.stringify({ action, content, path }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });
    const result = (await response.json().catch(() => null)) as EditorActionResponse | null;

    if (!response.ok) {
      throw new Error(result?.error ?? "Site editor action failed.");
    }

    return result ?? {};
  };

  const saveDraft = async () => {
    try {
      const result = await runEditorAction("save-draft", draft);

      if (result.draft) {
        setDraft(normalizeSiteEditorContent(result.draft));
      }

      setNotice("Draft saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Draft could not be saved.");
    }
  };

  const publishDraft = async () => {
    try {
      const result = await runEditorAction("publish", draft);

      if (result.published) {
        const nextDraft = normalizeSiteEditorContent(result.published);

        setDraft(nextDraft);
        writeSiteEditorPreview(nextDraft);
        window.dispatchEvent(new Event(siteEditorPreviewEvent));
      }

      if (result.versions) {
        setVersions(result.versions);
        setVersionPath(result.versions[0]?.path ?? "");
      }

      setNotice("Published. The public site now uses this version.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Draft could not be published.");
    }
  };

  const revertToPublished = async () => {
    try {
      const result = await runEditorAction("revert-to-published");

      if (result.draft) {
        const nextDraft = normalizeSiteEditorContent(result.draft);

        setDraft(nextDraft);
        setActiveSectionId(nextDraft.gallerySections[0]?.id ?? "");
        setSelectedImageIds([]);
        writeSiteEditorPreview(nextDraft);
      }

      setNotice("Draft reverted to the current published site.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Draft could not be reverted.");
    }
  };

  const restoreVersion = async () => {
    if (!versionPath) {
      setError("Choose a version to restore.");
      return;
    }

    try {
      const result = await runEditorAction("restore-version", undefined, versionPath);

      if (result.draft) {
        const nextDraft = normalizeSiteEditorContent(result.draft);

        setDraft(nextDraft);
        setActiveSectionId(nextDraft.gallerySections[0]?.id ?? "");
        setSelectedImageIds([]);
        writeSiteEditorPreview(nextDraft);
      }

      setNotice("Version restored into the draft. Publish when it looks right.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Version could not be restored.");
    }
  };

  const uploadImages = async (files: FileList | null, target: "gallery" | "home") => {
    if (!files || files.length === 0) {
      return;
    }

    setError("");
    setNotice("");

    try {
      const token = await getAccessToken();
      const uploadedImages: EditableImage[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();

        formData.append("image", file);

        const response = await fetch("/api/site-editor", {
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
        });
        const result = (await response.json().catch(() => null)) as EditorActionResponse | null;

        if (!response.ok || !result?.image) {
          throw new Error(result?.error ?? "Image could not be uploaded.");
        }

        uploadedImages.push(result.image);
      }

      updateDraft((content) => {
        if (target === "home") {
          return {
            ...content,
            homePhotoStrip: [...content.homePhotoStrip, ...uploadedImages],
          };
        }

        const nextSectionId = activeSection?.id ?? content.gallerySections[0]?.id;

        return {
          ...content,
          gallerySections: content.gallerySections.map((section) =>
            section.id === nextSectionId
              ? { ...section, images: [...section.images, ...uploadedImages] }
              : section,
          ),
        };
      });

      setNotice(`${uploadedImages.length} image${uploadedImages.length === 1 ? "" : "s"} added.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Images could not be uploaded.");
    }
  };

  const replaceImageSlot = async (slotId: string, file: File | null | undefined) => {
    if (!file) {
      return;
    }

    setError("");
    setNotice("");

    try {
      const token = await getAccessToken();
      const formData = new FormData();

      formData.append("image", file);

      const response = await fetch("/api/site-editor", {
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
      });
      const result = (await response.json().catch(() => null)) as EditorActionResponse | null;

      if (!response.ok || !result?.image) {
        throw new Error(result?.error ?? "Image could not be uploaded.");
      }

      updateDraft((content) => ({
        ...content,
        imageSlots: content.imageSlots.map((slot) =>
          slot.id === slotId
            ? {
                ...slot,
                image: {
                  ...result.image!,
                  alt: slot.image.alt,
                  caption: slot.image.caption,
                },
              }
            : slot,
        ),
      }));
      setNotice("Site image updated in the draft.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Site image could not be uploaded.");
    }
  };

  const toggleImageSelection = (id: string) => {
    setSelectedImageIds((current) =>
      current.includes(id) ? current.filter((imageId) => imageId !== id) : [...current, id],
    );
  };

  const removeSelectedImages = () => {
    if (selectedImageIds.length === 0) {
      return;
    }

    updateDraft((content) => {
      if (tab === "home") {
        return {
          ...content,
          homePhotoStrip: content.homePhotoStrip.filter(
            (image) => !selectedImageIds.includes(image.id),
          ),
        };
      }

      return {
        ...content,
        gallerySections: content.gallerySections.map((section) =>
          section.id === activeSection?.id
            ? {
                ...section,
                images: section.images.filter((image) => !selectedImageIds.includes(image.id)),
              }
            : section,
        ),
      };
    });
    setSelectedImageIds([]);
    setNotice("Selected images removed from the draft.");
  };

  const previewDraft = () => {
    writeSiteEditorPreview(draft);
    setNotice("Preview enabled in this browser.");
    window.open("/gallery?preview=site-editor", "_blank", "noopener,noreferrer");
  };

  const clearPreview = () => {
    clearSiteEditorPreview();
    setNotice("Preview cleared.");
  };

  if (loading) {
    return (
      <article className="section-card p-6 sm:p-8">
        <p className="font-accent text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-gold)]">
          Loading site editor
        </p>
      </article>
    );
  }

  return (
    <article className="section-card p-6 sm:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-2xl">
          <p className="font-accent text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-rose)]">
            Site editor
          </p>
          <h3 className="mt-4 font-display text-4xl leading-none text-[var(--color-night)]">
            Images, sections, preview, publish.
          </h3>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            Edit the draft, preview it in this browser, publish when it looks right, or restore a
            previous version.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <EditorButton onClick={saveDraft}>Save draft</EditorButton>
          <EditorButton onClick={previewDraft}>Preview</EditorButton>
          <EditorButton onClick={publishDraft} tone="primary">
            Publish
          </EditorButton>
          <EditorButton onClick={revertToPublished}>Revert</EditorButton>
          <EditorButton onClick={clearPreview}>Clear preview</EditorButton>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <TabButton active={tab === "gallery"} onClick={() => setTab("gallery")}>
          Gallery sections
        </TabButton>
        <TabButton active={tab === "home"} onClick={() => setTab("home")}>
          Home images
        </TabButton>
        <TabButton active={tab === "site"} onClick={() => setTab("site")}>
          Site images
        </TabButton>
        <TabButton active={tab === "colors"} onClick={() => setTab("colors")}>
          Colors
        </TabButton>
      </div>

      {notice ? (
        <p className="mt-5 text-sm font-semibold text-[var(--color-gold)]">{notice}</p>
      ) : null}
      {error ? <p className="mt-5 text-sm font-semibold text-[var(--color-rose)]">{error}</p> : null}

      {tab === "gallery" ? (
        <GallerySectionEditor
          activeSection={activeSection}
          activeSectionId={activeSection?.id ?? ""}
          draft={draft}
          onAddImages={(files) => uploadImages(files, "gallery")}
          onAddSection={() => {
            const section = makeEmptySection();

            updateDraft((content) => ({
              ...content,
              gallerySections: [...content.gallerySections, section],
            }));
            setActiveSectionId(section.id);
            setSelectedImageIds([]);
          }}
          onChangeActiveSection={(sectionId) => {
            setActiveSectionId(sectionId);
            setSelectedImageIds([]);
          }}
          onRemoveSection={() => {
            if (!activeSection || draft.gallerySections.length <= 1) {
              return;
            }

            updateDraft((content) => ({
              ...content,
              gallerySections: content.gallerySections.filter(
                (section) => section.id !== activeSection.id,
              ),
            }));
            setActiveSectionId(draft.gallerySections.find((section) => section.id !== activeSection.id)?.id ?? "");
            setSelectedImageIds([]);
          }}
          onRemoveSelected={removeSelectedImages}
          onSelectImage={toggleImageSelection}
          onUpdateSection={(updates) => {
            if (!activeSection) {
              return;
            }

            updateDraft((content) => ({
              ...content,
              gallerySections: content.gallerySections.map((section) =>
                section.id === activeSection.id ? { ...section, ...updates } : section,
              ),
            }));
          }}
          selectedImageIds={selectedImageIds}
        />
      ) : null}

      {tab === "home" ? (
        <HomeImageEditor
          images={draft.homePhotoStrip}
          onAddImages={(files) => uploadImages(files, "home")}
          onRemoveSelected={removeSelectedImages}
          onSelectImage={toggleImageSelection}
          onUpdateImage={(imageId, updates) => {
            updateDraft((content) => ({
              ...content,
              homePhotoStrip: content.homePhotoStrip.map((image) =>
                image.id === imageId ? { ...image, ...updates } : image,
              ),
            }));
          }}
          selectedImageIds={selectedImageIds}
        />
      ) : null}

      {tab === "colors" ? (
        <ColorEditor
          draft={draft}
          onUpdateColor={(mode, key, value) => {
            updateDraft((content) => ({
              ...content,
              theme: {
                ...content.theme,
                [mode]: {
                  ...content.theme[mode],
                  [key]: value,
                },
              },
            }));
          }}
        />
      ) : null}

      {tab === "site" ? (
        <SiteImageSlotEditor
          onReplaceImage={replaceImageSlot}
          onUpdateImage={(slotId, updates) => {
            updateDraft((content) => ({
              ...content,
              imageSlots: content.imageSlots.map((slot) =>
                slot.id === slotId ? { ...slot, image: { ...slot.image, ...updates } } : slot,
              ),
            }));
          }}
          slots={draft.imageSlots}
        />
      ) : null}

      <div className="mt-8 border-t border-white/10 pt-6">
        <p className="font-accent text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-rose)]">
          Version control
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <select
            className="w-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[var(--color-muted-strong)]"
            onChange={(event) => setVersionPath(event.target.value)}
            value={versionPath}
          >
            {versions.length === 0 ? <option value="">No published versions yet</option> : null}
            {versions.map((version) => (
              <option key={version.path} value={version.path}>
                {new Intl.DateTimeFormat("en", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(version.createdAt))}
              </option>
            ))}
          </select>
          <EditorButton onClick={restoreVersion}>Restore version</EditorButton>
        </div>
      </div>
    </article>
  );
}

type SiteImageSlotEditorProps = {
  onReplaceImage: (slotId: string, file: File | null | undefined) => void;
  onUpdateImage: (slotId: string, updates: Partial<EditableImage>) => void;
  slots: SiteEditorContent["imageSlots"];
};

function SiteImageSlotEditor({ onReplaceImage, onUpdateImage, slots }: SiteImageSlotEditorProps) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {slots.map((slot) => (
        <div className="border border-[var(--color-border)] bg-black/20 p-4" key={slot.id}>
          <p className="font-accent text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-gold)]">
            {slot.label}
          </p>
          <div className="mt-4 overflow-hidden border border-white/10 bg-black">
            <img alt={slot.image.alt} className="aspect-[4/3] w-full object-cover" src={slot.image.src} />
          </div>
          <div className="mt-4 grid gap-3">
            <input
              className="border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-sm text-[var(--color-cream)]"
              onChange={(event) => onUpdateImage(slot.id, { alt: event.target.value })}
              placeholder="Alt text"
              value={slot.image.alt}
            />
            <label className="inline-flex cursor-pointer items-center justify-center bg-[var(--color-red)] px-5 py-3 font-accent text-[0.82rem] uppercase tracking-[0.16em] text-[var(--color-on-red)] [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)]">
              Replace image
              <input
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(event) => {
                  onReplaceImage(slot.id, event.currentTarget.files?.[0]);
                  event.currentTarget.value = "";
                }}
                type="file"
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

type EditorButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  tone?: "default" | "primary";
};

function EditorButton({ children, onClick, tone = "default" }: EditorButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-3 font-accent text-[0.82rem] uppercase tracking-[0.16em] transition hover:-translate-y-0.5 ${
        tone === "primary"
          ? "bg-[var(--color-red)] text-[var(--color-on-red)] [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)]"
          : "border border-[var(--color-border)] text-[var(--color-gold)] hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-dim)]"
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

type TabButtonProps = {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

function TabButton({ active, children, onClick }: TabButtonProps) {
  return (
    <button
      className={`border px-4 py-2 font-accent text-[0.82rem] uppercase tracking-[0.16em] transition ${
        active
          ? "border-[var(--color-red)] bg-[var(--color-red)] text-[var(--color-on-red)]"
          : "border-[var(--color-border)] text-[var(--color-gold)] hover:border-[var(--color-gold)]"
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

type GallerySectionEditorProps = {
  activeSection?: EditableGallerySection;
  activeSectionId: string;
  draft: SiteEditorContent;
  onAddImages: (files: FileList | null) => void;
  onAddSection: () => void;
  onChangeActiveSection: (sectionId: string) => void;
  onRemoveSection: () => void;
  onRemoveSelected: () => void;
  onSelectImage: (imageId: string) => void;
  onUpdateSection: (updates: Partial<EditableGallerySection>) => void;
  selectedImageIds: string[];
};

function GallerySectionEditor({
  activeSection,
  activeSectionId,
  draft,
  onAddImages,
  onAddSection,
  onChangeActiveSection,
  onRemoveSection,
  onRemoveSelected,
  onSelectImage,
  onUpdateSection,
  selectedImageIds,
}: GallerySectionEditorProps) {
  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[18rem_1fr]">
      <aside className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="font-accent text-[0.78rem] uppercase tracking-[0.22em] text-[var(--color-gold)]">
            Sections
          </p>
          <button className="text-sm font-semibold text-[var(--color-gold)]" onClick={onAddSection} type="button">
            Add
          </button>
        </div>
        {draft.gallerySections.map((section) => (
          <button
            className={`block w-full border px-4 py-3 text-left text-sm transition ${
              section.id === activeSectionId
                ? "border-[var(--color-red)] bg-[rgba(200,16,46,0.14)] text-[var(--color-cream)]"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-gold)]"
            }`}
            key={section.id}
            onClick={() => onChangeActiveSection(section.id)}
            type="button"
          >
            <span className="block font-semibold">{section.title}</span>
            <span className="mt-1 block text-xs text-[var(--color-muted)]">
              {section.images.length} image{section.images.length === 1 ? "" : "s"}
            </span>
          </button>
        ))}
      </aside>

      <div>
        {activeSection ? (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-[var(--color-muted)]">
                Section title
                <input
                  className="border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--color-cream)]"
                  onChange={(event) => onUpdateSection({ title: event.target.value })}
                  value={activeSection.title}
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--color-muted)]">
                Eyebrow
                <input
                  className="border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--color-cream)]"
                  onChange={(event) => onUpdateSection({ eyebrow: event.target.value })}
                  value={activeSection.eyebrow}
                />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <label className="inline-flex cursor-pointer items-center justify-center bg-[var(--color-red)] px-5 py-3 font-accent text-[0.82rem] uppercase tracking-[0.16em] text-[var(--color-on-red)] [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)]">
                Add images
                <input
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  multiple
                  onChange={(event) => {
                    onAddImages(event.currentTarget.files);
                    event.currentTarget.value = "";
                  }}
                  type="file"
                />
              </label>
              <EditorButton onClick={onRemoveSelected}>Remove selected</EditorButton>
              <EditorButton onClick={onRemoveSection}>Remove section</EditorButton>
            </div>

            <SelectableImageGrid
              images={activeSection.images}
              onSelectImage={onSelectImage}
              selectedImageIds={selectedImageIds}
            />
          </>
        ) : (
          <p className="text-sm text-[var(--color-muted)]">Add a section to start editing.</p>
        )}
      </div>
    </div>
  );
}

type HomeImageEditorProps = {
  images: EditableImage[];
  onAddImages: (files: FileList | null) => void;
  onRemoveSelected: () => void;
  onSelectImage: (imageId: string) => void;
  onUpdateImage: (imageId: string, updates: Partial<EditableImage>) => void;
  selectedImageIds: string[];
};

function HomeImageEditor({
  images,
  onAddImages,
  onRemoveSelected,
  onSelectImage,
  onUpdateImage,
  selectedImageIds,
}: HomeImageEditorProps) {
  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-3">
        <label className="inline-flex cursor-pointer items-center justify-center bg-[var(--color-red)] px-5 py-3 font-accent text-[0.82rem] uppercase tracking-[0.16em] text-[var(--color-on-red)] [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)]">
          Add home images
          <input
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            multiple
            onChange={(event) => {
              onAddImages(event.currentTarget.files);
              event.currentTarget.value = "";
            }}
            type="file"
          />
        </label>
        <EditorButton onClick={onRemoveSelected}>Remove selected</EditorButton>
      </div>

      <SelectableImageGrid
        images={images}
        onSelectImage={onSelectImage}
        renderFields={(image) => (
          <div className="mt-3 grid gap-2">
            <input
              className="border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-xs text-[var(--color-cream)]"
              onChange={(event) => onUpdateImage(image.id, { caption: event.target.value })}
              placeholder="Caption"
              value={image.caption ?? ""}
            />
            <input
              className="border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-xs text-[var(--color-cream)]"
              onChange={(event) => onUpdateImage(image.id, { position: event.target.value })}
              placeholder="Object position, e.g. 50% 30%"
              value={image.position ?? ""}
            />
          </div>
        )}
        selectedImageIds={selectedImageIds}
      />
    </div>
  );
}

type SelectableImageGridProps = {
  images: EditableImage[];
  onSelectImage: (imageId: string) => void;
  renderFields?: (image: EditableImage) => React.ReactNode;
  selectedImageIds: string[];
};

function SelectableImageGrid({
  images,
  onSelectImage,
  renderFields,
  selectedImageIds,
}: SelectableImageGridProps) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {images.map((image) => {
        const selected = selectedImageIds.includes(image.id);

        return (
          <div className="border border-[var(--color-border)] bg-black/20 p-2" key={image.id}>
            <button
              className={`relative block aspect-[4/3] w-full overflow-hidden border transition ${
                selected
                  ? "border-[var(--color-gold)] ring-2 ring-[var(--color-gold)]"
                  : "border-white/10 hover:border-[var(--color-gold)]"
              }`}
              onClick={() => onSelectImage(image.id)}
              type="button"
            >
              <img alt={image.alt} className="h-full w-full object-cover" src={image.src} />
              {selected ? (
                <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-red)] text-sm font-bold text-[var(--color-on-red)]">
                  ✓
                </span>
              ) : null}
            </button>
            <p className="mt-2 truncate text-xs text-[var(--color-muted)]">{image.alt}</p>
            {renderFields?.(image)}
          </div>
        );
      })}
    </div>
  );
}

type ColorEditorProps = {
  draft: SiteEditorContent;
  onUpdateColor: (mode: EditableThemeMode, key: string, value: string) => void;
};

function ColorEditor({ draft, onUpdateColor }: ColorEditorProps) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      {(["dark", "light"] as const).map((mode) => (
        <div className="border border-[var(--color-border)] p-4" key={mode}>
          <p className="font-accent text-[0.78rem] uppercase tracking-[0.24em] text-[var(--color-gold)]">
            {mode} palette
          </p>
          <div className="mt-4 grid gap-3">
            {editableThemeTokens.map((token) => {
              const value = draft.theme[mode][token.key] ?? "";

              return (
                <label
                  className="grid gap-2 text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]"
                  key={`${mode}-${token.key}`}
                >
                  {token.label}
                  <span className="grid grid-cols-[3rem_1fr] gap-2">
                    <input
                      aria-label={`${mode} ${token.label} color`}
                      className="h-11 w-full border border-[var(--color-border)] bg-transparent"
                      onChange={(event) => onUpdateColor(mode, token.key, event.target.value)}
                      type="color"
                      value={isHexColor(value) ? value : "#000000"}
                    />
                    <input
                      className="border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-sm normal-case tracking-normal text-[var(--color-cream)]"
                      onChange={(event) => onUpdateColor(mode, token.key, event.target.value)}
                      value={value}
                    />
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
