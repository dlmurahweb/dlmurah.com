# Audit Pola Positif — MWTSTORE “How It Works”

Tanggal snapshot: 16 Juli 2026  
Target: [https://mwtstore.com/#howitworks](https://mwtstore.com/#howitworks)  
Metode: Playwright Chromium 149 pada viewport 390, 1024, dan 1440 px  
Fokus: pola yang bekerja baik dan dapat dipelajari tanpa menyalin desain

## Batas penggunaan

Dokumen ini bukan instruksi untuk meniru MWTSTORE. Product plan DLMURAH secara
eksplisit melarang penyalinan layout atau visual competitor. Audit hanya
mengambil prinsip yang dapat dipindahkan—hierarki, urutan informasi,
responsiveness, dan kejelasan proses—lalu menerjemahkannya ke visual language
DLMURAH sendiri.

Tidak ada source code, copy, aset, warna, atau screenshot MWTSTORE yang
disimpan di repository.

## Anti-pattern verdict

Section “How It Works” tidak terlihat seperti card grid generik yang dibuat
tanpa arah. Identitasnya cukup disengaja melalui techno typography, purple
rail, nomor geometris, dan transisi horizontal-ke-vertikal yang jelas. Pola
timeline juga sesuai dengan jenis informasi yang bersifat berurutan.

Namun purple-on-black, font futuristik, chamfered rectangle, dan grid background
adalah bahasa visual MWTSTORE. Elemen tersebut bukan referensi visual yang
boleh dipindahkan ke DLMURAH. Hal yang layak dipelajari adalah struktur dan
ritmenya, bukan tampilannya.

## Ringkasan eksekutif

Section ini berhasil karena mengubah proses yang berpotensi terasa rumit
menjadi satu intro singkat dan empat langkah yang dapat dipindai dalam beberapa
detik. Desktop menggunakan connected horizontal timeline; mobile tidak sekadar
mengecilkan layout, tetapi mengubahnya menjadi vertical rail. Komposisi relatif
ringan karena setiap langkah tidak dibungkus card penuh.

Playwright mengonfirmasi:

- tidak ada horizontal overflow pada ketiga viewport;
- tidak ada pelanggaran axe WCAG 2.0/2.1 A/AA yang terdeteksi setelah Bahasa
  Indonesia dipilih;
- tidak ada browser console error;
- navigation link “Cara Kerja” dapat difokuskan dan diaktifkan dengan keyboard;
- document language berubah menjadi `id` setelah pilihan Indonesia;
- layout berubah dari empat kolom menjadi vertical timeline pada mobile.

## Bukti Playwright

| Viewport | Bentuk proses                    | Ukuran section | Overflow | Axe A/AA | Console error |
| -------: | -------------------------------- | -------------: | -------: | -------: | ------------: |
|   390 px | Vertical timeline, empat langkah |        1040 px |    Tidak |        0 |             0 |
|  1024 px | Horizontal timeline, empat kolom |         487 px |    Tidak |        0 |             0 |
|  1440 px | Horizontal timeline terpusat     |         490 px |    Tidak |        0 |             0 |

Pengukuran tambahan:

- marker `01–04` konsisten berukuran 48×48 px;
- intro dibatasi sekitar 520 px pada desktop dan 350 px pada mobile;
- body setiap langkah memakai line-height sekitar 1.7;
- content container desktop berhenti pada 1200 px, bukan terus melebar;
- pada mobile, copy langkah mempunyai area sekitar 325 px dan tetap berada
  dalam satu alur baca.

## Pola positif yang layak dipelajari

### MP-01 — Struktur menjawab “apa yang terjadi setelah saya klik?”

**Yang bekerja baik**

Section dimulai dengan eyebrow “Proses Sederhana”, heading “Cara Kerjanya”,
serta satu kalimat yang menjelaskan scope. Setelah itu pengguna langsung
mendapat langkah `01–04`, tanpa paragraf pembuka yang panjang.

**Nilai bagi pengguna**

Pengguna mengetahui sequence transaksi sebelum meninggalkan situs menuju
WhatsApp. Ini mengurangi ketidakpastian dan membuat CTA terasa lebih dapat
diprediksi.

**Adaptasi untuk DLMURAH**

Pertahankan heading singkat, satu deskripsi yang menjelaskan bahwa transaksi
dilanjutkan di WhatsApp, lalu tampilkan empat langkah DLMURAH: pilih layanan,
hubungi admin, konfirmasi detail, dan selesaikan transaksi.

### MP-02 — Desktop memakai hubungan spasial untuk menjelaskan urutan

**Yang bekerja baik**

Empat marker ditempatkan pada satu rail horizontal. Mata dapat mengikuti garis
dari kiri ke kanan tanpa membutuhkan arrow atau animasi. Nomor berada di atas
judul dan copy sehingga setiap kolom mempunyai entry point yang konsisten.

**Nilai bagi pengguna**

Urutan proses dapat dipahami sebelum seluruh copy dibaca. Garis berfungsi
sebagai informasi, bukan dekorasi acak.

**Adaptasi untuk DLMURAH**

Gunakan cyan energy rail yang tipis atau lock-sequence line dari sistem visual
DLMURAH. Jangan memakai purple rail, bentuk marker, ukuran, atau chamfer yang
sama dengan MWTSTORE.

### MP-03 — Mobile mengubah model layout, bukan hanya ukurannya

**Yang bekerja baik**

Pada 390 px, marker berpindah ke vertical rail di sisi kiri dan copy berada di
sisi kanan. Jarak vertikal mengikuti panjang isi tiap langkah, sehingga tidak
ada empat card sempit atau horizontal carousel.

**Nilai bagi pengguna**

Scanning order tetap natural dari atas ke bawah. Tidak ada gesture tersembunyi,
teks terpotong, atau kebutuhan swipe horizontal.

**Adaptasi untuk DLMURAH**

Gunakan semantic ordered list dengan vertical connector pada mobile. Marker
dapat memakai lock node atau crystal notch DLMURAH, tetapi copy harus tetap
menjadi fokus utama.

### MP-04 — Section tidak bergantung pada card untuk membentuk hierarki

**Yang bekerja baik**

Setiap langkah tidak berada di dalam panel besar. Hierarki dibentuk oleh nomor,
rail, whitespace, heading, dan text color. Background grid menjadi ambience
yang lemah dan tidak mengubah setiap item menjadi container terpisah.

**Nilai bagi pengguna**

Section terasa lebih ringan daripada service/admin area yang memang memerlukan
card actionable. Ini memberi variasi ritme pada halaman panjang.

**Adaptasi untuk DLMURAH**

Ini merupakan pola paling relevan untuk roadmap P2-02. Process section dapat
menjadi borderless timeline, sedangkan card tetap dipakai untuk service atau
admin yang mempunyai aksi mandiri.

### MP-05 — Hierarki tipografi sangat mudah dipindai

**Yang bekerja baik**

Urutan visualnya konsisten: eyebrow kecil, heading section besar, summary
medium, marker kontras, judul langkah bold, lalu copy muted. Judul langkah
pendek dan berorientasi aksi seperti “Hubungi Kami” dan “Konfirmasi Detail”.

**Nilai bagi pengguna**

Pengguna dapat membaca hanya heading/marker terlebih dahulu lalu kembali ke
detail yang dibutuhkan. Copy tidak mengulang nomor atau judul.

**Adaptasi untuk DLMURAH**

Gunakan font DLMURAH, Bahasa Indonesia, dan heading yang sudah didefinisikan
dalam product plan. Ambil struktur weight/scale-nya, bukan Orbitron/Rajdhani
atau bentuk huruf competitor.

### MP-06 — Measure dan line-height mendukung copy proses

**Yang bekerja baik**

Intro desktop dibatasi sekitar 520 px dan tiap kolom copy sekitar 204–248 px.
Pada mobile, copy melebar menjadi sekitar 325 px. Line-height sekitar 1.7
memberi ruang pada typeface yang sempit tanpa membuat section terasa padat.

**Nilai bagi pengguna**

Kalimat tetap mudah diikuti pada desktop dan mobile. Lebar copy berubah sesuai
konteks, tidak memakai satu fixed width untuk semua breakpoint.

**Adaptasi untuk DLMURAH**

Pertahankan batas measure berdasarkan fungsi: intro lebih lebar, detail langkah
lebih pendek. Gunakan body font DLMURAH dan uji kembali line-height pada 360,
390, 430, 1024, serta 1440 px.

### MP-07 — Section menyambung secara logis ke bukti kepercayaan

**Yang bekerja baik**

Setelah menjelaskan sequence, halaman bergerak ke “Kenapa Percaya MWTSTORE?”.
Urutan narasinya adalah layanan → proses → alasan percaya → CTA. Proses menjadi
jembatan antara janji layanan dan trust content.

**Nilai bagi pengguna**

Trust statement muncul setelah pengguna memahami cara kerja, sehingga konteks
lebih kuat daripada menampilkan klaim kepercayaan di awal tanpa penjelasan.

**Adaptasi untuk DLMURAH**

Pertahankan urutan informasi DLMURAH: layanan/admin → cara kerja → alasan
memilih → channel/about → final CTA. Gunakan bukti dan wording yang dapat
diverifikasi, bukan klaim absolut.

### MP-08 — Localized experience berubah sebagai satu state

**Yang bekerja baik**

Setelah Indonesia dipilih, navigation, section copy, CTA, dan atribut `lang`
berubah ke Bahasa Indonesia. Playwright mengonfirmasi `html[lang="id"]`, bukan
hanya penggantian beberapa string di area utama.

**Nilai bagi pengguna**

Bahasa terasa konsisten dalam satu session dan assistive technology menerima
language context yang sesuai.

**Adaptasi untuk DLMURAH**

DLMURAH hanya memerlukan Bahasa Indonesia, jadi tidak perlu mengadopsi language
gate. Pertahankan `lang="id"` secara langsung dan gunakan satu tone Bahasa
Indonesia yang konsisten.

## Hal yang tidak boleh dibawa ke DLMURAH

Audit positif bukan endorsement atas seluruh halaman. Beberapa hal harus tetap
dihindari:

- jangan menyalin layout, purple palette, techno typeface, grid texture,
  chamfered marker, atau CTA shape;
- jangan mengadopsi language gate karena DLMURAH hanya berbahasa Indonesia dan
  deep link seharusnya langsung membuka content;
- jangan mengadopsi klaim seperti “100% aman”, “tidak ada penipuan”, “garansi
  harga terbaik”, atau availability absolut tanpa bukti;
- jangan membawa middleman private game ke scope DLMURAH tanpa persetujuan dan
  review platform/legal terpisah;
- source section menggunakan `div.step-card`, bukan semantic `<ol>/<li>`, dan
  judul langkah bukan heading. DLMURAH sebaiknya mempertahankan visual pattern
  sambil memakai semantic ordered list dan heading yang benar;
- pada direct anchor mobile, sticky header dapat menutupi heading section bila
  scroll offset tidak disediakan. Implementasi DLMURAH perlu `scroll-margin-top`;
- header competitor terlihat terlalu padat pada 390 px; pola timeline mobile
  dapat dipelajari tanpa meniru header tersebut.

## Rekomendasi penerapan pada DLMURAH

### Prioritas A — Struktur

1. Ubah process cards menjadi `<ol>` berisi empat `<li>`.
2. Gunakan horizontal rail mulai breakpoint yang mempunyai ruang nyata.
3. Gunakan vertical rail pada mobile tanpa carousel atau card stack penuh.
4. Tambahkan `scroll-margin-top` pada `#cara-kerja`.

### Prioritas B — Identitas

1. Bentuk connector dari energy line DLMURAH, bukan rail purple.
2. Buat node angka dari lock/crystal geometry yang sudah dimiliki brand.
3. Pertahankan navy/cyan tetapi gunakan cyan pada marker aktif dan connector,
   bukan seluruh copy atau setiap border.
4. Hindari background/grid yang terlalu mirip competitor.

### Prioritas C — Verifikasi

1. Screenshot regression pada 390, 1024, dan 1440 px.
2. Uji no-overflow pada tujuh breakpoint DLMURAH.
3. Jalankan axe setelah perubahan semantic structure.
4. Uji direct anchor dan sticky header menggunakan keyboard.
5. Uji reduced-motion walaupun timeline tidak membutuhkan animation.

## Kesimpulan

Pelajaran terbaik dari MWTSTORE bukan warna atau bentuknya, melainkan keputusan
untuk membuat proses sebagai connected sequence yang ringan dan benar-benar
adaptif. DLMURAH dapat mengambil prinsip tersebut untuk mengurangi repetisi
card, lalu mengeksekusinya dengan lock/crystal/wing language, copy yang lebih
aman, dan semantic HTML yang lebih baik.

## Catatan reproduksi

Audit dilakukan setelah memilih Bahasa Indonesia pada language gate. Chromium
dibuka secara headless, target discroll ke `#howitworks`, lalu DOM, computed
layout, overflow, console, keyboard navigation, dan axe WCAG A/AA diperiksa.
Screenshot hanya digunakan untuk inspeksi sementara dan tidak dimasukkan ke
repository.
