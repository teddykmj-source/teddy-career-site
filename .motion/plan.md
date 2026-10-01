# 모션 레이어 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ipmoa.vercel.app 의 현재 디자인 위에 CSS 우선 모션 레이어를 입힌다. 레이아웃과 문구는 그대로다.

**Architecture:** 신규 모션 CSS 는 `src/styles/motion.css` 한 파일에 모으고 `global.css` 뒤에 로드한다. CSS 로 불가능한 카운트업과 포인터 틸트만 번들 스크립트 `src/scripts/motion.ts` 가 맡고, 그 안의 순수 로직은 `src/motion/*.ts` 로 떼어 vitest 로 검증한다. 흐름도와 원칙 아이콘은 데이터와 Astro 컴포넌트로 렌더하고 CSS keyframes 로 움직인다.

**Tech Stack:** Astro 5, Tailwind 4(프리플라이트만), vitest 2, 순수 CSS (keyframes, scroll-driven animations, cross-document view transitions). 외부 애니메이션 라이브러리 없음.

**Spec:** `.motion/design.md`

## Global Constraints

- 작업 저장소는 `~/projects/teddy-career-site`. 브랜치 `feat/motion`.
- 새 문구를 지어내지 않는다. 흐름도 노드 라벨은 기존 설명문의 단어로만 만든다. 숫자는 바꾸지 않는다.
- 외부 런타임 의존성 추가 금지. `package.json` 의 `dependencies` 는 그대로다.
- 모든 신규 애니메이션은 `src/styles/motion.css` 에만 쓴다. `global.css` 는 건드리지 않는다.
- `prefers-reduced-motion: reduce` 에서 신규 애니메이션은 즉시 최종 상태로 간다. JS 연출은 아예 실행하지 않는다.
- scroll-driven animation(`animation-timeline`)과 `@view-transition` 은 `@supports` 안에만 둔다.
- 토큰은 기존 것만 쓴다. `--ease`, `--lift-1/2/3`, `--accent`, `--surface`, `--tint-1/2`, `--hair`, `--chip-ring`, `--divider`, `--divider-strong`, `--muted`, `--ink`.
- 767px 이하에서는 겹침·회전·틸트 없음. 기존 모바일 규칙을 깨지 않는다.
- em대시(—) 0개. 새 파일 첫 줄은 한국어 한 줄 역할 주석.
- 커밋 메시지는 기존 관례를 따른다. `feat(motion): …`, `test(motion): …`, 한국어 서술형.
- 완료 전 `npm test` 와 `npm run build` 를 반드시 돌린다.

---

### Task 1: 브랜치, motion.css 뼈대, reduced-motion 가드, 교차 페이드

**Files:**
- Create: `src/styles/motion.css`
- Modify: `src/layouts/BaseLayout.astro:2`
- Test: `tests/motion.test.ts`

**Interfaces:**
- Produces: `src/styles/motion.css` 가 모든 페이지에 로드된다. 이후 Task 는 이 파일 끝의 reduced-motion 블록 **앞**에 CSS 를 추가한다.

- [ ] **Step 1: 브랜치 생성과 기준치 기록**

```bash
cd ~/projects/teddy-career-site && git switch -c feat/motion && npm test && npm run build
```
Expected: 테스트 30건 통과, 빌드 성공. 그다음 `npm run preview` 로 띄운 `http://localhost:4321/` 을 Chrome Lighthouse(모바일)로 측정해 성능 점수를 `.motion/context-notes.md` 의 "기준치" 항목에 적는다.

- [ ] **Step 2: 실패하는 테스트 작성**

```ts
// tests/motion.test.ts
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
```

- [ ] **Step 3: 테스트 실패 확인**

Run: `npx vitest run tests/motion.test.ts`
Expected: FAIL. `motion.css` 가 없어 `ENOENT`.

- [ ] **Step 4: motion.css 와 import 작성**

```css
/* 모션 레이어. global.css 뒤에 로드된다. 신규 애니메이션은 전부 이 파일에만 쓴다.
   규칙: 파일 끝의 reduced-motion 가드 앞에 추가하고, scroll-driven 과 view-transition 은 @supports 안에만 둔다. */

/* ── 공용 keyframes ── */
@keyframes rise-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}

/* ── 문서 간 교차 페이드: / ↔ /en/ ↔ /certifications/. 라우터 없이 브라우저 기능만 켠다 ── */
@supports (view-transition-name: root) {
  @view-transition { navigation: auto; }
  ::view-transition-old(root),::view-transition-new(root){animation-duration:.35s;animation-timing-function:var(--ease)}
}

/* ── reduced-motion 가드. 반드시 파일 끝. 신규 애니메이션은 즉시 최종 상태로 간다 ── */
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-delay:0ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
  .nav,.cv-list::after,.cv-row::before{animation:none!important}
  ::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}
}
```

`src/layouts/BaseLayout.astro` 2번째 줄 뒤에 추가한다.

```astro
import '../styles/global.css';
import '../styles/motion.css';
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npx vitest run tests/motion.test.ts`
Expected: PASS 3건.

- [ ] **Step 6: 수동 확인과 커밋**

`npm run dev` 로 `http://localhost:4321/` 을 열고 상단 `EN` 을 눌러 `/en/` 으로 갈 때 Chrome 에서 교차 페이드가 보이는지 확인한다. 레이아웃 변화는 없어야 한다.

```bash
git add src/styles/motion.css src/layouts/BaseLayout.astro tests/motion.test.ts .motion/
git commit -m "feat(motion): 모션 레이어 뼈대와 reduced-motion 가드, 문서 간 교차 페이드를 넣는다"
```

---

### Task 2: 카운트업 순수 함수

**Files:**
- Create: `src/motion/countup.ts`
- Test: `tests/countup.test.ts`

