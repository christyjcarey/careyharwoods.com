# Writing for CareyHarwoods.com

How to add blog posts and calendar events. No coding needed — every post and event is
just a small text file. You can create them **right in the GitHub website** or on your
computer.

## Add a blog post

Create a new file in `src/posts/` named like `2026-09-01-my-post-title.md`
(the date prefix keeps things tidy; the URL comes from the filename).

Paste this at the top, then write your post below it in plain text or
[Markdown](https://www.markdownguide.org/basic-syntax/):

```markdown
---
title: "September Events"
date: 2026-09-01
author: Christy Carey
---
Hi everybody! Here's what's coming up in September...

- **Bold text** looks like this
- [A link](https://example.com) looks like this
```

That's it. When the file lands on the `main` branch, the site rebuilds and the post
appears on the blog and the homepage automatically (takes about a minute).

## Add a calendar event

Create a file in `src/events/` named like `2026-10-15-third-thursday.md`:

```markdown
---
title: Summerville Third Thursday
date: 2026-10-15
time: 5:00–8:30 PM
location: Downtown Summerville
status: confirmed
---
One optional sentence describing the event.
```

- `date` is the event date (`YYYY-MM-DD`). Add `endDate:` too for multi-day festivals.
- `status: confirmed` shows a green "Confirmed" badge; `status: tentative` shows
  an amber "Date TBC" badge.
- The event automatically appears on the calendar month grid, the Upcoming list, and
  the homepage. Past events move themselves to the "Past events" section — you never
  need to delete old ones.

## Three ways to work

### 1. GitHub website (easiest — works from any browser)

1. Go to the repo on github.com and open `src/posts/` (or `src/events/`).
2. Click **Add file → Create new file**, name it, paste the template, write, and
   use the **Preview** tab to check your Markdown.
3. Click **Commit changes** directly to `main`. The site publishes itself in ~1 minute
   (watch the **Actions** tab for the green check).

### 2. Draft first, publish later

Add `draft: true` to the top section of a post. Drafts show up in the local preview
(`npm start`) but are **left out of the published site**. Remove the line when you're
ready to publish.

### 3. Local preview (see the real site before publishing)

If Node.js is installed on your computer:

```
npm install        (first time only)
npm start
```

Open <http://localhost:8080> — it shows the full site, including drafts, and refreshes
live as you type. When you're happy, commit and push (or use GitHub Desktop's
"Commit" + "Push" buttons).

## Editing other pages

| What                         | File                        |
| ---------------------------- | --------------------------- |
| About Us text                | `src/about/index.md`        |
| Patreon creator list         | `src/_data/patreons.json`   |
| Navigation, tagline, socials | `src/_data/site.json`       |
| Homepage sections            | `src/index.njk`             |
