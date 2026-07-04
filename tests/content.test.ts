import { describe, it, expect } from 'vitest';
import { getContent } from '../src/data';
import { contact } from '../src/data/contact';

describe('site content', () => {
  const ko = getContent('ko');
  const en = getContent('en');

  it('두 로케일의 경력 항목 수가 동일', () => {
    expect(ko.experience.length).toBe(en.experience.length);
    expect(ko.experience.length).toBeGreaterThanOrEqual(4);
  });

  it('두 로케일의 성과 카드 수가 동일', () => {
    expect(ko.highlights.length).toBe(en.highlights.length);
  });

  it('성과 지표는 정확히 4개', () => {
    expect(ko.stats.length).toBe(4);
    expect(en.stats.length).toBe(4);
  });

  it('필수 문자열 필드가 비어있지 않음', () => {
    for (const c of [ko, en]) {
      expect(c.headline.length).toBeGreaterThan(0);
      expect(c.tagline.trim()).not.toBe('');
      expect(c.about.trim()).not.toBe('');
      expect(c.skills.length).toBeGreaterThan(0);
    }
  });

  it('연락처 이메일/LinkedIn 형식 검증', () => {
    expect(contact.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(contact.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
  });
});
