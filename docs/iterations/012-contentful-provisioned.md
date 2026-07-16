# Iterasi 012 — Contentful Berhasil Diprovisikan

Tanggal: 16 Juli 2026

## Perbaikan tooling

Contentful Management SDK mengembalikan sebagian error sebagai JSON di dalam
`Error.message`. Deteksi `404` sebelumnya hanya membaca properti top-level,
sehingga content type yang belum ada dianggap sebagai kegagalan fatal.

- Deteksi error dipindahkan ke helper `isContentfulNotFound`.
- Helper menerima status top-level, `response.status`, `sys.id`, dan JSON pada
  `Error.message`.
- Tiga regression test mencakup bentuk SDK yang ditemukan dan negative cases.

## Provisioning

- Locale `id-ID` tersedia pada environment `master`.
- Sebelas content model dibuat dan dipublikasikan.
- Site Settings dan Homepage single-entry dibuat dan dipublikasikan.
- Lima navigation item, tiga admin, empat layanan, dua saluran, tiga statistik,
  empat langkah, tiga feature, lima FAQ, dan satu announcement dipublikasikan.
- Admin dan saluran placeholder tetap nonaktif.
- Delivery API memverifikasi seluruh content type dan jumlah entry terbit.

## Verifikasi

- `pnpm test:unit` — 7/7 lulus.
- `pnpm lint` — lulus.
- `pnpm type-check` — lulus.
- `pnpm build` — lulus dan homepage tetap menggunakan revalidation lima menit.

## Pekerjaan tersisa

- Masukkan nomor admin, pesan awal, URL saluran, dan klaim bisnis terverifikasi.
- Dapatkan akses project Vercel `dlmurahweb` untuk konfigurasi secret dan
  webhook.
- Aktifkan Web Analytics dan verifikasi event production.
- Jalankan production QA ulang setelah CTA nyata diaktifkan.

Bila token yang digunakan adalah token yang pernah terekspos, revoke dan rotate
token tersebut sekarang. Management token tidak dibutuhkan oleh runtime Vercel.
