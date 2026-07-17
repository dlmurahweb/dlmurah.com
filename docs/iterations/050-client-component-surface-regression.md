# Iterasi 050 — Regression Surface Client Component

Tanggal: 16 Juli 2026

## Tujuan

Mengunci acceptance P3-01 bahwa polish interaction tidak menambah JavaScript
client secara berarti. Komponen yang memakai `"use client"` harus tetap terbatas
pada bagian yang benar-benar membutuhkan state, effect, dialog, analytics, atau
motion.

## Hasil

- Menambahkan regression test yang memindai seluruh `src`.
- Test menyimpan allowlist komponen client saat ini:
  analytics, ambient motion, header/mobile navigation, accordion, separator, dan
  sheet.
- Penambahan komponen client baru sekarang harus disengaja karena akan
  mengubah allowlist test.

## Verifikasi

- `pnpm exec tsx --test tests/unit/client-component-boundary.test.ts` — 1/1
  lulus.

## Pekerjaan tersisa

- Tidak ada pekerjaan lokal khusus untuk surface client component.
- Audit bundle production yang lebih detail dapat dilakukan setelah semua
  remediation lokal dipublikasikan.
