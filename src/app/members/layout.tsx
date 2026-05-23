import type { Metadata } from "next";
import type { ReactNode } from "react";

import { createNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = createNoIndexMetadata(
  "Member Portal",
  "Private Queen City Ishaare member portal for team resources and updates.",
);

export default function MembersLayout({ children }: { children: ReactNode }) {
  return children;
}
