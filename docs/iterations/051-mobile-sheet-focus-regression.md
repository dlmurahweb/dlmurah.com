# Iterasi 051 - Regression Focus Mobile Sheet

Tanggal: 16 Juli 2026

## Tujuan

Mengunci acceptance P3-01 bahwa mobile navigation dan sheet lulus keyboard/focus
test. Drawer mobile tidak cukup hanya bisa dibuka dan ditutup; setelah ditutup
dengan keyboard, fokus harus kembali ke trigger menu agar pengguna keyboard
tetap berada pada posisi navigasi yang dapat diprediksi.

## Hasil

- Memperluas regression E2E mobile navigation.
- Test kini menyimpan locator trigger menu sebelum drawer dibuka.
- Setelah drawer ditutup dengan `Escape`, test memverifikasi dialog tersembunyi
  dan fokus kembali ke tombol `Buka menu navigasi`.

## Verifikasi

- `pnpm exec playwright test tests/e2e/site.spec.ts --grep "mobile navigation"`
  - lulus.

## Pekerjaan tersisa

- Tidak ada pekerjaan lokal khusus untuk focus return mobile sheet.
- Cross-browser production QA tetap dilakukan setelah publish terbaru tersedia.
