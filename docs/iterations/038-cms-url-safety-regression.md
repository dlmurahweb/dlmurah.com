# Iterasi 038 — CMS URL Safety Regression

Tanggal: 16 Juli 2026

## Tujuan

Mengunci aturan dari panduan Contentful bahwa URL dari CMS hanya boleh menjadi
anchor internal, path internal, atau URL HTTPS.

## Perubahan

- Menambahkan `tests/unit/contentful-mappers.test.ts`.
- Menguji mapper navigasi agar menerima anchor, path internal, dan HTTPS, tetapi
  mengganti `http`, protocol-relative URL, dan `javascript:` dengan fallback
  aman.
- Menguji mapper saluran dan pengumuman agar URL eksternal tidak aman dibuang.
- Menguji mapper Site Settings dan Homepage agar field URL/CTA target tidak aman
  kembali ke fallback repository.
- Memperbarui status/audit agar jumlah unit test terbaru tercatat.

## Verifikasi

- `pnpm test:unit` — 23/23 lulus.

## Catatan

Guard ini bekerja pada boundary Contentful mapper sehingga komponen menerima
data link yang sudah disaring.
