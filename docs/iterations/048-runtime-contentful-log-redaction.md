# Iterasi 048 — Redaction Log Runtime Contentful

Tanggal: 16 Juli 2026

## Tujuan

Mengunci janji audit bahwa log Contentful tidak mencetak token, secret, atau
kredensial bila aplikasi beralih ke fallback.

## Hasil

- Menambahkan helper bersama `redactSecretValues` untuk nilai bearer, token,
  access token, dan secret.
- Tooling setup Contentful tetap memakai `redactContentfulErrorMessage`, tetapi
  implementasinya kini berbagi helper dengan runtime aplikasi.
- Runtime `getHomePageData` meredaksi pesan error sebelum menulis log fallback
  Contentful.
- Regression test menambahkan kasus secret JSON-like agar preview/revalidation
  secret ikut terlindungi.

## Verifikasi

- `pnpm exec tsx --test tests/unit/contentful-redaction.test.ts` — 4/4 lulus.

## Pekerjaan tersisa

- Audit log production tetap perlu dilakukan setelah preview/revalidation secret
  dan webhook production dikonfigurasi.
