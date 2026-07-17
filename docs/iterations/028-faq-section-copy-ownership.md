# Iterasi 028 — FAQ Section Copy Ownership

Tanggal: 16 Juli 2026

## Tujuan

Menutup sisa copy bisnis homepage pada section FAQ agar framing section dapat
dikelola pemilik melalui entry Homepage, sementara item FAQ tetap dikelola pada
content type `faq`.

## Perubahan

- Menambahkan field Homepage `faqEyebrow`, `faqHeading`, dan `faqDescription`.
- Menghubungkan fallback, mapper Contentful, model definition, dan sample entry.
- Mengubah `FaqSection` agar menerima `homepage` dan memakai copy dari CMS.
- Memperbarui panduan pemilik untuk membedakan framing section FAQ dari daftar
  pertanyaan/jawaban FAQ.

## Verifikasi

- `pnpm type-check`
- `pnpm test:unit`
- `pnpm lint`
- `pnpm build`
- `pnpm test:e2e`

## Catatan

- Tidak ada perubahan pada struktur item FAQ atau analytics event FAQ.
