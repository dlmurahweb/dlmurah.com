# Iterasi 046 — Regression Offset Anchor Sticky Header

Tanggal: 16 Juli 2026

## Tujuan

Menutup catatan audit positif MWTSTORE tentang direct anchor mobile agar heading
section tidak tertutup sticky header saat pengguna membuka atau mengklik anchor
internal seperti `#cara-kerja`.

## Hasil

- Menambahkan token CSS `--anchor-scroll-margin` dan rule global untuk target
  anchor homepage: `main`, section langsung di dalam `main`, dan footer kontak.
- Offset berlaku untuk skip link `#main-content`, navigasi section seperti
  `#layanan`, `#cara-kerja`, `#tentang`, serta target footer `#kontak`.
- Regression E2E existing untuk anchor internal kini juga memastikan setiap
  target punya `scroll-margin-top` minimal setinggi sticky header.

## Verifikasi

- `pnpm exec playwright test tests/e2e/site.spec.ts --grep "internal anchor links"`
  — 1/1 lulus.
- `pnpm build` — lulus.
- `pnpm test:e2e` setelah build fresh — 31/31 lulus.

## Pekerjaan tersisa

- Tidak ada pekerjaan lokal khusus untuk offset anchor.
- Production visual smoke tetap perlu dijalankan lagi setelah semua remediation
  lokal dipublikasikan.
