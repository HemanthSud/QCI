import type { Metadata } from "next";

import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { aboutPillars, historyTimeline, teamStructure } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the history, values, and structure behind Queen City Ishaare's Bollywood team at UNCC.",
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
        description="The version of QCI we can trace publicly is a team built through competitions, campus culture, fundraising, and a lot of student leadership behind the scenes."
        eyebrow="About Queen City Ishaare"
        title="A UNCC team with a growing competitive footprint and a very clear point of view."
      />

      <section className="py-8 sm:py-12" id="history">
        <Container className="space-y-10">
          <SectionHeading
            description="Rather than inventing a history that isn't documented, this timeline uses the milestones we could actually verify and turns them into a clean narrative backbone for the site."
            eyebrow="History"
            title="The public record shows momentum, range, and a team that keeps scaling."
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

      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            description="This is where the site shifts from public milestones into brand language: what the team feels like, what it values, and why the performances land the way they do."
            eyebrow="What defines QCI"
            title="High-energy on stage. High-accountability behind it."
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

      <section className="py-16 sm:py-20">
        <Container>
          <div className="glass-panel px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionHeading
                description="QCI isn't just a roster. It's a mini production house every season, and this section gives that structure a place on the site."
                eyebrow="How the team runs"
                title="The creative and operational roles that keep the season sharp."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {teamStructure.map((role) => (
                  <article key={role.title} className="section-card p-5">
                    <h3 className="font-display text-2xl leading-none tracking-[-0.04em] text-[var(--color-night)]">
                      {role.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                      {role.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
