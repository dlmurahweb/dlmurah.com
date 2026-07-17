# Iterasi 047 — Boundary Preview dan Delivery Contentful

Tanggal: 16 Juli 2026

## Tujuan

Memperkuat acceptance P1-02 bahwa mode preview tetap terpisah dari Delivery API
dan tidak memakai cache revalidation production.

## Hasil

- Request-shaping Contentful dipindahkan ke helper murni
  `createContentfulRequestConfig`.
- Delivery request memakai host `cdn.contentful.com`, Delivery token, tag cache
  `contentful`, dan revalidation lima menit.
- Preview request memakai host `preview.contentful.com`, Preview token, dan
  `cache: "no-store"` tanpa `next.revalidate`.
- Client server-only tetap menjadi pemanggil runtime, sementara helper murni
  dapat diuji tanpa membuka boundary server/client.

## Verifikasi

- `pnpm exec tsx --test tests/unit/contentful-request.test.ts` — 2/2 lulus.

## Pekerjaan tersisa

- Uji preview production tetap membutuhkan secret preview pada Vercel dan token
  Preview API production.
