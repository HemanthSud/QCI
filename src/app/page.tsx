import type { CSSProperties } from "react";
import Image from "next/image";

import { GoFundMeEmbed } from "@/components/gofundme-embed";
import { ButtonLink, Container } from "@/components/ui";
import {
  homeEventHighlights,
  homePhotoStrip,
  homeStoryStats,
} from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden px-0 pb-20 pt-32 sm:pb-24 sm:pt-40" id="top">
        <div className="hero-radial absolute inset-0" />
        <HeroDiscoBall />

        <div
          aria-hidden
          className="beam-animate absolute left-1/2 top-[9.25rem] h-[38vh] w-px -translate-x-1/2 origin-top bg-[linear-gradient(to_bottom,rgba(212,175,55,0.5),transparent)] sm:top-[9rem]"
          style={{ "--beam-rotation": "-20deg" } as CSSProperties}
        />
        <div
          aria-hidden
          className="beam-animate absolute left-1/2 top-[9.25rem] h-[38vh] w-px -translate-x-1/2 origin-top bg-[linear-gradient(to_bottom,rgba(200,16,46,0.45),transparent)] sm:top-[9rem]"
          style={{
            "--beam-rotation": "20deg",
            animationDelay: "-1s",
          } as CSSProperties}
        />
        <div
          aria-hidden
          className="beam-animate absolute left-1/2 top-[9.25rem] h-[38vh] w-px -translate-x-1/2 origin-top bg-[linear-gradient(to_bottom,rgba(212,175,55,0.28),transparent)] sm:top-[9rem]"
          style={{
            "--beam-rotation": "0deg",
            animationDelay: "-2s",
          } as CSSProperties}
        />

        <Container className="relative z-10 flex min-h-[calc(100svh-7rem)] flex-col items-center justify-center pt-28 text-center sm:pt-24">
          <p
            className="reveal-on-scroll max-w-full font-accent text-[0.8rem] uppercase tracking-[0.22em] text-[var(--color-gold)] sm:text-[0.95rem] sm:tracking-[0.35em]"
            data-reveal
          >
            Queen City Ishaare · Est. 2015
          </p>

          <h1
            className="reveal-on-scroll reveal-delay-1 mt-4 max-w-full break-words font-display text-[clamp(2.55rem,7vw,6.6rem)] leading-[1.06] text-[var(--color-cream)] sm:leading-[1.02]"
            data-reveal
          >
            <span className="block">UNCC&apos;s Premier</span>
            <span className="block">Bollywood Fusion</span>
            <span className="block">Dance Team</span>
          </h1>

          <div
            className="reveal-on-scroll reveal-delay-2 mt-6 inline-flex max-w-full bg-[var(--color-red)] px-5 py-3 text-center sm:px-8 [clip-path:polygon(0_8px,12px_0,calc(100%-12px)_0,100%_8px,100%_calc(100%-8px),calc(100%-8px)_100%,8px_100%,0_calc(100%-8px))]"
            data-reveal
          >
            <p className="font-accent text-[0.9rem] uppercase tracking-[0.14em] text-[var(--color-cream)] sm:text-[1.05rem] sm:tracking-[0.25em]">
              Where Bollywood Meets the Big Stage
            </p>
          </div>

          <p
            className="reveal-on-scroll reveal-delay-3 mt-6 max-w-xl text-[0.95rem] leading-8 text-[var(--color-muted)] sm:text-base"
            data-reveal
          >
            Queen City Ishaare brings Bollywood, hip-hop, contemporary, and South Asian stage
            energy together for campus showcases, community events, and competition weekends.
          </p>

          <div className="reveal-on-scroll reveal-delay-3 mt-10 flex flex-wrap justify-center gap-4" data-reveal>
            <ButtonLink href="/support">Donate</ButtonLink>
            <ButtonLink href="/gallery" variant="secondary">
              View Gallery
            </ButtonLink>
          </div>
        </Container>
      </section>

      <div className="page-divider" />

      <section className="bg-[var(--color-deep)] py-[4.5rem] sm:py-24" id="about">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="reveal-on-scroll" data-reveal>
              <p className="font-accent text-[0.8rem] uppercase tracking-[0.3em] text-[var(--color-red)]">
                About
              </p>
              <h2 className="mt-4 font-display text-5xl leading-[1.02] text-[var(--color-cream)] sm:text-6xl">
                Bollywood fusion at UNCC.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-muted)]">
                Queen City Ishaare is UNCC&apos;s competitive Bollywood fusion team, built for
                campus stages, community shows, and competition weekends.
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
                    key={`${frame.caption}-${index}`}
                    className={`relative overflow-hidden bg-[#1a1010] p-3 shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition duration-300 hover:z-10 hover:scale-[1.03] hover:rotate-0 ${
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
                        src={frame.src}
                        style={{ objectPosition: frame.position }}
                        width={5889}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(200,16,46,0.16),rgba(0,0,0,0.42))]" />
                    </div>
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
                Comps this year.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                The main competition stops and showcase moments for this season.
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

                <div className="inline-flex bg-[var(--color-red)] px-3 py-1 font-accent text-[0.76rem] uppercase tracking-[0.16em] text-[var(--color-on-red)] [clip-path:polygon(6px_0,100%_0,calc(100%-6px)_100%,0_100%)]">
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

      <section className="relative overflow-hidden bg-[var(--color-red-dark)] py-[4.5rem] sm:py-[5.5rem]" id="donate">
        <Container className="relative z-10">
          <GoFundMeEmbed />
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
                Fall Auditions <span className="text-[var(--color-red)]">Coming Soon</span>
              </h2>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function HeroDiscoBall() {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 top-[4.5rem] z-[1] h-[120px] w-[120px] -translate-x-1/2 opacity-[0.65] sm:top-16 sm:h-[170px] sm:w-[170px]"
    >
      <svg
        className="rotate-disco h-full w-full"
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
    </div>
  );
}
