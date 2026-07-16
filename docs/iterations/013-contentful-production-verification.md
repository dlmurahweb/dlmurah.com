# Iterasi 013 — Verifikasi Production Setelah Contentful

Tanggal: 16 Juli 2026

## Release

- Commit `01fcfba` dipush ke branch `main`.
- GitHub menerima status Vercel `success` untuk deployment commit tersebut.
- Homepage production `https://www.dlmurah.com` merespons `200`.

## Production QA

- Playwright/axe production: 19/19 lulus.
- Seluruh breakpoint 360, 390, 430, 768, 1024, 1280, dan 1440 bebas overflow.
- Keyboard navigation, mobile drawer, FAQ, reduced motion, metadata, security
  headers, policy routes, dan error handling tetap lulus.
- Preview endpoint merespons `503` tanpa konfigurasi secret production.
- Revalidation endpoint merespons `503` tanpa konfigurasi secret production.

## Akses infrastructure

Vercel CLI lokal terautentikasi sebagai account `muhzulzidan`, tetapi account
tersebut tidak memiliki project/team `dlmurah`. Karena itu environment variable,
webhook, dan Web Analytics tidak dapat dikonfigurasi dari CLI pada iterasi ini.

## Input pemilik yang masih diperlukan

- Nomor WhatsApp terverifikasi untuk Admin DL/BGL 1, Admin DL/BGL 2, dan Admin
  Akun.
- Prefilled message dan availability label masing-masing admin.
- Dua URL saluran WhatsApp resmi.
- Persetujuan statistik/klaim yang akan ditampilkan.
- Akses ke project Vercel `dlmurah`, atau persetujuan eksplisit menggunakan
  browser yang sudah login untuk konfigurasi dashboard.

CTA admin dan saluran tetap nonaktif sampai input tersebut tersedia, sehingga
tidak ada pengunjung yang diarahkan ke nomor atau URL placeholder.
