import type { CSSProperties } from "react";
import Image from "next/image";

import { ButtonLink, Container } from "@/components/ui";
import {
  auditionChecklist,
  dareBoardColumns,
  homeEventHighlights,
  homePhotoStrip,
  homeStoryStats,
  siteMeta,
} from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden px-0 pb-20 pt-28 sm:pb-24 sm:pt-36" id="top">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_36%,rgba(42,5,16,0.95)_0%,transparent_72%)]" />
        <HeroDiscoBall />

        <div
          aria-hidden
          className="beam-animate absolute left-1/2 top-[56px] h-[45vh] w-px -translate-x-1/2 origin-top bg-[linear-gradient(to_bottom,rgba(212,175,55,0.5),transparent)]"
          style={{ "--beam-rotation": "-20deg" } as CSSProperties}
        />
        <div
          aria-hidden
          className="beam-animate absolute left-1/2 top-[56px] h-[45vh] w-px -translate-x-1/2 origin-top bg-[linear-gradient(to_bottom,rgba(200,16,46,0.45),transparent)]"
          style={{
            "--beam-rotation": "20deg",
            animationDelay: "-1s",
          } as CSSProperties}
        />
        <div
          aria-hidden
          className="beam-animate absolute left-1/2 top-[56px] h-[45vh] w-px -translate-x-1/2 origin-top bg-[linear-gradient(to_bottom,rgba(212,175,55,0.28),transparent)]"
          style={{
            "--beam-rotation": "0deg",
            animationDelay: "-2s",
          } as CSSProperties}
        />

        <Container className="relative z-10 flex min-h-[calc(100svh-7rem)] flex-col items-center justify-center text-center">
          <p
            className="reveal-on-scroll font-accent text-[0.86rem] uppercase tracking-[0.35em] text-[var(--color-gold)]"
            data-reveal
          >
            Queen City Ishaare · Est. 2014
          </p>

          <h1
            className="reveal-on-scroll reveal-delay-1 mt-4 font-display text-[clamp(4rem,14vw,10rem)] leading-[0.88] text-[var(--color-cream)]"
            data-reveal
          >
            <span className="block text-[var(--color-red)] [text-shadow:0_0_60px_rgba(200,16,46,0.5)]">
              Queen City
            </span>
            <span className="block">Ishaare</span>
            <span className="block text-transparent [-webkit-text-stroke:2px_var(--color-cream)] opacity-60">
              On Stage
            </span>
          </h1>

          <div
            className="reveal-on-scroll reveal-delay-2 mt-6 inline-flex bg-[var(--color-red)] px-8 py-3 [clip-path:polygon(0_8px,12px_0,calc(100%-12px)_0,100%_8px,100%_calc(100%-8px),calc(100%-8px)_100%,8px_100%,0_calc(100%-8px))]"
            data-reveal
          >
            <p className="font-accent text-[1.05rem] uppercase tracking-[0.25em] text-[var(--color-cream)]">
              Where Bollywood Meets the Big Stage
            </p>
          </div>

          <p
            className="reveal-on-scroll reveal-delay-3 mt-6 max-w-xl text-[0.95rem] leading-8 text-[var(--color-muted)] sm:text-base"
            data-reveal
          >
            UNC Charlotte&apos;s premiere South Asian dance team, blending classical Indian
            movement with hip-hop, contemporary, and full-cast storytelling built for campus
            showcases and competition weekends.
          </p>

          <div className="reveal-on-scroll reveal-delay-3 mt-10 flex flex-wrap justify-center gap-4" data-reveal>
            <ButtonLink href="/support">Support the Team</ButtonLink>
            <ButtonLink href="/gallery" variant="secondary">
              Watch the Archive
            </ButtonLink>
          </div>

          <div className="bounce-hint absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 pb-4 text-[rgba(242,237,228,0.45)]">
            <span className="font-accent text-[0.72rem] uppercase tracking-[0.2em]">
              Scroll
            </span>
            <span className="h-10 w-px bg-[linear-gradient(to_bottom,var(--color-cream),transparent)]" />
          </div>
        </Container>
      </section>

      <div className="page-divider" />

      <section className="bg-[var(--color-deep)] py-[4.5rem] sm:py-24" id="about">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="reveal-on-scroll" data-reveal>
              <p className="font-accent text-[0.8rem] uppercase tracking-[0.3em] text-[var(--color-red)]">
                Our Story
              </p>
              <h2 className="mt-4 font-display text-5xl leading-[1.02] text-[var(--color-cream)] sm:text-6xl">
                More Than <span className="text-[var(--color-red)]">Dance.</span> A Family.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-muted)]">
                Queen City Ishaare is a competitive Bollywood fusion dance team at UNC Charlotte.
                Every season blends South Asian roots with sharper performance design, richer stage
                storytelling, and the kind of rehearsal culture that turns a student team into a
                full production unit.
              </p>
              <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-muted)]">
                From regional competitions to campus showcases, the work is built to feel
                celebratory, cinematic, and unmistakably QCI the moment it hits.
              </p>

              <div className="mt-9 flex flex-wrap gap-8 border-t border-white/10 pt-8">
                {homeStoryStats.map((item) => (
                  <div key={item.label}>
                    <p className="font-display text-5xl leading-none text-[var(--color-gold)]">
                      {item.value}
                    </p>
                    <p className="mt-1 font-accent text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-on-scroll reveal-delay-1" data-reveal>
              <div className="grid grid-cols-2 gap-4 sm:gap-5 [transform:rotate(2deg)]">
                {homePhotoStrip.map((frame, index) => (
                  <article
                    key={frame.caption}
                    className={`relative overflow-hidden bg-[#1a1010] p-3 pb-8 shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition duration-300 hover:z-10 hover:scale-[1.03] hover:rotate-0 ${
                      index === 0
                        ? "rotate-[-3deg]"
                        : index === 1
                          ? "mt-6 rotate-[2deg]"
                          : index === 2
                            ? "-mt-3 rotate-[1deg]"
                            : "mt-2 rotate-[-2deg]"
                    }`}
                  >
                    <span className="absolute left-1/2 top-[-6px] h-[18px] w-10 -translate-x-1/2 rounded-sm bg-[rgba(212,175,55,0.25)]" />
                    <div className="relative aspect-square overflow-hidden bg-[var(--color-red-dark)]">
                      <Image
                        alt={frame.caption}
                        className="h-full w-full object-cover"
                        height={3926}
                        sizes="(min-width: 1024px) 20vw, 44vw"
                        src={siteMeta.homeImage}
                        style={{ objectPosition: frame.position }}
                        width={5889}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(200,16,46,0.16),rgba(0,0,0,0.42))]" />
                    </div>
                    <p className="mt-3 text-center text-[0.68rem] uppercase tracking-[0.12em] text-[var(--color-muted)]">
                      {frame.caption}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-[4.5rem] sm:py-24" id="events">
        <Container className="space-y-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="reveal-on-scroll" data-reveal>
              <p className="font-accent text-[0.8rem] uppercase tracking-[0.3em] text-[var(--color-red)]">
                On Stage
              </p>
              <h2 className="mt-4 font-display text-5xl leading-[1.02] text-[var(--color-cream)] sm:text-6xl">
                Featured <span className="text-[var(--color-red)]">Moments</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                The homepage now follows the same bold card rhythm as the reference file, but the
                content is adapted to real QCI milestones instead of generic promo placeholders.
              </p>
            </div>

            <div className="reveal-on-scroll reveal-delay-1" data-reveal>
              <ButtonLink href="/calendar" variant="secondary">
                Full Calendar
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {homeEventHighlights.map((event, index) => (
              <article
                key={event.title}
                className="section-card group reveal-on-scroll relative overflow-hidden p-8 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--color-red)]"
                data-reveal
              >
                <div className="absolute right-0 top-0 h-16 w-16 bg-[linear-gradient(135deg,transparent_50%,rgba(200,16,46,0.15)_50%)]" />
                <div
                  className={`absolute left-0 top-0 h-full w-1 origin-top bg-[var(--color-red)] transition duration-300 ${
                    index === 0 ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                  }`}
                />

                <div className="inline-flex bg-[var(--color-red)] px-3 py-1 font-accent text-[0.76rem] uppercase tracking-[0.16em] text-[var(--color-cream)] [clip-path:polygon(6px_0,100%_0,calc(100%-6px)_100%,0_100%)]">
                  {event.badge}
                </div>
                <p className="absolute right-8 top-7 font-display text-3xl leading-none text-[var(--color-gold)]">
                  {event.meta}
                </p>
                <h3 className="mt-5 max-w-[13rem] font-display text-[2rem] leading-[1.02] text-[var(--color-cream)]">
                  {event.title}
                </h3>
                <div className="mt-4 space-y-1 text-sm uppercase tracking-[0.08em] text-[var(--color-muted)]">
                  <p className="text-[var(--color-muted-strong)]">{event.date}</p>
                  <p>{event.detail}</p>
                  <p>{event.location}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[var(--color-red-dark)] py-[4.5rem] sm:py-[5.5rem]" id="dare">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[20vw] leading-none text-black/20">DARE</span>
        </div>

        <Container className="relative z-10">
          <div className="reveal-on-scroll max-w-3xl" data-reveal>
            <p className="font-accent text-[0.8rem] uppercase tracking-[0.3em] text-[var(--color-cream)]">
              Ishaare Dare Board
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[1.02] text-[var(--color-cream)] sm:text-6xl">
              How Far Will <span className="text-[var(--color-gold)]">You Go?</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[rgba(255,255,255,0.78)]">
              This section mirrors the reference layout almost one-to-one because it was one of the
              most distinctive ideas in `index.html`: a fundraiser board that feels like part poster
              wall, part live event challenge grid.
            </p>
          </div>

          <div
            className="reveal-on-scroll reveal-delay-1 mt-12 grid overflow-hidden border border-white/20 bg-[rgba(0,0,0,0.12)] sm:grid-cols-2 xl:grid-cols-4"
            data-reveal
          >
            {dareBoardColumns.map((column, index) => (
              <div
                key={column.price}
                className={`border-white/20 ${
                  index === 0
                    ? "border-b sm:border-r xl:border-b-0"
                    : index === 1
                      ? "border-b xl:border-b-0 xl:border-r"
                      : index === 2
                        ? "sm:border-r"
                        : ""
                }`}
              >
                <div className="border-b border-white/20 bg-[rgba(0,0,0,0.3)] px-4 py-4 text-center font-display text-4xl text-[var(--color-gold)]">
                  {column.price}
                </div>
                <div>
                  {column.items.map((item) => (
                    <p
                      key={item}
                      className="border-b border-white/10 px-4 py-4 text-center font-accent text-[0.78rem] uppercase tracking-[0.08em] text-[rgba(242,237,228,0.9)] transition hover:bg-[rgba(0,0,0,0.15)]"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p
            className="reveal-on-scroll reveal-delay-2 mt-8 text-center font-accent text-2xl uppercase tracking-[0.26em] text-[var(--color-gold)]"
            data-reveal
          >
            $10 = Dare of Your Choice
          </p>
        </Container>
      </section>

      <section className="py-[4.5rem] sm:py-24" id="auditions">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="reveal-on-scroll" data-reveal>
              <p className="font-accent text-[0.8rem] uppercase tracking-[0.3em] text-[var(--color-red)]">
                Join the Team
              </p>
              <h2 className="mt-4 font-display text-5xl leading-[1.02] text-[var(--color-cream)] sm:text-6xl">
                Spring <span className="text-[var(--color-red)]">Auditions</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                The final section keeps the centered structure from the reference homepage and turns
                it into a cleaner recruitment CTA with a short checklist and direct path to the
                team&apos;s Instagram.
              </p>
            </div>

            <div className="reveal-on-scroll reveal-delay-1 mt-10 grid gap-4 text-left sm:grid-cols-2" data-reveal>
              {auditionChecklist.map((item) => (
                <div key={item} className="flex items-start gap-3 text-[0.92rem] leading-7 text-[var(--color-muted)]">
                  <span className="pt-[0.48rem] text-[0.6rem] text-[var(--color-gold)]">✦</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="reveal-on-scroll reveal-delay-2 mt-10 flex flex-wrap justify-center gap-4" data-reveal>
              <ButtonLink href={siteMeta.instagram}>DM Us on Instagram</ButtonLink>
              <ButtonLink href="/support" variant="secondary">
                Back the Season
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function HeroDiscoBall() {
  return (
    <svg
      aria-hidden
      className="rotate-disco absolute left-1/2 top-[-60px] z-[1] h-[120px] w-[120px] -translate-x-1/2 opacity-60 sm:h-[200px] sm:w-[200px]"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient cx="35%" cy="30%" id="hero-ball-gradient">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#aaaaaa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#333333" stopOpacity="0.6" />
        </radialGradient>
        <clipPath id="hero-circle-clip">
          <circle cx="100" cy="100" r="90" />
        </clipPath>
      </defs>
      <circle
        cx="100"
        cy="100"
        fill="url(#hero-ball-gradient)"
        r="90"
        stroke="#555"
        strokeWidth="1"
      />
      <g clipPath="url(#hero-circle-clip)" opacity="0.7">
        <rect fill="#fff" height="12" opacity="0.3" transform="rotate(-20,100,100)" width="18" x="10" y="50" />
        <rect fill="#D4AF37" height="12" opacity="0.4" transform="rotate(-10,100,100)" width="18" x="40" y="20" />
        <rect fill="#fff" height="12" opacity="0.5" width="18" x="70" y="10" />
        <rect fill="#C8102E" height="12" opacity="0.5" width="18" x="100" y="15" />
        <rect fill="#fff" height="12" opacity="0.3" transform="rotate(10,100,100)" width="18" x="130" y="25" />
        <rect fill="#D4AF37" height="12" opacity="0.4" width="18" x="155" y="50" />
        <rect fill="#C8102E" height="12" opacity="0.4" width="18" x="20" y="85" />
        <rect fill="#fff" height="12" opacity="0.5" width="18" x="55" y="75" />
        <rect fill="#D4AF37" height="12" opacity="0.6" width="18" x="88" y="80" />
        <rect fill="#fff" height="12" opacity="0.4" width="18" x="122" y="78" />
        <rect fill="#C8102E" height="12" opacity="0.3" width="18" x="155" y="85" />
        <rect fill="#fff" height="12" opacity="0.5" width="18" x="30" y="115" />
        <rect fill="#C8102E" height="12" opacity="0.4" width="18" x="65" y="110" />
        <rect fill="#D4AF37" height="12" opacity="0.5" width="18" x="98" y="112" />
        <rect fill="#fff" height="12" opacity="0.3" width="18" x="132" y="114" />
        <rect fill="#D4AF37" height="12" opacity="0.4" width="18" x="50" y="145" />
        <rect fill="#fff" height="12" opacity="0.5" width="18" x="83" y="148" />
        <rect fill="#C8102E" height="12" opacity="0.3" width="18" x="116" y="146" />
        <rect fill="#fff" height="12" opacity="0.3" width="18" x="80" y="175" />
      </g>
      <line stroke="#888" strokeWidth="2" x1="100" x2="100" y1="10" y2="0" />
    </svg>
  );
}
