import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://steelexpertsindia.com";
// Update this only when public page content changes. Keeping it explicit makes
// generated output reproducible in local development and CI.
const LAST_MODIFIED = "2026-08-13";
const SOCIAL_IMAGE = `${SITE}/images/seo-social-card.png`;

const categories = [
  {
    key: "bright",
    slug: "bright-steel-bars",
    name: "Bright Steel Bars",
    shortName: "Bright Bars",
    description: "Cold-drawn bright steel bars with accurate dimensions, improved straightness and a clean finish for machining and precision engineering.",
    intro: "Steel Experts India manufactures bright steel bars for buyers who need dependable size control, a smooth surface and repeatable machining performance. Round, square and hexagonal sections are available in selected grades and made to enquiry.",
    points: ["Cold-drawn dimensional control", "Round, square and hex sections", "Machining-ready surface finish", "Custom sizes and supply quantities"]
  },
  {
    key: "mild",
    slug: "mild-steel-bars",
    name: "Mild Steel Bars",
    shortName: "Mild Steel",
    description: "Mild steel round, square, flat and hexagon bars manufactured for fabrication, machining and general industrial applications.",
    intro: "Our mild steel bar range combines practical machinability, weldability and consistent sections for engineering and fabrication work. Share the required grade, profile, dimensions and quantity for a manufacturing quotation.",
    points: ["Good weldability and machinability", "Flat, square, round and hex profiles", "Bright or mill finish options", "Made for fabrication and engineering"]
  },
  {
    key: "carbon",
    slug: "carbon-steel-bars",
    name: "Carbon Steel Bars",
    shortName: "Carbon Steel",
    description: "Carbon steel round bars manufactured for strength, machining and reliable service in industrial components, shafts and equipment.",
    intro: "Steel Experts India supplies carbon steel bars for parts that call for controlled strength and dependable material performance. Requirements are reviewed by grade, section, finish, tolerance and intended application.",
    points: ["Application-led grade selection", "Round bar manufacturing", "Bright or peeled finish options", "Industrial component supply"]
  },
  {
    key: "alloy",
    slug: "alloy-steel-bars",
    name: "Alloy Steel Bars",
    shortName: "Alloy Steel",
    description: "Alloy steel bright round bars made for demanding automotive, tooling, machinery and heavy-engineering components.",
    intro: "Our alloy steel bar capability supports engineered parts that need higher strength, wear resistance or application-specific performance. We manufacture against the grade, dimensions, finish and order quantity confirmed with the buyer.",
    points: ["Custom alloy grade enquiries", "Bright round sections", "Strength-focused applications", "Automotive and heavy engineering use"]
  },
  {
    key: "specialty",
    slug: "special-steel-profiles",
    name: "Special Steel Profiles",
    shortName: "Special Profiles",
    description: "Round, half-round and custom steel profiles manufactured to support specialised engineering, fabrication, trim and component requirements.",
    intro: "Special profiles help reduce downstream machining when a standard section does not match the final component. Send a drawing or dimensional specification so our team can review material, section, finish and production feasibility.",
    points: ["Drawing-led profile review", "Half-round and custom sections", "Multiple finish possibilities", "Made for specialised applications"]
  }
];

