import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://steelexpertsindia.com";
const errors = [];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git") return [];
    const target = join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function count(source, expression) {
  return [...source.matchAll(expression)].length;
}

function fail(file, message) {
  errors.push(`${relative(ROOT, file)}: ${message}`);
}

const htmlFiles = walk(ROOT).filter((file) => file.endsWith(".html"));
const canonicalUrls = new Map();

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim();
  const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1]?.trim();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]+)">/)?.[1];
  const noindex = robots?.includes("noindex") || false;

  if (!title || title.length < 20 || title.length > 68) fail(file, `title length should be 20–68 characters (found ${title?.length || 0})`);
  if (!description || description.length < 90 || description.length > 175) fail(file, `description length should be 90–175 characters (found ${description?.length || 0})`);
  if (!canonical?.startsWith(SITE)) fail(file, "missing absolute canonical URL");
  if (!robots) fail(file, "missing robots directive");
  if (!noindex && (!html.includes('<link rel="alternate" hreflang="en-IN"') || !html.includes('<link rel="alternate" hreflang="x-default"'))) fail(file, "missing language alternate links");
  if (count(html, /<h1(?:\s[^>]*)?>/g) !== 1) fail(file, "must contain exactly one H1");
  if (!html.includes('<meta property="og:title"') || !html.includes('<meta property="og:image"')) fail(file, "missing Open Graph metadata");
  if (!html.includes('<meta name="twitter:card"')) fail(file, "missing Twitter card metadata");

  if (canonical) {
    if (canonicalUrls.has(canonical)) fail(file, `duplicate canonical also used by ${relative(ROOT, canonicalUrls.get(canonical))}`);
    canonicalUrls.set(canonical, file);
  }

  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!schemas.length) fail(file, "missing JSON-LD structured data");
  for (const schema of schemas) {
    try {
      JSON.parse(schema[1]);
    } catch (error) {
      fail(file, `invalid JSON-LD (${error.message})`);
    }
  }

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|tel:|javascript:|#)/.test(href)) continue;
    const clean = href.split("#")[0].split("?")[0];
    if (!clean) continue;
    let target = clean.startsWith("/") ? join(ROOT, clean.slice(1)) : resolve(dirname(file), clean);
    if (target.endsWith(sep) || (existsSync(target) && statSync(target).isDirectory())) target = join(target, "index.html");
    if (!existsSync(target)) fail(file, `broken internal link: ${href}`);
  }
}

const sitemap = readFileSync(join(ROOT, "sitemap.xml"), "utf8");
for (const [canonical, file] of canonicalUrls) {
  const html = readFileSync(file, "utf8");
  const noindex = html.includes('content="noindex,follow"');
  if (!noindex && !sitemap.includes(`<loc>${canonical}</loc>`)) fail(file, "indexable canonical is missing from sitemap.xml");
  if (noindex && sitemap.includes(`<loc>${canonical}</loc>`)) fail(file, "noindex page must not be present in sitemap.xml");
}

if (!existsSync(join(ROOT, "images", "seo-social-card.png"))) errors.push("images/seo-social-card.png: social preview image is missing");
if (readFileSync(join(ROOT, "CNAME"), "utf8").trim() !== "steelexpertsindia.com") errors.push("CNAME: expected steelexpertsindia.com");

const robotsText = readFileSync(join(ROOT, "robots.txt"), "utf8");
if (!robotsText.includes(`Sitemap: ${SITE}/sitemap.xml`)) errors.push("robots.txt: missing absolute sitemap declaration");
if (!robotsText.includes("User-agent: *") || !robotsText.includes("Allow: /")) errors.push("robots.txt: public crawling is not explicitly allowed");

const htaccess = readFileSync(join(ROOT, ".htaccess"), "utf8");
if (!htaccess.includes("ErrorDocument 404 /404.html")) errors.push(".htaccess: missing custom 404 response");
if (!htaccess.includes(`https://steelexpertsindia.com%{REQUEST_URI}`)) errors.push(".htaccess: missing canonical HTTPS/non-www redirect");

if (errors.length) {
  console.error(`SEO validation failed with ${errors.length} issue(s):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`SEO validation passed for ${htmlFiles.length} HTML pages and ${canonicalUrls.size} unique canonical URLs.`);
