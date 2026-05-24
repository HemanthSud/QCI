import type { Metadata } from "next";

import { SearchLandingPage } from "@/components/search-landing-page";
import { createPageMetadata, getSeoLandingPage } from "@/lib/seo";

const page = getSeoLandingPage("/qci");

export const metadata: Metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: page.path,
});

export default function QciPage() {
  return <SearchLandingPage page={page} />;
}
