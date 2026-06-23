# SEO + Feature Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Add SEO foundation, programmatic timezone-pair pages, Meeting Planner tab, globe performance fixes, content accuracy corrections, and a validation harness to the timetz Astro app.

**Architecture:** Pure static Astro build — all new pages use `getStaticPaths` for zero-runtime cost. The Meeting Planner is a new React component added as a third tab inside the existing `TimeConverter.tsx`. Globe performance is handled via `IntersectionObserver`, `matchMedia`, and `React.lazy`.

**Tech Stack:** Astro 7, React 19, Luxon, Tailwind v4, Vitest, @astrojs/sitemap, @astrojs/check, TypeScript.

**Subsystem Coordination:** None — single repo.

---

## Task 1: SEO foundation — astro.config.mjs + sitemap

**Files:**
- Modify: `astro.config.mjs`
- Create: `public/robots.txt`

**Step 1: Install @astrojs/sitemap**

```bash
cd /Users/satiwar2/Documents/freeworldtimeconverter.com/freeworldtimeconverter.com
npm install @astrojs/sitemap
```

Expected: package added to dependencies, no errors.

**Step 2: Update astro.config.mjs**

Replace the entire file contents with:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://timetz.com',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Step 3: Create public/robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://timetz.com/sitemap-index.xml
```

**Step 4: Verify build generates sitemap**

```bash
npm run build 2>&1 | tail -20
ls dist/sitemap*.xml
```

Expected: `dist/sitemap-index.xml` and `dist/sitemap-0.xml` present.

**Step 5: Commit**

```bash
git add astro.config.mjs public/robots.txt package.json package-lock.json
git commit -m "feat(seo): add canonical site URL, sitemap integration, robots.txt"
```

---

## Task 2: SEO foundation — extend Layout.astro

**Files:**
- Modify: `src/layouts/Layout.astro`

**Step 1: Replace Layout.astro with the extended version**

The new Layout accepts `canonicalPath`, `ogImage`, and `jsonLd` props in addition to `title` and `description`. It emits canonical, OG, Twitter, theme-color, and JSON-LD tags.

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  jsonLd?: object;
}

const {
  title = 'timetz — The fastest time zone converter',
  description = 'Convert time zones instantly with natural language. No login required.',
  canonicalPath = '',
  ogImage = '/og-default.png',
  jsonLd,
} = Astro.props;

const canonicalUrl = new URL(canonicalPath, Astro.site ?? 'https://timetz.com').toString();
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href={canonicalUrl} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="generator" content={Astro.generator} />
    <meta name="description" content={description} />
    <meta name="theme-color" content="#0f1117" media="(prefers-color-scheme: dark)" />
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(ogImage, Astro.site ?? 'https://timetz.com').toString()} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(ogImage, Astro.site ?? 'https://timetz.com').toString()} />

    {jsonLd && (
      <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
    )}

    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Step 2: Update index.astro to pass canonicalPath**

In `src/pages/index.astro`, change the `<Layout>` opening tag to:

```astro
<Layout
  title="timetz — Convert time zones instantly"
  description="The fastest time zone converter. Type '4pm Mumbai to London' and get the answer instantly."
  canonicalPath="/"
>
```

**Step 3: Update privacy.astro to pass canonicalPath**

Find the `<Layout` tag in `src/pages/privacy.astro` and add `canonicalPath="/privacy"` and unique title/description. The exact existing tag will vary; add the prop alongside existing ones.

**Step 4: Update terms.astro to pass canonicalPath**

Same as above for `src/pages/terms.astro` — add `canonicalPath="/terms"`.

**Step 5: Verify build**

```bash
npm run build 2>&1 | grep -E "error|warn|✓"
```

Expected: build succeeds, no errors.

**Step 6: Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro src/pages/privacy.astro src/pages/terms.astro
git commit -m "feat(seo): extend Layout with canonical, OG, Twitter, theme-color, JSON-LD"
```

---

## Task 3: Programmatic SEO pages

**Files:**
- Create: `src/pages/[slug].astro`

**Step 1: Create the dynamic route file**

`src/pages/[slug].astro` — full file:

