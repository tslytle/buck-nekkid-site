// Single source of truth for business facts. Copy here is final per the design
// handoff — do not paraphrase.

export const site = {
  name: 'Buck Nekkid Outdoor Living',
  tagline: "You ain't living if you ain't getting Buck Nekkid.",
  subTagline: "The catchy name that's changing the game.",
  city: 'Scottsville',
  state: 'KY',
  street: '611 E. Main Street',
  zip: '42164',
  addressLine: '611 E. Main Street, Scottsville, KY 42164',
  phone: '270-202-0245',
  phoneHref: 'tel:+12702020245',
  email: 'igetbucknekkid@gmail.com',
  mapUrl: 'https://maps.google.com/?q=611+E+Main+Street+Scottsville+KY+42164',
  financeUrl:
    'https://vistafi.com/dynamic-contractor/?id=001UO00000iSi1c&accName=Buck%20Nekkid%20Outdoor%20Living',
  hours: ['Sun/Mon Closed', 'Tue–Fri 9:00 AM–6:00 PM', 'Sat 9:00 AM–1:00 PM'],
  hoursShort: 'Tue–Fri 9am–6pm · Sat 9am–1pm · Sun–Mon Closed',
  // Machine-readable hours for LocalBusiness structured data.
  openingHours: [
    { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { days: ['Saturday'], opens: '09:00', closes: '13:00' },
  ],
  // logo: filename in public/images/brands/, or null to fall back to a text tile.
  brands: [
    { name: 'Imagine Pools', logo: 'imagine-pools.png' },
    { name: 'Aspen Spas', logo: 'aspen-spas.png' },
    { name: 'Kamado Joe', logo: 'kamado-joe.png' },
    { name: 'Bull Grills', logo: 'bull-grills.png' },
    { name: 'Durabull Outdoor Kitchens', logo: null },
    { name: 'Berlin Gardens', logo: 'berlin-gardens.png' },
    { name: 'Polycraft Furniture', logo: 'polycraft.png' },
    { name: 'SimpliFire', logo: 'simplifire.png' },
    { name: 'Monessen', logo: 'monessen.png' },
    { name: 'Regal Pool & Life Spa Chemicals', logo: 'regal.png' },
  ],
};

// Web3Forms access key. Swap this one value to change where every lead lands.
// Get a key at https://web3forms.com — you enter the destination inbox and they
// email you the key. Overridable at build time with WEB3FORMS_KEY.
//
// Not a secret: this key ships inside the public HTML of every form, so anyone
// can read it with view-source. It identifies the destination inbox, it does not
// authorise anything. The honeypot below and Web3Forms' own spam filter are what
// keep the inbox clean. Currently delivering to justinldecesare@gmail.com —
// request a new key for igetbucknekkid@gmail.com when testing is done.
export const FORM_ACCESS_KEY =
  process.env.WEB3FORMS_KEY || '51452120-20c2-4854-87aa-4efdba9379bc';

// Canonical origin — drives canonical tags, Open Graph URLs, and sitemap.xml.
// Change this the day a real domain is attached, otherwise search engines keep
// being told the workers.dev host is the canonical one. Overridable at build
// time with SITE_ORIGIN. No trailing slash.
export const ORIGIN =
  process.env.SITE_ORIGIN || 'https://buck-nekkid.justinldecesare.workers.dev';

// The seven product pages, in nav/footer order.
export const products = [
  {
    slug: 'pools',
    title: 'Swimming Pools',
    navLabel: 'Pools',
    cardTitle: 'Swimming Pools & Landscapes',
    cardBlurb:
      'Design a luxury pool area with lush landscaping and space made for relaxing or entertaining.',
    cardImage: 'pool-hero.jpg',
    cardAlt: 'Infinity-edge pool with sun loungers overlooking a Kentucky hillside',
    eyebrow: 'Swimming Pools & Landscapes',
    headline: 'Your backyard oasis, built to last.',
    lead: 'Custom in-ground pools designed around your yard, your family, and your style.',
    metaDescription:
      'Custom in-ground swimming pools, stonework, decking, and landscape lighting in Scottsville, Kentucky. Designed around your yard by Buck Nekkid Outdoor Living.',
    sectionTitle: 'Luxury pools with the landscape to match',
    body1:
      'We design a luxurious pool area complemented by lush landscaping and comfortable lounging areas — an oasis for relaxation and entertaining. Every build starts with your yard and how you actually want to use it, not a catalog page.',
    body2:
      'Stonework, integrated lighting, decking, and planting all get drawn at the same time as the pool, so the finished space feels finished — not just installed.',
    points: [
      {
        title: 'Custom design',
        body: 'Shapes, depths, tanning ledges, and water features laid out around your lot and your budget.',
      },
      {
        title: 'Stone & decking',
        body: 'High-quality stonework and pavers that hold up to Kentucky summers and winters alike.',
      },
      {
        title: 'Lighting & landscape',
        body: 'Evening lighting and planting that make the whole yard usable after dark.',
      },
    ],
    formTitle: 'Schedule a design consultation',
    formPlaceholder: 'Yard size, must-haves, rough budget...',
    heroImage: 'pool-hero.jpg',
    heroAlt: 'Infinity-edge pool with sun loungers overlooking a Kentucky hillside',
    gallery: [
      {
        src: 'pool-landscape.jpg',
        alt: 'Geometric pool and manicured lawn beside a white modern home',
      },
      { src: 'pool-loungers.jpg', alt: 'Pool deck lined with sun loungers' },
      { src: 'pool-with-pool-house.jpg', alt: 'Freeform pool with a matching pool house' },
      { src: 'pool-with-pavilion.jpg', alt: 'Pool with a covered pavilion in the background' },
    ],
    bandImage: 'stock-pool-backyard.jpg',
    bandAlt: 'Backyard pool with fountains in front of a large home',
  },
  {
    slug: 'hot-tubs',
    title: 'Hot Tubs & Spas',
    navLabel: 'Hot Tubs',
    cardTitle: 'Hot Tubs & Spas',
    cardBlurb:
      'Year-round therapy. Custom jets, chromatherapy lighting, and a full lineup from hot tubs to swim spas.',
    cardImage: 'pool-spa-spillover.jpg',
    cardAlt: 'Raised spa spilling over into a backyard pool',
    eyebrow: 'Hot Tubs & Spas',
    headline: 'Relaxation, any season.',
    lead: "Year-round relaxation that's as therapeutic as it is rejuvenating.",
    metaDescription:
      'Hot tubs, spas, and swim spas in Scottsville, Kentucky. Custom jets, chromatherapy lighting, plus pad prep and delivery from Buck Nekkid Outdoor Living.',
    sectionTitle: 'From hot tubs to swim spas',
    body1:
      "Custom jets, fountains, and chromatherapy lighting promote physical, emotional, and mental well-being by balancing the body's energy. Come sit in one before you buy — that's the fastest way to know what fits.",
    body2:
      "We carry a full line from compact two-seaters to swim spas, and we handle the pad, power, and placement so it's ready the day it lands.",
    points: [
      {
        title: 'Full lineup',
        body: 'Hot tubs, swim spas, and everything between, sized to your space and your budget.',
      },
      {
        title: 'Therapy jets',
        body: 'Custom jet layouts and chromatherapy lighting built around what your body needs.',
      },
      {
        title: 'Delivery & setup',
        body: 'Pad prep, electrical coordination, and placement handled start to finish.',
      },
    ],
    formTitle: 'Come test the water',
    formPlaceholder: "Where it's going, how many seats, indoor or outdoor...",
    heroImage: 'pool-spa-spillover.jpg',
    heroAlt: 'Raised spa spilling over into a backyard pool',
    gallery: [
      { src: 'stock-fire-feature.jpg', alt: 'Pool and linear fire feature lit at dusk' },
      { src: 'covered-patio.jpg', alt: 'Covered patio with a wood ceiling looking out over a pool' },
      { src: 'pool-loungers.jpg', alt: 'Pool deck lined with sun loungers' },
      { src: 'pool-gazebo-patio.jpg', alt: 'Pool, gazebo, and stamped concrete patio' },
    ],
    bandImage: 'stock-covered-patio.jpg',
    bandAlt: 'Covered patio with stone columns beside a pool',
  },
  {
    slug: 'outdoor-kitchens',
    title: 'Outdoor Kitchens',
    navLabel: 'Kitchens',
    cardTitle: 'Outdoor Kitchens',
    cardBlurb:
      'Fully equipped kitchens with top-shelf appliances, storage, and countertops built for BBQs and big get-togethers.',
    cardImage: 'stock-outdoor-kitchen.jpg',
    cardAlt: 'Outdoor kitchen with a gas cooktop and long stone countertop',
    eyebrow: 'Outdoor Kitchens',
    headline: 'Cook, host, repeat.',
    lead: 'Fully equipped outdoor kitchens built for BBQs, birthdays, or just a Tuesday night.',
    metaDescription:
      'Custom outdoor kitchens in Scottsville, Kentucky — built-in grills, refrigeration, storage, and weather-rated countertops from Buck Nekkid Outdoor Living.',
    sectionTitle: 'A kitchen that lives outside',
    body1:
      'We lay out a fully equipped outdoor kitchen featuring top-of-the-line appliances, ample storage, and stylish countertops — perfect for hosting cookouts and parties.',
    body2:
      'Everything is planned around traffic flow: where people stand, where the cook stands, and where the cooler ends up. Then it gets built in materials that survive weather without babysitting.',
    points: [
      {
        title: 'Top-shelf appliances',
        body: 'Built-in grills, side burners, refrigeration, and storage from the brands we carry in-store.',
      },
      {
        title: 'Durable surfaces',
        body: 'Countertops and cabinetry rated for outdoor use, finished to match your stonework.',
      },
      {
        title: 'Built for hosting',
        body: "Seating, prep space, and lighting laid out so the cook isn't stuck alone in a corner.",
      },
    ],
    formTitle: 'Design your kitchen',
    formPlaceholder: 'Appliances you want, covered or open, rough footprint...',
    heroImage: 'stock-outdoor-kitchen.jpg',
    heroAlt: 'Outdoor kitchen with a gas cooktop and long stone countertop',
    gallery: [
      { src: 'stock-grill.jpg', alt: 'Covered patio with a built-in grill beside a pool' },
      { src: 'stock-covered-patio.jpg', alt: 'Covered patio with stone columns and a dining table' },
      { src: 'stock-covered-living.jpg', alt: 'Covered outdoor living room with lounge seating' },
      {
        src: 'pavilion-fireplace.jpg',
        alt: 'Covered pavilion with a stone fireplace and picnic tables',
      },
    ],
    bandImage: 'stock-covered-patio.jpg',
    bandAlt: 'Covered patio with stone columns beside a pool',
  },
  {
    slug: 'grills-smokers',
    title: 'Grills & Smokers',
    navLabel: 'Grills',
    cardTitle: 'Grills & Smokers',
    cardBlurb: 'The gear that turns a backyard cookout into a Kentucky tradition.',
    cardImage: 'stock-grill.jpg',
    cardAlt: 'Covered patio with a built-in grill beside a pool',
    eyebrow: 'Grills & Smokers',
    headline: 'Fire up something good.',
    lead: 'The grills and smokers that turn a cookout into a Kentucky tradition.',
    metaDescription:
      'Big Green Egg, Blaze, Bull, Napoleon, and Primo grills and smokers on the floor in Scottsville, Kentucky. Built-in or freestanding, plus parts and accessories.',
    sectionTitle: 'Names you can trust, in stock',
    body1:
      "We carry Big Green Egg, Blaze, Bull Outdoor Products, Napoleon, and more — freestanding or built into a full outdoor kitchen. Come in, look at them side by side, and ask the questions you can't ask a website.",
    body2:
      "Tell us how you cook and how many people you feed, and we'll point you at the setup that actually fits — plus the accessories and fuel to keep it going.",
    points: [
      {
        title: 'Built-in or freestanding',
        body: 'Drop it into a stone island or roll it onto the patio, whichever suits your space.',
      },
      {
        title: 'Brands we stand behind',
        body: 'Big Green Egg, Blaze, Bull, Napoleon, Primo, and more on the floor in Scottsville.',
      },
      {
        title: 'Parts & accessories',
        body: 'Covers, grates, fuel, and the odds and ends that keep a good grill running for years.',
      },
    ],
    formTitle: 'Ask us what fits',
    formPlaceholder: 'What you cook, how often, gas or charcoal...',
    heroImage: 'stock-grill.jpg',
    heroAlt: 'Covered patio with a built-in grill beside a pool',
    gallery: [
      {
        src: 'stock-outdoor-kitchen.jpg',
        alt: 'Outdoor kitchen with a gas cooktop and long countertop',
      },
      {
        src: 'pavilion-fireplace.jpg',
        alt: 'Covered pavilion with a stone fireplace and picnic tables',
      },
      { src: 'stock-covered-patio.jpg', alt: 'Covered patio with stone columns and a dining table' },
      { src: 'stock-covered-living.jpg', alt: 'Covered outdoor living room with lounge seating' },
    ],
    bandImage: 'stock-outdoor-kitchen.jpg',
    bandAlt: 'Outdoor kitchen with a gas cooktop and long stone countertop',
  },
  {
    slug: 'fireplaces',
    title: 'Fireplaces & Fire Pits',
    navLabel: 'Fire',
    cardTitle: 'Fireplaces & Fire Pits',
    cardBlurb:
      'Custom stonework fire features for indoor or outdoor spaces — pits, bowls, and tables.',
    cardImage: 'stock-fire-feature.jpg',
    cardAlt: 'Pool and linear fire feature lit at dusk',
    eyebrow: 'Fireplaces & Hearthside',
    headline: 'Warmth worth gathering around.',
    lead: 'Custom fire features for indoor and outdoor spaces — pits, bowls, and tables.',
    metaDescription:
      'Custom fire pits, fireplaces, bowls, and fire tables in Scottsville, Kentucky. Gas or wood, with stonework matched to your patio by Buck Nekkid Outdoor Living.',
    sectionTitle: 'Stonework built for cool nights',
    body1:
      'Custom fire pits with unique stone arrangements and seating options provide warmth and ambience for outdoor gatherings. We build for indoor and outdoor areas alike: fire pits, bowls, and tables.',
    body2:
      "Gas or wood, round or linear, freestanding or built into a seat wall — we'll match the stone to the rest of your yard so it reads like it was always there.",
    points: [
      {
        title: 'Custom stonework',
        body: 'Stone selected and laid to match your patio, pool deck, or home exterior.',
      },
      {
        title: 'Gas or wood',
        body: "Clean-burning gas features or a proper wood fire, whichever you'll actually use.",
      },
      {
        title: 'Seating built in',
        body: 'Seat walls and furniture arranged so everyone gets a spot near the fire.',
      },
    ],
    formTitle: 'Explore fireplace options',
    formPlaceholder: "Indoor or outdoor, gas or wood, where it's going...",
    heroImage: 'stock-fire-feature.jpg',
    heroAlt: 'Pool and linear fire feature lit at dusk',
    gallery: [
      {
        src: 'pavilion-fireplace.jpg',
        alt: 'Covered pavilion with a stone fireplace and picnic tables',
      },
      {
        src: 'stock-covered-living.jpg',
        alt: 'Covered outdoor living room with lounge seating at sunset',
      },
      {
        src: 'stock-grill.jpg',
        alt: 'Covered patio with a built-in grill and fire bowl beside a pool',
      },
      { src: 'pool-gazebo-patio.jpg', alt: 'Pool, gazebo, and stamped concrete patio' },
    ],
    bandImage: 'stock-covered-living.jpg',
    bandAlt: 'Covered outdoor living room with lounge seating at sunset',
  },
  {
    slug: 'outdoor-furniture',
    title: 'Outdoor Furniture',
    navLabel: 'Furniture',
    cardTitle: 'Outdoor Furniture',
    cardBlurb: 'Comfortable, stylish pieces built to live outside.',
    cardImage: 'stock-covered-living.jpg',
    cardAlt: 'Covered outdoor living room with weather-rated lounge seating',
    eyebrow: 'Outdoor Furniture',
    headline: 'Comfort that lives outside.',
    lead: 'Elegant, durable pieces built for real outdoor use.',
    metaDescription:
      'Weather-rated outdoor furniture in Scottsville, Kentucky — dining sets, deep seating, chaises, and shade from Tropitone and other lines we carry.',
    sectionTitle: 'Because an oasis needs somewhere to sit',
    body1:
      "We carry outdoor furniture built to stay outside: frames that don't rust, cushions that dry, and finishes that hold their color through a full Kentucky summer.",
    body2:
      'Dining sets, deep seating, chaises, and shade — picked to match the stone and the space we just built you, or the one you already have.',
    points: [
      {
        title: 'Weather-rated',
        body: 'Materials chosen for sun, rain, and pollen season, not just for the showroom floor.',
      },
      {
        title: 'Brands we carry',
        body: 'Tropitone and other lines we stand behind, available to see and sit in person.',
      },
      {
        title: 'Matched to your space',
        body: "Scaled and finished to fit the patio, pool deck, or gazebo it's going on.",
      },
    ],
    formTitle: 'Browse styles in-store',
    formPlaceholder: "What you're furnishing and roughly how many seats...",
    heroImage: 'stock-covered-living.jpg',
    heroAlt: 'Covered outdoor living room with weather-rated lounge seating',
    gallery: [
      { src: 'covered-patio.jpg', alt: 'Covered patio with loungers looking out over a pool' },
      {
        src: 'stock-covered-patio.jpg',
        alt: 'Covered patio with a dining table and stone columns',
      },
      { src: 'pool-loungers.jpg', alt: 'Pool deck lined with sun loungers' },
      { src: 'stock-grill.jpg', alt: 'Covered patio lounge seating beside a built-in grill' },
    ],
    bandImage: 'stock-covered-patio.jpg',
    bandAlt: 'Covered patio with a dining table and stone columns',
  },
  {
    slug: 'pool-houses-gazebos',
    title: 'Pool Houses & Gazebos',
    navLabel: 'Gazebos',
    cardTitle: 'Pool Houses & Gazebos',
    cardBlurb: 'Premium-material shaded retreats that blend into your yard.',
    cardImage: 'pool-with-pool-house.jpg',
    cardAlt: 'Freeform pool with a matching pool house',
    eyebrow: 'Gazebos & Pool Houses',
    headline: 'Shade, style, and a place to unwind.',
    lead: 'Premium-material retreats that blend into your natural surroundings.',
    metaDescription:
      'Custom pool houses, gazebos, and pavilions in Scottsville, Kentucky. Premium timber, stone, and roofing, sited for shade and privacy.',
    sectionTitle: 'Elegant gazebos and pool houses',
    body1:
      'We build using only premium materials for shaded retreats, complete with aesthetic details that blend seamlessly with your natural surroundings.',
    body2:
      "Add a bathroom, a changing room, storage for pool gear, or a full covered kitchen — it's your building, we just make sure it looks like it belongs next to the house.",
    points: [
      {
        title: 'Premium materials',
        body: 'Timber, stone, and roofing specified to last, not to hit a price point.',
      },
      {
        title: 'Built to your use',
        body: 'Storage, changing rooms, baths, or a full covered kitchen and bar.',
      },
      {
        title: 'Sited carefully',
        body: 'Placed for shade, sightlines, and privacy against the pool and the house.',
      },
    ],
    formTitle: 'Talk through your layout',
    formPlaceholder: "Size, what goes inside, where it's going...",
    heroImage: 'pool-with-pool-house.jpg',
    heroAlt: 'Freeform pool with a matching pool house',
    gallery: [
      { src: 'pool-with-pavilion.jpg', alt: 'Pool with a covered pavilion in the background' },
      {
        src: 'pavilion-fireplace.jpg',
        alt: 'Covered pavilion with a stone fireplace and picnic tables',
      },
      { src: 'pool-gazebo-patio.jpg', alt: 'Pool, gazebo, and stamped concrete patio' },
      { src: 'covered-patio.jpg', alt: 'Covered patio with a wood ceiling looking out over a pool' },
    ],
    bandImage: 'stock-covered-living.jpg',
    bandAlt: 'Covered outdoor living room with lounge seating at sunset',
  },
];

// Home page hero slider, in order.
export const heroSlides = [
  { src: 'pool-hero.jpg', alt: 'Infinity-edge pool with sun loungers overlooking a Kentucky hillside' },
  { src: 'stock-pool-backyard.jpg', alt: 'Backyard pool with fountains in front of a large home' },
  { src: 'stock-covered-patio.jpg', alt: 'Covered patio with stone columns beside a pool' },
  { src: 'stock-fire-feature.jpg', alt: 'Pool and linear fire feature lit at dusk' },
  { src: 'pool-landscape.jpg', alt: 'Geometric pool and manicured lawn beside a white modern home' },
];

// Home page 3-up photo band.
export const photoBand = [
  { src: 'stock-covered-patio.jpg', alt: 'Covered patio with pool and stone accents' },
  { src: 'stock-outdoor-kitchen.jpg', alt: 'Outdoor kitchen with grill and countertop' },
  { src: 'stock-fire-feature.jpg', alt: 'Pool and fire feature lit at dusk' },
];

export const projectTypes = [
  'Pool',
  'Hot Tub',
  'Outdoor Kitchen',
  'Grill or Smoker',
  'Fireplace',
  'Furniture',
  'Pool House or Gazebo',
  'Other',
];

export const timelines = [
  'As soon as possible',
  'Next 3 months',
  'This year',
  'Just gathering ideas',
];
