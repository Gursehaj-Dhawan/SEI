# Steel Experts India SEO and Hostinger operations guide

The site has one reusable SEO system for every core page, category and product. The catalogue generator emits crawlable HTML, unique metadata, canonical and language URLs, social metadata, JSON-LD structured data, internal links and the XML sitemap from a single product dataset.

## Publish on Hostinger

1. In hPanel, add `steelexpertsindia.com` as an empty website on a Web or Cloud hosting plan. This codebase is a custom static site, not a Hostinger Website Builder project.
2. Open **Websites → Dashboard → File Manager** and upload the contents of this repository directly inside the domain's `public_html` folder. `index.html` must sit directly inside `public_html`, not inside another nested folder.
3. Ensure hidden files are visible and upload `.htaccess`. It provides the custom 404 response, one HTTPS/non-www hostname, compression, browser caching and security headers.
4. In **Websites → Dashboard → SSL**, confirm that the SSL certificate is active and **Force HTTPS** is enabled. The `.htaccess` redirect is a second safeguard.
5. Point both the apex domain and `www` to this Hostinger website. The server permanently redirects `www` to `https://steelexpertsindia.com`, matching every canonical URL.
6. Test the home page, a category page, a product page, `robots.txt`, `sitemap.xml` and a made-up URL. The made-up URL must show the custom page and return HTTP status 404.

Do not upload the `.git` folder. The `.github`, `scripts`, Markdown and `CNAME` files are development files and can also be omitted from `public_html`; they are not required by the live site.

## Register the site with Google

1. Add `steelexpertsindia.com` as a **Domain property** in Google Search Console and complete DNS TXT verification.
2. Submit `https://steelexpertsindia.com/sitemap.xml` under **Indexing → Sitemaps**.
3. Use **URL inspection** to run a live test and request indexing for the home page, products page, five category pages and priority product pages.
4. Monitor **Page indexing**, **Core Web Vitals**, **Rich results** and **Search results** every month. Use actual search queries and indexing reports to choose the next content improvements.
5. Create or fully complete the Google Business Profile with the exact factory name, address, phone numbers, categories, working hours, product photos and website URL used here.

## Maintain the catalogue SEO blanket

Product and category content lives in `scripts/generate-seo-pages.mjs`. After adding or changing an item, update `LAST_MODIFIED`, then run:

```powershell
node scripts/generate-seo-pages.mjs
node scripts/validate-seo.mjs
```

Upload the regenerated HTML, `js/products-data.js`, `robots.txt` and `sitemap.xml`. The GitHub workflow repeats these checks on pushes and pull requests so incomplete metadata, broken internal links or stale generated catalogue files cannot silently ship.

## Improve rankings over time

- Publish accurate material-grade guides, size and tolerance tables, industry application pages and manufacturing case studies based on real factory capabilities.
- Add real certifications, test facilities, standards, production capacities, minimum order quantities and buyer evidence only after the business verifies them.
- Earn relevant mentions from customers, industrial directories, trade associations and suppliers. Avoid paid link schemes, copied catalogue text and mass-created city pages.
- Add each new product to the generator rather than duplicating HTML manually. Unique pages need useful specifications and applications, not keyword repetition.
- Keep the factory name, address and phone numbers identical across the website, Google Business Profile and legitimate industry directories.

Technical SEO makes the site understandable, fast and indexable, but no developer or agency can guarantee Google's first organic position. Rankings also depend on the accuracy and usefulness of the content, competition, reputation, links, user satisfaction and Google's systems.
