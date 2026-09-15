// 포트폴리오 정적 자산이 public/portfolio/ 에 온전히 존재하는지 검증한다.
// 사진을 상대경로로 참조하므로 파일이 하나라도 빠지면 페이지가 깨진다.
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = new URL('../public/portfolio/', import.meta.url);
const htmlPath = fileURLToPath(new URL('index.html', dir));

describe('포트폴리오 정적 자산', () => {
  it('public/portfolio/index.html 이 존재한다', () => {
    expect(existsSync(htmlPath)).toBe(true);
  });

  it('HTML 문서이며 포트폴리오 타이틀을 포함한다', () => {
    const html = readFileSync(htmlPath, 'utf-8');
    expect(html).toContain('<!doctype html>');
    expect(html).toContain('<title>김민재 · IP 전문가</title>');
  });

  it('참조하는 사진이 모두 같은 디렉터리에 있다', () => {
    const html = readFileSync(htmlPath, 'utf-8');
    const refs = [...html.matchAll(/src="(?!https?:)([^"]+)"/g)].map((m) => m[1]);
    expect(refs.length).toBeGreaterThan(0);
    for (const ref of refs) {
      expect(existsSync(fileURLToPath(new URL(ref, dir))), `누락: ${ref}`).toBe(true);
    }
  });

  it('사이트 루트 기준 절대경로로 자산을 참조하지 않는다', () => {
    const html = readFileSync(htmlPath, 'utf-8');
    expect(html).not.toMatch(/src="\/[^"]+"/);
  });

  it('문의 폼이 실제 Formspree 폼 ID로 연결돼 있다', () => {
    const html = readFileSync(htmlPath, 'utf-8');
    expect(html).toMatch(/action="https:\/\/formspree\.io\/f\/[a-z]{8}"/);
    expect(html).not.toContain('REPLACE_ME');
  });

  it('연락처가 자리표시자가 아니다', () => {
    const html = readFileSync(htmlPath, 'utf-8');
    expect(html).toContain('mailto:teddykmj@naver.com');
    expect(html).not.toContain('example.com');
  });
});
