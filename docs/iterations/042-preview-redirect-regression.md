# Iterasi 042 — Preview Redirect Regression

Tanggal: 16 Juli 2026

## Tujuan

Mengunci preview route agar parameter `redirect` hanya dapat mengarah ke path
internal dan tidak menjadi open redirect setelah secret valid.

## Perubahan

- Menambahkan `src/lib/preview.ts` dengan helper `safePreviewRedirectPath`.
- Mengubah route `/api/preview` agar memakai helper tersebut.
- Menambahkan unit test untuk:
  - path internal valid (`/`, `/kontak`, path dengan query);
  - nilai kosong;
  - URL eksternal;
  - protocol-relative URL;
  - skema `javascript:`.
- Memperbarui status/audit agar jumlah unit test terbaru tercatat.

## Verifikasi

- `pnpm test:unit` — 33/33 lulus.
- `pnpm type-check`
- `pnpm lint`

## Catatan

Preview production tetap membutuhkan `CONTENTFUL_PREVIEW_SECRET` di Vercel.
Iterasi ini hanya mengunci normalisasi redirect lokal setelah autentikasi
berhasil.
