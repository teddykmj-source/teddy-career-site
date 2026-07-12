// 교육 수료 데이터 무결성(5건·필수 필드·KO/EN 정합) 검증
import { describe, it, expect } from 'vitest';
import { getTraining } from '../src/data';

describe('교육 수료 데이터', () => {
  const ko = getTraining('ko');
  const en = getTraining('en');

  it('교육 수료는 정확히 5건', () => {
    expect(ko.length).toBe(5);
  });

  it('각 항목의 year·title이 비어있지 않음 (KO·EN)', () => {
    for (const list of [ko, en]) {
      for (const t of list) {
        expect(t.year.trim()).not.toBe('');
        expect(t.title.trim()).not.toBe('');
      }
    }
  });

  it('KO/EN 항목 수·연도 순서가 동일', () => {
    expect(en.length).toBe(ko.length);
    expect(en.map((t) => t.year)).toEqual(ko.map((t) => t.year));
  });
});
