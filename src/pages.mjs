// Page templates. Each exports a function returning a complete HTML document.

import {
  site,
  products,
  heroSlides,
  photoBand,
} from './site.mjs';
import {
  esc,
  head,
  header,
  footer,
  financeBanner,
  infoCard,
  leadForm,
} from './layout.mjs';

const HOME_TITLE =
  'Buck Nekkid Outdoor Living | Custom Pools, Spas & Outdoor Living in Scottsville, KY';
const HOME_DESC =
  "Custom swimming pools, hot tubs, outdoor kitchens, fire features, furniture, and pool houses in Scottsville, Kentucky. You ain't living if you ain't getting Buck Nekkid.";

export function homePage() {
  const slides = heroSlides
    .map(
      (s, i) =>
        `        <div class="hero__slide"><img src="/images/${s.src}" alt="${esc(s.alt)}" ${
          i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'
        }></div>`
    )
    .join('\n');

  const dots = heroSlides
    .map(
      (_, i) =>
        `      <button class="hero__dot" type="button" data-slide="${i}" aria-current="${
          i === 0 ? 'true' : 'false'
        }" aria-label="Show slide ${i + 1}"></button>`
    )
    .join('\n');

  const cards = products
    .map(
      (p) => `      <a class="card" href="/${p.slug}.html">
        <img src="/images/${p.cardImage}" alt="${esc(p.cardAlt)}" loading="lazy" width="1300" height="975">
        <div class="card__body">
          <h3>${esc(p.cardTitle)}</h3>
          <p>${esc(p.cardBlurb)}</p>
        </div>
      </a>`
    )
    .join('\n');

  // The marquee track is duplicated so translateX(-50%) loops seamlessly. The
  // second copy is decorative — hidden from AT, and from sight when the visitor
  // prefers reduced motion (no scroll means the repeat would just read twice).
  const tile = (b, dupe) =>
    `        <div class="marquee__tile${dupe ? ' marquee__tile--dupe' : ''}"${
      dupe ? ' aria-hidden="true"' : ''
    }>${esc(b)}</div>`;
  const marquee = [
    ...site.brands.map((b) => tile(b, false)),
    ...site.brands.map((b) => tile(b, true)),
  ].join('\n');

  const band = photoBand
    .map(
      (p) =>
        `    <img src="/images/${p.src}" alt="${esc(p.alt)}" loading="lazy" width="2000" height="1333">`
    )
    .join('\n');

  return `${head({ title: HOME_TITLE, description: HOME_DESC, path: '/' })}
${header({ onHome: true })}
<main id="main">

<section class="hero" id="home" data-hero>
  <div class="hero__track-wrap">
    <div class="hero__track" data-hero-track>
${slides}
    </div>
  </div>
  <div class="hero__overlay"></div>
  <div class="wrap hero__body">
    <div class="hero__content">
      <span class="eyebrow eyebrow--on-dark">${esc(site.city)}, Kentucky</span>
      <div class="hero__kicker">${esc(site.subTagline)}</div>
      <h1 class="hero__title">${esc(site.tagline)}</h1>
      <p class="hero__lead">We build backyard oases &mdash; custom pools, hot tubs, outdoor kitchens, and everything in between. Luxury design and honest, hometown service in every yard we touch.</p>
      <div class="btn-row">
        <a class="btn btn--primary" href="#divisions">Explore Our Products</a>
        <a class="btn btn--outline-light" href="#contact">Get a Free Consultation</a>
      </div>
    </div>
  </div>
  <div class="hero__dots" role="group" aria-label="Hero slides">
${dots}
  </div>
</section>

<section class="section">
  <div class="wrap center" style="max-width:760px">
    <span class="eyebrow">Southern Kentucky&#39;s Outdoor Living Headquarters</span>
    <h2 class="h2">Outdoor retreats are what we do best.</h2>
    <p class="lead" style="margin:0">Luxury meets your personal style, and we handle the rest &mdash; from first sketch to final splash.</p>
  </div>
</section>

<section class="section section--sky" id="divisions">
  <div class="wrap">
    <div class="center">
      <span class="eyebrow">Our Divisions</span>
      <h2 class="h2">Everything your backyard needs, under one roof.</h2>
    </div>
    <div class="grid-cards">
${cards}
    </div>
  </div>
</section>

<section class="carriers">
  <div class="wrap">
    <span class="eyebrow center">Proud Carriers of Quality Products</span>
    <h2 class="h2 h2--on-dark center">Names you can trust for years of durability and peace of mind.</h2>
    <p>Ask us in-store about the full lineup of brands we carry and install.</p>
    <div class="marquee">
      <div class="marquee__track">
${marquee}
      </div>
    </div>
  </div>
</section>

${financeBanner()}

<section class="section section--sky" id="visit">
  <div class="wrap">
    <div class="two-up">
      <div>
        <span class="eyebrow">Visit Us</span>
        <h2 class="h2">Come see us in person.</h2>
        <div class="fact"><b>Address:</b> <span>${esc(site.addressLine)}</span></div>
        <div class="fact"><b>Phone:</b> <a href="${site.phoneHref}">${esc(site.phone)}</a></div>
        <div class="fact"><b>Hours:</b> <span>${esc(site.hoursShort)}</span></div>
        <div class="btn-row">
          <a class="btn btn--navy" href="${esc(site.mapUrl)}" target="_blank" rel="noopener">Get Directions</a>
          <a class="btn btn--outline-navy" href="${site.phoneHref}">Call Us</a>
        </div>
      </div>
      <div class="photo-frame">
        <img src="/images/covered-patio.jpg" alt="Covered patio with a wood ceiling looking out over a pool" loading="lazy" width="1300" height="975">
      </div>
    </div>
  </div>
</section>

<section class="section" style="padding-bottom:0">
  <div class="photo-band">
${band}
  </div>
</section>

<section class="section" id="about">
  <div class="wrap">
    <div class="two-up two-up--even">
      <div class="photo-frame">
        <img src="/images/pool-gazebo-patio.jpg" alt="Pool, gazebo, and stamped concrete patio built by ${esc(site.name)}" loading="lazy" width="1300" height="975">
      </div>
      <div>
        <span class="eyebrow">About Us</span>
        <h2 class="h2">Honest work, memorable name.</h2>
        <p>At ${esc(site.name)}, we specialize in custom luxury outdoor spaces that turn backyards into breathtaking retreats. We&#39;re based right here in Scottsville, Kentucky, and our team combines innovative design with expert craftsmanship to build spaces that actually reflect how you live.</p>
        <p>We&#39;re not the fanciest name in outdoor living &mdash; we&#39;re just the most honest one. Quality work, personalized service, and yeah, a name you won&#39;t forget.</p>
        <blockquote>${esc(site.tagline)}</blockquote>
      </div>
    </div>
  </div>
</section>

<section class="section section--sky" id="contact">
  <div class="wrap">
    <div class="center" style="margin-bottom:44px">
      <span class="eyebrow">Contact Us</span>
      <h2 class="h2">Ready to get Buck Nekkid?</h2>
      <p class="lead" style="max-width:520px;margin:0 auto">Reach out below, give us a call, or swing by the showroom.</p>
    </div>
    <div class="two-up two-up--form">
      ${infoCard({ heading: 'Get in Touch' })}
      ${leadForm({ kind: 'contact', id: 'contact' })}
    </div>
  </div>
</section>

<section class="section section--sky" style="padding-top:0">
  <div class="wrap">
    <div class="banner banner--swag">
      <div>
        <h2>Swag Store</h2>
        <p>Rep the name that&#39;s changing the game. Shirts, hats, and gear for anyone who&#39;s ready to get Buck Nekkid.</p>
        <a class="btn btn--primary" href="#contact">Shop the Swag Store</a>
      </div>
    </div>
  </div>
</section>

</main>
${footer()}`;
}

