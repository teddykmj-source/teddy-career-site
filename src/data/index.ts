import type { SiteContent, CertGroup } from './types';
import { ko } from './content.ko';
import { en } from './content.en';
import { ko as certsKo } from './certifications.ko';
import { en as certsEn } from './certifications.en';

const map: Record<'ko' | 'en', SiteContent> = { ko, en };

export function getContent(locale: 'ko' | 'en'): SiteContent {
  return map[locale];
}

const certMap: Record<'ko' | 'en', CertGroup[]> = { ko: certsKo, en: certsEn };

export function getCertifications(locale: 'ko' | 'en'): CertGroup[] {
  return certMap[locale];
}

export type { SiteContent, CertGroup } from './types';