**Interfaces:**
- Produces: `parseStat(text: string): StatParts | null`, `formatStat(parts: StatParts, progress: number): string`, `easeOut(t: number): number`. `StatParts = { prefix: string; target: number; suffix: string; grouped: boolean }`. Task 3 의 런타임이 이 셋을 import 한다.

- [ ] **Step 1: 실패하는 테스트 작성**

```ts
// tests/countup.test.ts
// 지표 문자열 파싱과 진행률 포맷을 검증한다. 숫자 앞뒤 문자와 천 단위 구분을 보존해야 한다.
import { describe, it, expect } from 'vitest';
import { parseStat, formatStat, easeOut } from '../src/motion/countup';

describe('parseStat', () => {
  it('한글 접미사를 보존한다', () => {
    expect(parseStat('11년+')).toEqual({ prefix: '', target: 11, suffix: '년+', grouped: false });
  });
  it('천 단위 구분이 있으면 grouped', () => {
    expect(parseStat('2,200+')).toEqual({ prefix: '', target: 2200, suffix: '+', grouped: true });
  });
  it('영문 접미사와 기호', () => {
    expect(parseStat('11+ yrs')).toEqual({ prefix: '', target: 11, suffix: '+ yrs', grouped: false });
    expect(parseStat('2×')).toEqual({ prefix: '', target: 2, suffix: '×', grouped: false });
    expect(parseStat('14')).toEqual({ prefix: '', target: 14, suffix: '', grouped: false });
  });
  it('문장 가운데 숫자는 접두사와 접미사를 모두 보존한다', () => {
    expect(parseStat('개발 중 · 테스트 케이스 200건')).toEqual({ prefix: '개발 중 · 테스트 케이스 ', target: 200, suffix: '건', grouped: false });
    expect(parseStat('In development · 200 test cases')).toEqual({ prefix: 'In development · ', target: 200, suffix: ' test cases', grouped: false });
  });
  it('숫자가 없으면 null', () => {
    expect(parseStat('구현 완료')).toBeNull();
  });
});

describe('formatStat', () => {
  const p = parseStat('2,200+')!;
  it('진행률 1 은 원문과 같다', () => expect(formatStat(p, 1)).toBe('2,200+'));
  it('진행률 0 은 0 부터 시작한다', () => expect(formatStat(p, 0)).toBe('0+'));
  it('중간값도 천 단위 구분을 유지한다', () => expect(formatStat(p, 0.5)).toBe('1,100+'));
  it('범위 밖 진행률은 잘라낸다', () => {
    expect(formatStat(p, 1.7)).toBe('2,200+');
    expect(formatStat(p, -1)).toBe('0+');
  });
  it('접두사와 접미사를 그대로 붙인다', () => {
    expect(formatStat(parseStat('개발 중 · 테스트 케이스 200건')!, 1)).toBe('개발 중 · 테스트 케이스 200건');
  });
});

describe('easeOut', () => {
  it('양 끝은 고정이고 중간은 앞당겨진다', () => {
    expect(easeOut(0)).toBe(0);
    expect(easeOut(1)).toBe(1);
    expect(easeOut(0.5)).toBeCloseTo(0.875);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run tests/countup.test.ts`
Expected: FAIL. 모듈을 찾을 수 없음.

- [ ] **Step 3: 구현**

```ts
// 지표 문자열에서 숫자만 떼어 0 부터 올려 보여주는 순수 함수. DOM 을 모른다.
export interface StatParts { prefix: string; target: number; suffix: string; grouped: boolean }

const NUM = /\d[\d,]*/;

export function parseStat(text: string): StatParts | null {
  const m = NUM.exec(text);
  if (!m) return null;
  const raw = m[0];
  return {
    prefix: text.slice(0, m.index),
    target: Number(raw.replace(/,/g, '')),
    suffix: text.slice(m.index + raw.length),
    grouped: raw.includes(','),
  };
}

export function formatStat(parts: StatParts, progress: number): string {
  const p = Math.min(1, Math.max(0, progress));
  const n = Math.round(parts.target * p);
  const s = parts.grouped ? n.toLocaleString('en-US') : String(n);
  return parts.prefix + s + parts.suffix;
}

/** ease-out cubic. 0..1 을 0..1 로, 앞부분이 빠르다. */
export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run tests/countup.test.ts`
Expected: PASS 11건.

- [ ] **Step 5: 커밋**

```bash
git add src/motion/countup.ts tests/countup.test.ts
git commit -m "feat(motion): 지표 카운트업 파싱·포맷 순수 함수를 만든다"
```

---

### Task 3: 카운트업 런타임과 적용 (지표 4개, 테스트 케이스 수 3개)

**Files:**
- Create: `src/scripts/motion.ts`, `src/components/MotionScript.astro`
- Modify: `src/components/StatStrip.astro:11`, `src/components/Automation.astro:24`, `src/pages/index.astro:30`, `src/pages/en/index.astro:30`

**Interfaces:**
- Consumes: `parseStat`, `formatStat`, `easeOut` (Task 2).
- Produces: `[data-count]` 속성이 붙은 요소는 뷰포트 진입 시 1.2초 카운트업한다. `src/scripts/motion.ts` 는 `initCount()` 와 (Task 5 에서 추가할) `initTilt()` 를 맨 아래에서 호출한다.

- [ ] **Step 1: 런타임 작성**

```ts
// 모션 런타임. 카운트업과 포인터 틸트처럼 CSS 만으로 안 되는 것만 여기서 한다.
import { parseStat, formatStat, easeOut } from '../motion/countup';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el: HTMLElement): void {
  const parts = parseStat(el.textContent ?? '');
  if (!parts) return;
  const dur = 1200;
  let start = 0;
  const tick = (now: number) => {
    if (!start) start = now;
    const t = Math.min(1, (now - start) / dur);
    el.textContent = formatStat(parts, easeOut(t));
    if (t < 1) requestAnimationFrame(tick);
  };
  el.textContent = formatStat(parts, 0);
  requestAnimationFrame(tick);
}

function initCount(): void {
  if (reduce || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      countUp(e.target as HTMLElement);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => io.observe(el));
}

initCount();
```

