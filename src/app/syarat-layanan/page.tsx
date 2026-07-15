import type { Metadata } from "next";

import { PolicyPage } from "@/components/layout/policy-page";

export const metadata: Metadata = {
  title: "Syarat Layanan",
  description:
    "Syarat penggunaan website DLMURAH sebagai pusat informasi dan penghubung komunikasi melalui WhatsApp.",
  alternates: { canonical: "/syarat-layanan" },
};

export default function TermsPage() {
  return (
    <PolicyPage
      title="Syarat Layanan"
      description="Ketentuan dasar penggunaan website DLMURAH dan komunikasi dengan admin melalui WhatsApp."
    >
      <h2>1. Fungsi website</h2>
      <p>
        Website DLMURAH adalah pusat informasi dan jalur komunikasi. Website
        tidak menjalankan checkout, pembayaran, penyimpanan pesanan, atau
        penyelesaian transaksi.
      </p>

      <h2>2. Transaksi di luar website</h2>
      <p>
        Seluruh komunikasi dan transaksi berlangsung di luar website melalui
        WhatsApp. Pengguna bertanggung jawab memeriksa jumlah, harga, identitas
        kontak, persyaratan, metode, dan setiap detail lain sebelum melanjutkan.
      </p>

      <h2>3. Kontak resmi</h2>
      <p>
        Nomor admin dan tautan saluran dapat berubah. Gunakan hanya kontak yang
        sedang tercantum dan berstatus aktif di website resmi DLMURAH. Waspadai
        pihak yang mengaku sebagai admin melalui nomor lain.
      </p>

      <h2>4. Informasi akun dan keamanan</h2>
      <p>
        Website tidak meminta kata sandi melalui formulir. Jangan mengirim kata
        sandi, kode verifikasi, atau data sensitif melalui pihak yang tidak
        terverifikasi. Tidak ada proses digital yang bebas risiko; pengguna
        harus melakukan konfirmasi secara cermat.
      </p>

      <h2>5. Ketentuan platform dan hukum</h2>
      <p>
        Pengguna dan pemilik layanan perlu meninjau sendiri apakah perdagangan
        akun atau item virtual sesuai dengan ketentuan platform yang berlaku dan
        hukum di wilayah masing-masing. Informasi pada website bukan nasihat
        hukum dan tidak menjamin bahwa suatu transaksi diperbolehkan.
      </p>

      <h2>6. Merek pihak ketiga</h2>
      <p>
        DLMURAH adalah layanan independen dan tidak berafiliasi, didukung, atau
        disponsori oleh Growtopia maupun pemilik merek terkait. Seluruh merek
        dagang pihak ketiga tetap menjadi milik masing-masing pemiliknya.
      </p>

      <h2>7. Perubahan ketentuan</h2>
      <p>
        Ketentuan ini dapat diperbarui untuk menyesuaikan perubahan layanan,
        kontak, teknologi, atau kewajiban yang berlaku. Penggunaan website
        setelah pembaruan berarti pengguna perlu membaca versi terbaru.
      </p>
    </PolicyPage>
  );
}
