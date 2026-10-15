import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/config/site";
import { asset } from "@/lib/asset";
import "@/components/salks/salks.css";
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
  title: { default: `${site.name} · Fiches de bac de français`, template: `%s · ${site.name}` },
  description: site.description,
  icons: { icon: asset("/img/favicon.svg") },
  openGraph: { title: `${site.name}. ${site.tagline}`, description: site.description, locale: "fr_FR", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#0e0d11",
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
