# Audit Frontend Design DLMURAH

Tanggal snapshot: 16 Juli 2026  
Branch/commit: `main` pada `44feeb1`  
Production: [https://www.dlmurah.com](https://www.dlmurah.com)  
Viewport bukti visual utama: 390, 1024, dan 1440 px

## Ringkasan eksekutif

Website telah memiliki fondasi visual dan teknis yang kuat, tetapi belum aman
untuk mengarahkan transaksi production. Masalah paling mendesak bukan warna
atau gaya visual: seluruh admin yang aktif masih menggunakan nomor sentinel
dari seed data. Nomor tersebut diterbitkan melalui 13 link WhatsApp dan
Organization JSON-LD. UI juga menampilkan tombol hijau aktif pada kartu yang
secara bersamaan menyatakan bahwa nomor masih akan diperbarui.

Audit membedakan defect yang dapat dibuktikan dari peluang desain. Palet dark
navy/cyan adalah arahan merek eksplisit dan tidak dinilai sebagai kegagalan.
Kritik visual berfokus pada hierarki, repetisi pola, kekhasan merek, dan
ketepatan perilaku responsif.

| Tingkat  | Jumlah | Arti                                                       |
| -------- | -----: | ---------------------------------------------------------- |
| Critical |      2 | Berpotensi mengarahkan pengguna ke kontak yang tidak valid |
| High     |      5 | Mengganggu ketepatan konversi atau fungsi inti             |
| Medium   |      5 | Menurunkan kejelasan, konsistensi, atau kualitas layout    |

## Batas keputusan

Audit menggunakan tiga klasifikasi:

- **Defect:** perilaku, data, label, atau layout yang bertentangan dengan
  tujuan produk dan dapat direproduksi.
- **Risiko:** konfigurasi yang saat ini bekerja sebagian tetapi tidak memberi
  jaminan operasional yang dijanjikan.
- **Peluang desain:** penilaian kualitas visual yang perlu divalidasi melalui
  iterasi desain; bukan bug production.

## Temuan yang jelas salah

### FD-01 — Kontak placeholder diterbitkan sebagai tujuan transaksi

Severity: **Critical**  
Kategori: Data production, conversion safety, structured data

**Bukti**

- Ketiga entry admin yang aktif pada snapshot memakai sentinel seed
  `620000000000`.
- HTML production memuat 13 link `wa.me`, semuanya mengarah ke satu destination
  sentinel tersebut.
- Organization JSON-LD menerbitkan sentinel yang sama sebagai `ContactPoint`.
- Sentinel berasal dari fallback eksplisit di
  `scripts/contentful/sample-entries.ts`; karena terdiri dari 12 digit, nilai
  ini lolos validasi format `8–15` digit yang ada.

**Dampak**

Pengguna dapat menganggap nomor tersebut sebagai kontak resmi, sementara mesin
pencari juga menerima data yang sama sebagai nomor organisasi. Ini merupakan
risiko konversi dan reputasi langsung.

**Perbaikan yang disarankan**

Nonaktifkan seluruh admin placeholder atau ganti dengan kontak yang telah
diverifikasi pemilik. Tambahkan denylist sentinel pada pembuat link, mapper,
dan structured data agar status `isActive` tidak cukup untuk menerbitkan nomor
seed.

**Sinyal selesai**

Production tidak memuat sentinel dalam HTML, link, analytics attribute, atau
JSON-LD; setiap link aktif mengarah ke kontak yang telah diverifikasi.

### FD-02 — Status visual admin bertentangan dengan isi label

Severity: **Critical**  
Kategori: State communication, trust

**Bukti**

Setiap admin menampilkan tombol WhatsApp hijau “Chat Admin” dan status berwarna
hijau karena link dianggap valid, tetapi teks status berbunyi “Nomor segera
diperbarui.” Status aktif ditentukan dari keberadaan link, bukan dari makna
availability label.

**Dampak**

Warna dan aksi utama menyampaikan “siap digunakan”, sedangkan teks menyampaikan
“belum siap”. Pengguna tidak mendapat satu status yang dapat dipercaya.

**Perbaikan yang disarankan**

Turunkan state menjadi tidak aktif bila nomor belum diverifikasi. Gunakan satu
sumber state terstruktur untuk menentukan label, warna, affordance tombol, dan
eligibility link; jangan mencoba menyimpulkan state dari teks bebas.

**Sinyal selesai**

Tidak ada kartu yang menggabungkan warning availability dengan CTA transaksi
aktif. Status dapat dipahami tanpa hanya mengandalkan warna.

### FD-03 — CTA generik otomatis memilih admin pertama

Severity: **High**  
Kategori: Information architecture, conversion routing

**Bukti**

`src/app/page.tsx` mengambil admin aktif pertama melalui `find()` lalu
mengirimnya ke header, hero, dan final CTA. CTA generik “Chat di WhatsApp” atau
“Mulai Transaksi” karenanya dapat langsung membuka admin DL/BGL meskipun
pengguna sebenarnya membutuhkan transaksi akun.

**Dampak**

Alur melewati fungsi utama halaman, yaitu membantu pengguna memilih admin
berdasarkan kategori. Beban triase berpindah ke admin dan potensi salah tujuan
meningkat.

**Perbaikan yang disarankan**

Arahkan CTA generik ke `#pilih-admin`. Link WhatsApp langsung hanya diberikan
pada konteks yang telah menentukan kategori atau admin, seperti service card
dan admin card.

**Sinyal selesai**

Header, hero, dan CTA penutup tidak membuka WhatsApp sebelum pengguna memilih
layanan/admin yang sesuai.

### FD-04 — Label “Pilih Admin” tidak sesuai dengan destination

Severity: **High**  
Kategori: UX writing, interaction predictability

**Bukti**

Pada kondisi ada admin aktif, tombol final CTA berlabel “Pilih Admin” tetapi
href-nya merupakan link WhatsApp ke admin pertama dan dibuka pada tab baru.

**Dampak**

Label menjanjikan navigasi ke pilihan, tetapi aksi langsung meninggalkan situs.
Ini merusak predictability dan dapat mengejutkan pengguna keyboard maupun
mobile.

**Perbaikan yang disarankan**

Pertahankan label dan arahkan ke `#pilih-admin`, atau ubah label menjadi nama
aksi/admin yang benar bila memang sengaja membuka WhatsApp.

**Sinyal selesai**

Semua CTA memiliki label, analytics source, target, dan destination yang
menggambarkan aksi yang sama.

### FD-05 — Freshness Contentful belum dapat diandalkan

Severity: **High**  
Kategori: CMS operations, caching

**Bukti**

- Route homepage dan fetch Contentful sama-sama memakai revalidation 300 detik.
- Time-based ISR teramati berjalan di Vercel, tetapi pembaruan admin baru muncul
  setelah lebih dari satu siklus cache/rebuild pada audit sebelumnya.
- Endpoint on-demand revalidation merespons `503` karena
  `CONTENTFUL_REVALIDATE_SECRET` belum tersedia di production.

**Dampak**

Pemilik tidak mempunyai jalur yang pasti untuk menerbitkan perubahan kontak
penting dalam window yang didokumentasikan. Untuk nomor WhatsApp, keterlambatan
ini merupakan risiko operasional, bukan hanya masalah editorial.

**Perbaikan yang disarankan**

Konfigurasikan secret dan webhook Contentful, sederhanakan ownership cache agar
route/data tidak mempunyai lifetime identik yang tumpang tindih, lalu ukur
publish-to-live pada production.

**Sinyal selesai**

Perubahan published muncul konsisten dalam SLA yang ditulis di panduan pemilik,
dan webhook yang sah menghasilkan respons sukses tanpa membuka endpoint publik.

### FD-06 — Header kehilangan seluruh CTA pada 1024–1279 px

Severity: **High**  
Kategori: Responsive navigation

**Bukti**

Mobile menu disembunyikan mulai `lg` (`lg:hidden`), sedangkan CTA WhatsApp baru
ditampilkan mulai `xl` (`hidden xl:inline-flex`). Pada 1024–1279 px, navigasi
desktop terlihat tetapi menu dan CTA utama sama-sama tidak tersedia.

**Dampak**

Tablet landscape dan desktop sempit kehilangan jalur konversi yang selalu
tersedia di header, padahal CTA ada pada mobile dan desktop lebar.

**Perbaikan yang disarankan**

Tampilkan header CTA mulai `lg`, lalu atur ulang gap atau label bila ruang
sempit. Alternatifnya pertahankan menu ringkas hingga breakpoint yang sama
dengan kemunculan CTA.

**Sinyal selesai**

Pada seluruh lebar 360–1440 px, header selalu menyediakan salah satu jalur CTA
yang jelas tanpa collision atau overflow.

### FD-07 — Featured service menghasilkan grid desktop yang kosong

Severity: **High**  
Kategori: Layout, visual hierarchy

**Bukti**

Service pertama diberi `lg:row-span-2` pada wrapper. Card featured juga membawa
class row-span sendiri, tetapi karena berada di dalam wrapper class tersebut
redundan; wrapper-lah yang efektif membuat slot pertama dua kali tinggi. Dengan
empat service dalam tiga kolom, card pertama memanjang tanpa konten tambahan
dan grid berakhir dengan slot kosong/komposisi timpang.

**Dampak**

Ruang kosong tampak seperti konten gagal dimuat. Penekanan visual pada service
pertama tidak mempunyai alasan editorial dan mengurangi scanning layanan lain.

**Perbaikan yang disarankan**

Hapus row span wrapper dan styling featured yang redundan. Bila service pertama
tetap featured, beri konten atau komposisi yang benar-benar berbeda; bila tidak,
gunakan grid seimbang yang menyesuaikan jumlah item.

**Sinyal selesai**

Empat layanan membentuk komposisi desktop yang sengaja dan tidak menyisakan
ruang kosong artifisial pada 1024 serta 1440 px.

### FD-08 — Tiga statistik dipaksa ke grid empat kolom

Severity: **Medium**  
Kategori: Responsive data layout

**Bukti**

Statistics section memakai `lg:grid-cols-4` secara tetap, sementara production
menyediakan tiga item. Hasilnya adalah tiga blok dan satu slot kosong yang
terlihat sebagai bagian belum terisi.

**Dampak**

Komposisi kehilangan keseimbangan dan dapat disalahartikan sebagai data yang
hilang.

**Perbaikan yang disarankan**

Gunakan jumlah kolom yang sadar terhadap jumlah item atau CSS grid auto-fit
dengan batas yang menjaga keterbacaan.

**Sinyal selesai**

Jumlah 1–4 statistik selalu mengisi baris secara seimbang pada breakpoint
target.

### FD-09 — Copy final CTA bertabrakan dengan ilustrasi pada 1024 px

Severity: **Medium**  
Kategori: Responsive composition, readability

**Bukti**

Vault absolut mulai tampil pada `lg`, sementara copy masih dapat memakai
`max-w-3xl`. Pada sekitar 1024 px, area visual dan teks saling menimpa.

**Dampak**

Keterbacaan headline/deskripsi turun dan panel penutup terlihat tidak selesai
pada salah satu breakpoint utama proyek.

**Perbaikan yang disarankan**

Sembunyikan vault hingga `xl`, atau berikan grid dua kolom dan batas copy yang
menjamin ruang ilustrasi.

**Sinyal selesai**

Copy, tombol, dan vault tidak overlap pada 768, 1024, 1280, dan 1440 px.

### FD-10 — Konten terlihat masih tersebar sebagai hardcode

Severity: **Medium**  
Kategori: CMS architecture, maintainability

**Bukti**

Sejumlah eyebrow, heading, deskripsi, warning, value, label CTA, dan teks
section masih didefinisikan langsung di komponen meskipun tujuan produk
menyatakan konten bisnis penting dapat diedit melalui Contentful.

**Dampak**

Perubahan editorial kecil tetap membutuhkan perubahan kode dan deployment.
Pemilik juga dapat mengubah isi section tanpa dapat menyelaraskan heading atau
instruksi pendukungnya.

**Perbaikan yang disarankan**

Inventarisir konten berdasarkan ownership: pindahkan business copy ke model
CMS, pertahankan microcopy teknis yang stabil di kode, dan sediakan fallback
yang jelas.

**Sinyal selesai**

Panduan CMS menyebut setiap field bisnis yang dapat diedit, dan tidak ada
duplikasi source of truth antara Contentful dan komponen.

### FD-11 — Policy page terlalu lebar dan tanggal pembaruan statis

Severity: **Medium**  
Kategori: Long-form readability, content accuracy

**Bukti**

Artikel policy menggunakan container `max-w-3xl`, menghasilkan baris yang lebih
panjang dari ukuran baca nyaman pada desktop. Tanggal “terakhir diperbarui” juga
ditulis langsung di kode.

**Dampak**

Teks legal lebih melelahkan dibaca dan tanggal dapat menjadi tidak akurat saat
isi kebijakan berubah.

**Perbaikan yang disarankan**

Batasi body copy mendekati 60–70 karakter per baris dan jadikan tanggal bagian
dari metadata policy yang diperbarui bersama isi.

**Sinyal selesai**

Line length nyaman pada desktop dan tanggal yang terlihat mempunyai ownership
serta prosedur pembaruan yang jelas.

### FD-12 — Channel tidak aktif tidak memberi jalan lanjut

Severity: **Medium**  
Kategori: Empty state, conversion recovery

**Bukti**

Kartu channel tidak aktif hanya menampilkan tombol disabled “Saluran belum
aktif”, tanpa alasan, estimasi, atau jalur alternatif.

**Dampak**

Pengguna berhenti pada dead end dan tidak tahu apakah perlu kembali nanti atau
memilih sumber informasi lain.

**Perbaikan yang disarankan**

Ubah menjadi empty state informatif: jelaskan status secara singkat dan arahkan
ke admin atau channel aktif lain bila tersedia. Jangan membuat tombol disabled
terlihat sebagai CTA utama.

**Sinyal selesai**

Setiap state channel memberi ekspektasi dan satu next action yang relevan.

## Peluang peningkatan desain

Bagian ini bersifat evaluatif dan tidak mengubah severity defect di atas.

### OP-01 — Kurangi repetisi pola card

Cyan eyebrow, border panel, icon-heading-copy, dan grid card muncul berulang
dengan struktur hampir sama. Variasikan ritme menggunakan daftar tanpa panel,
timeline, editorial split, dan section dengan negative space. Card dipakai
hanya ketika konten benar-benar membutuhkan boundary atau aksi mandiri.

### OP-02 — Perjelas peran warna tanpa mengganti identitas

Navy/cyan tetap dipertahankan sebagai identitas. Cyan sebaiknya lebih selektif
untuk action, focus, active state, dan wayfinding. Royal blue, ice surface, serta
ruang navy yang tenang dapat mengambil porsi lebih besar sehingga aksen cyan
terasa bernilai saat muncul.

### OP-03 — Bangun komposisi yang lebih editorial

Service, feature, process, dan channel tidak perlu semuanya berakhir sebagai
grid icon-card. Gunakan skala, alignment, dan whitespace yang berbeda untuk
membentuk tempo: padat saat memilih admin, lapang saat menjelaskan merek, dan
linear saat menjelaskan proses.

### OP-04 — Tingkatkan kekhasan motif DLMURAH

Vault/lock saat ini orisinal, tetapi masih dapat dibaca sebagai simbol keamanan
generik. Turunkan bentuk wing logo, crystal edge, dan vault menjadi satu crest
atau winged-vault motif yang konsisten pada hero, divider, channel, serta social
asset.

### OP-05 — Sederhanakan branding pada ruang compact

Logo detail berukuran kecil yang diletakkan di samping wordmark kedua terasa
padat. Gunakan simplified lock mark pada navigation compact dan pertahankan
logo lengkap pada hero/footer atau ruang yang cukup.

### OP-06 — Rapikan visual mobile sheet

Perkuat pemisahan header, daftar navigasi, dan CTA bawah tanpa menambah panel
baru. Hindari dua brand mark yang bersaing dan pastikan safe area bawah tetap
menjadi bagian komposisi, bukan sekadar padding teknis.

### OP-07 — Batasi motion ke capability yang tepat

Hover lift sebaiknya hanya aktif pada perangkat yang benar-benar mendukung
hover. Konsolidasikan easing ke kurva deceleration yang halus, pertahankan
`prefers-reduced-motion`, dan perbaiki accordion tanpa menambah volume animasi
atau JavaScript.

## Hasil positif

- **19/19 automated production checks lulus** pada snapshot audit: tujuh
  breakpoint tanpa horizontal overflow, axe WCAG, keyboard, touch target,
  mobile navigation, FAQ, safe external links, anchor integrity, format link
  WhatsApp, policy/404, metadata, security header, console, dan reduced motion.
- Hero mempunyai hierarki yang kuat: eyebrow, headline, deskripsi, dan aksi
  terbaca dalam urutan yang jelas.
- Ilustrasi vault, crystal, angular frame, dan background dibuat orisinal tanpa
  screenshot, karakter, atau aset game berhak cipta.
- Semantic landmarks, satu `h1`, skip link, focus state, drawer, dan accordion
  sudah mempunyai fondasi aksesibilitas yang baik.
- Policy routes tersedia dan halaman 404 konsisten dengan visual language
  situs.
- Existing release evidence mencatat Lighthouse production mobile
  **97/100/100/100** dan desktop **100/100/100/100**. Angka ini adalah evidence
  release sebelumnya, bukan pengukuran Lighthouse baru pada audit ini.

## Metode dan cakupan

Audit menggabungkan:

1. inspeksi kode pada `main`;
2. inspeksi HTML dan UI production;
3. screenshot pada 390, 1024, dan 1440 px;
4. suite Playwright pada 360, 390, 430, 768, 1024, 1280, dan 1440 px;
5. pemeriksaan Contentful yang disanitasi tanpa mencetak token atau nomor privat;
6. perbandingan terhadap product plan dan kriteria `frontend-design`.

Audit tidak mengubah aplikasi, data Contentful, environment Vercel, atau
kontak. Kondisi live dapat berubah setelah tanggal snapshot; re-audit diperlukan
setelah perbaikan P0/P1.

## Dokumen tindak lanjut

Urutan implementasi, acceptance criteria, dependency, dan risiko tersedia di
[`frontend-improvement-roadmap.md`](./frontend-improvement-roadmap.md).