const products = [
  {
    slug: "mild-steel-hexagon-bar",
    name: "Mild Steel Hexagon Bar",
    category: "mild",
    tag: "Mild Steel",
    image: "https://images.pexels.com/photos/386236/pexels-photo-386236.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Precision-drawn six-sided bars with clean edges, dependable tolerances and consistent machinability.",
    intro: "Mild steel hexagon bars are manufactured for repeatable across-flat dimensions and efficient machining. They are a practical choice for fasteners, fittings, tools and precision components where clean corners and consistent stock matter.",
    grade: "Mild steel / custom grades",
    shape: "Hexagonal",
    finish: "Bright / cold drawn",
    use: "Fasteners, tools, precision parts",
    material: "Mild steel",
    benefits: ["Consistent six-sided section", "Good machinability and weldability", "Suitable for repeat production"]
  },
  {
    slug: "ms-square-bars",
    name: "MS Square Bars",
    category: "mild",
    tag: "Mild Steel",
    image: "https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Uniform mild steel square sections manufactured for fabrication, machining and structural applications.",
    intro: "MS square bars provide a versatile solid section for frames, machinery, supports and machined components. We manufacture to the grade, side dimension, length, finish and quantity agreed for the application.",
    grade: "Mild steel",
    shape: "Square",
    finish: "Bright / mill",
    use: "Fabrication, frames, machinery",
    material: "Mild steel",
    benefits: ["Uniform square cross-section", "Practical fabrication performance", "Custom size enquiries welcome"]
  },
  {
    slug: "sae-1018-round-bright-bars",
    name: "SAE 1018 Round Bright Bars",
    category: "bright",
    tag: "Bright Bar",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=82",
    description: "Low-carbon bright bars valued for weldability, surface finish, dimensional accuracy and machinability.",
    intro: "SAE 1018 round bright bars are widely selected for shafts, pins, bushes and general precision components. Cold drawing improves the surface and dimensional consistency available to production teams.",
    grade: "SAE 1018",
    shape: "Round",
    finish: "Bright / cold drawn",
    use: "Shafts, pins, bushes, components",
    material: "Low-carbon steel",
    benefits: ["Reliable machinability", "Clean bright surface", "Consistent round dimensions"]
  },
  {
    slug: "alloy-steel-bright-round-bar",
    name: "Alloy Steel Bright Round Bar",
    category: "alloy",
    tag: "Alloy Steel",
    image: "/images/Bright-Round-Bars.webp",
    description: "High-performance alloy bars designed for strength, wear resistance and demanding engineered parts.",
    intro: "Alloy steel bright round bars are made for components where material strength and consistent machining stock are central to performance. Grade, heat-treatment condition, dimensions and finish are confirmed against the buyer's specification.",
    grade: "Custom alloy grades",
    shape: "Round",
    finish: "Bright",
    use: "Automotive, tooling, heavy engineering",
    material: "Alloy steel",
    benefits: ["Strength-focused grade options", "Bright machining surface", "Made to technical enquiry"]
  },
  {
    slug: "mild-steel-flat-bar",
    name: "Mild Steel Flat Bar",
    category: "mild",
    tag: "Mild Steel",
    image: "/images/Flat-Bright-Bars.webp",
    description: "Straight, flat steel sections with dependable width and thickness control for diverse industrial work.",
    intro: "Mild steel flat bars are used across brackets, frames, supports, base plates and general fabricated parts. Our manufacturing review covers width, thickness, edge condition, length, finish and quantity.",
    grade: "Mild steel",
    shape: "Flat",
    finish: "Bright / mill",
    use: "Brackets, frames, general fabrication",
    material: "Mild steel",
    benefits: ["Controlled width and thickness", "Versatile fabrication stock", "Bright and mill finish options"]
  },
  {
    slug: "16mm-cr5-round-steel-bright-bar",
    name: "16mm CR5 Round Steel Bright Bar",
    category: "bright",
    tag: "Bright Bar",
    image: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "A 16 mm bright round bar offering controlled dimensions and a clean surface for precision production.",
    intro: "The 16 mm CR5 round bright bar is intended for production teams that need a defined diameter and a machining-ready bright finish. Confirm the required material condition, tolerance, straightness, cut length and quantity with our team.",
    grade: "CR5",
    shape: "Round, 16 mm",
    finish: "Bright",
    use: "Machined parts, pins, shafts",
    material: "CR5 steel",
    benefits: ["Defined 16 mm round section", "Clean bright finish", "Suitable for machined components"]
  },
  {
    slug: "en1a-bright-hex-bar",
    name: "EN1A Bright Hex Bar",
    category: "bright",
    tag: "Free Cutting",
    image: "https://images.pexels.com/photos/386236/pexels-photo-386236.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Free-machining EN1A hexagonal bars for efficient, repeatable production of precision components.",
    intro: "EN1A bright hex bars combine a free-machining grade with a consistent six-sided section. They are suited to CNC and automatic machining of fittings, fasteners and repeated precision parts.",
    grade: "EN1A",
    shape: "Hexagonal",
    finish: "Bright",
    use: "CNC parts, fasteners, fittings",
    material: "Free-cutting steel",
    benefits: ["Free-machining grade", "Accurate across-flat section", "Efficient repeat production"]
  },
  {
    slug: "cold-drawn-bright-bar",
    name: "Cold Drawn Bright Bar",
    category: "bright",
    tag: "Cold Drawn",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=82",
    description: "Cold-drawn sections with improved surface finish, dimensional accuracy, straightness and consistency.",
    intro: "Cold drawn bright bars give manufacturers more controlled stock than conventional hot-rolled sections. The process supports tighter dimensions, improved straightness and a clean surface in round, square and hexagonal profiles.",
    grade: "Multiple grades",
    shape: "Round / square / hexagonal",
    finish: "Cold drawn bright",
    use: "Precision engineering components",
    material: "Steel to specification",
    benefits: ["Improved dimensional accuracy", "Smooth consistent surface", "Multiple section possibilities"]
  },
  {
    slug: "carbon-steel-round-bars",
    name: "Carbon Steel Round Bars",
    category: "carbon",
    tag: "Carbon Steel",
    image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Robust carbon steel rounds developed for reliable strength across manufacturing and engineering use.",
    intro: "Carbon steel round bars provide solid machining stock for axles, machine parts and industrial equipment. Selection depends on the required grade, mechanical performance, diameter, finish and downstream process.",
    grade: "Carbon steel grades",
    shape: "Round",
    finish: "Bright / peeled",
    use: "Machine parts, axles, industrial equipment",
    material: "Carbon steel",
    benefits: ["Strength for industrial parts", "Round machining stock", "Grade-led manufacturing review"]
  },
  {
    slug: "round-steel-bars",
    name: "Round Steel Bars",
    category: "specialty",
    tag: "General Purpose",
    image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Versatile round steel bars supplied in selected grades, sizes and finishes to match project needs.",
    intro: "Round steel bars are a core raw material for engineering, fabrication and component manufacturing. Share the material grade, diameter, tolerance, finish, length and order volume so we can review the right route.",
    grade: "As specified",
    shape: "Round",
    finish: "Custom",
    use: "Engineering, construction, fabrication",
    material: "Steel to specification",
    benefits: ["Wide application range", "Multiple grade possibilities", "Sizes made to enquiry"]
  },
  {
    slug: "mild-steel-square-bright-bar",
    name: "Mild Steel Square Bright Bar",
    category: "bright",
    tag: "Bright Bar",
    image: "/images/Diagonal-Cutting-Bright-Square-Bars.webp",
    description: "Bright-finished square bars combining smooth surfaces with accurate corners and cross-sections.",
    intro: "Mild steel square bright bars provide clean faces, controlled corners and consistent stock for fixtures, frames and precision components. They are made to agreed section dimensions, tolerances and lengths.",
    grade: "Mild steel",
    shape: "Square",
    finish: "Bright",
    use: "Precision frames, components, fixtures",
    material: "Mild steel",
    benefits: ["Accurate square cross-section", "Smooth bright faces", "Good machining and fabrication utility"]
  },
  {
    slug: "half-round-steel-bar",
    name: "Half Round Steel Bar",
    category: "specialty",
    tag: "Special Profile",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=82",
    description: "Special half-round profiles manufactured for close fit, aesthetic detail and custom applications.",
    intro: "Half round steel bars reduce the need to machine a full round section when the application needs one flat face and one curved face. They can support guides, trim, fabricated parts and special engineering designs.",
    grade: "As specified",
    shape: "Half round",
    finish: "Bright / custom",
    use: "Trim, guides, custom engineering",
    material: "Steel to specification",
    benefits: ["Purpose-made half-round profile", "Reduced downstream stock removal", "Drawing-led custom options"]
  }
];