```astro
---
import Layout from '../layouts/Layout.astro';
import TimeConverter from '../components/TimeConverter';
import Footer from '../components/Footer.astro';

export function getStaticPaths() {
  return [
    {
      params: { slug: 'ist-to-est' },
      props: {
        sourceCity: 'Mumbai',
        targetCities: ['New York'],
        h1: 'IST to EST Time Converter',
        intro: 'Convert India Standard Time (IST, UTC+5:30) to Eastern Standard Time (EST, UTC−5). Mumbai is 10 hours 30 minutes ahead of New York in winter; 9 hours 30 minutes during US Daylight Saving Time.',
        title: 'IST to EST Converter — India to US Eastern Time | timetz',
        description: 'Instantly convert IST to EST. See what time it is in New York when it\'s any given time in India. Handles DST automatically.',
        faq: [
          { q: 'How many hours ahead is IST compared to EST?', a: 'IST (UTC+5:30) is 10 hours 30 minutes ahead of EST (UTC−5) in winter and 9 hours 30 minutes ahead of EDT (UTC−4) during US Daylight Saving Time (March–November).' },
          { q: 'What is 9 AM IST in EST?', a: '9:00 AM IST is 10:30 PM EST the previous day (or 11:30 PM EDT during US summer).' },
          { q: 'What is 5 PM IST in EST?', a: '5:00 PM IST is 6:30 AM EST the same morning (7:30 AM EDT in summer).' },
          { q: 'Does India observe Daylight Saving Time?', a: 'No. India does not observe DST. IST is always UTC+5:30 year-round, so the offset to US Eastern Time changes twice a year when the US switches clocks.' },
          { q: 'What is the best overlap time for India–US East Coast meetings?', a: 'The best overlap is typically 8:00–9:00 AM EST / 6:30–7:30 PM IST — both cities are in standard business hours only at that window.' },
        ],
        related: [
          { href: '/pst-to-ist', label: 'PST to IST' },
          { href: '/utc-to-ist', label: 'UTC to IST' },
          { href: '/india-to-usa-time', label: 'India to USA time' },
        ],
      },
    },
    {
      params: { slug: 'pst-to-ist' },
      props: {
        sourceCity: 'Los Angeles',
        targetCities: ['Mumbai'],
        h1: 'PST to IST Time Converter',
        intro: 'Convert Pacific Standard Time (PST, UTC−8) to India Standard Time (IST, UTC+5:30). Los Angeles is 13 hours 30 minutes behind Mumbai in winter; 12 hours 30 minutes during US Daylight Saving Time.',
        title: 'PST to IST Converter — US Pacific to India Time | timetz',
        description: 'Convert PST to IST instantly. See the current time in India from any US West Coast time. Handles PDT/PST automatically.',
        faq: [
          { q: 'How many hours behind is PST compared to IST?', a: 'PST (UTC−8) is 13 hours 30 minutes behind IST (UTC+5:30). During PDT (UTC−7), the gap narrows to 12 hours 30 minutes.' },
          { q: 'What is 9 AM PST in IST?', a: '9:00 AM PST is 10:30 PM IST the same day.' },
          { q: 'What is midnight PST in IST?', a: 'Midnight (12:00 AM) PST is 1:30 PM IST the same day.' },
          { q: 'What is 6 PM IST in PST?', a: '6:00 PM IST is 4:30 AM PST the same day.' },
          { q: 'When do India and US West Coast teams have overlap?', a: 'The practical overlap window is 8:30–10:00 AM IST / 7:00–8:30 PM PST (previous evening in LA). Early morning IST / late evening PST is the only true working-hours overlap.' },
        ],
        related: [
          { href: '/ist-to-est', label: 'IST to EST' },
          { href: '/india-to-usa-time', label: 'India to USA time' },
          { href: '/new-york-to-london', label: 'New York to London' },
        ],
      },
    },
    {
      params: { slug: 'utc-to-ist' },
      props: {
        sourceCity: 'UTC',
        targetCities: ['Mumbai'],
        h1: 'UTC to IST Time Converter',
        intro: 'Convert Coordinated Universal Time (UTC) to India Standard Time (IST, UTC+5:30). IST is always 5 hours and 30 minutes ahead of UTC with no Daylight Saving adjustment.',
        title: 'UTC to IST Converter — Convert UTC to India Time | timetz',
        description: 'Convert UTC to IST instantly. India Standard Time is UTC+5:30 with no DST. Enter any UTC timestamp to get the IST equivalent.',
        faq: [
          { q: 'What is UTC+5:30?', a: 'UTC+5:30 is India Standard Time (IST). It applies to all of India year-round — India does not observe Daylight Saving Time.' },
          { q: 'What is 00:00 UTC in IST?', a: 'Midnight UTC (00:00) is 05:30 IST the same day.' },
          { q: 'What is 12:00 UTC in IST?', a: '12:00 UTC (noon) is 17:30 IST (5:30 PM).' },
          { q: 'How do I convert a Unix timestamp to IST?', a: 'Use the Epoch tab on timetz — paste any Unix timestamp in seconds or milliseconds and it converts to all time zones including IST instantly.' },
          { q: 'Why is IST offset 30 minutes?', a: 'India chose UTC+5:30 as a compromise between its eastern and western extremes (spanning roughly UTC+5 to UTC+6), and the 30-minute offset has been maintained since 1906.' },
        ],
        related: [
          { href: '/ist-to-est', label: 'IST to EST' },
          { href: '/pst-to-ist', label: 'PST to IST' },
          { href: '/india-to-usa-time', label: 'India to USA time' },
        ],
      },
    },
    {
      params: { slug: 'new-york-to-london' },
      props: {
        sourceCity: 'New York',
        targetCities: ['London'],
        h1: 'New York to London Time Converter',
        intro: 'Convert Eastern Time (ET) to Greenwich Mean Time or British Summer Time. New York is typically 5 hours behind London, but the gap changes to 4 hours briefly each spring and autumn when the US and UK switch clocks on different dates.',
        title: 'New York to London Time Converter — ET to GMT/BST | timetz',
        description: 'Convert New York time to London time. Handles the EST/EDT and GMT/BST transitions automatically so you always get the right offset.',
        faq: [
          { q: 'How many hours ahead is London compared to New York?', a: 'London is usually 5 hours ahead of New York (EST vs GMT) or 5 hours ahead during summer (EDT vs BST). For a brief window each spring and autumn the gap is 4 hours.' },
          { q: 'What is 9 AM New York time in London?', a: '9:00 AM EST is 2:00 PM GMT. During summer (EDT/BST) it is still 2:00 PM BST because both cities are on their summer offsets.' },
          { q: 'What is noon London time in New York?', a: '12:00 PM GMT is 7:00 AM EST. 12:00 PM BST is 7:00 AM EDT in summer.' },
          { q: 'When do UK and US clocks change?', a: 'The US switches on the second Sunday of March and first Sunday of November. The UK switches on the last Sunday of March and October. The brief gap between these dates creates a 4-hour difference.' },
          { q: 'What is the best meeting time for New York and London?', a: '2:00–5:00 PM London (9:00 AM–12:00 PM New York) is the cleanest overlap — both cities are in core business hours.' },
        ],
        related: [
          { href: '/london-to-mumbai', label: 'London to Mumbai' },
          { href: '/ist-to-est', label: 'IST to EST' },
          { href: '/india-to-usa-time', label: 'India to USA time' },
        ],
      },
    },
    {
      params: { slug: 'london-to-mumbai' },
      props: {
        sourceCity: 'London',
        targetCities: ['Mumbai'],
        h1: 'London to Mumbai Time Converter',
        intro: 'Convert GMT or BST to India Standard Time (IST, UTC+5:30). Mumbai is 5 hours 30 minutes ahead of London in winter (GMT) and 4 hours 30 minutes ahead in summer (BST).',
        title: 'London to Mumbai Time Converter — GMT/BST to IST | timetz',
        description: 'Convert London time to Mumbai (IST) instantly. Handles GMT and BST automatically. Mumbai is 4.5–5.5 hours ahead of London.',
        faq: [
          { q: 'How many hours ahead is Mumbai compared to London?', a: 'Mumbai (IST, UTC+5:30) is 5 hours 30 minutes ahead of London (GMT, UTC+0) in winter and 4 hours 30 minutes ahead during UK Summer Time (BST, UTC+1).' },
          { q: 'What is 9 AM London time in Mumbai?', a: '9:00 AM GMT is 2:30 PM IST. 9:00 AM BST (summer) is 1:30 PM IST.' },
          { q: 'What is 5 PM IST in London?', a: '5:00 PM IST is 11:30 AM GMT (winter) or 12:30 PM BST (summer).' },
          { q: 'When is the best time for a London–Mumbai call?', a: '1:00–3:00 PM IST (7:30–9:30 AM GMT) works well — London is just starting the day and Mumbai is in mid-afternoon.' },
          { q: 'Does the UK have a half-hour offset with India?', a: 'Yes — IST is UTC+5:30, giving it a 30-minute fractional offset relative to most European zones. This is why India–UK time differences end in ":30".' },
        ],
        related: [
          { href: '/new-york-to-london', label: 'New York to London' },
          { href: '/ist-to-est', label: 'IST to EST' },
          { href: '/pst-to-ist', label: 'PST to IST' },
        ],
      },
    },
    {
      params: { slug: 'india-to-usa-time' },
      props: {
        sourceCity: 'Mumbai',
        targetCities: ['New York', 'Chicago', 'Los Angeles'],
        h1: 'India to USA Time Converter',
        intro: 'Convert India Standard Time (IST, UTC+5:30) to all US time zones simultaneously — Eastern, Central, Mountain, and Pacific. The US spans four main time zones; all are 9.5–14.5 hours behind IST depending on DST.',
        title: 'India to USA Time Converter — IST to EST, CST, MST, PST | timetz',
        description: 'Convert India time (IST) to US Eastern, Central, and Pacific time at once. Useful for scheduling calls across India and the United States.',
        faq: [
          { q: 'What are the time differences between India and US time zones?', a: 'IST (UTC+5:30) vs EST (UTC−5): 10h 30m. IST vs CST (UTC−6): 11h 30m. IST vs MST (UTC−7): 12h 30m. IST vs PST (UTC−8): 13h 30m. All gaps shrink by 1 hour during US Daylight Saving Time (March–November).' },
          { q: 'What is 10 AM IST in US time zones?', a: '10:00 AM IST = 11:30 PM EST previous night = 10:30 PM CST previous night = 9:30 PM MST previous night = 8:30 PM PST previous night.' },
          { q: 'What is the best time to schedule an India–USA call?', a: 'The best overlap is 8:00–9:00 AM EST / 6:30–7:30 PM IST — US East Coast is starting its day while India is finishing theirs. For US West Coast, try 8:30 PM IST / 7:00 AM PST.' },
          { q: 'How do I convert IST to EDT vs EST?', a: 'EDT (Eastern Daylight Time, UTC−4) is used from March to November; EST (UTC−5) the rest of the year. The timetz converter detects DST automatically — just pick a date and the correct offset is shown.' },
          { q: 'Does India have multiple time zones?', a: 'No. All of India uses a single time zone, IST (UTC+5:30), across its entire territory. This is unusual for a country of India\'s geographic size.' },
        ],
        related: [
          { href: '/ist-to-est', label: 'IST to EST' },
          { href: '/pst-to-ist', label: 'PST to IST' },
          { href: '/utc-to-ist', label: 'UTC to IST' },
        ],
      },
    },
  ];
}

const { sourceCity, targetCities, h1, intro, title, description, faq, related } = Astro.props;

const allCities = [sourceCity, ...targetCities].join(',');
const converterUrl = `/?cities=${encodeURIComponent(allCities)}`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: h1,
  description,
  url: Astro.url.toString(),
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
};
---

<Layout {title} {description} canonicalPath={`/${Astro.params.slug}`} {jsonLd}>
  <header class="app-header">
    <div class="app-header-inner">
      <a href="/" class="app-logo-link">
        <img src="/favicon-96x96.png" alt="timetz logo" class="app-logo-img" />
        <span class="app-logo-text">timetz</span>
      </a>
      <span class="app-tagline">Convert any timezone instantly</span>
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme" title="Toggle light/dark">
        <span class="theme-icon-dark">🌙</span>
        <span class="theme-icon-light">☀️</span>
      </button>
    </div>
  </header>

  <main>
    <div class="slug-hero">
      <h1 class="slug-h1">{h1}</h1>
      <p class="slug-intro">{intro}</p>
    </div>

    <TimeConverter client:load defaultCities={allCities} />

    <section class="slug-faq">
      <h2>Frequently Asked Questions</h2>
      {faq.map(({ q, a }) => (
        <div class="faq-item">
          <h3>{q}</h3>
          <p>{a}</p>
        </div>
      ))}
    </section>

    <nav class="slug-related">
      <span>Related converters:</span>
      {related.map(({ href, label }) => (
        <a href={href}>{label}</a>
      ))}
    </nav>
  </main>

  <Footer />
</Layout>

<style>
  .slug-hero {
    max-width: 800px;
    margin: 40px auto 0;
    padding: 0 24px;
  }
  .slug-h1 {
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 700;
    margin: 0 0 12px;
    color: var(--color-text-primary);
  }
  .slug-intro {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
    margin: 0 0 32px;
  }
  .slug-faq {
    max-width: 800px;
    margin: 48px auto 0;
    padding: 0 24px;
  }
  .slug-faq h2 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 24px;
    color: var(--color-text-primary);
  }
  .faq-item {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--color-hairline);
  }
  .faq-item:last-child { border-bottom: none; }
  .faq-item h3 {
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 8px;
    color: var(--color-text-primary);
  }
  .faq-item p {
    font-size: 0.9rem;
    line-height: 1.65;
    color: var(--color-text-secondary);
    margin: 0;
  }
  .slug-related {
    max-width: 800px;
    margin: 40px auto 60px;
    padding: 0 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    font-size: 0.85rem;
    color: var(--color-text-secondary);
  }
  .slug-related a {
    padding: 6px 14px;
    border: 1px solid var(--color-hairline);
    border-radius: 20px;
    color: var(--color-text-primary);
    text-decoration: none;
    transition: background 0.15s;
  }
  .slug-related a:hover { background: var(--color-canvas-soft); }
</style>

<script is:inline>
  (function () {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));
    document.addEventListener('DOMContentLoaded', function () {
      const btn = document.getElementById('theme-toggle');
      if (!btn) return;
      btn.addEventListener('click', function () {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      });
    });
  })();
</script>
```

