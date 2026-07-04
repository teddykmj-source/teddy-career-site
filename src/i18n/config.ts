export const locales = ['ko', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ko';
export const languageNames: Record<Locale, string> = { ko: 'KO', en: 'EN' };
