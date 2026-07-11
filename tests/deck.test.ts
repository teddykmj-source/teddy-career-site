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
});
