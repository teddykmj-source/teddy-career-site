// 모션 레이어의 안전장치를 검증한다. CSS 가드, 아이콘 key, 흐름도 데이터 대칭.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const css = () => readFileSync(fileURLToPath(new URL('../src/styles/motion.css', import.meta.url)), 'utf-8');
const layout = () => readFileSync(fileURLToPath(new URL('../src/layouts/BaseLayout.astro', import.meta.url)), 'utf-8');

describe('motion.css 안전장치', () => {
  it('BaseLayout 이 global.css 뒤에 motion.css 를 로드한다', () => {
    const src = layout();
    expect(src.indexOf("styles/global.css")).toBeGreaterThan(-1);
    expect(src.indexOf("styles/motion.css")).toBeGreaterThan(src.indexOf("styles/global.css"));
  });

  it('reduced-motion 가드가 파일 끝에 있고 모든 animation 을 즉시 끝낸다', () => {
    const src = css();
    const guard = src.lastIndexOf('@media (prefers-reduced-motion:reduce)');
    expect(guard).toBeGreaterThan(-1);
    const tail = src.slice(guard);
    expect(tail).toContain('animation-duration:.01ms!important');
    expect(tail).toContain('animation-delay:0ms!important');
    expect(tail).toContain('transition-duration:.01ms!important');
    expect(src.slice(guard + 1)).not.toContain('@keyframes');
  });

  it('scroll-driven 과 view-transition 은 @supports 안에만 있다', () => {
    const src = css();
    const bare = src.replace(/@supports[^{]*\{[\s\S]*?\n\}\n/g, '');
    expect(bare).not.toContain('animation-timeline');
    expect(bare).not.toContain('@view-transition');
  });
});