```astro
---
// 모션 런타임 로더. PageScript 뒤, 페이지마다 한 번만 넣는다. Astro 가 번들해 module 로 내보낸다.
---
<script>
  import '../scripts/motion';
</script>
```

- [ ] **Step 2: 마크업에 data-count 부착**

`src/components/StatStrip.astro` 의 `<div class="num stat-n">{s.value}</div>` 를 다음으로 바꾼다.

```astro
<div class="num stat-n" data-count>{s.value}</div>
```

`src/components/Automation.astro` 의 `<p class="work-meta">{a.status}</p>` 를 다음으로 바꾼다.

```astro
<p class="work-meta" data-count>{a.status}</p>
```

`src/pages/index.astro` 와 `src/pages/en/index.astro` 에서 `<PageScript />` 바로 아래에 추가한다. import 도 각 파일의 `PageScript` import 아래에 같은 경로 깊이로 추가한다.

```astro
import MotionScript from '../components/MotionScript.astro';   // index.astro
import MotionScript from '../../components/MotionScript.astro'; // en/index.astro
```
```astro
  <PageScript />
  <MotionScript />
```

- [ ] **Step 3: 수동 확인**

`npm run dev` 후 `http://localhost:4321/` 에서 지표 4개가 0 에서 올라가 `11년+`, `2,200+`, `2회`, `14` 로 끝나는지, Automation 세 카드의 상태줄이 `… 200건` `… 34건` `… 279건` 으로 끝나는지 본다. `/en/` 에서도 `11+ yrs`, `2×` 가 정확히 복원되는지 본다. Chrome DevTools Rendering 패널에서 `prefers-reduced-motion: reduce` 를 켜고 새로고침하면 카운트업 없이 최종 값이 바로 보여야 한다.

- [ ] **Step 4: 전체 테스트와 빌드**

Run: `npm test && npm run build`
Expected: 전부 통과, 빌드 성공. `dist/` 의 HTML 에 `data-count` 가 7곳 있다. 확인은 `grep -o 'data-count' dist/index.html | wc -l` 로 하며 7 이 나와야 한다.

- [ ] **Step 5: 커밋**

```bash
git add src/scripts/motion.ts src/components/MotionScript.astro src/components/StatStrip.astro src/components/Automation.astro src/pages/index.astro src/pages/en/index.astro
git commit -m "feat(motion): 지표와 테스트 케이스 수에 뷰포트 진입 카운트업을 붙인다"
```

---

### Task 4: Hero 헤드라인 어절 리빌과 순차 등장

**Files:**
- Create: `src/motion/words.ts`
- Modify: `src/components/Hero.astro:9`, `src/styles/motion.css`
- Test: `tests/words.test.ts`

**Interfaces:**
- Produces: `splitWords(line: string): string[]`. Hero 가 어절마다 `<span class="w" style="--i:n">` 을 렌더한다.

- [ ] **Step 1: 실패하는 테스트 작성**

```ts
// tests/words.test.ts
// 헤드라인 어절 분할. 공백 종류와 빈 어절을 안전하게 다뤄야 한다.
import { describe, it, expect } from 'vitest';
import { splitWords } from '../src/motion/words';
import { getContent } from '../src/data';

describe('splitWords', () => {
  it('공백으로 나눈다', () => {
    expect(splitWords('지식재산을 수익과 전략으로')).toEqual(['지식재산을', '수익과', '전략으로']);
  });
  it('연속 공백과 양끝 공백을 버린다', () => {
    expect(splitWords('  a  b ')).toEqual(['a', 'b']);
    expect(splitWords('')).toEqual([]);
  });
  it('두 로케일 헤드라인이 모두 어절을 가진다', () => {
    for (const c of [getContent('ko'), getContent('en')]) {
      for (const line of c.headline) expect(splitWords(line).length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run tests/words.test.ts`
Expected: FAIL. 모듈 없음.

- [ ] **Step 3: 구현**

```ts
// 헤드라인 한 줄을 어절로 나눈다. 빈 어절은 버린다.
export function splitWords(line: string): string[] {
  return line.split(/\s+/).filter(Boolean);
}
```

`src/components/Hero.astro` frontmatter 에 추가한다.

```astro
import { splitWords } from '../motion/words';
let wi = 0;
const lines = content.headline.map((line) => splitWords(line).map((w) => ({ w, i: wi++ })));
```

기존 `<h1 class="h1">…</h1>` 한 줄을 다음으로 바꾼다.

```astro
<h1 class="h1">
  {lines.map((words, li) => (
    <>
      {li > 0 && <br />}
      {words.map(({ w, i }, k) => (
        <>{k > 0 && ' '}<span class="w" style={`--i:${i}`}>{w}</span></>
      ))}
    </>
  ))}
</h1>
```

`motion.css` 의 reduced-motion 가드 앞에 추가한다.

```css
/* ── Hero 진입: 어절이 차례로 떠오르고, 배지·리드·CTA 가 뒤따른다 ── */
.hero .w{display:inline-block;animation:w-in .9s var(--ease) both;animation-delay:calc(120ms + var(--i) * 55ms)}
@keyframes w-in{from{opacity:0;transform:translateY(.6em);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
.hero .pill,.hero .lead,.hero .hero-cta{animation:rise-in .9s var(--ease) both}
.hero .pill{animation-delay:0ms}
.hero .lead{animation-delay:620ms}
.hero .hero-cta{animation-delay:760ms}
```

- [ ] **Step 4: 테스트 통과와 수동 확인**

Run: `npx vitest run tests/words.test.ts`
Expected: PASS 3건.

