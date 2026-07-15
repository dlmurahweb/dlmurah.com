# Status Proyek DLMURAH

Terakhir diperbarui: 15 Juli 2026

## Ringkasan fase

| Fase                         | Status                              | Bukti utama                                                                                   |
| ---------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------- |
| 1 — Project Setup            | Selesai                             | [`001-phase-1-foundation.md`](./iterations/001-phase-1-foundation.md)                         |
| 2 — Contentful Setup         | Kode selesai; provisioning tertunda | [`002-phase-2-contentful.md`](./iterations/002-phase-2-contentful.md)                         |
| 3 — Design System            | Selesai                             | [`003-phase-3-design-system.md`](./iterations/003-phase-3-design-system.md)                   |
| 4 — Homepage Sections        | Selesai                             | [`004-phase-4-homepage.md`](./iterations/004-phase-4-homepage.md)                             |
| 5 — Assets and Animation     | Selesai                             | [`005-phase-5-assets-motion.md`](./iterations/005-phase-5-assets-motion.md)                   |
| 6 — SEO, Analytics, Policies | Selesai                             | [`006-phase-6-seo-analytics-policies.md`](./iterations/006-phase-6-seo-analytics-policies.md) |
| 7 — Quality Assurance        | Selesai                             | [`007-phase-7-quality-assurance.md`](./iterations/007-phase-7-quality-assurance.md)           |
| 8 — Deployment               | Belum dimulai                       | Belum tersedia                                                                                |

## Kondisi saat ini

- Branch aktif: `main`.
- Baseline Phase 1 telah tersimpan pada commit `60a1ac4`.
- Instalasi bersih dengan pnpm 11.5.3 berhasil.
- Build produksi Next.js 16.2.10 berhasil.
- Metadata dinamis, JSON-LD, social cards, robots, sitemap, manifest, policy
  pages, 404, dan event analytics telah tersedia.
- Empat unit test dan 19 E2E/accessibility/responsive test tersedia.
- Lighthouse final: mobile 90/100/100/100 dan desktop 100/100/100/100.
- Konfigurasi `allowBuilds` untuk `sharp` dan `unrs-resolver` telah diperbaiki.
- Delivery dan Preview token tersedia pada environment lokal, tetapi content
  model belum ada pada space (`unknownContentType`).
- Management token, preview secret, dan revalidation secret belum tersedia;
  secret tidak boleh disimpan di Git.

## Hambatan eksternal yang mungkin memerlukan pemilik

- Kredensial Contentful untuk membuat model/entry pada space produksi.
- Nomor WhatsApp, tautan saluran, statistik, dan klaim bisnis yang disetujui.
- Akses Vercel/GitHub bila verifikasi deployment tidak dapat dilakukan melalui
  sesi lokal.
- Aktivasi Web Analytics pada project Vercel.
- Domain dan DNS final.

Pekerjaan lokal yang tidak membutuhkan akses tersebut tetap dilanjutkan dengan
fallback yang aman dan tooling provisioning yang dapat dijalankan ulang.
