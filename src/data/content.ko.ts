import type { SiteContent } from './types';

export const ko: SiteContent = {
  fullName: 'Teddy · Minjae Kim',
  eyebrow: '라이선스 · 표준특허 · 분쟁대응 · 기술가치평가',
  headline: ['지식재산을 수익과 전략으로', '연결하는 IP 전문가'],
  tagline:
    '특허 창출·관리부터 국제 분쟁 대응, 직무발명 제도, 그리고 표준특허 수익화와 라이선스 감사까지. 지식재산이 실제 사업 가치로 이어지는 전 과정을 다룹니다.',
  ctaContact: '연락하기',
  ctaDeck: 'IP 소개 자료',
  stats: [
    { value: '11년+', label: 'IP 실무 경력' },
    { value: '2,200+', label: '지식재산권 관리' },
    { value: '2회', label: '특허청장상 수상' },
    { value: '14', label: '보유 자격증', href: '/ko/certifications/' },
  ],
  aboutTitle: 'ABOUT',
  about:
    '중소·중견 규모의 다양한 산업 현장에서 기업 IP 실무를 폭넓게 담당해 왔습니다. 화장품·가구·미디어 등 여러 분야에서 국내외 특허·상표·디자인 포트폴리오 운영, 국제 지재권 분쟁 대응, 직무발명 보상제도 설계를 두루 경험했고, 현재는 가온그룹 IP팀에서 표준특허 창출·해외 권리화와 특허 거래, 코덱 라이선스 감사 대응, 직무발명 제도 실무를 맡고 있으며, 팀의 AI 전환(AX) 과제로 업무 자동화 도구를 만들어 사내에 배포하고 있습니다.',
  skills: [
    '라이선스 감사·로열티', '표준특허(SEP)', '직무발명 보상',
    'IP 소송·분쟁', '기술가치평가', '특허 포트폴리오',
  ],
  experienceTitle: 'EXPERIENCE',
  experience: [
    {
      period: '2022.09 — 현재',
      title: '가온그룹㈜ · IP팀 매니저',
      description:
        'Post-VVC 표준특허 창출·필수성 검증과 해외 권리화, 특허 매각·양수 실무, 글로벌 코덱 라이선서 현장감사 대응 및 사전 내부감사 체계 구축, 월별 로열티 정산, 직무발명 제도 관리와 보상금 분쟁 대응, 정부 표준과제 수행',
      current: true,
    },
    {
      period: '2022.04 — 2022.09',
      title: '㈜시몬스 · 지식재산팀 대리',
      description:
        '병행수입·위조상품 단속(200여건), 경쟁사 모니터링 및 상표·부정경쟁 대응, 위조상품 유통방지 협의회 운영위원',
    },
    {
      period: '2017.03 — 2022.03',
      title: '㈜연우 · 선행연구팀 주임/계장',
      description:
        'IP 2,200여건 창출·관리, 국제 지재권 분쟁 대응(중국 디자인 침해소송 승소), 직무발명보상 우수기업 인증 3회, 2019·2021 특허청장상 2회 수상',
    },
    {
      period: '2016.04 — 2017.01',
      title: '㈜비즈웍스 · 기획팀 주임/계장',
      description: '정품인증솔루션 BM특허 3건 확보(전자봉인·안심택배·전자근로계약), 경쟁사 특허 조사·분석 및 회피설계',
    },
    {
      period: '2015.01 — 2016.03',
      title: '노블국제특허법률사무소 · 특허팀 사원',
      description: '특허출원 명세서 작성·중간사건 대응, 선행기술조사·침해분석, STX조선해양·벽산 등 기업·산학연 특허 담당',
    },
  ],
  certificationsTitle: 'CERTIFICATIONS',
  certViewAll: '전체 자격증 보기 →',
  highlightsTitle: 'HIGHLIGHTS',
  highlights: [
    {
      icon: 'award',
      title: '표준특허 권리화·거래',
      description: '필수성 검증, Post-VVC 발명 5건의 해외 15개 출원 라인 권리화, 표준특허 매각 실사·계약 검토 실무',
    },
    {
      icon: 'shield',
      title: '라이선스 감사 대응',
      description: '글로벌 코덱 라이선서 현장감사부터 종결까지 대응, 감사인 제출 최종본 작성, 사전 내부감사 체계 구축',
    },
    {
      icon: 'gavel',
      title: '국제 IP 분쟁 승소',
      description: '중국 디자인 침해소송 승소, 특허침해·무효 사건 다수 대응',
    },
  ],
  automationTitle: 'AUTOMATION',
  automationLead:
    '11년간 손으로 해온 IP 실무에서 병목을 찾아 직접 설계하고 구현합니다. 도메인을 아는 사람이 직접 만들 때만 나오는 결과가 있습니다.',
  automation: [
    {
      icon: 'workflow',
      title: '로열티 정산 자동화',
      description:
        '마감마다 반복되던 리포트 정리·포털 제출·발송을 하나의 흐름으로 묶었습니다. 자동화하되 발송은 사람이 승인하는 2단계 게이트로 오발송을 구조적으로 차단하고, 제출 증빙을 자동 보관해 감사 추적성을 확보하도록 설계했습니다.',
      status: '개발 중 · 테스트 케이스 200건',
      flow: { nodes: ['리포트 정리', '포털 제출', '사람 승인', '발송'], hold: 2 },
    },
    {
      icon: 'rules',
      title: '직무발명 신고 봇',
      description:
        '발명자가 직무발명 해당 여부를 스스로 판단하지 못해 반복되는 문의를, 판단 자동화로 줄이는 것을 목표로 설계했습니다. 법적 판단은 규칙 엔진, 설명만 AI가 맡도록 분리해 환각 여지를 없앴습니다.',
      status: '개발 중 · 테스트 케이스 34건',
      flow: { nodes: ['발명자 문의', '규칙 엔진 판단', 'AI 설명'], hold: 1 },
    },
    {
      icon: 'search',
      title: '선행조사 엔진',
      description:
        '아이디어 단계에서 선행기술을 빠르게 훑도록 특허 검색과 AI 분석을 파이프라인으로 연결했습니다. 원본 데이터는 절대 수정하지 않고 차이 리포트만 내며, 최종 판단은 항상 사람이 합니다.',
      status: '구현 완료 · 테스트 케이스 279건',
      flow: { nodes: ['특허 검색', 'AI 분석', '차이 리포트', '사람 판단'], hold: 3 },
    },
  ],
  activitiesTitle: 'ACTIVITIES & AWARDS',
  activities: [
    '2021 기업지식재산명장 특허청장상 수상 (정부포상)',
    '2026 직무발명제도 운영 우수사례 공모 우수상·한국발명진흥회장상 수상 (기관 표창)',
    '2026 표준특허 창출지원 우수 참여기관 지식재산처장상 수상 (기관 표창)',
    '2022 ICT특허경영대상 과학기술정보통신부장관상 수상 (법인 수상)',
    'KINPA(한국지식재산협회) 중소·중견기업분과 부위원장 (2020–2022)',
    '중소기업 IP담당자 가이드북 참여위원 · 잡코리아 지식재산담당 인터뷰',
  ],
  pressTitle: 'IN THE PRESS',
  press: [
    {
      title: '2021 기업지식재산명장 특허청장상 수상',
      links: [
        { outlet: '라이센스뉴스', url: 'https://www.lcnews.co.kr/news/articleView.html?idxno=27405' },
        { outlet: '비즈월드', url: 'https://www.bizwnews.com/news/articleView.html?idxno=29725' },
        { outlet: '보안뉴스', url: 'https://m.boannews.com/html/detail.html?idx=102745' },
        { outlet: '상주뉴스', url: 'https://r2225.tistory.com/8727078' },
      ],
    },
    {
      title: '2026 직무발명 우수사례 한국발명진흥회장상 수상 (기관 표창)',
      links: [
        { outlet: '파이낸셜뉴스', url: 'https://www.fnnews.com/news/202606241027072274' },
        { outlet: '아시아경제', url: 'https://www.asiae.co.kr/article/2026052708335509155' },
      ],
    },
    {
      title: '2022 ICT특허경영대상 과기정통부 장관상 수상 (법인 수상)',
      links: [
        { outlet: '큐리오시스', url: 'https://curiosis.co.kr/2022-ict-%ED%8A%B9%ED%97%88%EA%B2%BD%EC%98%81%EB%8C%80%EC%83%81-%EC%8B%9C%EC%83%81%EC%8B%9D-%EA%B0%9C%EC%B5%9C%EA%B8%B0%EC%97%85-6%EA%B0%9C%EC%82%AC%C2%B7%EA%B0%9C%EC%9D%B8-6%EC%9D%B8/' },
        { outlet: '전자신문', url: 'https://www.etnews.com/20221213000125' },
      ],
    },
    {
      title: '잡코리아 지식재산담당 인터뷰',
      links: [
        { outlet: '잡코리아', url: 'https://www.jobkorea.co.kr/starter/interview/View/21524' },
        { outlet: '잡코리아(미니)', url: 'https://www.jobkorea.co.kr/company/1377248' },
        { outlet: '알바몬', url: 'https://m.albamon.com/alba-talk/interview/21524' },
      ],
    },
  ],
  footerNote: '라이선스·표준특허·기술가치평가 협업을 환영합니다.',
  glossaryLink: 'IP 용어사전',
  heroSpecs: [
    { label: '경력', value: '11년+' },
    { label: '전문', value: 'SEP · 라이선스 감사' },
    { label: '거점', value: 'Seoul, KR' },
  ],
  headings: {
    practice: 'End-to-End IP Practice',
    experience: 'Firm Side to Client Side',
    automation: 'Automating My Own Workflow',
    principles: 'Principles Before Code',
    awards: 'Awards and Press',
    certifications: 'Credentials on File',
    contact: 'Get in Touch',
  },
  practiceTitle: 'PRACTICE AREAS',
  principlesTitle: 'APPROACH',
  principles: [
    {
      key: 'Gate',
      title: '사람이 승인한 것만 나갑니다',
      description: '자동화의 마지막 단계는 사람입니다. 발송과 제출은 2단계 게이트를 거치게 해 자동 실행 사고를 구조로 막습니다.',
    },
    {
      key: 'Split',
      title: '판단과 설명을 분리합니다',
      description: '틀리면 안 되는 판단은 규칙 엔진이, 설명과 문답은 AI가 맡습니다. 환각이 들어올 자리를 아예 없앱니다.',
    },
    {
      key: 'Boundary',
      title: '원본은 건드리지 않습니다',
      description: '사내 데이터는 읽기만 하고 차이 리포트만 냅니다. 회사 데이터를 코드에 들이지 않는 경계를 먼저 설계합니다.',
    },
  ],
  contactTitle: 'CONTACT',
  contactLead: '라이선스 감사, 표준특허 수익화, 분쟁 대응 모두 좋습니다. 어떤 판단이 필요한지만 적어 주시면 됩니다.',
  directTitle: '직접 연락',
  replyNote: '보통 영업일 기준 하루 안에 답장합니다.',
  form: {
    name: '이름', email: '이메일', message: '필요한 내용',
    placeholder: '예: 라이선스 계약 3건의 로열티 정합성 검증이 필요합니다.',
    submit: '보내기', sending: '보내는 중',
    okTitle: '잘 받았습니다',
    okBody: '내용 확인하고 회신드리겠습니다. 급하시면 위 메일로 바로 연락 주세요.',
    errName: '이름을 입력해 주세요.',
    errEmail: '메일 주소 형식을 확인해 주세요.',
    errMessage: '어떤 내용인지 열 자 이상 적어 주세요.',
    errSend: '전송하지 못했습니다. 잠시 후 다시 시도하거나 위 메일로 직접 보내 주세요.',
    errNetwork: '네트워크 오류로 전송하지 못했습니다. 위 메일로 보내 주세요.',
  },
  nav: { about: '소개', experience: '경력', highlights: '성과', automation: '자동화', activities: '활동', certifications: '자격', press: '보도' },
};
