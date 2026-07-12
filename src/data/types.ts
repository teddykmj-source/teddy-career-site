export interface Stat { value: string; label: string; href?: string; }
export interface ExperienceItem {
  period: string;
  title: string;
  description: string;
  current?: boolean;
}
export interface Highlight { icon: string; title: string; description: string; }
export interface PressLink { outlet: string; url: string; }
export interface PressGroup { title: string; links: PressLink[]; }
export interface NavLabels { about: string; experience: string; highlights: string; activities: string; certifications: string; press: string; }
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
  certificationsTitle: string;
  certViewAll: string;
  activitiesTitle: string;
  activities: string[];
  pressTitle: string;
  press: PressGroup[];
  footerNote: string;
  nav: NavLabels;
}
export interface Certification { date: string; name: string; issuer: string; }
export interface CertGroup { title: string; tone: 'primary' | 'muted'; items: Certification[]; }
export interface TrainingItem { year: string; title: string; }
