# 모션 레이어 설계 (2026-10-01)

ipmoa.vercel.app 의 현재 포트폴리오 디자인 위에 모션을 입힌다. 레이아웃과 문구는 그대로 두고, CSS 를 우선으로 쓰며, JS 는 CSS 로 불가능한 두 가지(카운트업, 포인터 틸트)에만 쓴다.

## 확정 사항 (사용자)

- 방향 A. 기존 사이트에 모션 레이어 추가. 재설계 아님, 영상 아님.
- 구현 방식 1. CSS 우선. 외부 애니메이션 라이브러리 없음.
- 작업 저장소는 이 저장소(`~/projects/teddy-career-site`)다.

## 원칙

- 모션은 각 섹션의 메시지를 한 번씩 거든다. 모션이 주인공이 되지 않는다.
- 새 문구를 지어내지 않는다. 흐름도 노드 라벨은 기존 `content.{ko,en}.ts` 설명문에 있는 단어로만 만든다.
- 숫자는 바꾸지 않는다. 카운트업은 표시 연출일 뿐 최종 값은 데이터와 동일하다.
- `prefers-reduced-motion: reduce` 에서는 모든 신규 애니메이션이 즉시 최종 상태로 간다. 기존 `.rv` 규칙과 같은 태도다.
- 지원하지 않는 브라우저에서는 조용히 정적 상태로 남는다. 스크롤 연동 애니메이션은 `@supports (animation-timeline: …)` 안에만 둔다.
- 기존 토큰(`--ease`, `--lift-*`, `--accent`)만 쓴다. 새 색이나 새 easing 을 만들지 않는다.
- em대시(—) 0개. 한글 `keep-all` 유지.

## 섹션별 연출

| 섹션 | 연출 | 수단 |
|---|---|---|
| Hero | 헤드라인 어절 단위 리빌, 배지·리드·CTA 순차 등장 | CSS keyframes + 빌드 시 어절 분할 |
| Hero | 사진 카드 포인터 틸트 (최대 5도) | 소형 JS 가 CSS 변수만 갱신 |
| Hero | 배경에 노드·선 네트워크 라인 드로잉 (accent, 불투명도 .14) | 인라인 SVG + `stroke-dashoffset` |
| StatStrip | 4개 지표 카운트업 1회 | JS (IntersectionObserver + rAF), 순수 함수는 테스트 |
| Highlights | 카드 hover 리프트, 칩 hover 리프트 | CSS transition |
| Automation | 카드마다 흐름도. 뷰포트 진입 시 노드가 왼쪽부터 순서대로 켜지고 사람 승인 노드에서 한 박자 멈춘다. 테스트 케이스 수 카운트업 | 데이터(`flow`) + CSS keyframes, 카운트업은 공용 JS |
| Principles | Gate / Split / Boundary 아이콘 마이크로 애니메이션 | 인라인 SVG + CSS keyframes |
| Experience | 세로 진행선이 스크롤에 따라 채워지고 도달한 행의 점이 켜진다 | CSS scroll-driven animations (`view()`) |
| Contact | 전송 완료 상태가 떠오르며 등장 | CSS keyframes, PageScript 한 줄 변경 |
| 공통 | 내비가 스크롤 시 살짝 축소 | CSS scroll-driven animations (`scroll()`) |
| 공통 | `/` ↔ `/en/` 교차 페이드 | `@view-transition { navigation: auto }` (라우터 없음) |

## 의도적으로 뺀 것

- 언론 보도 마키. 수상 건별 묶음 구조를 깨고 내용을 복제해야 해서 뺐다.
- 테마 토글 모핑. 이미 CSS 초승달 모핑이 구현돼 있다.
- WebGL 히어로, 커스텀 커서, 자동재생 영상, 전역 smooth-scroll 라이브러리.
- `.rv` 리빌을 scroll-driven 으로 교체하는 것. 지금 IO 방식이 모든 브라우저에서 동작하므로 유지한다.

## 파일 구조

| 파일 | 역할 |
|---|---|
| `src/styles/motion.css` | 신규 모션 CSS 전부. 끝에 reduced-motion 가드. `BaseLayout.astro` 에서 `global.css` 뒤에 import |
| `src/motion/countup.ts` | 지표 문자열 파싱·포맷 순수 함수 |
| `src/motion/words.ts` | 헤드라인 어절 분할 순수 함수 |
| `src/scripts/motion.ts` | 브라우저 런타임. 카운트업과 틸트만 |
| `src/components/MotionScript.astro` | 런타임 로더. 메인 페이지 두 곳에 포함 |
| `src/components/PrincipleIcon.astro` | 원칙 아이콘 SVG 3종 |
| `src/data/types.ts`, `content.{ko,en}.ts` | `AutomationItem.flow` 추가 |
| `tests/countup.test.ts`, `tests/words.test.ts`, `tests/motion.test.ts` | 순수 함수, 데이터 대칭, CSS 가드 검증 |

## 브라우저 전략

- 어디서나 동작. keyframes, transition, IO 기반 JS, 카운트업, 틸트, 흐름도, 원칙 아이콘.
- 지원 시에만. 내비 축소(`scroll()`), 경력 진행선(`view()`), 교차 페이드(`@view-transition`). 미지원 브라우저는 정적 상태로 남고 레이아웃은 동일하다.

## 성공 기준

- `npm test` 전부 통과, `npm run build` 성공.
- Chrome 에서 reduced-motion 에뮬레이션 시 움직이는 요소가 없고 모든 내용이 보인다.
- Lighthouse 모바일 성능 점수가 작업 전 기준치 아래로 떨어지지 않는다.
- 라이트·다크 모두에서 연출이 읽힌다.
- 모바일(767px 이하)에서 겹침·회전·틸트가 없다. 기존 규칙 유지.
