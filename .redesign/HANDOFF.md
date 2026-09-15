# 포트폴리오 디자인으로 사이트 재설계 — 진행 상태

세션이 끊기면 이 파일을 읽고 이어서 진행한다. 체크 안 된 첫 항목부터 시작.

## 결정 사항 (사용자 확정)

- 루트(`/`)를 포트폴리오 디자인으로. 기존 `/portfolio/` 정적본은 제거한다.
- **한·영 둘 다** 새 디자인. 번역은 `src/data/content.en.ts` 의 기존 문구를 쓴다.
- 자격증: 메인에 IP 7개 요약 + "전체 보기" → 별도 페이지 유지(같은 디자인).
- 덱(`/deck/`)과 커리어 사이트는 **병행**. 덱은 건드리지 않는다.
- 디자인 원본: `~/projects/Career_Managing/teddy-portfolio.html` (soft-skill 판본)

## 원칙

- **새 문구를 지어내지 않는다.** 기존 `content.{ko,en}.ts` 문구를 그대로 쓴다.
  대형 카드 3개 = `highlights`, 소형 칩 6개 = `skills`.
- 숫자는 SSOT(`~/projects/Career_Managing/ai-projects/PROJECTS.md`) 기준: 200 / 34 / 279, 합계 513.
- 금지 표현: 운영 중 · 도입 완료 · 성과 달성 · 절감률 · ROI · 저장소 코드명.
- em대시(—) 0개. 한글은 `word-break: keep-all`.

## 체크리스트

- [x] 1. `types.ts` 확장 (HeroSpec, Principle, FormLabels, SectionHeadings)
- [x] 2. `content.ko.ts` / `content.en.ts` 에 새 필드 추가
- [x] 3. 포트폴리오 CSS → `src/styles/global.css` 이식 (토큰·다크모드·토글)
- [x] 4. 사진 6장 → `public/` 로 이동, 참조 경로 정리
- [x] 5. 섹션 컴포넌트 재작성 (데이터 구동)
- [x] 6. 자격증 페이지 새 디자인
- [x] 7. 라우팅: `prefixDefaultLocale: false` → `/` = 한국어, `/en/` = 영문
- [x] 8. `/ko/*` → 새 경로 리다이렉트 (`vercel.json`), 기존 색인 URL 보존
- [x] 9. `public/portfolio/` 제거 + `tests/portfolio.test.ts` 정리
- [x] 10. `npm test` + `npm run build` + 로컬 렌더 확인
- [x] 11. 커밋 · push · Vercel 배포 · 라이브 검증
- [x] 12. `PROJECTS.md` 채널 표 갱신 (11번 성격 변경: 사본 → Astro 구현)

## 되돌리는 법

- 사이트: `git -C ~/projects/teddy-career-site log --oneline` 에서 `72a2030` 이전으로.
- Career_Managing: `.bak-20260916*` 파일들.


## 완료 (2026-09-16)

커밋 `c7ec54f` → Vercel 프로덕션 배포 → 라이브 검증 통과.

| 경로 | 상태 |
|---|---|
| `/` | 한국어 포트폴리오 (canonical) |
| `/en/` | 영문 포트폴리오 |
| `/certifications/` · `/en/certifications/` | 자격 14 + 교육 5 |
| `/deck/` | 덱 (건드리지 않음) |
| `/ko/*` · `/portfolio/` | 308 리다이렉트 |

`npm test` 30건 통과. 문구는 `src/data/content.{ko,en}.ts` 가 유일한 출처다.

## 남은 것

- `robots.txt` 는 아직 전체 허용이다. 비공개로 두고 싶은 경로가 있으면 여기서 막는다.
- 채널 10(`Career_Managing/teddy-portfolio.html`)은 디자인 출처로만 보존한다.
  문구를 고칠 곳은 채널 8·9 이지 10이 아니다.
