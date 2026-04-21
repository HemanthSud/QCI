"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

import { navLinks, siteMeta } from "@/lib/site-data";
import { useAuth } from "@/components/auth-context";

import { Container } from "./ui";

type Theme = "dark" | "light";

const themeStorageKey = "qci-theme";
const themeChangeEvent = "qci-theme-change";

function readTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.localStorage.getItem(themeStorageKey) === "light" ? "light" : "dark";
}

function subscribeToTheme(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === themeStorageKey) {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(themeChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(themeChangeEvent, callback);
  };
}

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useSyncExternalStore<Theme>(subscribeToTheme, readTheme, () => "dark");
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(themeStorageKey, nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  };

  return (
    <header className="site-header sticky top-0 z-50" data-scrolled={isScrolled}>
      <Container className="py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link className="flex min-w-0 items-center gap-3" href="/">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--logo-bg)] shadow-[0_0_24px_rgba(200,16,46,0.18)]">
              <Image
                alt={`${siteMeta.name} logo`}
                className="h-full w-full object-cover"
                height={48}
                priority
                src={siteMeta.logoImage}
                width={48}
              />
            </span>
            <span className="min-w-0">
              <span className="block font-accent text-2xl uppercase leading-none tracking-[0.18em] text-[var(--color-cream)] sm:text-3xl">
                QCI
              </span>
              <span className="hidden max-w-[18rem] truncate text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)] sm:block">
                Queen City Ishaare
              </span>
            </span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-2 lg:justify-end">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                className={`shrink-0 border px-3 py-2 font-accent text-[0.72rem] uppercase tracking-[0.16em] transition sm:px-4 sm:text-[0.78rem] md:text-[0.82rem] ${
                  item.label === "Donate"
                    ? "border-[var(--color-red)] bg-[var(--color-red)] text-[var(--color-on-red)] shadow-[0_10px_28px_rgba(200,16,46,0.26)]"
                    : "border-[var(--color-border)] bg-[var(--nav-bg)] text-[var(--nav-text)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            {!loading && (
              <Link
                href={user ? "/members" : "/auth"}
                className="shrink-0 border border-[var(--color-border)] bg-[var(--nav-bg)] px-3 py-2 font-accent text-[0.72rem] uppercase tracking-[0.16em] text-[var(--nav-text)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] sm:px-4 sm:text-[0.78rem] md:text-[0.82rem]"
              >
                {user ? "Members" : "Login"}
              </Link>
            )}
            <button
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--color-border)] bg-[var(--nav-bg)] text-[var(--nav-text)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              onClick={toggleTheme}
              title={theme === "light" ? "Dark mode" : "Light mode"}
              type="button"
            >
              <ThemeIcon theme={theme} />
            </button>
          </nav>
        </div>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--footer-bg)] pb-10 pt-14">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--logo-bg)]">
              <Image
                alt={`${siteMeta.name} logo`}
                className="h-full w-full object-cover"
                height={64}
                src={siteMeta.logoImage}
                width={64}
              />
            </span>
            <div>
              <p className="font-display text-4xl leading-none text-[var(--color-cream)]">
                Queen City Ishaare
              </p>
              <p className="mt-3 font-accent text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-muted)]">
                {siteMeta.tagline} · Charlotte, NC
              </p>
            </div>
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
            <SocialLink href={siteMeta.donateUrl} label="Donate">
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

        <div className="mt-10 border-t border-[rgba(242,237,228,0.08)] pt-6 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          <p>© 2026 Queen City Ishaare · All Rights Reserved</p>
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
      className="inline-flex h-11 w-11 items-center justify-center border border-[var(--color-border)] text-[var(--color-cream)] transition hover:border-[var(--color-red)] hover:bg-[rgba(200,16,46,0.15)] [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)]"
      href={href}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

function ThemeIcon({ theme }: { theme: "dark" | "light" }) {
  if (theme === "dark") {
    return (
      <svg
        aria-hidden
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 3v2" />
        <path d="M12 19v2" />
        <path d="M4.22 4.22l1.42 1.42" />
        <path d="M18.36 18.36l1.42 1.42" />
        <path d="M3 12h2" />
        <path d="M19 12h2" />
        <path d="M4.22 19.78l1.42-1.42" />
        <path d="M18.36 5.64l1.42-1.42" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8Z" />
    </svg>
  );
}
