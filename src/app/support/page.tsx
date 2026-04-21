import type { Metadata } from "next";

import { GoFundMeEmbed } from "@/components/gofundme-embed";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { fundingUses, siteMeta, supportWays } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Support Us",
  description: "Support Queen City Ishaare through donations, bookings, and sponsorships.",
};

export default function SupportPage() {
  return (
    <>
      <PageHero
        actions={
          <>
            <ButtonLink href="#gofundme">GoFundMe below</ButtonLink>
            <ButtonLink href={`mailto:${siteMeta.email}`} variant="secondary">
              Email the team
            </ButtonLink>
          </>
        }
        description="Every donation helps with travel, fees, costumes, and production."
        eyebrow="Support QCI"
        title="Help fund the season."
      />

      <section className="bg-[var(--color-red-dark)] py-12 sm:py-16" id="gofundme">
        <Container>
          <GoFundMeEmbed />
        </Container>
      </section>

      <section className="py-8 sm:py-12">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Where support goes"
            title="What donations cover."
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
            eyebrow="Ways to help"
            title="Other ways to support."
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
    </>
  );
}
