export interface Stat { value: string; label: string; }
export interface ExperienceItem {
  period: string;
  title: string;
  description: string;
  current?: boolean;
}
export interface Highlight { icon: string; title: string; description: string; }
export interface PressLink { outlet: string; url: string; }
export interface PressGroup { title: string; links: PressLink[]; }
export interface NavLabels { about: string; experience: string; highlights: string; activities: string; press: string; }
export interface SiteContent {
  fullName: string;
  eyebrow: string;
  headline: string[];
  tagline: string;
  ctaContact: string;
  stats: Stat[];
  aboutTitle: string;
  about: string;
  skills: string[];
  experienceTitle: string;
  experience: ExperienceItem[];
  highlightsTitle: string;
  highlights: Highlight[];
  activitiesTitle: string;
  activities: string[];
  pressTitle: string;
  press: PressGroup[];
  footerNote: string;
  nav: NavLabels;
}
