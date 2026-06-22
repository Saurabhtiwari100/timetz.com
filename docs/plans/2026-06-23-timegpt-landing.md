# TimeGPT Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Build a polished Vercel-style marketing landing page for TimeGPT in Astro 7 with Tailwind CSS v4.

**Architecture:** Single `index.astro` page with 8 scroll-driven sections, each as its own Astro component. All design tokens from `DESIGN.md` mapped to CSS custom properties in a global stylesheet. Zero client-side JS frameworks — pure HTML/CSS Astro components.

**Tech Stack:** Astro 7, Tailwind CSS v4 (`@tailwindcss/vite`), `@fontsource-variable/geist`, `@fontsource-variable/geist-mono`, CSS custom properties.

**Subsystem Coordination:** None — single repo.

---

## Cross-Repo Dependencies
None.

---

## Task 1: Install Tailwind CSS v4 and Geist fonts

**Files:**
- Modify: `astro.config.mjs`
- Modify: `package.json` (via npm install)

**Step 1: Install packages**

```bash
cd /Users/satiwar2/Documents/freeworldtimeconverter.com/freeworldtimeconverter.com
npm install @tailwindcss/vite tailwindcss @fontsource-variable/geist @fontsource-variable/geist-mono
```

Expected: packages added to `node_modules`, `package-lock.json` updated.

**Step 2: Wire Tailwind into astro.config.mjs**

Replace `astro.config.mjs` entirely:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts on `http://localhost:4321` with no errors.

**Step 4: Commit**

```bash
git add astro.config.mjs package.json package-lock.json
git commit -m "feat: install tailwind v4 and geist fonts"
```

---

## Task 2: Create global CSS with design tokens and Tailwind import

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/layouts/Layout.astro`

**Step 1: Create `src/styles/global.css`**

```css
@import "tailwindcss";
@import "@fontsource-variable/geist";
@import "@fontsource-variable/geist-mono";

:root {
  /* Colors */
  --color-ink: #171717;
  --color-on-primary: #ffffff;
  --color-body: #4d4d4d;
  --color-mute: #888888;
  --color-hairline: #ebebeb;
  --color-hairline-strong: #a1a1a1;
  --color-canvas: #ffffff;
  --color-canvas-soft: #fafafa;
  --color-canvas-soft-2: #f5f5f5;
  --color-link: #0070f3;
  --color-link-deep: #0761d1;
  --color-success: #0070f3;
  --color-error: #ee0000;
  --color-cyan: #50e3c2;
  --color-violet: #7928ca;
  --color-highlight-pink: #ff0080;

  /* Gradient stops */
  --gradient-develop-start: #007cf0;
  --gradient-develop-end: #00dfd8;
  --gradient-preview-start: #7928ca;
  --gradient-preview-end: #ff0080;
  --gradient-ship-start: #ff4d4d;
  --gradient-ship-end: #f9cb28;

  /* Shadows */
  --shadow-level-1: inset 0 0 0 1px #00000014;
  --shadow-level-2: inset 0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 2px 2px #0000000a;
  --shadow-level-3: inset 0 0 0 1px #00000014, 0px 2px 2px #0000000a, 0px 8px 8px -8px #0000000a;
  --shadow-level-4: inset 0 0 0 1px #00000014, 0px 2px 2px #0000000a, 0px 8px 16px -4px #0000000a;
}