**Step 2: Add `defaultCities` prop to TimeConverter**

The slug pages pass `defaultCities` as a string to `TimeConverter`. The existing URL hydration already reads `?cities=` — the simplest approach is to pass `defaultCities` as a prop and use it as a fallback when no `?cities=` URL param exists.

In `src/components/TimeConverter.tsx`, add `defaultCities?: string` to the component props:

```tsx
export default function TimeConverter({ defaultCities }: { defaultCities?: string } = {}) {
```

Then in the URL hydration `useEffect` (currently around line 147), after the `?cities=` check, add a fallback:

```tsx
useEffect(() => {
  const p = new URLSearchParams(window.location.search);
  const cs = p.get('cities') ?? defaultCities ?? null;
  const t = p.get('t');
  if (cs) {
    const found = cs.split(',').map(n => CITIES.find(c => c.name === n)).filter(Boolean) as City[];
    if (found.length >= 1) { setSourceCity(found[0]); setTargetCities(found.slice(1)); }
  }
  if (t) {
    const dt = DateTime.fromISO(t);
    if (dt.isValid) { setSourceDt(dt); setLiveMode(false); }
  }
}, []);
```

Note: remove the `defaultCities` from the dependency array — it is a static prop, intentionally read only once on mount.

**Step 3: Build and verify all 6 routes exist**

