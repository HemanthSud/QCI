"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth-context";
import { Container } from "@/components/ui";

const packList = [
  "Costume pieces",
  "Jewelry and accessories",
  "Performance shoes",
  "Makeup and hair supplies",
  "Team jacket or QCI gear",
  "Water bottle",
  "Snacks",
  "ID and payment card",
] as const;

const itinerary = [
  { time: "TBD", item: "Meet at pickup location" },
  { time: "TBD", item: "Travel / hotel check-in" },
  { time: "TBD", item: "Tech and spacing" },
  { time: "TBD", item: "Call time" },
  { time: "TBD", item: "Performance" },
] as const;

export default function CompDetailsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, router, user]);

  if (loading) {
    return (
      <section className="min-h-[70vh] py-20">
        <Container>
          <div className="section-card mx-auto max-w-xl p-8 text-center">
            <p className="font-accent text-[0.8rem] uppercase tracking-[0.28em] text-[var(--color-gold)]">
              Loading comp details
            </p>
          </div>
        </Container>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <section className="py-[4.5rem] sm:py-24">
        <Container className="space-y-8">
          <Link
            className="font-accent text-[0.82rem] uppercase tracking-[0.24em] text-[var(--color-gold)] hover:text-[var(--color-cream)]"
            href="/members"
          >
            Back to portal
          </Link>
          <div>
            <p className="font-accent text-[0.82rem] uppercase tracking-[0.32em] text-[var(--color-gold)]">
              Members
            </p>
            <h1 className="mt-4 font-display text-5xl leading-none text-[var(--color-cream)] sm:text-6xl">
              Comp details.
            </h1>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container className="grid gap-6 lg:grid-cols-2">
          <article className="section-card p-6 sm:p-8">
            <p className="font-accent text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-rose)]">
              Pack list
            </p>
            <ul className="mt-6 grid gap-3">
              {packList.map((item) => (
                <li key={item} className="border-b border-white/10 pb-3 text-sm text-[var(--color-muted)]">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="section-card p-6 sm:p-8">
            <p className="font-accent text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-rose)]">
              Itinerary
            </p>
            <div className="mt-6 grid gap-3">
              {itinerary.map((event) => (
                <div
                  key={event.item}
                  className="grid grid-cols-[4rem_1fr] gap-4 border-b border-white/10 pb-3 text-sm"
                >
                  <span className="font-semibold text-[var(--color-gold)]">{event.time}</span>
                  <span className="text-[var(--color-muted)]">{event.item}</span>
                </div>
              ))}
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
