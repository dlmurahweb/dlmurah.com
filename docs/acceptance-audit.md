# Acceptance Criteria Audit

Tanggal audit: 16 Juli 2026

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
- Sebelas content model dan sample entry tersedia serta Published pada space
  Contentful DLMURAH.
- Owner dapat mengubah nomor, link, layanan, statistik, dan konten melalui model
  Contentful yang telah diprovisikan.

## Menunggu akses/data eksternal

| Kriteria                                                  | Status  | Kebutuhan untuk selesai                            |
| --------------------------------------------------------- | ------- | -------------------------------------------------- |
| Nomor admin nyata dan prefilled message produksi          | Blocked | Data bisnis terverifikasi pemilik                  |
| Saluran WhatsApp produksi                                 | Blocked | URL saluran resmi pemilik                          |
| Setiap layanan menuju admin produksi yang benar           | Blocked | Konfirmasi mapping setelah kontak nyata dimasukkan |
| Environment Vercel dan webhook revalidation terverifikasi | Blocked | Akses project Vercel `dlmurahweb`                  |
| Web Analytics menerima event produksi                     | Blocked | Aktifkan Web Analytics pada project Vercel         |

Catatan keamanan: bila Management token yang baru diberi akses adalah token yang
pernah tampil pada task execution log, token tersebut harus segera dirotasi.
Provisioning sudah selesai sehingga Management token tidak diperlukan oleh
runtime website.

Fallback sengaja tidak mengaktifkan nomor atau saluran placeholder. Karena itu,
release produksi aman untuk ditampilkan, tetapi belum dapat menerima transaksi
sampai data bisnis yang disetujui pemilik tersedia.

## Bukti verifikasi

- Commit runtime produksi: `e44b4e7`.
- `pnpm install --frozen-lockfile` — lulus.
- `pnpm format:check`, lint, type-check, unit, build — lulus.
- Playwright lokal dan produksi — 19/19 lulus.
- Unit test — 7/7 lulus, termasuk regresi error Contentful SDK.
- Delivery API — seluruh 11 content type mengembalikan entry Published sesuai
  sample dataset.
- Lighthouse produksi mobile 97/100/100/100; desktop 100/100/100/100.
