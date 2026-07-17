# Iterasi 044 — Contentful Setup Redaction Regression

Tanggal: 16 Juli 2026

## Tujuan

Mengunci janji audit bahwa error setup Contentful tidak mencetak token atau
credential sensitif.

## Perubahan

- Menambahkan `scripts/contentful/redaction.ts`.
- Mengubah `scripts/contentful/setup.ts` agar memakai helper redaction bersama.
- Menambahkan unit test untuk:
  - bearer token pada header authorization;
  - field token pada pesan JSON-like;
  - token pada query string.
- Memperbarui status/audit agar jumlah unit test terbaru tercatat.

## Verifikasi

- `pnpm test:unit` — 39/39 lulus.
- `pnpm type-check`
- `pnpm lint`

## Catatan

Redaction ini melindungi output error tooling. Token Management yang pernah
terekspos tetap harus dirotasi oleh pemilik sesuai catatan audit.