export function productPage(p) {
  // Google truncates around 70 characters, so only keep the location suffix
  // when the product name is short enough to leave room for it.
  const base = `${p.title} | ${site.name}`;
  const withLocation = `${base} — Scottsville, KY`;
  const title = withLocation.length <= 70 ? withLocation : base;

  const gallery = p.gallery
    .map(
      (g) =>
        `      <img src="/images/${g.src}" alt="${esc(g.alt)}" loading="lazy" width="1300" height="975">`
    )
    .join('\n');

  const cards = p.points
    .map(
      (pt) => `    <div class="detail-card">
      <h3>${esc(pt.title)}</h3>
      <p>${esc(pt.body)}</p>
    </div>`
    )
    .join('\n');

  return `${head({
    title,
    description: p.metaDescription,
    path: `/${p.slug}.html`,
    ogImage: `images/${p.heroImage}`,
  })}
${header({ current: p.slug })}
<main id="main">

<section class="phero">
  <img class="phero__img" src="/images/${p.heroImage}" alt="${esc(p.heroAlt)}" fetchpriority="high">
  <div class="phero__overlay"></div>
  <div class="phero__content">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span aria-hidden="true">/</span><span class="crumbs__current" aria-current="page">${esc(p.title)}</span>
    </nav>
    <span class="eyebrow eyebrow--on-dark">${esc(p.eyebrow)}</span>
    <h1 class="phero__title">${esc(p.headline)}</h1>
    <p class="phero__lead">${esc(p.lead)}</p>
  </div>
</section>

<section class="section">
  <div class="wrap two-up two-up--product">
    <div>
      <span class="eyebrow">What we build</span>
      <h2 class="h2" style="font-size:clamp(24px,3vw,32px);line-height:1.2">${esc(p.sectionTitle)}</h2>
      <p class="lead" style="font-size:16px">${esc(p.body1)}</p>
      <p class="lead" style="font-size:16px">${esc(p.body2)}</p>
      <blockquote>${esc(site.tagline)}</blockquote>
    </div>
    <div class="gallery">
${gallery}
    </div>
  </div>
</section>

<section class="section--sky section--tight">
  <div class="wrap detail-cards">
${cards}
  </div>
</section>

<section class="full-band">
  <img src="/images/${p.bandImage}" alt="${esc(p.bandAlt)}" loading="lazy" width="2000" height="1333">
</section>

<section class="section" id="quote">
  <div class="wrap">
    <div class="two-up two-up--form">
      <div>
        <span class="eyebrow">Get Started</span>
        <h2 class="h2" style="font-size:clamp(24px,3vw,32px);line-height:1.2">${esc(p.formTitle)}</h2>
        <p class="lead" style="margin:0 0 26px">Tell us a little about the project and we&#39;ll get back to you with next steps. Or call and talk it through &mdash; we like that better anyway.</p>
        ${infoCard({ compact: true })}
      </div>
      ${leadForm({
        kind: 'quote',
        id: p.slug,
        interest: p.title,
        placeholder: p.formPlaceholder,
      })}
    </div>
  </div>
</section>

${financeBanner({ compact: true })}

</main>
${footer()}`;
}