html {
  background-color: var(--color-canvas-soft);
  color: var(--color-ink);
  font-family: 'Geist Variable', Inter, system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: #171717;
  color: #f2f2f2;
}
```

**Step 2: Update `src/layouts/Layout.astro`**

```astro
---
interface Props {
  title?: string;
  description?: string;
}
const { title = 'TimeGPT — The fastest time zone converter', description = 'Convert time zones instantly with natural language. No login required.' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="generator" content={Astro.generator} />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>

<style>
  @import '../styles/global.css';
</style>
```

**Step 3: Verify fonts and base styles load**

```bash
npm run dev
```
Open `http://localhost:4321` — body should use Geist font, background `#fafafa`.

**Step 4: Commit**

```bash
git add src/styles/global.css src/layouts/Layout.astro
git commit -m "feat: add design tokens and global styles"
```

---

## Task 3: Nav component

**Files:**
- Create: `src/components/Nav.astro`

**Step 1: Create `src/components/Nav.astro`**

```astro
---
const links = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];
---

<header class="nav-bar">
  <div class="nav-inner">
    <!-- Logo -->
    <a href="/" class="nav-logo">
      <span class="nav-logo-mono">TimeGPT</span>
    </a>

    <!-- Center links -->
    <nav class="nav-links" aria-label="Main navigation">
      {links.map(link => (
        <a href={link.href} class="nav-link">{link.label}</a>
      ))}
    </nav>

    <!-- Right CTAs -->
    <div class="nav-ctas">
      <a href="#" class="nav-cta-login">Log in</a>
      <a href="#" class="nav-cta-signup">Get early access</a>
    </div>
  </div>
</header>

<style>
  .nav-bar {
    position: sticky;
    top: 0;
    z-index: 50;
    background: var(--color-canvas);
    border-bottom: 1px solid var(--color-hairline);
    height: 64px;
    display: flex;
    align-items: center;
  }

  .nav-inner {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .nav-logo {
    text-decoration: none;
    flex-shrink: 0;
  }

  .nav-logo-mono {
    font-family: 'Geist Mono Variable', ui-monospace, monospace;
    font-size: 14px;
    font-weight: 400;
    color: var(--color-ink);
    letter-spacing: -0.01em;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-link {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.28px;
    color: var(--color-body);
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 9999px;
    transition: color 0.15s, background 0.15s;
  }

  .nav-link:hover {
    color: var(--color-ink);
    background: var(--color-canvas-soft-2);
  }

  .nav-ctas {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .nav-cta-login {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: var(--color-ink);
    text-decoration: none;
    background: var(--color-canvas);
    padding: 0 8px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    border-radius: 6px;
    border: 1px solid var(--color-hairline);
    transition: border-color 0.15s;
  }

  .nav-cta-login:hover {
    border-color: var(--color-hairline-strong);
  }

  .nav-cta-signup {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: var(--color-on-primary);
    text-decoration: none;
    background: var(--color-ink);
    padding: 0 8px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    border-radius: 6px;
    transition: opacity 0.15s;
  }

  .nav-cta-signup:hover {
    opacity: 0.85;
  }

  @media (max-width: 600px) {
    .nav-links { display: none; }
    .nav-cta-login { display: none; }
  }
</style>
```

**Step 2: Verify in browser**

Open `http://localhost:4321` — nav should be sticky, 64px tall, Geist Mono logo, links + CTA buttons visible.

**Step 3: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: add Nav component"
```

---

## Task 4: Hero band component

**Files:**
- Create: `src/components/Hero.astro`

**Step 1: Create `src/components/Hero.astro`**

```astro
---
---

<section class="hero-band">
  <!-- Mesh gradient backdrop -->
  <div class="hero-gradient" aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g1" cx="20%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#007cf0" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#007cf0" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g2" cx="80%" cy="20%" r="55%">
          <stop offset="0%" stop-color="#7928ca" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#7928ca" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g3" cx="60%" cy="70%" r="60%">
          <stop offset="0%" stop-color="#ff0080" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#ff0080" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g4" cx="10%" cy="80%" r="50%">
          <stop offset="0%" stop-color="#00dfd8" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#00dfd8" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g5" cx="90%" cy="80%" r="45%">
          <stop offset="0%" stop-color="#f9cb28" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#f9cb28" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="white"/>
      <rect width="100%" height="100%" fill="url(#g1)"/>
      <rect width="100%" height="100%" fill="url(#g2)"/>
      <rect width="100%" height="100%" fill="url(#g3)"/>
      <rect width="100%" height="100%" fill="url(#g4)"/>
      <rect width="100%" height="100%" fill="url(#g5)"/>
    </svg>
  </div>

  <div class="hero-content">
    <!-- Badge -->
    <div class="hero-badge">
      <span class="hero-badge-mono">New</span>
      <span class="hero-badge-text">AI-powered meeting scheduling</span>
    </div>

    <!-- Headline -->
    <h1 class="hero-headline">
      The fastest way to<br />convert time zones.
    </h1>

    <!-- Body -->
    <p class="hero-body">
      No UTC offsets. No city selection complexity. Just type what you need — TimeGPT figures out the rest in under 3 seconds.
    </p>

    <!-- CTAs -->
    <div class="hero-ctas">
      <a href="#" class="btn-primary">Try it free</a>
      <a href="#features" class="btn-secondary">See how it works</a>
    </div>

    <!-- Social proof line -->
    <p class="hero-proof">No login required &middot; Works instantly &middot; Free forever</p>
  </div>
</section>

<style>
  .hero-band {
    position: relative;
    overflow: hidden;
    padding: 96px 24px 96px;
    text-align: center;
    background: var(--color-canvas);
  }

  .hero-gradient {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  .hero-gradient svg {
    width: 100%;
    height: 100%;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--color-canvas-soft);
    border: 1px solid var(--color-hairline);
    padding: 4px 12px;
    border-radius: 9999px;
  }

  .hero-badge-mono {
    font-family: 'Geist Mono Variable', ui-monospace, monospace;
    font-size: 12px;
    font-weight: 400;
    color: var(--color-body);
    line-height: 16px;
  }

  .hero-badge-text {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-body);
    line-height: 20px;
    letter-spacing: -0.28px;
  }

  .hero-headline {
    font-size: 48px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -2.4px;
    color: var(--color-ink);
    margin: 0;
  }

  .hero-body {
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    color: var(--color-body);
    margin: 0;
    max-width: 520px;
  }

  .hero-ctas {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 24px;
    background: var(--color-ink);
    color: var(--color-on-primary);
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-decoration: none;
    border-radius: 9999px;
    transition: opacity 0.15s;
  }

  .btn-primary:hover { opacity: 0.85; }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 24px;
    background: var(--color-canvas);
    color: var(--color-ink);
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-decoration: none;
    border-radius: 9999px;
    box-shadow: var(--shadow-level-2);
    transition: box-shadow 0.15s;
  }

  .btn-secondary:hover {
    box-shadow: var(--shadow-level-3);
  }

  .hero-proof {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-mute);
    letter-spacing: -0.28px;
    margin: 0;
  }

  @media (max-width: 600px) {
    .hero-band { padding: 64px 16px; }
    .hero-headline { font-size: 36px; letter-spacing: -1.5px; }
    .hero-body { font-size: 16px; }
  }
