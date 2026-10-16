import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Studio } from "@/components/editor/Studio";

export const metadata: Metadata = {
  title: "Créer ta fiche de bac de français",
  description:
    "Remplis ta fiche d'explication linéaire ou de dissertation avec un aperçu en direct, puis télécharge-la en PDF ou en Word. Gratuit, sans inscription.",
  alternates: { canonical: "/fiches/" },
};

export default function FichesPage() {
  return (
    <>
      <Studio />
      <Footer />
    </>
  );
}