```bash
npm run build 2>&1 | grep -E "error|Generating"
ls dist/ist-to-est/ dist/pst-to-ist/ dist/utc-to-ist/ dist/new-york-to-london/ dist/london-to-mumbai/ dist/india-to-usa-time/
```

Expected: 6 directories present, each with an `index.html`.

**Step 4: Commit**

```bash
git add src/pages/[slug].astro src/components/TimeConverter.tsx
git commit -m "feat(seo): add 6 programmatic timezone-pair pages with FAQ and internal links"
```

---

## Task 4: Meeting Planner tab

**Files:**
- Create: `src/components/MeetingPlanner.tsx`
- Modify: `src/components/TimeConverter.tsx`

**Step 1: Create MeetingPlanner.tsx**

Full file at `src/components/MeetingPlanner.tsx`:

```tsx
import { useState } from 'react';
import { DateTime } from 'luxon';
import { convertTime, STATUS_META, type TimeStatus } from '../lib/timeUtils';
import type { City } from '../lib/cities';

interface Props {
  sourceCity: City;
  targetCities: City[];
}

function pad2(n: number) { return String(n).padStart(2, '0'); }

function localDateToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function buildIcs(date: string, overlapHours: number[], cities: City[]): string {
  if (!overlapHours.length) return '';
  const hour = overlapHours[0];
  const [y, mo, d] = date.split('-').map(Number);
  const dtUTC = DateTime.utc(y, mo, d, hour);
  const dtEnd = dtUTC.plus({ hours: 1 });

  const fmt = (dt: DateTime) => dt.toFormat("yyyyMMdd'T'HHmmss'Z'");
  const cityList = cities.map(c => c.name).join(', ');
  const now = DateTime.utc();

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//timetz//timetz//EN',
    'BEGIN:VEVENT',
    `UID:${fmt(now)}-timetz@timetz.com`,
    `DTSTAMP:${fmt(now)}`,
    `DTSTART:${fmt(dtUTC)}`,
    `DTEND:${fmt(dtEnd)}`,
    `SUMMARY:Meeting (${cityList})`,
    `DESCRIPTION:Scheduled via timetz.com for ${cityList}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export default function MeetingPlanner({ sourceCity, targetCities }: Props) {
  const [date, setDate] = useState(localDateToday);
  const [workStart, setWorkStart] = useState(9);
  const [workEnd, setWorkEnd] = useState(17);
  const [copyDone, setCopyDone] = useState(false);

  const allCities = [sourceCity, ...targetCities];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // For each city and each hour, compute status
  function statusAt(city: City, hour: number): TimeStatus {
    const [y, mo, d] = date.split('-').map(Number);
    const sourceDt = DateTime.fromObject({ year: y, month: mo, day: d, hour: 0 }, { zone: city.timezone });
    const result = convertTime(city.timezone, city.timezone, city.name, city.country, sourceDt.set({ hour }));
    return result.status;
  }

  // Find overlap: hours where ALL cities are 'working' per user-configured window
  function isWorking(city: City, hour: number): boolean {
    const [y, mo, d] = date.split('-').map(Number);
    const baseDt = DateTime.fromObject({ year: y, month: mo, day: d, hour: workStart }, { zone: sourceCity.timezone });
    const cityDt = baseDt.setZone(city.timezone).set({ hour: baseDt.setZone(city.timezone).hour });
    // Compute local hour in this city for the given UTC moment
    const sourceMoment = DateTime.fromObject({ year: y, month: mo, day: d, hour }, { zone: sourceCity.timezone });
    const cityMoment = sourceMoment.setZone(city.timezone);
    const localHour = cityMoment.hour;
    void cityDt;
    return localHour >= workStart && localHour < workEnd;
  }

  const overlapHours = hours.filter(h => allCities.every(c => isWorking(c, h)));

  const copySummary = () => {
    const [y, mo, d] = date.split('-').map(Number);
    const dateStr = DateTime.fromObject({ year: y, month: mo, day: d }).toFormat('EEE, MMM d yyyy');
    const lines = [
      `Meeting time options for ${dateStr}`,
      '',
      ...allCities.map(city => {
        if (!overlapHours.length) return `${city.name}: no overlap`;
        const sourceMoment = DateTime.fromObject({ year: y, month: mo, day: d, hour: overlapHours[0] }, { zone: sourceCity.timezone });
        const cityMoment = sourceMoment.setZone(city.timezone);
        return `${city.name}: ${cityMoment.toFormat('h:mm a')} (${city.timezone.replace('_', ' ')})`;
      }),
      '',
      overlapHours.length
        ? `Best overlap: ${overlapHours[0]}:00–${overlapHours[overlapHours.length - 1] + 1}:00 ${sourceCity.timezone.split('/').pop()?.replace('_', ' ')} time`
        : 'No common working-hours overlap found.',
    ];
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2000);
    });
  };

  const downloadIcs = () => {
    const [y, mo, d] = date.split('-').map(Number);
    const sourceMoment = overlapHours.length
      ? DateTime.fromObject({ year: y, month: mo, day: d, hour: overlapHours[0] }, { zone: sourceCity.timezone })
      : DateTime.fromObject({ year: y, month: mo, day: d, hour: 10 }, { zone: sourceCity.timezone });
    const ics = buildIcs(date, [sourceMoment.toUTC().hour], allCities);
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'meeting.ics'; a.click();
    URL.revokeObjectURL(url);
  };

  const STATUS_CELL: Record<TimeStatus, string> = {
    working: '#22c55e',
    'early-morning': '#f97316',
    evening: '#a78bfa',
    sleeping: '#334155',
  };

  return (
    <div className="mp-wrap">
      <div className="mp-controls">
        <label className="mp-label">
          Date
          <input type="date" className="mp-input" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label className="mp-label">
          Work window
          <span className="mp-time-range">
            <input type="number" className="mp-num" min={0} max={23} value={workStart}
              onChange={e => setWorkStart(Number(e.target.value))} />
            <span>–</span>
            <input type="number" className="mp-num" min={1} max={24} value={workEnd}
              onChange={e => setWorkEnd(Number(e.target.value))} />
          </span>
        </label>
      </div>

      {overlapHours.length > 0 ? (
        <p className="mp-overlap-msg">
          Overlap: {overlapHours.length}h window starting {overlapHours[0]}:00 {sourceCity.timezone.split('/').pop()?.replace('_', ' ')} time
        </p>
      ) : (
        <p className="mp-no-overlap">No common working-hours overlap on this date.</p>
      )}

      <div className="mp-grid-wrap">
        <table className="mp-grid" aria-label="Meeting planner overlap grid">
          <thead>
            <tr>
              <th className="mp-city-th" scope="col">City</th>
              {hours.map(h => (
                <th key={h} className={`mp-hour-th ${overlapHours.includes(h) ? 'mp-overlap-col' : ''}`} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allCities.map(city => (
              <tr key={city.name + city.timezone}>
                <td className="mp-city-td">{city.name}</td>
                {hours.map(h => {
                  const [y, mo, d] = date.split('-').map(Number);
                  const sourceMoment = DateTime.fromObject({ year: y, month: mo, day: d, hour: h }, { zone: sourceCity.timezone });
                  const cityMoment = sourceMoment.setZone(city.timezone);
                  const localH = cityMoment.hour;
                  const status: TimeStatus = localH >= workStart && localH < workEnd ? 'working'
                    : localH >= 6 && localH < workStart ? 'early-morning'
                    : localH >= workEnd && localH < 23 ? 'evening'
                    : 'sleeping';
                  const isOverlap = overlapHours.includes(h);
                  return (
                    <td
                      key={h}
                      className={`mp-cell ${isOverlap ? 'mp-cell-overlap' : ''}`}
                      style={{ background: STATUS_CELL[status] + (isOverlap ? 'ff' : '55') }}
                      title={`${city.name} ${cityMoment.toFormat('HH:mm')} — ${STATUS_META[status].label}`}
                      aria-label={`${city.name} at ${h}:00 source time: ${cityMoment.toFormat('HH:mm')} ${STATUS_META[status].label}`}
                    >
                      {STATUS_META[status].emoji}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mp-actions">
        <button className="tc-pill-btn tc-pill-btn-icon" onClick={copySummary}>
          {copyDone ? '✓ Copied' : '📋 Copy summary'}
        </button>
        <button className="tc-pill-btn tc-pill-btn-icon" onClick={downloadIcs} disabled={!overlapHours.length}>
          📅 Download .ics
        </button>
      </div>
    </div>
  );
}
```

**Step 2: Add CSS for MeetingPlanner to global.css**

Append to `src/styles/global.css`:

```css
/* ── Meeting Planner ───────────────────────────────────────────────────────── */
.mp-wrap { padding: 16px 0; }
.mp-controls { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 12px; align-items: flex-end; }
.mp-label { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--color-text-secondary); font-weight: 500; }
.mp-input { background: var(--color-canvas-soft); border: 1px solid var(--color-hairline); border-radius: 6px; color: var(--color-text-primary); padding: 6px 10px; font-size: 13px; }
.mp-time-range { display: flex; align-items: center; gap: 6px; }
.mp-num { width: 52px; background: var(--color-canvas-soft); border: 1px solid var(--color-hairline); border-radius: 6px; color: var(--color-text-primary); padding: 6px 8px; font-size: 13px; text-align: center; }
.mp-overlap-msg { font-size: 13px; color: #4ade80; margin: 0 0 12px; font-weight: 500; }
.mp-no-overlap { font-size: 13px; color: var(--color-text-secondary); margin: 0 0 12px; }
.mp-grid-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid var(--color-hairline); }
.mp-grid { border-collapse: collapse; width: 100%; table-layout: fixed; }
.mp-city-th, .mp-city-td { min-width: 100px; padding: 6px 10px; text-align: left; font-size: 12px; font-weight: 600; white-space: nowrap; position: sticky; left: 0; background: var(--color-canvas); z-index: 1; border-right: 1px solid var(--color-hairline); }
.mp-hour-th { width: 32px; text-align: center; font-size: 10px; color: var(--color-text-secondary); padding: 4px 0; font-weight: 400; }
.mp-overlap-col { font-weight: 700; color: #4ade80; }
.mp-cell { width: 32px; height: 32px; text-align: center; font-size: 14px; cursor: default; transition: opacity 0.1s; }
.mp-cell-overlap { outline: 2px solid #4ade8066; outline-offset: -2px; }
.mp-actions { display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap; }
```

**Step 3: Wire up the Meeting tab in TimeConverter.tsx**

In `src/components/TimeConverter.tsx`:

1. Add import at top:
```tsx
import MeetingPlanner from './MeetingPlanner';
```

2. Add `'meeting'` to the `inputTab` state type:
```tsx
const [inputTab, setInputTab] = useState<'time' | 'epoch' | 'meeting'>('time');
```

3. Add the Meeting tab button alongside Time and Epoch in the tab bar:
```tsx
<button className={`tc-tab ${inputTab === 'meeting' ? 'tc-tab-active' : ''}`} onClick={() => setInputTab('meeting')}>Meeting</button>
```

4. Below the epoch input row block, add a conditional render for the meeting planner. The meeting planner replaces the control row area when active. Wrap the existing `tc-time-row` and `tc-epoch-row` conditionals so that when `inputTab === 'meeting'`, nothing renders in the control area:
```tsx
{inputTab === 'meeting' ? null : inputTab === 'time' ? (
  /* existing tc-time-row JSX */
) : (
  /* existing tc-epoch-row JSX */
)}
```

5. Below `</div>` that closes `tc-bar`, add:
```tsx
{inputTab === 'meeting' && (
  <MeetingPlanner sourceCity={sourceCity} targetCities={targetCities} />
)}
```

**Step 4: Build and verify no TS errors**

```bash
npm run build 2>&1 | grep -iE "error|type"
```

Expected: clean build.

**Step 5: Commit**

```bash
git add src/components/MeetingPlanner.tsx src/components/TimeConverter.tsx src/styles/global.css
git commit -m "feat(meeting): add Meeting Planner tab with 24h overlap grid, copy summary, ICS download"
```

---

## Task 5: Globe performance fixes

**Files:**
- Modify: `src/components/TimeConverter.tsx`
- Modify: `src/components/GlobeWidget.tsx`

**Step 1: Lazy-load GlobeWidget and skip on mobile in TimeConverter.tsx**

Replace the static import:
```tsx
import GlobeWidget from './GlobeWidget';
```

With a lazy import and mobile check:

```tsx
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
const GlobeWidget = lazy(() => import('./GlobeWidget'));
```

Add a state for whether globe should render (checked after mount):

```tsx
const [showGlobe, setShowGlobe] = useState(false);

useEffect(() => {
  if (!window.matchMedia('(max-width: 768px)').matches) {
    setShowGlobe(true);
  }
}, []);
```

Replace the globe sidebar JSX:
```tsx
{/* ── Globe sidebar ── */}
<div className="tc-globe-col">
  {showGlobe && (
    <Suspense fallback={null}>
      <GlobeWidget sourceCity={sourceCity} targetCities={targetCities} />
    </Suspense>
  )}
</div>
```

**Step 2: Add IntersectionObserver and reduced-motion pause in GlobeWidget.tsx**

In the `useEffect` that starts the animation (where `frame` and the `requestAnimationFrame` loop live), add:

After `s.raf = requestAnimationFrame(frame);` is first called, add IntersectionObserver logic:

```tsx
// Pause animation when offscreen
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      if (!stateRef.current.raf) s.raf = requestAnimationFrame(frame);
    } else {
      if (s.raf) { cancelAnimationFrame(s.raf); s.raf = 0; }
    }
  },
  { threshold: 0.1 }
);
observer.observe(canvas);
```

And before starting the RAF loop, check `prefers-reduced-motion`:

```tsx
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) {
  s.raf = requestAnimationFrame(frame);
}
```

In the cleanup `return` of the effect, add:
```tsx
observer.disconnect();
```

**Step 3: Remove unused chrono-node**

First confirm it is unused:
```bash
grep -r "chrono" /Users/satiwar2/Documents/freeworldtimeconverter.com/freeworldtimeconverter.com/src/
```

Expected: no results. Then remove:

```bash
npm uninstall chrono-node
```

**Step 4: Build and verify**

```bash
npm run build 2>&1 | grep -iE "error|warn"
```

**Step 5: Commit**

```bash
git add src/components/TimeConverter.tsx src/components/GlobeWidget.tsx package.json package-lock.json
git commit -m "perf: lazy-load globe desktop-only, pause when offscreen/reduced-motion, remove chrono-node"
```

---

## Task 6: Content accuracy fixes

**Files:**
- Modify: `src/components/Contact.astro`
- Modify: `src/pages/privacy.astro`

**Step 1: Fix contact form success message**

In `src/components/Contact.astro`, find the `msgbot-success` element (around line 60–62):

Old:
```html
<p class="msgbot-success" id="form-success" aria-live="polite">
  <svg ...>...</svg>
  Message sent! We'll get back to you shortly.
</p>
```

New text (keep the SVG, change only the text node):
```
Your email client is opening — send the message from there to reach us.
```

Also in the `setTimeout` callback around line 141, the `successEl.classList.add('visible')` line is fine. No other changes needed to the JS — the form correctly opens `mailto:` before showing success.

**Step 2: Fix privacy policy localStorage claim**

In `src/pages/privacy.astro`, find section 4 (around line 80–85):

Old text: `"...to remember your preferred theme (light/dark) and recently used city list."`

New text: `"...to remember your preferred theme (light/dark) only. No city selections or usage history are stored."`

**Step 3: Build and verify**

```bash
npm run build 2>&1 | grep -iE "error"
```

**Step 4: Commit**

```bash
git add src/components/Contact.astro src/pages/privacy.astro
git commit -m "fix: honest contact form success message; fix privacy policy localStorage claim"
```

---

## Task 7: Install validation tooling

**Files:**
- Modify: `package.json`

**Step 1: Install astro check dependencies**

```bash
npm install --save-dev @astrojs/check typescript
```

**Step 2: Install vitest**

```bash
npm install --save-dev vitest
```

**Step 3: Add scripts to package.json**

Add to the `"scripts"` object:
```json
"check": "astro check",
"test": "vitest run"
```

**Step 4: Add vitest config to astro.config.mjs** (or create vitest.config.ts)

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

**Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add astro check and vitest validation tooling"
```

---

## Task 8: Write focused unit tests

**Files:**
- Create: `src/lib/__tests__/timeUtils.test.ts`
- Create: `src/lib/__tests__/nlp.test.ts`

**Step 1: Create timeUtils tests**

`src/lib/__tests__/timeUtils.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { DateTime } from 'luxon';
import { convertTime, parseEpoch, shareUrl, getTimeStatus } from '../timeUtils';

describe('getTimeStatus', () => {
  it('returns working for 9am', () => {
    const dt = DateTime.fromObject({ hour: 9 }, { zone: 'UTC' });
    expect(getTimeStatus(dt)).toBe('working');
  });
  it('returns working for 17:59', () => {
    const dt = DateTime.fromObject({ hour: 17, minute: 59 }, { zone: 'UTC' });
    expect(getTimeStatus(dt)).toBe('working');
  });
  it('returns early-morning for 7am', () => {
    const dt = DateTime.fromObject({ hour: 7 }, { zone: 'UTC' });
    expect(getTimeStatus(dt)).toBe('early-morning');
  });
  it('returns evening for 8pm', () => {
    const dt = DateTime.fromObject({ hour: 20 }, { zone: 'UTC' });
    expect(getTimeStatus(dt)).toBe('evening');
  });
  it('returns sleeping for midnight', () => {
    const dt = DateTime.fromObject({ hour: 0 }, { zone: 'UTC' });
    expect(getTimeStatus(dt)).toBe('sleeping');
  });
});

describe('convertTime', () => {
  it('same timezone has zero offset', () => {
    const dt = DateTime.fromObject({ year: 2024, month: 6, day: 1, hour: 12 }, { zone: 'America/New_York' });
    const result = convertTime('America/New_York', 'America/New_York', 'New York', 'USA', dt);
    expect(result.offsetMinutes).toBe(0);
    expect(result.dayDiff).toBe(0);
  });

  it('New York to London: London is 5h ahead (EST)', () => {
    // January = EST (UTC-5), London = GMT (UTC+0) => +5h
    const dt = DateTime.fromObject({ year: 2024, month: 1, day: 15, hour: 10 }, { zone: 'America/New_York' });
    const result = convertTime('America/New_York', 'Europe/London', 'London', 'UK', dt);
    expect(result.offsetMinutes).toBe(5 * 60);
    expect(result.dt.hour).toBe(15);
  });

  it('Mumbai to New York: IST is 10.5h ahead of EST', () => {
    // January: IST UTC+5:30, EST UTC-5 => diff = -10.5h (NY is behind Mumbai)
    const dt = DateTime.fromObject({ year: 2024, month: 1, day: 15, hour: 12 }, { zone: 'Asia/Kolkata' });
    const result = convertTime('Asia/Kolkata', 'America/New_York', 'New York', 'USA', dt);
    expect(result.offsetMinutes).toBe(-(10 * 60 + 30));
  });

  it('reports +1 dayDiff when conversion crosses midnight forward', () => {
    // 10pm New York EST => 3am London next day
    const dt = DateTime.fromObject({ year: 2024, month: 1, day: 15, hour: 22 }, { zone: 'America/New_York' });
    const result = convertTime('America/New_York', 'Europe/London', 'London', 'UK', dt);
    expect(result.dayDiff).toBe(1);
  });
});

describe('parseEpoch', () => {
  it('parses Unix seconds', () => {
    const dt = parseEpoch('1700000000');
    expect(dt).not.toBeNull();
    expect(dt!.toMillis()).toBe(1700000000 * 1000);
  });

  it('parses milliseconds when > 1e12', () => {
    const dt = parseEpoch('1700000000000');
    expect(dt).not.toBeNull();
    expect(dt!.toMillis()).toBe(1700000000000);
  });

  it('returns null for non-numeric input', () => {
    expect(parseEpoch('not-a-number')).toBeNull();
    expect(parseEpoch('')).toBeNull();
  });

  it('returns null for NaN', () => {
    expect(parseEpoch('abc')).toBeNull();
  });
});

describe('shareUrl', () => {
  it('contains cities and time params', () => {
    // shareUrl uses window.location.origin — mock it
    Object.defineProperty(window, 'location', {
      value: { origin: 'https://timetz.com' },
      writable: true,
    });
    const url = shareUrl(['New York', 'London'], '2024-01-15T10:00:00.000-05:00');
    expect(url).toContain('cities=New+York%2CLondon');
    expect(url).toContain('t=');
    expect(url.startsWith('https://timetz.com')).toBe(true);
  });
});
```

**Step 2: Create nlp tests**

`src/lib/__tests__/nlp.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { parseQuery } from '../nlp';

describe('parseQuery', () => {
  it('extracts city and time from "4pm Mumbai to London"', () => {
    const result = parseQuery('4pm Mumbai to London');
    expect(result.sourceCity?.name).toBe('Mumbai');
    expect(result.targetCities[0]?.name).toBe('London');
    expect(result.time?.hour).toBe(16);
    expect(result.time?.minute).toBe(0);
  });

  it('handles 12-hour format with minutes "9:30am NY"', () => {
    const result = parseQuery('9:30am NY');
    expect(result.sourceCity?.name).toBe('New York');
    expect(result.time?.hour).toBe(9);
    expect(result.time?.minute).toBe(30);
  });

  it('handles 24-hour format "1400 Tokyo"', () => {
    const result = parseQuery('1400hrs Tokyo');
    expect(result.sourceCity?.name).toBe('Tokyo');
    expect(result.time?.hour).toBe(14);
  });

  it('returns null sourceCity and time for empty input', () => {
    const result = parseQuery('');
    expect(result.sourceCity).toBeNull();
    expect(result.time).toBeNull();
    expect(result.targetCities).toHaveLength(0);
  });

  it('handles multi-city "London to Dubai to Singapore"', () => {
    const result = parseQuery('London to Dubai to Singapore');
    expect(result.sourceCity?.name).toBe('London');
    expect(result.targetCities.map(c => c.name)).toContain('Dubai');
    expect(result.targetCities.map(c => c.name)).toContain('Singapore');
  });

  it('handles "tomorrow 9am NY" — sets dateOffset +1', () => {
    const result = parseQuery('tomorrow 9am NY');
    expect(result.time?.hour).toBe(9);
    expect(result.sourceCity?.name).toBe('New York');
    // tomorrow: the day should be 1 ahead of today
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(result.time?.day).toBe(tomorrow.getDate());
  });
});
```

**Step 3: Run tests**

```bash
npm test
```

Expected: all tests pass. Fix any test that fails due to implementation quirks (e.g., the `shareUrl` test needs `window` — vitest with `environment: 'node'` won't have it; switch to `jsdom` if needed: change `environment: 'node'` to `environment: 'jsdom'` in `vitest.config.ts`).

**Step 4: Commit**

```bash
git add src/lib/__tests__/ vitest.config.ts
git commit -m "test: add unit tests for convertTime, parseEpoch, shareUrl, parseQuery"
```

---

## Task 9: Run astro check and final build verification

**Step 1: Run type check**

```bash
npm run check 2>&1
```

Fix any reported type errors before proceeding.

**Step 2: Run tests**

```bash
npm test
```

Expected: all pass.

**Step 3: Full production build**

```bash
npm run build 2>&1
```

Expected: clean build, no errors, 8+ routes generated (/, /privacy, /terms, /ist-to-est, /pst-to-ist, /utc-to-ist, /new-york-to-london, /london-to-mumbai, /india-to-usa-time).

**Step 4: Verify sitemap includes all routes**

```bash
cat dist/sitemap-0.xml | grep "<loc>"
```

Expected: all 9 URLs listed.

**Step 5: Final commit if any fixes were needed**

```bash
git add -p
git commit -m "fix: address astro check type errors"
```

---

## Verification Criteria

End-to-end checks after all tasks complete:

1. `npm run build` exits 0 with no errors
2. `npm test` — all tests green
3. `npm run check` — no type errors
4. `dist/sitemap-0.xml` lists all 9 routes
5. `dist/ist-to-est/index.html` contains `<h1>IST to EST Time Converter</h1>` and 5 FAQ items
6. `dist/index.html` contains `<link rel="canonical"` and `og:title` meta tags
7. `public/robots.txt` references the sitemap URL
8. Globe does not mount on mobile (verified by: `grep -c "GlobeWidget"` in built JS is 0 when page is loaded with mobile UA — or manual inspection)
9. Contact form says "Your email client is opening" not "Message sent"
10. Privacy policy section 4 no longer mentions "recently used city list"
