import { asset } from "@/lib/asset";

/* Couche panthéon partagée par les projets Salks : étoiles déterministes,
   frises de méandres, nom grec en creux et emblème néon. */

export function Meander({ id, step = 22, h = 14, opacity = 0.24, className = "" }: { id: string; step?: number; h?: number; opacity?: number; className?: string }) {
  const u = step / 6;
  const k = h / 4;
  return (
    <svg className={`meander ${className}`} width="100%" height={h} aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern id={id} width={step} height={h} patternUnits="userSpaceOnUse">
          <path d={`M0 ${h} V0 H${4 * u} V${3 * k} H${1.5 * u} V${1.4 * k} H${2.6 * u}`} fill="none" stroke="var(--hue)" strokeWidth="1.6" strokeLinecap="square" />
        </pattern>
      </defs>
      <rect width="100%" height={h} fill={`url(#${id})`} />
      <line x1="0" x2="100%" y1={h - 0.8} y2={h - 0.8} stroke="var(--hue)" strokeWidth="1.6" />
    </svg>
  );
}

function Stars({ count, seed }: { count: number; seed: number }) {
  let s = seed;
  const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const stars = Array.from({ length: count }, (_, i) => {
    const size = 1 + r() * 2.2;
    return (
      <i key={i} className={i % 4 === 0 ? "tw" : undefined}
        style={{ left: `${(r() * 100).toFixed(3)}%`, top: `${(r() * 100).toFixed(3)}%`, width: size, height: size, opacity: +(0.15 + r() * 0.45).toFixed(3), animationDelay: `${(r() * 4).toFixed(2)}s` }} />
    );
  });
  return <div className="stars">{stars}</div>;
}

/** Décor complet d'un bandeau. À placer comme premier enfant d'un élément `.hero`. */
export function PantheonLayer({ id, greek = "ΚΑΛΛΙΟΠΗ", emblem = true, meanders = true, count = 64, seed = 7 }: {
  id: string; greek?: string | false; emblem?: boolean; meanders?: boolean; count?: number; seed?: number;
}) {
  return (
    <div className="pantheon" aria-hidden="true">
      <Stars count={count} seed={seed} />
      {greek && <span className="greek-name">{greek}</span>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {emblem && <img className="emblem" src={asset("/img/emblem.svg")} alt="" />}
      {meanders && <Meander id={`${id}-top`} className="top" />}
      {meanders && <Meander id={`${id}-bottom`} className="bottom" />}
    </div>
  );
}

/** Séparateur : deux frises, le point de la marque au centre. */
export function Frieze({ id }: { id: string }) {
  return (
    <div className="frieze" aria-hidden="true">
      <Meander id={`${id}-l`} step={20} h={18} opacity={0.3} />
      <span />
      <Meander id={`${id}-r`} step={20} h={18} opacity={0.3} />
    </div>
  );
}
