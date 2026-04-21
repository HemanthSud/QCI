"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth-context";
import { Container } from "@/components/ui";
import { siteMeta } from "@/lib/site-data";

const absenceFormUrl = process.env.NEXT_PUBLIC_QCI_ABSENCE_FORM_URL;
const feedbackFormUrl = process.env.NEXT_PUBLIC_QCI_ANONYMOUS_FEEDBACK_FORM_URL;

const portalLinks = [
  {
    title: "Fundraising points",
    href: "#fundraising-points",
  },
  {
    title: "Production points",
    href: "#production-points",
  },
  {
    title: "Comp details",
    href: "/members/comp",
  },
  {
    title: "Forms",
    href: "#forms",
  },
] as const;

const fundraisingItems = ["Donations", "Sponsor leads", "Event sales", "Dares"];
const productionItems = ["Clean-up", "Props", "Costumes", "Media"];

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
  const memberName =
    typeof user.user_metadata.full_name === "string" && user.user_metadata.full_name.trim()
      ? user.user_metadata.full_name
      : user.email;

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
                Members
              </p>
              <h1 className="mt-4 max-w-3xl break-words font-display text-5xl leading-[0.98] text-[var(--color-cream)] sm:text-6xl lg:text-7xl">
                Hi, {memberName}.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                Fundraising, production, comp info, and forms live here.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  className="inline-flex items-center justify-center border border-[var(--color-gold)] px-6 py-3 font-accent text-[0.95rem] uppercase tracking-[0.2em] text-[var(--color-gold)] transition hover:-translate-y-0.5 hover:bg-[var(--color-gold-dim)]"
                  href="/members/comp"
                >
                  Comp details
                </Link>
                <button
                  className="inline-flex items-center justify-center bg-[var(--color-red)] px-6 py-3 font-accent text-[0.95rem] uppercase tracking-[0.2em] text-[var(--color-on-red)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)]"
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
                    {memberName}
                  </p>
                  {memberName !== user.email ? (
                    <p className="mt-1 break-words text-sm text-[var(--color-muted)]">{user.email}</p>
                  ) : null}
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
              Portal
            </p>
            <h2 className="mt-4 font-display text-4xl leading-none text-[var(--color-cream)] sm:text-5xl">
              Quick access.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {portalLinks.map((link) => (
              <Link
                key={link.title}
                className="section-card block p-6 transition hover:-translate-y-1"
                href={link.href}
              >
                <p className="font-display text-3xl leading-none text-[var(--color-night)]">
                  {link.title}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container className="grid gap-6 lg:grid-cols-2">
          <article className="section-card p-6 sm:p-8" id="fundraising-points">
            <p className="font-accent text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-rose)]">
              Fundraising points
            </p>
            <div className="mt-6 grid gap-3">
              {fundraisingItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-white/10 pb-3 text-sm"
                >
                  <span className="text-[var(--color-muted)]">{item}</span>
                  <span className="font-semibold text-[var(--color-gold)]">0 pts</span>
                </div>
              ))}
            </div>
          </article>

          <article className="section-card p-6 sm:p-8" id="production-points">
            <p className="font-accent text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-rose)]">
              Production points
            </p>
            <div className="mt-6 grid gap-3">
              {productionItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-white/10 pb-3 text-sm"
                >
                  <span className="text-[var(--color-muted)]">{item}</span>
                  <span className="font-semibold text-[var(--color-gold)]">0 pts</span>
                </div>
              ))}
            </div>
          </article>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24" id="forms">
        <Container className="space-y-8">
          <div>
            <p className="font-accent text-[0.8rem] uppercase tracking-[0.3em] text-[var(--color-red)]">
              Forms
            </p>
            <h2 className="mt-4 font-display text-4xl leading-none text-[var(--color-cream)] sm:text-5xl">
              Team forms.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormCard
              fallback={`mailto:${siteMeta.email}?subject=Absence%20Form`}
              href={absenceFormUrl}
              label="Absence form"
            />
            <FormCard href={feedbackFormUrl} label="Anonymous feedback" />
          </div>
        </Container>
      </section>
    </>
  );
}

type FormCardProps = {
  fallback?: string;
  href?: string;
  label: string;
};

function FormCard({ fallback, href, label }: FormCardProps) {
  const formHref = href || fallback;

  return (
    <article className="section-card p-6">
      <h3 className="font-display text-3xl leading-none text-[var(--color-night)]">{label}</h3>
      {formHref ? (
        <a
          className="mt-6 inline-flex items-center justify-center border border-[var(--color-gold)] px-5 py-3 font-accent text-[0.9rem] uppercase tracking-[0.18em] text-[var(--color-gold)] transition hover:bg-[var(--color-gold-dim)]"
          href={formHref}
          rel={formHref.startsWith("http") ? "noreferrer" : undefined}
          target={formHref.startsWith("http") ? "_blank" : undefined}
        >
          Open
        </a>
      ) : (
        <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
          Add the form link in Vercel to turn this on.
        </p>
      )}
    </article>
  );
}
