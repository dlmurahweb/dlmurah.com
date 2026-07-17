# Iterasi 034 — Content Model Ownership Regression

Tanggal: 16 Juli 2026

## Tujuan

Memperkuat pekerjaan ownership CMS agar setiap field fallback Homepage dan Site
Settings yang diedit pemilik tetap terdaftar pada model Contentful dan sample
entry.

## Perubahan

- Menambahkan unit test yang membandingkan key fallback Homepage terhadap field
  content model `homepage` dan sample entry `homepage`.
- Menambahkan unit test serupa untuk Site Settings, dengan pengecualian eksplisit
  untuk field asset runtime (`logoUrl`, `faviconUrl`) yang dipetakan dari
  `logo`/`favicon`.
- Memperbarui status/audit agar jumlah unit test terbaru tercatat.

## Verifikasi

- `pnpm test:unit` — 14/14 lulus.

## Catatan

Test ini tidak menggantikan migrasi Contentful production, tetapi membuat drift
lokal antara fallback, model, dan seed lebih cepat terlihat sebelum deployment.