</style>
```

**Step 2: Verify in browser**

Hero should show the mesh gradient backdrop, large headline, body copy, two pill CTAs, and proof line.

**Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero band with mesh gradient"
```

---

## Task 5: Logo strip component

**Files:**
- Create: `src/components/LogoStrip.astro`

**Step 1: Create `src/components/LogoStrip.astro`**

```astro
---
const logos = [
  { name: 'Vercel', width: 80 },
  { name: 'Linear', width: 72 },
  { name: 'Notion', width: 80 },
  { name: 'Stripe', width: 60 },
  { name: 'GitHub', width: 72 },
];
---

<section class="logo-strip">
  <p class="logo-strip-label">Trusted by teams at world-class companies</p>
  <div class="logo-row">
    {logos.map(logo => (
      <div class="logo-item" style={`width: ${logo.width}px`}>
        <span class="logo-name">{logo.name}</span>
      </div>
    ))}
  </div>
</section>

<style>
  .logo-strip {
    background: var(--color-canvas);
    border-top: 1px solid var(--color-hairline);
    border-bottom: 1px solid var(--color-hairline);
    padding: 24px 24px;
    text-align: center;
  }

  .logo-strip-label {
    font-size: 12px;
    font-weight: 400;
    color: var(--color-mute);
    font-family: 'Geist Mono Variable', ui-monospace, monospace;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin: 0 0 16px;
  }

  .logo-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
    flex-wrap: wrap;
  }

  .logo-item {
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-hairline-strong);
    letter-spacing: -0.5px;
  }

  @media (max-width: 600px) {
    .logo-row { gap: 24px; }
    .logo-name { font-size: 14px; }
  }
</style>
```

