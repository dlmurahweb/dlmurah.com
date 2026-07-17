# Panduan Pemilik — Mengelola Konten DLMURAH

Panduan ini ditujukan untuk pemilik/editor harian. Setup teknis pertama kali
berada di [`contentful-setup.md`](./contentful-setup.md).

## Aturan aman sebelum mengubah konten

1. Pastikan kamu berada pada Space dan environment DLMURAH yang benar.
2. Ubah satu kelompok konten dalam satu waktu.
3. Gunakan **Save** untuk draft dan **Publish** hanya setelah diperiksa.
4. Jangan mengaktifkan admin atau saluran sebelum nomor/URL resmi diverifikasi.
5. Jangan memasukkan kata sandi pelanggan, isi percakapan, atau detail transaksi.

Website publik memakai konten **Published**. Tanpa webhook, perubahan dapat
memerlukan waktu sampai sekitar lima menit.

## Mengubah nomor admin WhatsApp

1. Buka **Content → Admin WhatsApp**.
2. Pilih admin berdasarkan nama/peran.
3. Isi **Nomor WhatsApp** menggunakan nomor dengan kode negara, misalnya
   `62812...`. Tanda `+`, spasi, tanda kurung, dan strip akan dinormalisasi.
4. Jangan gunakan nomor seed `620000000000`, nomor kosong, atau nomor dummy.
   Aplikasi tetap menolak nomor tersebut meskipun field **Aktif** dinyalakan.
5. Periksa **Pesan WhatsApp awal**. Jangan masukkan data pribadi pelanggan.
6. Isi **Label ketersediaan** atau **Label waktu respons** hanya bila faktual.
7. Simpan sebagai draft, buka link WhatsApp secara manual dari perangkat
   pribadi, lalu pastikan kontak dan pesan awal benar.
8. Aktifkan field **Aktif** hanya setelah test link berhasil.
9. Klik **Publish**.
10. Buka website dan uji tombol dari perangkat yang tidak login ke Contentful.

Untuk menonaktifkan admin seketika, matikan **Aktif** dan publish. Tombol akan
berubah menjadi status tidak aktif, bukan mengarah ke nomor lama.

## Mengarahkan layanan ke admin yang benar

1. Buka **Content → Layanan**.
2. Pilih layanan.
3. Pada **Admin WhatsApp**, pilih entry admin yang menangani layanan tersebut.
4. Periksa **Pesan WhatsApp layanan** dan **Aktif**.
5. Publish, lalu uji link layanan.

## Mengubah saluran WhatsApp

1. Buka **Content → Saluran WhatsApp**.
2. Isi **URL HTTPS** lengkap dari saluran resmi.
3. Periksa judul, deskripsi, dan label jumlah anggota bila digunakan.
4. Aktifkan **Aktif**, publish, lalu uji dari mode incognito.

Gunakan maksimal dua kartu saluran agar komposisi homepage tetap fokus.

## Konten lain

- **Homepage**: hero, eyebrow/judul/deskripsi section Layanan, Admin, Cara Kerja,
  Keunggulan, Saluran, Tentang, FAQ, final CTA, caption visual, catatan
  keamanan admin, pesan saluran tidak aktif, label tombol CTA, nilai layanan
  About, label tombol navigasi/layanan/admin, label kontak tidak aktif, label
  status kontak aktif/tidak aktif, dan SEO. Gunakan satu entry saja.
- **Pengaturan Situs**: nama, deskripsi, canonical site URL, label footer,
  disclaimer, dan copyright. Gunakan satu entry saja.
- **Item Navigasi**: label, target anchor, urutan, dan status aktif.
- **Statistik**: nilai berbentuk teks (`24/7`, `5K+`, `< 5 menit`). Jangan
  memublikasikan klaim yang belum dapat dibuktikan. Maksimal empat ditampilkan.
- **Langkah Proses**: alur transaksi; urutkan dengan angka positif.
- **Keunggulan**: gunakan bahasa terukur, bukan jaminan mutlak.
- **FAQ**: pertanyaan dan jawaban Rich Text. Judul/deskripsi section FAQ
  berada di entry Homepage. Jangan menempel HTML arbitrer.
- **Pengumuman**: aktif hanya pada rentang tanggal yang sesuai.

## Inventory field CMS

Gunakan daftar ini saat meninjau draft. Nama dalam backtick adalah API ID field
di Contentful; label yang terlihat di UI Contentful dapat berbahasa Indonesia.

