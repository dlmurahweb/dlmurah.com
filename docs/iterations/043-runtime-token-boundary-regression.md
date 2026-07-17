# Iterasi 043 — Runtime Token Boundary Regression

Tanggal: 16 Juli 2026

## Tujuan

Mengunci aturan deployment bahwa `CONTENTFUL_MANAGEMENT_TOKEN` hanya dipakai
tooling lokal dan tidak boleh masuk runtime aplikasi atau client bundle.

## Perubahan

- Menambahkan `tests/unit/runtime-token-boundary.test.ts`.
- Menguji source `src/` agar tidak memuat `CONTENTFUL_MANAGEMENT_TOKEN`.
- Menguji `src/lib/env.ts` agar tidak mengekspos Management token pada schema
  runtime.
- Menguji semua Client Component agar tidak membaca `process.env` atau mengimpor
  `@/lib/env`.
- Memperbarui status/audit agar jumlah unit test terbaru tercatat.

## Verifikasi

- `pnpm test:unit` — 36/36 lulus.
- `pnpm type-check`
- `pnpm lint`

## Catatan

Token Management tetap boleh berada di `.env.local` saat menjalankan
`pnpm contentful:setup`, tetapi tidak dibutuhkan oleh Vercel runtime.
