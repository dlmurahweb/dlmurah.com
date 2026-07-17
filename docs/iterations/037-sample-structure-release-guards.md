# Iterasi 037 — Sample Structure Release Guards

Tanggal: 16 Juli 2026

## Tujuan

Menjadikan beberapa batas struktur sample CMS yang tertulis di checklist dan
panduan setup sebagai regression test lokal.

## Perubahan

- Menambahkan unit test bahwa sample `siteSettings` hanya berisi entry
  `site-settings`.
- Menambahkan unit test bahwa sample `homepage` hanya berisi entry `homepage`.
- Menambahkan unit test bahwa sample saluran WhatsApp tetap maksimal dua dan
  sample statistik maksimal empat.
- Menambahkan unit test bahwa content type berurutan memakai nilai `order`
  integer positif dan tidak duplikat.
- Memperbarui status/audit agar jumlah unit test terbaru tercatat.

## Verifikasi

- `pnpm test:unit` — 20/20 lulus.

## Catatan

Guard ini membuktikan struktur sample lokal. Status Published pada Contentful
production tetap bergantung pada audit Delivery API dan akses environment.
