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

## 2026-10-02 디자인 감사 후속

- **감사 점수 17/20.** 약한 축은 성능(LCP 3.8s)과 소형 텍스트·터치 대상이었다. 테마와 구현 일관성은 4점.
- **글자 크기는 키우지 않고 한 단계 낮췄다.** 사용자가 전체화면에서 제목·리드가 접히는 것을 지적했다. 상한을 h1 3rem(48px), h2 2.75rem(44px), h3 1.22rem, 리드 1.12rem, 지표 3.5rem 로 내려 h1>h2 위계를 복구했고 1440px 에서 섹션 제목 7개가 모두 한 줄이다. 10~11.5px 였던 보도 칩·흐름도 노드는 내용 텍스트라 12px 로, pill 과 NOW 배지는 10.5px 로 올렸다. 대문자 자간 라벨(log-k·work-meta 11px)은 그대로다.
- **사진은 `public/` 이 아니라 `src/assets/` 에 있다.** Astro `<Picture>` 가 빌드 때 480/720/893(960)px AVIF·WebP 를 만든다. `tests/redesign.test.ts` 의 사진 존재 검사도 이 경로를 본다. 히어로는 `loading="eager" fetchpriority="high"`.
- **Geist 만 비동기, Pretendard 는 차단 유지.** Geist 는 숫자·라벨 전용이라 swap 이 눈에 덜 띈다. Pretendard 를 비동기로 하면 본문 전체가 FOUT 로 흔들린다. 그 대가로 CLS 가 0.017 → 0.036 으로 늘었지만 양호 범위다.
- **hover 는 `@media (hover:hover)` 안에만.** 터치에서 탭 후 리프트가 고정되는 문제. global.css 16개, motion.css 2개.
- **카운트업 접근성.** `.stat-n`·`.work-meta` 는 `.sr` 원문 + `aria-hidden` 숫자 두 span 이다. `data-count` 는 숫자 span 에만 붙는다.
- **Lighthouse 모바일 성능 0.87 → 0.96.** LCP 3.8s → 2.5s, FCP 1.8 → 1.6, SI 2.3 → 1.9. 검출기 잔여 경고는 Geist 과다 사용 1건이며 라벨 전용이라 수용.

## 2026-10-02 테마 토큰 단일화

- **다크 값은 `light-dark(라이트, 다크)` 한 줄에만 있다.** 전에는 `@media (prefers-color-scheme:dark)` 와 `:root[data-theme="dark"]` 가 같은 32줄을 복제해 한쪽만 고치면 테마가 갈라졌다. 이제 두 테마 블록은 `color-scheme:dark` 와 색이 아닌 `--img-adj` 만 바꾼다. global.css 가 458 → 404줄.
- **그림자는 기하와 색을 분리했다.** `--lift-1/2/3` 는 offset·blur 를 한 번만 쓰고 `--sh-*` 색 토큰(light-dark)을 참조한다. 라이트는 기판 색조 알파, 다크는 순검정 알파로 값은 이전과 동일하다.
- **브라우저 하한.** `light-dark()` 는 Chrome 123·Safari 17.5·Firefox 120(2024년 상반기) 이상이다. 그 아래에서는 색 토큰이 무효가 돼 흰 바탕·검정 글자의 무장식 상태로 읽힌다(깨지지는 않는다). Lightning CSS 는 폴리필 없이 그대로 내보낸다. 2026년 시점 점유율로 수용했다.
- **검증.** `tests/theme.test.ts` 가 토큰 단일 선언과 테마 블록 내용을 고정한다. Chrome 에서 시스템 다크·강제 라이트·강제 다크 세 상태의 body/surface/accent/그림자/사진 필터가 이전 값과 같음을 확인했다.

## 2026-10-02 숫자·라벨 글꼴을 Geist 에서 Archivo 로

