import type { SiteContent } from './types';

export const en: SiteContent = {
  fullName: 'Teddy · Minjae Kim',
  eyebrow: 'LICENSING · SEP · DISPUTES · IP VALUATION',
  headline: ['Turning intellectual property', 'into revenue and strategy'],
  tagline:
    'From patent creation and portfolio management to international disputes, employee-invention systems, SEP monetization, and license audits — I cover the full path where IP becomes real business value.',
  ctaContact: 'Get in touch',
  ctaDeck: 'IP Profile Deck',
  stats: [
    { value: '11+ yrs', label: 'In-house IP practice' },
    { value: '2,200+', label: 'IP rights managed' },
    { value: '2×', label: 'KIPO Commissioner Award' },
    { value: '14', label: 'Certifications', href: '/en/certifications/' },
  ],
  aboutTitle: 'ABOUT',
  about:
    'I have led corporate IP practice across a range of small and mid-sized industries — cosmetics, furniture, and media. My work spans domestic and international patent, trademark, and design portfolios, cross-border IP dispute response, and employee-invention compensation systems. Today at Kaon Group I lead SEP monetization, license audits, and technology valuation.',
  skills: [
    'License audit & royalties', 'Standard-essential patents', 'Employee invention',
    'IP litigation', 'IP valuation', 'Patent portfolio',
  ],
  experienceTitle: 'EXPERIENCE',
  experience: [
    {
      period: '2022.09 — Present',
      title: 'KAON GROUP · IP Team, Manager',
      description:
        'Post-VVC SEP prosecution abroad and patent sale/acquisition execution; on-site audit response for global codec licensors and a pre-audit internal review cycle; monthly royalty settlement; employee-invention program management and compensation litigation support; government standardization projects.',
      current: true,
    },
    {
      period: '2022.04 — 2022.09',
      title: 'Simmons · IP Team, Assistant Manager',
      description:
        'Parallel-import and counterfeit enforcement (200+ cases), competitor monitoring, trademark and unfair-competition response, anti-counterfeit council steering member.',
    },
    {
      period: '2017.03 — 2022.03',
      title: 'Yonwoo · Advanced Research Team',
      description:
        'Created and managed 2,200+ IP rights, handled international IP disputes (won a design-infringement suit in China), operated the employee-invention system, three-time employee-invention excellence certification, KIPO Commissioner Awards in 2019 and 2021.',
    },
    {
      period: '2016.04 — 2017.01',
      title: 'Bizworks · Planning Team',
      description: 'Secured 3 business-method patents for anti-counterfeit solutions; competitor patent analysis and design-around.',
    },
    {
      period: '2015.01 — 2016.03',
      title: 'Noble International Patent & Law Firm · Patent Team',
      description: 'Patent drafting and office-action response, prior-art and infringement search; handled filings for STX Offshore & Shipbuilding, Byucksan, and others.',
    },
  ],
  certificationsTitle: 'CERTIFICATIONS',
  certViewAll: 'View all certifications →',
  highlightsTitle: 'HIGHLIGHTS',
  highlights: [
    {
      icon: 'award',
      title: 'SEP monetization',
      description: 'Led the full SEP lifecycle from essentiality review to monetization.',
    },
    {
      icon: 'shield',
      title: 'License audit response',
      description: 'Handled on-site Video/Audio codec audits and built an internal-audit process.',
    },
    {
      icon: 'gavel',
      title: 'International IP wins',
      description: 'Won a design-infringement suit in China; handled many infringement and invalidation cases.',
    },
  ],
  automationTitle: 'AUTOMATION',
  automationLead:
    'I find the bottlenecks in the IP work I have done by hand for eleven years, then design and build the systems myself. Some results only come when the person who knows the domain builds the tool.',
  automation: [
    {
      icon: 'workflow',
      title: 'Royalty reporting automation',
      description:
        'Report preparation, portal submission, and delivery — repeated every deadline — pulled into a single flow. Automated, but delivery stays behind a two-step human approval gate so nothing goes out by accident, and submission evidence is archived automatically for audit traceability.',
      status: 'In development · 200 test cases',
      flow: { nodes: ['Report preparation', 'Portal submission', 'Human approval', 'Delivery'], hold: 2 },
    },
    {
      icon: 'rules',
      title: 'Employee-invention filing bot',
      description:
        'Designed to reduce the recurring questions that arise when inventors cannot judge for themselves whether something qualifies as an employee invention. Legal judgment runs on a rule engine; the LLM only explains, which removes any room for hallucination.',
      status: 'In development · 34 test cases',
      flow: { nodes: ['Inventor question', 'Rule engine', 'LLM explains'], hold: 1 },
    },
    {
      icon: 'search',
      title: 'Prior-art search engine',
      description:
        'Patent search and AI analysis connected into one pipeline so ideas can be screened against prior art early. Source data is never modified — only a difference report is produced — and the final call always rests with a person.',
      status: 'Implemented · 279 test cases',
      flow: { nodes: ['Patent search', 'AI analysis', 'Difference report', 'Final call'], hold: 3 },
    },
  ],
  activitiesTitle: 'ACTIVITIES & AWARDS',
  activities: [
    '2021 KIPO Commissioner’s Award — Corporate IP Master (government honor)',
    '2026 KIPA President’s Award, excellence prize for employee-invention program best practice',
    '2026 Minister of Intellectual Property Award, outstanding participating organization in the SEP creation support program',
    '2022 ICT Patent Management Grand Prize, Minister of Science and ICT Award (led the bid)',
    'KINPA (Korea Intellectual Property Association) — SME division vice-chair (2020–2022)',
    'SME IP-officer guidebook contributing member; JobKorea IP-role interview feature',
  ],
  pressTitle: 'IN THE PRESS',
  press: [
    {
      title: '2021 Corporate IP Master — KIPO Commissioner’s Award',
      links: [
        { outlet: 'License News', url: 'https://www.lcnews.co.kr/news/articleView.html?idxno=27405' },
        { outlet: 'BizWorld', url: 'https://www.bizwnews.com/news/articleView.html?idxno=29725' },
        { outlet: 'Boan News', url: 'https://m.boannews.com/html/detail.html?idx=102745' },
        { outlet: 'Sangju News', url: 'https://r2225.tistory.com/8727078' },
      ],
    },
    {
      title: '2026 KIPA President’s Award — employee-invention best practice',
      links: [
        { outlet: 'Financial News', url: 'https://www.fnnews.com/news/202606241027072274' },
        { outlet: 'Asiae', url: 'https://www.asiae.co.kr/article/2026052708335509155' },
      ],
    },
    {
      title: '2022 ICT Patent Management Grand Prize — Minister of Science and ICT',
      links: [
        { outlet: 'Curiosis', url: 'https://curiosis.co.kr/2022-ict-%ED%8A%B9%ED%97%88%EA%B2%BD%EC%98%81%EB%8C%80%EC%83%81-%EC%8B%9C%EC%83%81%EC%8B%9D-%EA%B0%9C%EC%B5%9C%EA%B8%B0%EC%97%85-6%EA%B0%9C%EC%82%AC%C2%B7%EA%B0%9C%EC%9D%B8-6%EC%9D%B8/' },
        { outlet: 'ETNews', url: 'https://www.etnews.com/20221213000125' },
      ],
    },
    {
      title: 'JobKorea — IP professional interview',
      links: [
        { outlet: 'JobKorea', url: 'https://www.jobkorea.co.kr/starter/interview/View/21524' },
        { outlet: 'JobKorea (mini)', url: 'https://www.jobkorea.co.kr/company/1377248' },
        { outlet: 'Albamon', url: 'https://m.albamon.com/alba-talk/interview/21524' },
      ],
    },
  ],
  footerNote: 'Open to collaboration on licensing, SEPs, and IP valuation.',
  glossaryLink: 'IP Glossary',
  heroSpecs: [
    { label: 'Experience', value: '11+ yrs' },
    { label: 'Focus', value: 'SEP · License audit' },
    { label: 'Based in', value: 'Seoul, KR' },
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
      title: 'Nothing leaves without a human',
      description: 'The last step of any automation is a person. Sending and filing pass a two-stage gate, so an accidental dispatch is blocked by structure rather than by care.',
    },
    {
      key: 'Split',
      title: 'Judgment and explanation stay apart',
      description: 'A rules engine makes the calls that must not be wrong; the AI only explains and answers. That leaves no room for a hallucination to matter.',
    },
    {
      key: 'Boundary',
      title: 'Source data is never touched',
      description: 'Internal files are read, never written; the tool emits a diff report instead. The boundary that keeps company data out of the code is designed first.',
    },
  ],
  contactTitle: 'CONTACT',
  contactLead: 'License audits, SEP monetization, dispute response — all welcome. Just tell me what decision you need.',
  directTitle: 'Direct',
  replyNote: 'Usually a reply within one business day.',
  form: {
    name: 'Name', email: 'Email', message: 'What you need',
    placeholder: 'e.g. We need a royalty reconciliation check across three license agreements.',
    submit: 'Send', sending: 'Sending',
    okTitle: 'Received',
    okBody: "I'll read it and get back to you. If it's urgent, email me directly at the address above.",
    errName: 'Please enter your name.',
    errEmail: 'Please check the email format.',
    errMessage: 'Please write at least ten characters.',
    errSend: 'Could not send. Try again shortly, or email me directly at the address above.',
    errNetwork: 'A network error stopped the send. Please email me directly.',
  },
  nav: { about: 'About', experience: 'Experience', highlights: 'Highlights', automation: 'Automation', activities: 'Activities', certifications: 'Certifications', press: 'Press' },
};
