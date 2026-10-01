export interface Stat { value: string; label: string; href?: string; }
export interface ExperienceItem {
  period: string;
  title: string;
  description: string;
  current?: boolean;
}
export interface Highlight { icon: string; title: string; description: string; }
/** 흐름도. hold 는 사람이 확인하거나 규칙이 판단하는, 한 박자 멈추는 노드의 인덱스 */
export interface AutomationFlow { nodes: string[]; hold: number; }
export interface AutomationItem { icon: string; title: string; description: string; status: string; flow: AutomationFlow; }
export interface PressLink { outlet: string; url: string; }
export interface PressGroup { title: string; links: PressLink[]; }
export interface NavLabels { about: string; experience: string; highlights: string; automation: string; activities: string; certifications: string; press: string; }
export interface SiteContent {
  fullName: string;
  eyebrow: string;
  headline: string[];
  tagline: string;
  ctaContact: string;
  ctaDeck: string;
  stats: Stat[];
  aboutTitle: string;
  about: string;
  skills: string[];
  experienceTitle: string;
  experience: ExperienceItem[];
  highlightsTitle: string;
  highlights: Highlight[];
  automationTitle: string;
  automationLead: string;
  automation: AutomationItem[];
  certificationsTitle: string;
  certViewAll: string;
  activitiesTitle: string;
  activities: string[];
  pressTitle: string;
  press: PressGroup[];
  footerNote: string;
  glossaryLink: string;
  heroSpecs: HeroSpec[];
  headings: SectionHeadings;
  practiceTitle: string;
  principlesTitle: string;
  principles: Principle[];
  contactTitle: string;
  contactLead: string;
  directTitle: string;
  replyNote: string;
  form: FormLabels;
  nav: NavLabels;
}
export interface HeroSpec { label: string; value: string; }
export interface Principle { key: string; title: string; description: string; }
export interface FormLabels {
  name: string; email: string; message: string; placeholder: string;
  submit: string; sending: string; okTitle: string; okBody: string;
  errName: string; errEmail: string; errMessage: string; errSend: string; errNetwork: string;
}
/** 섹션 배지(기존 *Title)와 짝을 이루는 h2 문구 */
export interface SectionHeadings {
  practice: string; experience: string; automation: string; principles: string;
  awards: string; certifications: string; contact: string;
}
export interface Certification { date: string; name: string; issuer: string; }
export interface CertGroup { title: string; tone: 'primary' | 'muted'; items: Certification[]; }
export interface TrainingItem { year: string; title: string; }
