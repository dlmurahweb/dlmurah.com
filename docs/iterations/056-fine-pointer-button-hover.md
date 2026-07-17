# Iterasi 056 - Hover Lift untuk Fine Pointer

Tanggal: 17 Juli 2026

## Tujuan

Mengunci acceptance P3-01 agar hover lift hanya aktif pada perangkat yang
memiliki hover dan pointer presisi. Pointer touch tetap menerima feedback
active, tetapi tidak menyimpan transform hover yang tidak relevan.

## Hasil

- Memindahkan transform hover tombol ke class `button-lift` di dalam media
  query `(hover: hover) and (pointer: fine)`.
- Mempertahankan perubahan warna hover dan feedback `active` yang sudah ada
  pada setiap variant tombol.
- Menambahkan regression test yang melarang utility `hover:-translate` kembali
  ke source variant tombol.

## Verifikasi

- `pnpm exec tsx --test tests/unit/motion-tokens.test.ts` - 2/2 lulus.

## Pekerjaan tersisa

- Tidak ada pekerjaan lokal khusus untuk hover lift tombol.
- Final cross-browser QA tetap dilakukan bersama release setelah identitas visual
  final disetujui pemilik.