`npm run dev` 에서 새로고침 시 헤드라인 어절이 왼쪽부터 떠오르고 줄바꿈 위치가 작업 전과 같은지 본다. 1000px 미만과 모바일 폭에서도 줄바꿈이 어색하지 않아야 한다. 어색하면 `.hero .w` 의 `display:inline-block` 을 유지한 채 `--i` 간격을 55ms 에서 40ms 로 줄인다.

- [ ] **Step 5: 커밋**

```bash
git add src/motion/words.ts tests/words.test.ts src/components/Hero.astro src/styles/motion.css
git commit -m "feat(motion): 히어로 헤드라인을 어절 단위로 떠오르게 한다"
```

---

### Task 5: Hero 사진 카드 포인터 틸트

**Files:**
- Modify: `src/scripts/motion.ts`, `src/styles/motion.css`

**Interfaces:**
- Consumes: `.stack`, `.stack-a` (Hero.astro 기존 마크업).
- Produces: `.stack-a` 에 `--rx`, `--ry` CSS 변수가 실시간으로 설정된다.

- [ ] **Step 1: 런타임에 틸트 추가**

`src/scripts/motion.ts` 의 `initCount();` 줄 **위**에 함수를 추가하고, 맨 아래에서 호출한다.

```ts
function initTilt(): void {
  const stack = document.querySelector<HTMLElement>('.stack');
  const card = document.querySelector<HTMLElement>('.stack-a');
  if (!stack || !card || reduce) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const MAX = 5;
  stack.addEventListener('pointermove', (e) => {
    const r = stack.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', `${(x * MAX * 2).toFixed(2)}deg`);
    card.style.setProperty('--rx', `${(-y * MAX * 2).toFixed(2)}deg`);
  });
  stack.addEventListener('pointerleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
}

initCount();
initTilt();
```

- [ ] **Step 2: CSS 추가**

`motion.css` 가드 앞에 추가한다. 모바일 해제 규칙은 global.css 의 `.tilt-l{transform:none}` 보다 명세도가 높아서 여기서 다시 선언해야 한다.

```css
/* ── Hero 사진 카드 틸트: 런타임이 --rx/--ry 만 갱신하고 변환은 CSS 가 한다 ── */
.stack{perspective:1200px}
.stack-a.tilt-l{transform:rotate(-1.6deg) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .6s var(--ease)}
@media (max-width:767px){.stack-a.tilt-l{transform:none}}
```

- [ ] **Step 3: 수동 확인**

데스크톱에서 사진 카드 위로 포인터를 움직이면 최대 5도 안에서 따라오고, 벗어나면 0.6초에 걸쳐 원위치하는지 본다. 모바일 에뮬레이션(767px 이하)에서는 회전이 전혀 없어야 한다. reduced-motion 에뮬레이션에서는 포인터에 반응하지 않아야 한다.

- [ ] **Step 4: 테스트·빌드와 커밋**

Run: `npm test && npm run build`
Expected: 전부 통과.

```bash
git add src/scripts/motion.ts src/styles/motion.css
git commit -m "feat(motion): 히어로 사진 카드가 포인터를 따라 살짝 기울게 한다"
```

---

### Task 6: Hero 배경 네트워크 라인 드로잉

**Files:**
- Modify: `src/components/Hero.astro:7`, `src/styles/motion.css`

**Interfaces:**
- Produces: `.hero-net` 장식 SVG. 내용 없음, `aria-hidden`.

- [ ] **Step 1: SVG 삽입**

`src/components/Hero.astro` 의 `<section class="hero">` 바로 다음 줄, `<div class="wrap hero-grid">` 앞에 넣는다.

```astro
<svg class="hero-net" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
  <g class="net-lines">
    <path pathLength="1" d="M80 120 L300 220 L520 160 L720 300" />
    <path pathLength="1" d="M300 220 L260 420 L540 480" />
    <path pathLength="1" d="M520 160 L540 480" />
  </g>
  <g class="net-nodes">
    <circle cx="80" cy="120" r="3" /><circle cx="300" cy="220" r="3" /><circle cx="520" cy="160" r="3" />
    <circle cx="720" cy="300" r="3" /><circle cx="260" cy="420" r="3" /><circle cx="540" cy="480" r="3" />
  </g>
</svg>
```

- [ ] **Step 2: CSS 추가**

```css
/* ── Hero 배경: 특허 노드가 선으로 이어지는 장식. 로드 시 한 번 그려진다 ── */
.hero{position:relative}
.hero .wrap{position:relative;z-index:1}
.hero-net{position:absolute;inset:0;width:100%;height:100%;color:var(--accent);opacity:.14;pointer-events:none}
.net-lines path{fill:none;stroke:currentColor;stroke-width:1;stroke-dasharray:1;stroke-dashoffset:1;
  animation:net-draw 2.4s var(--ease) both}
.net-lines path:nth-child(1){animation-delay:.3s}
.net-lines path:nth-child(2){animation-delay:.9s}
.net-lines path:nth-child(3){animation-delay:1.4s}
@keyframes net-draw{to{stroke-dashoffset:0}}
.net-nodes circle{fill:currentColor;opacity:0;animation:net-pop .6s var(--ease) both}
.net-nodes circle:nth-child(1){animation-delay:.3s}
.net-nodes circle:nth-child(2){animation-delay:.9s}
.net-nodes circle:nth-child(3){animation-delay:1.3s}
.net-nodes circle:nth-child(4){animation-delay:1.8s}
.net-nodes circle:nth-child(5){animation-delay:1.6s}
.net-nodes circle:nth-child(6){animation-delay:2.2s}
@keyframes net-pop{to{opacity:1}}
```

- [ ] **Step 3: 수동 확인과 판단**

