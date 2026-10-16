import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/config/site";
import { asset } from "@/lib/asset";
import { KEYWORDS, SEO_DESCRIPTION, SEO_TITLE } from "@/config/seo";
import { ROBOTS_META } from "@/components/salks/seo";
import "@/components/salks/salks.css";
import "@/components/salks/vitrine.css";
import "./globals.css";
import { SalksAnalytics } from "@/components/salks/SalksAnalytics";

const jakarta = localFont({
  src: [
    { path: "../fonts/plus-jakarta-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/plus-jakarta-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/plus-jakarta-sans-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});
const mono = localFont({
  src: "../fonts/jetbrains-mono-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-jb",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "../fonts/source-serif-4-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/source-serif-4-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: SEO_TITLE, template: `%s · ${site.name}` },
  description: SEO_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: site.name,
  category: "education",
  authors: [{ name: site.author.name, url: "https://salks.me" }],
  creator: site.author.name,
  alternates: { canonical: "/" },
  robots: ROBOTS_META,
  icons: { icon: asset("/img/favicon.svg") },
  openGraph: { title: SEO_TITLE, description: SEO_DESCRIPTION, url: "/", siteName: site.name, locale: "fr_FR", type: "website" },
  twitter: { card: "summary", title: SEO_TITLE, description: SEO_DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* Applique le thème choisi (ou celui du système) avant le premier rendu. */
const themeScript = `(function(){try{var t=localStorage.getItem("calliope-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="dark" className={`${jakarta.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <SalksAnalytics site="calliope" />
      </body>
    </html>
  );
}
