import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { siteMeta } from "@/lib/site-data";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteMeta.name} | UNC Charlotte Bollywood-Fusion Team`,
    template: `%s | ${siteMeta.name}`,
  },
  description: siteMeta.description,
  openGraph: {
    title: `${siteMeta.name} | UNC Charlotte Bollywood-Fusion Team`,
    description: siteMeta.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${spaceGrotesk.variable} ${syne.variable}`} lang="en">
      <body>
        <div className="page-gradient flex min-h-screen flex-col">
          <SiteHeader />
          <main className="relative z-10 flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
