import type { Metadata } from "next";

import { PolicyPage } from "@/components/layout/policy-page";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi website DLMURAH mengenai analytics, layanan pihak ketiga, dan komunikasi WhatsApp.",
  alternates: { canonical: "/kebijakan-privasi" },
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Kebijakan Privasi"
      description="Penjelasan tentang data teknis yang dapat diproses saat kamu mengakses website dan berpindah ke layanan pihak ketiga."
    >
      <h2>1. Ruang lingkup</h2>
      <p>
        Website DLMURAH berfungsi sebagai pusat informasi dan penghubung menuju
        admin atau saluran WhatsApp. Website ini tidak menyediakan akun
        pelanggan, keranjang, pembayaran, maupun penyimpanan percakapan
        transaksi.
      </p>

      <h2>2. Data yang dapat diproses</h2>
      <p>
        Saat analytics diaktifkan, penyedia hosting dapat memproses data teknis
        terbatas seperti halaman yang dibuka, jenis perangkat, wilayah umum,
        waktu kunjungan, dan interaksi tombol. Event internal DLMURAH hanya
        menggunakan label sumber, layanan, admin, saluran, atau tombol. Nomor
        telepon, isi pesan WhatsApp, kata sandi, dan detail transaksi tidak
        dikirim sebagai properti event.
      </p>

      <h2>3. WhatsApp dan layanan pihak ketiga</h2>
      <p>
        Saat kamu membuka tautan WhatsApp, pemrosesan data selanjutnya mengikuti
        kebijakan dan ketentuan WhatsApp. Konten website dikelola melalui
        Contentful dan website dihosting melalui Vercel; layanan tersebut dapat
        memproses data teknis sesuai kebijakan masing-masing.
      </p>

      <h2>4. Cookie dan mode preview</h2>
      <p>
        Website publik tidak menggunakan cookie untuk akun pelanggan. Cookie
        teknis dapat digunakan pada mode preview yang dilindungi dan hanya
        ditujukan bagi pengelola konten.
      </p>

      <h2>5. Keamanan komunikasi</h2>
      <p>
        DLMURAH tidak meminta kata sandi melalui formulir website. Pastikan kamu
        hanya menggunakan nomor yang tercantum pada website resmi dan periksa
        kembali identitas kontak sebelum membagikan informasi apa pun.
      </p>

      <h2>6. Perubahan dan pertanyaan</h2>
      <p>
        Kebijakan ini dapat diperbarui ketika layanan atau praktik teknis
        berubah. Pertanyaan mengenai kebijakan dapat disampaikan melalui kontak
        resmi yang aktif di website.
      </p>
    </PolicyPage>
  );
}