| Content type      | Field yang dapat diedit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `siteSettings`    | `siteName`, `siteDescription`, `logo`, `favicon`, `defaultSeoTitle`, `defaultSeoDescription`, `siteUrl`, `contactEmail`, `footerNavigationHeading`, `footerAdminsHeading`, `footerChannelsHeading`, `footerPrivacyLabel`, `footerTermsLabel`, `footerInactiveSuffix`, `footerDisclaimer`, `copyrightText`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `navigationItem`  | `label`, `href`, `order`, `isExternal`, `isEnabled`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `homepage`        | `eyebrow`, `heroTitle`, `heroDescription`, `primaryCtaLabel`, `primaryCtaTarget`, `secondaryCtaLabel`, `secondaryCtaTarget`, `navigationCtaLabel`, `navigationCtaCompactLabel`, `heroImage`, `servicesEyebrow`, `servicesHeading`, `servicesDescription`, `serviceCtaLabel`, `adminsEyebrow`, `adminsHeading`, `adminsDescription`, `adminsWarning`, `adminCtaLabel`, `inactiveContactLabel`, `activeContactFallbackLabel`, `inactiveContactFallbackLabel`, `processEyebrow`, `processDescription`, `howItWorksHeading`, `featuresEyebrow`, `featuresHeading`, `featuresDescription`, `featuresVisualCaption`, `channelsEyebrow`, `channelsHeading`, `channelsDescription`, `channelCtaLabel`, `inactiveChannelMessage`, `inactiveChannelCtaLabel`, `aboutEyebrow`, `aboutHeading`, `aboutContent`, `aboutValuesHeading`, `aboutValueOneLabel`, `aboutValueTwoLabel`, `aboutValueThreeLabel`, `finalCtaEyebrow`, `finalCtaTitle`, `finalCtaDescription`, `finalCtaPrimaryLabel`, `finalCtaChannelLabel`, `finalCtaFallbackChannelLabel`, `faqEyebrow`, `faqHeading`, `faqDescription`, `seoTitle`, `seoDescription` |
| `whatsappAdmin`   | `name`, `role`, `serviceCategory`, `phoneNumber`, `prefilledMessage`, `availabilityLabel`, `responseTimeLabel`, `avatar`, `order`, `isActive`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `service`         | `title`, `slug`, `shortDescription`, `iconKey`, `badge`, `whatsappAdmin`, `whatsappPrefilledMessage`, `order`, `isEnabled`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `whatsappChannel` | `title`, `description`, `url`, `iconKey`, `memberCountLabel`, `order`, `isActive`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `statistic`       | `value`, `label`, `description`, `iconKey`, `order`, `isEnabled`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `processStep`     | `stepNumber`, `title`, `description`, `iconKey`, `order`, `isEnabled`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `feature`         | `title`, `description`, `iconKey`, `order`, `isEnabled`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `faq`             | `question`, `answer`, `order`, `isEnabled`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `announcement`    | `message`, `linkLabel`, `linkUrl`, `variant`, `isEnabled`, `startDate`, `endDate`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

Catatan ownership:

- Field bisnis dan editorial di atas dikelola di Contentful.
- Target CTA umum seperti `#pilih-admin` harus tetap sesuai aksi tombol.
- Nomor, URL saluran, statistik, dan klaim bisnis hanya boleh dipublish setelah
  diverifikasi pemilik.
- Metadata halaman kebijakan tetap repository-owned seperti dijelaskan di bawah.

## Preview sebelum publish

Gunakan preview untuk memeriksa draft sebelum membuatnya publik:

1. Simpan perubahan sebagai draft di Contentful.
2. Buka `/api/preview?secret=SECRET&redirect=/` dari browser penguji.
3. Periksa homepage, drawer mobile, footer, link WhatsApp, dan tampilan mobile.
4. Keluar dari preview melalui `/api/preview/disable`.
5. Publish hanya setelah preview dan checklist bawah lulus.

## Kebijakan dan syarat layanan

Halaman **Kebijakan Privasi** dan **Syarat Layanan** masih dikelola di
repository, bukan Contentful. Saat isi kebijakan berubah, pengelola teknis harus
memperbarui teks halaman dan metadata di `src/lib/policies.ts` pada perubahan
yang sama, termasuk field `lastUpdated` yang tampil ke pengguna.

## Bahasa yang harus dihindari

Jangan gunakan klaim seperti:

- “100% tanpa risiko”;
- “pasti aman”;
- “tidak mungkin tertipu”;
- “resmi dari Growtopia”.

Gunakan bahasa seperti “proses lebih transparan”, “komunikasi langsung dengan
admin”, dan “konfirmasi detail sebelum transaksi”.

## Checklist setelah publish

- Tidak ada salah ketik pada nama/nomor.
- Admin layanan aktif dan sesuai kategori.
- Prefilled message menyebut layanan yang benar.
- Link membuka `wa.me` atau saluran resmi.
- Tidak ada nomor lama di footer.
- Mobile tidak memotong teks.
- Disclaimer tetap terlihat.

Jika hasil tidak berubah setelah lima menit, minta pengelola teknis memeriksa
webhook revalidation dan status publish entry.
