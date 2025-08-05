# 🏗️ Architecture Schema
**Project**: Nyansa Tech Hub Website  
**Platform**: Next.js (Static Site)  
**UI Framework**: Tailwind CSS + ShadCN UI  

---

## 🧱 Structure Overview

```
nyansa-tech-hub/
├── public/
│   ├── logo.svg
│   └── images/                # Hero and gallery images
├── styles/
│   └── globals.css            # Tailwind + custom styles
├── components/
│   ├── HeroSection.tsx
│   ├── WhatWeDo.tsx
│   ├── CoreInitiatives.tsx
│   ├── OurSpaces.tsx
│   ├── PartnersGrid.tsx
│   ├── WhyItMatters.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── pages/
│   ├── index.tsx              # Homepage
│   ├── _app.tsx
│   └── _document.tsx
├── app/ (optional if using app directory routing)
├── utils/
│   └── seo.ts                 # SEO metadata generator
├── lib/
│   └── formHandler.ts         # Formspree/Resend integration
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## 🧩 Key Components

### HeroSection.tsx
- Tagline, CTA, background image or video

### WhatWeDo.tsx
- Mission and target audience with icon grid/cards

### CoreInitiatives.tsx
- Tabs or accordion for Tech Training, Career Assistance, Professional Dev.

### OurSpaces.tsx
- Image gallery with modal or lightbox support

### PartnersGrid.tsx
- Grid layout with logos and one-liner descriptions

### WhyItMatters.tsx
- Highlight quote and supporting context

### ContactSection.tsx
- Contact form, address, phone, map embed, social icons

### Footer.tsx
- Navigation links, social icons, partner carousel

---

## 🌐 Pages

| Page         | Path       | Description                                  |
|--------------|------------|----------------------------------------------|
| Homepage     | `/`        | Hero, mission, initiatives, partners, contact|
| Fallbacks    | `404.tsx`  | Optional custom 404 page                     |

---

## 🎨 Styling & Theming

- **Tailwind CSS** for utility-first design
- **Custom Theme** using logo color palette
- **Responsive Design**: mobile-first breakpoints

---

## ⚙️ Logic & Integration

- **Form Handling**: Formspree/Resend for contact submissions
- **SEO**: Open Graph, Twitter Cards via `seo.ts`
- **Image Optimization**: Next/Image
- **Accessibility**: ShadCN components (Radix UI-based)

---

## 🚀 Deployment

- **Hosting**: Vercel (connected to GitHub)
- **CDN**: Global edge network
- **Preview URLs**: Auto-generated on push

---

## 🔐 Security

- Content security headers in `next.config.js`
- Sanitized form inputs
- OWASP Top 10 applied where applicable
