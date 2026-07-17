# Iterasi 019 — Cache Ownership dan Revalidation

Tanggal: 16 Juli 2026

## Tujuan

Menutup bagian lokal dari roadmap P1-02 dengan menyederhanakan ownership cache
Contentful dan memperjelas kontrak revalidation webhook. Konfigurasi secret
Vercel, webhook Contentful production, dan pengukuran publish-to-live tetap
membutuhkan akses eksternal pemilik.

## Hasil

- Route homepage tidak lagi mendeklarasikan TTL `revalidate = 300` sendiri.
- Time-based freshness dimiliki oleh fetch Contentful server-side melalui
  `next.revalidate = 300` dan tag `contentful`.
- Endpoint `POST /api/revalidate` tetap menginvalidasi tag `contentful` dan path
  `/`, lalu respons sukses kini menyebut target yang diinvalidasi.
- Playwright local server diberi secret revalidation khusus test agar valid
  webhook path bisa diuji tanpa menyentuh secret production.
- E2E menambahkan assertion untuk response webhook sah dan boundary header
  1023, 1024, 1279, serta 1280 px.
- Runbook deployment dan setup Contentful menjelaskan model cache yang baru.

## Verifikasi

- `pnpm type-check` — lulus.
- `pnpm test:unit` — 9/9 lulus.
- `pnpm lint` — lulus.
- `pnpm build` — lulus.
- `pnpm test:e2e` — 26/26 lulus.

## Pekerjaan tersisa

- Tambahkan `CONTENTFUL_REVALIDATE_SECRET` ke Vercel Production.
- Buat webhook Contentful publish/unpublish menuju `/api/revalidate`.
- Lakukan tiga percobaan published change dan catat publish-to-live time pada
  production.
