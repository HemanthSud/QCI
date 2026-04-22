import type { Metadata } from "next";
import Image from "next/image";

import { ElevatedGalleryCarousel } from "@/components/elevated-gallery-carousel";
import { ImageMarquee } from "@/components/image-marquee";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { jalwaImages, nashaImages, siteMeta, videoTimelineEntries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore Queen City Ishaare's current season recap and photo gallery.",
};

const recapVideo = videoTimelineEntries.find((entry) => entry.year === "2026");

export default function GalleryPage() {
  return (
    <>
      <PageHero
        actions={<ButtonLink href={siteMeta.instagram}>See Instagram</ButtonLink>}
        eyebrow="Gallery"
        title="2026 recap and photos."
      />

      <section className="py-8 sm:py-12">
        <Container className="space-y-10">
          <SectionHeading eyebrow="Season recap" title="2026" />

          <article className="section-card overflow-hidden p-0">
            <div className="relative overflow-hidden bg-black">
              {recapVideo ? (
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="aspect-video w-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={recapVideo.embedUrl}
                  title="Queen City Ishaare 2026 recap"
                />
              ) : (
                <>
                  <Image
                    alt="Queen City Ishaare 2026 recap"
                    className="absolute inset-0 h-full w-full object-cover"
                    height={3926}
                    priority
                    sizes="(min-width: 1024px) 1100px, 100vw"
                    src={siteMeta.homeImage}
                    width={5889}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.82),rgba(8,8,8,0.16))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                    <p className="font-display text-8xl leading-none text-white sm:text-9xl">2026</p>
                  </div>
                </>
              )}
            </div>
          </article>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-14">
          <div className="space-y-8">
            <SectionHeading eyebrow="Photos" title="Jersey Jalwa" />
            <ImageMarquee images={jalwaImages} />
          </div>

          <div className="space-y-8">
            <SectionHeading eyebrow="Photos" title="NASHA Showcase" />
            <ImageMarquee images={nashaImages} reverse />
          </div>

          <div className="space-y-8">
            <SectionHeading eyebrow="Elevated uploads" title="Hemanth's carousel" />
            <ElevatedGalleryCarousel />
          </div>
        </Container>
      </section>
    </>
  );
}
