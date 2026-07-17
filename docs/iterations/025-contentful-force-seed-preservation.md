# Iterasi 025 — Contentful Force Seed Preservation

Tanggal: 16 Juli 2026

## Tujuan

Memperkuat tooling provisioning agar mode `CONTENTFUL_FORCE_SEED=true` tidak
menghapus field tambahan pemilik pada sample entry yang sudah ada.

## Perubahan

- Mengekstrak helper field entry Contentful ke `scripts/contentful/entry-fields.ts`.
- Mengubah force seed agar sample fields digabung ke `entry.fields`, bukan
  mengganti seluruh object fields.
- Menambahkan unit test untuk:
  - field sample `undefined` tidak ikut dilokalisasi;
  - field tambahan pemilik dan locale lain tetap dipertahankan saat sample field
    diperbarui.
- Memperbarui panduan Contentful agar perilaku force seed yang aman tercatat.

## Verifikasi

- `pnpm test:unit`
- `pnpm type-check`
- `pnpm lint`
- `pnpm build`

## Catatan

- Perubahan ini tidak menjalankan provisioning ke space Contentful nyata dan
  tidak mengubah data production.
