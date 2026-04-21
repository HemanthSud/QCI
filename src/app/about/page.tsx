import type { Metadata } from "next";

import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { aboutPillars, historyTimeline, videoTimelineEntries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Queen City Ishaare, UNCC's Bollywood fusion dance team.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        actions={
          <>
            <ButtonLink href="/gallery">See the work</ButtonLink>
            <ButtonLink href="/support" variant="secondary">
              Support the season
            </ButtonLink>
          </>
        }
        description="Student-run. Competition-focused. Charlotte-based."
        eyebrow="About"
        title="Queen City Ishaare."
      />

      <section className="py-8 sm:py-12" id="history">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="History"
            title="Key years."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {historyTimeline.map((item) => (
              <article key={item.year} className="section-card p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ember)]">
                  {item.year}
                </p>
                <h2 className="mt-4 font-display text-4xl leading-none tracking-[-0.05em] text-[var(--color-night)]">
                  {item.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Old videos"
            title="Archive years."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {videoTimelineEntries
              .filter((entry) => entry.year !== "2026")
              .map((entry) => (
                <article key={entry.year} className="section-card overflow-hidden p-0">
                  <div className="aspect-video bg-black">
                    <iframe
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      src={entry.embedUrl}
                      title={`Queen City Ishaare ${entry.year} video`}
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-display text-6xl leading-none text-[var(--color-night)]">
                      {entry.year}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Team basics"
            title="What QCI does."
          />

          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {aboutPillars.map((pillar) => (
              <article key={pillar.title} className="section-card p-6">
                <h3 className="font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
