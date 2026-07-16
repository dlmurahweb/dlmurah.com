# Release Checklist DLMURAH

## Kode

- [x] `pnpm install --frozen-lockfile`
- [x] `pnpm format:check`
- [x] `pnpm lint`
- [x] `pnpm type-check`
- [x] `pnpm test:unit`
- [x] `pnpm build`
- [x] `pnpm test:e2e`

## Contentful

- [x] 11 content model telah diprovisikan
- [x] Homepage dan Site Settings hanya memiliki satu entry aktif
- [ ] Nomor admin nyata sudah diverifikasi
- [x] Admin placeholder tetap nonaktif
- [ ] Layanan mereferensikan admin yang benar
- [ ] Saluran memakai URL HTTPS resmi
- [ ] Statistik/klaim disetujui pemilik
- [x] Semua entry yang dipakai sudah Published
- [ ] Webhook revalidation merespons 200

## Vercel dan domain

- [ ] Environment variables Production lengkap
- [x] `NEXT_PUBLIC_SITE_URL=https://www.dlmurah.com`
- [x] Production deployment sukses
- [x] Apex redirect ke `www`
- [x] SSL valid
- [ ] Web Analytics aktif
- [x] Domain deployment protection tidak menghalangi publik

## QA produksi

- [x] Homepage 200
- [x] Privacy dan Terms 200
- [x] Missing route 404 dengan desain khusus
- [x] `robots.txt` dan `sitemap.xml` valid
- [x] Canonical/OG/Twitter memakai domain produksi
- [x] Seluruh navigation anchor bekerja
- [ ] Semua CTA WhatsApp membuka admin yang benar
- [ ] Prefilled message benar
- [x] Admin nonaktif tidak memiliki link
- [ ] Saluran WhatsApp benar
- [x] Tidak ada broken image atau console error
- [x] Keyboard drawer/FAQ/focus states bekerja
- [x] Reduced motion bekerja
- [x] Mobile 360, 390, 430 tidak overflow
- [x] Lighthouse mencapai target proyek

Release hanya dapat dinyatakan selesai bila item yang membutuhkan data bisnis
dan akses eksternal telah dikonfirmasi pemilik.
