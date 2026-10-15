"use client";

import { useRef, useState } from "react";
import { ROMAN, emptyCitation, emptyMouvement, type FicheDissert, type FicheEL } from "@/lib/fiche";
import { AddButton, AutoText, Block, RemoveButton, TextField } from "./fields";

type Edit<F> = (fn: (draft: F) => void) => void;

function SheetHead({ kicker, title, placeholder, onTitle, children, side }: {
  kicker: string; title: string; placeholder: string; onTitle: (v: string) => void; children: React.ReactNode; side?: React.ReactNode;
}) {
  return (
    <section className="sheet-head">
      <div className="inner">
        <div>
          <span className="kicker"><i />{kicker}</span>
          <input type="text" className="title-input" id="i-titre" value={title} placeholder={placeholder} aria-label="Titre de la fiche" onChange={(e) => onTitle(e.target.value)} />
          <div className="meta-grid">{children}</div>
        </div>
        {side}
      </div>
    </section>
  );
}

/* ─────────────────────────── Explication linéaire ─────────────────────────── */
export function ElForm({ f, edit }: { f: FicheEL; edit: Edit<FicheEL> }) {
  return (
    <>
      <SheetHead kicker={"Explication linéaire" + (f.numero ? " · " + f.numero : "")} title={f.titre} placeholder="Titre du texte" onTitle={(v) => edit((d) => { d.titre = v; })}>
        <TextField id="i-auteur" label="Auteur" value={f.auteur} placeholder="Victor Hugo" onChange={(v) => edit((d) => { d.auteur = v; })} />
        <TextField id="i-oeuvre" label="Œuvre" value={f.oeuvre} placeholder="Les Contemplations (1856)" onChange={(v) => edit((d) => { d.oeuvre = v; })} />
        <TextField id="i-parcours" label="Parcours" value={f.parcours} placeholder="Les Mémoires d'une âme" onChange={(v) => edit((d) => { d.parcours = v; })} />
        <TextField id="i-numero" label="Numéro" value={f.numero} placeholder="Texte 2" onChange={(v) => edit((d) => { d.numero = v; })} />
      </SheetHead>

      <Block n={1} title="Introduction" hint="Colle ton introduction : auteur et œuvre, situation du passage, lecture, problématique, annonce des mouvements.">
        <AutoText id="t-intro" ariaLabel="Introduction" big rows={6} value={f.intro} placeholder="Colle ton introduction ici…" onChange={(v) => edit((d) => { d.intro = v; })} />
      </Block>

      <Block n={2} title="Problématique">
        <AutoText id="t-pb" ariaLabel="Problématique" rows={1} value={f.problematique} placeholder="Comment… ? En quoi… ?" onChange={(v) => edit((d) => { d.problematique = v; })} />
      </Block>

      <Block n={3} title="Explication" hint="Un bloc par mouvement. Pour chaque citation : les procédés, puis ton analyse.">
        {f.mouvements.map((m, i) => (
          <div className="mvt" key={i}>
            <div className="mvt-head">
              <span className="roman">{ROMAN[i] || i + 1}</span>
              <input type="text" id={`mt${i}`} value={m.titre} placeholder="Titre du mouvement" aria-label={`Titre du mouvement ${i + 1}`} onChange={(e) => edit((d) => { d.mouvements[i].titre = e.target.value; })} />
              <input type="text" id={`ml${i}`} className="lines" value={m.lignes} placeholder="l. 1 à 8" aria-label="Lignes ou vers" onChange={(e) => edit((d) => { d.mouvements[i].lignes = e.target.value; })} />
              <RemoveButton label="Supprimer ce mouvement" onClick={() => edit((d) => { d.mouvements.splice(i, 1); })} />
            </div>
            <div className="stack">
              {m.citations.map((c, j) => (
                <div className="cit" key={j}>
                  <div className="body">
                    <AutoText id={`c${i}-${j}`} label="Citation" quote value={c.citation} placeholder="Colle ou recopie la citation…" onChange={(v) => edit((d) => { d.mouvements[i].citations[j].citation = v; })} />
                    <AutoText id={`p${i}-${j}`} label="Procédés" rows={1} value={c.procede} placeholder="Anaphore, métaphore, rythme ternaire…" onChange={(v) => edit((d) => { d.mouvements[i].citations[j].procede = v; })} />
                    <AutoText id={`a${i}-${j}`} label="Analyse" value={c.analyse} placeholder="L'effet produit, ce qu'il montre, le lien avec la problématique…" onChange={(v) => edit((d) => { d.mouvements[i].citations[j].analyse = v; })} />
                  </div>
                  <RemoveButton label="Retirer cette citation" onClick={() => edit((d) => { d.mouvements[i].citations.splice(j, 1); })} />
                </div>
              ))}
              <AddButton onClick={() => edit((d) => { d.mouvements[i].citations.push(emptyCitation()); })}>Ajouter une citation</AddButton>
            </div>
          </div>
        ))}
        <AddButton onClick={() => edit((d) => { d.mouvements.push(emptyMouvement()); })}>Ajouter un mouvement</AddButton>
      </Block>

      <Block n={4} title="Conclusion" hint="Colle ta conclusion : le bilan qui répond à la problématique, puis l'ouverture.">
        <AutoText id="t-conclusion" ariaLabel="Conclusion" big rows={5} value={f.conclusion} placeholder="Colle ta conclusion ici…" onChange={(v) => edit((d) => { d.conclusion = v; })} />
        <AutoText id="t-ouverture" label="Ouverture" value={f.ouverture} placeholder="Rapprochement avec une autre œuvre…" onChange={(v) => edit((d) => { d.ouverture = v; })} />
      </Block>

      <Block n={5} title="Question de grammaire">
        <AutoText id="t-gq" label="Question" rows={1} value={f.grammaireQ} placeholder="Analysez la proposition subordonnée…" onChange={(v) => edit((d) => { d.grammaireQ = v; })} />
        <AutoText id="t-gr" label="Réponse" rows={3} value={f.grammaireR} placeholder="Ta réponse rédigée…" onChange={(v) => edit((d) => { d.grammaireR = v; })} />
      </Block>

      <Block n={6} title="Texte et notes" hint="Facultatif : le texte complet et ce que tu veux retenir.">
        <AutoText id="t-texte" label="Texte" rows={4} value={f.texte} placeholder="Colle le texte étudié…" onChange={(v) => edit((d) => { d.texte = v; })} />
        <AutoText id="t-notes" label="Notes" rows={3} value={f.notes} placeholder="Remarques du prof, pièges, questions possibles…" onChange={(v) => edit((d) => { d.notes = v; })} />
      </Block>
    </>
  );
}

