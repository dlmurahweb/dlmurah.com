# Iterasi 022 — Homepage Microcopy Ownership

Tanggal: 16 Juli 2026

## Tujuan

Menutup sisa copy homepage yang masih terkunci di komponen React agar pemilik
dapat mengelola bahasa operasional tanpa rilis kode baru.

## Perubahan

- Menambahkan field Homepage untuk label tombol saluran, pesan saluran tidak
  aktif, eyebrow About, judul nilai layanan, tiga label nilai layanan, dan label
  tombol final CTA.
- Menghubungkan `AboutSection`, `ChannelCard`, dan `FinalCtaSection` ke field
  Homepage dengan fallback Bahasa Indonesia yang tetap aman.
- Memperbarui model Contentful dan sample entry agar provisioning ulang dapat
  menambahkan field baru tanpa menimpa konten yang sudah ada.
- Memperbarui panduan pemilik dan setup Contentful agar cakupan ownership
  microcopy tercatat.

## Verifikasi

- `pnpm type-check`
- `pnpm test:unit`
- `pnpm lint`
- `pnpm build`
- `pnpm test:e2e`

## Catatan

- Perubahan ini tidak mengaktifkan admin, saluran, atau klaim bisnis baru.
- Data produksi tetap membutuhkan nomor WhatsApp, URL saluran, statistik, dan
  copy final yang disetujui pemilik.
