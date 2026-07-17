# Setup dan Penggunaan Contentful

## Tujuan

Contentful menjadi panel pengelolaan nomor WhatsApp, layanan, saluran,
statistik, proses, keunggulan, FAQ, pengumuman, dan konten homepage. Secret
Contentful hanya digunakan pada server atau tooling lokal.

## 1. Menyiapkan environment

Salin `.env.example` ke `.env.local`, lalu isi:

```dotenv
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=
CONTENTFUL_MANAGEMENT_TOKEN=
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_LOCALE=id-ID
CONTENTFUL_PREVIEW_SECRET=
CONTENTFUL_REVALIDATE_SECRET=
```

Gunakan string acak yang berbeda untuk preview dan revalidation secret.

## 2. Membuat model dan sample entry

Jalankan:

```bash
pnpm contentful:setup
```

Perintah tersebut:

1. memastikan locale `id-ID` tersedia dengan fallback ke locale default;
2. membuat atau memperbarui 11 content model;
3. mempertahankan field tambahan buatan pemilik;
4. memublikasikan model;
5. membuat sample entry yang belum ada;
6. melewati entry yang sudah ada agar konten pemilik tidak tertimpa.

Untuk memperbarui sample entry yang sudah ada, jalankan sekali dengan:

```bash
CONTENTFUL_FORCE_SEED=true pnpm contentful:setup
```

Force seed hanya menimpa field sample yang dikelola script. Field tambahan
buatan pemilik dan locale lain pada entry yang sama tetap dipertahankan. Tetap
jangan gunakan force seed setelah website berisi konten produksi tanpa
memeriksa perubahannya terlebih dahulu.

## 3. Model yang dibuat

| API ID            | Nama di Contentful | Pola                                                |
| ----------------- | ------------------ | --------------------------------------------------- |
| `siteSettings`    | Pengaturan Situs   | Satu entry `site-settings`                          |
| `homepage`        | Homepage           | Satu entry `homepage`; copy section, state, dan CTA |
| `navigationItem`  | Item Navigasi      | Banyak entry, urutkan dengan `order`                |
| `service`         | Layanan            | Banyak entry, dapat mereferensikan admin            |
| `whatsappAdmin`   | Admin WhatsApp     | Banyak entry                                        |
| `whatsappChannel` | Saluran WhatsApp   | Maksimal dua disarankan                             |
| `statistic`       | Statistik          | Maksimal empat ditampilkan                          |
| `processStep`     | Langkah Proses     | Empat langkah disarankan                            |
| `feature`         | Keunggulan         | Banyak entry                                        |
| `faq`             | FAQ                | Banyak entry                                        |
| `announcement`    | Pengumuman         | Entry aktif pertama pada rentang tanggal            |

Field ID API tetap berbahasa Inggris agar stabil, sedangkan label editor
menggunakan Bahasa Indonesia.

## 4. Mengaktifkan admin dan saluran

Sample admin dibuat sebagai kontak draft: `isActive=false` dan nomor dapat
kosong sampai pemilik mengisi kontak resmi. Sebelum mengaktifkan admin:

1. ganti `phoneNumber` dengan nomor WhatsApp nyata;
2. periksa `prefilledMessage`;
3. isi label ketersediaan/waktu respons hanya jika disetujui pemilik;
4. uji link WhatsApp dari perangkat pribadi;
5. ubah `isActive` menjadi aktif;
6. publikasikan entry.

Nomor seed `620000000000`, nomor kosong, dan nomor dummy tetap ditolak oleh
guard aplikasi sehingga tidak menghasilkan link atau structured data.

Sample saluran juga nonaktif. Isi URL HTTPS resmi, periksa judul/deskripsi,
aktifkan, lalu publikasikan.

## 5. Preview

Gunakan URL berikut setelah `CONTENTFUL_PREVIEW_SECRET` dikonfigurasi:

```text
/api/preview?secret=SECRET&redirect=/
```

Keluar dari preview melalui:

```text
/api/preview/disable
```

Preview menggunakan Preview API dan tidak menggunakan cache.

## 6. Webhook revalidation

Buat webhook Contentful untuk event publish/unpublish dengan:

- Method: `POST`
- URL: `https://DOMAIN/api/revalidate`
- Header: `Authorization: Bearer CONTENTFUL_REVALIDATE_SECRET`

Time-based freshness dimiliki oleh fetch Contentful server-side dengan tag
`contentful` dan window lima menit. Route homepage tidak memakai window cache
terpisah agar satu perubahan konten tidak bergantung pada dua TTL yang sama.

Webhook menandai tag `contentful` kedaluwarsa dan merevalidasi path `/`.
Respons sukses berisi `revalidated: true`, `tag: "contentful"`, dan
`paths: ["/"]`. Tanpa webhook, perubahan published tetap muncul melalui
revalidation time-based sekitar lima menit setelah cache berikutnya basi.

## 7. Fallback dan keamanan

- Bila Contentful belum dikonfigurasi atau API gagal, website menggunakan
  fallback Bahasa Indonesia dari repository.
- Admin fallback tidak aktif dan tidak menghasilkan tautan transaksi.
- URL CMS hanya diterima bila berupa anchor internal, path internal, atau HTTPS.
- Rich Text dirender sebagai struktur node Contentful; HTML arbitrer tidak
  diteruskan ke komponen.
- Management token tidak pernah dibutuhkan oleh runtime website.
