# Phase 7 — Interface Audit

Tanggal: 15 Juli 2026  
Target: homepage, policy pages, dan not-found page pada build produksi lokal.

## Anti-Patterns Verdict

**Lulus dengan catatan.** Palet cyan pada navy adalah pola yang sering terlihat
generik, tetapi dalam proyek ini merupakan arahan merek eksplisit dan didukung
oleh bentuk angular, ilustrasi brankas orisinal, komposisi hero asimetris, serta
motion yang terbatas. Tidak ada gradient text, testimonial palsu, hero metrics,
glow pada setiap card, atau glassmorphism berlebihan. Grid card berulang masih
ada untuk layanan/admin, tetapi fungsi dan komposisinya dibedakan.

## Executive Summary

- Critical: **0**
- High: **1**
- Medium: **2**
- Low: **2**
- Lighthouse mobile awal: Performance **90**, Accessibility **96**, Best
  Practices **96**, SEO **100**.
- Ketujuh lebar target (360, 390, 430, 768, 1024, 1280, 1440 px) tidak
  menghasilkan horizontal page scroll.
- Policy pages dan 404 tidak memiliki pelanggaran axe WCAG 2.1 A/AA.

Prioritas tertinggi adalah memperbaiki cascade warna link yang menyebabkan
kontras CTA 1.62:1, lalu memperbesar target sentuh link policy footer.

## Detailed Findings

### High

#### QA-01 — Warna teks CTA WhatsApp tertimpa global anchor rule

- Location: `src/app/globals.css` dan semua `Button asChild` yang merender link.
- Category: Accessibility / Theming.
- Description: `a { color: inherit }` berada di luar CSS layer sehingga
  mengalahkan utility `text-background`. Teks CTA hijau menjadi `#f8fbff` di
  atas `#47e0a0`.
- Impact: CTA utama sulit dibaca oleh pengguna dengan low vision.
- WCAG: 1.4.3 Contrast (Minimum), AA.
- Bukti: axe menemukan 1 node pada mobile dan 2 node pada desktop; rasio 1.62:1
  dengan target minimum 4.5:1.
- Recommendation: hapus override global yang redundan atau tempatkan pada
  `@layer base`, lalu verifikasi computed style dan axe.
- Suggested command: `/normalize`.

### Medium

#### QA-02 — Link kebijakan footer hanya setinggi 20 px

- Location: `src/components/layout/footer.tsx`.
- Category: Accessibility / Responsive.
- Description: link “Kebijakan Privasi” dan “Syarat Layanan” tidak memiliki
  area sentuh minimum.
- Impact: target sulit disentuh secara presisi pada perangkat kecil.
- Standard: persyaratan proyek minimum touch target 44 px; selaras dengan
  target-size guidance WCAG.
- Recommendation: gunakan `inline-flex min-h-11 items-center` dan pertahankan
  jarak yang cukup.
- Suggested command: `/adapt`.

#### QA-03 — LCP mobile memiliki margin performa yang sempit

- Location: hero heading / initial render.
- Category: Performance.
- Description: Lighthouse mencatat LCP 3.7 detik pada simulasi mobile walau
  score Performance tepat mencapai target 90. LCP element adalah hero `h1`;
  TTFB 14 ms, CLS 0, dan TBT 20 ms.
- Impact: pengguna pada koneksi lambat dapat menunggu lebih lama sebelum pesan
  utama terlihat stabil.
- Standard: Core Web Vitals LCP sebaiknya <=2.5 detik pada persentil ke-75.
- Recommendation: ukur ulang setelah menghapus error analytics lokal dan pada
  deployment Vercel; pertahankan hero tanpa media raster blocking.
- Suggested command: `/optimize`.

### Low

#### QA-04 — Analytics menghasilkan 404 pada server produksi lokal

