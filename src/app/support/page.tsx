import type { Metadata } from "next";

import { GoFundMeEmbed } from "@/components/gofundme-embed";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { fundingUses, siteMeta, supportWays } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Support Us",
  description:
    "Support Queen City Ishaare through donations, bookings, and sponsorships that help fund travel, costumes, competition fees, and production.",
};

export default function SupportPage() {
  return (
    <>
      <PageHero
        actions={
          <>
            <ButtonLink href={siteMeta.donateUrl}>Donate to the season fund</ButtonLink>
            <ButtonLink href={`mailto:${siteMeta.email}`} variant="secondary">
              Email the team
            </ButtonLink>
          </>
        }
        description="Public QCI fundraising campaigns make the core need pretty clear: a competitive, student-run team needs real support to travel, register, costume, and produce its work at a national level."
        eyebrow="Support Queen City Ishaare"
        title="Help the team train harder, travel farther, and put bigger work on stage."
      />

      <section className="bg-[var(--color-red-dark)] py-12 sm:py-16">
        <Container>
          <GoFundMeEmbed />
        </Container>
      </section>

      <section className="py-8 sm:py-12">
        <Container className="space-y-10">
          <SectionHeading
            description="These support buckets come straight from public QCI fundraiser language, which makes them a strong and honest foundation for the site's donor messaging."
            eyebrow="Where support goes"
            title="Every contribution makes the season more possible."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {fundingUses.map((item) => (
              <article key={item.title} className="section-card p-6">
                <h2 className="font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)]">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
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
            description="The page isn't boxed into donations only. It gives the team room to sell appearances, sponsor packages, and direct partnerships too."
            eyebrow="Ways to help"
            title="Support can look like money, bookings, visibility, or a season-long partnership."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {supportWays.map((item) => (
              <article key={item.title} className="section-card flex flex-col p-6">
                <h2 className="font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)]">
                  {item.title}
                </h2>
                <p className="mt-4 flex-1 text-base leading-8 text-[var(--color-muted)]">
                  {item.description}
                </p>
                <div className="mt-6">
                  <ButtonLink href={item.href} variant="secondary">
                    {item.label}
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="glass-panel px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border border-white/12 bg-[rgba(114,10,14,0.6)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-rose)]">
                  Season message
                </span>
                <h2 className="font-display text-4xl leading-none tracking-[-0.04em] text-[var(--color-night)] sm:text-5xl">
                  Built by students. Powered by community.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
                  If you want this site to convert, the ask has to feel human. The language here
                  centers what supporters are actually enabling: reps, travel, stagecraft, and a
                  student team getting the chance to represent UNC Charlotte at a higher level.
                </p>
              </div>

              <div className="section-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ember)]">
                  Quick links
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <ButtonLink href={siteMeta.donateUrl}>Donate now</ButtonLink>
                  <ButtonLink href={siteMeta.donateUrl} variant="secondary">
                    Open GoFundMe campaign
                  </ButtonLink>
                  <ButtonLink href={`mailto:${siteMeta.email}`} variant="ghost">
                    Ask about sponsorships
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
