import type { SiteContent, CertGroup, TrainingItem } from './types';
import { ko } from './content.ko';
import { en } from './content.en';
import { ko as certsKo } from './certifications.ko';
import { en as certsEn } from './certifications.en';
import { ko as trainingKo } from './training.ko';
import { en as trainingEn } from './training.en';

const map: Record<'ko' | 'en', SiteContent> = { ko, en };

export function getContent(locale: 'ko' | 'en'): SiteContent {
  return map[locale];
}

const certMap: Record<'ko' | 'en', CertGroup[]> = { ko: certsKo, en: certsEn };

export function getCertifications(locale: 'ko' | 'en'): CertGroup[] {
  return certMap[locale];
}

const trainingMap: Record<'ko' | 'en', TrainingItem[]> = { ko: trainingKo, en: trainingEn };

export function getTraining(locale: 'ko' | 'en'): TrainingItem[] {
  return trainingMap[locale];
}

export type { SiteContent, CertGroup } from './types';
