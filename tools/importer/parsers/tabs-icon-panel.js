/* eslint-disable */
/* global WebImporter */

// Only the active tier panel is server-rendered; the others render on tab click
// and the page ships no __NEXT_DATA__. This fallback was captured from the live
// page by clicking each tab, and is used only for panels missing from the DOM.
const FALLBACK_PANELS = {
  'Member': {
    eyebrow: '0-9 nights per year', title: 'Member', tagline: 'The possibilities (and points) are endless',
    features: [
      ['wifi', 'Complimentary Wi-Fi', 'Stay connected. Members enjoy complimentary Wi-Fi. Gold Elite members and above enjoy our fastest Internet connection for free.'],
      ['member-rates1x', 'Exclusive Member Rates', 'Enjoy exclusive discounted rates for Marriott Bonvoy Members.'],
      ['keyless-entry', 'Mobile Check-in & Mobile Key', 'Use our app to check in and out, then use your phone as your room key.'],
    ],
  },
  'Silver Elite': {
    eyebrow: '10 nights per year', title: 'Silver Elite', tagline: 'Make the most of your stay',
    features: [
      ['more-points-on-stays', '10% Bonus Points', 'Earn bonus points on eligible hotel purchases.'],
      ['late-check-out', 'Priority Late Checkout', 'Request Late Checkout and spend more time exploring the sites or relaxing. Exceptions apply.'],
      ['member-rates1x', 'Exclusive Member Rates', 'Enjoy exclusive discounted rates for Marriott Bonvoy Members.'],
    ],
  },
  'Gold Elite': {
    eyebrow: '25 nights per year', title: 'Gold Elite', tagline: 'Do more of what you love',
    features: [
      ['more-points-on-stays', '25% Bonus Points', 'Earn bonus points on eligible hotel purchases.'],
      ['all-suites', 'Enhanced Room Upgrade', 'Enjoy a room upgrade for the entire length of your stay. For Platinum Elite members and above this includes select suites.'],
      ['late-check-out', '2 p.m. Late Checkout', 'Request Late Checkout and spend more time exploring the sites or relaxing. Exceptions apply.'],
    ],
  },
  'Platinum Elite': {
    eyebrow: '50 nights per year', title: 'Platinum Elite', tagline: 'More room to spread out',
    features: [
      ['more-points-on-stays', '50% Bonus Points', 'Earn bonus points on eligible hotel purchases.'],
      ['all-suites', 'Enhanced Room Upgrade', 'Enjoy a room upgrade for the entire length of your stay. For Platinum Elite members and above this includes select suites.'],
      ['gift', 'Welcome Gift', 'Receive a special gift upon arrival at participating hotels. Gifts vary by brand and region.'],
    ],
  },
  'Titanium Elite': {
    eyebrow: '75 nights per year', title: 'Titanium Elite', tagline: 'Elevate your experience',
    features: [
      ['more-points-on-stays', '75% Bonus Points', 'Earn bonus points on eligible hotel purchases.'],
      ['all-suites', 'Enhanced Room Upgrade', 'Enjoy a room upgrade for the entire length of your stay. For Platinum Elite members and above this includes select suites.'],
      ['gift', 'Welcome Gift', 'Receive a special gift upon arrival at participating hotels. Gifts vary by brand and region.'],
    ],
  },
  'Ambassador Elite': {
    eyebrow: '100 nights per year + $23,000 USD', title: 'Ambassador Elite', tagline: 'Seize the whole day',
    features: [
      ['ambassador', 'Ambassador Service', 'Dedicated Personal Ambassador to assist you with all of your travel needs.'],
      ['your-24', 'Your24™', 'Choose your check-in time and keep your room until the same time on the day of departure. Request via Ambassador Service 2 days prior to arrival.'],
      ['more-points-on-stays', '75% Bonus Points', 'Earn bonus points on eligible hotel purchases.'],
    ],
  },
};

function readPanel(panel) {
  const text = (sel) => (panel.querySelector(sel)?.textContent || '').trim();
  return {
    eyebrow: text('.tier-hero__eyebrow'),
    title: text('.tier-hero__title'),
    tagline: text('.tier-hero__tagline'),
    features: [...panel.querySelectorAll('.benefit-card')].map((card) => {
      const iconClass = [...card.querySelectorAll('[class]')]
        .flatMap((el) => [...el.classList]).find((c) => /^icon-[a-z0-9]/.test(c) && c !== 'icon-decorative') || '';
      return [
        (iconClass || '').replace(/^icon-/, ''),
        (card.querySelector('.benefit-card__title')?.textContent || '').trim(),
        (card.querySelector('.benefit-card__description')?.textContent || '').trim(),
      ];
    }),
  };
}

function buildPanel(document, data) {
  const content = [];
  const add = (tag, text) => {
    if (!text) return;
    const n = document.createElement(tag);
    n.textContent = text;
    content.push(n);
  };
  add('p', data.eyebrow);
  add('h3', data.title);
  add('p', data.tagline);
  data.features.forEach(([icon, title, desc]) => {
    if (icon) add('p', `:${icon}:`);
    add('h4', title);
    add('p', desc);
  });
  return content;
}

export default function parse(element, { document }) {
  const cells = [];

  const labels = [...element.querySelectorAll('.tier-tab-button')]
    .map((b) => b.textContent.trim())
    .filter(Boolean);

  // Active (server-rendered) panel, matched to its tab by tier title.
  const live = {};
  element.querySelectorAll('.membership-tiers__panel').forEach((panel) => {
    const data = readPanel(panel);
    const active = element.querySelector('.tier-tab-button--active');
    const key = labels.find((l) => l === data.title) || (active && active.textContent.trim());
    if (key) live[key] = data;
  });

  const tabs = labels.length ? labels : Object.keys(FALLBACK_PANELS);
  tabs.forEach((label) => {
    const data = live[label] || FALLBACK_PANELS[label];
    if (!data) return;
    cells.push([label, buildPanel(document, data)]);
  });

  // The matched <section> also holds the "Membership Tiers" heading, which is
  // default content: keep it ahead of the block instead of dropping it.
  const heading = element.querySelector(':scope > .membership-tiers__heading');
  if (heading) element.before(heading);

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-icon-panel', cells });
  element.replaceWith(block);
}
