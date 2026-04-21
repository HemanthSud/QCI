import type { Metadata } from "next";

import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { calendarBuckets, siteMeta } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Check upcoming Queen City Ishaare dates.",
};

export default function CalendarPage() {
  return (
    <>
      <PageHero
        actions={
          <>
            <ButtonLink href={`mailto:${siteMeta.email}?subject=QCI%20Booking%20Inquiry`}>
              Ask about a booking
            </ButtonLink>
            <ButtonLink href={siteMeta.instagram} variant="secondary">
              Check Instagram updates
            </ButtonLink>
          </>
        }
        eyebrow="Calendar"
        title="No upcoming events yet."
      />

      <section className="py-8 sm:py-12">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Upcoming"
            title="Calendar is clear right now."
          />

          <div className="section-card p-8 text-center sm:p-10">
            <p className="font-display text-4xl leading-none text-[var(--color-night)]">
              Dates will be posted once they are confirmed.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
              For bookings or updates, use email or Instagram.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Event types"
            title="What may show up here."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {calendarBuckets.map((bucket) => (
              <article key={bucket.title} className="section-card p-6">
                <h2 className="font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)]">
                  {bucket.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {bucket.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
