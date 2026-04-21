"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth-context";
import { Container } from "@/components/ui";
import { siteMeta } from "@/lib/site-data";

const memberCards = [
  {
    title: "Private updates",
    description: "Use this space for rehearsal notes, call times, announcements, and team-only links.",
  },
  {
    title: "Season resources",
    description: "Add music cuts, costume details, travel packets, and documents once the portal grows.",
  },
  {
    title: "Leadership contact",
    description: "Keep sponsorship, booking, and internal communication paths easy to find.",
  },
] as const;

export default function MembersPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <section className="min-h-[70vh] py-20">
        <Container>
          <div className="section-card mx-auto max-w-xl p-8 text-center">
            <p className="font-accent text-[0.8rem] uppercase tracking-[0.28em] text-[var(--color-gold)]">
              Checking session
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              Loading your member portal.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  const lastSignIn = user.last_sign_in_at
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(user.last_sign_in_at))
    : "Session active";

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    router.replace("/");
  };

  return (
    <>
      <section className="relative overflow-hidden py-[4.5rem] sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="reveal-on-scroll" data-reveal>
              <p className="font-accent text-[0.82rem] uppercase tracking-[0.32em] text-[var(--color-gold)]">
                Login successful
              </p>
              <h1 className="mt-4 max-w-3xl break-words font-display text-5xl leading-[0.98] text-[var(--color-cream)] sm:text-6xl lg:text-7xl">
                Welcome to the QCI member portal.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                You are signed in and your Supabase Auth session is active. This page is the private
                landing spot after a successful login.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  className="inline-flex items-center justify-center border border-[var(--color-gold)] px-6 py-3 font-accent text-[0.95rem] uppercase tracking-[0.2em] text-[var(--color-gold)] transition hover:-translate-y-0.5 hover:bg-[var(--color-gold-dim)]"
                  href="/calendar"
                >
                  Calendar
                </Link>
                <button
                  className="inline-flex items-center justify-center bg-[var(--color-red)] px-6 py-3 font-accent text-[0.95rem] uppercase tracking-[0.2em] text-[var(--color-cream)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)]"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                  type="button"
                >
                  {isSigningOut ? "Signing out" : "Sign out"}
                </button>
              </div>
            </div>

            <aside className="section-card reveal-on-scroll reveal-delay-1 p-6 sm:p-8" data-reveal>
              <p className="font-accent text-[0.76rem] uppercase tracking-[0.28em] text-[var(--color-rose)]">
                Active account
              </p>
              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    Signed in as
                  </p>
                  <p className="mt-2 break-words text-xl font-semibold text-[var(--color-cream)]">
                    {user.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    Last sign in
                  </p>
                  <p className="mt-2 text-base text-[var(--color-muted-strong)]">{lastSignIn}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    Team contact
                  </p>
                  <a
                    className="mt-2 block break-words text-base text-[var(--color-gold)] hover:text-[var(--color-cream)]"
                    href={`mailto:${siteMeta.email}`}
                  >
                    {siteMeta.email}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container className="space-y-8">
          <div className="max-w-3xl">
            <p className="font-accent text-[0.8rem] uppercase tracking-[0.3em] text-[var(--color-red)]">
              Portal starting point
            </p>
            <h2 className="mt-4 font-display text-4xl leading-none text-[var(--color-cream)] sm:text-5xl">
              Ready for private team content.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {memberCards.map((card) => (
              <article key={card.title} className="section-card p-6">
                <h3 className="font-display text-3xl leading-none text-[var(--color-night)]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
