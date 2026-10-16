import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Studio } from "@/components/editor/Studio";

export const metadata: Metadata = {
  title: "Créer ta fiche d'explication linéaire ou de dissertation",
  description:
    "Remplis ta fiche du bac de français (explication linéaire pour l'oral, dissertation sur l'œuvre intégrale) avec un aperçu en direct, puis télécharge-la en PDF ou en Word. Gratuit, sans inscription.",
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
