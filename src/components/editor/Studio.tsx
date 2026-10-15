"use client";

import Link from "next/link";
import { useCallback, useDeferredValue, useEffect, useRef, useState } from "react";
import { PantheonLayer } from "@/components/Pantheon";
import { TemplatePreview } from "@/components/TemplatePreview";
import { Topbar } from "@/components/Topbar";
import { titleOf } from "@/lib/blocks";
import { saveFile } from "@/lib/download";
import { exampleDissert, exampleEL, newDissert, newEL, normalize, type Fiche } from "@/lib/fiche";
import { TEMPLATES, TEMPLATE_LIST, type TemplateKey } from "@/lib/templates";
import { DissertForm, ElForm } from "./Forms";

const KEY = "calliope.fiches.v1";
const PREF = "calliope.prefs.v1";

type Toast = { id: number; text: string; err?: boolean };

export function Studio() {
  const [ready, setReady] = useState(false);
  const [fiches, setFiches] = useState<Record<string, Fiche>>({});
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [template, setTemplate] = useState<TemplateKey>("calliope");
  const [view, setView] = useState<"fiche" | "apercu">("fiche");
  const [navOpen, setNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState<"pdf" | "docx" | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [storageOk, setStorageOk] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const openInput = useRef<HTMLInputElement>(null);

  const toast = useCallback((text: string, err = false) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, err }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  /* Chargement depuis le navigateur (jamais côté serveur). */
  useEffect(() => {
    let loaded: Record<string, Fiche> = {};
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) for (const v of Object.values(JSON.parse(raw) as Record<string, unknown>)) { const f = normalize(v); if (f) loaded[f.id] = f; }
      const p = JSON.parse(localStorage.getItem(PREF) || "{}");
      if (p.template && p.template in TEMPLATES) setTemplate(p.template);
    } catch { setStorageOk(false); loaded = {}; }
    const hash = decodeURIComponent(location.hash.slice(1));
    let open: string | null = null;
    if (hash === "el" || hash === "dissert") { const f = hash === "el" ? newEL() : newDissert(); loaded[f.id] = f; open = f.id; }
    else if (hash && loaded[hash]) open = hash;
    setFiches(loaded); setCurrentId(open); setReady(true);
  }, []);

  /* Sauvegarde locale, un peu après la dernière frappe. */
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify(fiches)); setStorageOk(true); }
      catch { setStorageOk(false); }
    }, 350);
    return () => clearTimeout(t);
  }, [fiches, ready]);

  useEffect(() => {
    if (!ready) return;
    try { history.replaceState(null, "", currentId ? `#${currentId}` : location.pathname); } catch { /* ignoré */ }
  }, [currentId, ready]);

  const current = currentId ? fiches[currentId] : undefined;
  const deferred = useDeferredValue(current);

  const edit = useCallback(<F extends Fiche>(fn: (d: F) => void) => {
    setFiches((all) => {
      if (!currentId || !all[currentId]) return all;
      const draft = structuredClone(all[currentId]) as F;
      fn(draft);
      draft.updatedAt = Date.now();
      return { ...all, [currentId]: draft };
    });
  }, [currentId]);

  const open = (id: string | null) => { setCurrentId(id); setNavOpen(false); setConfirmDelete(false); setView("fiche"); window.scrollTo({ top: 0 }); };
  const create = (f: Fiche) => { setFiches((all) => ({ ...all, [f.id]: f })); open(f.id); };
  const remove = (id: string) => {
    setFiches((all) => { const next = { ...all }; delete next[id]; return next; });
    open(null); toast("Fiche supprimée.");
  };
  const chooseTemplate = (k: TemplateKey) => {
    setTemplate(k);
    try { localStorage.setItem(PREF, JSON.stringify({ template: k })); } catch { /* ignoré */ }
  };

  const doExport = async (kind: "pdf" | "docx") => {
    if (!current) return;
    setBusy(kind);
    try {
      const out = kind === "pdf"
        ? await (await import("@/lib/pdf")).ficheToPDF(current, template)
        : await (await import("@/lib/docx")).ficheToDOCX(current, template);
      saveFile(out.filename, out.blob);
      toast(`${out.filename} est prêt.`);
    } catch (e) {
      console.error(e);
      toast("L'export n'a pas abouti. Réessaie, ou retire la photo si elle est très lourde.", true);
    } finally { setBusy(null); }
  };

  const saveJSON = (list: Fiche[], name: string) => {
    if (!list.length) return toast("Aucune fiche à sauvegarder pour l'instant.", true);
    const data = JSON.stringify({ app: "calliope", version: 1, fiches: list }, null, 2);
    saveFile(name, new Blob([data], { type: "application/json" }));
    toast(`Sauvegarde prête : ${name}`);
  };
  const openJSON = async (file?: File) => {
    if (!file) return;
    try {
      const o = JSON.parse(await file.text());
      const raw: unknown[] = Array.isArray(o) ? o : o.fiches || (o.mode ? [o] : []);
      const list = raw.map(normalize).filter((f): f is Fiche => !!f);
      if (!list.length) throw new Error("vide");
      setFiches((all) => {
        const next = { ...all };
        for (const f of list) { if (next[f.id]) f.id = `${f.id}-${Date.now().toString(36)}`; next[f.id] = f; }
        return next;
      });
      open(list[list.length - 1].id);
      toast(list.length > 1 ? `${list.length} fiches ouvertes.` : "Fiche ouverte.");
    } catch { toast("Ce fichier n'est pas une sauvegarde Calliope.", true); }
  };

  const base = (f: Fiche) => titleOf(f).replace(/[\\/:*?"<>|«»]+/g, "").replace(/\s+/g, " ").trim().slice(0, 60) || "fiche";
  const q = query.trim().toLowerCase();
  const list = Object.values(fiches)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .filter((f) => !q || [f.titre, f.oeuvre, f.auteur, f.parcours].join(" ").toLowerCase().includes(q));

  return (
    <div onDragOver={(e) => { if (e.dataTransfer.types.includes("Files")) e.preventDefault(); }}
      onDrop={(e) => { const file = e.dataTransfer.files[0]; if (file && /\.json$/i.test(file.name)) { e.preventDefault(); openJSON(file); } }}>
      <Topbar
        wide
        product="FICHES"
        start={
          <button className="btn ghost icon-btn menu-toggle" type="button" aria-label="Ouvrir mes fiches" aria-expanded={navOpen} aria-controls="nav" onClick={() => setNavOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        }
        end={<button className="btn ghost" type="button" onClick={() => openInput.current?.click()} title="Ouvrir une sauvegarde .json"><span>Ouvrir<span className="hide-sm"> une sauvegarde</span></span></button>}
      />
      <input ref={openInput} type="file" accept=".json,application/json" hidden onChange={(e) => { openJSON(e.target.files?.[0]); e.target.value = ""; }} />

      <div className="studio" data-view={view}>
        <nav className={`sidenav${navOpen ? " open" : ""}`} id="nav" aria-label="Mes fiches">
          <small className="title">Nouvelle fiche</small>
          <div className="new-grid">
            <button className="new-btn" type="button" onClick={() => create(newEL())}><b>EL</b><span>Oral</span></button>
            <button className="new-btn" type="button" onClick={() => create(newDissert())}><b>Dissert</b><span>Écrit</span></button>
            <button className="new-btn soon" type="button" disabled title="Ce mode arrive bientôt"><b>Mode 3</b><span className="chip">Bientôt</span></button>
          </div>
          <input type="search" placeholder="Chercher une fiche, un auteur…" aria-label="Chercher dans mes fiches" value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="list">
            {!list.length && <p className="empty-list">{Object.keys(fiches).length ? "Aucune fiche ne correspond." : "Tes fiches apparaîtront ici."}</p>}
            {list.map((f) => (
              <button key={f.id} className="fiche-link" type="button" aria-current={f.id === currentId} onClick={() => open(f.id)}>
                <b>{f.titre || "Fiche sans titre"}</b>
                <span>{(f.mode === "el" ? "EL" : "Dissert") + (f.auteur ? " · " + f.auteur : "")}</span>
              </button>
            ))}
          </div>
          <div className="side-foot">
            <span>{storageOk ? "Gardé dans ce navigateur, nulle part ailleurs." : "Non enregistré : pense au .json."}</span>
            <div className="row"><button className="btn ghost small" type="button" onClick={() => saveJSON(Object.values(fiches), "mes-fiches.calliope.json")}>Sauvegarder toutes mes fiches</button></div>
          </div>
        </nav>

        {!current ? (
          <main className="editor-col full">
            <Welcome ready={ready} onCreate={create} />
          </main>
        ) : (
          <>
            <main className="editor-col">
              <div className="export-bar">
                <div className="row">
                  <div className="segmented view-switch" role="group" aria-label="Affichage">
                    <button type="button" aria-pressed={view === "fiche"} onClick={() => setView("fiche")}>Fiche</button>
                    <button type="button" aria-pressed={view === "apercu"} onClick={() => setView("apercu")}>Aperçu</button>
                  </div>
                  <button className="btn primary" type="button" disabled={!!busy} onClick={() => doExport("pdf")}>{busy === "pdf" ? <span className="spin" /> : <DownloadIcon />}PDF</button>
                  <button className="btn secondary" type="button" disabled={!!busy} onClick={() => doExport("docx")}>{busy === "docx" ? <span className="spin" /> : <DownloadIcon />}Word</button>
                </div>
                <div className="row">
                  <button className="btn ghost small" type="button" title="Enregistrer cette fiche dans un fichier pour la rouvrir plus tard" onClick={() => saveJSON([current], `${base(current)}.calliope.json`)}>Sauvegarder .json</button>
                  {confirmDelete ? (
                    <span className="confirm">Supprimer ?
                      <button className="btn danger small" type="button" onClick={() => remove(current.id)}>Supprimer</button>
                      <button className="btn ghost small" type="button" onClick={() => setConfirmDelete(false)}>Annuler</button>
                    </span>
                  ) : (
                    <button className="btn ghost small" type="button" onClick={() => setConfirmDelete(true)}>Supprimer</button>
                  )}
                </div>
              </div>
              {current.mode === "el"
                ? <ElForm f={current} edit={edit} />
                : <DissertForm f={current} edit={edit} onError={(m) => toast(m, true)} />}
            </main>

            <aside className="live" aria-label="Aperçu en direct">
              <header>
                <span className="kicker"><i />Aperçu en direct</span>
                <div className="segmented" role="group" aria-label="Modèle d'export">
                  {TEMPLATE_LIST.map((t) => (
                    <button key={t.key} type="button" aria-pressed={template === t.key} onClick={() => chooseTemplate(t.key)}>{t.name}</button>
                  ))}
                </div>
              </header>
              <div className="scroller">
                {deferred && <TemplatePreview fiche={deferred} template={template} />}
              </div>
            </aside>
          </>
        )}
      </div>

      <div className="toasts" role="status">
        {toasts.map((t) => <div key={t.id} className={`toast${t.err ? " err" : ""}`}><i /><span>{t.text}</span></div>)}
      </div>
    </div>
  );
}

function DownloadIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" /></svg>;
}

function Welcome({ ready, onCreate }: { ready: boolean; onCreate: (f: Fiche) => void }) {
  return (
    <div className="welcome">
      <section className="hero">
        <PantheonLayer id="welcome" seed={13} />
        <div className="hero-inner">
          <span className="kicker"><i />Créer ta fiche</span>
          <h1>Commence par choisir un format<span className="dot">.</span></h1>
          <p className="lead">Renseigne ta fiche, vérifie son aperçu, puis télécharge-la en PDF ou en Word. Tout reste dans ce navigateur : pas d&apos;inscription et pas d&apos;envoi sur un serveur.</p>
        </div>
      </section>
      <div className="modes">
        <article className="mode">
          <span className="tag">EL · ORAL</span>
          <h3>Explication linéaire<span className="dot">.</span></h3>
          <p>Pour préparer chaque texte de ta liste d&apos;oral.</p>
          <ul><li>Introduction et conclusion à coller</li><li>Problématique</li><li>Mouvements, citations, procédés, analyse</li><li>Question de grammaire</li></ul>
          <div className="row">
            <button className="btn primary" type="button" disabled={!ready} onClick={() => onCreate(newEL())}>Nouvelle fiche</button>
            <button className="btn secondary" type="button" disabled={!ready} onClick={() => onCreate(exampleEL())}>Voir un exemple</button>
          </div>
        </article>
        <article className="mode">
          <span className="tag">DISSERT · ÉCRIT</span>
          <h3>Dissertation<span className="dot">.</span></h3>
          <p>Pour travailler une œuvre intégrale.</p>
          <ul><li>Photo du livre</li><li>Auteur, contexte, résumé, thèmes</li><li>Citations clés et leur usage</li><li>Sujets possibles et plans</li></ul>
          <div className="row">
            <button className="btn primary" type="button" disabled={!ready} onClick={() => onCreate(newDissert())}>Nouvelle fiche</button>
            <button className="btn secondary" type="button" disabled={!ready} onClick={() => onCreate(exampleDissert())}>Voir un exemple</button>
          </div>
        </article>
        <article className="mode soon">
          <span className="tag">BIENTÔT</span>
          <h3>Troisième mode<span className="dot">.</span></h3>
          <p>Un autre format arrivera bientôt. Les suggestions sont les bienvenues sur <Link href="https://github.com/SalksCore/calliope/issues">GitHub</Link>.</p>
        </article>
      </div>
    </div>
  );
}
