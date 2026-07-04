# teddy-career-site

Teddy(Minjae Kim) IP 전문가 개인 브랜딩 웹사이트. Astro + Tailwind, 이중언어(KO/EN), GitHub Pages 배포.

## 개발
- `npm install` — 의존성 설치
- `npm run dev` — 로컬 개발 서버
- `npm test` — 콘텐츠/i18n 유닛 테스트
- `npm run build` — 정적 빌드

## 콘텐츠 수정
- 표시 텍스트: `src/data/content.ko.ts`, `src/data/content.en.ts`
- 연락처: `src/data/contact.ts`

## 배포
`main` 브랜치 push 시 GitHub Actions가 자동 빌드·배포한다.
GitHub 저장소 Settings → Pages → Source를 **GitHub Actions**로 설정할 것.

## 도메인/base 주의
`astro.config.mjs`의 `site`/`base`는 프로젝트 페이지(`<user>.github.io/teddy-career-site`) 기준.
커스텀 도메인 또는 `<user>.github.io` 유저 페이지로 옮기면 `base`를 `'/'`로 바꾸고
`public/CNAME`(커스텀 도메인 시)을 추가한다.
