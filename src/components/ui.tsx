import Link from "next/link";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

type ButtonLinkProps = {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const shared =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[0.18em] uppercase transition duration-300";
  const variants = {
    primary:
      "bg-[var(--color-flame)] text-[var(--color-night)] shadow-[0_20px_60px_rgba(255,106,61,0.28)] hover:-translate-y-0.5 hover:bg-[var(--color-gold)]",
    secondary:
      "border border-black/10 bg-white/70 text-[var(--color-night)] backdrop-blur hover:-translate-y-0.5 hover:border-[var(--color-flame)] hover:bg-white",
    ghost:
      "text-[var(--color-night)] hover:bg-white/60",
  };

  const classes = `${shared} ${variants[variant]} ${className}`;
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        className={classes}
        href={href}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      <span className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ember)] shadow-[0_16px_40px_rgba(22,20,25,0.08)]">
        {eyebrow}
      </span>
      <h2 className="font-display text-4xl leading-none tracking-[-0.04em] text-[var(--color-night)] sm:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <Container>
        <div className="glass-panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,181,84,0.45),_transparent_65%)]" />
          <div className="relative flex max-w-4xl flex-col gap-6">
            <span className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ember)] w-fit">
              {eyebrow}
            </span>
            <h1 className="font-display text-5xl leading-[0.94] tracking-[-0.05em] text-[var(--color-night)] sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              {description}
            </p>
            {actions ? <div className="flex flex-wrap gap-3 pt-2">{actions}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
