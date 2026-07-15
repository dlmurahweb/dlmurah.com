import { BrandLogo } from "@/components/brand/brand-logo";
import { LoadingState } from "@/components/ui/loading-state";

export default function Loading() {
  return (
    <main id="main-content" className="min-h-dvh bg-background">
      <div className="section-shell section-space">
        <BrandLogo priority />
        <p className="mt-12 font-heading text-2xl font-bold text-foreground">
          Menyiapkan pusat informasi DLMURAH…
        </p>
        <p className="mt-3 text-foreground-muted">
          Konten layanan dan kontak sedang dimuat.
        </p>
        <LoadingState className="mt-10" />
      </div>
    </main>
  );
}
