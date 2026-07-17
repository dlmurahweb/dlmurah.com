# Iterasi 023 — Policy Metadata Ownership

Tanggal: 16 Juli 2026

## Tujuan

Menutup sisa bagian lokal dari roadmap P2-04: tanggal policy harus mempunyai
ownership yang jelas dan diperbarui bersama isi kebijakan.

## Perubahan

- Menambahkan `src/lib/policies.ts` sebagai source of truth metadata policy.
- Menggunakan metadata tersebut untuk judul, deskripsi, canonical path, dan
  tanggal terlihat pada halaman Kebijakan Privasi serta Syarat Layanan.
- Mempertahankan perbedaan antara deskripsi SEO dan intro halaman agar copy
  pencarian tetap spesifik tanpa menduplikasi tanggal.
- Menambahkan assertion E2E untuk visible policy metadata dan canonical path.
- Mendokumentasikan bahwa policy pages masih repository-owned, sehingga body dan
  `lastUpdated` harus diubah pada patch yang sama.

## Verifikasi

- `pnpm type-check`
- `pnpm exec playwright test tests/e2e/site.spec.ts -g "policy routes"`
- `pnpm test:unit`
- `pnpm lint`
- `pnpm build`
- `pnpm test:e2e`

## Catatan

- Perubahan ini tidak membuat model Contentful baru untuk policy page karena isi
  kebijakan saat ini masih dikelola di repository.
- Migrasi policy ke CMS tetap dapat dilakukan nanti bila pemilik membutuhkan
  editing non-teknis untuk halaman legal.
