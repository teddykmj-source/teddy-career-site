// 자격증 데이터 무결성(합계 14·필수 필드·날짜 형식·KO/EN 정합) 검증
import { describe, it, expect } from 'vitest';
import { getCertifications } from '../src/data';

describe('자격증 데이터', () => {
  const ko = getCertifications('ko');
  const en = getCertifications('en');

  it('두 그룹(IP·기술가치평가 / 기초·범용)으로 구성', () => {
    expect(ko.length).toBe(2);
    expect(ko.map((g) => g.tone)).toEqual(['primary', 'muted']);
  });

  it('총 자격증 수는 정확히 14개(그룹 7+7)', () => {
    expect(ko[0].items.length).toBe(7);
    expect(ko[1].items.length).toBe(7);
    expect(ko.reduce((n, g) => n + g.items.length, 0)).toBe(14);
  });

  it('각 항목의 name·issuer·date가 비어있지 않고 date는 YYYY.MM 형식 (KO·EN)', () => {
    for (const list of [ko, en]) {
      for (const g of list) {
        for (const c of g.items) {
          expect(c.name.trim()).not.toBe('');
          expect(c.issuer.trim()).not.toBe('');
          expect(c.date).toMatch(/^\d{4}\.\d{2}$/);
        }
      }
    }
  });

  it('그룹 내 항목은 취득연월 내림차순 (KO·EN)', () => {
    for (const list of [ko, en]) {
      for (const g of list) {
        const dates = g.items.map((c) => c.date);
        expect(dates).toEqual([...dates].sort().reverse());
      }
    }
  });

  it('KO/EN 그룹 수·그룹별 항목 수가 동일', () => {
    expect(en.length).toBe(ko.length);
    ko.forEach((g, i) => expect(en[i].items.length).toBe(g.items.length));
  });
});
