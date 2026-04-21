import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { galleryCards, siteMeta, videoTimelineEntries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore Queen City Ishaare's reverse-chronological video timeline plus a visual gallery of stills and poster-style identity moments.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        actions={
          <>
            <ButtonLink href={siteMeta.instagram}>See Instagram</ButtonLink>
            <ButtonLink href={`mailto:${siteMeta.email}?subject=QCI%20Media%20Request`} variant="secondary">
              Request media
            </ButtonLink>
          </>
        }
        description="The current gallery uses one strong team image and turns it into a more expansive visual system with varied crops, poster cards, and typography-driven layout. When more assets arrive, the structure is already ready."
        eyebrow="Gallery"
        title="A performance archive with the newest season first and the earliest years at the bottom."
      />

      <section className="py-8 sm:py-12">
        <Container className="space-y-10">
          <SectionHeading
            description="Every video you added is now arranged like a proper timeline: 2026 at the top, then back through 2025, 2022, 2020, 2019, 2018, 2017, and 2016 at the bottom."
            eyebrow="Video timeline"
            title="Newest at the top. Earliest at the bottom."
          />

          <div className="relative pl-4 sm:pl-6">
            <div className="absolute bottom-0 left-[0.4rem] top-0 w-px bg-[linear-gradient(180deg,rgba(255,111,96,0.9),rgba(255,111,96,0.05))] sm:left-[0.6rem]" />

            <div className="space-y-8 sm:space-y-10">
              {videoTimelineEntries.map((entry, index) => (
                <article
                  key={entry.year}
                  className="fade-rise relative pl-8 sm:pl-12"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="absolute left-0 top-7 h-4 w-4 rounded-full border border-[var(--color-rose)] bg-[var(--color-flame)] shadow-[0_0_0_6px_rgba(255,59,48,0.14)]" />

                  <div className="grid gap-5 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
                    <div className="section-card p-5 sm:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-rose)]">
                        {entry.subtitle}
                      </p>
                      <h2 className="mt-3 font-display text-5xl leading-none tracking-[-0.06em] text-[var(--color-night)] sm:text-6xl">
                        {entry.year}
                      </h2>
                      <h3 className="mt-4 font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)]">
                        {entry.title}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                        {entry.description}
                      </p>
                    </div>

                    <div className="section-card overflow-hidden p-2 sm:p-3">
                      <div className="overflow-hidden border border-white/8 bg-black">
                        <video
                          className="aspect-video w-full bg-black object-contain"
                          controls
                          playsInline
                          preload="metadata"
                        >
                          <source src={entry.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            description="Under the timeline, the rest of the gallery still works like an editorial moodboard so the archive has both motion and branded still-image energy."
            eyebrow="Poster wall"
            title="Frames, posters, and image crops that still feel like a campaign."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {galleryCards.map((card) =>
              card.variant === "poster" ? (
                <article
                  key={card.title}
                  className={`overflow-hidden rounded-[1.75rem] p-6 sm:p-8 ${
                    card.size === "large" ? "min-h-[22rem]" : "min-h-[18rem]"
                  } ${
                    card.accent === "night"
                      ? "poster-night"
                      : card.accent === "jade"
                        ? "poster-jade"
                        : "poster-sunset"
                  }`}
                >
                  <div className="flex h-full flex-col justify-between">
                    <p className="poster-text text-xs font-semibold uppercase tracking-[0.28em]">
                      Poster frame
                    </p>
                    <div className="space-y-3">
                      <h2 className="poster-text font-display text-4xl leading-none tracking-[-0.05em] sm:text-5xl">
                        {card.title}
                      </h2>
                      <p className="poster-text max-w-sm text-sm leading-7 text-white/80">
                        {card.caption}
                      </p>
                    </div>
                  </div>
                </article>
              ) : (
                <article
                  key={card.title}
                  className={`group relative overflow-hidden rounded-[1.75rem] ${
                    card.size === "large" ? "min-h-[28rem]" : "min-h-[20rem]"
                  }`}
                >
                  <Image
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    height={3926}
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 50vw, 100vw"
                    src={siteMeta.homeImage}
                    style={{ objectPosition: card.position }}
                    width={5889}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,3,5,0.04),rgba(15,3,5,0.82))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                      Photo frame
                    </p>
                    <h2 className="mt-3 font-display text-3xl leading-none tracking-[-0.04em] sm:text-4xl">
                      {card.title}
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-7 text-white/80">
                      {card.caption}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
