"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { navLinks, siteMeta } from "@/lib/site-data";

import { ButtonLink, Container } from "./ui";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="site-header sticky top-0 z-50" data-scrolled={isScrolled}>
      <Container className="py-5">
        <div className="flex items-center justify-between gap-6">
          <Link className="flex items-center gap-3" href="/">
            <span className="font-accent text-3xl uppercase tracking-[0.22em] text-[var(--color-cream)]">
              QC<span className="text-[var(--color-red)]">I</span>
            </span>
            <span className="hidden text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] sm:block">
              UNC Charlotte Bollywood Team
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-7 md:flex">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  className="font-accent text-[0.82rem] uppercase tracking-[0.2em] text-[rgba(242,237,228,0.75)] transition hover:text-[var(--color-gold)]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ButtonLink className="hidden sm:inline-flex" href={siteMeta.instagram} variant="ghost">
                Instagram
              </ButtonLink>
              <ButtonLink href="/support">Support</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(200,16,46,0.2)] bg-[#040404] pb-10 pt-14">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <p className="font-display text-4xl leading-none text-[var(--color-cream)]">
              Queen City <span className="text-[var(--color-red)]">Ishaare</span>
            </p>
            <p className="mt-3 font-accent text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-muted)]">
              UNCC Bollywood Dance Team · Charlotte, NC
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SocialLink href={siteMeta.instagram} label="Instagram">
              <svg
                aria-hidden
                className="h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect height="20" rx="5" width="20" x="2" y="2" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" fill="currentColor" r="1" stroke="none" />
              </svg>
            </SocialLink>
            <SocialLink href={`mailto:${siteMeta.email}`} label="Email">
              <svg
                aria-hidden
                className="h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 6h18v12H3z" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </SocialLink>
            <SocialLink href={siteMeta.donateUrl} label="Support">
              <svg
                aria-hidden
                className="h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 21s-6.5-4.35-9-8.36C.76 9.28 2.15 5 6.34 5c2.15 0 3.53 1.1 4.32 2.2C11.46 6.1 12.84 5 15 5c4.2 0 5.58 4.28 3.34 7.64C18.5 16.65 12 21 12 21Z" />
              </svg>
            </SocialLink>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(242,237,228,0.08)] pt-6 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          <p>© 2026 Queen City Ishaare · All Rights Reserved</p>
          <p>Built with the same editorial layout language as the reference homepage.</p>
        </div>
      </Container>
    </footer>
  );
}

type SocialLinkProps = {
  children: React.ReactNode;
  href: string;
  label: string;
};

function SocialLink({ children, href, label }: SocialLinkProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center border border-[rgba(242,237,228,0.15)] text-[var(--color-cream)] transition hover:border-[var(--color-red)] hover:bg-[rgba(200,16,46,0.15)] [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)]"
      href={href}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}
