# Iterasi 049 — Boundary Component Contentful

Tanggal: 16 Juli 2026

## Tujuan

Mengunci acceptance P2-01 bahwa object mentah Contentful tidak masuk ke
komponen React. Komponen UI harus menerima model frontend dari `src/types/site`,
sedangkan mapping `fields`, `sys`, asset, dan collection tetap berada pada
boundary `src/contentful`.

## Hasil

- Menambahkan regression test yang memindai `src/components`.
- Test memastikan komponen tidak mengimpor module/type Contentful mentah.
- Test memastikan komponen tidak mereferensikan shape
  `ContentfulEntry`/`ContentfulCollection`.

## Verifikasi

- `pnpm exec tsx --test tests/unit/contentful-component-boundary.test.ts` —
  2/2 lulus.

## Pekerjaan tersisa

- Tidak ada pekerjaan lokal khusus untuk boundary komponen Contentful.
- Perubahan model production tetap membutuhkan provisioning dan audit Contentful
  setelah data bisnis final tersedia.
