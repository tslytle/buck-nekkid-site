// Shared page chrome: head, header, footer, forms, banners.
// Every page is assembled from these so header/footer changes happen once.

import { site, products, FORM_ACCESS_KEY, ORIGIN, projectTypes, timelines } from './site.mjs';

/** Escape text for interpolation into HTML markup. */
export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const FONTS =
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap';

function localBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: site.name,
    description: site.tagline,
    url: ORIGIN + '/',
    telephone: site.phone,
    email: site.email,
    image: ORIGIN + '/images/logo-full.png',
    logo: ORIGIN + '/images/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      addressLocality: site.city,
      addressRegion: site.state,
      postalCode: site.zip,
      addressCountry: 'US',
    },
    areaServed: { '@type': 'City', name: 'Scottsville, Kentucky' },
    openingHoursSpecification: site.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    makesOffer: products.map((p) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: p.title },
    })),
  };
  // JSON-LD sits in a <script>; neutralise any sequence that could close it early.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Document head.
 * @param {{title:string, description:string, path:string, ogImage?:string, noindex?:boolean}} o
 */
export function head({ title, description, path, ogImage = 'images/logo-full.png', noindex = false }) {
  const canonical = ORIGIN + path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(ORIGIN + '/' + ogImage)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b2a52">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/images/logo-full.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="/styles.css">
<script type="application/ld+json">${localBusinessJsonLd()}</script>
</head>
<body>
<a class="sr-only skip-link" href="#main">Skip to content</a>`;
}

/**
 * Sticky header. `current` is a product slug, 'home', or undefined.
 * On product pages the in-page anchors need to point back at the home page.
 */
export function header({ current, onHome = false }) {
  const home = onHome ? '' : '/';
  const contactHref = onHome ? '#contact' : '#quote';
  const links = [
    { href: `${home}#divisions`, label: 'Divisions' },
    { href: `${home}#products`, label: 'Products' },
    { href: `${home}#about`, label: 'About' },
    { href: `${home}#visit`, label: 'Visit' },
    { href: contactHref, label: 'Contact' },
  ];
  return `<header class="header">
  <div class="header__inner">
    <a class="header__logo" href="/" aria-label="${esc(site.name)} home">
      <img src="/images/logo.png" alt="${esc(site.name)}" width="373" height="400">
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">
      <span class="nav-toggle__bar"></span>
    </button>
    <nav class="nav" id="site-nav" aria-label="Main">
      <ul class="nav__list">
${links
  .map(
    (l) =>
      `        <li><a class="nav__link" href="${esc(l.href)}">${esc(l.label)}</a></li>`
  )
  .join('\n')}
      </ul>
    </nav>
    <div class="header__actions">
      <a class="header__phone" href="${site.phoneHref}">${esc(site.phone)}</a>
      <a class="btn btn--primary header__cta" href="${esc(contactHref)}">Free Consultation</a>
    </div>
  </div>
</header>`;
}

export function financeBanner({ compact = false } = {}) {
  const heading = compact ? 'Looking for finance options?' : 'Looking for Finance Options?';
  const body = compact
    ? 'All credit profiles welcome. Get your rate through VistaFi without affecting your credit.'
    : "We've got you covered — all credit profiles welcome. Get your rate without affecting your credit.";
  return `<section class="section${compact ? ' section--tight' : ''}">
  <div class="wrap">
    <div class="banner banner--finance">
      <div>
        <h2${compact ? ' style="font-size:26px"' : ''}>${esc(heading)}</h2>
        <p>${esc(body)}</p>
      </div>
      <a class="btn btn--navy" href="${esc(site.financeUrl)}" target="_blank" rel="noopener">Get Your Rate</a>
    </div>
  </div>
</section>`;
}

export function footer() {
  return `<footer class="footer">
  <div class="wrap">
    <div class="footer__inner">
      <a href="/"><img src="/images/logo.png" alt="${esc(site.name)}" width="373" height="400"></a>
      <ul class="footer__links">
${products
  .map((p) => `        <li><a href="/${p.slug}.html">${esc(p.navLabel)}</a></li>`)
  .join('\n')}
      </ul>
      <div class="footer__contact">
        <a href="${site.phoneHref}">${esc(site.phone)}</a>
        <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>
      </div>
    </div>
    <div class="footer__copy">&copy; ${new Date().getFullYear()} ${esc(site.name)}. ${esc(site.city)}, Kentucky. All rights reserved.</div>
  </div>
</footer>
<script src="/main.js" defer></script>
</body>
</html>`;
}

