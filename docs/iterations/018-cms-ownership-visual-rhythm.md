# Iterasi 018 — CMS Ownership dan Visual Rhythm

Tanggal: 16 Juli 2026

## Tujuan

Melanjutkan roadmap P2 lokal dengan memindahkan copy bisnis section utama ke
model Homepage dan mengurangi repetisi visual pada bagian Keunggulan tanpa
menambah scope transaksi, akun, checkout, atau backend baru.

## Hasil

- Model frontend `HomePageContent` mendapat field untuk eyebrow, heading,
  deskripsi, catatan keamanan admin, caption visual, dan eyebrow CTA yang
  sebelumnya tersebar sebagai literal di komponen.
- Mapper Contentful memakai fallback aman untuk setiap field baru, sehingga
  entry lama tetap dapat dirender.
- Provisioning Contentful menambahkan field Homepage baru secara idempotent
  tanpa menghapus field milik pemilik.
- Sample entry Homepage mengisi field baru dari fallback repository.
- Section Admin, Cara Kerja, Keunggulan, Saluran, dan final CTA membaca copy
  dari `homepage`, bukan hardcode komponen.
- Keunggulan berubah menjadi ordered editorial list bernomor agar ritme tidak
  mengulang pola icon-card yang sama dengan area layanan/admin.
- Panduan pemilik dan setup Contentful diperbarui untuk menjelaskan ownership
  copy section Homepage.
- E2E menambahkan regression untuk ordered list pada Cara Kerja dan Keunggulan.

## File utama

- `src/types/site.ts`
- `src/contentful/fallback.ts`
- `src/contentful/mappers.ts`
- `scripts/contentful/model-definitions.ts`
- `scripts/contentful/sample-entries.ts`
- `src/app/page.tsx`
- `src/components/sections/admins-section.tsx`
- `src/components/sections/process-section.tsx`
- `src/components/sections/features-section.tsx`
- `src/components/sections/channels-section.tsx`
- `src/components/sections/final-cta-section.tsx`
- `src/components/cards/feature-card.tsx`
- `docs/contentful-owner-guide.md`
- `docs/contentful-setup.md`
- `tests/e2e/site.spec.ts`

## Verifikasi

- `pnpm type-check` — lulus.
- `pnpm test:unit` — 9/9 lulus.
- `pnpm lint` — lulus.
- `pnpm build` — lulus.
- `pnpm test:e2e` — 22/22 lulus.

Catatan: percobaan pertama `pnpm test:e2e` pada iterasi ini gagal start karena
dijalankan paralel dengan `pnpm build` sebelum folder `.next` siap. Rerun
setelah build selesai lulus penuh.

## Pekerjaan tersisa

- P1-02 tetap membutuhkan secret Vercel, webhook Contentful, dan pengamatan
  publish-to-live pada production.
- Aktivasi WhatsApp production tetap menunggu nomor admin, URL saluran, mapping
  layanan, dan klaim/statistik yang disetujui pemilik.
- Evolusi crest/winged-vault dan refinement identitas visual skala besar tetap
  memerlukan persetujuan pemilik.
