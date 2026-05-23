"use client";

import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import type { EditableCalendarContent } from "@/lib/site-editor";
import { siteMeta } from "@/lib/site-data";

import { useEditableSiteContent } from "./editable-site-content";

type EditableCalendarProps = {
  fallbackCalendar: EditableCalendarContent;
};

export function EditableCalendar({ fallbackCalendar }: EditableCalendarProps) {
  const content = useEditableSiteContent();
  const calendar = content?.calendar ?? fallbackCalendar;
  const events = calendar.events.filter(
    (event) => event.title.trim() || event.date.trim() || event.description.trim(),
  );
  const buckets = calendar.buckets.length ? calendar.buckets : fallbackCalendar.buckets;

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
        eyebrow={calendar.heroEyebrow}
        title={calendar.heroTitle}
      />

      <section className="py-8 sm:py-12">
        <Container className="space-y-10">
          <SectionHeading eyebrow={calendar.upcomingEyebrow} title={calendar.upcomingTitle} />

          {events.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <article className="section-card relative overflow-hidden p-6" key={event.id}>
                  <div className="absolute right-0 top-0 h-14 w-14 bg-[linear-gradient(135deg,transparent_50%,rgba(0,80,53,0.16)_50%)]" />
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex bg-[var(--color-red)] px-3 py-1 font-accent text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-on-red)] [clip-path:polygon(6px_0,100%_0,calc(100%-6px)_100%,0_100%)]">
                      {event.kind || "Event"}
                    </span>
                    {event.status ? (
                      <span className="inline-flex border border-[var(--color-border)] px-3 py-1 font-accent text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-gold)]">
                        {event.status}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-5 text-sm uppercase tracking-[0.12em] text-[var(--color-muted)]">
                    {event.date || "Date TBD"}
                  </p>
                  <h2 className="mt-3 font-display text-4xl leading-none text-[var(--color-night)]">
                    {event.title || "Untitled event"}
                  </h2>
                  {event.location ? (
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-muted-strong)]">
                      {event.location}
                    </p>
                  ) : null}
                  {event.description ? (
                    <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                      {event.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="section-card p-8 text-center sm:p-10">
              <p className="font-display text-4xl leading-none text-[var(--color-night)]">
                {calendar.emptyTitle}
              </p>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
                {calendar.emptyBody}
              </p>
            </div>
          )}
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading eyebrow={calendar.eventTypesEyebrow} title={calendar.eventTypesTitle} />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {buckets.map((bucket) => (
              <article key={bucket.id} className="section-card p-6">
                <h2 className="font-display text-3xl leading-none text-[var(--color-night)]">
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
