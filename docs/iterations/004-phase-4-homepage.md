# Iterasi 004 — Homepage Lengkap

Tanggal: 15 Juli 2026

## Tujuan

Membangun semua bagian homepage marketing DLMURAH menggunakan model frontend
yang bersih, CTA WhatsApp aman, dan layout mobile-first.

## Bagian yang dibangun

1. Announcement bar berbasis rentang tanggal.
2. Header sticky dengan perubahan background setelah scroll.
3. Navigasi desktop dan drawer mobile yang aksesibel.
4. Hero dengan ilustrasi brankas orisinal dan CTA adaptif.
5. Trust statistics maksimal empat item.
6. Layanan dalam komposisi bento.
7. Pemilihan admin berdasarkan kategori.
8. Timeline Cara Kerja horizontal/vertikal.
9. Kenapa Memilih DLMURAH dalam format editorial list.
10. Dua saluran WhatsApp.
11. Tentang DLMURAH dan Rich Text.
12. FAQ accordion.
13. Final CTA.
14. Footer dengan kontak, saluran, kebijakan, syarat, dan disclaimer.

## Keamanan CTA

- Nomor dinormalisasi menjadi digit saja.
- Panjang nomor harus 8–15 digit.
- Pesan diproses dengan `encodeURIComponent`.
- Admin tidak aktif tidak menghasilkan tautan `wa.me`.
- Saluran tidak aktif tidak dapat diklik.
- Link eksternal menggunakan `noopener noreferrer`.

## Responsif dan aksesibilitas

- Hero menampilkan konten sebelum ilustrasi pada mobile.
- Button memiliki touch target minimal 44 px.
- Admin dan channel stack pada layar kecil.
- Timeline berubah menjadi vertikal pada mobile.
- Drawer memakai Dialog primitive Radix.
- Header melacak section aktif dengan Intersection Observer.
- Satu heading `h1` dan hierarchy section yang konsisten.
- Skip link menuju `#main-content`.

## Verifikasi

- `pnpm format` — lulus.
- `pnpm lint` — lulus tanpa warning.
- `pnpm type-check` — lulus.
- `pnpm build` — lulus.
- Runtime homepage — HTTP 200 dan cache HIT.
- Delapan section anchor utama ditemukan.
- Tepat satu `h1` ditemukan.
- Fallback menghasilkan nol tautan `wa.me` karena admin belum disetujui.
- Preview dan revalidation route tanpa secret mengembalikan 503.

## Pekerjaan berikutnya

Phase 5: aset turunan tambahan, Open Graph visual, favicon review, dan motion
terkontrol dengan reduced-motion fallback.