const pageSeo = {
  "index.html": {
    path: "/",
    title: "Steel Experts India | Precision Steel Bar Manufacturer",
    description: "Steel Experts India manufactures bright, mild, carbon and alloy steel bars in Punjab, India, including round, square, flat, hex and custom profiles.",
    type: "WebPage",
    label: "Home"
  },
  "about.html": {
    path: "/about.html",
    title: "About Steel Experts India | Steel Manufacturer Since 1978",
    description: "Meet Steel Experts India, a Punjab steel bar manufacturer built on precision, quality, timely supply and trusted industrial relationships since 1978.",
    type: "AboutPage",
    label: "About"
  },
  "products.html": {
    path: "/products.html",
    title: "Steel Bar Products | Bright, Mild, Carbon & Alloy Steel",
    description: "Explore bright, mild, carbon and alloy steel bars in round, square, flat, hex and special profiles. View specifications and request a factory quote.",
    type: "CollectionPage",
    label: "Products"
  },
  "process.html": {
    path: "/process.html",
    title: "Steel Bar Manufacturing Process | Steel Experts India",
    description: "See how Steel Experts India controls raw material, cutting, cold drawing, finishing, quality inspection, packaging and dispatch for steel bar orders.",
    type: "WebPage",
    label: "Manufacturing Process"
  },
  "gallery.html": {
    path: "/gallery.html",
    title: "Steel Factory & Product Gallery | Steel Experts India",
    description: "View steel bars, manufacturing equipment, quality checks, packaging and factory operations at Steel Experts India in Punjab.",
    type: "ImageGallery",
    label: "Gallery"
  },
  "contact.html": {
    path: "/contact.html",
    title: "Contact Steel Experts India | Request a Steel Bar Quote",
    description: "Contact our Punjab steel factory for bright, mild, carbon, alloy or custom steel bar requirements. Send grade, size, finish, quantity and destination.",
    type: "ContactPage",
    label: "Contact"
  },
  "privacy.html": {
    path: "/privacy.html",
    title: "Privacy Policy | Steel Experts India",
    description: "Read how Steel Experts India handles information submitted through website enquiries and quotation requests.",
    type: "WebPage",
    label: "Privacy Policy",
    noindex: true
  },
  "terms.html": {
    path: "/terms.html",
    title: "Terms & Conditions | Steel Experts India",
    description: "Read the terms applying to Steel Experts India website content, product information and quotation enquiries.",
    type: "WebPage",
    label: "Terms & Conditions",
    noindex: true
  },
  "404.html": {
    path: "/404.html",
    title: "Page Not Found | Steel Experts India",
    description: "The requested page could not be found. Browse Steel Experts India products and categories or contact our Punjab factory for a steel bar quotation.",
    type: "WebPage",
    label: "Page Not Found",
    noindex: true
  }
};

