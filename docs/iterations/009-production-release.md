# Iterasi 009 — Production Release

Tanggal: 15 Juli 2026

## Deployment

- GitHub CLI dialihkan ke account owner `dlmurahweb`.
- Commit implementasi dan dokumentasi dipush ke branch `main`.
- Vercel otomatis membangun dan mempromosikan release ke Production.
- `https://dlmurah.com` mengalihkan ke `https://www.dlmurah.com`.
- Homepage baru tersedia melalui HTTPS pada domain utama.

## Koreksi setelah production QA

1. Canonical, robots host, dan sitemap awal memakai apex yang redirect.
   Fallback/default diperbaiki ke primary host `www` pada commit `16b2ad9`.
2. Analytics awal bergantung pada system variable `VERCEL` yang tidak diekspos
   project. Injection diganti dengan production-host detection pada commit
   `e44b4e7`.
3. Playwright config menerima `PLAYWRIGHT_BASE_URL` agar suite yang sama dapat
   dijalankan langsung terhadap produksi.

## Production verification

- Homepage `200`.
- Privacy dan Terms `200`.
- Missing route `404` dengan halaman khusus.
- `robots.txt`, `sitemap.xml`, manifest, dan OG image `200`.
- Canonical dan OG URL memakai `https://www.dlmurah.com`.
- Apex merespons `308` ke `www`.
- CSP, HSTS, COOP, nosniff, frame denial, referrer, dan permissions policy aktif.
- Analytics script terinjeksi pada production host dan merespons `200`.
- Custom interaction masuk ke client queue dengan properti yang di-whitelist.
- Web Analytics project belum aktif, sehingga queue belum dikonsumsi endpoint.
- Preview dan revalidation endpoint merespons `503` karena secret Vercel belum
  dikonfigurasi; keduanya gagal tertutup.
- Fallback menampilkan admin/saluran sebagai tidak aktif dan tidak membentuk
  link WhatsApp placeholder.

## Automated production QA

- Playwright/axe: **19/19 lulus** langsung terhadap domain produksi.
- Lighthouse mobile: Performance **97**, Accessibility **100**, Best Practices
  **100**, SEO **100**.
- Lighthouse desktop: **100/100/100/100**.
- Mobile production: FCP 1.0 s, LCP 2.6 s, Speed Index 1.2 s, TBT 10 ms, CLS 0.
- Desktop production: FCP 0.3 s, LCP 0.6 s, Speed Index 0.5 s, TBT 0 ms, CLS 0.

## Remaining external work

- Provision 11 model Contentful dengan Management token untuk space DLMURAH.
- Isi dan verifikasi nomor admin, URL saluran, serta klaim bisnis.
- Konfigurasi preview/revalidation secret dan Contentful webhook di Vercel.
- Aktifkan Web Analytics pada dashboard Vercel dan konfirmasi event masuk.
- Rotate Management token Contentful yang terekspos pada task log.

Website production sudah aman sebagai pusat informasi, tetapi CTA transaksi
tetap nonaktif sampai data bisnis yang disetujui pemilik dipublikasikan.