라이트·다크 모두에서 선이 "보일락 말락" 수준인지 본다. 헤드라인 가독성을 해치면 `opacity` 를 .10 까지 내린다. 그래도 산만하면 이 Task 를 되돌린다(`git revert`). 유지 여부를 `.motion/context-notes.md` 에 적는다.

- [ ] **Step 4: 커밋**

```bash
git add src/components/Hero.astro src/styles/motion.css
git commit -m "feat(motion): 히어로 배경에 노드·선 라인 드로잉을 옅게 깐다"
```

---

### Task 7: 내비 스크롤 축소 (scroll-driven)

**Files:**
- Modify: `src/styles/motion.css`

- [ ] **Step 1: CSS 추가**

```css
/* ── 내비: 160px 스크롤 안에서 살짝 위로 붙고 얇아진다. 미지원 브라우저는 그대로 ── */
@supports (animation-timeline: scroll()) {
  .nav{animation:nav-shrink linear both;animation-timeline:scroll(root);animation-range:0 160px}
  @keyframes nav-shrink{to{top:12px;padding-top:5px;padding-bottom:5px;box-shadow:inset 0 0 0 1px var(--hair),var(--lift-3)}}
}
```

- [ ] **Step 2: 테스트와 수동 확인**

Run: `npx vitest run tests/motion.test.ts`
Expected: PASS. `@supports` 밖에 `animation-timeline` 이 없다는 검사를 통과한다.

Chrome 에서 스크롤 시 내비가 줄어들고 맨 위로 돌아오면 원래 크기로 복귀하는지 본다. Firefox 에서 열어 아무 변화 없이 정상 표시되는지 본다. reduced-motion 에뮬레이션에서는 축소가 없어야 한다(가드의 `.nav{animation:none}`).

- [ ] **Step 3: 커밋**

```bash
git add src/styles/motion.css
git commit -m "feat(motion): 스크롤하면 떠 있는 내비가 살짝 축소되게 한다"
```

---

### Task 8: 카드 hover 리프트와 폼 완료 상태 전환

**Files:**
- Modify: `src/styles/motion.css`, `src/components/PageScript.astro:95`

- [ ] **Step 1: CSS 추가**

```css
/* ── 전문 영역 카드와 칩: hover 시 떠오른다. 캐스케이드 카드와 같은 문법 ── */
.cards .shell,.areas .shell{transition:transform .9s var(--ease),box-shadow .9s var(--ease)}
.cards .shell:hover{transform:translateY(-6px);box-shadow:inset 0 0 0 1px var(--hair),var(--lift-3)}
.areas .shell:hover{transform:translateY(-3px);box-shadow:inset 0 0 0 1px var(--hair),var(--lift-2)}

/* ── 연락 폼 완료 상태: 떠오르며 등장 ── */
.ok.show{display:block;animation:rise-in .8s var(--ease) both}
```

- [ ] **Step 2: PageScript 한 줄 변경**

`src/components/PageScript.astro` 에서 `okBox.style.display = 'block';` 을 다음으로 바꾼다.

```js
okBox.classList.add('show');
```

- [ ] **Step 3: 수동 확인**

전문 영역 카드와 칩에 hover 하면 떠오르는지 본다. 폼은 실제 전송 대신 DevTools 콘솔에서 `document.getElementById('cform').style.display='none'; document.getElementById('fok').classList.add('show')` 를 실행해 완료 박스가 떠오르며 나타나는지 본다.

- [ ] **Step 4: 커밋**

```bash
git add src/styles/motion.css src/components/PageScript.astro
git commit -m "feat(motion): 전문 영역 카드 hover 와 폼 완료 상태에 리프트를 준다"
```

---

### Task 9: 자동화 흐름도 데이터

**Files:**
- Modify: `src/data/types.ts:9`, `src/data/content.ko.ts:79-100`, `src/data/content.en.ts:80-101`
- Test: `tests/motion.test.ts`

**Interfaces:**
- Produces: `AutomationFlow { nodes: string[]; hold: number }` 과 `AutomationItem.flow: AutomationFlow`. `hold` 는 멈춰서 확인하는 노드의 인덱스다. Task 10 이 렌더한다.

- [ ] **Step 1: 실패하는 테스트 추가**

`tests/motion.test.ts` 끝에 추가한다.

```ts
import { getContent } from '../src/data';

describe('자동화 흐름도 데이터', () => {
  const ko = getContent('ko');
  const en = getContent('en');

  it('항목마다 flow 가 있고 노드는 3~5개다', () => {
    for (const c of [ko, en]) {
      for (const a of c.automation) {
        expect(a.flow.nodes.length).toBeGreaterThanOrEqual(3);
        expect(a.flow.nodes.length).toBeLessThanOrEqual(5);
        for (const n of a.flow.nodes) expect(n.trim()).not.toBe('');
      }
    }
  });

  it('KO/EN 노드 수와 hold 위치가 같다', () => {
    ko.automation.forEach((a, i) => {
      expect(en.automation[i].flow.nodes.length).toBe(a.flow.nodes.length);
      expect(en.automation[i].flow.hold).toBe(a.flow.hold);
    });
  });

  it('hold 는 노드 범위 안이다', () => {
    for (const c of [ko, en]) {
      for (const a of c.automation) {
        expect(a.flow.hold).toBeGreaterThanOrEqual(0);
        expect(a.flow.hold).toBeLessThan(a.flow.nodes.length);
      }
    }
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run tests/motion.test.ts`
Expected: FAIL. `a.flow` 가 undefined.

- [ ] **Step 3: 타입과 데이터 추가**

`src/data/types.ts` 의 `AutomationItem` 을 다음으로 바꾼다.

```ts
/** 흐름도. hold 는 사람이 확인하거나 규칙이 판단하는, 한 박자 멈추는 노드의 인덱스 */
export interface AutomationFlow { nodes: string[]; hold: number; }
export interface AutomationItem { icon: string; title: string; description: string; status: string; flow: AutomationFlow; }
```