**Step 2: Commit**

```bash
git add src/components/LogoStrip.astro
git commit -m "feat: add LogoStrip component"
```

---

## Task 6: Feature grid (first 3-up row)

**Files:**
- Create: `src/components/FeatureGrid.astro`

**Step 1: Create `src/components/FeatureGrid.astro`**

```astro
---
const features = [
  {
    eyebrow: '01',
    title: 'Natural language input.',
    body: 'Type "tomorrow 4pm Mumbai in London" and get the answer instantly. No dropdowns, no UTC math.',
    gradient: 'linear-gradient(135deg, #007cf0 0%, #00dfd8 100%)',
  },
  {
    eyebrow: '02',
    title: 'Live city comparison.',
    body: 'Add unlimited cities. See working hours, sleeping hours, and DST shifts side by side in real time.',
    gradient: 'linear-gradient(135deg, #7928ca 0%, #ff0080 100%)',
  },
  {
    eyebrow: '03',
    title: 'AI meeting finder.',
    body: 'Tell it your team\'s cities and duration. Get ranked slots — best overall, fairest, earliest, latest.',
    gradient: 'linear-gradient(135deg, #ff4d4d 0%, #f9cb28 100%)',
  },
];
---

<section id="features" class="feature-section">
  <div class="section-inner">
    <div class="section-header">
      <span class="section-eyebrow">Features</span>
      <h2 class="section-headline">Everything your remote team needs.</h2>
      <p class="section-body">TimeGPT handles the timezone complexity so your team can focus on the meeting, not the math.</p>
    </div>

    <div class="feature-grid">
      {features.map(f => (
        <article class="feature-card">
          <div class="feature-card-accent" style={`background: ${f.gradient}`}></div>
          <span class="feature-eyebrow">{f.eyebrow}</span>
          <h3 class="feature-title">{f.title}</h3>
          <p class="feature-body">{f.body}</p>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .feature-section {
    background: var(--color-canvas-soft);
    padding: 96px 24px;
  }

  .section-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .section-eyebrow {
    font-family: 'Geist Mono Variable', ui-monospace, monospace;
    font-size: 12px;
    font-weight: 400;
    color: var(--color-mute);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .section-headline {
    font-size: 32px;
    font-weight: 600;
    line-height: 40px;
    letter-spacing: -1.28px;
    color: var(--color-ink);
    margin: 0;
  }

  .section-body {
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    color: var(--color-body);
    margin: 0;
    max-width: 480px;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .feature-card {
    background: var(--color-canvas);
    border-radius: 8px;
    padding: 32px;
    box-shadow: var(--shadow-level-3);
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    overflow: hidden;
  }

  .feature-card-accent {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
  }

  .feature-eyebrow {
    font-family: 'Geist Mono Variable', ui-monospace, monospace;
    font-size: 12px;
    color: var(--color-mute);
    line-height: 16px;
  }

  .feature-title {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.6px;
    color: var(--color-ink);
    margin: 0;
  }

  .feature-body {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: var(--color-body);
    margin: 0;
  }

  @media (max-width: 960px) {
    .feature-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 600px) {
    .feature-grid { grid-template-columns: 1fr; }
    .feature-section { padding: 64px 16px; }
    .section-headline { font-size: 24px; letter-spacing: -0.96px; }
  }
</style>
```

**Step 2: Commit**

```bash
git add src/components/FeatureGrid.astro
git commit -m "feat: add FeatureGrid component"
```

---

## Task 7: Demo mockup band (dark polarity-flip)

**Files:**
- Create: `src/components/DemoBand.astro`

**Step 1: Create `src/components/DemoBand.astro`**

