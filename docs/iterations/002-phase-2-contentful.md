# Iterasi 002 — Integrasi Contentful

Tanggal: 15 Juli 2026

## Tujuan

Menyediakan arsitektur Contentful yang bertipe, aman, dapat diprovisikan ulang,
memiliki fallback, dan kompatibel dengan caching Next.js 16.

## Hasil

- 11 content model didefinisikan dengan label editor Bahasa Indonesia dan API
  ID Inggris yang stabil.
- Script `pnpm contentful:setup` membuat locale, model, dan sample entry secara
  idempotent.
- Entry milik pemilik tidak ditimpa kecuali `CONTENTFUL_FORCE_SEED=true`.
- Admin dan saluran sample selalu nonaktif dan tidak menghasilkan CTA aktif.
- Delivery API menggunakan server-side `fetch`, cache tag, dan revalidation 300
  detik.
- Preview API menggunakan `cache: no-store`.
- Mapper memisahkan objek mentah Contentful dari model frontend.
- URL eksternal dibatasi ke HTTPS; anchor dan path internal tetap didukung.
- Rich Text divalidasi sebagai dokumen Contentful, bukan HTML arbitrer.
- Preview route dan disable route ditambahkan.
- Webhook revalidation menggunakan POST, secret, constant-time comparison,
  `revalidateTag`, dan `revalidatePath`.
- Homepage membaca data Contentful atau fallback melalui Server Component.

## File utama

- `scripts/contentful/model-definitions.ts`
- `scripts/contentful/sample-entries.ts`
- `scripts/contentful/setup.ts`
- `src/contentful/client.ts`
- `src/contentful/queries.ts`
- `src/contentful/mappers.ts`
- `src/contentful/fallback.ts`
- `src/types/contentful.ts`
- `src/types/site.ts`
- `src/app/api/preview/route.ts`
- `src/app/api/preview/disable/route.ts`
- `src/app/api/revalidate/route.ts`
- `docs/contentful-setup.md`

## Verifikasi

- `pnpm format` — lulus.
- `pnpm lint` — lulus tanpa warning.
- `pnpm type-check` — lulus dalam strict mode.
- `pnpm build` — lulus; homepage memiliki revalidation lima menit dan tiga
  route API dinamis.
- Delivery API yang dikonfigurasi mengembalikan error tersanitasi
  `InvalidQuery / unknownContentType`; website beralih ke fallback tanpa gagal
  build.

## Keputusan penting

- Tidak menggunakan `unstable_cache` karena dokumentasi Next.js 16 menyatakan
  API tersebut telah digantikan. Cached `fetch` digunakan untuk Contentful.
- Runtime locale bersifat opsional agar space lama tetap dapat menggunakan
  locale default. Provisioning tetap membuat `id-ID` dengan fallback.
- Management token hanya digunakan oleh tooling lokal dan tidak masuk runtime.

## Pekerjaan eksternal tertunda

`CONTENTFUL_MANAGEMENT_TOKEN` belum tersedia, sehingga model dan sample entry
belum dapat dibuat pada space nyata. Setelah token tersedia, jalankan
`pnpm contentful:setup`, isi nomor/URL nyata, lalu aktifkan entry terkait.

## Pekerjaan berikutnya

Phase 3: komponen desain, tombol, frame angular, icon resolver, card primitives,
dan state loading/empty.
