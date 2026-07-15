import { ArrowLeft, LockKeyhole } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative grid min-h-svh place-items-center overflow-hidden px-5 py-16"
    >
      <div className="ambient-grid" aria-hidden="true" />
      <div className="relative z-10 max-w-xl text-center">
        <BrandLogo priority className="mx-auto" />
        <div className="mx-auto mt-12 grid size-20 place-items-center border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan">
          <LockKeyhole aria-hidden="true" className="size-9" />
        </div>
        <p className="mt-8 text-sm font-extrabold tracking-[0.18em] text-brand-cyan">
          404
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-5 text-base leading-7 text-foreground-muted">
          Tautan yang kamu buka mungkin sudah berubah atau tidak tersedia.
          Kembali ke beranda untuk memilih layanan dan kontak resmi.
        </p>
        <Button variant="whatsapp" size="lg" className="mt-8" asChild>
          <Link href="/">
            <ArrowLeft aria-hidden="true" />
            Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </main>
  );
}