```astro
---
---

<section id="how-it-works" class="demo-band">
  <div class="demo-inner">
    <div class="demo-copy">
      <span class="demo-eyebrow">How it works</span>
      <h2 class="demo-headline">Just type what you mean.</h2>
      <p class="demo-body">TimeGPT understands natural language, cities, airports, time zones, and even DST edge cases. No configuration needed.</p>
    </div>

    <div class="demo-mockup">
      <div class="mockup-bar">
        <span class="mockup-dot"></span>
        <span class="mockup-dot"></span>
        <span class="mockup-dot"></span>
      </div>
      <div class="mockup-body">
        <div class="mockup-line">
          <span class="mockup-prompt">›</span>
          <span class="mockup-input">"Find best time for Mumbai, London, New York next week"</span>
        </div>
        <div class="mockup-divider"></div>
        <div class="mockup-result">
          <div class="result-row">
            <span class="result-label">Best overall</span>
            <span class="result-time">Tue 9:00 AM EST · 7:30 PM IST · 2:00 PM GMT</span>
            <span class="result-score score-green">Score 87</span>
          </div>
          <div class="result-row">
            <span class="result-label">Fairest</span>
            <span class="result-time">Wed 8:00 AM EST · 6:30 PM IST · 1:00 PM GMT</span>
            <span class="result-score score-blue">Score 82</span>
          </div>
          <div class="result-row">
            <span class="result-label">Earliest</span>
            <span class="result-time">Mon 7:00 AM EST · 5:30 PM IST · 12:00 PM GMT</span>
            <span class="result-score score-amber">Score 71</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .demo-band {
    background: var(--color-ink);
    color: var(--color-on-primary);
    padding: 96px 24px;
  }

  .demo-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }

  .demo-eyebrow {
    font-family: 'Geist Mono Variable', ui-monospace, monospace;
    font-size: 12px;
    font-weight: 400;
    color: #888888;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    display: block;
    margin-bottom: 16px;
  }

  .demo-headline {
    font-size: 32px;
    font-weight: 600;
    line-height: 40px;
    letter-spacing: -1.28px;
    color: #ffffff;
    margin: 0 0 16px;
  }

  .demo-body {
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    color: #a1a1a1;
    margin: 0;
  }

  .demo-mockup {
    background: #0f0f0f;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 2px 2px #00000040, 0px 8px 16px -4px #00000060;
    border: 1px solid #2a2a2a;
  }

  .mockup-bar {
    background: #1a1a1a;
    padding: 10px 14px;
    display: flex;
    gap: 6px;
    align-items: center;
    border-bottom: 1px solid #2a2a2a;
  }

  .mockup-dot {
    width: 10px;
    height: 10px;
    border-radius: 9999px;
    background: #333;
    display: block;
  }

  .mockup-body {
    padding: 24px;
    font-family: 'Geist Mono Variable', ui-monospace, monospace;
    font-size: 13px;
    line-height: 20px;
  }

  .mockup-line {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .mockup-prompt {
    color: var(--color-cyan);
    flex-shrink: 0;
  }

  .mockup-input {
    color: #e0e0e0;
  }

  .mockup-divider {
    border-top: 1px solid #2a2a2a;
    margin-bottom: 20px;
  }

  .result-row {
    display: grid;
    grid-template-columns: 100px 1fr auto;
    gap: 12px;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #1e1e1e;
  }

  .result-row:last-child { border-bottom: none; }

  .result-label {
    color: #888;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .result-time {
    color: #e0e0e0;
    font-size: 12px;
  }

  .result-score {
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 9999px;
  }

  .score-green { background: #0d2d1a; color: #4ade80; }
  .score-blue { background: #0d1a2d; color: #60a5fa; }
  .score-amber { background: #2d1f0d; color: #fbbf24; }

  @media (max-width: 960px) {
    .demo-inner { grid-template-columns: 1fr; gap: 40px; }
  }

  @media (max-width: 600px) {
    .demo-band { padding: 64px 16px; }
    .demo-headline { font-size: 24px; }
    .result-row { grid-template-columns: 80px 1fr; }
    .result-score { display: none; }
  }
</style>
```

**Step 2: Commit**

```bash
git add src/components/DemoBand.astro
git commit -m "feat: add DemoBand dark mockup section"
```

