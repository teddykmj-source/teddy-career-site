// 글꼴 배포 경로를 고정한다. Pretendard 는 자체 호스팅(번들), 외부 CDN 은 Google Fonts 의 Archivo 뿐이어야 한다.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const layout = readFileSync(fileURLToPath(new URL('../src/layouts/BaseLayout.astro', import.meta.url)), 'utf-8');
const pkg = JSON.parse(readFileSync(fileURLToPath(new URL('../package.json', import.meta.url)), 'utf-8'));

describe('글꼴 배포', () => {
  it('Pretendard 동적 서브셋 CSS 를 번들로 가져오고 jsdelivr 링크가 없다', () => {
    expect(layout).toContain("import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'");
    expect(layout).not.toContain('cdn.jsdelivr.net');
    expect(pkg.devDependencies.pretendard).toBeDefined();
  });

  it('Archivo 만 Google Fonts 에서 비동기로 받는다', () => {
    expect(layout).toMatch(/preload" as="style" href="https:\/\/fonts\.googleapis\.com\/css2\?family=Archivo/);
    expect(layout).not.toContain('family=Geist');
  });
});
