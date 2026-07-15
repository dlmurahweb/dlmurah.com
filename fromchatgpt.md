DLMURAH Website — Product & Implementation Plan

1. Project Overview

Build a production-ready website for DLMURAH, a Growtopia-focused digital service that helps customers:

* Buy DL/BGL
* Sell DL/BGL
* Buy or sell Growtopia accounts
* Contact the appropriate admin through WhatsApp
* Join official WhatsApp channels

The website is primarily a business profile and WhatsApp conversion website.

All transactions will be handled outside the website through WhatsApp. The website does not require:

* Customer accounts
* Shopping cart
* Checkout
* Online payment
* Order management
* Transaction processing

The website must have a unique visual identity based on the supplied DLMURAH logo. Do not copy the layout or design of MWTSTORE or any other competitor.

⸻

2. Primary Goals

1. Establish DLMURAH as a trustworthy and professional brand.
2. Direct visitors to the correct WhatsApp admin.
3. Clearly explain available services.
4. Allow the owner to update numbers, links, text, statistics, and availability through Contentful.
5. Create a fast and responsive website for mobile visitors.
6. Build reusable visual assets and components based on the DLMURAH logo.
7. Make the website easy to maintain and expand.

⸻

3. Technology Stack

Use the following stack:

Framework: Next.js App Router
Language: TypeScript
Styling: Tailwind CSS
CMS: Contentful
UI Components: shadcn/ui where useful
Icons: Lucide React plus custom brand icons
Animation: Motion / Framer Motion
Deployment: Vercel
Analytics: Vercel Analytics or Google Analytics
Validation: Zod
Image handling: next/image
Package manager: pnpm

Use the latest stable versions that are compatible with each other.

⸻

4. Project Constraints

* The website uses Bahasa Indonesia only.
* The website must be mobile-first.
* All transaction CTAs lead to WhatsApp.
* No payment gateway is required.
* No custom backend is required.
* Contentful acts as the content-management panel.
* Do not use copyrighted Growtopia screenshots, characters, UI, or extracted game assets.
* Do not copy the competitor’s visual design.
* Use original abstract illustrations derived from the DLMURAH logo.
* Avoid casino-style imagery.
* Avoid making unsupported claims about guaranteed safety, legality, or official Growtopia affiliation.
* Add an appropriate independent-service disclaimer in the footer.

⸻

5. Brand Direction

Use the supplied DLMURAH logo as the main visual reference.

Brand personality

Futuristic
Gaming-oriented
Fast
Secure
Professional
Bold
Premium
Trustworthy
Responsive

Visual motifs

Build the website’s visual language from:

* Locks
* Keys
* Vaults
* Crystals
* Ice-like glass
* Sharp wing shapes
* Angular panels
* Cyan energy trails
* Layered geometric backgrounds
* Electric blue borders
* Dark navy surfaces

Avoid

* Generic SaaS layouts
* Excessive glassmorphism
* Heavy neon everywhere
* Childish cartoon elements
* Casino graphics
* Red and gold gambling aesthetics
* Direct copies of Growtopia assets
* Overly complex animations
* Low-contrast text

⸻

6. Color System

Create CSS variables for the main brand colors.

--background: #050b35;
--background-secondary: #0b1755;
--surface: #101d62;
--surface-elevated: #142879;
--brand-royal: #293ceb;
--brand-blue: #377cff;
--brand-cyan: #57ecf5;
--brand-ice: #bffaff;
--foreground: #f8fbff;
--foreground-muted: #a8b9e8;
--border: #1a2b77;
--border-highlight: #57ecf5;
--success: #47e0a0;
--warning: #ffca64;
--danger: #ff6d7d;

Add transparent variants where needed.

--brand-cyan-10: rgba(87, 236, 245, 0.1);
--brand-cyan-20: rgba(87, 236, 245, 0.2);
--surface-glass: rgba(16, 29, 98, 0.72);

Use cyan glow sparingly for:

* Primary buttons
* Active navigation items
* Important borders
* Hover states
* Hero illustration lighting

⸻

7. Typography

Use a bold display font for headings and a highly readable sans-serif font for body content.

Suggested combination:

Heading: Space Grotesk
Body: Inter

Alternative:

Heading: Sora
Body: Manrope

Use next/font.

Typography scale

