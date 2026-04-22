"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

type UploadedGalleryImage = {
  alt: string;
  createdAt: string | null;
  name: string;
  path: string;
  src: string;
};

type UploadedGalleryResponse = {
  error?: string;
  images?: UploadedGalleryImage[];
};

export function ElevatedGalleryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState("");
  const [images, setImages] = useState<UploadedGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadImages = async () => {
      try {
        const response = await fetch("/api/gallery/elevated", {
          cache: "no-store",
        });
        const result = (await response.json().catch(() => null)) as UploadedGalleryResponse | null;

        if (!isActive) {
          return;
        }

        if (!response.ok) {
          throw new Error(result?.error ?? "Uploads could not be loaded.");
        }

        setImages(result?.images ?? []);
        setActiveIndex(0);
        setError("");
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : "Uploads could not be loaded.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadImages();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (images.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  if (loading) {
    return (
      <div className="section-card flex min-h-[24rem] items-center justify-center p-8 text-center">
        <p className="font-accent text-[0.82rem] uppercase tracking-[0.24em] text-[var(--color-gold)]">
          Loading uploads
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-card p-8">
        <p className="text-sm leading-7 text-[var(--color-muted)]">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="section-card flex min-h-[22rem] items-center justify-center p-8 text-center">
        <p className="max-w-md text-sm leading-7 text-[var(--color-muted)]">
          Hemanth uploads will appear here soon.
        </p>
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div className="section-card overflow-hidden p-0">
      <div className="relative min-h-[24rem] bg-black sm:min-h-[34rem]">
        <img
          alt={activeImage.alt}
          className="absolute inset-0 h-full w-full object-cover"
          src={activeImage.src}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.02),rgba(8,8,8,0.62))]" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-8">
          <div>
            <p className="font-accent text-[0.75rem] uppercase tracking-[0.26em] text-[var(--color-gold)]">
              Upload {activeIndex + 1} / {images.length}
            </p>
            {activeImage.createdAt ? (
              <p className="mt-2 text-sm text-white/75">
                {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                  new Date(activeImage.createdAt),
                )}
              </p>
            ) : null}
          </div>

          {images.length > 1 ? (
            <div className="flex gap-2">
              <button
                aria-label="Previous upload"
                className="border border-white/25 bg-black/45 px-4 py-2 font-accent text-xs uppercase tracking-[0.18em] text-white transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                onClick={() =>
                  setActiveIndex((activeIndex - 1 + images.length) % images.length)
                }
                type="button"
              >
                Prev
              </button>
              <button
                aria-label="Next upload"
                className="border border-white/25 bg-black/45 px-4 py-2 font-accent text-xs uppercase tracking-[0.18em] text-white transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                type="button"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 bg-black p-2 sm:grid-cols-6">
          {images.slice(0, 12).map((image, index) => (
            <button
              aria-label={`Show upload ${index + 1}`}
              className={`relative aspect-[4/3] overflow-hidden border transition ${
                index === activeIndex
                  ? "border-[var(--color-gold)]"
                  : "border-white/10 opacity-70 hover:opacity-100"
              }`}
              key={image.path}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <img alt="" className="h-full w-full object-cover" src={image.src} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
