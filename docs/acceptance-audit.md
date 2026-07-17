# Acceptance Criteria Audit

Tanggal audit: 17 Juli 2026

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
- Snapshot Production Playwright 19/19 lulus sebelum remediation lokal terbaru.
- Suite lokal setelah remediation mencakup 55 unit test dan 33
  E2E/accessibility/responsive/visual regression test.
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

- Commit runtime produksi: `01fcfba`.
- `pnpm install --frozen-lockfile` lulus pada baseline release.
- `pnpm format:check`, `pnpm lint`, `pnpm type-check`, `pnpm test:unit`, dan
  `pnpm build` lulus pada remediation lokal terbaru.
- Playwright lokal 33/33 lulus, termasuk visual regression pada 390, 1024, dan
  1440 px serta regression offset anchor internal terhadap sticky header dan
  focus return drawer mobile setelah `Escape`, readable measure policy, serta
  fallback action channel nonaktif.
- Playwright produksi snapshot 19/19 lulus sebelum remediation lokal terbaru.
- Unit test 55/55 lulus, termasuk regresi error Contentful SDK, guard nomor
  WhatsApp, token motion, merge force seed Contentful, dan sinkronisasi field
  fallback/model/sample CMS, serta keamanan sample data sebelum verifikasi
  pemilik, struktur singleton/koleksi sample, sanitasi URL CMS, dan whitelist
  analytics tanpa data privat, renderer Rich Text tanpa HTML arbitrer, serta
  perbandingan secret endpoint, redirect preview internal-only, dan boundary
  token runtime/client, redaction error setup Contentful, serta header secret
  revalidation, boundary Preview/Delivery Contentful, serta redaction log
  fallback runtime Contentful, serta boundary komponen dari object Contentful
  mentah, surface komponen client terbatas, serta inventory field owner guide
  dan path preview Contentful, kontras token cyan action/focus, serta hover lift
- Delivery API mengembalikan seluruh 11 content type Published sesuai sample
  dataset pada audit production sebelumnya.
- Lighthouse produksi mobile 97/100/100/100; desktop 100/100/100/100.
