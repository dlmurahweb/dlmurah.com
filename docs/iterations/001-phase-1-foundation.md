# Iterasi 001 — Fondasi Phase 1

Tanggal: 15 Juli 2026  
Commit bukti: `60a1ac4`

## Tujuan

Membangun fondasi produksi DLMURAH tanpa masuk ke integrasi Contentful atau
homepage final.

## Hasil

- Next.js App Router dipindahkan ke `src/app`.
- TypeScript strict, ESLint, Prettier, Tailwind CSS 4, dan shadcn/ui disiapkan.
- pnpm 11.5.3 dikunci melalui `packageManager`.
- Environment schema server-only dibuat dengan Zod.
- Space Grotesk dan Manrope dimuat melalui `next/font`.
- Token warna DLMURAH dan fondasi visual responsif diterapkan.
- Metadata dasar, canonical, Open Graph, Twitter, dan theme color ditambahkan.
- Security headers dasar ditambahkan.
- Logo WebP, favicon, app icon, dan Apple touch icon dibuat dari aset pemilik.
- README proyek diperbarui untuk setup lokal dan deployment.

## File utama

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/lib/env.ts`
- `src/lib/constants.ts`
- `src/lib/utils.ts`
- `next.config.ts`
- `components.json`
- `.env.example`
- `README.md`

## Verifikasi

- `pnpm format:check` — lulus.
- `pnpm lint` — lulus tanpa warning.
- `pnpm type-check` — lulus.
- `pnpm build` — lulus dan route `/` diprerender statis.
- `pnpm audit` — tidak ada kerentanan yang diketahui setelah override PostCSS
  ke 8.5.19.
- Instalasi bersih `pnpm install --frozen-lockfile` — lulus setelah
  `allowBuilds` menggunakan nilai boolean.

## Catatan

Screenshot QA melalui browser dalam aplikasi belum tersedia pada sesi ini.
Pemeriksaan visual lintas breakpoint tetap menjadi bagian Phase 7.

## Pekerjaan berikutnya

Phase 2: model Contentful, seed tooling, typed mapper, preview mode, caching,
dan revalidation endpoint.
