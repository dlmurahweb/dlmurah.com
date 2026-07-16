# Frontend Improvement Roadmap

Tanggal: 16 Juli 2026  
Sumber: [`frontend-design-audit.md`](./frontend-design-audit.md)

## Tujuan

Roadmap ini mengubah temuan audit menjadi unit implementasi yang dapat diuji.
Urutan mengutamakan keselamatan kontak production dan ketepatan conversion
sebelum visual polish. Setiap item tetap berada dalam lingkup website informasi
dan WhatsApp conversion; tidak menambahkan checkout, akun, atau backend
transaksi.

## Prinsip eksekusi

1. **Data aman sebelum UI menarik.** Tidak ada CTA atau structured data yang
   boleh menerbitkan nomor seed.
2. **Label harus sama dengan aksi.** CTA generik memilih kategori; CTA spesifik
   boleh membuka WhatsApp.
3. **CMS mempunyai SLA nyata.** Window pembaruan harus dibuktikan di production,
   bukan hanya diasumsikan dari konstanta cache.
4. **Responsif berarti fungsi tetap tersedia.** Breakpoint tidak boleh
   menghilangkan jalur konversi utama.
5. **Brand refinement mempertahankan navy/cyan.** Perubahan mengatur proporsi,
   ritme, dan motif; bukan mengganti identitas.

## P0 — Production safety

### P0-01 — Hentikan publikasi kontak sentinel

- **Affected subsystem:** Contentful entries, WhatsApp utility, homepage,
  structured data.
- **Intended result:** hanya kontak yang telah diverifikasi dapat menghasilkan
  CTA, link `wa.me`, analytics data, atau `ContactPoint` JSON-LD.
- **Implementation direction:**
  - segera nonaktifkan tiga admin placeholder atau ganti dengan nomor yang
    disetujui pemilik;
  - tambahkan helper tunggal untuk menentukan `isContactPublishable`;
  - denylist sentinel seed dan nilai dummy yang didokumentasikan;
  - gunakan helper yang sama untuk admin card, service CTA, generic CTA guard,
    footer, dan structured data.
- **Acceptance criteria:**
  - sentinel `620000000000` tidak ditemukan pada HTML production;
  - nomor tidak valid/dummy tidak menghasilkan link atau JSON-LD meskipun
    `isActive=true`;
  - admin tanpa kontak valid menampilkan state nonaktif yang konsisten;
  - unit dan E2E regression test mencakup sentinel, kosong, karakter format,
    serta nomor valid.
- **Risk:** denylist yang terlalu luas dapat menolak nomor valid; rule harus
  eksplisit dan dilengkapi test.
- **Dependency:** pemilik menentukan kontak resmi atau menyetujui deactivation
  sementara; perubahan entry memerlukan akses Contentful.

### P0-02 — Tambahkan validasi pada jalur editorial

- **Affected subsystem:** Contentful content model, provisioning script, CMS
  guide.
- **Intended result:** editor mendapat pencegahan sebelum placeholder dapat
  dipublish sebagai admin aktif.
- **Implementation direction:** tambahkan help text/validation yang sesuai
  kemampuan Contentful, pisahkan state “draft contact” dari “active”, dan
  dokumentasikan langkah verifikasi nomor.
- **Acceptance criteria:**
  - entry baru tidak seeded sebagai aktif;
  - panduan pemilik mewajibkan test link sebelum aktivasi;
  - aktivasi dengan sentinel gagal di aplikasi meskipun CMS hanya dapat
    memvalidasi format;
  - sample data aman untuk dijalankan ulang.
- **Risk:** Contentful regex tidak cukup untuk mengenali semua dummy number;
  application guard tetap wajib.
- **Dependency:** P0-01 menentukan source of truth validasi.

## P1 — Conversion correctness dan operasi

### P1-01 — Perbaiki arsitektur destination CTA

- **Affected subsystem:** header, mobile navigation, hero, final CTA, service
  card, analytics attributes.
- **Intended result:** CTA generik membawa pengguna ke pemilihan admin;
  WhatsApp langsung hanya digunakan setelah konteks layanan/admin diketahui.
- **Implementation direction:** hapus pemilihan `primaryAdmin` dari CTA generik,
  gunakan `#pilih-admin`, lalu audit label dan analytics source di seluruh aksi.
- **Acceptance criteria:**
  - header, hero, mobile navigation, dan tombol “Pilih Admin” scroll ke section
    admin;
  - admin card membuka admin yang ditampilkan;
  - service card hanya membuka admin yang direferensikan dan valid;
  - tidak ada CTA bernama “Pilih Admin” yang membuka tab eksternal;
  - E2E menguji label, href, target, dan analytics source.
- **Risk:** jumlah klik sebelum WhatsApp bertambah satu; ini disengaja untuk
  meningkatkan routing accuracy.
- **Dependency:** P0-01 agar CTA spesifik tidak menerbitkan sentinel.

