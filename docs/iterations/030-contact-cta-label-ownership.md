# Iterasi 030 — Contact CTA Label Ownership

Tanggal: 16 Juli 2026

## Tujuan

Menutup sisa label CTA kontak pada service/admin card agar copy tombol aktif dan
state kontak tidak aktif dapat dikelola melalui entry Homepage tanpa mengubah
guard keamanan kontak.

## Perubahan

- Menambahkan field Homepage `serviceCtaLabel`, `adminCtaLabel`, dan
  `inactiveContactLabel`.
- Menghubungkan fallback, mapper Contentful, model definition, dan sample entry.
- Mengubah `ServiceCard` dan `AdminCard` agar memakai label dari Homepage.
- Memperbarui panduan pemilik untuk menjelaskan ownership label tombol
  layanan/admin.

## Verifikasi

- `pnpm type-check`
- `pnpm test:unit`
- `pnpm lint`
- `pnpm build`
- `pnpm test:e2e`

## Catatan

- Validitas kontak tetap ditentukan oleh `createAdminWhatsAppLink` dan
  `isContactPublishable`; CMS hanya mengubah label yang tampil.