const categoryByKey = Object.fromEntries(categories.map((category) => [category.key, category]));
const productUrl = (product) => `${SITE}/products/${product.slug}/`;
const categoryUrl = (category) => `${SITE}/categories/${category.slug}/`;
const absoluteImage = (image) => image.startsWith("http") ? image : `${SITE}${image}`;
const relativeImage = (image) => image.startsWith("http") ? image : `../..${image}`;
const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const jsonLd = (value) => JSON.stringify(value, null, 2).replaceAll("</", "<\\/");

function fitMetaDescription(value, maximum = 165) {
  const text = String(value).replace(/\s+/g, " ").trim();
  if (text.length <= maximum) return text;
  const shortened = text.slice(0, maximum - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 110 ? lastSpace : maximum - 1).replace(/[,:;.!?\s]+$/, "")}.`;
}

function productMetaTitle(product) {
  const candidates = [
    `${product.name} Manufacturer India | Steel Experts India`,
    `${product.name} Manufacturer | Steel Experts India`,
    `${product.name} Supplier India | Steel Experts India`
  ];
  return candidates.find((title) => title.length <= 68) || `${product.name} | Steel Experts India`;
}

function productMetaDescription(product) {
  return fitMetaDescription(`Manufacturer of ${product.name.toLowerCase()} for ${product.use.toLowerCase()}. Ask Steel Experts India for grades, sizes, tolerances, finish and order quantity.`);
}

function categoryMetaDescription(category) {
  return fitMetaDescription(`${category.description} Manufactured to enquiry by Steel Experts India in Punjab.`);
}

const organization = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Steel Experts India",
  legalName: "Steel Experts India",
  slogan: "Precision Steel. Trusted Since 1978.",
  url: `${SITE}/`,
  logo: `${SITE}/images/logo.png`,
  image: SOCIAL_IMAGE,
  description: "Manufacturer of bright, mild, carbon, alloy and special-profile steel bars in Punjab, India.",
  foundingDate: "1978",
  telephone: ["+91-92174-92174", "+91-99150-00270"],
  email: "info@steelexpertsindia.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot No. 231, Guru Gobind Singh Industrial Enclave, Dehlon Road",
    addressLocality: "Sahnewal Khurd",
    addressRegion: "Punjab",
    postalCode: "141120",
    addressCountry: "IN"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-92174-92174",
    contactType: "sales",
    areaServed: ["IN", "Worldwide"],
    availableLanguage: ["English", "Hindi", "Punjabi"]
  },
  knowsAbout: [
    ...categories.map((category) => category.name),
    ...products.map((product) => product.name)
  ],
  sameAs: [
    "https://www.instagram.com/indiasteelexperts/"
  ]
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: `${SITE}/`,
  name: "Steel Experts India",
  alternateName: "SEI",
  publisher: { "@id": `${SITE}/#organization` },
  inLanguage: "en-IN"
};

function breadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

