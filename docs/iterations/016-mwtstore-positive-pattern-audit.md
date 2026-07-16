# Iterasi 016 — Audit Pola Positif MWTSTORE

Tanggal: 16 Juli 2026  
Jenis perubahan: dokumentasi saja

## Tujuan

Mengaudit section
[MWTSTORE “How It Works”](https://mwtstore.com/#howitworks) menggunakan
Playwright dan mencatat hal yang bekerja baik sebagai prinsip transferable.
Audit tidak menyalin design, source, aset, copy, warna, atau business claim
competitor.

## Metode

- Playwright Chromium 149 headless.
- Viewport 390×900, 1024×900, dan 1440×900.
- Pilih Bahasa Indonesia melalui language gate sebelum inspeksi.
- Periksa responsive composition, overflow, computed measure, navigation
  keyboard, document language, console, dan axe WCAG 2.0/2.1 A/AA.
- Gunakan screenshot sementara untuk visual inspection; tidak ada screenshot
  competitor yang disimpan di repository.

## Hasil utama

- Process berubah dari horizontal four-step rail menjadi vertical timeline,
  bukan sekadar mengecilkan desktop grid.
- Tidak ada horizontal overflow, axe violation, atau console error pada tiga
  viewport yang diuji.
- Marker 48×48 px, content measure, dan line-height konsisten membentuk scanning
  hierarchy yang jelas.
- Borderless sequence memberi ritme berbeda dari section card-based.
- Urutan narasi layanan → proses → trust → CTA bekerja sebagai conversion story.
- Setelah pilihan Indonesia, `html[lang]` berubah ke `id` dan copy utama
  terlokalisasi.

## Batas adopsi

- DLMURAH tidak boleh menyalin purple palette, typography, grid texture,
  chamfered geometry, atau layout competitor secara langsung.
- Klaim absolut MWTSTORE tidak sesuai content safeguard DLMURAH.
- Language gate dan middleman private game berada di luar kebutuhan/scope
  DLMURAH.
- Implementasi DLMURAH harus memperbaiki semantics menggunakan ordered list,
  heading langkah, dan anchor scroll offset.

## Deliverable

- [`../audits/mwtstore-how-it-works-positive-audit.md`](../audits/mwtstore-how-it-works-positive-audit.md)
  — temuan positif, evidence Playwright, batas adopsi, serta rekomendasi
  implementasi DLMURAH.
- Indeks audit dan iterasi diperbarui.

## Verifikasi dokumentasi

```bash
pnpm exec prettier --check docs
git diff --check
```

Application build tidak diperlukan karena iterasi ini tidak mengubah runtime
code atau dependency project. Instalasi Chromium hanya berada pada cache lokal
Playwright dan tidak mengubah manifest repository.