/** The navy contact card. */
export function infoCard({ compact = false, heading } = {}) {
  const hours = compact
    ? `<div class="fact"><span aria-hidden="true">&#128336;</span><span>${esc(site.hoursShort)}</span></div>`
    : `<div class="fact"><b>Hours</b></div>` +
      site.hours.map((h) => `<div class="fact"><span>${esc(h)}</span></div>`).join('\n      ');
  return `<div class="info-card${compact ? ' info-card--compact' : ''}">
      ${heading ? `<h3>${esc(heading)}</h3>` : ''}
      <div class="fact"><span aria-hidden="true">&#128205;</span><span>${esc(site.addressLine)}</span></div>
      <div class="fact"><span aria-hidden="true">&#128222;</span><a href="${site.phoneHref}">${esc(site.phone)}</a></div>
      <div class="fact"><span aria-hidden="true">&#9993;</span><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></div>
      ${hours}
    </div>`;
}

/**
 * Lead form wired to Web3Forms.
 *
 * Progressive enhancement: without JS the browser POSTs straight to Web3Forms
 * and the `redirect` field lands the visitor on /thanks.html. With JS, main.js
 * intercepts and shows an inline success message instead.
 *
 * @param {{kind:'contact'|'quote', id:string, interest?:string, placeholder?:string}} o
 */
export function leadForm({ kind, id, interest, placeholder }) {
  const isQuote = kind === 'quote';
  const subject = isQuote
    ? `New ${interest} enquiry from the website`
    : 'New contact form message from the website';

  const choiceField = isQuote
    ? `<div class="field">
          <label for="${id}-timeline">Timeline</label>
          <select id="${id}-timeline" name="timeline">
${timelines.map((t) => `            <option>${esc(t)}</option>`).join('\n')}
          </select>
        </div>`
    : `<div class="field">
          <label for="${id}-type">Project Type</label>
          <select id="${id}-type" name="project_type">
${projectTypes.map((t) => `            <option>${esc(t)}</option>`).join('\n')}
          </select>
        </div>`;

  return `<form class="form" action="https://api.web3forms.com/submit" method="POST" data-lead-form>
        <input type="hidden" name="access_key" value="${esc(FORM_ACCESS_KEY)}">
        <input type="hidden" name="subject" value="${esc(subject)}">
        <input type="hidden" name="from_name" value="${esc(site.name)} website">
        <input type="hidden" name="redirect" value="${esc(ORIGIN)}/thanks.html">
${interest ? `        <input type="hidden" name="interest" value="${esc(interest)}">\n` : ''}        <div class="hp" aria-hidden="true">
          <label for="${id}-botcheck">Leave this field empty</label>
          <input id="${id}-botcheck" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off">
        </div>
        <div class="form__row">
          <div>
            <label for="${id}-name">Name</label>
            <input id="${id}-name" type="text" name="name" required autocomplete="name" placeholder="Your name">
          </div>
          <div>
            <label for="${id}-phone">Phone</label>
            <input id="${id}-phone" type="tel" name="phone" autocomplete="tel" placeholder="(270) 000-0000">
          </div>
        </div>
        <div class="field">
          <label for="${id}-email">Email</label>
          <input id="${id}-email" type="email" name="email" required autocomplete="email" placeholder="you@email.com">
        </div>
        ${choiceField}
        <div class="field">
          <label for="${id}-message">${isQuote ? 'Project details' : 'Message'}</label>
          <textarea id="${id}-message" name="message" rows="4" required placeholder="${esc(placeholder || 'Tell us about your project...')}"></textarea>
        </div>
        <button class="btn btn--primary btn--block" type="submit">Send Message</button>
        <p class="form__status" data-form-status hidden role="status" aria-live="polite"></p>
      </form>`;
}