`src/data/content.ko.ts` 의 자동화 세 항목에 각각 `status` 아래 추가한다. 라벨은 모두 해당 항목 설명문에 있는 단어다.

```ts
      flow: { nodes: ['리포트 정리', '포털 제출', '사람 승인', '발송'], hold: 2 },
```
```ts
      flow: { nodes: ['발명자 문의', '규칙 엔진 판단', 'AI 설명'], hold: 1 },
```
```ts
      flow: { nodes: ['특허 검색', 'AI 분석', '차이 리포트', '사람 판단'], hold: 3 },
```

`src/data/content.en.ts` 의 세 항목에도 같은 자리에 추가한다. 라벨은 영문 설명문의 표현을 그대로 줄인 것이다.

```ts
      flow: { nodes: ['Report preparation', 'Portal submission', 'Human approval', 'Delivery'], hold: 2 },
```
```ts
      flow: { nodes: ['Inventor question', 'Rule engine', 'LLM explains'], hold: 1 },
```
```ts
      flow: { nodes: ['Patent search', 'AI analysis', 'Difference report', 'Final call'], hold: 3 },
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test`
Expected: 전부 통과. 타입 오류가 있으면 `npx astro check` 로 확인한다.

- [ ] **Step 5: 커밋**

```bash
git add src/data/types.ts src/data/content.ko.ts src/data/content.en.ts tests/motion.test.ts
git commit -m "feat(content): 자동화 항목에 흐름도 노드 데이터를 더한다"
```

---

### Task 10: 자동화 흐름도 렌더링과 순차 점등

**Files:**
- Modify: `src/components/Automation.astro:24-28`, `src/styles/motion.css`

**Interfaces:**
- Consumes: `a.flow.nodes`, `a.flow.hold` (Task 9).
- Produces: `<ol class="flow">` 과 `li.flow-n` (hold 노드는 `.flow-hold`), 각 노드에 `--d` (ms) 지연값.

- [ ] **Step 1: 마크업 추가**

`src/components/Automation.astro` 에서 `<p class="body" style="margin-top:14px">{a.description}</p>` 바로 아래에 추가한다. 지연은 노드 순서 420ms 간격이고 hold 뒤 노드는 500ms 더 늦는다.

```astro
<ol class="flow">
  {a.flow.nodes.map((n, k) => (
    <li class={`flow-n${a.flow.hold === k ? ' flow-hold' : ''}`}
        style={`--d:${k * 420 + (k > a.flow.hold ? 500 : 0)}ms`}>{n}</li>
  ))}
</ol>
```

- [ ] **Step 2: CSS 추가**

```css
/* ── 자동화 흐름도: 카드가 .in 이 되면 왼쪽 노드부터 켜지고, hold 노드에서 점이 찍히며 한 박자 쉰다 ── */
.flow{display:flex;flex-wrap:wrap;align-items:center;row-gap:10px;margin-top:22px;padding:0;list-style:none}
.flow-n{position:relative;border-radius:999px;padding:6px 12px;font-size:11.5px;font-weight:550;color:var(--muted);
  background:var(--tint-1);box-shadow:inset 0 0 0 1px var(--chip-ring)}
.flow-n+.flow-n{margin-left:26px}
.flow-n+.flow-n::before{content:"";position:absolute;right:100%;top:50%;width:26px;height:1px;
  background:var(--divider-strong);transform-origin:left;transform:scaleX(0)}
.flow-hold::after{content:"";position:absolute;top:-4px;right:-4px;width:9px;height:9px;border-radius:999px;
  background:var(--accent);transform:scale(0)}
.rv.in .flow-n{animation:flow-lit .6s var(--ease) both;animation-delay:var(--d)}
.rv.in .flow-n+.flow-n::before{animation:flow-line .4s var(--ease) both;animation-delay:calc(var(--d) - 300ms)}
.rv.in .flow-hold::after{animation:flow-pop .5s var(--ease) both;animation-delay:calc(var(--d) + 450ms)}
@keyframes flow-lit{to{color:var(--ink);background:var(--surface);box-shadow:inset 0 0 0 1px var(--hair),var(--lift-1)}}
@keyframes flow-line{to{transform:scaleX(1)}}
@keyframes flow-pop{to{transform:scale(1)}}
```

- [ ] **Step 3: 수동 확인**

Automation 섹션으로 스크롤하면 카드마다 노드가 왼쪽부터 켜지고, 연결선이 노드 직전에 그려지며, hold 노드(사람 승인 / 규칙 엔진 판단 / 사람 판단)에 accent 점이 찍힌 뒤 다음 노드가 늦게 켜지는지 본다. 모바일 폭에서 노드가 줄바꿈될 때 연결선이 어색하면 `.flow-n+.flow-n::before` 를 `@media (min-width:600px)` 안으로 옮긴다. reduced-motion 에서는 모든 노드가 즉시 켜진 상태여야 한다.

- [ ] **Step 4: 테스트·빌드와 커밋**

Run: `npm test && npm run build`
Expected: 전부 통과.

```bash
git add src/components/Automation.astro src/styles/motion.css
git commit -m "feat(motion): 자동화 카드에 순차 점등 흐름도를 그린다"
```

---

### Task 11: 설계 원칙 아이콘 마이크로 애니메이션

**Files:**
- Create: `src/components/PrincipleIcon.astro`
- Modify: `src/components/Principles.astro:17`, `src/styles/motion.css`
- Test: `tests/motion.test.ts`

**Interfaces:**
- Consumes: `p.key` (`'Gate' | 'Split' | 'Boundary'`).
- Produces: `<svg class="pi pi-gate|pi-split|pi-boundary">`. 모르는 key 면 아무것도 렌더하지 않는다.

- [ ] **Step 1: 실패하는 테스트 추가**

`tests/motion.test.ts` 끝에 추가한다.

