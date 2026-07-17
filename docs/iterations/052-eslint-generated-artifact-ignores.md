# Iterasi 052 - ESLint Generated Artifact Ignores

Tanggal: 16 Juli 2026

## Tujuan

Menjaga release gate `pnpm lint` tetap stabil saat dijalankan berdekatan dengan
Playwright. Direktori hasil test seperti `test-results` dapat dibuat atau
dihapus oleh runner E2E, sehingga ESLint tidak boleh mencoba memindai artefak
generated tersebut.

## Hasil

- Menambahkan `coverage/**`, `playwright-report/**`, dan `test-results/**` ke
  `globalIgnores` ESLint.
- Ignore ESLint kini sejalan dengan `.gitignore` untuk artefak QA lokal.

## Verifikasi

- `pnpm lint` - lulus.

## Pekerjaan tersisa

- Tidak ada pekerjaan lokal khusus untuk ignore artefak generated.
