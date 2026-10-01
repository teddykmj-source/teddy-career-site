# 모션 레이어 체크리스트

세션이 끊기면 이 파일을 읽고 이어서 진행한다. 체크 안 된 첫 항목부터 시작. 세부 절차는 `.motion/plan.md`, 결정 근거는 `.motion/context-notes.md`.

## 결정 사항 (사용자 확정, 2026-10-01)

- 방향 A. 기존 사이트 위에 모션 레이어. 레이아웃·문구 유지.
- CSS 우선. 외부 애니메이션 라이브러리 없음. JS 는 카운트업과 틸트만.
- 브랜치 `feat/motion`. 구현 전 목업(A·B)을 먼저 보고 시작한다.

## 구현

- [x] 1. 브랜치 생성, Lighthouse 기준치 기록, `motion.css` 뼈대 + reduced-motion 가드 + 교차 페이드
- [x] 2. 카운트업 순수 함수 (`src/motion/countup.ts`) + 테스트
- [x] 3. 카운트업 런타임, 지표 4개와 테스트 케이스 수 3개에 적용
- [x] 4. Hero 헤드라인 어절 리빌 + 배지·리드·CTA 순차 등장
- [x] 5. Hero 사진 카드 포인터 틸트
- [x] 6. Hero 배경 네트워크 라인 드로잉 (검수 후 유지 여부 결정)
- [x] 7. 내비 스크롤 축소 (`@supports` 안)
- [x] 8. 전문 영역 카드·칩 hover 리프트, 폼 완료 상태 전환
- [x] 9. 자동화 흐름도 데이터 (`flow`) + KO/EN 대칭 테스트
- [x] 10. 자동화 흐름도 렌더링 + 순차 점등
- [x] 11. 설계 원칙 아이콘 3종 + 마이크로 애니메이션
- [x] 12. 경력 타임라인 진행선 (`@supports` 안)
- [x] 13a. Chrome 다크/라이트·모바일 375px 검수, Lighthouse 비교(0.86 → 0.87), 인계 갱신
- [x] 13b. 푸시, Vercel 프리뷰 확인, main 병합(ff, 47aa64c), 라이브 검증
- [x] 14. B 목업의 실(thread): 왼쪽 여백 세로선이 스크롤 진행률만큼 자람. 메인 페이지만, 900px 이상 (2026-10-01)

## 디자인 감사 후속 (2026-10-02)

- [x] 15. optimize. 사진 6장을 `src/assets` 로 옮겨 Astro Picture 로 AVIF·WebP 반응형 변환, Geist 비동기 로드
- [x] 16. typeset. h1 3rem·h2 2.75rem·h3 1.22rem·리드 1.12rem·지표 3.5rem 로 상한 축소, 소형 텍스트 12px 하한
- [x] 17. adapt. hover 규칙 18개를 `@media (hover:hover)` 로, 작은 인라인 링크 padding-block 4px
- [x] 18. harden. 장식 사진 alt 비움, 카운트업 숫자 aria-hidden + .sr 원문
- [x] 19. polish. 검출기·테스트·빌드·1440/450px·라이트/다크 확인, Lighthouse 0.87 → 0.96
- [x] 20. main 병합·배포 (ff, 2026-10-02)
- [x] 21. 다크 토큰 블록 중복 제거. 색 토큰을 `light-dark()` 한 줄로, 테마 블록은 color-scheme 과 `--img-adj` 만 (2026-10-02)
- [x] 22. main 병합·배포 (ff, 2026-10-02)
- [x] 23. 숫자·라벨 글꼴 Geist → Archivo (400·500·600), 지표 500/-.045em (2026-10-02)
- [ ] 24. main 병합·배포 (사용자 확인 후)

## 되돌리는 법

- 브랜치 전체. `git switch main` 하고 `feat/motion` 을 버린다.
- 특정 연출만. Task 단위 커밋이므로 해당 커밋을 `git revert` 한다.

## 완료 (2026-10-01)

`feat/motion` 21 커밋을 main 에 fast-forward 병합(47aa64c) → Vercel 프로덕션 배포 → 라이브 검증 통과. 브랜치는 로컬·origin 모두 삭제했다. `npm test` 56건 통과.
