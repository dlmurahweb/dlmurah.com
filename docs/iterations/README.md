# Catatan Iterasi

| Iterasi                                                | Tanggal      | Ringkasan                                                     | Status                              |
| ------------------------------------------------------ | ------------ | ------------------------------------------------------------- | ----------------------------------- |
| [001](./001-phase-1-foundation.md)                     | 15 Juli 2026 | Fondasi Next.js, tema merek, tooling, dan aset logo           | Selesai                             |
| [002](./002-phase-2-contentful.md)                     | 15 Juli 2026 | Model, mapper, fallback, preview, dan revalidation Contentful | Kode selesai; provisioning tertunda |
| [003](./003-phase-3-design-system.md)                  | 15 Juli 2026 | Tombol, primitive merek, card, accordion, drawer, dan state   | Selesai                             |
| [004](./004-phase-4-homepage.md)                       | 15 Juli 2026 | Homepage lengkap, responsif, dan terhubung model Contentful   | Selesai                             |
| [005](./005-phase-5-assets-motion.md)                  | 15 Juli 2026 | Aset transparan, social image, dan motion ambient terkontrol  | Selesai                             |
| [006](./006-phase-6-seo-analytics-policies.md)         | 15 Juli 2026 | Metadata, structured data, analytics, policy, dan route SEO   | Selesai                             |
| [007](./007-phase-7-quality-assurance.md)              | 15 Juli 2026 | Audit, regression test, security headers, dan Lighthouse      | Selesai                             |
| [008](./008-phase-8-deployment-handoff.md)             | 15 Juli 2026 | Runbook, production audit, dan handoff blocker akses          | Lokal selesai; eksternal blocked    |
| [009](./009-production-release.md)                     | 15 Juli 2026 | Deployment, production QA, canonical, dan analytics injection | Deployed; integrations pending      |
| [010](./010-contentful-activation-readiness.md)        | 16 Juli 2026 | Audit credential dan urutan aktivasi integrasi production     | Menunggu akses dan data pemilik     |
| [011](./011-contentful-provisioning-attempt.md)        | 16 Juli 2026 | Provisioning ditolak oleh Contentful dengan token invalid     | Menunggu Management token baru      |
| [012](./012-contentful-provisioned.md)                 | 16 Juli 2026 | Perbaikan SDK error dan provisioning seluruh model/entry      | Selesai; data bisnis tertunda       |
| [013](./013-contentful-production-verification.md)     | 16 Juli 2026 | Deployment dan QA production setelah aktivasi Contentful      | Lulus; integrasi eksternal tertunda |
| [014](./014-isr-contentful-production-audit.md)        | 16 Juli 2026 | Audit dua siklus ISR dan perbedaan data Contentful production | ISR lulus; env Vercel perlu koreksi |
| [015](./015-frontend-design-audit.md)                  | 16 Juli 2026 | Audit frontend production dan roadmap perbaikan P0–P3         | Selesai; remediation belum dimulai  |
| [016](./016-mwtstore-positive-pattern-audit.md)        | 16 Juli 2026 | Audit Playwright pola positif MWTSTORE “How It Works”         | Selesai; referensi prinsip saja     |
| [017](./017-frontend-remediation-pass.md)              | 16 Juli 2026 | Guard kontak, routing CTA, layout responsive, dan regression  | Lokal selesai; eksternal tertunda   |
| [018](./018-cms-ownership-visual-rhythm.md)            | 16 Juli 2026 | Copy section Homepage di CMS dan ritme Keunggulan editorial   | Lokal selesai; eksternal tertunda   |
| [019](./019-cache-ownership-revalidation.md)           | 16 Juli 2026 | Ownership cache Contentful dan kontrak revalidation webhook   | Lokal selesai; eksternal tertunda   |
| [020](./020-interaction-compact-brand-polish.md)       | 16 Juli 2026 | Accordion grid-row dan compact lock mark navigasi             | Lokal selesai; eksternal tertunda   |
| [021](./021-screenshot-regression-baseline.md)         | 16 Juli 2026 | Baseline screenshot regression 390, 1024, dan 1440 px         | Lokal selesai; eksternal tertunda   |
| [022](./022-homepage-microcopy-ownership.md)           | 16 Juli 2026 | Microcopy About, saluran, dan final CTA dikelola Homepage CMS | Lokal selesai; eksternal tertunda   |
| [023](./023-policy-metadata-ownership.md)              | 16 Juli 2026 | Metadata policy disatukan dengan halaman dan regression test  | Lokal selesai; eksternal tertunda   |
| [024](./024-motion-token-consolidation.md)             | 16 Juli 2026 | Easing interaction memakai token shared dan regression test   | Lokal selesai; eksternal tertunda   |
| [025](./025-contentful-force-seed-preservation.md)     | 16 Juli 2026 | Force seed Contentful mempertahankan field tambahan pemilik   | Lokal selesai; eksternal tertunda   |
| [026](./026-current-evidence-refresh.md)               | 16 Juli 2026 | Status dan acceptance audit disesuaikan dengan suite terbaru  | Lokal selesai; eksternal tertunda   |
| [027](./027-structured-data-sentinel-regression.md)    | 16 Juli 2026 | HTML dan JSON-LD dicek agar tidak menerbitkan sentinel kontak | Lokal selesai; eksternal tertunda   |
| [028](./028-faq-section-copy-ownership.md)             | 16 Juli 2026 | Copy framing section FAQ dikelola melalui Homepage CMS        | Lokal selesai; eksternal tertunda   |
| [029](./029-services-eyebrow-ownership.md)             | 16 Juli 2026 | Eyebrow section Layanan dikelola melalui Homepage CMS         | Lokal selesai; eksternal tertunda   |
| [030](./030-contact-cta-label-ownership.md)            | 16 Juli 2026 | Label CTA service/admin card dikelola melalui Homepage CMS    | Lokal selesai; eksternal tertunda   |
| [031](./031-navigation-cta-label-ownership.md)         | 16 Juli 2026 | Label CTA navigasi dikelola Homepage; target tetap code-owned | Lokal selesai; eksternal tertunda   |
| [032](./032-footer-label-ownership.md)                 | 16 Juli 2026 | Label footer global dikelola melalui Site Settings CMS        | Lokal selesai; eksternal tertunda   |
| [033](./033-contact-status-label-ownership.md)         | 16 Juli 2026 | Label fallback status admin dikelola melalui Homepage CMS     | Lokal selesai; eksternal tertunda   |
| [034](./034-content-model-ownership-regression.md)     | 16 Juli 2026 | Regression guard field fallback, model, dan sample seed CMS   | Lokal selesai; eksternal tertunda   |
| [035](./035-sample-data-release-guards.md)             | 16 Juli 2026 | Regression guard sample data tetap aman sebelum verifikasi    | Lokal selesai; eksternal tertunda   |
| [036](./036-repository-format-gate.md)                 | 16 Juli 2026 | Repo-wide Prettier gate diselaraskan dengan release checklist | Lokal selesai; eksternal tertunda   |
| [037](./037-sample-structure-release-guards.md)        | 16 Juli 2026 | Regression guard singleton dan batas koleksi sample CMS       | Lokal selesai; eksternal tertunda   |
| [038](./038-cms-url-safety-regression.md)              | 16 Juli 2026 | Regression guard URL CMS hanya anchor, internal path, HTTPS   | Lokal selesai; eksternal tertunda   |
| [039](./039-analytics-privacy-regression.md)           | 16 Juli 2026 | Regression guard whitelist analytics dan larangan data privat | Lokal selesai; eksternal tertunda   |
| [040](./040-rich-text-safety-regression.md)            | 16 Juli 2026 | Regression guard Rich Text tidak merender HTML arbitrer       | Lokal selesai; eksternal tertunda   |
| [041](./041-secret-compare-regression.md)              | 16 Juli 2026 | Regression guard perbandingan secret endpoint tidak throw     | Lokal selesai; eksternal tertunda   |
| [042](./042-preview-redirect-regression.md)            | 16 Juli 2026 | Regression guard preview redirect hanya path internal         | Lokal selesai; eksternal tertunda   |
| [043](./043-runtime-token-boundary-regression.md)      | 16 Juli 2026 | Regression guard Management token tidak masuk runtime/client  | Lokal selesai; eksternal tertunda   |
| [044](./044-contentful-setup-redaction-regression.md)  | 16 Juli 2026 | Regression guard error setup Contentful meredaksi token       | Lokal selesai; eksternal tertunda   |
| [045](./045-revalidation-secret-header-regression.md)  | 16 Juli 2026 | Regression guard header secret webhook revalidation           | Lokal selesai; eksternal tertunda   |
| [046](./046-anchor-scroll-offset-regression.md)        | 16 Juli 2026 | Regression guard offset anchor terhadap sticky header         | Lokal selesai; eksternal tertunda   |
| [047](./047-contentful-preview-delivery-boundary.md)   | 16 Juli 2026 | Regression guard boundary Preview dan Delivery Contentful     | Lokal selesai; eksternal tertunda   |
| [048](./048-runtime-contentful-log-redaction.md)       | 16 Juli 2026 | Regression guard redaction log fallback Contentful runtime    | Lokal selesai; eksternal tertunda   |
| [049](./049-contentful-component-boundary.md)          | 16 Juli 2026 | Regression guard komponen tidak menerima object Contentful    | Lokal selesai; eksternal tertunda   |
| [050](./050-client-component-surface-regression.md)    | 16 Juli 2026 | Regression guard surface komponen client tetap terbatas       | Lokal selesai; eksternal tertunda   |
| [051](./051-mobile-sheet-focus-regression.md)          | 16 Juli 2026 | Regression guard focus kembali setelah drawer mobile ditutup  | Lokal selesai; eksternal tertunda   |
| [052](./052-eslint-generated-artifact-ignores.md)      | 16 Juli 2026 | ESLint mengabaikan artefak generated QA lokal                 | Lokal selesai; eksternal tertunda   |
| [053](./053-owner-guide-field-inventory-regression.md) | 16 Juli 2026 | Owner guide mencakup field CMS dan alur preview               | Lokal selesai; eksternal tertunda   |
| [054](./054-policy-channel-state-regression.md)        | 16 Juli 2026 | Regression guard measure policy dan fallback channel nonaktif | Lokal selesai; eksternal tertunda   |
| [055](./055-color-contrast-token-regression.md)        | 17 Juli 2026 | Regression guard kontras token cyan action dan focus          | Lokal selesai; eksternal tertunda   |
| [056](./056-fine-pointer-button-hover.md)              | 17 Juli 2026 | Hover lift tombol dibatasi pada fine pointer                  | Lokal selesai; eksternal tertunda   |

Tambahkan satu baris saat iterasi baru ditutup. Bila satu fase membutuhkan
beberapa iterasi, gunakan nomor terpisah agar keputusan dan verifikasi tidak
tercampur.
