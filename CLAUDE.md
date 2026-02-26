# Aydan Automates — Project Context

## Overview
Landing page for Aydan Automates, an AI automation consulting business. Single-page static site deployed on Vercel at **aydanautomates.com**.

## Tech Stack
- **Frontend:** Single `index.html` with inline CSS + JS (no frameworks)
- **Fonts:** Google Fonts — PT Mono (headings/labels/CTAs) + PT Sans (body copy)
- **Hosting:** Vercel (project: `aydan-automates`)
- **Domain:** aydanautomates.com (registered on Namecheap)
- **Email:** ForwardEmail (operator@aydanautomates.com, aydan@aydanautomates.com)
- **Contact API:** Vercel serverless function (`/api/contact.js`) using Nodemailer + ForwardEmail SMTP

## File Structure
```
Website/
├── index.html                          # Main landing page (all CSS/HTML/JS inline)
├── api/contact.js                      # Serverless contact form handler (Nodemailer)
├── vercel.json                         # Security headers (CSP, HSTS, X-Frame-Options)
├── privacy.html                        # Privacy policy page
├── 404.html                            # Branded 404 page
├── robots.txt                          # Search engine directives
├── sitemap.xml                         # Sitemap (homepage + privacy)
├── Favicon.svg                         # SVG favicon
├── logo.svg                            # Site logo
├── LinkedIn PFP.png                    # About section photo
├── linkedin-icon-logo-black-and-white.png
├── Aydan-Automates-website-thumbnail.png  # OG/social share image
├── Testimonials/                       # Headshot images (capital T — case-sensitive!)
│   ├── Alexander.jpeg
│   ├── Bastian.jpeg
│   ├── Caleb.jpeg
│   ├── Manuel.jpeg
│   └── Zach.jpeg
├── package.json                        # Dependencies (nodemailer)
└── CLAUDE.md                           # This file
```

## Design System
```css
--bg: #0A0A0A          /* Background */
--bg-light: #111111    /* Light background */
--bg-card: #1A1A1A     /* Card background */
--bg-card-hover: #222222
--border: #2A2A2A      /* Borders */
--text: #F5F5F5        /* Primary text */
--text-muted: #888888  /* Muted text */
--text-dim: #767676    /* Dim text (WCAG AA compliant) */
--font-mono: 'PT Mono', monospace
--font-sans: 'PT Sans', sans-serif
```
- Gold accent: `#D4A843` (used sparingly)
- Mobile breakpoints: 767px and 420px

## Page Sections (in order)
1. **Nav** — Logo + "Book a Call" button (scrolls to contact form)
2. **Hero** — Headline with scramble/glitch text effect, sub-copy, two CTAs
3. **Context** ("Let's be real.") — Intro copy about AI challenges
4. **Services** — 4 service cards (Coaching, Consulting, Custom Systems, Ongoing Support)
5. **Testimonials** — Horizontal scrolling carousel with headshots
6. **About** — Photo (B&W → color on hover/touch) + 3 paragraphs
7. **Contact** ("Let's chat.") — Contact form (Name, Email, Business, Message)
8. **Footer** — Copyright, social links (X, LinkedIn), privacy link

## Key Features
- **Scramble text effect:** `scrambleText()` function using requestAnimationFrame. Hero synced to CSS fadeUp animation (400ms delay). Section headlines triggered by IntersectionObserver on scroll.
- **Staggered scroll animations:** Section-based IntersectionObserver applies incremental `transition-delay` (index × 0.12s) to `.fade-up` children.
- **Testimonial carousel:** CSS `scrollCarousel` animation (130s desktop, 80s mobile). Pauses on hover (desktop) and touch (mobile via JS). Edge fades via CSS `mask-image`. Cards duplicated in HTML for seamless infinite loop.
- **Contact form:** Posts JSON to `/api/contact`, shows inline success/error. Honeypot spam protection + IP rate limiting (3/hr). Server-side email validation.
- **About photo:** Grayscale by default, transitions to color on hover (desktop) or touch (mobile).

## Deployment
- **GitHub repo:** github.com/aydanautomates/website (main branch)
- **Vercel:** Auto-deploys from GitHub, but manual `vercel --prod` also works
- **Deploy command:** `vercel --prod --yes --name aydan-automates --token "$VERCEL_TOKEN"`
- **Env vars on Vercel:** `SMTP_USER` (*@aydanautomates.com), `SMTP_PASS` (ForwardEmail SMTP password)

## DNS (Namecheap)
- A record → Vercel IP (76.76.21.21)
- CNAME www → cname.vercel-dns.com
- ForwardEmail records: DKIM, SPF, DMARC, Return-Path (MX + TXT records)

## SEO & Security (Production Audit — Completed)
- OG + Twitter Card meta tags with thumbnail image
- Canonical URL, JSON-LD structured data (ProfessionalService schema)
- Security headers via vercel.json (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- WCAG AA color contrast compliance
- aria-live on form success message, lazy loading on below-fold images

## Social Links
- **X:** https://x.com/aydantheaiguy
- **LinkedIn:** https://www.linkedin.com/in/aydan-arroyo/

## Important Notes
- `Testimonials/` folder uses capital T — Vercel runs Linux (case-sensitive). HTML refs must match exactly.
- Jesus Colon testimonial uses "JC" initials (no headshot image).
- The `.gitignore` excludes `.vercel/`, `node_modules/`, and `.DS_Store`.
- `aydan-automates-landing-page-brief.md` is the original design brief (not deployed, for reference only).
