// 자격증 KO 데이터 — IP·기술가치평가 / 기초·범용 두 그룹, 취득연월 내림차순
import type { CertGroup } from './types';

export const ko: CertGroup[] = [
  {
    title: 'IP · 기술가치평가',
    tone: 'primary',
    items: [
      { date: '2025.12', name: '기술거래사', issuer: '산업통상자원부' },
      { date: '2023.03', name: '기업기술가치평가사', issuer: '한국기업기술가치평가협회' },
      { date: '2022.11', name: '지식재산능력평가 공인 3급', issuer: '한국발명진흥회' },
      { date: '2019.05', name: '기술신용평가사 3급', issuer: '기술보증기금' },
      { date: '2017.05', name: 'IP정보검색사', issuer: '한국지식재산서비스협회' },
      { date: '2016.03', name: '기술평가사', issuer: '한국기술사업화진흥협회' },
      { date: '2014.06', name: '발명특허교육사', issuer: '한국발명교육학회' },
    ],
  },
  {
    title: '기초 · 범용',
    tone: 'muted',
    items: [
      { date: '2011.07', name: '1종보통운전면허', issuer: '경찰청' },
      { date: '2010.08', name: 'AutoCAD 2급', issuer: '한국ATC협회' },
      { date: '2009.07', name: '전자기기기능사', issuer: '한국산업인력공단' },
      { date: '2009.06', name: '정보기기운용기능사', issuer: '한국산업인력공단' },
      { date: '2007.11', name: '아마추어무선기사', issuer: '정보통신부' },
      { date: '2007.05', name: '컴퓨터활용능력 2급', issuer: '대한상공회의소' },
      { date: '2003.03', name: '워드프로세서 3급', issuer: '대한상공회의소' },
    ],
  },
];
