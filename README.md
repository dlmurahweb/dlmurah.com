# DLMURAH.com

Website profil bisnis dan jalur konversi WhatsApp untuk DLMURAH. Proyek ini
menggunakan Next.js App Router, TypeScript, Tailwind CSS, dan fondasi komponen
shadcn/ui.

## Status implementasi

Phase 1–7 telah selesai pada sisi kode. Integrasi Contentful tetap menggunakan
fallback aman sampai content model diprovisikan, dan aktivasi layanan eksternal
masih membutuhkan akses pemilik pada Phase 8. Lihat status serta bukti setiap iterasi pada
[`docs/`](./docs/README.md).

## Persyaratan lokal

- Node.js 20.9 atau lebih baru
- pnpm 11.5.3 (versi dikunci melalui `packageManager`)

Aktifkan Corepack bila pnpm belum tersedia:

```bash
corepack enable
```

## Menjalankan proyek

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Pemeriksaan kualitas

```bash
pnpm lint
pnpm type-check
pnpm test:unit
pnpm test:e2e
pnpm format:check
pnpm build
```

Gunakan `pnpm format` untuk menerapkan format kode dan `pnpm lint:fix` untuk
perbaikan lint yang aman. E2E memakai Playwright dengan channel Google Chrome
dan menjalankan build produksi pada port 3100.

## Environment variables

Salin `.env.example` menjadi `.env.local`. Jangan commit token atau secret.

| Variable                          | Visibilitas | Keterangan                                   |
| --------------------------------- | ----------- | -------------------------------------------- |
| `CONTENTFUL_SPACE_ID`             | Server      | Space ID Contentful, digunakan mulai Phase 2 |
| `CONTENTFUL_ACCESS_TOKEN`         | Server      | Delivery API token                           |
| `CONTENTFUL_PREVIEW_ACCESS_TOKEN` | Server      | Preview API token opsional                   |
| `CONTENTFUL_ENVIRONMENT`          | Server      | Environment Contentful, default `master`     |
| `CONTENTFUL_LOCALE`               | Server      | Locale Delivery API, disarankan `id-ID`      |
| `CONTENTFUL_PREVIEW_SECRET`       | Server      | Secret untuk preview mode                    |
| `CONTENTFUL_REVALIDATE_SECRET`    | Server      | Secret webhook revalidation                  |
| `CONTENTFUL_MANAGEMENT_TOKEN`     | Tool lokal  | Token untuk menjalankan provisioning         |
| `NEXT_PUBLIC_SITE_URL`            | Publik      | Origin kanonis: `https://www.dlmurah.com`    |
| `NEXT_PUBLIC_GA_ID`               | Publik      | ID Google Analytics opsional                 |

Semua variable divalidasi dengan Zod. Kredensial Contentful tidak menggunakan
prefix `NEXT_PUBLIC_`, sehingga tetap berada di server.

## Contentful

Setelah kredensial Management API tersedia, buat model dan sample entry secara
idempotent:

```bash
pnpm contentful:setup
```

Entry yang sudah ada tidak ditimpa. Gunakan `CONTENTFUL_FORCE_SEED=true` hanya
bila memang ingin memperbarui sample entry dengan nilai repository. Admin dan
saluran sample selalu dibuat nonaktif hingga nomor dan URL nyata dimasukkan.

Panduan lengkap tersedia di
[`docs/contentful-setup.md`](./docs/contentful-setup.md).

## Struktur aplikasi

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── assets/
├── components/
├── contentful/
├── lib/
    ├── constants.ts
    ├── env.ts
    └── utils.ts
└── types/
```

Folder bertanggung jawab atas routing (`app`), integrasi CMS (`contentful`),
model frontend (`types`), komponen, dan utilitas. Aset publik berada di
`public/brand`, sedangkan materi sumber pemilik tetap berada di `assets`.

## Aset merek

- `assets/logo.JPG` adalah materi sumber milik pemilik proyek.
- `public/brand/logo.webp` adalah turunan web teroptimasi.
- `src/app/icon.png`, `apple-icon.png`, dan `favicon.ico` menggunakan file
  convention Metadata Next.js.

Jangan menambahkan screenshot, karakter, UI, atau aset hasil ekstraksi dari
Growtopia.

## Deployment ke Vercel

1. Import repository ke Vercel dan pilih pnpm sebagai package manager.
2. Tambahkan environment variables dari `.env.example` dengan nilai produksi.
3. Atur `NEXT_PUBLIC_SITE_URL` ke domain HTTPS yang disetujui.
4. Jalankan build command `pnpm build` dan gunakan output Next.js default.
5. Hubungkan domain, verifikasi DNS/SSL, lalu uji metadata dan security headers.

Aktifkan Web Analytics pada dashboard Vercel agar page view dan custom event
mulai terekam. Implementasi hanya mengirim label interaksi yang telah
di-whitelist; nomor telepon, isi pesan, dan detail transaksi tidak menjadi
properti event.
