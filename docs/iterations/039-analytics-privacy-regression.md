# Iterasi 039 — Analytics Privacy Regression

Tanggal: 16 Juli 2026

## Tujuan

Menguatkan aturan privacy dari dokumen analytics: event hanya memakai nama dan
properti yang diizinkan, tanpa nomor telepon, URL, prefilled message,
percakapan, atau detail transaksi.

## Perubahan

- Menambahkan `src/lib/analytics.ts` sebagai source of truth whitelist event dan
  properti analytics.
- Mengubah `InteractionAnalytics` agar mengabaikan event yang tidak masuk
  whitelist dan membuat payload melalui helper bersama.
- Menambahkan unit test untuk:
  - validasi nama event yang diizinkan;
  - filter/truncate properti analytics;
  - scan atribut `data-analytics-*` di source agar tidak memakai event di luar
    whitelist atau atribut privat seperti phone/message/url/transaction.
- Memperbarui status/audit agar jumlah unit test terbaru tercatat.

## Verifikasi

- `pnpm test:unit` — 26/26 lulus.
- `pnpm type-check`
- `pnpm lint`

## Catatan

Perekaman event production tetap bergantung pada aktivasi Web Analytics di
dashboard Vercel, tetapi payload lokal kini lebih ketat sebelum integrasi itu
diaktifkan.
