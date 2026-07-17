# Iterasi 021 — Screenshot Regression Baseline

Tanggal: 16 Juli 2026

## Tujuan

Menutup acceptance roadmap yang meminta screenshot regression pada viewport
390, 1024, dan 1440 px setelah perbaikan layout responsive.

## Hasil

- Menambahkan `tests/e2e/visual.spec.ts` untuk snapshot visual homepage pada:
  - 390×900;
  - 1024×900;
  - 1440×900.
- Snapshot dijalankan dengan `prefers-reduced-motion: reduce` agar baseline
  stabil dan tidak bergantung pada ambient motion.
- Baseline Playwright tersimpan di
  `tests/e2e/visual.spec.ts-snapshots/`.
- Full E2E suite kini mencakup 31 test termasuk tiga visual regression target.

## Verifikasi

- `pnpm build` — lulus.
- `pnpm exec playwright test tests/e2e/visual.spec.ts --update-snapshots` —
  3/3 lulus dan membuat baseline.
- `pnpm test:e2e` — 31/31 lulus.

## Pekerjaan tersisa

- Screenshot production setelah deploy masih perlu dibandingkan ulang dengan
  data Contentful dan kontak resmi yang telah disetujui pemilik.
- P1-02 production freshness tetap membutuhkan secret Vercel, webhook
  Contentful, dan tiga percobaan publish-to-live.
