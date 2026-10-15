import Link from "next/link";
import { asset } from "@/lib/asset";
import { ThemeToggle } from "./ThemeToggle";

/** Barre flottante commune à toutes les pages. Elle reste sombre dans les deux thèmes, comme sur les autres projets. */
export function Topbar({ product, nav, start, end, wide }: {
  product: string;
  nav?: { href: string; label: string }[];
  start?: React.ReactNode;
  end?: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <header className={`topbar${wide ? " wide" : ""}`}>
      <div className="topbar-inner">
        {start}
        <Link className="brand" href="/" aria-label="Calliope, accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/img/logo-dark.svg")} alt="Calliope." width={412} height={116} />
        </Link>
        <span className="product">{product}</span>
        <span className="spacer" />
        {nav && (
          <nav aria-label="Sections">
            {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
        )}
        <ThemeToggle />
        {end}
      </div>
    </header>
  );
}
