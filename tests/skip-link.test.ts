// 본문 건너뛰기 링크가 레이아웃 맨 앞에 있고, 모든 페이지의 main 이 그 목적지(#top)인지 검증한다.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (p: string) => readFileSync(fileURLToPath(new URL(`../${p}`, import.meta.url)), 'utf-8');

describe('skip link', () => {
  it('레이아웃 body 첫 요소가 #top 으로 가는 건너뛰기 링크다', () => {
    expect(read('src/layouts/BaseLayout.astro')).toMatch(/<body>\s*<a class="skip" href="#top">/);
  });

  it('모든 페이지의 main 이 id="top" 이고 포커스를 받을 수 있다', () => {
    for (const p of ['src/pages/index.astro', 'src/pages/en/index.astro', 'src/pages/certifications/index.astro', 'src/pages/en/certifications/index.astro']) {
      expect(read(p), p).toContain('<main id="top" tabindex="-1">');
    }
  });
});
