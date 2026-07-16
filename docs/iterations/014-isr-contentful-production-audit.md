# Iterasi 014 — Audit ISR dan Contentful Production

Tanggal: 16 Juli 2026

## Contentful

- Delivery API lokal mengembalikan ketiga admin dengan `isActive=true`.
- Preview API mengembalikan state aktif yang sama.
- Ketiga nomor mempunyai 12 digit dan lulus validasi link WhatsApp.
- Perubahan telah Published, bukan hanya draft.
- Nilai nomor dan token tidak dicetak pada audit.

## ISR Vercel

Homepage mempunyai konfigurasi route `revalidate = 300`, sementara request
Contentful memakai `next.revalidate = 300` dan tag `contentful`.

Observasi dua siklus production:

1. Cache berubah dari `HIT` menjadi `STALE` setelah usia melewati 300 detik.
2. Request berikutnya kembali `HIT` dengan usia cache direset ke sekitar 9 detik.
3. Kedua hasil regenerasi masih mempunyai nol link `wa.me`.

Ini membuktikan time-based ISR berjalan pada Vercel, tetapi runtime production
tidak membaca data Contentful yang sama dengan environment lokal.

## Controlled rebuild

- Audit dokumentasi dipush pada commit `6d0ea52` untuk memicu build baru tanpa
  mengubah application logic.
- Vercel menyelesaikan deployment dengan status `success`.
- Request pertama pada deployment baru merespons `x-vercel-cache: PRERENDER`
  dan `age: 0`.
- HTML prerender baru masih mempunyai nol link `wa.me`.

Karena build baru juga menghasilkan state fallback, penyebabnya dipastikan
berada pada environment variable Contentful Vercel yang hilang, salah, atau
tidak diterapkan ke scope Production—bukan pada cache lama.

## On-demand revalidation

Route `POST /api/revalidate` tersedia dan menginvalidasi tag serta homepage.
Endpoint production masih merespons `503` karena
`CONTENTFUL_REVALIDATE_SECRET` belum dikonfigurasi pada project Vercel. Webhook
Contentful belum dapat digunakan sampai secret tersebut tersedia.

## Tindakan berikutnya

Verifikasi dan tambahkan environment variable berikut pada Vercel Production,
lalu redeploy:

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_ENVIRONMENT=master`
- `CONTENTFUL_LOCALE=id-ID`
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN`
- `CONTENTFUL_PREVIEW_SECRET`
- `CONTENTFUL_REVALIDATE_SECRET`
- `NEXT_PUBLIC_SITE_URL=https://www.dlmurah.com`

`CONTENTFUL_MANAGEMENT_TOKEN` hanya untuk provisioning lokal dan tidak boleh
ditambahkan ke Vercel.
