# Release Checklist DLMURAH

## Kode

- [ ] `pnpm install --frozen-lockfile`
- [ ] `pnpm format:check`
- [ ] `pnpm lint`
- [ ] `pnpm type-check`
- [ ] `pnpm test:unit`
- [ ] `pnpm build`
- [ ] `pnpm test:e2e`

## Contentful

- [ ] 11 content model telah diprovisikan
- [ ] Homepage dan Site Settings hanya memiliki satu entry aktif
- [ ] Nomor admin nyata sudah diverifikasi
- [ ] Admin placeholder tetap nonaktif
- [ ] Layanan mereferensikan admin yang benar
- [ ] Saluran memakai URL HTTPS resmi
- [ ] Statistik/klaim disetujui pemilik
- [ ] Semua entry yang dipakai sudah Published
- [ ] Webhook revalidation merespons 200

## Vercel dan domain

- [ ] Environment variables Production lengkap
- [ ] `NEXT_PUBLIC_SITE_URL=https://www.dlmurah.com`
- [ ] Production deployment sukses
- [ ] Apex redirect ke `www`
- [ ] SSL valid
- [ ] Web Analytics aktif
- [ ] Domain deployment protection tidak menghalangi publik

## QA produksi

- [ ] Homepage 200
- [ ] Privacy dan Terms 200
- [ ] Missing route 404 dengan desain khusus
- [ ] `robots.txt` dan `sitemap.xml` valid
- [ ] Canonical/OG/Twitter memakai domain produksi
- [ ] Seluruh navigation anchor bekerja
- [ ] Semua CTA WhatsApp membuka admin yang benar
- [ ] Prefilled message benar
- [ ] Admin nonaktif tidak memiliki link
- [ ] Saluran WhatsApp benar
- [ ] Tidak ada broken image atau console error
- [ ] Keyboard drawer/FAQ/focus states bekerja
- [ ] Reduced motion bekerja
- [ ] Mobile 360, 390, 430 tidak overflow
- [ ] Lighthouse mencapai target proyek

Release hanya dapat dinyatakan selesai bila item yang membutuhkan data bisnis
dan akses eksternal telah dikonfirmasi pemilik.
