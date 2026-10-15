import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

/** Barre du haut de l'éditeur, même allure que l'en-tête de la vitrine. */
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
          Calliope<b>.</b>
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
