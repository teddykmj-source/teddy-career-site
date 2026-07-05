# teddy-career-site

Teddy(Minjae Kim) IP 전문가 개인 브랜딩 웹사이트. Astro + Tailwind, 이중언어(KO/EN), Vercel 배포.

## 개발
- `npm install` — 의존성 설치
- `npm run dev` — 로컬 개발 서버
- `npm test` — 콘텐츠/i18n 유닛 테스트
- `npm run build` — 정적 빌드

## 콘텐츠 수정
- 표시 텍스트: `src/data/content.ko.ts`, `src/data/content.en.ts`
- 연락처: `src/data/contact.ts`

## 배포 (Vercel)
Vercel 프로젝트에 이 GitHub 저장소를 연결하면 `main` push마다 자동 빌드·배포된다.
서브도메인 루트에서 서비스되므로 `astro.config.mjs`의 `base`는 `'/'`.
- `site`는 실제 배포 URL(`https://<project>.vercel.app`)과 일치시켜야 canonical/sitemap이 정확하다.
- 이후 커스텀 도메인(`ipmoa.dev` 등)을 붙이면 Vercel Project → Domains에서 연결하고 `site`만 그 도메인으로 갱신한다.
