# Iterasi 027 — Structured Data Sentinel Regression

Tanggal: 16 Juli 2026

## Tujuan

Menguatkan release gate P0-01 agar sentinel/dummy contact tidak hanya dicegah
pada link WhatsApp, tetapi juga terbukti tidak muncul pada HTML dan JSON-LD
homepage lokal.

## Perubahan

- Memperluas test E2E metadata/security agar memeriksa raw HTML tidak memuat
  sentinel `620000000000`.
- Mem-parse `application/ld+json` dan memastikan semua `ContactPoint.telephone`
  memakai format `+` diikuti 8-15 digit.
- Memastikan JSON-LD tidak menerbitkan sentinel `+620000000000`.

## Verifikasi

- `pnpm exec playwright test tests/e2e/site.spec.ts -g "metadata, structured data"`
- `pnpm test:unit`
- `pnpm lint`
- `pnpm type-check`
- `pnpm build`
- `pnpm test:e2e`

## Catatan

- Guard runtime tetap berada di `src/lib/whatsapp.ts`; iterasi ini menambah
  bukti release-gate pada render homepage.
