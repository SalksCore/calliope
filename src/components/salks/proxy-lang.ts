// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
import { NextResponse, type NextRequest } from 'next/server';
import { fromAcceptLanguage, isLang, LANG_HEADER } from './i18n';

/**
 * À appeler depuis proxy.ts : une adresse sans /fr ou /en est redirigée vers la
 * langue du navigateur ; la langue de l'adresse est transmise au layout racine.
 */
export function langProxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split('/')[1];
  if (isLang(first)) {
    const headers = new Headers(request.headers);
    headers.set(LANG_HEADER, first);
    return NextResponse.next({ request: { headers } });
  }
  const url = request.nextUrl.clone();
  url.pathname = `/${fromAcceptLanguage(request.headers.get('accept-language'))}${pathname === '/' ? '' : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}