Hero heading: 48–72 px desktop, 38–48 px mobile
Section heading: 36–48 px desktop, 30–36 px mobile
Card heading: 20–24 px
Body: 16–18 px
Small text: 13–14 px

Headings should feel strong without imitating the typography inside the logo.

⸻

8. Website Structure

Create a single-page marketing website with anchor-based navigation.

Recommended navigation:

Beranda
Layanan
Cara Kerja
Tentang
Kontak

Primary navigation CTA:

Chat di WhatsApp

Suggested page route:

/

Optional policy routes:

/kebijakan-privasi
/syarat-layanan

⸻

9. Homepage Sections

9.1 Announcement Bar

Optional Contentful-controlled announcement above the navigation.

Examples:

Harga DL/BGL diperbarui setiap hari melalui saluran WhatsApp.
Admin aktif dan siap membantu transaksi.

Fields:

* Enabled
* Message
* Optional link label
* Optional link URL
* Visual type: information, warning, promotion

⸻

9.2 Header

Requirements:

* DLMURAH logo
* Navigation links
* Primary WhatsApp CTA
* Mobile menu
* Sticky behavior
* Background transition after scrolling
* Accessible keyboard navigation

Desktop layout:

Logo | Navigation | WhatsApp CTA

Mobile layout:

Logo | Menu button

The mobile menu must include the main WhatsApp CTA.

⸻

9.3 Hero Section

The hero must clearly communicate what DLMURAH provides.

Suggested eyebrow:

LAYANAN DIGITAL GROWTOPIA

Suggested headline:

Jual Beli DL, BGL, dan Akun dengan Proses Lebih Mudah

Suggested supporting text:

Hubungi admin DLMURAH melalui WhatsApp untuk jual beli DL/BGL, transaksi akun, dan kebutuhan layanan lainnya.

Primary CTA:

Mulai Transaksi

Secondary CTA:

Lihat Layanan

Trust labels:

Respons cepat
Admin tersedia setiap hari
Proses melalui WhatsApp

Hero visual:

* Original vault or lock illustration
* Crystal fragments
* Cyan energy trails
* Sharp wing-like shapes
* No copyrighted game assets
* Position visual on the right for desktop
* Keep text on the left
* Stack vertically on mobile

Add subtle animated elements:

* Floating crystals
* Slow ambient glow
* Small energy particles
* Soft perspective movement

Respect prefers-reduced-motion.

⸻

9.4 Trust Statistics

Display up to four statistics.

Example fields:

Jumlah transaksi
Pelanggan
Jam layanan
Waktu respons

Do not hardcode claims that have not been supplied by the owner.

If exact statistics are unavailable, support alternative labels such as:

Admin aktif setiap hari
Proses transparan
Dukungan melalui WhatsApp

Each statistic must come from Contentful.

⸻

9.5 Services Section

Section title:

Layanan DLMURAH

Intro:

Pilih layanan yang sesuai dengan kebutuhanmu dan hubungi admin yang menangani layanan tersebut.

Service cards:

Beli DL/BGL

Description:

Hubungi admin untuk menanyakan ketersediaan, harga, dan proses pembelian DL atau BGL.

Jual DL/BGL

Description:

Tawarkan DL atau BGL kepada admin dan konfirmasikan jumlah serta harga yang tersedia.

Jual Beli Akun

Description:

Hubungi admin khusus akun untuk menanyakan proses jual atau beli akun.

Bantuan Transaksi

Description:

Dapatkan arahan dari admin mengenai proses transaksi yang tersedia di DLMURAH.

Each card includes:

* Icon
* Title
* Description
* Optional badge
* CTA
* WhatsApp link or destination admin
* Hover animation

⸻

9.6 Admin Selection Section

This section is important because the business has multiple WhatsApp contacts.

Section title:

Pilih Admin

Description:

Pilih admin berdasarkan layanan yang kamu butuhkan agar pesanmu dapat diproses lebih cepat.

Admin cards:

Admin DL/BGL 1
Admin DL/BGL 2
Admin Akun

Each admin card supports:

* Admin name
* Role
* Service category
* WhatsApp number
* WhatsApp prefilled message
* Availability status
* Optional response-time label
* Optional avatar or brand icon
* CTA button

Possible CTA:

Chat Admin

Prefilled message example:

Halo Admin DLMURAH, saya ingin menanyakan layanan beli DL/BGL.

