# Iterasi 029 — Services Eyebrow Ownership

Tanggal: 16 Juli 2026

## Tujuan

Menutup sisa literal framing pada section Layanan agar eyebrow, heading, dan
description section tersebut memiliki satu source of truth di entry Homepage.

## Perubahan

- Menambahkan field Homepage `servicesEyebrow`.
- Menghubungkan fallback, mapper Contentful, model definition, dan sample entry.
- Mengubah `ServicesSection` agar memakai `homepage.servicesEyebrow`.
- Memperbarui panduan pemilik untuk menyebut ownership eyebrow section Layanan.

## Verifikasi

- `pnpm type-check`
- `pnpm test:unit`
- `pnpm lint`
- `pnpm build`
- `pnpm test:e2e`

## Catatan

- Tidak ada perubahan pada item layanan, mapping admin, atau CTA layanan.
