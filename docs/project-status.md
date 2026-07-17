# Status Proyek DLMURAH

Terakhir diperbarui: 17 Juli 2026

## Ringkasan fase

| Fase                         | Status                              | Bukti utama                                                                                   |
| ---------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------- |
| 1 — Project Setup            | Selesai                             | [`001-phase-1-foundation.md`](./iterations/001-phase-1-foundation.md)                         |
| 2 — Contentful Setup         | Provisioning selesai; data tertunda | [`012-contentful-provisioned.md`](./iterations/012-contentful-provisioned.md)                 |
| 3 — Design System            | Selesai                             | [`003-phase-3-design-system.md`](./iterations/003-phase-3-design-system.md)                   |
| 4 — Homepage Sections        | Selesai                             | [`004-phase-4-homepage.md`](./iterations/004-phase-4-homepage.md)                             |
| 5 — Assets and Animation     | Selesai                             | [`005-phase-5-assets-motion.md`](./iterations/005-phase-5-assets-motion.md)                   |
| 6 — SEO, Analytics, Policies | Selesai                             | [`006-phase-6-seo-analytics-policies.md`](./iterations/006-phase-6-seo-analytics-policies.md) |
| 7 — Quality Assurance        | Selesai                             | [`007-phase-7-quality-assurance.md`](./iterations/007-phase-7-quality-assurance.md)           |
| 8 — Deployment               | Production live; integrasi tertunda | [`009-production-release.md`](./iterations/009-production-release.md)                         |

## Kondisi saat ini

- Branch aktif: `main`.
- Baseline Phase 1 telah tersimpan pada commit `60a1ac4`.
- Instalasi bersih dengan pnpm 11.5.3 berhasil.
- Build produksi Next.js 16.2.10 berhasil.
- Metadata dinamis, JSON-LD, social cards, robots, sitemap, manifest, policy
  pages, 404, dan event analytics telah tersedia.
- Lima puluh lima unit test dan 33 E2E/accessibility/responsive/visual regression
  test tersedia pada suite lokal.
- Lighthouse produksi: mobile 97/100/100/100 dan desktop 100/100/100/100.
- Production release tersedia di `https://www.dlmurah.com`; snapshot Playwright
  produksi terakhir 19/19 lulus sebelum remediation lokal 017-025.
- Konfigurasi `allowBuilds` untuk `sharp` dan `unrs-resolver` telah diperbaiki.
- Sebelas content model dan seluruh sample entry telah dibuat dan dipublikasikan
  pada environment Contentful `master`.
- Delivery API memverifikasi jumlah entry terbit untuk seluruh content type.
- Admin dan saluran sample tetap nonaktif sampai data bisnis nyata diverifikasi.
- Remediation frontend lokal untuk guard kontak sentinel, routing CTA generik,
  layout responsive, state channel nonaktif, dan regression test telah selesai
  pada Iterasi 017.
- Copy bisnis section Homepage tambahan kini dapat dikelola melalui Contentful
  dengan fallback aman, dan section Keunggulan memakai ritme editorial pada
  Iterasi 018.
- Ownership cache lokal disederhanakan pada Iterasi 019: fetch Contentful
  memegang revalidation lima menit dan webhook menginvalidasi tag `contentful`
  serta path `/`.
- Accordion FAQ dan branding compact navigasi dipoles pada Iterasi 020 tanpa
  menambah JavaScript client baru.
- Baseline screenshot regression lokal untuk 390, 1024, dan 1440 px dibuat
  pada Iterasi 021; Playwright E2E kini 31 test.
- Sisa microcopy About, saluran, dan final CTA kini dimiliki field Homepage CMS
  pada Iterasi 022.
- Metadata policy repository-owned kini disatukan pada `src/lib/policies.ts`
  dan diuji pada Iterasi 023.
- Easing interaction utama kini memakai token `--ease-out-quart` bersama dan
  dijaga regression unit test pada Iterasi 024.
- Force seed Contentful kini menggabungkan field sample tanpa menghapus field
  tambahan pemilik pada Iterasi 025.
- Bukti status dan acceptance audit kini membedakan snapshot production lama
  dari suite lokal terbaru pada Iterasi 026.
- Regression E2E metadata kini memeriksa raw HTML dan JSON-LD agar sentinel
  kontak tidak dipublikasikan pada Iterasi 027.
- Copy framing section FAQ kini dimiliki field Homepage CMS pada Iterasi 028.
- Eyebrow section Layanan kini dimiliki field Homepage CMS pada Iterasi 029.
- Label CTA service/admin card dan label kontak tidak aktif kini dimiliki field
  Homepage CMS pada Iterasi 030.
