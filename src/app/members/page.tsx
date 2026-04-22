"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth-context";
import { Container } from "@/components/ui";
import { elevatedMemberProfiles, isElevatedMember } from "@/lib/authz";
import { siteMeta } from "@/lib/site-data";
import { getSupabaseClient } from "@/lib/supabase-client";

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

const elevatedDashboardStats = [
  {
    label: "Access tier",
    value: "Elevated",
    detail: "Elevated dashboard enabled for this account.",
  },
  {
    label: "Portal",
    value: "Live",
    detail: "Member links, forms, and comp details are ready from one place.",
  },
  {
    label: "Ops focus",
    value: "QCI",
    detail: "Quick view for team logistics, fundraising, and production work.",
  },
] as const;

const elevatedFocusItems = [
  "Check upcoming competition details before team travel.",
  "Keep fundraising and production point categories visible.",
  "Use the team inbox for urgent portal updates or form changes.",
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
  const profileName =
    typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name.trim() : "";
  const isElevated = isElevatedMember(user);
  const memberName = isElevated
    ? elevatedMemberProfiles.hemanth.displayName
    : profileName || user.email;

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

      {isElevated ? <ElevatedMemberDashboard email={user.email ?? ""} /> : null}

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

type ElevatedMemberDashboardProps = {
  email: string;
};

function ElevatedMemberDashboard({ email }: ElevatedMemberDashboardProps) {
  const formHref = absenceFormUrl || `mailto:${siteMeta.email}?subject=Absence%20Form`;
  const [uploadError, setUploadError] = useState("");
  const [uploadNotice, setUploadNotice] = useState("");
  const [uploading, setUploading] = useState(false);

  return (
    <section className="pb-20 sm:pb-24">
      <Container className="space-y-8">
        <div className="section-card overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="bg-[linear-gradient(135deg,rgba(200,16,46,0.28),rgba(212,175,55,0.12),rgba(8,8,8,0.15))] p-6 sm:p-8">
              <p className="font-accent text-[0.78rem] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                Elevated access
              </p>
              <h2 className="mt-4 font-display text-4xl leading-none text-[var(--color-cream)] sm:text-5xl">
                Hemanth dashboard.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                A dedicated view for Hemanth Sudhaharan with the portal shortcuts and team ops
                context that matter most.
              </p>
              <p className="mt-6 break-words text-sm font-semibold text-[var(--color-gold)]">
                {email || elevatedMemberProfiles.hemanth.email}
              </p>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
              {elevatedDashboardStats.map((item) => (
                <article
                  className="border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-5"
                  key={item.label}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    {item.label}
                  </p>
                  <p className="mt-3 font-display text-4xl leading-none text-[var(--color-night)]">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <article className="section-card p-6 sm:p-8">
            <p className="font-accent text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-rose)]">
              Priority board
            </p>
            <div className="mt-6 grid gap-4">
              {elevatedFocusItems.map((item, index) => (
                <div
                  className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-white/10 pb-4 text-sm"
                  key={item}
                >
                  <span className="font-display text-3xl leading-none text-[var(--color-gold)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="leading-7 text-[var(--color-muted-strong)]">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="section-card p-6 sm:p-8">
            <p className="font-accent text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-rose)]">
              Fast lane
            </p>
            <div className="mt-6 grid gap-3">
              <Link
                className="border border-[var(--color-border)] px-4 py-3 font-accent text-[0.9rem] uppercase tracking-[0.18em] text-[var(--color-gold)] transition hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-dim)]"
                href="/members/comp"
              >
                Comp details
              </Link>
              <a
                className="border border-[var(--color-border)] px-4 py-3 font-accent text-[0.9rem] uppercase tracking-[0.18em] text-[var(--color-gold)] transition hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-dim)]"
                href={formHref}
                rel={formHref.startsWith("http") ? "noreferrer" : undefined}
                target={formHref.startsWith("http") ? "_blank" : undefined}
              >
                Absence form
              </a>
              <a
                className="border border-[var(--color-border)] px-4 py-3 font-accent text-[0.9rem] uppercase tracking-[0.18em] text-[var(--color-gold)] transition hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-dim)]"
                href={`mailto:${siteMeta.email}?subject=Member%20Portal%20Update`}
              >
                Email team inbox
              </a>
            </div>
          </article>
        </div>

        <article className="section-card p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-center">
            <div>
              <p className="font-accent text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-rose)]">
                Gallery upload
              </p>
              <h3 className="mt-4 font-display text-4xl leading-none text-[var(--color-night)]">
                Add to the gallery.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                Uploaded images publish to Hemanth&apos;s carousel on the public gallery page.
              </p>
            </div>

            <form
              className="grid gap-4"
              onSubmit={async (event) => {
                event.preventDefault();
                setUploadError("");
                setUploadNotice("");

                const formData = new FormData(event.currentTarget);
                const image = formData.get("image");

                if (!(image instanceof File) || image.size === 0) {
                  setUploadError("Choose an image before uploading.");
                  return;
                }

                if (image.size > 8 * 1024 * 1024) {
                  setUploadError("Choose an image under 8 MB.");
                  return;
                }

                setUploading(true);

                try {
                  const supabase = getSupabaseClient();
                  const {
                    data: { session },
                    error,
                  } = await supabase.auth.getSession();

                  if (error || !session?.access_token) {
                    throw new Error("Sign in again before uploading.");
                  }

                  const uploadFormData = new FormData();
                  uploadFormData.append("image", image);

                  const response = await fetch("/api/gallery/elevated", {
                    body: uploadFormData,
                    headers: {
                      Authorization: `Bearer ${session.access_token}`,
                    },
                    method: "POST",
                  });
                  const result = await response.json().catch(() => null);

                  if (!response.ok) {
                    throw new Error(
                      typeof result?.error === "string"
                        ? result.error
                        : "Image could not be uploaded.",
                    );
                  }

                  event.currentTarget.reset();
                  setUploadNotice("Image uploaded to the gallery carousel.");
                } catch (err) {
                  setUploadError(err instanceof Error ? err.message : "Image could not be uploaded.");
                } finally {
                  setUploading(false);
                }
              }}
            >
              <input
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="w-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[var(--color-muted-strong)] file:mr-4 file:border-0 file:bg-[var(--color-red)] file:px-4 file:py-2 file:font-accent file:text-xs file:uppercase file:tracking-[0.16em] file:text-[var(--color-on-red)]"
                name="image"
                type="file"
              />
              <button
                className="inline-flex items-center justify-center bg-[var(--color-red)] px-6 py-3 font-accent text-[0.95rem] uppercase tracking-[0.2em] text-[var(--color-on-red)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)]"
                disabled={uploading}
                type="submit"
              >
                {uploading ? "Uploading" : "Upload image"}
              </button>
              {uploadNotice ? (
                <p className="text-sm font-semibold text-[var(--color-gold)]">{uploadNotice}</p>
              ) : null}
              {uploadError ? (
                <p className="text-sm font-semibold text-[var(--color-rose)]">{uploadError}</p>
              ) : null}
            </form>
          </div>
        </article>
      </Container>
    </section>
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