```ts
describe('설계 원칙 아이콘', () => {
  it('원칙 key 는 아이콘이 있는 3종이다', () => {
    const keys = getContent('ko').principles.map((p) => p.key.toLowerCase());
    expect(keys).toEqual(['gate', 'split', 'boundary']);
  });
});
```

Run: `npx vitest run tests/motion.test.ts`
Expected: PASS (데이터는 이미 맞다). 이 테스트는 이후 key 가 바뀌면 아이콘이 사라지는 사고를 막는 회귀 장치다.

- [ ] **Step 2: 아이콘 컴포넌트 작성**

```astro
---
// 설계 원칙 아이콘 3종. key 로 고르고, 모르는 key 면 아무것도 그리지 않는다. 선 굵기는 토글 아이콘과 같은 1.6.
interface Props { kind: string; }
const kind = Astro.props.kind.toLowerCase();
---
{kind === 'gate' && (
  <svg class="pi pi-gate" viewBox="0 0 96 48" aria-hidden="true" focusable="false">
    <path class="pi-line" d="M6 24 H90" />
    <rect class="pi-bar" x="46" y="8" width="3" height="32" rx="1.5" />
    <path class="pi-check pi-d" pathLength="1" d="M56 12 l4 4 l8 -8" />
    <circle class="pi-dot" cx="6" cy="24" r="4" />
  </svg>
)}
{kind === 'split' && (
  <svg class="pi pi-split" viewBox="0 0 96 48" aria-hidden="true" focusable="false">
    <path class="pi-trunk pi-d" pathLength="1" d="M6 24 H40" />
    <path class="pi-branch pi-d" pathLength="1" d="M40 24 C56 24 56 10 72 10 H90" />
    <path class="pi-branch pi-d" pathLength="1" d="M40 24 C56 24 56 38 72 38 H90" />
    <rect class="pi-tag" x="78" y="4" width="12" height="12" rx="2" />
    <path class="pi-tag pi-wave" d="M78 38 q3 -4 6 0 t6 0" />
  </svg>
)}
{kind === 'boundary' && (
  <svg class="pi pi-boundary" viewBox="0 0 96 48" aria-hidden="true" focusable="false">
    <rect class="pi-doc" x="6" y="12" width="20" height="24" rx="3" />
    <rect class="pi-wall" x="46" y="4" width="3" height="40" rx="1.5" />
    <path class="pi-read pi-d" pathLength="1" d="M30 18 H72" />
    <path class="pi-write pi-d" pathLength="1" d="M72 30 H54" />
    <path class="pi-x pi-d" pathLength="1" d="M50 27 l6 6 M56 27 l-6 6" />
  </svg>
)}
```

`src/components/Principles.astro` 의 `<div class="step-k">{p.key}</div>` 바로 위에 추가한다.

```astro
<PrincipleIcon kind={p.key} />
```

frontmatter 에 import 를 추가한다.

```astro
import PrincipleIcon from './PrincipleIcon.astro';
```

- [ ] **Step 3: CSS 추가**

```css
/* ── 설계 원칙 아이콘: 카드가 .in 이 되면 각 원칙을 한 번 연기한다 ── */
.pi{display:block;width:96px;height:48px;margin-bottom:14px;color:var(--accent);overflow:visible}
.pi *{fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.pi .pi-dot,.pi .pi-tag{fill:currentColor;stroke:none}
.pi .pi-wave{fill:none;stroke:currentColor}
.pi .pi-line,.pi .pi-wall{opacity:.35}
.pi .pi-d{stroke-dasharray:1;stroke-dashoffset:1}
.pi .pi-bar{transform-box:fill-box;transform-origin:50% 100%}
.pi .pi-tag{opacity:0}

/* Gate: 체크가 그려지면 문이 열리고 점이 통과한다 */
.rv.in .pi-gate .pi-check{animation:pi-draw .5s var(--ease) .3s both}
.rv.in .pi-gate .pi-bar{animation:pi-open .7s var(--ease) 1s both}
.rv.in .pi-gate .pi-dot{animation:pi-pass 2.2s var(--ease) .1s both}
@keyframes pi-open{to{transform:rotate(-70deg)}}
@keyframes pi-pass{0%{transform:translateX(0)}30%{transform:translateX(34px)}55%{transform:translateX(34px)}100%{transform:translateX(84px)}}

/* Split: 한 줄기가 규칙(사각)과 AI(물결)로 갈라진다 */
.rv.in .pi-split .pi-trunk{animation:pi-draw .5s var(--ease) .2s both}
.rv.in .pi-split .pi-branch{animation:pi-draw .7s var(--ease) .6s both}
.rv.in .pi-split .pi-tag{animation:pi-show .4s var(--ease) 1.3s both}

/* Boundary: 읽기 화살표는 벽을 지나고, 쓰기 화살표는 벽에서 막혀 X 가 찍힌다 */
.rv.in .pi-boundary .pi-read{animation:pi-draw .7s var(--ease) .2s both}
.rv.in .pi-boundary .pi-write{animation:pi-draw .5s var(--ease) 1s both}
.rv.in .pi-boundary .pi-x{animation:pi-draw .35s var(--ease) 1.5s both}
.pi .pi-read{stroke-dasharray:.06 .04}
.rv.in .pi-boundary .pi-read{animation-name:pi-draw-dashed}
@keyframes pi-draw{to{stroke-dashoffset:0}}
@keyframes pi-draw-dashed{from{stroke-dasharray:0 1}to{stroke-dasharray:.06 .04}}
@keyframes pi-show{to{opacity:1}}
```

- [ ] **Step 4: 수동 확인**

Principles 섹션 진입 시 세 아이콘이 각자 2초 안에 한 번 연기하고 끝 상태로 멈추는지 본다. 라이트·다크 모두에서 accent 색으로 보여야 한다. Boundary 의 점선 화살표가 지저분하면 `pi-draw-dashed` 를 버리고 `.pi-read` 도 실선 `pi-draw` 로 통일한다.