Generate the WhatsApp URL safely from structured fields.

Format:

https://wa.me/{number}?text={encodedMessage}

Normalize phone numbers by removing:

* +
* Spaces
* Hyphens
* Parentheses

⸻

9.7 How It Works

Section title:

Cara Kerja

Use four steps:

01 — Pilih layanan

Tentukan apakah kamu ingin membeli atau menjual DL/BGL, akun, atau membutuhkan bantuan transaksi.

02 — Hubungi admin

Pilih admin sesuai kategori dan kirim pesan melalui WhatsApp.

03 — Konfirmasi detail

Diskusikan jumlah, harga, persyaratan, dan proses transaksi secara jelas.

04 — Selesaikan transaksi

Ikuti arahan admin dan pastikan seluruh detail telah dikonfirmasi sebelum transaksi selesai.

Desktop:

* Horizontal step layout

Mobile:

* Vertical timeline

⸻

9.8 Why Choose DLMURAH

Section title:

Kenapa Memilih DLMURAH?

Suggested items:

* Admin berdasarkan kategori layanan
* Proses komunikasi yang jelas
* Respons melalui WhatsApp
* Informasi mudah diperbarui
* Layanan tersedia setiap hari
* Saluran resmi untuk pembaruan

Do not state absolute guarantees unless approved by the owner.

Avoid phrases such as:

100% tanpa risiko
Pasti aman
Tidak mungkin tertipu
Resmi dari Growtopia

Safer alternatives:

Proses lebih transparan
Komunikasi langsung dengan admin
Konfirmasi detail sebelum transaksi

⸻

9.9 WhatsApp Channels

Section title:

Ikuti Saluran WhatsApp

Support two channel cards.

Suggested categories:

Saluran Harga & Stok

Dapatkan informasi harga, stok, dan pembaruan layanan.

Saluran Informasi DLMURAH

Ikuti pengumuman, perubahan kontak, dan informasi resmi dari DLMURAH.

Each card includes:

* Channel title
* Description
* URL
* Optional member count
* Optional status
* CTA

CTA:

Buka Saluran

⸻

9.10 About Section

Section title:

Tentang DLMURAH

Suggested body:

DLMURAH merupakan layanan digital yang membantu komunitas Growtopia terhubung dengan admin untuk kebutuhan jual beli DL/BGL, transaksi akun, dan layanan terkait lainnya.
Website ini dibuat sebagai pusat informasi dan jalur resmi untuk menghubungi tim DLMURAH melalui WhatsApp.

Include:

* Short story
* Brand values
* Original abstract visual
* Optional timeline or milestone

Avoid unsupported claims such as exact founding years or transaction totals unless entered in Contentful.

⸻

9.11 FAQ

Add a Contentful-controlled FAQ section.

Suggested questions:

Apakah transaksi dilakukan melalui website?
Bagaimana cara memilih admin?
Apakah nomor WhatsApp dapat berubah?
Di mana saya dapat melihat informasi harga terbaru?
Apakah DLMURAH memiliki hubungan resmi dengan Growtopia?

Suggested answer for transactions:

Tidak. Website berfungsi sebagai pusat informasi dan penghubung. Komunikasi dan proses transaksi dilakukan langsung melalui WhatsApp.

Suggested independent-service disclaimer:

DLMURAH adalah layanan independen dan tidak berafiliasi, didukung, atau disponsori oleh Growtopia maupun pemilik mereknya.

⸻

9.12 Final CTA

Headline:

Siap Menghubungi Admin DLMURAH?

Supporting text:

Pilih layanan yang kamu butuhkan dan lanjutkan percakapan melalui WhatsApp.

Primary CTA:

Pilih Admin

Secondary CTA:

Buka Saluran WhatsApp

Use a visually strong branded panel with:

* Vault graphic
* Cyan border
* Dark glass surface
* Angular logo-inspired shapes

⸻

9.13 Footer

Include:

* DLMURAH logo
* Navigation
* WhatsApp contacts
* WhatsApp channels
* Copyright
* Disclaimer
* Privacy-policy link
* Terms link

Suggested disclaimer:

DLMURAH adalah layanan independen dan tidak berafiliasi dengan Growtopia atau pemilik merek terkait. Nama dan merek dagang pihak ketiga tetap menjadi milik masing-masing pemiliknya.

⸻

10. Contentful Architecture

