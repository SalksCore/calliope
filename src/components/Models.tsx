"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { exampleDissert, exampleEL } from "@/lib/fiche";
import { TEMPLATE_LIST, rgb, type TemplateKey } from "@/lib/templates";
import { TemplatePreview } from "./TemplatePreview";

/** Les modèles appliqués en direct à une fiche d'exemple. */
export function Models() {
  const [template, setTemplate] = useState<TemplateKey>("calliope");
  const [mode, setMode] = useState<"el" | "dissert">("el");
  const fiche = useMemo(() => (mode === "el" ? exampleEL() : exampleDissert()), [mode]);

  return (
    <div className="v-models">
      <div className="v-models-side">
        <div className="v-tabs" role="group" aria-label="Fiche d'exemple">
          <button type="button" aria-pressed={mode === "el"} onClick={() => setMode("el")}>Explication linéaire</button>
          <button type="button" aria-pressed={mode === "dissert"} onClick={() => setMode("dissert")}>Dissertation</button>
        </div>
        <ul className="v-tpl" role="group" aria-label="Modèle">
          {TEMPLATE_LIST.map((t) => (
            <li key={t.key}>
              <button type="button" aria-pressed={template === t.key} onClick={() => setTemplate(t.key)}>
                <i style={{ background: rgb(t.bar) }} aria-hidden="true" />
                <b>{t.name}</b>
                <span>{t.description}</span>
              </button>
            </li>
          ))}
        </ul>
        <Link className="v-link" href="/fiches/">Essayer avec mon texte <span aria-hidden="true">→</span></Link>
      </div>
      <div className="v-models-stage">
        <TemplatePreview fiche={fiche} template={template} />
      </div>
    </div>
  );
}
