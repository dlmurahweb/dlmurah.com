# Iterasi 040 — Rich Text Safety Regression

Tanggal: 16 Juli 2026

## Tujuan

Mengunci aturan Contentful bahwa Rich Text dirender sebagai struktur node, bukan
HTML arbitrer dari editor.

## Perubahan

- Menambahkan `tests/unit/rich-text.test.ts`.
- Menguji teks Rich Text yang berisi tag HTML agar tetap di-escape sebagai teks.
- Menguji hyperlink Rich Text agar hanya URL publik aman yang menjadi `<a>`.
- Menguji embedded asset dan embedded entry agar tidak dirender dari CMS.
- Memperbarui status/audit agar jumlah unit test terbaru tercatat.

## Verifikasi

- `pnpm test:unit` — 29/29 lulus.

## Catatan

Test ini menjaga boundary renderer. Sanitasi URL CMS pada mapper tetap dijaga
terpisah oleh Iterasi 038.
