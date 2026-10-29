# ASHISHWEB — Premium Next.js Portfolio Recreation

Faithful, high-performance portfolio recreation for **Ashish Kumar Deb Nath** (**ASHISHWEB**), WordPress & Elementor Specialist and Frontend Engineer.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (ES6+ / React 19 JSX)
- **Styling**: Tailwind CSS v4 & Custom Design Tokens
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion v12) with `prefers-reduced-motion` compliance
- **Typography**: Syne (Display), Inter (Sans), JetBrains Mono (Mono)

## Project Structure

```text
ashishweb/
├── src/
│   ├── app/
│   │   ├── globals.css         # Theme tokens, grid backgrounds, typography
│   │   ├── layout.js           # Root layout, Google Fonts, SEO metadata
│   │   ├── page.js             # Main landing page with all 8 sections
│   │   ├── not-found.js        # Custom 404 page
│   │   ├── robots.js           # Robots.txt generator
│   │   ├── sitemap.js          # Dynamic sitemap generator
│   │   └── projects/
│   │       ├── page.js         # All Projects archive with filter
│   │       └── [slug]/
│   │           └── page.js     # In-depth project case study pages
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx      # Sticky navbar with ScrollSpy & active underline
│   │   │   ├── Footer.jsx      # Clean two-column footer with Back to Top
│   │   │   └── MobileMenu.jsx  # Accessible mobile drawer
│   │   ├── sections/
│   │   │   ├── Hero.jsx        # Dominant headline, 3 CTAs, tech stack, 4-col stats
│   │   │   ├── About.jsx       # Engineering philosophy, profile card, 4 feature cards
│   │   │   ├── Skills.jsx      # 2 large equal-height panels (CMS & Modern Web)
│   │   │   ├── Services.jsx    # 8 detailed web service cards with deliverables
│   │   │   ├── Projects.jsx    # 6 browser-inspired mockup cards
│   │   │   ├── Experience.jsx  # Exprovia career timeline with 4 verified outcomes
│   │   │   ├── WhyMe.jsx       # 6 quality execution cards with standards
│   │   │   └── Contact.jsx     # 3 contact cards (copy email, WhatsApp, location) + bottom CTA
│   │   └── ui/
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── FeatureCard.jsx
│   │       ├── GridBackground.jsx
│   │       ├── ProjectCard.jsx
│   │       ├── Reveal.jsx
│   │       ├── SectionHeading.jsx
│   │       ├── ServiceCard.jsx
│   │       └── SkillCard.jsx
│   ├── data/
│   │   ├── experience.js       # Experience, About & WhyMe data
│   │   ├── projects.js         # 6 production demo projects & case studies
│   │   ├── services.js         # 8 specialized web services & deliverables
│   │   ├── site.js             # Site config, hero details & navigation
│   │   └── skills.js           # Technical skills data
│   └── lib/
│       └── utils.js            # Utility helpers
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Production Build

```bash
npm run build
npm start
```
