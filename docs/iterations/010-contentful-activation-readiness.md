# Iterasi 010 — Kesiapan Aktivasi Contentful

Tanggal: 16 Juli 2026

## Status yang diverifikasi

- Working tree bersih pada commit dokumentasi `dd18c24`.
- Homepage production `https://www.dlmurah.com` merespons `200`.
- Endpoint preview production merespons `503` dan gagal tertutup.
- Endpoint revalidation production merespons `503` untuk request `POST` tanpa
  konfigurasi aktif.
- Delivery token, Preview token, Preview secret, Space ID, dan site URL tersedia
  di environment lokal.
- `CONTENTFUL_MANAGEMENT_TOKEN` belum tersedia secara lokal.
- `CONTENTFUL_REVALIDATE_SECRET` belum tersedia secara lokal.
- Tidak ada file `.env copy.example` di filesystem; pola `.env*` tetap di-ignore.

Nilai credential tidak dicetak atau disimpan di dokumentasi.

## Langkah berikutnya

1. Cabut dan rotate Management token lama yang pernah terekspos pada task log.
2. Buat Management token baru dari account yang mempunyai akses ke space
   Contentful DLMURAH, lalu simpan hanya di `.env` lokal sebagai
   `CONTENTFUL_MANAGEMENT_TOKEN`.
3. Jalankan `pnpm contentful:setup` untuk membuat model dan sample entry.
4. Isi dan publish nomor WhatsApp admin, pesan awal, URL saluran, status
   availability, dan statistik yang sudah disetujui pemilik.
5. Tambahkan Preview dan Revalidation secret ke Vercel Production, kemudian
   redeploy dan konfigurasi webhook Contentful.
6. Aktifkan Vercel Web Analytics dan verifikasi ingestion event.
7. Jalankan final production QA setelah konten bisnis aktif.

Management token tidak perlu dan tidak boleh ditambahkan ke Vercel. Token
tersebut hanya dipakai secara lokal untuk provisioning model Contentful.

## Blocker eksternal

Provisioning belum aman dijalankan sampai Management token baru dengan akses ke
space DLMURAH tersedia. Aktivasi CTA transaksi juga menunggu data kontak dan
saluran yang telah diverifikasi pemilik.