- [ ] **Step 5: 테스트·빌드와 커밋**

Run: `npm test && npm run build`
Expected: 전부 통과.

```bash
git add src/components/PrincipleIcon.astro src/components/Principles.astro src/styles/motion.css tests/motion.test.ts
git commit -m "feat(motion): 설계 원칙 카드에 Gate·Split·Boundary 아이콘 연출을 넣는다"
```

---

### Task 12: 경력 타임라인 진행선 (scroll-driven)

**Files:**
- Modify: `src/components/Timeline.astro:12-22`, `src/styles/motion.css`

**Interfaces:**
- Produces: `.cv-list` 래퍼. 데스크톱(760px 이상)에서만 진행선과 점이 보인다.

- [ ] **Step 1: 마크업 래핑**

`src/components/Timeline.astro` 에서 `{content.experience.map(...)}` 전체를 `<div class="cv-list">…</div>` 로 감싼다.

```astro
<div class="rv"><div class="shell"><div class="core core-pad">
  <div class="cv-list">
    {content.experience.map((e) => (
      <div class="cv-row">
        <div class="cv-when">{e.period}</div>
        <div>
          <div class="cv-who">{e.title}{e.current && <span class="cv-now">NOW</span>}</div>
          <p class="cv-what">{e.description}</p>
        </div>
      </div>
    ))}
  </div>
</div></div></div>
```

- [ ] **Step 2: CSS 추가**

```css
/* ── 경력: 왼쪽 진행선이 스크롤에 따라 채워지고 도달한 행의 점이 켜진다. 데스크톱만 ── */
@media (min-width:760px){
  .cv-list{position:relative;padding-left:26px}
  .cv-list::before,.cv-list::after{content:"";position:absolute;left:4px;top:10px;bottom:10px;width:1px}
  .cv-list::before{background:var(--divider-strong)}
  .cv-list::after{background:var(--accent);transform-origin:top;transform:scaleY(0)}
  .cv-row{position:relative}
  .cv-row::before{content:"";position:absolute;left:-26px;top:.4em;width:9px;height:9px;border-radius:999px;
    background:var(--surface);box-shadow:inset 0 0 0 1.5px var(--divider-strong)}
  @supports (animation-timeline: view()) {
    .cv-list::after{animation:cv-fill linear both;animation-timeline:view();animation-range:cover 15% cover 75%}
    .cv-row::before{animation:cv-dot linear both;animation-timeline:view();animation-range:entry 0% entry 60%}
  }
}
@keyframes cv-fill{to{transform:scaleY(1)}}
@keyframes cv-dot{to{background:var(--accent);box-shadow:inset 0 0 0 1.5px var(--accent)}}
```

- [ ] **Step 3: 수동 확인**

Chrome 데스크톱에서 경력 카드를 지나갈 때 진행선이 위에서 아래로 채워지고 각 행의 점이 차례로 accent 가 되는지 본다. 기존 행 구분선(`.cv-row+.cv-row` inset shadow)과 겹치지 않아야 한다. Firefox 에서는 선과 점이 정적인 회색으로만 보여야 한다. 759px 이하에서는 선과 점이 없고 레이아웃이 작업 전과 같아야 한다.

- [ ] **Step 4: 테스트·빌드와 커밋**

Run: `npm test && npm run build`
Expected: 전부 통과. `tests/motion.test.ts` 의 `@supports` 검사가 통과해야 한다.

```bash
git add src/components/Timeline.astro src/styles/motion.css
git commit -m "feat(motion): 경력 카드에 스크롤 연동 진행선과 점을 그린다"
```

---

### Task 13: 검수, 배포, 인계

**Files:**
- Modify: `.motion/checklist.md`, `.motion/context-notes.md`

- [ ] **Step 1: 접근성과 브라우저 검수**

Chrome DevTools Rendering 패널에서 `prefers-reduced-motion: reduce` 를 켜고 전체 페이지를 훑는다. 움직이는 것이 없어야 하고, 모든 내용(헤드라인 어절, 흐름도 노드, 아이콘, 지표)이 최종 상태로 보여야 한다. 끄고 다시 훑어 연출이 돌아오는지 본다. `prefers-color-scheme` 라이트·다크 둘 다 확인한다. Firefox 와 Safari(가능하면)에서 레이아웃 깨짐이 없는지 본다.

- [ ] **Step 2: 성능 기준치 비교**

`npm run build && npm run preview` 후 Lighthouse 모바일 성능 점수를 Task 1 기준치와 비교한다. 떨어졌으면 원인을 찾는다. 가장 흔한 원인은 Task 6 의 SVG 가 LCP 앞에 끼어드는 것이며, 그 경우 `.hero-net` 애니메이션 지연을 LCP 뒤인 1.2초로 미룬다.

- [ ] **Step 3: 전체 테스트와 푸시, 프리뷰 확인**

```bash
npm test && npm run build && git push -u origin feat/motion
```
Vercel 이 만든 프리뷰 URL 을 열어 Step 1 을 한 번 더 한다.

- [ ] **Step 4: main 병합과 라이브 검증**

```bash
git switch main && git merge --ff-only feat/motion && git push origin main
```
배포 후 `https://ipmoa.vercel.app/` 와 `/en/` 에서 지표 카운트업과 흐름도가 도는지 본다.

- [ ] **Step 5: 인계 문서 갱신과 커밋**

`.motion/checklist.md` 의 항목을 전부 체크하고, `.motion/context-notes.md` 에 완료 일자, 최종 Lighthouse 점수, Task 6 유지 여부를 적는다.

```bash
git add .motion/
git commit -m "docs(motion): 모션 레이어 작업을 마감하고 인계 문서를 갱신한다"
git push origin main
```
