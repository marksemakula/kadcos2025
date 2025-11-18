#!/usr/bin/env node
/* eslint-disable */
// scripts/seed_services.cjs
// Puppeteer script to seed localStorage for cms_services and cms_savingsFeatures
const puppeteer = require('puppeteer');

const URLS = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'];

const commonRequirements = [
  'Full membership',
  '3+ months regular savings',
  'At least one guarantor',
  'Application letter & form',
  'Collateral for loans above 2.5m'
];

const defaultLoanProducts = [
  {
    id: 1,
    title: 'Personal Loan',
    description: 'For home renovation, buying furniture, and personal needs',
    maxPeriod: '12 months',
    interestRate: '2% per month',
    icon: 'FiDollarSign',
    requirements: commonRequirements
  },
  {
    id: 2,
    title: 'School Fees Loan',
    description: "Educational financing for your children's future",
    maxPeriod: '6 months',
    interestRate: '2% per month',
    icon: 'FiClock',
    requirements: commonRequirements
  },
  {
    id: 3,
    title: 'Business Loan',
    description: 'Capital for business expansion and development',
    maxPeriod: '12 months',
    interestRate: '2% per month',
    icon: 'FiCreditCard',
    requirements: commonRequirements
  },
  {
    id: 4,
    title: 'Agricultural/Farming Loan',
    description: 'Support for agricultural activities and farming',
    maxPeriod: '12 months',
    interestRate: '2% per month',
    icon: 'FiTrendingUp',
    requirements: commonRequirements
  },
  {
    id: 5,
    title: 'Construction Loan',
    description: 'Financing for construction and building projects',
    maxPeriod: '12 months',
    interestRate: '2% per month',
    icon: 'FiTrendingUp',
    requirements: commonRequirements
  },
  {
    id: 6,
    title: 'Weekend Loan',
    description: 'Special rates for members',
    maxPeriod: '12 months',
    interestRate: '1% per week',
    icon: 'FiPercent',
    requirements: commonRequirements
  },
  {
    id: 7,
    title: 'Loans in Kind',
    description: 'Capital for business expansion and development (in-kind)',
    maxPeriod: '12 months',
    interestRate: '3% per month',
    icon: 'FiCreditCard',
    requirements: commonRequirements
  },
  {
    id: 8,
    title: 'Emergency Loan',
    description: 'Quick loans for unexpected expenses',
    maxPeriod: '3 months',
    interestRate: '3% per month',
    icon: 'FiDollarSign',
    requirements: commonRequirements
  }
];

const defaultSavingsFeatures = [
  {
    id: 1,
    title: 'Regular Savings',
    description: 'Minimum monthly savings of 10,000 UGX with competitive returns',
    icon: 'FiDollarSign'
  },
  {
    id: 2,
    title: 'Fixed Deposits',
    description: 'Secure your money with our fixed deposit accounts',
    icon: 'FiClock'
  },
  {
    id: 3,
    title: 'Flexible Withdrawals',
    description: 'Access your savings when you need them (minimum balance: 20,000 UGX)',
    icon: 'FiClock'
  }
];

async function waitForServer(url, timeout = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.ok) return true;
    } catch (e) {
      // ignore
    }
    await new Promise(r => setTimeout(r, 500));
  }
  return false;
}

(async () => {
  // Node's global fetch is available in modern Node; fallback if not
  if (typeof fetch === 'undefined') {
    global.fetch = (await import('node-fetch')).default;
  }

  let reachableUrl = null;
  for (const u of URLS) {
    const ok = await waitForServer(u, 3000);
    if (ok) { reachableUrl = u; break; }
  }

  if (!reachableUrl) {
    console.error('Could not reach dev server on', URLS.join(', '));
    process.exit(1);
  }

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  try {
    await page.goto(reachableUrl, { waitUntil: 'networkidle2', timeout: 10000 });

    await page.evaluate((loans, savings) => {
      try {
        localStorage.setItem('cms_services', JSON.stringify(loans));
        localStorage.setItem('cms_savingsFeatures', JSON.stringify(savings));
        return true;
      } catch (e) {
        return { error: e.message };
      }
    }, defaultLoanProducts, defaultSavingsFeatures);

    console.log('Seeded cms_services and cms_savingsFeatures to localStorage at', reachableUrl);
  } catch (e) {
    console.error('Error during seeding:', e);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
