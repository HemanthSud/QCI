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
  return <div className={`mx-auto w-full max-w-[1100px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const shared =
    "inline-flex items-center justify-center px-6 py-3 font-accent text-[0.95rem] uppercase tracking-[0.2em] transition duration-200";
  const variants = {
    primary:
      "bg-[var(--color-red)] text-[var(--color-cream)] shadow-[0_12px_32px_rgba(200,16,46,0.3)] [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(200,16,46,0.4)]",
    secondary:
      "border border-[var(--color-gold)] bg-transparent text-[var(--color-gold)] hover:-translate-y-0.5 hover:bg-[var(--color-gold-dim)] hover:shadow-[0_16px_36px_rgba(212,175,55,0.15)]",
    ghost:
      "text-[var(--color-cream)] hover:text-[var(--color-gold)]",
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
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment} reveal-on-scroll`} data-reveal>
      <span className="font-accent text-[0.8rem] uppercase tracking-[0.32em] text-[var(--color-red)]">
        {eyebrow}
      </span>
      <h2 className="text-balance break-words font-display text-5xl leading-[1.02] text-[var(--color-cream)] sm:text-6xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-[1.05rem]">
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
    <section className="relative overflow-hidden py-[4.5rem] sm:py-24">
      <Container>
        <div className="page-hero-shell reveal-on-scroll" data-reveal>
          <div className="relative flex max-w-4xl flex-col gap-6">
            <span className="font-accent text-[0.82rem] uppercase tracking-[0.32em] text-[var(--color-gold)]">
              {eyebrow}
            </span>
            <h1 className="text-balance break-words font-display text-5xl leading-[0.98] text-[var(--color-cream)] sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              {description}
            </p>
            {actions ? <div className="flex flex-wrap gap-4 pt-2">{actions}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
