import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { galleryCards, siteMeta } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore the visual language for Queen City Ishaare across framed images, poster-style tiles, and a gallery layout ready for future team photos.",
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
        title="Still images with enough attitude to carry the season between performances."
      />

      <section className="py-8 sm:py-12">
        <Container className="space-y-10">
          <SectionHeading
            description="This gallery is intentionally designed more like an editorial spread than a generic photo dump. That keeps it premium now and scalable later."
            eyebrow="Season visuals"
            title="Frames, posters, and image crops that feel like a campaign."
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
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,21,27,0.05),rgba(25,21,27,0.76))]" />
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
