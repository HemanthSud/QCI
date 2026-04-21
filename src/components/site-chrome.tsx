import Link from "next/link";

import { navLinks, siteMeta } from "@/lib/site-data";

import { ButtonLink, Container } from "./ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(255,247,239,0.78)] backdrop-blur-2xl">
      <Container className="py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Link className="group flex items-center gap-3" href="/">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--color-flame),var(--color-gold))] font-display text-lg font-bold uppercase tracking-[0.12em] text-[var(--color-night)] shadow-[0_18px_40px_rgba(255,106,61,0.32)] transition group-hover:-translate-y-0.5">
              Q
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg leading-none tracking-[-0.03em] text-[var(--color-night)]">
                {siteMeta.name}
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                UNC Charlotte Fusion Team
              </span>
            </div>
          </Link>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <nav className="flex flex-wrap gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-[var(--color-night)] transition hover:bg-white/80 hover:text-[var(--color-ember)]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-wrap gap-2">
              <ButtonLink href={siteMeta.instagram} variant="ghost">
                Instagram
              </ButtonLink>
              <ButtonLink href="/support">Support QCI</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-black/5 bg-[rgba(255,255,255,0.52)]">
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ember)]">
              Built for big-stage energy
            </span>
            <h2 className="font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)] sm:text-4xl">
              A sharper digital home for the next QCI season.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              This site is structured so the team can keep refining dates, history, images,
              and fundraising links without tearing the design apart.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-night)]">
                Explore
              </h3>
              <div className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
                {navLinks.map((item) => (
                  <Link key={item.href} className="hover:text-[var(--color-ember)]" href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-night)]">
                Connect
              </h3>
              <div className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
                <a className="hover:text-[var(--color-ember)]" href={`mailto:${siteMeta.email}`}>
                  {siteMeta.email}
                </a>
                <a
                  className="hover:text-[var(--color-ember)]"
                  href={siteMeta.instagram}
                  rel="noreferrer"
                  target="_blank"
                >
                  Instagram
                </a>
                <a
                  className="hover:text-[var(--color-ember)]"
                  href={siteMeta.donateUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Season fund
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/5 pt-6 text-sm text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>{siteMeta.name} | UNC Charlotte&apos;s Bollywood-fusion team.</p>
          <p>Designed to feel cinematic, fast, and easy to update.</p>
        </div>
      </Container>
    </footer>
  );
}
