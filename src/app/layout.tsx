import type { Metadata } from "next";
import { Abril_Fatface, Bebas_Neue, DM_Sans } from "next/font/google";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SiteEffects } from "@/components/site-effects";
import { SiteRuntimeConfig } from "@/components/site-runtime-config";
import { AuthProvider } from "@/components/auth-context";
import { siteMeta } from "@/lib/site-data";
import { seoKeywords, siteStructuredData } from "@/lib/seo";

import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const abrilFatface = Abril_Fatface({
  variable: "--font-abril-fatface",
  subsets: ["latin"],
  weight: "400",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  applicationName: siteMeta.name,
  title: {
    default: `${siteMeta.name} | ${siteMeta.tagline}`,
    template: `%s | ${siteMeta.name}`,
  },
  description: siteMeta.description,
  keywords: [...seoKeywords],
  authors: [{ name: siteMeta.name, url: siteMeta.url }],
  creator: siteMeta.name,
  publisher: siteMeta.name,
  category: "Dance team",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: `${siteMeta.name} | ${siteMeta.tagline}`,
    description: siteMeta.description,
    url: "/",
    siteName: siteMeta.name,
    images: [
      {
        url: siteMeta.homeImage,
        width: 1200,
        height: 630,
        alt: `${siteMeta.name} dancers and crest`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteMeta.name} | ${siteMeta.tagline}`,
    description: siteMeta.description,
    images: [siteMeta.homeImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${dmSans.variable} ${abrilFatface.variable} ${bebasNeue.variable}`}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var theme=localStorage.getItem("qci-theme");if(theme==="light"){document.documentElement.dataset.theme="light";}}catch(error){}',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }}
        />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          <SiteEffects />
          <SiteRuntimeConfig />
          <div className="site-shell flex min-h-screen flex-col">
            <SiteHeader />
            <main className="relative z-10 flex-1">{children}</main>
            <SiteFooter />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
