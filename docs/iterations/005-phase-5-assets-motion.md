# Iterasi 005 — Aset dan Motion

Tanggal: 15 Juli 2026

## Tujuan

Melengkapi sistem aset orisinal dan memberi gerak ambient yang terkontrol tanpa
menambah beban atau distraksi berlebihan.

## Hasil aset

- Logo sumber tetap disimpan tanpa modifikasi di `assets/logo.JPG`.
- Logo web teroptimasi tersedia sebagai `public/brand/logo.webp`.
- Mark gembok transparan orisinal dibuat sebagai SVG, PNG, dan WebP.
- Mark WebP 512×512 berukuran sekitar 8.3 KB dan digunakan pada footer.
- Hero menggunakan ilustrasi brankas SVG orisinal.
- Crystal, energy line, angular frame, dan icon resolver dapat dipakai ulang.
- Open Graph dan Twitter image 1200×630 dibuat melalui `ImageResponse`.
- Favicon, app icon, dan Apple touch icon tetap menggunakan metadata file
  convention Next.js.

## Motion

- Motion 12 digunakan hanya pada boundary dekorasi hero.
- Empat elemen ambient menggunakan transform/opacity.
- Durasi 5.8–8 detik menjaga gerak tetap lambat.
- `useReducedMotion` menonaktifkan animasi saat pengguna memintanya.
- Interaksi lain tetap memakai CSS transition ringan.

## Keputusan media

`assets/logo-gif.MP4` telah diverifikasi sebagai MP4, bukan GIF. File tidak
dipakai pada homepage agar tidak menambah autoplay media dan ukuran transfer.

## Verifikasi

- `pnpm format` — lulus.
- `pnpm lint` — lulus tanpa warning.
- `pnpm type-check` — lulus.
- `pnpm build` — lulus dan route social image diprerender.
- Open Graph image diverifikasi sebagai PNG 1200×630, 47.9 KB.
- Mark transparan diverifikasi sebagai SVG/PNG/WebP 512×512.

## Pekerjaan berikutnya

Phase 6: metadata dinamis, structured data, robots, sitemap, manifest,
analytics events, privacy policy, terms, dan not-found page.
