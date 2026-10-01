// 재설계로 추가된 필드가 두 로케일에서 대칭인지, 빌드 산출물이 온전한지 검증한다.
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getContent } from '../src/data';

const ko = getContent('ko');
const en = getContent('en');
const pub = (f: string) => fileURLToPath(new URL(`../public/${f}`, import.meta.url));
const asset = (f: string) => fileURLToPath(new URL(`../src/assets/${f}`, import.meta.url));

describe('재설계 콘텐츠 대칭', () => {
  it('설계 원칙이 3개씩 같은 key 로 존재한다', () => {
    expect(ko.principles.length).toBe(3);
    expect(en.principles.length).toBe(3);
    expect(ko.principles.map((p) => p.key)).toEqual(en.principles.map((p) => p.key));
  });

  it('히어로 사양이 같은 개수다', () => {
    expect(ko.heroSpecs.length).toBe(en.heroSpecs.length);
  });

  it('섹션 h2 문구가 두 로케일 모두 채워져 있다', () => {
    for (const c of [ko, en]) {
      for (const [k, v] of Object.entries(c.headings)) {
        expect(v.trim(), `headings.${k}`).not.toBe('');
      }
    }
  });

  it('폼 문구가 두 로케일 모두 채워져 있다', () => {
    for (const c of [ko, en]) {
      for (const [k, v] of Object.entries(c.form)) {
        expect(v.trim(), `form.${k}`).not.toBe('');
      }
    }
  });

  it('대표 카드 3건과 보조 칩 6건이 사진 수와 맞는다', () => {
    expect(ko.highlights.length).toBe(3);
    expect(ko.skills.length).toBe(6);
  });
});

describe('재설계 정적 자산', () => {
  const photos = ['teddy-photo', 'teddy-sep', 'teddy-audit', 'teddy-royalty', 'teddy-invention', 'teddy-priorart'];
  it('사진 6장이 src/assets/ 에 있어 빌드 때 AVIF/WebP 로 변환된다', () => {
    for (const p of photos) expect(existsSync(asset(`${p}.jpg`)), p).toBe(true);
  });

  it('기존 색인 URL 리다이렉트가 설정돼 있다', () => {
    const v = JSON.parse(readFileSync(fileURLToPath(new URL('../vercel.json', import.meta.url)), 'utf-8'));
    const sources = v.redirects.map((r: { source: string }) => r.source);
    expect(sources).toContain('/ko/');
    expect(sources).toContain('/portfolio/');
  });
});
