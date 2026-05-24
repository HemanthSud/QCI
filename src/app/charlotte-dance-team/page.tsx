import type { Metadata } from "next";

import { SearchLandingPage } from "@/components/search-landing-page";
import { createPageMetadata, getSeoLandingPage } from "@/lib/seo";

const page = getSeoLandingPage("/charlotte-dance-team");

export const metadata: Metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: page.path,
});

export default function CharlotteDanceTeamPage() {
  return <SearchLandingPage page={page} />;
}
