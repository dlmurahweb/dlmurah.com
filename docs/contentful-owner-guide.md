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
4. Periksa **Pesan WhatsApp awal**. Jangan masukkan data pribadi pelanggan.
5. Isi **Label ketersediaan** atau **Label waktu respons** hanya bila faktual.
6. Aktifkan field **Aktif**.
7. Klik **Publish**.
8. Buka website dan uji tombol dari perangkat yang tidak login ke Contentful.

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

- **Homepage**: hero, judul section, Tentang, final CTA, dan SEO. Gunakan satu
  entry saja.
- **Pengaturan Situs**: nama, deskripsi, canonical site URL, disclaimer, dan
  copyright. Gunakan satu entry saja.
- **Item Navigasi**: label, target anchor, urutan, dan status aktif.
- **Statistik**: nilai berbentuk teks (`24/7`, `5K+`, `< 5 menit`). Jangan
  memublikasikan klaim yang belum dapat dibuktikan. Maksimal empat ditampilkan.
- **Langkah Proses**: alur transaksi; urutkan dengan angka positif.
- **Keunggulan**: gunakan bahasa terukur, bukan jaminan mutlak.
- **FAQ**: jawaban Rich Text. Jangan menempel HTML arbitrer.
- **Pengumuman**: aktif hanya pada rentang tanggal yang sesuai.

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
