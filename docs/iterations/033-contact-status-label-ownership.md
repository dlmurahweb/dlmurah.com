# Iterasi 033 — Contact Status Label Ownership

Tanggal: 16 Juli 2026

## Tujuan

Menutup sisa copy fallback status admin yang masih berada di komponen React agar
label status aktif/tidak aktif dapat dikelola dari entry Homepage CMS.

## Perubahan

- Menambahkan field Homepage `activeContactFallbackLabel` dan
  `inactiveContactFallbackLabel` pada type, fallback, mapper, model Contentful,
  dan sample entry.
- Mengubah `AdminCard` agar label badge memakai `availabilityLabel` admin bila
  tersedia, lalu fallback ke field Homepage berdasarkan status link WhatsApp.
- Memperbarui panduan pemilik agar label status kontak tercatat sebagai konten
  yang dapat dikelola.

## Verifikasi

- `pnpm type-check`
- `pnpm test:unit`
- `pnpm lint`
- `pnpm build`
- `pnpm test:e2e`
- `pnpm exec prettier --check` untuk file yang disentuh
- `git diff --check`

## Catatan

Nilai fallback tetap sama seperti sebelumnya (`Tersedia` dan `Belum aktif`), jadi
perubahan ini tidak dimaksudkan mengubah tampilan publik.
