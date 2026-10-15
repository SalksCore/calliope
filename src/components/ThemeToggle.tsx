import { ThemeToggle as KitToggle } from "./salks/ThemeToggle";

/** Bascule de thème du kit, avec la clé déjà utilisée par Calliope. */
export function ThemeToggle() {
  return <KitToggle storageKey="calliope-theme" />;
}