function seoHead({ title, description, canonical, type = "website", robots = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1", graph }) {
  return `  <!-- SEO:START -->
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="en-IN" href="${canonical}">
  <link rel="alternate" hreflang="x-default" href="${canonical}">
  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="Steel Experts India">
  <meta property="og:locale" content="en_IN">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SOCIAL_IMAGE}">
  <meta property="og:image:secure_url" content="${SOCIAL_IMAGE}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1536">
  <meta property="og:image:height" content="1024">
  <meta property="og:image:alt" content="Steel Experts India precision steel bar manufacturing">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${SOCIAL_IMAGE}">
  <meta name="twitter:image:alt" content="Steel Experts India precision steel bar manufacturing">
  <script type="application/ld+json">
${jsonLd({ "@context": "https://schema.org", "@graph": graph }).split("\n").map((line) => `    ${line}`).join("\n")}
  </script>
  <!-- SEO:END -->`;
}

function cleanSeo(html) {
  return html
    .replace(/\s*<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\s*/g, "\n")
    .replace(/\s*<meta\s+property="og:[^"]+"\s+content="[^"]*"\s*\/?>/g, "")
    .replace(/\s*<meta\s+name="twitter:[^"]+"\s+content="[^"]*"\s*\/?>/g, "")
    .replace(/\s*<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/g, "")
    .replace(/\s*<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/g, "")
    .replace(/\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g, "");
}

function updateRootPage(file, config) {
  const fullPath = join(ROOT, file);
  let html = cleanSeo(readFileSync(fullPath, "utf8"));
  const canonical = `${SITE}${config.path}`;
  const graph = [organization, website, {
    "@type": config.type,
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: config.title,
    description: config.description,
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#organization` },
    inLanguage: "en-IN"
  }];

  if (config.path !== "/") {
    graph.push(breadcrumb([
      { name: "Home", url: `${SITE}/` },
      { name: config.label, url: canonical }
    ]));
  }

  if (file === "products.html") {
    graph.push({
      "@type": "ItemList",
      name: "Steel bar products manufactured by Steel Experts India",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: productUrl(product)
      }))
    });
  }

  html = html
    .replace(/<html\s+lang="[^"]+">/, '<html lang="en-IN">')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(config.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(config.description)}">`)
    .replaceAll('href="index.html"', 'href="./"');

  const block = seoHead({
    title: config.title,
    description: config.description,
    canonical,
    robots: config.noindex ? "noindex,follow" : undefined,
    graph
  });
  html = html.replace(/\s*<link rel="icon"/, `\n${block}\n  <link rel="icon"`);
  writeFileSync(fullPath, html, "utf8");
}

function header(prefix = "../../", homeHref = `${prefix}`) {
  return `<a class="skip-link" href="#main-content">Skip to main content</a>
  <div class="loader" aria-hidden="true"><div class="loader__mark"><div class="loader__logo"><span>SEI</span></div><div class="loader__bar"></div></div></div>
  <header class="site-header">
    <nav class="navbar" aria-label="Primary">
      <a class="brand" href="${homeHref}" aria-label="Steel Experts India home"><img class="brand__mark" src="${prefix}images/logo.png" alt="Steel Experts India logo" width="48" height="48"><span class="brand__text">Steel Experts India<small>Manufacturing since 1978</small></span></a>
      <ul class="nav-links" id="primary-navigation"><li><a href="${homeHref}">Home</a></li><li><a href="${prefix}about.html">About</a></li><li><a href="${prefix}products.html">Products</a></li><li><a href="${prefix}process.html">Process</a></li><li><a href="${prefix}gallery.html">Gallery</a></li><li><a href="${prefix}contact.html">Contact</a></li></ul>
      <div class="nav-actions"><a class="btn btn--primary btn--small header-quote" href="${prefix}contact.html#quote-form">Request Quote</a><button class="theme-toggle" type="button" aria-label="Switch color theme"><span class="theme-toggle__moon" aria-hidden="true">◐</span><span class="theme-toggle__sun" aria-hidden="true">☀</span></button><button class="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded="false" aria-label="Open navigation menu"><span></span><span></span><span></span></button></div>
    </nav>
  </header>`;
}

function footer(prefix = "../../", homeHref = `${prefix}`) {
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-about"><a class="brand" href="${homeHref}"><img class="brand__mark" src="${prefix}images/logo.png" alt="Steel Experts India logo" width="48" height="48"><span class="brand__text">Steel Experts India<small>Precision Steel. Trusted Since 1978.</small></span></a><p>Manufacturer of mild steel, bright, carbon and alloy steel bars for precision engineering and industrial applications.</p><div class="social-links"><a href="https://www.instagram.com/indiasteelexperts/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a><a href="https://wa.me/919217492174" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WA</a></div></div>
      <div><h2 class="footer-title">Quick Links</h2><ul class="footer-links"><li><a href="${prefix}about.html">About Us</a></li><li><a href="${prefix}products.html">Products</a></li><li><a href="${prefix}process.html">Manufacturing</a></li><li><a href="${prefix}gallery.html">Gallery</a></li><li><a href="${prefix}contact.html">Contact</a></li></ul></div>
      <div><h2 class="footer-title">Product Categories</h2><ul class="footer-links">${categories.map((category) => `<li><a href="${prefix}categories/${category.slug}/">${category.shortName}</a></li>`).join("")}</ul></div>
      <div><h2 class="footer-title">Factory</h2><address class="footer-address">Plot No. 231, Guru Gobind Singh Industrial Enclave, Dehlon Road, Sahnewal Khurd, Punjab – 141120</address><a class="footer-phone" href="tel:+919217492174">+91 92174 92174</a><br><a class="footer-phone" href="tel:+919915000270">+91 99150 00270</a></div>
    </div>
    <div class="container footer-bottom"><p>© <span data-current-year></span> Steel Experts India. All rights reserved.</p><div class="footer-legal"><a href="${prefix}privacy.html">Privacy Policy</a><a href="${prefix}terms.html">Terms &amp; Conditions</a></div></div>
  </footer>
  <a class="floating-whatsapp" href="https://wa.me/919217492174?text=Hello%20Steel%20Experts%20India%2C%20I%20would%20like%20a%20quote%20for%20a%20steel%20product." target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><span class="floating-whatsapp__icon" aria-hidden="true">WA</span> WhatsApp Us</a>
  <button class="back-to-top" type="button" aria-label="Back to top">↑</button>`;
}

