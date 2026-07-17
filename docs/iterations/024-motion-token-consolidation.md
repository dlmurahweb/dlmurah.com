# Iterasi 024 — Motion Token Consolidation

Tanggal: 16 Juli 2026

## Tujuan

Melanjutkan roadmap P3-01 dengan mengurangi duplikasi timing interaction pada
komponen UI tanpa menambah JavaScript client.

## Perubahan

- Mengganti easing literal `cubic-bezier(0.25,1,0.5,1)` pada button, accordion,
  sheet, dan card hover shared class dengan token CSS `--ease-out-quart`.
- Menambahkan regression unit test agar source interaksi utama tetap memakai
  token bersama.
- Mempertahankan durasi dan reduced-motion behavior yang sudah lulus visual serta
  accessibility regression.

## Verifikasi

- `pnpm test:unit`
- `pnpm lint`
- `pnpm type-check`
- `pnpm build`
- `pnpm test:e2e`

## Catatan

- Iterasi ini tidak mengubah identitas visual atau membuat crest/winged-vault
  baru, karena pekerjaan tersebut masih membutuhkan persetujuan pemilik.
