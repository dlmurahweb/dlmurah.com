# Iterasi 017 — Frontend Remediation Pass

Tanggal: 16 Juli 2026

## Tujuan

Menindaklanjuti roadmap audit frontend pada bagian yang dapat diselesaikan
secara lokal tanpa akses Vercel, webhook Contentful, atau data kontak resmi
pemilik.

## Hasil

- Guard WhatsApp terpusat kini menolak nomor sentinel `620000000000`, nomor
  kosong, nomor dummy, dan nomor di luar format 8–15 digit sebelum link,
  analytics WhatsApp, footer, service card, admin card, atau structured data
  dapat diterbitkan.
- CTA generik header, mobile navigation, hero, dan final CTA diarahkan ke
  `#pilih-admin`; link WhatsApp langsung hanya muncul pada konteks admin atau
  layanan yang memiliki kontak publishable.
- Header menampilkan jalur CTA mulai breakpoint `lg`, sehingga 1024–1279 px
  tidak kehilangan aksi konversi.
- Grid statistik sadar jumlah item, service grid tidak lagi memakai featured
  row-span kosong, dan vault final CTA disembunyikan sampai `xl`.
- Channel nonaktif berubah dari tombol disabled menjadi empty state dengan
  aksi fallback menuju pemilihan admin.
- Cara Kerja memakai ordered list semantik dengan connector dekoratif di luar
  list dan scroll offset untuk sticky header.
- Policy layout memakai measure sekitar 65 karakter dan tanggal pembaruan
  eksplisit per halaman.
- Hover lift surface card dibatasi pada perangkat dengan hover dan pointer
  presisi.
- Sample admin Contentful tidak lagi menanam nomor placeholder; nomor WhatsApp
  menjadi draft field yang harus diisi dan diuji sebelum `isActive=true`.

## File utama

- `src/lib/whatsapp.ts`
- `src/app/page.tsx`
- `src/components/layout/header.tsx`
- `src/components/layout/mobile-navigation.tsx`
- `src/components/sections/hero-section.tsx`
- `src/components/sections/final-cta-section.tsx`
- `src/components/sections/statistics-section.tsx`
- `src/components/sections/services-section.tsx`
- `src/components/sections/process-section.tsx`
- `src/components/cards/channel-card.tsx`
- `scripts/contentful/model-definitions.ts`
- `scripts/contentful/sample-entries.ts`
- `docs/contentful-owner-guide.md`
- `docs/contentful-setup.md`
- `tests/unit/whatsapp.test.ts`
- `tests/e2e/site.spec.ts`

## Verifikasi

- `pnpm lint` — lulus.
- `pnpm type-check` — lulus.
- `pnpm test:unit` — 9/9 lulus.
- `pnpm build` — lulus.
- `pnpm test:e2e` — 21/21 lulus.
- `pnpm exec prettier --check <changed files>` — lulus.
- `git diff --check` — lulus.

`pnpm format:check` repository-wide masih melaporkan file lama di luar patch
ini yang belum sesuai Prettier. File yang diubah pada iterasi ini sudah lulus
format check terarah.

## Pekerjaan tersisa

- Konfigurasi `CONTENTFUL_REVALIDATE_SECRET`, preview secret, webhook, dan Web
  Analytics tetap membutuhkan akses Vercel/Contentful pemilik.
- Aktivasi transaksi tetap menunggu nomor admin, URL saluran, mapping layanan,
  dan klaim/statistik yang disetujui pemilik.
- P2/P3 yang membutuhkan persetujuan desain atau evolusi identitas visual
  perlu dikerjakan setelah P0/P1 production safety dirilis dan diaudit ulang.
