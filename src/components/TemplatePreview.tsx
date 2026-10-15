import { blocks, endsWithWord, kicker, metaLines, titleOf } from "@/lib/blocks";
import type { Fiche } from "@/lib/fiche";
import { TEMPLATES, rgb, type TemplateKey } from "@/lib/templates";

/**
 * Rendu en direct d'une fiche dans un modèle. Les mesures reprennent celles
 * du PDF (millimètres et points), à partir des mêmes blocs : ce que tu vois
 * ici est ce que tu exportes. Les filets gris marquent les fins de page A4.
 */
export function TemplatePreview({ fiche, template }: { fiche: Fiche; template: TemplateKey }) {
  const T = TEMPLATES[template];
  const list = blocks(fiche);
  const title = titleOf(fiche);
  const style = {
    "--size": T.size,
    "--gap": T.gap,
    "--pacc": rgb(T.accent),
    "--pbar": rgb(T.bar),
    "--phl": T.outline ? "transparent" : rgb(T.highlight),
  } as React.CSSProperties;

  return (
    <div className="preview-wrap">
      <div className={`paper ${T.family === "serif" ? "serif" : ""} ${T.band ? "band" : ""}`} style={style} aria-label={`Aperçu de la fiche, modèle ${T.name}`}>
        <div className="p-head">
          <div>
            <span className="p-kicker">{kicker(fiche)}</span>
            <h3 className="p-title">{title}{T.band && endsWithWord(title) && <span className="p-dot">.</span>}</h3>
            {metaLines(fiche).map((m) => <p className="p-meta" key={m}>{m}</p>)}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {fiche.mode === "dissert" && fiche.photo && <img className="p-cover" src={fiche.photo} alt="Couverture du livre" />}
        </div>

        {list.length === 0 && <p className="p-empty">Remplis la fiche : son contenu apparaît ici au fur et à mesure.</p>}

        {list.map((b, i) => {
          switch (b.t) {
            case "h":
              return <h4 className="p-h" key={i}>{b.text}{T.band && endsWithWord(b.text) && <span className="p-dot">.</span>}</h4>;
            case "h2":
              return <h5 className="p-h2" key={i}><span>{b.text}</span>{b.note && <small>{b.note}</small>}</h5>;
            case "quote":
              return <blockquote className="p-quote" key={i}>«&nbsp;{b.text}&nbsp;»{b.ref && <small>{b.ref}</small>}</blockquote>;
            case "box":
              return <div className="p-box" key={i}><span className="p-label">{b.label}</span><b>{b.text}</b></div>;
            case "p":
              return (
                <div key={i}>
                  {b.label && <span className="p-label">{b.label}</span>}
                  <p className="p-p">{b.text}</p>
                </div>
              );
            default:
              return <div className="p-space" key={i} />;
          }
        })}
      </div>
    </div>
  );
}