---

## Task 8: Deep features row (3-up, second feature section)

**Files:**
- Create: `src/components/DeepFeatures.astro`

**Step 1: Create `src/components/DeepFeatures.astro`**

```astro
---
const features = [
  {
    eyebrow: '04',
    title: 'Beautiful share cards.',
    body: 'Generate Slack, Teams, WhatsApp, and email-optimized images of your meeting times in one click.',
  },
  {
    eyebrow: '05',
    title: 'DST intelligence.',
    body: 'TimeGPT warns you: "This meeting changes by 1 hour next week because London enters DST." No surprises.',
  },
  {
    eyebrow: '06',
    title: 'Saved people.',
    body: 'Store your manager, client, or team members. Then just ask: "What time is 3pm for my manager?"',
  },
];
---

<section class="deep-section">
  <div class="section-inner">
    <div class="section-header">
      <span class="section-eyebrow">More features</span>
      <h2 class="section-headline">The details that matter.</h2>
    </div>
    <div class="feature-grid">
      {features.map(f => (
        <article class="feature-card">
          <span class="feature-eyebrow">{f.eyebrow}</span>
          <h3 class="feature-title">{f.title}</h3>
          <p class="feature-body">{f.body}</p>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .deep-section {
    background: var(--color-canvas);
    padding: 96px 24px;
  }

  .section-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .section-eyebrow {
    font-family: 'Geist Mono Variable', ui-monospace, monospace;
    font-size: 12px;
    font-weight: 400;
    color: var(--color-mute);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .section-headline {
    font-size: 32px;
    font-weight: 600;
    line-height: 40px;
    letter-spacing: -1.28px;
    color: var(--color-ink);
    margin: 0;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .feature-card {
    background: var(--color-canvas-soft);
    border-radius: 8px;
    padding: 32px;
    box-shadow: var(--shadow-level-1);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .feature-eyebrow {
    font-family: 'Geist Mono Variable', ui-monospace, monospace;
    font-size: 12px;
    color: var(--color-mute);
    line-height: 16px;
  }

  .feature-title {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.6px;
    color: var(--color-ink);
    margin: 0;
  }

  .feature-body {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: var(--color-body);
    margin: 0;
  }

  @media (max-width: 960px) {
    .feature-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 600px) {
    .feature-grid { grid-template-columns: 1fr; }
    .deep-section { padding: 64px 16px; }
    .section-headline { font-size: 24px; }
  }
</style>
```

**Step 2: Commit**

```bash
git add src/components/DeepFeatures.astro
git commit -m "feat: add DeepFeatures section"
```

---

## Task 9: Pricing section

**Files:**
- Create: `src/components/Pricing.astro`

**Step 1: Create `src/components/Pricing.astro`**

