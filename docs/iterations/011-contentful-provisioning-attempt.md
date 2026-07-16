# Iterasi 011 — Percobaan Provisioning Contentful

Tanggal: 16 Juli 2026

## Tindakan

- Memastikan `CONTENTFUL_MANAGEMENT_TOKEN` tersedia tanpa mencetak nilainya.
- Memastikan tidak ada `.env.local` yang menimpa nilai dari `.env`.
- Memastikan token mempunyai bentuk umum Personal Access Token Contentful.
- Menjalankan `pnpm contentful:setup` terhadap environment `master` pada space
  DLMURAH yang dikonfigurasi.

## Hasil

Contentful mengembalikan `401 Access token invalid` pada request pertama untuk
membaca locale. Script berhenti sebelum membuat atau memperbarui content model
dan entry. Tidak ada perubahan pada Contentful.

## Pemulihan yang diperlukan

1. Revoke token yang gagal atau token lama yang pernah terekspos.
2. Buat Personal Access Token baru melalui Contentful **Settings → CMA tokens**.
3. Pastikan token mempunyai scope `content_management_manage` dan pemilik token
   mempunyai akses ke space DLMURAH.
4. Salin token lengkap saat Contentful menampilkannya, karena nilainya tidak
   dapat dilihat kembali setelah dialog ditutup.
5. Ganti nilai `CONTENTFUL_MANAGEMENT_TOKEN` di `.env`, lalu jalankan ulang
   `pnpm contentful:setup`.

Token tidak boleh dicantumkan di dokumentasi, commit Git, `.env.example`, Vercel,
atau percakapan.
