import type { Metadata } from "next";
import { Abril_Fatface, Bebas_Neue, DM_Sans } from "next/font/google";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SiteEffects } from "@/components/site-effects";
import { AuthProvider } from "@/components/auth-context";
import { siteMeta } from "@/lib/site-data";

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
  title: {
    default: `${siteMeta.name} | ${siteMeta.tagline}`,
    template: `%s | ${siteMeta.name}`,
  },
  description: siteMeta.description,
  openGraph: {
    title: `${siteMeta.name} | ${siteMeta.tagline}`,
    description: siteMeta.description,
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
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          <SiteEffects />
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
