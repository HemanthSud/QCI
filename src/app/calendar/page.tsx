import type { Metadata } from "next";

import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { calendarArchive, calendarBuckets, siteMeta } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "Browse the season archive and the kinds of events that shape Queen City Ishaare's year on campus and on the competition circuit.",
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
        description="Without an official public calendar feed to pull from, this page uses a clean season archive plus event categories the team can keep updating as new dates lock in."
        eyebrow="Calendar"
        title="A season is more than competition weekends. It is rehearsals, bookings, socials, and every date that keeps the team in motion."
      />

      <section className="py-8 sm:py-12">
        <Container className="space-y-10">
          <SectionHeading
            description="These cards show the public dates and milestones we could verify, from early competition appearances to the team's latest finalist season."
            eyebrow="Season archive"
            title="Verified public moments, arranged like a real calendar instead of a dump of links."
          />

          <div className="grid gap-5">
            {calendarArchive.map((event) => (
              <article
                key={`${event.date}-${event.title}`}
                className="section-card grid gap-5 p-6 sm:grid-cols-[0.8fr_1.2fr] sm:items-start sm:p-7"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[rgba(255,106,61,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ember)]">
                      {event.kind}
                    </span>
                    <span className="rounded-full bg-[rgba(25,21,27,0.06)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-night)]">
                      {event.status}
                    </span>
                  </div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    {event.date}
                  </p>
                  <p className="font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)]">
                    {event.title}
                  </p>
                  <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-ember)]">
                    {event.location}
                  </p>
                </div>

                <p className="text-base leading-8 text-[var(--color-muted)]">{event.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            description="This section helps the calendar page stay useful even between confirmed dates, because it explains the kinds of events QCI is actively built for."
            eyebrow="What lives on the calendar"
            title="The recurring event lanes the site can grow around."
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