Create Contentful content models that allow the owner to update important content without changing code.

Use clear Indonesian field names in Contentful where appropriate, but use stable English API field IDs.

⸻

10.1 Site Settings

Content model:

Site Settings

Fields:

siteName: Short text
siteDescription: Long text
logo: Media
favicon: Media
defaultSeoTitle: Short text
defaultSeoDescription: Long text
siteUrl: Short text
contactEmail: Short text
footerDisclaimer: Long text
copyrightText: Short text

Use a single-entry pattern.

⸻

10.2 Navigation

Content model:

Navigation Item

Fields:

label: Short text
href: Short text
order: Integer
isExternal: Boolean
isEnabled: Boolean

⸻

10.3 Homepage

Content model:

Homepage

Fields:

eyebrow: Short text
heroTitle: Short text
heroDescription: Long text
primaryCtaLabel: Short text
primaryCtaTarget: Short text
secondaryCtaLabel: Short text
secondaryCtaTarget: Short text
heroImage: Media
servicesHeading: Short text
servicesDescription: Long text
howItWorksHeading: Short text
aboutHeading: Short text
aboutContent: Rich text
finalCtaTitle: Short text
finalCtaDescription: Long text
seoTitle: Short text
seoDescription: Long text

Use a single-entry pattern.

⸻

10.4 Service

Content model:

Service

Fields:

title: Short text
slug: Short text
shortDescription: Long text
iconKey: Short text
badge: Short text
whatsappAdmin: Reference to WhatsApp Admin
whatsappPrefilledMessage: Long text
order: Integer
isEnabled: Boolean

⸻

10.5 WhatsApp Admin

Content model:

WhatsApp Admin

Fields:

name: Short text
role: Short text
serviceCategory: Short text
phoneNumber: Short text
prefilledMessage: Long text
availabilityLabel: Short text
responseTimeLabel: Short text
avatar: Media
order: Integer
isActive: Boolean

Validation:

* Phone number required
* Name required
* Role required
* Order must be a positive integer

⸻

10.6 WhatsApp Channel

Content model:

WhatsApp Channel

Fields:

title: Short text
description: Long text
url: Short text
iconKey: Short text
memberCountLabel: Short text
order: Integer
isActive: Boolean

Validate the URL format.

⸻

10.7 Statistic

Content model:

Statistic

Fields:

value: Short text
label: Short text
description: Short text
iconKey: Short text
order: Integer
isEnabled: Boolean

Use text instead of numeric-only values so content can support:

24/7
5K+
< 5 menit

⸻

10.8 Process Step

Content model:

Process Step

Fields:

stepNumber: Short text
title: Short text
description: Long text
iconKey: Short text
order: Integer
isEnabled: Boolean

⸻

10.9 Feature

Content model:

Feature

Fields:

title: Short text
description: Long text
iconKey: Short text
order: Integer
isEnabled: Boolean

⸻

10.10 FAQ

Content model:

FAQ

Fields:

question: Short text
answer: Rich text
order: Integer
isEnabled: Boolean

⸻

10.11 Announcement

Content model:

Announcement

Fields:

message: Short text
linkLabel: Short text
linkUrl: Short text
variant: Short text
isEnabled: Boolean
startDate: Date
endDate: Date

⸻

11. Suggested File Structure

src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── manifest.ts
│   ├── kebijakan-privasi/
│   │   └── page.tsx
│   └── syarat-layanan/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── announcement-bar.tsx
│   │   ├── header.tsx
│   │   ├── mobile-navigation.tsx
│   │   └── footer.tsx
│   │
│   ├── sections/
│   │   ├── hero-section.tsx
│   │   ├── statistics-section.tsx
│   │   ├── services-section.tsx
│   │   ├── admins-section.tsx
│   │   ├── process-section.tsx
│   │   ├── features-section.tsx
│   │   ├── channels-section.tsx
│   │   ├── about-section.tsx
│   │   ├── faq-section.tsx
│   │   └── final-cta-section.tsx
│   │
│   ├── cards/
│   │   ├── service-card.tsx
│   │   ├── admin-card.tsx
│   │   ├── statistic-card.tsx
│   │   ├── process-card.tsx
│   │   ├── feature-card.tsx
│   │   └── channel-card.tsx
│   │
│   ├── brand/
│   │   ├── brand-logo.tsx
│   │   ├── crystal-decoration.tsx
│   │   ├── energy-line.tsx
│   │   ├── angular-frame.tsx
│   │   └── vault-illustration.tsx
│   │
│   └── ui/
│       └── reusable shadcn components
│
├── contentful/
│   ├── client.ts
│   ├── queries.ts
│   ├── mappers.ts
│   ├── types.ts
│   └── preview.ts
│
├── lib/
│   ├── analytics.ts
│   ├── env.ts
│   ├── seo.ts
│   ├── utils.ts
│   ├── whatsapp.ts
│   └── constants.ts
│
├── types/
│   ├── contentful.ts
│   └── site.ts
│
└── assets/
    ├── icons/
    ├── patterns/
    └── illustrations/

