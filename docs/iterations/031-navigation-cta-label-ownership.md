# Iterasi 031 — Navigation CTA Label Ownership

Tanggal: 16 Juli 2026

## Tujuan

Menutup label CTA navigasi yang masih hardcoded sambil menjaga destination
conversion tetap code-owned ke section pemilihan admin.

## Perubahan

- Menambahkan field Homepage `navigationCtaLabel` dan
  `navigationCtaCompactLabel`.
- Menghubungkan fallback, mapper Contentful, model definition, dan sample entry.
- Mengubah `Header` dan `MobileNavigation` agar memakai label dari Homepage.
- Mempertahankan target CTA navigasi pada `#pilih-admin` agar label tetap
  sejalan dengan arsitektur conversion P1-01.

## Verifikasi

- `pnpm type-check`
- `pnpm test:unit`
- `pnpm lint`
- `pnpm build`
- `pnpm test:e2e`

## Catatan

- CMS tidak mengubah destination CTA navigasi; perubahan hanya memengaruhi label
  terlihat dan `data-label` analytics.