function productCard(product, index, prefix = "") {
  return `<article class="product-card reveal" data-category="${product.category}">
    <a class="product-card__image" href="${prefix}products/${product.slug}/" aria-label="View ${escapeHtml(product.name)}">
      <img src="${prefix && product.image.startsWith("/") ? `${prefix.slice(0, -1)}${product.image}` : product.image}" alt="${escapeHtml(product.name)} manufactured by Steel Experts India" loading="${index < 3 ? "eager" : "lazy"}" width="640" height="440">
      <span class="product-card__tag">${escapeHtml(product.tag)}</span>
    </a>
    <div class="product-card__body">
      <h3><a href="${prefix}products/${product.slug}/">${escapeHtml(product.name)}</a></h3>
      <p>${escapeHtml(product.description)}</p>
      <div class="product-card__actions"><a class="btn btn--dark btn--small" href="${prefix}products/${product.slug}/">Specifications</a><a class="btn btn--primary btn--small" href="${prefix}contact.html?product=${encodeURIComponent(product.name)}#quote-form">Request Quote</a></div>
    </div>
  </article>`;
}

function productPage(product) {
  const category = categoryByKey[product.category];
  const canonical = productUrl(product);
  const title = productMetaTitle(product);
  const description = productMetaDescription(product);
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
  const graph = [organization, website, {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${canonical}#product` },
    inLanguage: "en-IN"
  }, {
    "@type": "Product",
    "@id": `${canonical}#product`,
    name: product.name,
    url: canonical,
    image: [absoluteImage(product.image)],
    description: product.description,
    category: category.name,
    material: product.material,
    brand: { "@type": "Brand", name: "Steel Experts India" },
    manufacturer: { "@id": `${SITE}/#organization` },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Typical grade", value: product.grade },
      { "@type": "PropertyValue", name: "Section", value: product.shape },
      { "@type": "PropertyValue", name: "Finish", value: product.finish },
      { "@type": "PropertyValue", name: "Applications", value: product.use }
    ]
  }, breadcrumb([
    { name: "Home", url: `${SITE}/` },
    { name: "Products", url: `${SITE}/products.html` },
    { name: category.name, url: categoryUrl(category) },
    { name: product.name, url: canonical }
  ])];

  return `<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#0A2342">
${seoHead({ title, description, canonical, type: "product", graph })}
  <link rel="icon" href="../../favicon.ico" sizes="any">
  <link rel="stylesheet" href="../../css/style.css"><link rel="stylesheet" href="../../css/animations.css"><link rel="stylesheet" href="../../css/responsive.css">
</head>
<body>
  ${header()}
  <main id="main-content">
    <section class="page-hero page-hero--product" style="--page-image: url('${relativeImage(product.image)}')">
      <div class="container page-hero__content">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../../products.html">Products</a><span>/</span><a href="../../categories/${category.slug}/">${escapeHtml(category.shortName)}</a><span>/</span><span aria-current="page">${escapeHtml(product.name)}</span></nav>
        <p class="eyebrow">${escapeHtml(category.name)}</p>
        <h1>${escapeHtml(product.name)}</h1>
        <p>${escapeHtml(product.description)}</p>
      </div>
    </section>

    <section class="section">
      <div class="container product-detail-grid">
        <div class="product-detail__visual reveal from-left"><img src="${relativeImage(product.image)}" alt="${escapeHtml(product.name)} steel bar" width="920" height="760" fetchpriority="high"></div>
        <div class="copy-block reveal from-right">
          <p class="eyebrow">Product overview</p>
          <h2>Manufactured around your specification</h2>
          <p>${escapeHtml(product.intro)}</p>
          <ul class="spec-list product-specs">
            <li><span>Material</span><strong>${escapeHtml(product.material)}</strong></li>
            <li><span>Typical grade</span><strong>${escapeHtml(product.grade)}</strong></li>
            <li><span>Section</span><strong>${escapeHtml(product.shape)}</strong></li>
            <li><span>Finish</span><strong>${escapeHtml(product.finish)}</strong></li>
            <li><span>Typical applications</span><strong>${escapeHtml(product.use)}</strong></li>
            <li><span>Sizes and tolerances</span><strong>Made to enquiry</strong></li>
          </ul>
          <div class="product-detail__actions"><a class="btn btn--primary" href="../../contact.html?product=${encodeURIComponent(product.name)}#quote-form">Request a ${escapeHtml(product.name)} Quote</a><a class="text-link" href="tel:+919217492174">Call +91 92174 92174</a></div>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container"><div class="section-head reveal"><div class="section-head__copy"><p class="eyebrow">Why this product</p><h2>Practical benefits for production</h2><p>Final suitability depends on your confirmed grade, dimensions, tolerances, finish and application.</p></div></div>
        <div class="card-grid">${product.benefits.map((benefit, index) => `<article class="value-card reveal"><span>0${index + 1}</span><h3>${escapeHtml(benefit)}</h3><p>Our team reviews the requirement against the intended component and downstream process.</p></article>`).join("")}</div>
      </div>
    </section>

    ${related.length ? `<section class="section"><div class="container"><div class="section-head reveal"><div class="section-head__copy"><p class="eyebrow">Related products</p><h2>More ${escapeHtml(category.shortName.toLowerCase())}</h2></div><a class="text-link" href="../../categories/${category.slug}/">View category</a></div><div class="product-grid">${related.map((item, index) => productCard(item, index, "../../")).join("")}</div></div></section>` : ""}
    <section class="section section--soft"><div class="container"><div class="cta-band reveal"><div class="cta-band__inner"><h2>Share the grade, size, finish and quantity you need.</h2><a class="btn btn--primary" href="../../contact.html?product=${encodeURIComponent(product.name)}#quote-form">Request a Factory Quote <span aria-hidden="true">↗</span></a></div></div></div></section>
  </main>
  ${footer()}
  <script src="../../js/main.js" defer></script><script src="../../js/animations.js" defer></script>
</body>
</html>
`;
}

