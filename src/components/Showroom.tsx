"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { exampleDissert, exampleEL } from "@/lib/fiche";
import { TEMPLATE_LIST, rgb, type TemplateKey } from "@/lib/templates";
import { TemplatePreview } from "./TemplatePreview";

/** Vitrine : les trois modèles appliqués en direct à une fiche d'exemple. */
export function Showroom() {
  const [template, setTemplate] = useState<TemplateKey>("calliope");
  const [mode, setMode] = useState<"el" | "dissert">("el");
  const fiche = useMemo(() => (mode === "el" ? exampleEL() : exampleDissert()), [mode]);

  return (
    <div className="showroom">
      <div className="controls">
        <div className="segmented" role="group" aria-label="Fiche d'exemple">
          <button type="button" aria-pressed={mode === "el"} onClick={() => setMode("el")}>Explication linéaire</button>
          <button type="button" aria-pressed={mode === "dissert"} onClick={() => setMode("dissert")}>Dissertation</button>
        </div>
        <div className="tpl-cards" role="group" aria-label="Modèle">
          {TEMPLATE_LIST.map((t) => (
            <button key={t.key} type="button" className="tpl-card" aria-pressed={template === t.key} onClick={() => setTemplate(t.key)}>
              <b><i style={{ background: rgb(t.bar) }} />{t.name}</b>
              <span>{t.description}</span>
            </button>
          ))}
        </div>
        <p className="faint">L&apos;aperçu te donne une idée du rendu final de ta fiche.</p>
        <Link className="btn primary" href="/fiches/">Essayer avec mon texte</Link>
      </div>
      <div className="stage">
        <TemplatePreview fiche={fiche} template={template} />
      </div>
    </div>
  );
}
