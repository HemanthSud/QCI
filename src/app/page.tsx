import Image from "next/image";

import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import {
  calendarArchive,
  danceStyles,
  fundingUses,
  galleryCards,
  homepageFeatures,
  homepageStats,
  siteMeta,
} from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden py-10 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="relative flex flex-col gap-8">
              <div className="fade-rise space-y-6">
                <span className="inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ember)] shadow-[0_16px_40px_rgba(22,20,25,0.08)]">
                  UNC Charlotte&apos;s competitive Bollywood-fusion team
                </span>
                <div className="space-y-6">
                  <h1 className="text-balance font-display text-6xl leading-[0.92] tracking-[-0.06em] text-[var(--color-night)] sm:text-7xl lg:text-[6.5rem]">
                    Charlotte&apos;s
                    <span className="block bg-[linear-gradient(135deg,var(--color-flame),var(--color-gold))] bg-clip-text text-transparent">
                      Bollywood-fusion
                    </span>
                    pulse.
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
                    Queen City Ishaare brings cinematic storytelling, full-cast stage energy,
                    and South Asian dance forms into one sharp performance language. The goal
                    isn&apos;t just to hit counts. It&apos;s to leave a mark.
                  </p>
                </div>
              </div>

              <div className="fade-rise flex flex-wrap gap-3" style={{ animationDelay: "0.15s" }}>
                <ButtonLink href="/gallery">See the gallery</ButtonLink>
                <ButtonLink href="/support" variant="secondary">
                  Support the season
                </ButtonLink>
                <ButtonLink href={siteMeta.instagram} variant="ghost">
                  Follow on Instagram
                </ButtonLink>
              </div>

              <div
                className="fade-rise grid gap-4 sm:grid-cols-2"
                style={{ animationDelay: "0.3s" }}
              >
                {homepageStats.map((item) => (
                  <div key={item.label} className="section-card p-5">
                    <p className="font-display text-4xl tracking-[-0.05em] text-[var(--color-night)]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="fade-rise flex flex-wrap gap-2 pt-1"
                style={{ animationDelay: "0.45s" }}
              >
                {danceStyles.map((style) => (
                  <span
                    key={style}
                    className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-night)]"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative fade-rise lg:justify-self-end" style={{ animationDelay: "0.15s" }}>
              <div className="hero-orb orb-one float-slow right-0 top-4" />
              <div className="hero-orb orb-two float-slow float-delay left-6 top-28" />
              <div className="hero-orb orb-three float-slow bottom-10 left-2" />
              <div className="glass-panel relative overflow-hidden p-3 sm:p-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                  <Image
                    alt="Queen City Ishaare team photo"
                    className="h-full w-full object-cover"
                    height={3926}
                    priority
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    src={siteMeta.homeImage}
                    width={5889}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,21,27,0.02),rgba(25,21,27,0.42))]" />
                </div>

                <div className="absolute left-2 top-12 rounded-3xl border border-white/30 bg-[rgba(25,21,27,0.72)] px-4 py-3 text-white backdrop-blur md:-left-8">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/70">Latest high-water mark</p>
                  <p className="mt-1 font-display text-2xl tracking-[-0.04em]">South Asian Showdown finalist</p>
                </div>

                <div className="absolute bottom-6 right-2 rounded-3xl border border-black/5 bg-white/84 px-4 py-3 backdrop-blur md:-right-6">
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-muted)]">Latest podium</p>
                  <p className="mt-1 font-display text-2xl tracking-[-0.04em] text-[var(--color-night)]">Jersey Jalwa 2025 | 3rd</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            description="The strongest current culture and event sites pair oversized editorial type with clear story beats, high-contrast blocks, and immersive imagery. This site follows that spirit without sacrificing usability."
            eyebrow="What the site is channeling"
            title="Editorial enough to feel premium. Fast enough to feel alive."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {homepageFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="section-card fade-rise p-6"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-ember)]">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)]">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="glass-panel overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <SectionHeading
                description="QCI's public record shows a team rooted in UNC Charlotte and visible across competitions, campus events, fundraising pushes, and collaborative nights in the Charlotte area."
                eyebrow="About the team"
                title="A student-run team that treats every set like a world build."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="section-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-ember)]">
                    The lane
                  </p>
                  <p className="mt-3 font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)]">
                    Bollywood-fusion with a competitive edge
                  </p>
                </div>
                <div className="section-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-ember)]">
                    The roots
                  </p>
                  <p className="mt-3 font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)]">
                    UNC Charlotte, Charlotte, and the wider circuit
                  </p>
                </div>
                <div className="section-card p-5 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-ember)]">
                    Why it lands
                  </p>
                  <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
                    The team blends culture, competition, community, and design thinking.
                    It&apos;s equal parts art, rehearsal discipline, and event production.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about">Read the history</ButtonLink>
              <ButtonLink href="/calendar" variant="secondary">
                View the season archive
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            description="A clean site still needs rhythm. This timeline preview keeps dates scannable while making the season feel like a continuous story instead of a pile of flyers."
            eyebrow="Season pulse"
            title="Competition weekends, socials, showcases, and the moments that keep the team moving."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {calendarArchive.slice(-3).map((event) => (
              <article key={`${event.date}-${event.title}`} className="section-card p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[rgba(255,106,61,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ember)]">
                    {event.kind}
                  </span>
                  <span className="rounded-full bg-[rgba(25,21,27,0.06)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-night)]">
                    {event.status}
                  </span>
                </div>
                <p className="mt-5 text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  {event.date}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)]">
                  {event.title}
                </h3>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[var(--color-ember)]">
                  {event.location}
                </p>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                  {event.description}
                </p>
              </article>
            ))}
          </div>

          <ButtonLink href="/calendar" variant="secondary">
            Open the full calendar
          </ButtonLink>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            align="center"
            description="The gallery leans into crop, pace, and typography so even a small asset set feels intentional. It can absorb more photos later without losing the design language."
            eyebrow="Gallery preview"
            title="Posters, stills, and frames built to feel like a season identity."
          />

          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <GalleryCard {...galleryCards[0]} />
            <div className="grid gap-5 sm:grid-cols-2">
              <GalleryCard {...galleryCards[1]} />
              <GalleryCard {...galleryCards[2]} />
              <GalleryCard {...galleryCards[3]} />
              <GalleryCard {...galleryCards[4]} />
            </div>
          </div>

          <ButtonLink href="/gallery">Open the full gallery</ButtonLink>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="glass-panel overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-5">
                <span className="inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ember)]">
                  Support the team
                </span>
                <h2 className="font-display text-4xl leading-none tracking-[-0.04em] text-[var(--color-night)] sm:text-5xl">
                  Student-run means every season gets built together.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
                  Public support campaigns describe the same four pressure points every year:
                  travel, competition fees, costumes, and production. Help with any of those
                  and you&apos;re helping the work reach the stage the way it was meant to.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/support">See support options</ButtonLink>
                  <ButtonLink href={siteMeta.donateUrl} variant="secondary">
                    Donate to the season fund
                  </ButtonLink>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {fundingUses.map((item) => (
                  <div key={item.title} className="section-card p-5">
                    <h3 className="font-display text-2xl leading-none tracking-[-0.04em] text-[var(--color-night)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

type GalleryCardProps = (typeof galleryCards)[number];

function GalleryCard(card: GalleryCardProps) {
  const accentClass =
    card.accent === "night"
      ? "poster-night"
      : card.accent === "jade"
        ? "poster-jade"
        : "poster-sunset";

  if (card.variant === "poster") {
    return (
      <article
        className={`overflow-hidden rounded-[1.75rem] p-6 sm:p-8 ${
          card.size === "large" ? "min-h-[22rem]" : "min-h-[16rem]"
        } ${accentClass}`}
      >
        <div className="flex h-full flex-col justify-between">
          <p className="poster-text text-xs font-semibold uppercase tracking-[0.28em]">
            Archive poster
          </p>
          <div className="space-y-3">
            <h3 className="poster-text font-display text-4xl leading-none tracking-[-0.05em] sm:text-5xl">
              {card.title}
            </h3>
            <p className="poster-text max-w-sm text-sm leading-7 text-white/80">
              {card.caption}
            </p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.75rem] ${
        card.size === "large" ? "min-h-[28rem]" : "min-h-[18rem]"
      }`}
    >
      <Image
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        height={3926}
        sizes="(min-width: 1024px) 40vw, 100vw"
        src={siteMeta.homeImage}
        style={{ objectPosition: card.position }}
        width={5889}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,21,27,0.06),rgba(25,21,27,0.72))]" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
          Photo frame
        </p>
        <h3 className="mt-3 font-display text-3xl leading-none tracking-[-0.04em] sm:text-4xl">
          {card.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-7 text-white/80">{card.caption}</p>
      </div>
    </article>
  );
}
