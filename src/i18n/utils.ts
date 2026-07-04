import { defaultLocale, locales, type Locale } from './config';

export function getLocaleFromUrl(url: URL): Locale {
  const segments = url.pathname.split('/').filter(Boolean);
  for (const seg of segments) {
    if ((locales as readonly string[]).includes(seg)) return seg as Locale;
  }
  return defaultLocale;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'ko' ? 'en' : 'ko';
}

export function localePath(locale: Locale): string {
  return `/${locale}/`;
}
