# CareyHarwoods.com

The website for **Carey Harwoods, LLC** — Fiber, Laser, and 3D Printing (and honey!)
in Summerville, SC.

Built with [Eleventy](https://www.11ty.dev/) as a fully static site and deployed to
**GitHub Pages** automatically on every push to `main`.

**Just want to write a blog post or add an event?** See [AUTHORING.md](AUTHORING.md) —
no coding required.

## Quick start (local preview)

```
npm install
npm start
```

Then open <http://localhost:8080>. The preview live-reloads as you edit.
`npm run build` writes the production site to `_site/`.

## How the site is organized

```
src/
├── _data/
│   ├── site.json        ← site name, tagline, nav links, social URLs
│   └── patreons.json    ← the creator list shown on /patreon/
├── _includes/layouts/   ← page templates (base, page, post)
├── assets/              ← CSS, JS, logo images
├── posts/               ← blog posts (one Markdown file each)
├── events/              ← calendar events (one Markdown file each)
├── about/index.md       ← the About Us page
├── patreon/index.njk    ← Patreon creators page (reads patreons.json)
├── blog/index.njk       ← blog listing
├── calendar/index.njk   ← calendar page (month grid + event list)
└── index.njk            ← homepage
```

## One-time GitHub Pages setup

1. Create a GitHub repository (e.g. `careyharwoods.com`) and push this folder to it:

   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/careyharwoods.com.git
   git push -u origin main
   ```

2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes the
   site on every push to `main`. That's the whole pipeline.

### Custom domain (careyharwoods.com)

The `src/CNAME` file is set to `www.careyharwoods.com`. To point the domain here:

1. In **Settings → Pages → Custom domain**, enter `www.careyharwoods.com` and enable
   **Enforce HTTPS** once the certificate is issued.
2. At your DNS provider, add a `CNAME` record: `www` → `<your-username>.github.io`.
3. (Optional) Add `A`/`ALIAS` records for the apex `careyharwoods.com` pointing to
   GitHub Pages' IPs (185.199.108.153, .109., .110., .111.) so the bare domain works too.
4. Keep the Shopify store's DNS untouched until you're ready to cut over.

> **Note:** until the custom domain is active, the site works fine at
> `https://<your-username>.github.io/<repo>/` — the build automatically handles the
> subpath via the `PATH_PREFIX` environment variable if you set it in the workflow
> (e.g. `PATH_PREFIX: /careyharwoods.com/` on the build step). Once the custom domain
> is live, remove that variable.

## Things to double-check before launch

- [ ] **Patreon links** — `src/_data/patreons.json` has `url: null` for creators whose
      page URLs I couldn't verify. Fill in the real Patreon/Cults3D/MyMiniFactory links.
- [ ] **Seed events** — the events in `src/events/` (Third Thursdays, Sweet Tea Festival)
      have plausible but unverified dates. Confirm and edit before launch.
- [ ] **CNAME** — delete `src/CNAME` if you're not using the custom domain yet.
- [ ] **Old Shopify store** — this site doesn't include a store. If you keep selling on
      Shopify, add a "Shop" link to the `nav` array in `src/_data/site.json` pointing at
      the Shopify storefront URL.
