# Iterasi 032 — Footer Label Ownership

Tanggal: 16 Juli 2026

## Tujuan

Memindahkan label global footer ke Site Settings agar heading, label policy, dan
state tidak aktif footer tidak lagi tersebar sebagai literal komponen.

## Perubahan

- Menambahkan field Site Settings:
  - `footerNavigationHeading`
  - `footerAdminsHeading`
  - `footerChannelsHeading`
  - `footerPrivacyLabel`
  - `footerTermsLabel`
  - `footerInactiveSuffix`
- Menghubungkan fallback, mapper Contentful, model definition, dan sample entry.
- Mengubah `Footer` agar memakai label dari `settings`.
- Memperbarui panduan pemilik untuk menyebut label footer sebagai bagian dari
  Pengaturan Situs.

## Verifikasi

- `pnpm type-check`
- `pnpm test:unit`
- `pnpm lint`
- `pnpm build`
- `pnpm test:e2e`

## Catatan

- Destination link footer policy tetap code-owned ke route policy yang sudah ada.
- Validitas link admin/saluran footer tetap ditentukan oleh guard runtime.
