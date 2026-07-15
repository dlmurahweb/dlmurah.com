# Iterasi 008 — Deployment Handoff

Tanggal: 15 Juli 2026

## Hasil lokal

- Runbook Vercel, Contentful owner guide, dan release checklist dibuat.
- Contentful setup dimigrasikan dari deprecated legacy client ke plain client.
- Error setup Contentful meredaksi bearer token.
- Frozen-lockfile install dan seluruh release gate lulus.
- Release disimpan pada commit lokal `c8ba7e8`.

## Audit produksi saat ini

- `https://dlmurah.com` merespons 308 ke `https://www.dlmurah.com`.
- `https://www.dlmurah.com` merespons 200 dengan SSL, tetapi masih menjalankan
  homepage Phase 1.
- Deployment lama belum memiliki route robots/sitemap baru dan canonical masih
  localhost.
- Preview deployment Vercel dilindungi SSO.

## Upaya deployment

1. `git push main main` ditolak GitHub dengan 403 untuk credential
   `muhzulzidan`.
2. GitHub plugin terhubung dan dapat membaca repository, tetapi permission yang
   dilaporkan adalah `pull=true`, `push=false`.
3. SSH GitHub tidak memiliki key yang dapat dipakai.
4. Vercel CLI login hanya melihat team personal dan tidak memiliki project
   `dlmurahweb`.
5. Browser session tidak tersedia untuk memakai sesi dashboard lain.

Tidak ada deployment atau konfigurasi produksi yang diubah setelah penolakan
akses tersebut.

## Contentful

- Delivery/Preview credential lokal menunjuk ke space DLMURAH, tetapi model
  belum tersedia (`unknownContentType`).
- Management session lokal menunjuk ke space lain.
- Setup terhadap space DLMURAH gagal tertutup dengan 401; space lain tidak
  disentuh.
- Admin dan saluran fallback tetap nonaktif.

## Blocker pemilik

1. Berikan push access pada repository kepada credential GitHub yang digunakan,
   atau login/connect sebagai `dlmurahweb`.
2. Login Contentful CLI pada account yang memiliki akses ke space DLMURAH atau
   simpan Management token yang tepat di `.env.local`.
3. Berikan nomor admin, URL saluran, dan klaim/statistik yang sudah disetujui.
4. Berikan akses project Vercel untuk memeriksa environment, webhook, dan
   mengaktifkan Analytics.
5. Revoke/rotate Management token Contentful yang tersimpan pada sesi CLI
   sebelum dipakai kembali, karena nilainya sempat muncul pada task execution
   log saat audit credential.

Setelah blocker pertama selesai, push dua commit lokal dan deployment Vercel
akan terpicu. Setelah blocker Contentful/data selesai, jalankan provisioning,
publish konten, konfigurasi webhook, lalu ulangi production QA.
