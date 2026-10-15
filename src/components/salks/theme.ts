// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
/* Thème sombre / clair des sites Salks.
   Le script se place dans <head> (avant le premier rendu) : il applique le thème
   mémorisé, sinon celui du système, en posant data-theme sur <html>.
   <html> doit porter suppressHydrationWarning. */

export const THEME_KEY = 'salks-theme';

export function themeScript(key: string = THEME_KEY) {
  return `(function(){try{var t=localStorage.getItem(${JSON.stringify(key)});if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`;
}