⸻

12. Component Requirements

Buttons

Create:

Primary button
Secondary button
Ghost button
WhatsApp button
Channel button

Primary button:

* Cyan background
* Dark navy text
* Strong hover
* Accessible focus ring
* Optional icon
* Minimum mobile touch target of 44px

⸻

Cards

All cards should share:

* Dark elevated surface
* Thin blue border
* Optional cyan accent
* Large border radius, but not excessively rounded
* Subtle hover lift
* Strong typography hierarchy

Do not apply intense glow to every card.

⸻

Icons

Use custom icon wrappers based on:

* Lock
* Key
* Shield
* Vault
* Message
* User
* Crystal
* Lightning
* Channel
* Exchange

Use Lucide icons as a base where appropriate.

Do not extract or trace copyrighted game art.

⸻

13. Asset Creation Plan

The only existing asset is the DLMURAH logo.

Create a reusable asset system.

Required assets

Logo PNG/WebP
Transparent logo version
Favicon
Apple touch icon
Open Graph image
Hero illustration
Service icons
WhatsApp admin placeholder
WhatsApp channel illustration
Crystal background texture
Angular section divider
Loading animation
Mobile hero variation
Footer mark

Asset style

Deep navy
Royal blue
Electric cyan
Ice blue
White highlights
Thick dark outlines
Sharp geometric structure
Reflective crystal surfaces
Controlled cyan edge lighting
Transparent background where practical

Optimize assets:

* Convert large raster images to WebP or AVIF
* Provide responsive image sizes
* Avoid using large GIF files when CSS, SVG, Lottie, or video is more efficient
* Use animations only when they do not hurt performance

If the supplied logo animation is a GIF, evaluate converting it to:

WebM
MP4
Lottie
Animated WebP

Prefer WebM or Lottie for smaller file sizes when possible.

⸻

14. Contentful Data Fetching

Use the Contentful Delivery API for published content.

Support optional preview mode using the Preview API.

Environment variables:

CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_PREVIEW_SECRET=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=

Validate environment variables with Zod.

Create typed mapper functions that convert Contentful responses into clean frontend models.

Do not pass raw Contentful objects directly into components.

Example:

type WhatsAppAdmin = {
  id: string;
  name: string;
  role: string;
  serviceCategory: string;
  phoneNumber: string;
  prefilledMessage: string;
  availabilityLabel?: string;
  responseTimeLabel?: string;
  avatarUrl?: string;
  order: number;
  isActive: boolean;
};

⸻

15. Caching and Revalidation

Use Next.js caching and revalidation.

Recommended approach:

export const revalidate = 300;

This allows Contentful changes to appear within approximately five minutes.

Optionally implement a Contentful webhook that calls a Next.js revalidation endpoint.

Webhook flow:

Contentful publish
→ webhook
→ protected Next.js revalidation route
→ homepage cache refreshed

Protect the endpoint with a secret.

⸻

16. WhatsApp Utility

Create a reusable helper.

type WhatsAppLinkOptions = {
  phoneNumber: string;
  message?: string;
};
export function createWhatsAppLink({
  phoneNumber,
  message,
}: WhatsAppLinkOptions): string {
  const normalizedNumber = phoneNumber.replace(/\D/g, "");
  const encodedMessage = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `https://wa.me/${normalizedNumber}${encodedMessage}`;
}

Include graceful handling for missing or invalid numbers.

Disable CTA links when the admin is inactive.

⸻

17. SEO Requirements

Implement:

* Metadata API
* Canonical URL
* Open Graph metadata
* Twitter card metadata
* Favicon
* Robots
* Sitemap
* Semantic headings
* Structured data