/* ─────────────────────────── Dissertation ─────────────────────────── */
async function readCover(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const s = Math.min(1, 560 / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return { photo: c.toDataURL("image/jpeg", 0.8), w: c.width, h: c.height };
  } finally { URL.revokeObjectURL(url); }
}

function Cover({ f, edit, onError }: { f: FicheDissert; edit: Edit<FicheDissert>; onError: (m: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const take = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return onError("Choisis une image (JPG, PNG, WebP).");
    try { const r = await readCover(file); edit((d) => { d.photo = r.photo; d.photoW = r.w; d.photoH = r.h; }); }
    catch { onError("Cette image n'a pas pu être lue. Essaie un JPG ou un PNG."); }
  };
  const pick = () => input.current?.click();
  return (
    <div className="cover">
      <div role="button" tabIndex={0} aria-label={f.photo ? "Changer la photo du livre" : "Ajouter la photo du livre"}
        className={`cover-box${f.photo ? " has" : ""}${drag ? " drag" : ""}`}
        onClick={pick} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } }}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); take(e.dataTransfer.files[0]); }}>
        {f.photo
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={f.photo} alt="Couverture du livre" />
          : <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="9" cy="9" r="2" /><path d="m21 15-5-5L5 21" /></svg>Photo du livre<br /><span className="faint">clic ou glisser</span></span>}
      </div>
      {f.photo && (
        <div className="row">
          <button className="btn ghost small" type="button" onClick={pick}>Changer</button>
          <button className="btn ghost small" type="button" onClick={() => edit((d) => { d.photo = ""; d.photoW = 0; d.photoH = 0; })}>Retirer</button>
        </div>
      )}
      <input ref={input} type="file" accept="image/*" hidden onChange={(e) => { take(e.target.files?.[0]); e.target.value = ""; }} />
    </div>
  );
}