- Label CTA navigasi header/mobile kini dimiliki field Homepage CMS pada
  Iterasi 031, sementara target tetap `#pilih-admin`.
- Heading, label policy, dan suffix state tidak aktif footer kini dimiliki field
  Site Settings CMS pada Iterasi 032.
- Label fallback status admin aktif/tidak aktif kini dimiliki field Homepage
  CMS pada Iterasi 033.
- Regression unit test kini menjaga field Homepage/Site Settings fallback tetap
  terdaftar pada model dan sample seed Contentful pada Iterasi 034.
- Regression unit test kini menjaga content type sample punya model, kontak dan
  saluran sample tetap nonaktif, serta service sample hanya mereferensikan admin
  seed yang tersedia pada Iterasi 035.
- Release gate `pnpm format:check` kini lulus repo-wide setelah normalisasi
  Prettier pada Iterasi 036.
- Regression unit test kini menjaga singleton Homepage/Site Settings, batas
  jumlah saluran/statistik sample, dan order positif unik pada Iterasi 037.
- Regression unit test kini menjaga URL dari CMS hanya menerima anchor, path
  internal, atau HTTPS pada mapper Contentful pada Iterasi 038.
- Event analytics kini memakai whitelist event/properti bersama dan regression
  test menjaga atribut analytics tidak membawa nomor, URL, pesan awal, atau data
  transaksi pada Iterasi 039.
- Renderer Rich Text kini memiliki regression test untuk escape teks HTML,
  sanitasi link, dan penolakan embedded asset/entry pada Iterasi 040.
- Perbandingan secret endpoint kini dipisah menjadi helper murni yang teruji dan
  wrapper server-only tetap dipakai oleh route pada Iterasi 041.
- Preview redirect kini memakai helper teruji yang hanya menerima path internal
  dan menolak URL eksternal/protocol-relative pada Iterasi 042.
- Runtime token boundary kini dijaga regression test agar Management token tidak
  masuk source aplikasi, env runtime, atau client component pada Iterasi 043.
- Error setup Contentful kini memakai helper redaction teruji untuk bearer,
  field token, dan query token pada Iterasi 044.
- Header secret webhook revalidation kini memakai helper murni teruji untuk
  Bearer auth dan header Contentful pada Iterasi 045.
- Target anchor internal kini punya offset sticky header bersama dan regression
  E2E memverifikasi scroll margin target pada Iterasi 046.
- Boundary request Contentful Preview/Delivery kini dijaga helper murni dan unit
  test agar host, token, dan cache mode tidak tertukar pada Iterasi 047.
- Log fallback Contentful runtime kini memakai helper redaction bersama agar
  token dan secret tidak tercetak pada Iterasi 048.
- Boundary komponen React kini dijaga regression test agar tidak mengimpor atau
  mereferensikan object mentah Contentful pada Iterasi 049.
- Surface komponen client kini dijaga allowlist regression test agar polish
  tidak menambah JavaScript client tanpa review pada Iterasi 050.
- Drawer mobile kini memiliki regression E2E yang memastikan fokus kembali ke
  trigger menu setelah ditutup dengan `Escape` pada Iterasi 051.
- ESLint kini mengabaikan artefak generated QA lokal (`coverage`,
  `playwright-report`, `test-results`) agar release gate stabil pada Iterasi 052.
- Owner guide kini memuat inventory field CMS dan alur preview yang dijaga
  regression test terhadap model Contentful pada Iterasi 053.
- Policy measure dan fallback channel nonaktif kini dijaga regression E2E pada
  Iterasi 054.
- Kontras token cyan untuk action, focus, dan tombol primer kini dijaga
  regression unit test pada Iterasi 055.
- Hover lift tombol kini hanya aktif pada fine pointer dan dijaga regression
  unit test pada Iterasi 056.
- Preview/revalidation secret belum tersedia pada project Vercel; secret tidak
  boleh disimpan di Git.

## Hambatan eksternal yang mungkin memerlukan pemilik

- Nomor WhatsApp, tautan saluran, statistik, dan klaim bisnis yang disetujui.
- Akses project Vercel untuk preview/revalidation secret dan webhook.
- Aktivasi Web Analytics pada project Vercel.

Pekerjaan lokal yang tidak membutuhkan akses tersebut tetap dilanjutkan dengan
fallback yang aman dan tooling provisioning yang dapat dijalankan ulang.