function categoryPage(category) {
  const items = products.filter((product) => product.category === category.key);
  const canonical = categoryUrl(category);
  const title = `${category.name} Manufacturer India | Steel Experts India`;
  const description = categoryMetaDescription(category);
  const graph = [organization, website, {
    "@type": "CollectionPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#organization` },
    inLanguage: "en-IN",
    mainEntity: { "@id": `${canonical}#list` }
  }, {
    "@type": "ItemList",
    "@id": `${canonical}#list`,
    name: category.name,
    numberOfItems: items.length,
    itemListElement: items.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: productUrl(product)
    }))
  }, breadcrumb([
    { name: "Home", url: `${SITE}/` },
    { name: "Products", url: `${SITE}/products.html` },
    { name: category.name, url: canonical }
  ])];

  return `<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#0A2342">
${seoHead({ title, description, canonical, graph })}
  <link rel="icon" href="../../favicon.ico" sizes="any">
  <link rel="stylesheet" href="../../css/style.css"><link rel="stylesheet" href="../../css/animations.css"><link rel="stylesheet" href="../../css/responsive.css">
</head>
<body>
  ${header()}
  <main id="main-content">
    <section class="page-hero" style="--page-image: url('${items.length ? relativeImage(items[0].image) : "../../images/Title.png"}')">
      <div class="container page-hero__content">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../../products.html">Products</a><span>/</span><span aria-current="page">${escapeHtml(category.name)}</span></nav>
        <p class="eyebrow">Steel bar category</p>
        <h1>${escapeHtml(category.name)}</h1>
        <p>${escapeHtml(category.description)}</p>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="section-head reveal"><div class="section-head__copy"><p class="eyebrow">Manufactured in Punjab, India</p><h2>${escapeHtml(category.shortName)} for industrial requirements</h2><p>${escapeHtml(category.intro)}</p></div><a class="btn btn--primary" href="../../contact.html?product=${encodeURIComponent(category.name)}#quote-form">Request Category Quote</a></div>
        <div class="product-grid">${items.map((product, index) => productCard(product, index, "../../")).join("")}</div>
      </div>
    </section>

    <section class="section"><div class="container split"><div class="copy-block reveal from-left"><p class="eyebrow">What to specify</p><h2>Details that help us quote accurately</h2><p>For the quickest manufacturing review, include the material grade, profile, dimensions, tolerances, straightness, finish, cut length, quantity, application and delivery destination.</p><a class="btn btn--dark" href="../../contact.html#quote-form">Share Your Specification</a></div><div class="capability-panel reveal from-right"><h3>${escapeHtml(category.name)} capabilities</h3><ul class="checks">${category.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul></div></div></section>

    <section class="section section--soft"><div class="container"><div class="section-head reveal"><div class="section-head__copy"><p class="eyebrow">Browse all categories</p><h2>Find the closest steel family</h2></div></div><nav class="category-directory" aria-label="Other product categories"><div class="category-directory__links">${categories.map((item) => `<a${item.key === category.key ? ' aria-current="page"' : ""} href="../../categories/${item.slug}/">${escapeHtml(item.name)}</a>`).join("")}</div></nav></div></section>
    <section class="section"><div class="container"><div class="cta-band reveal"><div class="cta-band__inner"><h2>Need a size, grade or profile not shown here?</h2><a class="btn btn--primary" href="../../contact.html#quote-form">Discuss a Custom Requirement <span aria-hidden="true">↗</span></a></div></div></div></section>
  </main>
  ${footer()}
  <script src="../../js/main.js" defer></script><script src="../../js/animations.js" defer></script>
</body>
</html>
`;
}