- Location: `src/app/layout.tsx`, request `/_vercel/insights/script.js`.
- Category: Performance / Resilience.
- Description: script Vercel Analytics tidak tersedia saat `next start`
  dijalankan di luar Vercel, menghasilkan dua console error dan menurunkan Best
  Practices menjadi 96.
- Impact: noise saat QA lokal dan pada deployment non-Vercel; tidak diharapkan
  terjadi pada Vercel setelah Analytics aktif.
- Recommendation: render runtime analytics hanya ketika environment Vercel
  terdeteksi.
- Suggested command: `/harden`.

#### QA-05 — Test keyboard FAQ dapat mendahului hydration saat suite paralel

- Location: `tests/e2e/site.spec.ts`.
- Category: QA reliability.
- Description: satu run paralel menekan Enter sebelum handler accordion siap;
  pengujian manual terisolasi mengubah `aria-expanded` ke `true` dengan benar.
- Impact: false negative pada CI walau komponen dapat dioperasikan lewat
  keyboard.
- Recommendation: tunggu `networkidle`/hydration sebelum input keyboard dan
  pertahankan assertion ARIA.
- Suggested command: `/harden`.

## Patterns & Systemic Issues

- Satu deklarasi global di luar layer dapat mengalahkan seluruh utility warna
  pada anchor. Ini perlu diperbaiki pada sumber cascade, bukan per tombol.
- Target 44 px sudah konsisten pada button, navigation, accordion, dan drawer;
  hanya link policy footer homepage yang tertinggal.
- Warna hard-coded terutama berada pada SVG ilustrasi dan social image, tempat
  CSS variable tidak selalu dapat dipakai. Beberapa background komponen dapat
  dinormalisasi ke token pada iterasi polish.

## Positive Findings

- Satu `h1`, semantic landmarks, bahasa dokumen, skip link, dan heading
  hierarchy terdeteksi dengan benar.
- Mobile drawer memiliki dialog semantics, focus management, CTA utama, dan
  dapat ditutup dengan Escape.
- Accordion menggunakan button serta `aria-expanded` yang valid.
- Semua external link yang diuji memiliki `noopener noreferrer`.
- Tidak ada malformed `wa.me` URL; fallback tidak mengaktifkan kontak palsu.
- Reduced-motion support tersedia di CSS dan boundary Motion.
- Tidak ada layout shift yang terukur (CLS 0) dan TBT hanya 20 ms.
- Policy pages dan custom 404 lulus axe tanpa violation.

## Recommendations by Priority

1. Immediate: perbaiki cascade warna CTA dan jalankan axe ulang.
2. Short-term: perbesar policy link targets dan stabilkan test hydration.
3. Medium-term: conditionally load Vercel Analytics dan ukur Lighthouse ulang.
4. Long-term: validasi field data produksi setelah Contentful diprovisikan dan
   lakukan RUM melalui Vercel Speed Insights/Analytics.

## Metode Audit

- Playwright + Chrome 145.
- axe-core 4.12.1 dengan tag WCAG 2.0/2.1 A dan AA.
- Lighthouse 13.4.0 mobile.
- Pemeriksaan bounding-box untuk target sentuh dan overflow.
- Runtime smoke test pada build Next.js produksi.

## Resolution Addendum

Seluruh finding ditangani pada iterasi 007:

- QA-01: global anchor override dihapus; axe dan Lighthouse Accessibility 100.
- QA-02: kedua link policy menggunakan `min-h-11`; automated touch-target check
  tidak menemukan target di bawah 44 px.
- QA-03: target Performance mobile tetap tercapai di 90; desktop mencapai 100.
- QA-04: Vercel Analytics hanya dirender pada environment Vercel; tidak ada
  console error pada `next start` lokal.
- QA-05: test FAQ menunggu network idle; run paralel berikutnya stabil.

Dekorasi motion juga disembunyikan di bawah breakpoint `sm` setelah visual QA
menemukan partikel kecil melintas di atas teks hero pada lebar 360 px.
