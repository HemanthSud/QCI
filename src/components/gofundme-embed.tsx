import { ButtonLink } from "@/components/ui";
import { siteMeta } from "@/lib/site-data";

export function GoFundMeEmbed() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div className="reveal-on-scroll" data-reveal>
        <p className="font-accent text-[0.8rem] uppercase tracking-[0.3em] text-[var(--color-gold)]">
          Season Fund
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[1.02] text-[var(--color-cream)] sm:text-6xl">
          Fuel Queen City Ishaare&apos;s competition season.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-muted)]">
          Donations help cover the real costs behind a student-run performance season:
          competition fees, travel, lodging, costumes, props, and the production work that gets QCI
          stage-ready.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href={siteMeta.donateUrl}>Donate on GoFundMe</ButtonLink>
          <ButtonLink href={`mailto:${siteMeta.email}`} variant="secondary">
            Ask About Sponsorship
          </ButtonLink>
        </div>
      </div>

      <div
        className="section-card reveal-on-scroll reveal-delay-1 overflow-hidden p-3 sm:p-4"
        data-reveal
      >
        <div className="overflow-hidden bg-black">
          <iframe
            className="h-[34rem] w-full border-0 sm:h-[42rem]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={siteMeta.donateUrl}
            title="Queen City Ishaare GoFundMe campaign"
          />
        </div>
        <p className="px-2 pt-4 text-sm leading-7 text-[var(--color-muted)]">
          If the GoFundMe preview does not load in your browser, use the donate button to open the
          campaign directly.
        </p>
      </div>
    </div>
  );
}
