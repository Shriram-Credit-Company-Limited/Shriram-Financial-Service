// Single source of truth for all site navigation — mirrors the approved sitemap.
// 11 templates · 28 pages

export interface NavChild {
  label: string;
  href: string;
  desc?: string;
}

export interface NavSection {
  label: string;
  href: string;
  template: string;
  children: NavChild[];
}

export const navigation: NavSection[] = [
  {
    label: 'Home',
    href: '/',
    template: 'T1',
    children: [{ label: 'Homepage', href: '/' }],
  },
  {
    label: 'Product Hub',
    href: '/product-hub/',
    template: 'T2',
    children: [{ label: 'Product & Calculator Hub', href: '/product-hub/' }],
  },
  {
    label: 'Products',
    href: '/products/',
    template: 'T3',
    children: [
      { label: 'Equity',           href: '/products/equity/',          desc: 'Invest in listed Indian companies' },
      { label: 'Derivative',       href: '/products/derivative/',      desc: 'Futures & options trading' },
      { label: 'Commodities',      href: '/products/commodities/',     desc: 'Gold, silver, crude & more' },
      { label: 'MTF',              href: '/products/mtf/',             desc: 'Margin Trade Financing' },
      { label: 'Currency',         href: '/products/currency/',        desc: 'Currency futures & options' },
      { label: 'Mutual Funds',     href: '/products/mutual-funds/',    desc: 'Curated fund portfolios' },
      { label: 'NFO',              href: '/products/nfo/',             desc: 'New Fund Offers' },
      { label: 'FD',               href: '/products/fd/',              desc: 'Fixed Deposits' },
      { label: 'ETF',              href: '/products/etf/',             desc: 'Exchange-Traded Funds' },
      { label: 'Global Investing', href: '/products/global-investing/',desc: 'Invest in US & global markets' },
      { label: 'IPO',              href: '/products/ipo/',             desc: 'Initial Public Offerings' },
      { label: 'NPS',              href: '/products/nps/',             desc: 'National Pension System' },
      { label: 'Bonds',            href: '/products/bonds/',           desc: 'Corporate & government bonds' },
    ],
  },
  {
    label: 'Research',
    href: '/research/',
    template: 'T5',
    children: [
      { label: 'Technical',     href: '/research/technical/',    desc: 'Charts, levels & trend views' },
      { label: 'Fundamental',   href: '/research/fundamental/',  desc: 'Company & sector deep-dives' },
      { label: 'Mutual Funds',  href: '/research/mutual-funds/', desc: 'Fund selection & reviews' },
    ],
  },
  {
    label: 'About',
    href: '/about/',
    template: 'T4',
    children: [
      { label: 'About Us',          href: '/about/' },
      { label: 'Become a Partner',  href: '/about/become-a-partner/' },
      { label: 'Open Demat Account',href: '/about/open-demat-account/' },
      { label: 'Support',           href: '/about/support/' },
      { label: 'Regulatory',        href: '/about/regulatory/' },
      { label: 'Antara Web Login',  href: '/about/antara-web-login/' },
      { label: 'Sitemap',           href: '/about/sitemap/' },
    ],
  },
];
