// 테마 토큰이 global.css 에 한 번만 선언되고(light-dark), 테마 블록에는 color-scheme 과 사진 보정값만 남는지 검증한다.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const css = readFileSync(fileURLToPath(new URL('../src/styles/global.css', import.meta.url)), 'utf-8');
const count = (needle: string) => css.split(needle).length - 1;

describe('테마 토큰 단일 선언', () => {
  it('색 토큰은 각각 한 번만 선언되고 light-dark() 를 쓴다', () => {
    for (const t of ['--ground', '--surface', '--ink', '--muted', '--accent', '--cta-bg', '--glass', '--danger', '--tog-bg']) {
      expect(count(`${t}:`), t).toBe(1);
      expect(css, t).toMatch(new RegExp(`${t}:light-dark\\(`));
    }
  });

  it('그림자 토큰은 기하를 한 번만 쓰고 색만 light-dark 로 갈라진다', () => {
    for (const t of ['--lift-1', '--lift-2', '--lift-3']) expect(count(`${t}:`), t).toBe(1);
    expect(css).toMatch(/--lift-2:0 1px 2px var\(--sh-2a\)/);
  });

  it('다크 테마 블록 두 곳은 color-scheme 과 --img-adj 만 바꾼다', () => {
    const media = css.match(/@media \(prefers-color-scheme:dark\)\{([\s\S]*?)\n\}/);
    const attr = css.match(/:root\[data-theme="dark"\]\{([^}]*)\}/);
    expect(media).not.toBeNull();
    expect(attr).not.toBeNull();
    for (const body of [media![1], attr![1]]) {
      expect(body).toContain('color-scheme:dark');
      expect(body).toContain('--img-adj:');
      expect(body).not.toContain('--ground');
      expect(body).not.toContain('--accent');
    }
  });
});
