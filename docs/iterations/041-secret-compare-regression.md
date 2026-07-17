# Iterasi 041 — Secret Compare Regression

Tanggal: 16 Juli 2026

## Tujuan

Mengunci perilaku perbandingan secret yang dipakai endpoint preview dan
revalidation: hanya exact match yang diterima, sedangkan mismatch panjang tidak
boleh melempar error.

## Perubahan

- Memindahkan implementasi murni `secureCompare` ke `src/lib/secure-compare.ts`
  agar dapat diuji di Node unit test.
- Menjaga `src/lib/security.ts` sebagai wrapper `server-only` untuk route
  runtime.
- Menambahkan unit test exact match, mismatch, dan mismatch panjang.
- Memperbarui status/audit agar jumlah unit test terbaru tercatat.

## Verifikasi

- `pnpm test:unit` — 31/31 lulus.
- `pnpm type-check`
- `pnpm lint`

## Catatan

Endpoint production tetap membutuhkan secret Vercel yang benar. Iterasi ini
mengunci perilaku pembanding secret lokal yang dipakai endpoint tersebut.