export function DissertForm({ f, edit, onError }: { f: FicheDissert; edit: Edit<FicheDissert>; onError: (m: string) => void }) {
  return (
    <>
      <SheetHead kicker="Dissertation" title={f.titre} placeholder="Titre de l'œuvre" onTitle={(v) => edit((d) => { d.titre = v; })} side={<Cover f={f} edit={edit} onError={onError} />}>
        <TextField id="i-oeuvre" label="Œuvre" value={f.oeuvre} placeholder="Les Fleurs du mal" onChange={(v) => edit((d) => { d.oeuvre = v; })} />
        <TextField id="i-auteur" label="Auteur" value={f.auteur} placeholder="Charles Baudelaire" onChange={(v) => edit((d) => { d.auteur = v; })} />
        <TextField id="i-annee" label="Parution" value={f.annee} placeholder="1857" onChange={(v) => edit((d) => { d.annee = v; })} />
        <TextField id="i-genre" label="Genre" value={f.genre} placeholder="Poésie" onChange={(v) => edit((d) => { d.genre = v; })} />
        <TextField id="i-mouvement" label="Mouvement" value={f.mouvement} placeholder="Symbolisme" onChange={(v) => edit((d) => { d.mouvement = v; })} />
        <TextField id="i-parcours" label="Parcours" value={f.parcours} placeholder="Alchimie poétique" onChange={(v) => edit((d) => { d.parcours = v; })} />
      </SheetHead>

      <Block n={1} title="L'auteur" hint="Ce qui, dans sa vie, éclaire l'œuvre.">
        <AutoText id="t-bio" ariaLabel="Biographie" rows={4} value={f.bio} placeholder="Né en…, il…" onChange={(v) => edit((d) => { d.bio = v; })} />
      </Block>
      <Block n={2} title="Contexte" hint="Contexte historique et littéraire, réception de l'œuvre.">
        <AutoText id="t-contexte" ariaLabel="Contexte" rows={3} value={f.contexte} placeholder="Publication, scandale, mouvement…" onChange={(v) => edit((d) => { d.contexte = v; })} />
      </Block>
      <Block n={3} title="L'œuvre">
        <AutoText id="t-resume" label="Résumé et structure" rows={4} value={f.resume} placeholder="Structure, grandes étapes…" onChange={(v) => edit((d) => { d.resume = v; })} />
        <div className="grid2">
          <AutoText id="t-themes" label="Thèmes" value={f.themes} placeholder="Thèmes principaux…" onChange={(v) => edit((d) => { d.themes = v; })} />
          <AutoText id="t-perso" label="Personnages et figures" value={f.personnages} placeholder="Personnages ou figures clés…" onChange={(v) => edit((d) => { d.personnages = v; })} />
        </div>
      </Block>
      <Block n={4} title="Citations clés" hint="Les citations à connaître, avec leur référence et leur usage en dissertation.">
        {f.citations.map((c, j) => (
          <div className="cit" key={j}>
            <div className="body">
              <AutoText id={`dc${j}`} label="Citation" quote value={c.citation} placeholder="La citation…" onChange={(v) => edit((d) => { d.citations[j].citation = v; })} />
              <div className="grid2">
                <TextField id={`dr${j}`} label="Référence" value={c.ref} placeholder="« L'Albatros », p. 12" onChange={(v) => edit((d) => { d.citations[j].ref = v; })} />
                <TextField id={`dt${j}`} label="Thème" value={c.theme} placeholder="Le poète maudit" onChange={(v) => edit((d) => { d.citations[j].theme = v; })} />
              </div>
              <AutoText id={`da${j}`} label="Analyse et usage" value={c.analyse} placeholder="Ce que la citation montre, dans quelle partie l'utiliser…" onChange={(v) => edit((d) => { d.citations[j].analyse = v; })} />
            </div>
            <RemoveButton label="Retirer cette citation" onClick={() => edit((d) => { d.citations.splice(j, 1); })} />
          </div>
        ))}
        <AddButton onClick={() => edit((d) => { d.citations.push({ citation: "", ref: "", theme: "", analyse: "" }); })}>Ajouter une citation</AddButton>
      </Block>
      <Block n={5} title="Sujets et plans" hint="Les sujets probables et leurs plans détaillés.">
        {f.sujets.map((s, j) => (
          <div className="cit" key={j}>
            <div className="body">
              <AutoText id={`ss${j}`} label="Sujet" rows={1} value={s.sujet} placeholder="Dans quelle mesure… ?" onChange={(v) => edit((d) => { d.sujets[j].sujet = v; })} />
              <AutoText id={`sp${j}`} label="Plan" rows={3} value={s.plan} placeholder={"I. …\nII. …\nIII. …"} onChange={(v) => edit((d) => { d.sujets[j].plan = v; })} />
            </div>
            <RemoveButton label="Retirer ce sujet" onClick={() => edit((d) => { d.sujets.splice(j, 1); })} />
          </div>
        ))}
        <AddButton onClick={() => edit((d) => { d.sujets.push({ sujet: "", plan: "" }); })}>Ajouter un sujet</AddButton>
      </Block>
      <Block n={6} title="Notes">
        <AutoText id="t-notes" ariaLabel="Notes" rows={3} value={f.notes} placeholder="Arguments, exemples d'autres œuvres, remarques du prof…" onChange={(v) => edit((d) => { d.notes = v; })} />
      </Block>
    </>
  );
}
