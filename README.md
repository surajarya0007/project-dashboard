# Personal Portfolio Dashboard — Suraj Arya

A fully interactive, developer-style portfolio built as a dark-themed dashboard application. It presents a complete picture of who I am as an engineer — my work experience, personal and professional projects, competitive programming stats, and a live terminal interface — all wrapped in a WebGL-powered, glass-morphism UI.

---

## Overview

This is not a traditional portfolio page. It is designed to feel like a developer's operating system — a single-page application with a persistent sidebar, animated view transitions, and live data pulled from external APIs. Every section is purpose-built to communicate technical depth and attention to detail.

**Live sections:**

- **Projects** — Six full-stack projects with detailed modals: descriptions, tech stacks, dev stats, image galleries, and links to live demos and source code.
- **Experience** — An animated timeline of professional roles at XelronAI, GoQuant, TCS, and Cadence Design Systems, with auto-calculated total experience duration.
- **Profile** — A profile card with social links, a resume download, and live competitive programming stats fetched from LeetCode and Codeforces, alongside an interactive terminal emulator (`SurajOS v1.0.0`).

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, clsx, tailwind-merge |
| Animation | Framer Motion 12 |
| Charts | Recharts 3 |
| WebGL | OGL with custom GLSL shaders |
| Icons | Lucide React |
| Fonts | Inter, Space Grotesk, DM Sans, JetBrains Mono |
| Package Manager | Bun |

---

## Features

- **WebGL Particle Background** — 1,500 GPU-rendered particles driven by custom vertex and fragment shaders (via OGL), reacting to mouse position in real time.
- **Glass-morphism Design System** — A reusable `GlassCard` primitive and a consistent dark-themed design language throughout.
- **Live Competitive Programming Stats** — ISR-backed API routes fetch LeetCode and Codeforces data (username: `aryasuraj351`) and revalidate every hour.
- **Interactive Terminal** — A fully functional in-browser terminal widget supporting commands like `help`, `about`, `skills`, and `contact`.
- **Project Modals** — Rich detail views per project including bullet-point highlights, tech stack badges, quantified stats (lines of code, team size, deployment count), and a multi-image gallery.
- **Experience Timeline** — Animated vertical timeline with a pulsing indicator on the current role and dynamic duration calculation.
- **Fully Responsive** — Mobile-friendly layout with a hamburger menu and smooth view transitions via Framer Motion's `AnimatePresence`.

---

## Getting Started

Ensure you have [Bun](https://bun.sh) installed, then:

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To use other package managers:

```bash
npm install && npm run dev
# or
yarn install && yarn dev
# or
pnpm install && pnpm dev
```

---

## Project Structure

```
├── app/
│   ├── api/               # API routes for LeetCode, Codeforces, CodeChef, GFG
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── background/        # WebGL particle system
│   ├── experience/        # Timeline components
│   ├── layout/            # Sidebar and app shell
│   ├── overview/          # Terminal widget
│   ├── profile/           # Coding stats card
│   ├── projects/          # Project grid, cards, and modals
│   ├── ui/                # Shared primitives (GlassCard, icons)
│   └── views/             # Top-level view components
├── data/
│   ├── experience.ts      # Work history data
│   └── projects.ts        # Project definitions
└── lib/
    ├── coding-services.ts # External API integrations
    └── coding-stats.ts    # Stats aggregation logic
```

---

## Deployment

The project is optimized for deployment on [Vercel](https://vercel.com). Push to your repository and import the project — no additional configuration is required.

```bash
vercel deploy
```

---

## Contact

**Suraj Arya**
- GitHub: [github.com/aryasuraj351](https://github.com/aryasuraj351)
- LeetCode / Codeforces: `aryasuraj351`