export function thanksPage() {
  return `${head({
    title: `Thanks — we got it | ${site.name}`,
    description: 'Your message reached Buck Nekkid Outdoor Living. We will be in touch shortly.',
    path: '/thanks.html',
    noindex: true,
  })}
${header({})}
<main id="main">
<section class="thanks">
  <div class="thanks__inner">
    <span class="eyebrow">Message sent</span>
    <h1 class="h2" style="font-size:clamp(28px,4vw,40px)">Thanks &mdash; we got it.</h1>
    <p class="lead">We&#39;ll get back to you shortly. In a hurry? Give us a ring at <a href="${site.phoneHref}" style="color:var(--navy);font-weight:700">${esc(site.phone)}</a> or swing by the showroom at ${esc(site.addressLine)}.</p>
    <div class="btn-row" style="justify-content:center">
      <a class="btn btn--primary" href="/">Back to the site</a>
      <a class="btn btn--outline-navy" href="${site.phoneHref}">Call Us</a>
    </div>
  </div>
</section>
</main>
${footer()}`;
}

export function notFoundPage() {
  return `${head({
    title: `Page not found | ${site.name}`,
    description: 'That page does not exist.',
    path: '/404.html',
    noindex: true,
  })}
${header({})}
<main id="main">
<section class="thanks">
  <div class="thanks__inner">
    <span class="eyebrow">404</span>
    <h1 class="h2" style="font-size:clamp(28px,4vw,40px)">We couldn&#39;t find that one.</h1>
    <p class="lead">The page you were after has moved or never existed. Try the divisions below, or give us a call.</p>
    <div class="btn-row" style="justify-content:center">
      <a class="btn btn--primary" href="/">Back to the site</a>
      <a class="btn btn--outline-navy" href="${site.phoneHref}">Call Us</a>
    </div>
  </div>
</section>
</main>
${footer()}`;
}