- **왜.** 검출기가 Geist 를 과다 사용 글꼴로 경고했고, 후보 4종 비교(https://claude.ai/artifact/NftJWdfR4X5A1AwFaLByt9)에서 Archivo 가 숫자가 가장 단단하면서 Pretendard 와 톤이 가장 가까웠다. Bricolage 는 개성이 강해 모션 레이어 위에 얹기엔 과했다.
- **어디.** `--en` 토큰 한 줄과 BaseLayout 의 Google Fonts 링크(400·500·600 만). 본문 Pretendard 는 그대로다.
- **지표 웨이트 600 → 500, 자간 -.04em → -.045em.** Archivo 가 넓어 600 이면 56px 지표가 무거워진다.
- 검출기 경고 0건, 테스트 59건, 빌드 정상.

## 2026-10-02 라이트 muted 한 단계 어둡게

- `--muted` 라이트 값을 #656C78 → #5E6572 로. 라이트 기판 대비 4.85:1 → 5.38:1, 표면 대비 5.29:1 → 5.87:1. AA 경계에 걸쳐 있던 여유를 벌었다. 다크 값은 그대로다.

## 2026-10-02 Pretendard 자체 호스팅

- **왜.** 남은 LCP 병목이 jsdelivr 의 Pretendard CSS(렌더 차단, 교차 출처)였다. 외부 CDN 의존도 하나 줄인다.
- **어떻게.** devDependency `pretendard@1.3.9` 의 `pretendardvariable-dynamic-subset.css` 를 BaseLayout 에서 import 한다. Vite 가 92개 woff2 서브셋을 `_astro/` 로 해시 붙여 내보내고, 브라우저는 unicode-range 에 맞는 조각만 받는다. `font-display:swap` 은 원본 CSS 그대로다.
- **대가.** dist 가 약 3MB 커진다(서브셋 파일). 실제 전송량은 페이지에 나오는 글자 범위만큼이라 CDN 때와 같다.
- `tests/fonts.test.ts` 가 jsdelivr 링크 부재와 Archivo 비동기 로드를 고정한다.
- **효과.** Lighthouse 모바일 0.96 유지, LCP 2.6s → 2.5s, TBT 60 → 30ms, CLS 0.036 → 0.04. 외부 출처는 Google Fonts(Archivo) 하나만 남았다.

## 2026-10-05 본문 건너뛰기 링크

- BaseLayout body 맨 앞에 `.skip` 링크(ko "본문으로 건너뛰기", en "Skip to content")를 두고, 네 페이지의 `main#top` 에 `tabindex="-1"` 을 줘 포커스 목적지로 삼았다. 평소엔 화면 밖에 있다가 키보드 포커스를 받으면 왼쪽 위에 CTA 색 알약으로 나타난다.
- Chrome 에서 Tab → Enter → Tab 이 내비를 건너뛰고 본문 첫 링크("성과")로 가는 것을 확인했다. `tests/skip-link.test.ts` 가 구조를 고정한다.

## 2026-10-05 경력·수상 문구를 업무 위키와 사용자 확인에 맞춤

- 가온그룹 설명을 위키 경력기술서 근거로 다시 썼다(필수성 검증·수익화·소송 전담 삭제, 해외 권리화·매각 양수·로열티 정산 추가). 직함은 「IP팀 매니저」, 소송은 「분쟁 대응」.
- 2026 두 상은 수상 확정 + 「(기관 표창)」, 2022 ICT 특허경영대상은 「(법인 수상)」. 배포용 덱(`public/deck/`)의 수상 카드에도 같은 표기를 붙였다.
- 이력서·원본 덱·PDF 는 `~/projects/Career_Managing`(비추적)에서 같이 고쳤다. 근거 보고서는 같은 폴더의 `wiki-포트폴리오-갱신검토_20261005.md`. 저장소가 공개라 여기엔 두지 않는다.
- 제외 결정: 감사 기간 「26개월」은 쓰지 않는다.
- 하이라이트 카드 1·2 를 위키 근거로 다시 썼다. 「표준특허 수익화 · 전 주기 주도」는 「표준특허 권리화·거래」(필수성 검증, Post-VVC 발명 5건·해외 15개 출원 라인, 매각 실사·계약 검토 실무)로, 감사 카드는 「현장감사부터 종결까지 대응, 감사인 제출 최종본 작성, 사전 내부감사 체계 구축」으로. 카드 3(중국 디자인 소송)은 연우 시절이라 위키 범위 밖이어서 그대로 둔다.

## 2026-10-05 소개 문단

- 「표준특허 수익화와 라이선스 감사·기술가치평가를 이끌고」를 위키 경력기술서 범위(창출·해외 권리화, 특허 거래, 감사 대응, 직무발명 제도 실무)로 낮추고, 회사 업무로 기록된 AX 자동화 도구 배포를 한 구절 더했다. 이것은 회사 업무라 AUTOMATION 섹션(개인 프로젝트)과 섞지 않는다. 영문은 em대시를 없애고 "led" 를 "handled" 로.

## 2026-10-05 직무발명 봇 테스트 케이스 34 → 105

- GitHub 기본 브랜치 기준 실측(`tests/` 의 `def test_`, SSOT 와 같은 잣대). 로컬 사본 `~/projects/kaon-ip-bot` 이 9/7 에 멈춰 34건으로 남아 있었다. SSOT 의 `verify-numbers.sh` 는 이제 이 저장소만 GitHub 에서 얕게 받아 센다.
- 대표 3개 합계 513 → 584 (덱 통계 카드). 사이트·덱·이력서 두 종·면접 문서·포트폴리오 페이지를 함께 고쳤고 `verify-channels.sh` 전 채널 통과.

## 기준치

- Lighthouse 모바일 성능 (작업 전) 0.86. 사후 0.87 (LCP 3.8s, CLS 0.017, TBT 70ms). 측정은 `npx lighthouse` 헤드리스, `npm run preview` 대상.
- 런타임 스크립트는 HTML 에 인라인된 module 약 1.5KB. 외부 의존성 0.

## 열린 질문

- `/` ↔ `/en/` 교차 페이드 때마다 히어로 진입 연출(어절, 네트워크 드로잉)이 다시 재생된다. 의도된 동작으로 두었다. 거슬리면 `@view-transition` 만 빼면 된다.
