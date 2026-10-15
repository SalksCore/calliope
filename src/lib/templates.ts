/* Modèles d'export, partagés par l'aperçu, le PDF et le Word.
   Les couleurs sont pensées pour l'impression sur papier blanc. */

export type Rgb = [number, number, number];
export type TemplateKey = "calliope" | "classique" | "encre";

export type Template = {
  key: TemplateKey;
  name: string;
  description: string;
  /** police du texte et des titres */
  family: "sans" | "serif";
  /** surtitres en mono (Calliope, Encre) ou en serif gras (Classique) */
  label: "mono" | "serif";
  size: number;
  accent: Rgb;
  bar: Rgb;
  highlight: Rgb;
  band: boolean;
  gap: number;
  outline: boolean;
  docFont: string;
};

export const TEMPLATES: Record<TemplateKey, Template> = {
  calliope: {
    key: "calliope", name: "Calliope", description: "Les couleurs du projet, citations surlignées.",
    family: "sans", label: "mono", size: 10.5, accent: [91, 138, 20], bar: [185, 225, 92], highlight: [242, 248, 224],
    band: true, gap: 1, outline: false, docFont: "Calibri",
  },
  classique: {
    key: "classique", name: "Classique", description: "Sobre, en serif, comme une copie soignée.",
    family: "serif", label: "serif", size: 11, accent: [26, 23, 28], bar: [26, 23, 28], highlight: [240, 239, 241],
    band: false, gap: 1, outline: false, docFont: "Georgia",
  },
  encre: {
    key: "encre", name: "Encre", description: "Compact, noir et blanc, pour économiser la cartouche.",
    family: "sans", label: "mono", size: 9, accent: [26, 23, 28], bar: [26, 23, 28], highlight: [255, 255, 255],
    band: false, gap: 0.65, outline: true, docFont: "Calibri",
  },
};

export const TEMPLATE_LIST = Object.values(TEMPLATES);
export const rgb = (c: Rgb) => `rgb(${c[0]} ${c[1]} ${c[2]})`;
export const hex = (c: Rgb) => c.map((v) => v.toString(16).padStart(2, "0")).join("");
