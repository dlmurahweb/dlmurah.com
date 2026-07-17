# Iterasi 045 — Regression Secret Header Revalidation

Tanggal: 16 Juli 2026

## Tujuan

Memperkuat bagian lokal roadmap P1-02 dengan regression test eksplisit untuk
kontrak header secret endpoint revalidation. Verifikasi webhook production dan
pengukuran publish-to-live tetap membutuhkan akses Vercel dan Contentful
production.

## Hasil

- Pembacaan secret revalidation dipindahkan ke helper murni
  `readRevalidationSecret`.
- Endpoint `POST /api/revalidate` tetap menerima `Authorization: Bearer ...`
  dan header `x-contentful-webhook-secret`.
- Unit test mencakup Bearer auth, header Contentful, prioritas Bearer bila dua
  header tersedia, skema authorization yang tidak didukung, dan request tanpa
  secret.

## Verifikasi

- `pnpm exec tsx --test tests/unit/revalidation.test.ts` — 5/5 lulus.

## Pekerjaan tersisa

- Tambahkan `CONTENTFUL_REVALIDATE_SECRET` ke Vercel Production.
- Buat webhook Contentful publish/unpublish menuju `/api/revalidate`.
- Lakukan tiga percobaan published change dan catat publish-to-live time pada
  production.
