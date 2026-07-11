// 덱 정적 자산이 public/deck/index.html 에 단일 원본으로 존재하는지 검증
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const deckPath = fileURLToPath(new URL('../public/deck/index.html', import.meta.url));

describe('IP 소개 덱 정적 자산', () => {
  it('public/deck/index.html 이 존재한다', () => {
    expect(existsSync(deckPath)).toBe(true);
  });

  it('덱 HTML 문서이며 소개 덱 타이틀을 포함한다', () => {
    const html = readFileSync(deckPath, 'utf-8');
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('김민재 · Teddy — IP 전문가 소개');
  });

  it('연락처 Web 행이 허브(/ko/)로 가는 클릭 링크다', () => {
    const html = readFileSync(deckPath, 'utf-8');
    expect(html).toContain('<a href="/ko/" style="color:var(--cyan);text-decoration:none">ipmoa.vercel.app/ko</a>');
  });

  it('편집기가 ?edit=1 로 게이팅된다', () => {
    const html = readFileSync(deckPath, 'utf-8');
    expect(html).toContain("new URLSearchParams(location.search).has('edit')");
  });

  it('연락처 Email·LinkedIn 행이 클릭 링크다', () => {
    const html = readFileSync(deckPath, 'utf-8');
    expect(html).toContain('<a href="mailto:teddykmj@naver.com"');
    expect(html).toContain('<a href="https://www.linkedin.com/in/minjae-kim-29813215a/" target="_blank" rel="noopener"');
  });
});
