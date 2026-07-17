# Iterasi 020 — Interaction dan Compact Brand Polish

Tanggal: 16 Juli 2026

## Tujuan

Menutup bagian lokal dari roadmap P3-01 dan sebagian P2-03 yang tidak
membutuhkan approval identitas baru: accordion tidak lagi mengandalkan animasi
height, dan area navigasi compact memakai simplified lock mark.

## Hasil

- Accordion FAQ memakai transisi `grid-template-rows`, bukan animasi height
  berbasis `--radix-accordion-content-height`.
- Reduced motion tetap mematikan transition non-esensial melalui utility
  `motion-reduce`.
- Header dan mobile sheet memakai `BrandLogo` varian `mark`, sehingga ruang
  compact memakai lock mark sederhana dengan wordmark teks DLMURAH.
- E2E menambahkan regression untuk model animasi accordion dan sumber gambar
  compact navigation.

## Verifikasi

- `pnpm type-check` — lulus.
- `pnpm test:unit` — 9/9 lulus.
- `pnpm lint` — lulus.
- `pnpm build` — lulus.
- `pnpm test:e2e` — 28/28 lulus.

## Pekerjaan tersisa

- Crest/winged-vault baru untuk hero/social image masih membutuhkan persetujuan
  pemilik terhadap evolusi identitas visual.
- Detail optical lebih lanjut sebaiknya berdasarkan screenshot review setelah
  deployment remediation berikutnya.
