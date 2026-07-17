# Iterasi 054 - Regression Policy Measure dan Channel Nonaktif

Tanggal: 16 Juli 2026

## Tujuan

Mengunci acceptance P2-04 bahwa halaman policy tetap nyaman dibaca dan channel
nonaktif tetap memberi jalan lanjut yang valid. Implementasi sudah memakai
measure sekitar `65ch` dan fallback `#pilih-admin`; iterasi ini membuat bukti
tersebut masuk ke regression suite.

## Hasil

- Menambahkan E2E untuk mengukur lebar `article.policy-copy` dengan satuan `ch`
  aktual dari browser.
- Menambahkan E2E untuk memastikan channel nonaktif menampilkan link fallback ke
  `#pilih-admin`.
- Test juga memastikan section saluran tidak kembali memakai tombol disabled
  untuk state nonaktif.

## Verifikasi

- `pnpm exec playwright test tests/e2e/site.spec.ts --grep "policy body|inactive channels"` -
  2/2 lulus.

## Pekerjaan tersisa

- Tidak ada pekerjaan lokal khusus untuk policy measure dan channel nonaktif.
- Verifikasi production tetap perlu diulang setelah release terbaru
  dipublikasikan.
