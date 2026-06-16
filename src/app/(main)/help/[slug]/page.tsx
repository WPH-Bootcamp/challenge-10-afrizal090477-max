import React from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, FileText, ShieldAlert } from "lucide-react";

interface HelpPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const HELP_CONTENTS: Record<string, { title: string; desc: string; steps: string[] }> = {
  "how-to-order": {
    title: "Cara Pemesanan",
    desc: "Berikut adalah panduan langkah demi langkah untuk melakukan pemesanan makanan melalui aplikasi Foody:",
    steps: [
      "Pilih restoran atau jenis kuliner yang Anda inginkan melalui halaman utama atau fitur pencarian.",
      "Klik pada menu makanan yang ingin dipesan, sesuaikan varian atau catatan opsional, lalu masukkan ke dalam keranjang.",
      "Masuk ke halaman keranjang untuk meninjau kembali daftar pesanan, lalu klik tombol lanjut ke pembayaran atau checkout.",
      "Tentukan alamat pengiriman dengan presisi, pilih metode pembayaran yang tersedia, lalu konfirmasi pesanan Anda."
    ]
  },
  "payment-methods": {
    title: "Metode Pembayaran",
    desc: "Foody menyediakan berbagai pilihan metode transaksi yang aman untuk memudahkan proses pembayaran Anda:",
    steps: [
      "Transfer Bank otomatis melalui Virtual Account (mendukung bank-bank besar nasional).",
      "Dompet digital terintegrasi untuk proses verifikasi instan dalam sekali klik.",
      "Kartu Kredit atau Debit Online yang menggunakan jaringan aman berstandar internasional.",
      "Pembayaran tunai langsung di tempat (Cash on Delivery) yang diserahkan langsung kepada kurir saat pesanan tiba."
    ]
  },
  "track-my-order": {
    title: "Status & Pelacakan Pesanan",
    desc: "Anda dapat memantau seluruh proses pengerjaan dan pengiriman hidangan secara berkala melalui sistem kami:",
    steps: [
      "Masuk ke menu aktivitas atau riwayat transaksi untuk melihat daftar pesanan yang sedang berjalan.",
      "Periksa status pengerjaan yang tertera pada detail transaksi, mulai dari tahap konfirmasi pihak merchant hingga persiapan makanan.",
      "Saat pesanan dalam pengantaran, Anda dapat melihat posisi kurir pengirim secara langsung di atas peta digital.",
      "Gunakan informasi kontak kurir yang tertera apabila Anda memerlukan koordinasi lebih lanjut mengenai lokasi pengantaran."
    ]
  },
  "faq": {
    title: "Pertanyaan yang Sering Diajukan (FAQ)",
    desc: "Kumpulan informasi dan jawaban seputar pertanyaan mendasar mengenai operasional dan layanan Foody:",
    steps: [
      "Berapa lama waktu pengiriman pesanan? Waktu pengantaran bersifat dinamis, sangat bergantung pada jarak lokasi Anda dan waktu antrean persiapan di dapur restoran.",
      "Bagaimana cara membatalkan pesanan yang sudah dibuat? Pembatalan hanya dapat dilakukan sebelum pihak restoran menerima dan mulai memproses pesanan Anda.",
      "Apa yang harus dilakukan jika pesanan yang diterima tidak sesuai? Anda dapat langsung menghubungi pusat layanan pelanggan melalui menu kontak yang tersedia dengan menyertakan bukti foto atau struk belanja.",
      "Apakah ada batasan minimum nilai transaksi untuk pemesanan? Tidak ada batas minimum pembelian. Anda dibebaskan untuk memesan menu dalam jumlah porsi berapapun sesuai kebutuhan."
    ]
  }
};

export default async function HelpDetailPage({ params }: HelpPageProps) {
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;
  const content = HELP_CONTENTS[currentSlug] || {
    title: "Pusat Bantuan Foody",
    desc: "Halaman bantuan tidak ditemukan atau sedang dalam proses pemeliharaan berkala.",
    steps: ["Pastikan kembali URL rute yang kamu tuju sudah benar.", "Kembali ke halaman utama untuk melanjutkan penjelajahan."]
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 md:py-20 select-none">
      <div className="w-full max-w-[800px] mx-auto px-4">
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-[#C12116] hover:opacity-80 transition-opacity mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Discover Food
        </Link>

        <div 
          className="w-full bg-white rounded-[20px] p-6 md:p-10"
          style={{ boxShadow: "0px 0px 30px 0px rgba(203, 202, 202, 0.2)" }}
        >
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-6">
            <div className="p-3 bg-red-50 text-[#C12116] rounded-xl">
              {currentSlug === "faq" ? <HelpCircle className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </div>
            <div>
              <h1 className="text-[20px] md:text-[28px] font-[800] text-[#0A0D12] tracking-tight">
                {content.title}
              </h1>
              <p className="text-xs md:text-sm text-slate-400 font-[500] mt-0.5">
                Foody Help Center & Support Guidelines
              </p>
            </div>
          </div>

          <p className="text-[14px] md:text-[16px] font-[400] text-slate-600 leading-relaxed mb-6">
            {content.desc}
          </p>

          <ul className="flex flex-col gap-4">
            {content.steps.map((step, index) => (
              <li 
                key={index} 
                className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C12116] text-white text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-[14px] md:text-[16px] font-[500] text-[#0A0D12] leading-relaxed">
                  {step}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-slate-400 text-xs md:text-sm font-[500]">
              <ShieldAlert className="w-4 h-4 text-slate-400" />
              <span>Butuh bantuan mendesak mengenai transaksi?</span>
            </div>
            <Link 
              href="/contact-us" 
              className="text-xs md:text-sm font-[800] text-[#C12116] hover:underline"
            >
              Hubungi Contact Us &rarr;
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}