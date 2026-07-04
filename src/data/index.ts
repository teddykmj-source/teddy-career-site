import type { SiteContent } from './types';
import { ko } from './content.ko';
import { en } from './content.en';

const map: Record<'ko' | 'en', SiteContent> = { ko, en };

export function getContent(locale: 'ko' | 'en'): SiteContent {
  return map[locale];
}
export type { SiteContent } from './types';
