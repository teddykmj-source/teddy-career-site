import { describe, it, expect } from 'vitest';
import { getLocaleFromUrl, otherLocale, localePath } from '../src/i18n/utils';

describe('i18n utils', () => {
  it('URL 경로에서 로케일 추출', () => {
    expect(getLocaleFromUrl(new URL('https://x.dev/teddy-career-site/en/'))).toBe('en');
    expect(getLocaleFromUrl(new URL('https://x.dev/teddy-career-site/ko/'))).toBe('ko');
  });

  it('알 수 없는 경로는 기본 로케일(ko)', () => {
    expect(getLocaleFromUrl(new URL('https://x.dev/'))).toBe('ko');
  });

  it('반대 로케일 반환', () => {
    expect(otherLocale('ko')).toBe('en');
    expect(otherLocale('en')).toBe('ko');
  });

  it('로케일 경로 생성', () => {
    expect(localePath('en')).toBe('/en/');
    expect(localePath('ko')).toBe('/ko/');
  });
});
