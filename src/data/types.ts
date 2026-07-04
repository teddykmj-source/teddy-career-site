export interface Stat { value: string; label: string; }
export interface ExperienceItem {
  period: string;
  title: string;
  description: string;
  current?: boolean;
}
export interface Highlight { icon: string; title: string; description: string; }
export interface NavLabels { about: string; experience: string; highlights: string; }
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
  footerNote: string;
  nav: NavLabels;
}