Suggested schema:

Organization
WebSite
FAQPage

Do not claim official Growtopia affiliation.

Suggested homepage title:

DLMURAH — Jual Beli DL, BGL, dan Akun

Suggested description:

Hubungi admin DLMURAH untuk layanan jual beli DL/BGL, transaksi akun, dan informasi terbaru melalui WhatsApp.

⸻

18. Analytics Requirements

Track:

Hero WhatsApp CTA click
Service CTA click
Admin WhatsApp click
WhatsApp channel click
Navigation click
FAQ interaction
Final CTA click

Suggested analytics event format:

{
  event: "whatsapp_click",
  source: "admin_card",
  admin: "Admin DL 1",
  service: "beli_dl"
}

Do not store private WhatsApp conversations or customer transaction details.

⸻

19. Accessibility Requirements

Target WCAG 2.1 AA where practical.

Requirements:

* Sufficient text contrast
* Keyboard navigation
* Visible focus states
* Semantic landmarks
* Proper heading hierarchy
* Descriptive alt text
* Accessible mobile menu
* Reduced-motion support
* Minimum touch target of 44px
* Do not communicate status by color alone
* Proper accordion accessibility for FAQ

⸻

20. Performance Requirements

Target Lighthouse scores:

Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 95+

Core requirements:

* Avoid unnecessary client components
* Use server components by default
* Lazy-load below-the-fold media
* Optimize images
* Minimize JavaScript
* Avoid heavy particle libraries
* Use CSS animations where possible
* Avoid large autoplay videos
* Prevent layout shift
* Preload only critical fonts and assets

⸻

21. Responsive Breakpoints

Design and test for:

360px
390px
430px
768px
1024px
1280px
1440px

Important mobile behavior:

* Hero content appears before illustration
* CTA buttons can become full width
* Admin cards stack vertically
* Process steps become vertical
* Navigation uses an accessible drawer
* Decorative visuals do not block text
* No horizontal overflow

⸻

22. Security Requirements

* Keep Contentful tokens server-side.
* Only expose values explicitly intended for the browser.
* Validate external URLs.
* Sanitize Rich Text output.
* Do not render arbitrary HTML from Contentful.
* Protect preview and revalidation routes.
* Add security headers where appropriate.
* Do not hardcode credentials.
* Do not expose internal Contentful IDs unnecessarily.
* Use dependency auditing before production release.

⸻

23. Legal and Content Safeguards

Add a footer disclaimer:

DLMURAH adalah layanan independen dan tidak berafiliasi, didukung, atau disponsori oleh Growtopia maupun pemilik merek terkait. Seluruh merek dagang pihak ketiga merupakan milik masing-masing pemiliknya.

Add terms stating:

* Website is an information and communication gateway.
* Transactions occur outside the website.
* Users are responsible for confirming transaction details.
* Contact numbers may change.
* Only contacts listed on the official website should be used.
* The website does not request passwords through forms.
* The owner should review whether account trading or virtual-item trading complies with applicable platform terms.

Do not write wording that guarantees there is no risk.

⸻

24. Development Phases

Phase 1 — Project Setup

Tasks:

* Initialize Next.js with TypeScript.
* Configure Tailwind.
* Add shadcn/ui.
* Configure linting and formatting.
* Add environment validation.
* Set up project folders.
* Configure fonts.
* Create base metadata.
* Add logo assets.
* Create global color tokens.

Deliverable:

Working Next.js foundation with global brand theme.

⸻

Phase 2 — Contentful Setup

Tasks:

* Create Contentful content models.
* Create sample entries.
* Configure Delivery API.
* Build typed fetch utilities.
* Build mapper functions.
* Configure preview support.
* Configure caching and revalidation.

Deliverable:

Contentful content can be fetched and displayed safely.

⸻

Phase 3 — Design System

Tasks:

* Build buttons.
* Build section-heading component.
* Build card primitives.
* Build background decorations.
* Build angular frame component.
* Create icon system.
* Create loading and empty states.
* Create spacing and typography conventions.

Deliverable:

Reusable DLMURAH component library.

⸻

Phase 4 — Homepage Sections

Build in this order:

1. Announcement bar
2. Header
3. Hero
4. Trust statistics
5. Services
6. Admin selection
7. Process
8. Features
9. WhatsApp channels
10. About
11. FAQ
12. Final CTA
13. Footer

