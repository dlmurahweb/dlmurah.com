# Iterasi 015 — Frontend Design Audit

Tanggal: 16 Juli 2026  
Jenis perubahan: dokumentasi saja

## Tujuan

Mengaudit kondisi `main` dan production berdasarkan tujuan produk serta kriteria
`frontend-design`, lalu memisahkan defect yang dapat dibuktikan dari peluang
peningkatan visual. Iterasi ini tidak melakukan remediation code, perubahan
Contentful, atau perubahan konfigurasi Vercel.

## Lingkup

- Homepage production pada 390, 1024, dan 1440 px.
- Existing Playwright coverage pada tujuh breakpoint target.
- Source routing CTA, link WhatsApp, structured data, cache/revalidation,
  navigation, layout section, policy, dan state channel.
- Data Contentful diperiksa secara tersanitasi tanpa mencetak kredensial atau
  nomor privat.
- Navy/cyan dipertahankan sebagai constraint merek, bukan defect otomatis.

## Deliverables

- [`../audits/frontend-design-audit.md`](../audits/frontend-design-audit.md) —
  temuan lengkap, bukti, dampak, rekomendasi, dan hasil positif.
- [`../audits/frontend-improvement-roadmap.md`](../audits/frontend-improvement-roadmap.md)
  — roadmap P0–P3 dengan acceptance criteria, risk, dan dependency.
- [`../audits/README.md`](../audits/README.md) — indeks audit aktif dan baseline
  historis.
- Indeks dokumentasi dan iterasi diperbarui.

## Keputusan audit

### Defect production

- 2 Critical: sentinel kontak production dan kontradiksi state availability.
- 5 High: routing CTA generik, ketidaksesuaian label “Pilih Admin”, freshness
  Contentful, gap CTA header 1024–1279 px, dan featured service layout.
- 5 Medium: statistics grid, final CTA overlap, hardcoded CMS copy, policy
  readability/date, dan inactive channel state.

### Peluang desain

Audit merekomendasikan pengurangan pola card yang berulang, pembagian peran
warna yang lebih jelas, komposisi editorial yang lebih bervariasi, motif
winged-vault yang lebih khas, simplified compact mark, mobile sheet yang lebih
tenang, serta motion yang capability-aware.

### Hal yang dipertahankan

- Hierarki hero yang kuat.
- Ilustrasi original tanpa aset game berhak cipta.
- Semantic structure, focus state, keyboard support, dan reduced motion.
- Policy routes dan 404 yang koheren.
- Dark navy/cyan sebagai arahan brand.

## Bukti verifikasi

- Production audit mencatat **19/19 automated checks lulus**, termasuk tujuh
  viewport, axe, keyboard, touch target, metadata, security header, console,
  dan reduced motion.
- Inspeksi source mengonfirmasi sentinel seed, validasi format-only, pemilihan
  admin pertama, gap class `lg`/`xl`, fixed statistics columns, service wrapper
  row span yang menghasilkan ruang kosong, dan final vault mulai `lg`.
- Inspeksi production pada snapshot menemukan 13 link WhatsApp menuju satu
  sentinel serta kontak yang sama pada Organization JSON-LD.
- Existing Lighthouse release evidence tetap dicatat terpisah dari audit ini;
  Lighthouse tidak dijalankan ulang untuk perubahan Markdown-only.

## File yang dibuat atau diubah

- `docs/audits/README.md`
- `docs/audits/frontend-design-audit.md`
- `docs/audits/frontend-improvement-roadmap.md`
- `docs/iterations/015-frontend-design-audit.md`
- `docs/iterations/README.md`
- `docs/README.md`

## Verifikasi dokumentasi

Perubahan ini diverifikasi dengan:

```bash
pnpm exec prettier --check docs
git diff --check
```

Tidak ada `next build` yang diperlukan karena tidak ada file aplikasi,
dependency, environment, maupun konfigurasi runtime yang berubah.

## Pekerjaan berikutnya

Mulai dari P0-01 di roadmap: nonaktifkan atau ganti seluruh kontak sentinel dan
tambahkan guard yang mencegah dummy number masuk ke link serta structured data.
Remediation tersebut harus dicatat sebagai iterasi terpisah dan diaudit ulang
di production.
