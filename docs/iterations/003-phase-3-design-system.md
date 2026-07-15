# Iterasi 003 — Design System DLMURAH

Tanggal: 15 Juli 2026

## Tujuan

Menyediakan primitive visual dan interaksi yang konsisten sebelum seluruh
homepage dibangun.

## Hasil

- Tombol primary, secondary, ghost, WhatsApp, channel, destructive, dan link.
- Seluruh ukuran tombol memiliki touch target minimum 44 px.
- Focus ring, hover, active, disabled, dan reduced-motion state diterapkan.
- Accordion Radix yang dapat dioperasikan dengan keyboard.
- Sheet/drawer Radix untuk navigasi mobile.
- Separator, loading state, dan empty state.
- Section heading dan surface card reusable.
- Brand logo, angular frame, crystal decoration, energy line, icon resolver,
  dan ilustrasi brankas SVG orisinal.
- Skip link keyboard dan viewport safe-area support.
- Utility `section-shell` dan `section-space` untuk ritme layout responsif.

## Arah desain

- Bentuk potong angular menjadi ciri utama, bukan radius besar generik.
- Cyan digunakan terutama untuk tindakan, fokus, dan sinyal penting.
- Permukaan naik melalui perbedaan warna navy, bukan glow pada setiap card.
- Ilustrasi dibuat orisinal dari motif lock/vault/logo tanpa aset Growtopia.

## File utama

- `src/components/ui/button.tsx`
- `src/components/ui/accordion.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/empty-state.tsx`
- `src/components/ui/loading-state.tsx`
- `src/components/sections/section-heading.tsx`
- `src/components/cards/surface-card.tsx`
- `src/components/brand/*`
- `src/app/globals.css`
- `src/app/loading.tsx`

## Verifikasi

- `pnpm format` — lulus.
- `pnpm lint` — lulus tanpa warning.
- `pnpm type-check` — lulus.
- `pnpm build` — lulus.

## Pekerjaan berikutnya

Phase 4: menyusun semua bagian homepage menggunakan model Contentful dan design
system ini.