```astro
---
const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For individuals who need fast timezone lookups.',
    features: ['Natural language conversion', 'Up to 5 saved cities', 'Share cards', 'Mobile-first UI'],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'For remote workers who schedule cross-timezone meetings daily.',
    features: ['Everything in Free', 'AI meeting finder', 'Unlimited saved people', 'DST intelligence alerts', 'Calendar integrations'],
    cta: 'Start free trial',
    featured: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: 'per month',
    description: 'For distributed teams who need shared scheduling.',
    features: ['Everything in Pro', 'Team workspace', 'Slack & Teams integration', 'Shared city groups', 'Priority support'],
    cta: 'Contact us',
    featured: false,
  },
];
---

<section id="pricing" class="pricing-section">
  <div class="section-inner">
    <div class="section-header">
      <span class="section-eyebrow">Pricing</span>
      <h2 class="section-headline">Simple, transparent pricing.</h2>
      <p class="section-body">Start free. Upgrade when you need the AI features.</p>
    </div>

    <div class="pricing-grid">
      {tiers.map(tier => (
        <article class={`pricing-card ${tier.featured ? 'pricing-card-featured' : ''}`}>
          <div class="tier-header">
            <span class="tier-name">{tier.name}</span>
            <div class="tier-price">
              <span class="tier-amount">{tier.price}</span>
              <span class="tier-period">/{tier.period}</span>
            </div>
            <p class="tier-desc">{tier.description}</p>
          </div>

          <ul class="tier-features">
            {tier.features.map(f => (
              <li class="tier-feature">
                <span class="tier-check" aria-hidden="true">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <a href="#" class={tier.featured ? 'tier-cta-featured' : 'tier-cta'}>{tier.cta}</a>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .pricing-section {
    background: var(--color-canvas-soft);
    padding: 96px 24px;
  }

  .section-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .section-eyebrow {
    font-family: 'Geist Mono Variable', ui-monospace, monospace;
    font-size: 12px;
    font-weight: 400;
    color: var(--color-mute);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .section-headline {
    font-size: 32px;
    font-weight: 600;
    line-height: 40px;
    letter-spacing: -1.28px;
    color: var(--color-ink);
    margin: 0;
  }

  .section-body {
    font-size: 18px;
    color: var(--color-body);
    margin: 0;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    align-items: start;
  }

  .pricing-card {
    background: var(--color-canvas);
    border-radius: 12px;
    padding: 32px;
    box-shadow: var(--shadow-level-4);
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .pricing-card-featured {
    background: var(--color-ink);
    color: var(--color-on-primary);
  }

  .tier-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .tier-name {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.28px;
    color: var(--color-body);
  }

  .pricing-card-featured .tier-name { color: #888; }

  .tier-price {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .tier-amount {
    font-size: 48px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -2.4px;
    color: var(--color-ink);
  }

  .pricing-card-featured .tier-amount { color: #fff; }

  .tier-period {
    font-size: 14px;
    color: var(--color-mute);
  }

  .pricing-card-featured .tier-period { color: #888; }

  .tier-desc {
    font-size: 14px;
    line-height: 20px;
    color: var(--color-body);
    margin: 0;
  }

  .pricing-card-featured .tier-desc { color: #a1a1a1; }

  .tier-features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  .tier-feature {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 14px;
    line-height: 20px;
    color: var(--color-body);
  }

  .pricing-card-featured .tier-feature { color: #e0e0e0; }

  .tier-check {
    color: var(--color-link);
    flex-shrink: 0;
    font-size: 12px;
    margin-top: 2px;
  }

  .pricing-card-featured .tier-check { color: var(--color-cyan); }

  .tier-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 16px;
    background: var(--color-ink);
    color: var(--color-on-primary);
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    border-radius: 9999px;
    transition: opacity 0.15s;
  }

  .tier-cta:hover { opacity: 0.85; }

  .tier-cta-featured {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 16px;
    background: var(--color-canvas);
    color: var(--color-ink);
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    border-radius: 9999px;
    transition: opacity 0.15s;
  }

  .tier-cta-featured:hover { opacity: 0.9; }

  @media (max-width: 960px) {
    .pricing-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
  }

  @media (max-width: 600px) {
    .pricing-section { padding: 64px 16px; }
    .section-headline { font-size: 24px; }
  }
</style>
```

**Step 2: Commit**

```bash
git add src/components/Pricing.astro
git commit -m "feat: add Pricing section"
```

---

## Task 10: Footer component

**Files:**
- Create: `src/components/Footer.astro`

**Step 1: Create `src/components/Footer.astro`**

