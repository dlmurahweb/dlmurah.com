# Iterasi 007 — Quality Assurance

Tanggal: 15 Juli 2026

## Tujuan

Mengaudit dan memverifikasi homepage serta route pendukung pada build produksi,
memperbaiki finding yang terukur, dan menyimpan regression test untuk release
berikutnya.

## Audit dan perbaikan

Laporan lengkap tersedia di
[`../qa/phase-7-interface-audit.md`](../qa/phase-7-interface-audit.md).

- Cascade `a { color: inherit }` di luar CSS layer mengalahkan warna tombol dan
  menghasilkan rasio kontras 1.62:1. Rule redundan dihapus pada sumbernya.
- Link policy footer diperbesar menjadi minimal 44 px.
- Analytics hanya dimuat ketika `VERCEL=1`, sehingga server lokal/non-Vercel
  tidak meminta script yang tidak tersedia.
- Test keyboard FAQ menunggu hydration agar tidak flaky saat paralel.
- Partikel ambient hero disembunyikan pada mobile agar tidak melintas di atas
  teks.
- Security headers ditambah dengan CSP, HSTS, dan Cross-Origin-Opener-Policy.

## Automated QA

Unit test memverifikasi:

- normalisasi nomor WhatsApp;
- encoding prefilled message;
- penolakan nomor tidak valid;
- CTA admin nonaktif tetap dinonaktifkan.

Playwright memverifikasi:

- axe WCAG 2.1 A/AA tanpa violation;
- tidak ada horizontal overflow pada 360, 390, 430, 768, 1024, 1280, dan 1440
  px;
- seluruh target interaktif mobile minimal 44 px;
- drawer mobile, Escape, dan keyboard FAQ;
- seluruh anchor internal memiliki target;
- external link aman dan `wa.me` ternormalisasi;
- policy route dan custom 404;
- canonical, JSON-LD, gambar, dan security headers;
- tidak ada console error;
- reduced-motion;
- endpoint preview/revalidation gagal tertutup tanpa secret valid.

## Lighthouse final

| Mode    | Performance | Accessibility | Best Practices | SEO |
| ------- | ----------- | ------------- | -------------- | --- |
| Mobile  | 90          | 100           | 100            | 100 |
| Desktop | 100         | 100           | 100            | 100 |

Mobile: FCP 0.9 s, LCP 3.7 s, Speed Index 0.9 s, TBT 10 ms, CLS 0.  
Desktop: FCP 0.3 s, LCP 0.7 s, Speed Index 0.3 s, TBT 0 ms, CLS 0.

## Verifikasi akhir fase

- `pnpm test:unit` — 4/4 lulus.
- `pnpm test:e2e` — 19/19 lulus.
- `pnpm lint` — lulus tanpa warning.
- `pnpm type-check` — lulus.
- `pnpm build` — lulus.
- Visual QA dilakukan pada 360, 768, 390 full-page, 1440, dan 1440 full-page.

## Pekerjaan berikutnya

Phase 8: dokumentasi deployment/CMS operasional, audit konfigurasi Vercel,
provisioning Contentful bila management token tersedia, data bisnis nyata,
domain/DNS, Analytics activation, dan verifikasi deployment produksi.