function updateProductsIndex() {
  const fullPath = join(ROOT, "products.html");
  let html = readFileSync(fullPath, "utf8");
  const directory = `<!-- SEO:CATEGORIES_START -->
        <nav class="category-directory reveal" aria-label="Browse steel product categories"><p>Indexable product categories</p><div class="category-directory__links">${categories.map((category) => `<a href="categories/${category.slug}/">${escapeHtml(category.name)}</a>`).join("")}</div></nav>
        <!-- SEO:CATEGORIES_END -->`;
  const cards = `<!-- SEO:PRODUCTS_START -->
        <div class="product-grid" id="product-grid" aria-live="polite">${products.map((product, index) => productCard(product, index)).join("")}</div>
        <!-- SEO:PRODUCTS_END -->`;

  if (/<!-- SEO:CATEGORIES_START -->/.test(html)) {
    html = html.replace(/<!-- SEO:CATEGORIES_START -->[\s\S]*?<!-- SEO:CATEGORIES_END -->/, directory);
  } else {
    html = html.replace(/\s*<div class="filter-bar reveal">/, `\n        ${directory}\n        <div class="filter-bar reveal">`);
  }

  if (/<!-- SEO:PRODUCTS_START -->/.test(html)) {
    html = html.replace(/<!-- SEO:PRODUCTS_START -->[\s\S]*?<!-- SEO:PRODUCTS_END -->/, cards);
  } else {
    html = html.replace(/<div class="product-grid" id="product-grid" aria-live="polite"><\/div>/, cards);
  }

  html = html.replace('<script src="js/main.js" defer></script><script src="js/products.js" defer></script>', '<script src="js/main.js" defer></script><script src="js/products-data.js" defer></script><script src="js/products.js" defer></script>');
  writeFileSync(fullPath, html, "utf8");
}

function writeCatalogueData() {
  const clientProducts = products.map((product) => ({
    ...product,
    url: `products/${product.slug}/`,
    categoryUrl: `categories/${categoryByKey[product.category].slug}/`
  }));
  writeFileSync(join(ROOT, "js", "products-data.js"), `window.SEI_PRODUCTS = ${JSON.stringify(clientProducts, null, 2)};\n`, "utf8");
}

function updateProductsScript() {
  const fullPath = join(ROOT, "js", "products.js");
  let script = readFileSync(fullPath, "utf8");
  script = script.replace(/  const products = \[[\s\S]*?\n  \];/, "  const products = window.SEI_PRODUCTS || [];");
  script = script.replace("  if (!grid) return;", "  if (!grid || !products.length) return;");
  script = script.replace("        <h3>${product.name}</h3>", "        <h3><a href=\"${product.url}\">${product.name}</a></h3>");
  writeFileSync(fullPath, script, "utf8");
}

function writeSitemap() {
  const urls = [
    ...Object.values(pageSeo).filter((page) => !page.noindex).map((page) => `${SITE}${page.path}`),
    ...categories.map(categoryUrl),
    ...products.map(productUrl)
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc><lastmod>${LAST_MODIFIED}</lastmod></url>`).join("\n")}
</urlset>
`;
  writeFileSync(join(ROOT, "sitemap.xml"), xml, "utf8");
}

function writeGeneratedPages() {
  for (const category of categories) {
    const output = join(ROOT, "categories", category.slug, "index.html");
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, categoryPage(category), "utf8");
  }
  for (const product of products) {
    const output = join(ROOT, "products", product.slug, "index.html");
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, productPage(product), "utf8");
  }
}

function writeNotFoundPage() {
  const config = pageSeo["404.html"];
  writeFileSync(join(ROOT, "404.html"), `<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(config.title)}</title>
  <meta name="description" content="${escapeHtml(config.description)}">
  <meta name="theme-color" content="#0A2342">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="stylesheet" href="/css/style.css"><link rel="stylesheet" href="/css/animations.css"><link rel="stylesheet" href="/css/responsive.css">
</head>
<body>
  ${header("/", "/")}
  <main id="main-content">
    <section class="page-hero" style="--page-image: url('/images/Title.png')">
      <div class="container page-hero__content">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span aria-current="page">Page not found</span></nav>
        <p class="eyebrow">Error 404</p>
        <h1>This page could not be found.</h1>
        <p>The address may have changed. Browse our steel bar catalogue or contact the factory with your requirement.</p>
        <div class="hero__actions"><a class="btn btn--primary" href="/products.html">Browse Steel Products</a><a class="btn btn--outline" href="/contact.html#quote-form">Request a Quote</a></div>
      </div>
    </section>
  </main>
  ${footer("/", "/")}
  <script src="/js/main.js" defer></script><script src="/js/animations.js" defer></script>
</body>
</html>
`, "utf8");
}

writeCatalogueData();
updateProductsScript();
updateProductsIndex();
writeNotFoundPage();
for (const [file, config] of Object.entries(pageSeo)) updateRootPage(file, config);
writeGeneratedPages();
writeSitemap();
writeFileSync(join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /.github/\nDisallow: /scripts/\n\nSitemap: ${SITE}/sitemap.xml\n`, "utf8");

console.log(`Generated ${products.length} product pages, ${categories.length} category pages and site-wide SEO metadata.`);
