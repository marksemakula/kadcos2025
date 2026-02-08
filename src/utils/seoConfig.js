import React from 'react';

/**
 * SEO Configuration for KADCOS Website
 * Optimized for SACCO, micro-lending, and cooperative society searches in Uganda and East Africa
 */

export const siteConfig = {
  siteName: 'KADCOS - Lubaga Cooperative Society Ltd',
  siteUrl: 'https://kadcoslubaga.co.ug',
  defaultImage: '/images/kadcos_lubaga_co_operative_society_cover.jpeg',
  logoImage: '/images/KADCOS-02.png',
  twitterHandle: '',
  locale: 'en_UG',
  organization: {
    name: 'KADCOS',
    legalName: 'Lubaga Cooperative Society Ltd',
    foundingDate: '2007',
    email: 'kadcoslubaga.sacco@gmail.com',
    telephone: ['+256200959838', '+256783077661', '+256701763688'],
    address: {
      street: 'Lubaga Cathedral, Administrative Building',
      city: 'Kampala',
      region: 'Central Region',
      country: 'Uganda',
      countryCode: 'UG'
    },
    geo: {
      latitude: '0.2986',
      longitude: '32.5528'
    }
  }
};

/**
 * Page-specific SEO configurations
 */
export const pageSEO = {
  home: {
    title: 'KADCOS - Leading SACCO in Uganda | Savings & Loans Cooperative Society',
    description: 'KADCOS (Lubaga Cooperative Society Ltd) is a trusted SACCO in Uganda offering micro-lending, savings accounts, personal loans, business loans, and financial services. Join 1,700+ members in Kampala. Est. 2007.',
    keywords: 'SACCO Uganda, KADCOS, micro-lending Uganda, savings cooperative Uganda, Lubaga SACCO, cooperative society Uganda, microfinance Uganda, SACCO Kampala, East Africa SACCO',
    canonicalPath: '/'
  },
  about: {
    title: 'About KADCOS | Uganda\'s Trusted Savings & Credit Cooperative Society',
    description: 'Learn about KADCOS Lubaga Cooperative Society Ltd - a leading SACCO in Uganda since 2007. Our mission, vision, and commitment to financially empowering communities through cooperative effort.',
    keywords: 'about KADCOS, SACCO history Uganda, cooperative society Uganda, Lubaga SACCO mission, savings cooperative Kampala, financial empowerment Uganda',
    canonicalPath: '/about'
  },
  services: {
    title: 'Loans & Savings Services | KADCOS SACCO Uganda - Personal, Business & Agricultural Loans',
    description: 'Explore KADCOS loan products: Personal Loans, Business Loans, School Fees Loans, Agricultural Loans, Emergency Loans with competitive 2% monthly interest. Savings accounts with attractive returns.',
    keywords: 'personal loans Uganda, business loans Kampala, school fees loans Uganda, agricultural loans Uganda, SACCO loans, micro-lending Uganda, savings account Uganda, competitive interest rates Uganda',
    canonicalPath: '/services'
  },
  membership: {
    title: 'Join KADCOS SACCO | Membership Benefits & How to Join Uganda\'s Leading Cooperative',
    description: 'Become a KADCOS member today! Enjoy savings with up to 2% monthly interest, access affordable loans, and be part of 1,700+ members. Easy membership process in Kampala, Uganda.',
    keywords: 'SACCO membership Uganda, join cooperative Uganda, KADCOS member benefits, savings cooperative membership, how to join SACCO Uganda, cooperative society registration',
    canonicalPath: '/membership'
  },
  contact: {
    title: 'Contact KADCOS | Office Locations in Kampala, Uganda - Phone, Email & Branches',
    description: 'Contact KADCOS Lubaga Cooperative Society. Main office at Lubaga Cathedral, Kampala. Branch locations in Busega, Buyege, and Kasenge parishes. Phone: +256 200 959838.',
    keywords: 'KADCOS contact, SACCO Kampala address, Lubaga Cathedral office, KADCOS phone number, cooperative society contact Uganda, SACCO branches Kampala',
    canonicalPath: '/contact'
  },
  blog: {
    title: 'News & Updates | KADCOS SACCO Uganda - Latest Financial Tips & Cooperative News',
    description: 'Stay updated with KADCOS news, financial tips, cooperative society updates, and community events. Learn about savings, loans, and financial literacy in Uganda.',
    keywords: 'KADCOS news, SACCO updates Uganda, financial tips Uganda, cooperative society news, savings tips, loan information Uganda',
    canonicalPath: '/blog'
  },
  governance: {
    title: 'Governance & Leadership | KADCOS Board & Management Team Uganda',
    description: 'Meet the KADCOS governance structure, board of directors, and management team. Learn about our cooperative society leadership and organizational structure.',
    keywords: 'KADCOS board, SACCO governance Uganda, cooperative leadership, KADCOS management, credit union governance',
    canonicalPath: '/governance'
  },
  resources: {
    title: 'Resources & E-Library | KADCOS Financial Education & Documents',
    description: 'Access KADCOS resources, financial education materials, loan application forms, membership documents, and cooperative society guidelines.',
    keywords: 'KADCOS resources, SACCO documents Uganda, loan application forms, membership forms, financial education Uganda',
    canonicalPath: '/resources-e-lib'
  },
  managersMessage: {
    title: 'Manager\'s Message | KADCOS General Manager\'s Address to Members',
    description: 'Read the message from KADCOS General Manager about our cooperative society\'s progress, achievements, and future plans for members in Uganda.',
    keywords: 'KADCOS manager, SACCO leadership message, cooperative manager Uganda',
    canonicalPath: '/managers-message'
  },
  boardChairMessage: {
    title: 'Board Chair\'s Message | KADCOS Chairman\'s Address to Members',
    description: 'Read the message from KADCOS Board Chairman about our cooperative society\'s vision, strategic direction, and commitment to members.',
    keywords: 'KADCOS chairman, SACCO board chair, cooperative chairman message Uganda',
    canonicalPath: '/board-chair-message'
  }
};

/**
 * Generate structured data for a specific page
 */
export const generatePageSchema = (pageKey) => {
  const pageData = pageSEO[pageKey];
  if (!pageData) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageData.title,
    description: pageData.description,
    url: `${siteConfig.siteUrl}${pageData.canonicalPath}`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl
    },
    provider: {
      '@type': 'Organization',
      name: siteConfig.organization.name,
      url: siteConfig.siteUrl
    }
  };
};

/**
 * Common keywords for all pages
 */
export const commonKeywords = [
  'SACCO Uganda',
  'KADCOS',
  'savings cooperative Uganda',
  'micro-lending Uganda',
  'cooperative society East Africa',
  'Lubaga SACCO',
  'microfinance Kampala',
  'credit union Uganda',
  'savings and loans Uganda',
  'financial services Kampala'
];

/**
 * Long-tail keywords for better SEO targeting
 */
export const longTailKeywords = [
  'best SACCO in Uganda for savings',
  'how to get a loan from SACCO in Uganda',
  'cooperative society near Lubaga Cathedral',
  'affordable personal loans in Kampala Uganda',
  'school fees loan SACCO Uganda',
  'agricultural financing cooperative Uganda',
  'business loans for small enterprises Uganda',
  'savings account with high interest Uganda',
  'trusted microfinance in Kampala',
  'member-owned financial institution Uganda',
  'community savings group Kampala',
  'weekly savings scheme Uganda'
];

export default { siteConfig, pageSEO, generatePageSchema, commonKeywords, longTailKeywords };
