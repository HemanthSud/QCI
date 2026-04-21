"use client";

import { useState } from "react";

import { siteMeta } from "@/lib/site-data";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "opening">("idle");

  return (
    <form
      className="section-card grid gap-4 p-6 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const interest = String(formData.get("interest") ?? "").trim();
        const message = String(formData.get("message") ?? "").trim();

        const subject = encodeURIComponent(
          interest ? `QCI Inquiry | ${interest}` : "QCI Website Inquiry",
        );
        const body = encodeURIComponent(
          [
            `Name: ${name || "Not provided"}`,
            `Email: ${email || "Not provided"}`,
            `Interest: ${interest || "General inquiry"}`,
            "",
            message || "Hello QCI,",
          ].join("\n"),
        );

        setStatus("opening");
        window.location.href = `mailto:${siteMeta.email}?subject=${subject}&body=${body}`;
        window.setTimeout(() => setStatus("idle"), 1200);
      }}
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-rose)]">
          Contact form
        </p>
        <h3 className="font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-night)] sm:text-4xl">
          Book the team, ask about sponsorships, or start a conversation.
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Name
          </span>
          <input className="field-control" name="name" placeholder="Your name" type="text" />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Email
          </span>
          <input
            className="field-control"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
          What is this for?
        </span>
        <input
          className="field-control"
          name="interest"
          placeholder="Booking, sponsorship, media, collaboration..."
          type="text"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Message
        </span>
        <textarea
          className="field-control min-h-36 resize-y"
          name="message"
          placeholder="Tell QCI what you're planning."
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-[var(--color-muted)]">
          This opens your email app with the message prefilled to {siteMeta.email}.
        </p>
        <button
          className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-flame),var(--color-ember))] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)] shadow-[0_20px_60px_rgba(255,59,48,0.28)] transition hover:-translate-y-0.5 hover:brightness-110"
          type="submit"
        >
          {status === "opening" ? "Opening..." : "Send inquiry"}
        </button>
      </div>
    </form>
  );
}
