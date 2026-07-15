# Acceptance Criteria Audit

Tanggal audit: 15 Juli 2026

## Lulus pada kode dan produksi

- Responsive mobile, tablet, dan desktop pada seluruh breakpoint target.
- Service/admin/channel model dan mapping bertipe tersedia.
- WhatsApp URL dinormalisasi, message di-encode, dan admin nonaktif tidak
  menghasilkan link.
- Desain custom menggunakan logo, bentuk angular, kristal, dan ilustrasi
  brankas orisinal.
- Tidak menggunakan screenshot, karakter, UI, atau aset game Growtopia.
- Disclaimer independen tersedia pada homepage dan policy pages.
- Metadata, canonical, OG/Twitter image, JSON-LD, robots, sitemap, dan manifest
  tersedia.
- Event analytics tersedia tanpa nomor, isi pesan, atau detail transaksi.
- axe WCAG 2.1 A/AA lulus tanpa violation.
- Tidak ada console error atau broken image pada build lokal.
- Production build berhasil.
- Lighthouse memenuhi target proyek.
- Panduan CMS dan deployment tersedia.
- Release baru tersedia di `https://www.dlmurah.com` dengan SSL dan redirect
  apex yang benar.
- Production Playwright 19/19 lulus.

## Menunggu akses/data eksternal

| Kriteria                                                  | Status  | Kebutuhan untuk selesai                               |
| --------------------------------------------------------- | ------- | ----------------------------------------------------- |
| Content model tersedia pada space produksi                | Blocked | Management token yang memiliki akses ke space DLMURAH |
| Pemilik dapat mengubah nomor/link melalui Contentful      | Blocked | Provisioning model lalu uji publish                   |
| Nomor admin nyata dan prefilled message produksi          | Blocked | Data bisnis terverifikasi pemilik                     |
| Saluran WhatsApp produksi                                 | Blocked | URL saluran resmi pemilik                             |
| Setiap layanan menuju admin produksi yang benar           | Blocked | Konfirmasi mapping setelah kontak nyata dimasukkan    |
| Environment Vercel dan webhook revalidation terverifikasi | Blocked | Akses project Vercel `dlmurahweb`                     |
| Web Analytics menerima event produksi                     | Blocked | Aktifkan Web Analytics pada project Vercel            |

Catatan keamanan: Management token pada sesi Contentful CLI harus dirotasi
sebelum digunakan kembali karena sempat tampil pada task execution log. Token
tersebut tidak memiliki akses ke space DLMURAH, tetapi tetap harus dianggap
terekspos.

Fallback sengaja tidak mengaktifkan nomor atau saluran placeholder. Karena itu,
release produksi aman untuk ditampilkan, tetapi belum dapat menerima transaksi
sampai data bisnis yang disetujui pemilik tersedia.

## Bukti verifikasi

- Commit runtime produksi: `e44b4e7`.
- `pnpm install --frozen-lockfile` — lulus.
- `pnpm format:check`, lint, type-check, unit, build — lulus.
- Playwright lokal dan produksi — 19/19 lulus.
- Unit WhatsApp — 4/4 lulus.
- Lighthouse produksi mobile 97/100/100/100; desktop 100/100/100/100.
