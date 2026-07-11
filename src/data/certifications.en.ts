// 자격증 EN 데이터 — KO와 동일 구조/순서, 자격명·기관 영문 번역
import type { CertGroup } from './types';

export const en: CertGroup[] = [
  {
    title: 'IP · Technology Valuation',
    tone: 'primary',
    items: [
      { date: '2025.12', name: 'Technology Transfer Broker', issuer: 'Ministry of Trade, Industry and Energy' },
      { date: '2023.03', name: 'Corporate Technology Valuation Appraiser', issuer: 'Korea Corporate Technology Valuation Association' },
      { date: '2022.11', name: 'IP Ability Test (Certified, Level 3)', issuer: 'Korea Invention Promotion Association' },
      { date: '2019.05', name: 'Technology Credit Evaluator, Level 3', issuer: 'Korea Technology Finance Corporation' },
      { date: '2017.05', name: 'IP Information Search Specialist', issuer: 'Korea Intellectual Property Service Association' },
      { date: '2016.03', name: 'Technology Appraiser', issuer: 'Korea Technology Commercialization Promotion Association' },
      { date: '2014.06', name: 'Invention & Patent Educator', issuer: 'Korean Society for Invention Education' },
    ],
  },
  {
    title: 'Foundational · General',
    tone: 'muted',
    items: [
      { date: '2011.07', name: "Class 1 Driver's License", issuer: 'Korean National Police Agency' },
      { date: '2010.08', name: 'AutoCAD, Level 2', issuer: 'Korea ATC Association' },
      { date: '2009.07', name: 'Craftsman Electronic Apparatus', issuer: 'HRD Korea' },
      { date: '2009.06', name: 'Craftsman Information Equipment Operation', issuer: 'HRD Korea' },
      { date: '2007.11', name: 'Amateur Radio Operator', issuer: 'Ministry of Information and Communication' },
      { date: '2007.05', name: 'Computer Proficiency, Level 2', issuer: 'Korea Chamber of Commerce & Industry' },
      { date: '2003.03', name: 'Word Processor, Level 3', issuer: 'Korea Chamber of Commerce & Industry' },
    ],
  },
];
