# Iterasi 006 — SEO, Analytics, dan Kebijakan

Tanggal: 15 Juli 2026

## Tujuan

Menyelesaikan metadata produksi, structured data, route crawler, analytics
interaksi, halaman kebijakan, dan pengalaman 404 tanpa mengumpulkan data
transaksi atau percakapan pribadi.

## Hasil SEO

- Homepage menghasilkan title dan description dari Contentful dengan fallback.
- Canonical, Open Graph, Twitter card, favicon, dan social image tersedia.
- JSON-LD berisi `Organization`, `WebSite`, dan `FAQPage`.
- JSON-LD men-sanitize karakter `<` sebelum dirender.
- `robots.txt` mengizinkan halaman publik dan memblokir `/api/`.
- `sitemap.xml` mencakup homepage, kebijakan privasi, dan syarat layanan.
- Web app manifest menggunakan warna dan icon DLMURAH.
- Halaman 404 khusus tersedia dalam Bahasa Indonesia.

## Analytics

- Vercel Analytics dipasang pada root layout.
- Satu event listener terdelegasi menangkap interaksi yang diberi atribut data.
- Event mencakup CTA hero, service, admin, saluran, navigasi, FAQ, dan final CTA.
- Properti dibatasi pada `source`, `label`, `admin`, `service`, dan `channel`.
- Nomor telepon, URL, prefilled message, percakapan, dan detail transaksi tidak
  dikirim sebagai properti event.
- Perekaman produksi menunggu Web Analytics diaktifkan pada dashboard Vercel.

## Kebijakan dan keamanan konten

- `/kebijakan-privasi` menjelaskan analytics, WhatsApp, Contentful, Vercel, dan
  batas data yang diproses.
- `/syarat-layanan` menegaskan transaksi terjadi di luar website, kontak dapat
  berubah, pengguna wajib memeriksa detail, dan tidak ada jaminan bebas risiko.
- Ketentuan menyarankan peninjauan aturan platform dan tidak mengklaim afiliasi
  resmi dengan Growtopia.

## File utama

- `src/app/page.tsx`
- `src/app/manifest.ts`, `robots.ts`, `sitemap.ts`, `not-found.tsx`
- `src/app/kebijakan-privasi/page.tsx`
- `src/app/syarat-layanan/page.tsx`
- `src/components/analytics/interaction-analytics.tsx`
- `src/components/seo/structured-data.tsx`
- `src/components/layout/policy-page.tsx`
- `src/lib/rich-text.ts`

## Verifikasi

- `pnpm lint` — lulus tanpa warning setelah perbaikan internal navigation.
- `pnpm type-check` — lulus.
- `pnpm build` — lulus; 16 route/static resources terbangun.
- Runtime smoke test:
  - homepage `200` dengan canonical, JSON-LD, dan atribut analytics;
  - policy routes `200`;
  - missing route `404`;
  - robots, sitemap, dan manifest mengembalikan isi yang valid.

## Pekerjaan berikutnya

Phase 7: QA terukur untuk responsive layout, keyboard, reduced motion, link,
metadata, security, dan Lighthouse. Nilai Contentful produksi masih menunggu
provisioning dan data bisnis yang disetujui pemilik.
