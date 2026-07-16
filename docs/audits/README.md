# Indeks Audit

Folder ini menyimpan audit lintas iterasi yang menilai kondisi aktual produk.
Audit tidak menggantikan catatan implementasi; setiap dokumen mencatat snapshot,
metode, bukti, serta batas pemeriksaannya.

## Audit aktif

- [`frontend-design-audit.md`](./frontend-design-audit.md) — audit frontend
  berbasis kondisi `main` dan production pada 16 Juli 2026.
- [`frontend-improvement-roadmap.md`](./frontend-improvement-roadmap.md) — urutan
  perbaikan yang dapat diimplementasikan dari temuan audit frontend.
- [`mwtstore-how-it-works-positive-audit.md`](./mwtstore-how-it-works-positive-audit.md)
  — pola positif pada section proses competitor yang diverifikasi dengan
  Playwright dan diterjemahkan tanpa menyalin desain.

## Baseline historis

- [`../qa/phase-7-interface-audit.md`](../qa/phase-7-interface-audit.md) — audit
  interface pada release candidate awal. Temuan di dokumen tersebut sudah
  ditutup pada Iterasi 007 dan tidak dianggap sebagai defect aktif tanpa bukti
  regresi baru.

## Aturan pembaruan

1. Cantumkan tanggal, branch/commit, target environment, dan viewport audit.
2. Pisahkan defect yang dapat dibuktikan dari peluang desain yang bersifat
   evaluatif.
3. Jangan mencatat token, kredensial, atau nomor kontak privat.
4. Pertahankan temuan lama sebagai snapshot; buat audit atau addendum baru bila
   kondisi produk berubah.
