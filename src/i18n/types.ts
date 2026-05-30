export type Lang = 'es' | 'en';

export interface NavLink { label: string; href: string; }
export interface ServiceItem { icon: string; title: string; desc: string; tags: string[]; }
export interface StepItem { num: string; title: string; desc: string; meta: [string, string]; }
export interface TechCat { name: string; code: string; chips: string[]; }
export interface CaseItem { cat: string; title: string; desc: string; metrics: [string, string][]; media: string; }
export interface TestimonialItem { quote: [string, string, string]; name: string; role: string; }
export interface PlanItem { name: string; desc: string; from: string; price: string; unit: string; features: string[]; cta: string; featured: boolean; }
export interface TeamMember { name: string; role: string; bio: string; }
export interface FAQItem { q: string; a: string; }
export interface ContactPoint { icon: string; title: string; sub: string; }
export interface FooterCol { h: string; links: string[]; }
export interface ScriptedReply { k: string[]; a: string; }

export interface Translations {
  lang: Lang;
  meta: { title: string; description: string; };
  nav: { links: NavLink[]; cta: string; langSwitch: string; langHref: string; };
  brand: { name: string; tagline: string; };
  hero: { badge: string; badgeTag: string; titlePre: string; titleEm: string; titlePost: string; lead: string; ctaPrimary: string; ctaSecondary: string; note: string; panelLabel: string; placeholderLabel: string; };
  stats: Array<{ num: string; suffix: string; label: string }>;
  trust: { label: string; items: string[]; };
  services: { eyebrow: string; title: string; lead: string; items: ServiceItem[]; };
  process: { eyebrow: string; title: string; lead: string; steps: StepItem[]; };
  tech: { eyebrow: string; title: string; lead: string; cats: TechCat[]; visualLabel: string; };
  cases: { eyebrow: string; title: string; lead: string; cta: string; items: CaseItem[]; };
  testimonials: { eyebrow: string; title: string; items: TestimonialItem[]; };
  pricing: { eyebrow: string; title: string; lead: string; featured: string; items: PlanItem[]; };
  team: { eyebrow: string; title: string; lead: string; items: TeamMember[]; };
  faq: { eyebrow: string; title: string; lead: string; cta: string; items: FAQItem[]; };
  contact: {
    eyebrow: string; title: string; lead: string; points: ContactPoint[];
    form: { name: string; namePlaceholder: string; email: string; emailPlaceholder: string; company: string; companyPlaceholder: string; service: string; servicePlaceholder: string; serviceOther: string; message: string; messagePlaceholder: string; submit: string; required: string; invalidEmail: string; messageRequired: string; successTitle: string; successMessage: string; };
  };
  footer: { tagline: string; cols: FooterCol[]; copy: string; madeWith: string; };
  chat: { fabLabel: string; dialogLabel: string; botName: string; botStatus: string; closeLabel: string; inputPlaceholder: string; disclaimer: string; greeting: string; chips: string[]; scripted: ScriptedReply[]; defaultReply: string; };
}
