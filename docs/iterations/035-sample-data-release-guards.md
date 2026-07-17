# Iterasi 035 — Sample Data Release Guards

Tanggal: 16 Juli 2026

## Tujuan

Mengubah beberapa item release checklist lokal menjadi regression test agar
sample data tetap aman sebelum pemilik mengisi kontak dan saluran resmi.

## Perubahan

- Menambahkan unit test bahwa setiap content type pada sample entry memiliki
  content model dan jumlah model tetap 11.
- Menambahkan unit test bahwa semua sample admin dan saluran WhatsApp tetap
  `isActive=false` sebelum verifikasi pemilik.
- Menambahkan unit test bahwa sample admin tidak memakai nomor sentinel dan
  tidak menghasilkan link WhatsApp.
- Menambahkan unit test bahwa setiap sample layanan mereferensikan admin seed
  yang tersedia.
- Memperbarui status/audit agar jumlah unit test terbaru tercatat.

## Verifikasi

- `pnpm test:unit` — 17/17 lulus.

## Catatan

Guard ini tidak menyelesaikan item eksternal seperti nomor admin nyata, URL
saluran resmi, webhook Vercel, atau Web Analytics. Item tersebut tetap
membutuhkan akses/data pemilik.
