import { EditableHomePhotoStrip } from "@/components/editable-home-photo-strip";
import { GoFundMeEmbed } from "@/components/gofundme-embed";
import { ButtonLink, Container } from "@/components/ui";
import {
  homeEventHighlights,
  homeStoryStats,
} from "@/lib/site-data";
import { createDefaultSiteEditorContent } from "@/lib/site-editor";

const fallbackEditorContent = createDefaultSiteEditorContent();

export default function Home() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden px-0 pb-20 pt-32 sm:pb-24 sm:pt-40" id="top">
        <div className="hero-radial absolute inset-0" />
        <HeroDiscoBall />

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
              <EditableHomePhotoStrip fallbackImages={fallbackEditorContent.homePhotoStrip} />
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
    <iframe
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full border-0"
      src="/disco-ball.html?mode=hero"
      tabIndex={-1}
      title="Animated disco ball nightclub backdrop"
    />
  );
}