### P1-02 — Jadikan freshness Contentful dapat diprediksi

- **Affected subsystem:** Contentful fetch, Next.js cache/revalidation, Vercel
  environment, webhook, owner documentation.
- **Intended result:** publish Contentful muncul pada production dalam SLA yang
  konsisten dan dapat dipulihkan secara aman melalui webhook.
- **Implementation direction:**
  - konfigurasi `CONTENTFUL_REVALIDATE_SECRET` di Vercel Production;
  - buat webhook publish/unpublish menuju endpoint protected;
  - pilih satu ownership cache yang jelas agar route dan data cache tidak
    memakai lifetime tumpang tindih tanpa alasan;
  - catat observed publish-to-live time.
- **Acceptance criteria:**
  - request tanpa/secret salah ditolak;
  - webhook sah merespons sukses dan membuat perubahan live;
  - tiga percobaan published change muncul dalam SLA yang didokumentasikan;
  - preview tetap terpisah dari Delivery API;
  - token tidak bocor pada client bundle atau log.
- **Risk:** invalidation terlalu luas dapat meningkatkan request Contentful;
  monitor penggunaan dan pertahankan fallback aman.
- **Dependency:** akses Vercel dan Contentful webhook oleh pemilik project.

### P1-03 — Tutup gap responsive header

- **Affected subsystem:** desktop header dan mobile drawer.
- **Intended result:** satu jalur CTA selalu tersedia pada lebar 360–1440 px.
- **Implementation direction:** tampilkan CTA mulai `lg` atau samakan breakpoint
  pergantian drawer/CTA; sesuaikan spacing untuk 1024–1279 px.
- **Acceptance criteria:**
  - 1024 dan 1279 px menampilkan CTA atau menu, tidak pernah keduanya hilang;
  - navigation tidak wrap, overlap, atau overflow;
  - keyboard order dan focus state tetap benar;
  - test viewport menambah boundary 1023, 1024, 1279, dan 1280 px.
- **Risk:** label penuh dapat berdesakan dengan lima navigation item pada 1024
  px; gunakan spacing/compact label yang tetap jelas.
- **Dependency:** P1-01 menentukan destination CTA.

### P1-04 — Perbaiki layout statistik, layanan, dan final CTA

- **Affected subsystem:** statistics section, services section/service card,
  final CTA illustration.
- **Intended result:** semua komposisi utama tampak sengaja pada jumlah data dan
  breakpoint aktual.
- **Implementation direction:**
  - buat statistics grid count-aware;
  - hapus wrapper row span dan styling featured row-span yang redundan;
  - sembunyikan vault final CTA di bawah `xl` atau sediakan kolom khusus.
- **Acceptance criteria:**
  - 1–4 statistik membentuk baris seimbang;
  - empat service tidak menyisakan featured card kosong atau orphan slot;
  - final CTA tidak overlap pada 768, 1024, 1280, dan 1440 px;
  - tujuh target viewport tetap tanpa horizontal overflow;
  - screenshot regression mencakup 390, 1024, dan 1440 px.
- **Risk:** layout count-aware dengan class dinamis dapat tidak terdeteksi oleh
  Tailwind; gunakan mapping class statis atau CSS yang dapat dianalisis.
- **Dependency:** tidak ada dependency eksternal.

## P2 — Content ownership dan visual refinement

### P2-01 — Selesaikan ownership konten CMS

- **Affected subsystem:** Homepage/content models, section props, mapper,
  fallback, owner guide.
- **Intended result:** business copy penting dapat diperbarui tanpa deployment,
  sedangkan microcopy teknis tetap stabil di kode.
- **Implementation direction:** buat inventory field untuk eyebrow, heading,
  description, warning, CTA label, dan policy metadata; pindahkan hanya konten
  yang memang dimiliki editor.
- **Acceptance criteria:**
  - setiap field bisnis memiliki source of truth tunggal;
  - mapper menangani missing field dengan fallback aman;
  - owner guide menjelaskan field dan preview;
  - tidak ada raw Contentful object masuk ke component.
- **Risk:** model terlalu granular membuat editing berat; kelompokkan copy
  berdasarkan section dan frekuensi perubahan.
- **Dependency:** perubahan model Contentful dan sample entries memerlukan
  migration/provisioning yang aman.

### P2-02 — Kurangi bahasa visual yang templated

- **Affected subsystem:** section composition, card primitives, color tokens,
  spacing rhythm.
- **Intended result:** halaman tetap konsisten tetapi tidak terasa sebagai
  rangkaian card dengan pola yang sama.
- **Implementation direction:**
  - pertahankan card untuk admin dan channel yang memang actionable;
  - ubah process menjadi timeline yang lebih linear;
  - ubah sebagian feature menjadi borderless editorial list;
  - gunakan negative space dan royal/ice surfaces untuk mengurangi dominasi
    cyan border;
  - variasikan section spacing berdasarkan fungsi, bukan satu pola universal.