Deliverable:

Complete responsive homepage connected to Contentful.

⸻

Phase 5 — Assets and Animation

Tasks:

* Integrate hero visual.
* Add crystal background details.
* Add subtle lighting.
* Add card hover motion.
* Add reduced-motion fallback.
* Optimize logo animation.
* Create Open Graph image.
* Create favicon set.

Deliverable:

Consistent branded visual system without performance degradation.

⸻

Phase 6 — SEO, Analytics, and Policies

Tasks:

* Add SEO metadata.
* Add structured data.
* Add sitemap and robots.
* Add analytics events.
* Add privacy page.
* Add terms page.
* Add disclaimer.

Deliverable:

Search-ready and measurable production website.

⸻

Phase 7 — Quality Assurance

Test:

* All navigation links
* All WhatsApp links
* Prefilled messages
* All Contentful data
* Missing-content fallbacks
* Inactive admins
* Mobile menu
* Responsive layouts
* Keyboard navigation
* Reduced motion
* Lighthouse
* Broken images
* Metadata
* Error states

Deliverable:

QA-complete release candidate.

⸻

Phase 8 — Deployment

Tasks:

* Create Vercel project.
* Add environment variables.
* Connect custom domain.
* Configure DNS.
* Configure Contentful webhook.
* Run final production build.
* Verify SSL.
* Verify analytics.
* Verify metadata previews.
* Create Contentful usage guide.

Deliverable:

Live production website on DLMURAH.com.

⸻

25. Acceptance Criteria

The project is complete when:

* The website is deployed and accessible through the approved domain.
* The website works on mobile, tablet, and desktop.
* The owner can update WhatsApp numbers through Contentful.
* The owner can update WhatsApp channel links through Contentful.
* The owner can update service content through Contentful.
* Each service directs users to the correct admin.
* All WhatsApp links contain appropriate prefilled messages.
* The website uses a custom design based on the logo.
* No competitor layout has been copied.
* No copyrighted game screenshots or character assets are used.
* The website includes appropriate disclaimers.
* SEO metadata is present.
* Analytics events work.
* No major accessibility issues remain.
* No major console errors remain.
* The production build succeeds.
* Lighthouse targets are reasonably met.
* A short CMS usage guide is provided.

⸻

26. Out of Scope

The initial version does not include:

* User registration
* Customer login
* Admin dashboard built from scratch
* Shopping cart
* Online checkout
* Payment gateway
* Transaction database
* Order tracking
* Chat system
* Automatic WhatsApp message retrieval
* Inventory management
* Automatic pricing from external sources
* Marketplace listings
* Mobile application
* Multilingual support
* Growtopia API integration
* Scraping competitor or game data

Any additional functionality must be estimated separately.

⸻

27. Future Enhancements

Possible future additions:

* Dynamic price board
* Availability schedules
* Customer testimonials
* Verified transaction gallery
* Promotional campaign pages
* Referral tracking
* Admin-specific analytics
* Contentful live preview
* Blog or announcements
* Link-shortening and click tracking
* Contact-number change history
* Backup contact warnings
* PWA support

⸻

28. Codex Execution Instructions

Implement the project incrementally.

Follow these rules:

1. Inspect the existing repository before modifying files.
2. Preserve existing working functionality.
3. Use TypeScript strict mode.
4. Use server components by default.
5. Only use client components when interactivity requires them.
6. Avoid hardcoding editable business content.
7. Fetch editable content from Contentful.
8. Create typed interfaces and mapper functions.
9. Handle missing Contentful fields gracefully.
10. Do not expose secret environment variables.
11. Do not use copyrighted game artwork.
12. Keep the visual identity based on the supplied DLMURAH logo.
13. Ensure every external link has safe attributes where appropriate.
14. Keep animations subtle and accessible.
15. Test the production build after major phases.
16. Do not add payment or account systems.
17. Do not add scope beyond this document without approval.
18. Document setup and deployment in the README.
19. Add clear comments only where they provide real value.
20. Provide a summary of changed files after each implementation phase.

Begin by:

1. Auditing the repository.
2. Reporting the current structure and installed dependencies.
3. Identifying missing setup.
4. Proposing the exact files to create or modify.
5. Implementing Phase 1 only.
6. Running lint, type-check, and production build.
7. Reporting errors before continuing to Phase 2.