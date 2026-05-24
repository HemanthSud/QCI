import Link from "next/link";

import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { siteMeta } from "@/lib/site-data";
import type { SeoLandingPage } from "@/lib/seo";

type SearchLandingPageProps = {
  page: SeoLandingPage;
};

function absoluteUrl(path: string) {
  return new URL(path, siteMeta.url).toString();
}

export function SearchLandingPage({ page }: SearchLandingPageProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(page.path)}#webpage`,
        url: absoluteUrl(page.path),
        name: page.metaTitle,
        description: page.metaDescription,
        isPartOf: {
          "@id": `${siteMeta.url}/#website`,
        },
        about: {
          "@id": `${siteMeta.url}/#organization`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(page.path)}#faq`,
        mainEntity: page.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${absoluteUrl(page.path)}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteMeta.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: absoluteUrl(page.path),
          },
        ],
      },
    ],
  };

  return (
    <>
      <PageHero
        actions={
          <>
            <ButtonLink href="/gallery">See QCI Perform</ButtonLink>
            <ButtonLink href="/support" variant="secondary">
              Support QCI
            </ButtonLink>
          </>
        }
        description={page.heroDescription}
        eyebrow={page.eyebrow}
        title={page.heroTitle}
      />

      <section className="py-8 sm:py-12">
        <Container className="space-y-10">
          <div className="reveal-on-scroll max-w-3xl" data-reveal>
            <p className="text-lg leading-9 text-[var(--color-muted)]">
              {page.intro}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {page.sections.map((section) => (
              <article key={section.title} className="section-card p-6 sm:p-7">
                <h2 className="font-display text-3xl leading-none text-[var(--color-cream)]">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-deep)] py-[4.5rem] sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            description={`${page.title} answers the searches people use for Queen City Ishaare, UNC Charlotte dance, and Charlotte Bollywood fusion performance.`}
            eyebrow="Search Questions"
            title="What people ask."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {page.faqs.map((item) => (
              <article key={item.question} className="section-card p-6">
                <h2 className="font-display text-3xl leading-none text-[var(--color-cream)]">
                  {item.question}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-[4.5rem] sm:py-20">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Explore QCI"
            title="Related pages."
          />
          <div className="flex flex-wrap gap-3">
            {page.relatedLinks.map((link) => (
              <Link
                key={link.href}
                className="border border-[var(--color-border)] px-4 py-3 font-accent text-[0.82rem] uppercase tracking-[0.2em] text-[var(--color-cream)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
