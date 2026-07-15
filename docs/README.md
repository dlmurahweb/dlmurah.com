# Dokumentasi Proyek DLMURAH

Folder ini menjadi sumber catatan implementasi yang terorganisasi. Spesifikasi
produk utama tetap berada di [`fromchatgpt.md`](../fromchatgpt.md).

## Struktur

- [`project-status.md`](./project-status.md) — status fase, bukti verifikasi,
  dan hambatan eksternal.
- [`contentful-owner-guide.md`](./contentful-owner-guide.md) — panduan editor
  harian untuk pemilik.
- [`deployment.md`](./deployment.md) — runbook Vercel, webhook, analytics, dan
  rollback.
- [`release-checklist.md`](./release-checklist.md) — checklist sebelum dan
  sesudah release.
- [`acceptance-audit.md`](./acceptance-audit.md) — status setiap acceptance
  criteria dan kebutuhan eksternal yang tersisa.
- [`iterations/`](./iterations/) — catatan berurutan untuk setiap iterasi yang
  selesai atau menghasilkan keputusan penting.

## Aturan pencatatan

Setiap iterasi mencatat:

1. tujuan dan batas lingkup;
2. keputusan teknis atau desain;
3. file yang dibuat atau diubah;
4. perintah verifikasi dan hasilnya;
5. pekerjaan yang masih tersisa atau hambatan eksternal.

Nomor iterasi tidak digunakan sebagai nomor versi produk. Nomor hanya menjaga
urutan pekerjaan dan memudahkan audit.
