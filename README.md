# Buck Nekkid Outdoor Living — website

Static marketing site for Buck Nekkid Outdoor Living (Scottsville, KY). Eight
pages: one home page plus seven product pages. No framework, no runtime
dependencies — a small Node script renders `src/` into plain HTML in `dist/`.

## Quick start

```bash
npm install
npm run build
npm run dev      # build, then preview at http://localhost:4173
```

| Script | What it does |
| --- | --- |
| `npm run build` | Renders `dist/`. Uses Node built-ins only. |
| `npm run dev` | Build, then serve `dist/` locally. |
| `npm run audit` | Checks the build for broken links, missing alt text, SEO basics, and leftover placeholders. |
| `npm run images` | Downscales and re-encodes anything in `public/images`. Needs `sharp` (a dev dependency). |

## Layout

```
src/site.mjs      All business facts and the seven pages' content. Edit copy here.
src/layout.mjs    Head, header, footer, contact card, lead form.
src/pages.mjs     Page templates (home, product, thanks, 404).
src/styles.css    Design tokens and components. Shipped as-is.
src/main.js       Hero slider, mobile nav, form submission. Shipped as-is.
public/           Copied verbatim into dist/ (images live here).
tools/build.mjs   The build.
dist/             Generated output. Not committed.
```

The seven product pages all render from one template, so a header or footer
change happens once. To change wording on a product page, edit its entry in the
`products` array in `src/site.mjs`.

## The contact forms

Both form types (home "Contact Us" and the per-product "Get Started" quote form)
post to [Web3Forms](https://web3forms.com), which emails each submission to the
address tied to your access key. No backend, no database.

**The access key is the only thing that controls where leads land.** It lives in
one place:

```js
// src/site.mjs
export const FORM_ACCESS_KEY = process.env.WEB3FORMS_KEY || 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';
```

To point leads at a different inbox, request a new key for that address at
web3forms.com and replace this value (or set `WEB3FORMS_KEY` in the Cloudflare
Pages build environment, which overrides it). `npm run build` prints a warning
while the placeholder is still in place, and `npm run audit` fails.

Each form sends:

| Field | Notes |
| --- | --- |
| `name`, `email` | Required. |
| `phone` | Optional. |
| `project_type` | Home form only. |
| `timeline` | Product forms only. |
| `message` | Required. |
| `interest` | Product forms only — hidden, carries the product name so leads are tagged. |
| `botcheck` | Honeypot. Web3Forms drops the submission if it is filled. |

Submission is progressive: without JavaScript the browser posts straight to
Web3Forms and the `redirect` field lands the visitor on `/thanks.html`. With
JavaScript, `main.js` intercepts, posts in the background, and shows an inline
success message.

## Deploying to Cloudflare Pages

Connected to Git, so every push to `main` publishes.

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `WEB3FORMS_KEY` (optional; overrides the value in `src/site.mjs`) |

Once a real domain is attached, set `SITE_ORIGIN` (or edit `ORIGIN` in
`src/site.mjs`) so canonical URLs, Open Graph tags, and `sitemap.xml` point at
the live hostname instead of the `.pages.dev` subdomain.

## Known gaps

- **Manufacturer logos.** The brand marquee uses styled wordmark tiles. Swap in
  real SVG/PNG logos when they arrive.
- **Photo coverage.** The client's own photos are almost entirely pools. Hot
  tubs, grills, outdoor kitchens, and furniture currently lean on stock imagery
  carried over from the previous site — confirm those licences transferred, or
  replace them with the client's own work.
- **No hot tub photo.** The hot tubs page hero is a pool with a raised spa
  spillover, the closest match available.
- **Showroom photo.** The "Visit Us" block uses a project photo. A real
  storefront shot would serve that section better.
