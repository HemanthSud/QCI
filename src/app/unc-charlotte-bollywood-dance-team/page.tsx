import type { Metadata } from "next";

import { SearchLandingPage } from "@/components/search-landing-page";
import { createPageMetadata, getSeoLandingPage } from "@/lib/seo";

const page = getSeoLandingPage("/unc-charlotte-bollywood-dance-team");

export const metadata: Metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: page.path,
});

export default function UncCharlotteBollywoodDanceTeamPage() {
  return <SearchLandingPage page={page} />;
}