```astro
---
const columns = [
  {
    label: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#' },
      { label: 'Roadmap', href: '#' },
    ],
  },
  {
    label: 'Use cases',
    links: [
      { label: 'Remote teams', href: '#' },
      { label: 'Freelancers', href: '#' },
      { label: 'Agencies', href: '#' },
      { label: 'Enterprises', href: '#' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];
---

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <span class="footer-logo">TimeGPT</span>
        <p class="footer-tagline">The fastest time zone converter on the internet.</p>
      </div>

      {columns.map(col => (
        <div class="footer-col">
          <span class="footer-col-label">{col.label}</span>
          <ul class="footer-links">
            {col.links.map(link => (
              <li><a href={link.href} class="footer-link">{link.label}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div class="footer-bottom">
      <p class="footer-copy">© 2026 freeworldtimeconverter.com. All rights reserved.</p>
      <p class="footer-copy">Built with Astro · Powered by OpenAI</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-canvas);
    border-top: 1px solid var(--color-hairline);
    padding: 64px 24px 40px;
  }

  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 48px;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .footer-logo {
    font-family: 'Geist Mono Variable', ui-monospace, monospace;
    font-size: 14px;
    font-weight: 400;
    color: var(--color-ink);
  }

  .footer-tagline {
    font-size: 14px;
    line-height: 20px;
    color: var(--color-mute);
    margin: 0;
    max-width: 240px;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-col-label {
    font-family: 'Geist Mono Variable', ui-monospace, monospace;
    font-size: 12px;
    font-weight: 400;
    color: var(--color-ink);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .footer-link {
    font-size: 14px;
    line-height: 20px;
    color: var(--color-body);
    text-decoration: none;
    transition: color 0.15s;
  }

  .footer-link:hover { color: var(--color-ink); }

  .footer-bottom {
    border-top: 1px solid var(--color-hairline);
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .footer-copy {
    font-size: 12px;
    color: var(--color-mute);
    margin: 0;
  }

  @media (max-width: 960px) {
    .footer-top { grid-template-columns: 1fr 1fr; }
    .footer-brand { grid-column: 1 / -1; }
  }

  @media (max-width: 600px) {
    .footer-top { grid-template-columns: 1fr 1fr; gap: 24px; }
    .footer { padding: 48px 16px 32px; }
  }
</style>
```

**Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add Footer component"
```

---

## Task 11: Assemble index.astro

**Files:**
- Modify: `src/pages/index.astro`
- Delete: `src/components/Welcome.astro` (replaced)

**Step 1: Replace `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import LogoStrip from '../components/LogoStrip.astro';
import FeatureGrid from '../components/FeatureGrid.astro';
import DemoBand from '../components/DemoBand.astro';
import DeepFeatures from '../components/DeepFeatures.astro';
import Pricing from '../components/Pricing.astro';
import Footer from '../components/Footer.astro';
---

<Layout>
  <Nav />
  <main>
    <Hero />
    <LogoStrip />
    <FeatureGrid />
    <DemoBand />
    <DeepFeatures />
    <Pricing />
  </main>
  <Footer />
</Layout>
```

**Step 2: Remove the default Welcome component**

```bash
rm src/components/Welcome.astro src/assets/astro.svg src/assets/background.svg
```

**Step 3: Verify full page in browser**

Open `http://localhost:4321` — all 8 sections should render in sequence: Nav → Hero → LogoStrip → FeatureGrid → DemoBand → DeepFeatures → Pricing → Footer.

**Step 4: Commit**

```bash
git add src/pages/index.astro
git rm src/components/Welcome.astro src/assets/astro.svg src/assets/background.svg
git commit -m "feat: assemble full landing page"
```

---

## Task 12: Production build check

**Files:** none

**Step 1: Run build**

```bash
npm run build
```

Expected: `dist/` directory created, no TypeScript or Astro errors.

**Step 2: Preview production build**

```bash
npm run preview
```

Open `http://localhost:4321` — verify all sections render identically to dev mode.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: verify production build passes"
```

---

## Verification Criteria

1. All 8 sections render in the browser without errors
2. Geist font loads correctly (headline has negative letter-spacing, visually tight)
3. Mesh gradient is visible in the hero band
4. Dark band (`DemoBand`) correctly inverts to ink background with white text
5. Pricing card middle tier (`Pro`) is polarity-flipped to ink background
6. Nav is sticky and remains on top when scrolling
7. Mobile: nav links hidden below 600px, grids collapse to 1-up
8. `npm run build` completes with no errors

---

## N/A Sections

- **Integration tests** — N/A: pure static site, no API routes or DB in this phase.
- **E2E tests** — N/A: marketing page only; manual browser verification is the verification method.
- **Metrics & observability** — N/A: no server-side code.
- **Alerting & runbooks** — N/A: static site.
- **Feature documentation** — N/A: the page IS the documentation for the product features.
