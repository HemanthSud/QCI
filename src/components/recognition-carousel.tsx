"use client";

import { useEffect, useState } from "react";

import { recognitionSlides } from "@/lib/site-data";

export function RecognitionCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % recognitionSlides.length);
    }, 5500);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeSlide = recognitionSlides[activeIndex];

  return (
    <div className="glass-panel relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,59,48,0.22),_transparent_72%)]" />
      <div className="relative space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-rose)]">
              Carousel
            </p>
            <h3 className="mt-3 font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)] sm:text-4xl">
              What public sources say about QCI
            </h3>
          </div>

          <div className="hidden gap-2 sm:flex">
            {recognitionSlides.map((slide, index) => (
              <button
                key={`${slide.source}-${slide.year}`}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-3 w-3 rounded-full transition ${
                  index === activeIndex
                    ? "bg-[var(--color-flame)] shadow-[0_0_0_5px_rgba(255,59,48,0.16)]"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>
        </div>

        <div className="min-h-[15rem] sm:min-h-[13rem]">
          <p className="max-w-3xl font-display text-4xl leading-[0.98] tracking-[-0.05em] text-[var(--color-night)] sm:text-5xl">
            “{activeSlide.quote}”
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
              {activeSlide.source}
            </span>
            <span className="text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">
              {activeSlide.year}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2 sm:hidden">
            {recognitionSlides.map((slide, index) => (
              <button
                key={`${slide.source}-${slide.year}-mobile`}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-3 w-3 rounded-full transition ${
                  index === activeIndex
                    ? "bg-[var(--color-flame)] shadow-[0_0_0_5px_rgba(255,59,48,0.16)]"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>

          <div className="ml-auto flex gap-2">
            <button
              className="rounded-full border border-white/12 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)] transition hover:border-[var(--color-flame)] hover:bg-[rgba(255,255,255,0.08)]"
              onClick={() =>
                setActiveIndex((activeIndex - 1 + recognitionSlides.length) % recognitionSlides.length)
              }
              type="button"
            >
              Prev
            </button>
            <button
              className="rounded-full border border-white/12 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)] transition hover:border-[var(--color-flame)] hover:bg-[rgba(255,255,255,0.08)]"
              onClick={() =>
                setActiveIndex((activeIndex + 1) % recognitionSlides.length)
              }
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
