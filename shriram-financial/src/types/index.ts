// Shared TypeScript interfaces used across pages and components.

export interface DifferItem {
  num: string;
  title: string;
  sub: string;
  points: string[];
  cta: string;
  href: string;
}

export interface AdvisoryCard {
  img: string;
  title: string;
  body: string;
  cta: string;
  href: string;
}

export interface Product {
  label: string;
  href: string;
  sub: string;
  img: string;
}

export interface Step {
  img: string;
  title: string;
  desc: string;
}

export interface Stat {
  val: string;
  label: string;
  sub: string;
}

export interface FAQ {
  q: string;
  a: string;
}
