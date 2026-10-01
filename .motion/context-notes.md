# 모션 레이어 컨텍스트 노트

작업 중 내린 결정과 이유. 계속 덧붙인다.

## 2026-10-01 설계

- **방향 A 선택.** 사용자가 A(기존 사이트에 모션 추가), B(모션 중심 재설계), C(소개 영상) 중 A 를 골랐다. B 는 비교용 목업만 만든다.
- **CSS 우선.** 후보는 CSS 우선 / GSAP / 하이브리드. 정적 Astro 사이트에 70KB 를 더 얹을 이유가 없어 CSS 우선. 흐름도 시퀀싱이 바닐라로 감당 안 될 때만 GSAP 를 재검토한다.
- **`.rv` 리빌은 교체하지 않는다.** IO 방식이 전 브라우저에서 동작하고 이미 reduced-motion 처리까지 돼 있다. scroll-driven 은 추가 연출(내비, 경력선)에만 쓴다.
- **스크롤 연동과 뷰 전환은 `@supports` 안에만.** Firefox·구형 Safari 에서 정적 상태로 조용히 남게 하려는 것이고, `tests/motion.test.ts` 가 이 규칙을 강제한다.
- **reduced-motion 가드는 전역 `*` 규칙.** 기존 global.css 는 선택자 목록 방식인데, 신규 CSS 는 한 파일에 모이므로 파일 끝 전역 규칙이 더 안전하다. 테스트가 가드 뒤에 `@keyframes` 가 없음을 검사한다.
- **모션 CSS 는 `motion.css` 한 파일.** global.css 를 안 건드려야 디자인 원본(soft-skill 판본)과의 대조가 계속 가능하다. BaseLayout 에서 global 뒤에 import 한다.
- **카운트업 로직은 순수 함수로 분리.** `'11년+'`, `'2,200+'`, `'2×'`, `'In development · 200 test cases'` 처럼 숫자 앞뒤 문자가 제각각이라 파싱을 테스트로 고정해야 한다. 최종 값은 항상 원문과 동일하다.
- **흐름도 노드 라벨은 설명문의 단어만.** 인계 문서의 "새 문구를 지어내지 않는다" 원칙. EN 라벨은 영문 설명문 표현을 줄인 것이며 실행 시 한 번 더 대조한다.
- **`flow.hold` 는 필수.** 세 항목 모두 "사람 또는 규칙이 확인하는" 노드가 있어서 옵셔널로 둘 이유가 없다.
- **뺀 것.** 언론 마키(묶음 구조와 접근성 훼손), 토글 모핑(이미 있음), WebGL·커스텀 커서·자동재생 영상·전역 smooth-scroll.
- **로케일 전환 페이드는 `@view-transition` (문서 간).** Astro `<ClientRouter />` 를 쓰면 `is:inline` PageScript 재실행 문제를 떠안는다. 문서 간 뷰 전환은 CSS 한 줄이고 라우터가 없다.
- **문서 위치.** 저장소 관례(`.redesign/HANDOFF.md`)를 따라 `.motion/` 에 둔다. superpowers 기본 경로(`docs/superpowers/`)는 쓰지 않는다.


## 2026-10-01 구현 중 결정

- **Task 2 regex 를 `/\d+(?:,\d{3})*/` 로 좁혔다.** 계획의 `/\d[\d,]*/` 는 `'항목 3, 기타'` 같은 문자열에서 최종값이 원문과 달라졌다. 실제 콘텐츠 문자열 왕복 테스트를 추가해 "최종값 = 원문" 을 고정했다.
- **Task 11 Boundary 아이콘의 점선 화살표를 버리고 실선으로 통일했다.** `pi-draw-dashed` 가 offset 을 건드리지 않아 진행형 드로잉이 되지 않았고, round cap 에서는 점선이 실선처럼 보여 효과도 없었다. 계획이 명시한 fallback 그대로다.
- **Task 6 히어로 네트워크는 유지한다.** 다크·라이트 모두 보일락 말락 수준이고 헤드라인 가독성을 해치지 않는다. 되돌리려면 `git revert 7c2c2d3`.
- **흐름도 연결선은 600px 이상에서만 그린다.** 375px 에서 4번째 노드가 줄바꿈되며 연결선 조각이 남았다. `margin-left` 대신 `column-gap` 을 써서 줄바꿈 행 들여쓰기도 없앴다. `<ol>` 에 `role="list"` 를 붙여 `list-style:none` 에서도 목록 의미를 지킨다.
- **경력 점·선은 같은 기준선을 쓴다.** 처음 계획(`view()` + `cover 15%~75%` / `entry 0%~60%`)은 점이 뷰포트에 들어오자마자 켜지고 선은 따로 채워졌다. 지금은 `.cv-list` 와 `.cv-row` 에 named view timeline 을 두고 `view-timeline-inset:0 40%` 로 뷰포트 60% 지점을 기준선으로 삼는다. 범위는 반드시 `entry-crossing` 이어야 한다. `entry` 는 subject 가 inset 스크롤포트보다 길면 "subject top 이 스크롤포트 top 에 닿는 지점" 을 100% 로 잡아 선이 점보다 앞서 간다.
- **히어로 h1 의 줄 사이 공백 `{' '}<br />` 를 되살렸다.** 어절 span 작업 중 빠져 textContent 가 "전략으로연결하는" 으로 붙었었다.
- **`tests/motion.test.ts` 의 `@supports` 검사는 주석을 벗긴 뒤 중괄호 깊이를 세는 스캐너다.** 처음 regex 는 중첩 블록에서 거짓 통과했다. 가드에 `animation:none!important` 가 있는지도 단언한다(scroll-driven 은 duration 을 무시하므로 이 줄이 가드의 핵심이다).
- **보류한 것.** 카드 hover 를 `@media (hover:hover)` 로 묶기(기존 `.casc-item` 패턴과 동일하게 둠), 카운트업 threshold 를 `.rv` 와 맞추기, 2행 이후 점 위치를 `.cv-when` 기준으로 옮기기, 틸트의 매 이벤트 `getBoundingClientRect`. 모두 현재 동작에 문제가 없어 손대지 않았다.

## 2026-10-01 추가: 실(thread)

- **B 목업에서 실 하나만 가져왔다.** 사용자 요청. `src/components/Thread.astro` 의 `div.thread` 를 `/`·`/en/` 에만 넣고, CSS 는 `motion.css` 의 경력 블록 앞에 있다. `scroll(root)` 로 `::after` 를 `scaleY` 하며, 미지원 브라우저와 reduced-motion 에서는 `--hair` 트랙만 남는다.
- **위치는 콘텐츠 왼쪽 가장자리에서 22px 바깥.** `left:calc(max(var(--gut), (100vw - 1240px) / 2 + var(--gut)) - 22px)` 로 `.wrap` 의 패딩 가장자리를 따라간다. 899px 이하는 `display:none`. 자격증 페이지는 짧아서 넣지 않았다.

## 기준치

- Lighthouse 모바일 성능 (작업 전) 0.86. 사후 0.87 (LCP 3.8s, CLS 0.017, TBT 70ms). 측정은 `npx lighthouse` 헤드리스, `npm run preview` 대상.
- 런타임 스크립트는 HTML 에 인라인된 module 약 1.5KB. 외부 의존성 0.

## 열린 질문

- `/` ↔ `/en/` 교차 페이드 때마다 히어로 진입 연출(어절, 네트워크 드로잉)이 다시 재생된다. 의도된 동작으로 두었다. 거슬리면 `@view-transition` 만 빼면 된다.