- **Acceptance criteria:**
  - tidak ada lebih dari dua section berturut-turut dengan komposisi
    icon-heading-copy card grid identik;
  - cyan tetap memenuhi fungsi action/focus/active dan contrast AA;
  - mobile scanning order tetap linear;
  - pengurangan panel tidak menghilangkan affordance elemen interaktif.
- **Risk:** variasi berlebihan dapat merusak coherence; gunakan token yang sama
  dan review halaman sebagai satu urutan.
- **Dependency:** design review dan screenshot comparison pada tiga viewport.

### P2-03 — Kembangkan motif crest/winged vault

- **Affected subsystem:** brand illustration, compact logo treatment, hero,
  section divider, social image.
- **Intended result:** simbol keamanan terasa milik DLMURAH, bukan vault generik.
- **Implementation direction:** derivasi lock, wing geometry, dan crystal edge
  dari logo menjadi crest yang dapat dipakai pada beberapa skala. Gunakan
  simplified lock mark pada header compact dan logo penuh pada konteks besar.
- **Acceptance criteria:**
  - motif tetap terbaca pada 24–48 px dan pada hero besar;
  - tidak menggunakan/meniru aset Growtopia;
  - rasio serta detail logo tidak pecah pada mobile;
  - aset raster/SVG mempunyai ukuran dan alt treatment yang sesuai.
- **Risk:** motif terlalu detail kembali gagal pada ukuran kecil; definisikan
  varian responsive, bukan hanya resize satu aset.
- **Dependency:** persetujuan pemilik terhadap evolusi identitas visual.

### P2-04 — Perbaiki policy dan inactive channel state

- **Affected subsystem:** policy layout/metadata, channel card empty state.
- **Intended result:** long-form content lebih nyaman dibaca dan state nonaktif
  tetap membantu pengguna melanjutkan tugas.
- **Implementation direction:** batasi measure policy ke sekitar `65ch`, buat
  last-updated metadata dapat dipelihara, dan ganti disabled-only channel dengan
  penjelasan plus fallback action.
- **Acceptance criteria:**
  - policy body berada pada range baca 60–70 karakter per baris desktop;
  - tanggal diperbarui bersama perubahan kebijakan;
  - channel nonaktif tidak terlihat seperti tombol rusak;
  - alternatif hanya ditampilkan bila destination-nya valid.
- **Risk:** fallback ke admin dapat kembali salah kategori; gunakan generic
  `#pilih-admin`, bukan admin pertama.
- **Dependency:** P1-01 dan P0-01.

## P3 — Polish

### P3-01 — Refine interaction dan optical details

- **Affected subsystem:** hover state, motion tokens, accordion, navigation,
  mobile sheet.
- **Intended result:** interaction terasa tenang, konsisten, dan sesuai input
  device tanpa menambah beban JavaScript.
- **Implementation direction:**
  - bungkus hover lift dalam `@media (hover: hover) and (pointer: fine)`;
  - konsolidasikan easing ke kurva ease-out quart/quint;
  - gunakan transform/opacity atau grid-row untuk accordion;
  - rapikan separator, compact brand mark, baseline icon, dan safe-area sheet.
- **Acceptance criteria:**
  - perangkat touch tidak mendapat hover transform yang tertinggal;
  - reduced motion menonaktifkan ambient/nonessential motion;
  - accordion tidak mengandalkan animasi `height`;
  - navigation dan sheet lulus keyboard/focus test;
  - tidak ada kenaikan berarti pada client JavaScript.
- **Risk:** optical tweak mudah menjadi churn tanpa target; batasi pada issue
  yang terlihat di screenshot review.
- **Dependency:** P2-02 dan P2-03 menetapkan komposisi serta brand mark final.

## Urutan implementasi yang disarankan

1. **Hotfix data:** P0-01, lalu audit production segera.
2. **Guard permanen:** P0-02 dan regression tests.
3. **Conversion iteration:** P1-01 serta P1-03.
4. **Operational iteration:** P1-02 dengan controlled Contentful publish test.
5. **Responsive iteration:** P1-04 dan screenshot regression.
6. **CMS/visual iteration:** P2-01 sampai P2-04 setelah alur inti stabil.
7. **Polish iteration:** P3-01 dan final cross-browser QA.

P0 tidak boleh menunggu redesign. P2/P3 tidak boleh dirilis sebagai pengganti
perbaikan nomor placeholder atau routing CTA.

## Release gates

Sebelum production release yang mengaktifkan WhatsApp:

- tidak ada sentinel/dummy number pada build atau Contentful published data;
- link dan JSON-LD memakai guard yang sama;
- CTA generik menuju pemilihan admin;
- secret/webhook revalidation terverifikasi;
- viewport 360, 390, 430, 768, 1024, 1280, dan 1440 lulus;
- axe, keyboard, touch target, console, metadata, dan reduced-motion checks tetap
  lulus;
- pemilik menyetujui kontak, label availability, dan channel resmi.
