import type { NextConfig } from "next";

// Site 100 % statique : `next build` produit le dossier `out/`, publié sur Cloudflare Pages.
// NEXT_PUBLIC_BASE_PATH sert seulement si le site est servi dans un sous-dossier.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
