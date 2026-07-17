# Runbook Deployment Vercel

## Kondisi produksi yang dituju

- Repository: `github.com/dlmurahweb/dlmurah.com`
- Branch produksi: `main`
- Domain utama: `https://www.dlmurah.com`
- Redirect apex: `https://dlmurah.com` → `https://www.dlmurah.com`
- Framework preset: Next.js
- Install command: `pnpm install`
- Build command: `pnpm build`
- Node.js: 24.x pada project Vercel saat audit

## Environment variables

Tambahkan untuk Production, Preview, dan Development sesuai kebutuhan:

| Variable                          | Production | Preview | Catatan                                   |
| --------------------------------- | ---------- | ------- | ----------------------------------------- |
| `CONTENTFUL_SPACE_ID`             | Wajib      | Wajib   | Space DLMURAH                             |
| `CONTENTFUL_ACCESS_TOKEN`         | Wajib      | Wajib   | Delivery API token                        |
| `CONTENTFUL_PREVIEW_ACCESS_TOKEN` | Opsional   | Wajib   | Preview API token                         |
| `CONTENTFUL_ENVIRONMENT`          | Wajib      | Wajib   | Biasanya `master`                         |
| `CONTENTFUL_LOCALE`               | Wajib      | Wajib   | `id-ID` setelah locale tersedia           |
| `CONTENTFUL_PREVIEW_SECRET`       | Wajib      | Wajib   | Random secret, jangan gunakan ulang       |
| `CONTENTFUL_REVALIDATE_SECRET`    | Wajib      | Wajib   | Random secret khusus webhook              |
| `NEXT_PUBLIC_SITE_URL`            | Wajib      | Sesuai  | `https://www.dlmurah.com` pada Production |

`CONTENTFUL_MANAGEMENT_TOKEN` tidak boleh ditambahkan ke Vercel. Token tersebut
hanya dipakai secara lokal untuk provisioning.

## Deploy melalui Git

1. Pastikan `pnpm install --frozen-lockfile`, lint, type-check, unit test, E2E,
   dan build lulus.
2. Push commit terverifikasi ke `main`.
3. Tunggu deployment Production selesai.
4. Periksa build log; warning fallback Contentful berarti model/token belum siap.
5. Jangan mempromosikan deployment dengan kontak placeholder aktif.

## Contentful webhook

Setelah secret Vercel tersedia, buat webhook Contentful:

- URL: `https://www.dlmurah.com/api/revalidate`
- Method: `POST`
- Trigger: entry/asset publish dan unpublish
- Header: `Authorization: Bearer <CONTENTFUL_REVALIDATE_SECRET>`

Respons `200` menunjukkan cache ditandai kedaluwarsa. Respons `401` berarti
secret salah; `503` berarti secret belum dikonfigurasi di Vercel.

Model cache runtime:

- fetch Contentful server-side memakai tag `contentful` dan revalidation lima
  menit;
- route homepage tidak memakai TTL terpisah;
- webhook yang sah menginvalidasi tag `contentful` dan path `/`;
- perubahan baru terlihat pada request berikutnya setelah invalidation selesai.

## Analytics

Aktifkan **Web Analytics** pada project Vercel. Kode hanya mengirim page view dan
label event yang di-whitelist. Setelah aktif, uji CTA lalu periksa event:

- `hero_cta_click` atau `whatsapp_click`;
- `navigation_click`;
- `channel_click`;
- `faq_interaction`;
- `final_cta_click`.

Jangan menambahkan nomor telepon, prefilled message, atau data transaksi ke
event.

## Verifikasi produksi

```bash
curl -I https://www.dlmurah.com/
curl https://www.dlmurah.com/robots.txt
curl https://www.dlmurah.com/sitemap.xml
```

Kemudian periksa:

- homepage, privacy, terms, dan custom 404;
- canonical dan OG image memakai domain produksi;
- CSP/HSTS/security headers tersedia;
- semua nomor/link nyata dan pesan awal benar;
- mobile 360/390/430 dan desktop;
- tidak ada console error;
- Analytics menerima event tanpa data pribadi.

## Rollback

Jika release bermasalah, buka deployment Production sebelumnya di Vercel lalu
gunakan **Promote to Production**. Setelah rollback, nonaktifkan entry Contentful
yang menyebabkan masalah atau perbaiki konten, kemudian redeploy versi koreksi.

Jangan menghapus deployment lama atau mengubah DNS sebagai langkah rollback
pertama.
