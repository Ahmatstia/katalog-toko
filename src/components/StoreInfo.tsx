import { Clock, MapPin, AlertCircle } from "lucide-react";

export default function StoreInfo() {
  return (
    <section
      aria-labelledby="store-info-heading"
      className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 space-y-6"
    >
      <div>
        <h2
          id="store-info-heading"
          className="text-xl font-bold text-neutral-900 sm:text-2xl"
        >
          Informasi & Cara Bertanya
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          Katalog ini membantu Anda melihat daftar produk dan harga sebelum menghubungi kami.
        </p>
      </div>

      {/* Alur Pemesanan 3 Langkah Ringkas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex gap-3 rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-sm">
            1
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">Pilih Produk</h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Cari barang yang Anda butuhkan melalui kolom pencarian atau filter kategori.
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-sm">
            2
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">Kirim WhatsApp</h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Klik &ldquo;Tanya WA&rdquo; pada produk. Pesan berisi nama barang dan harga akan otomatis disiapkan.
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-sm">
            3
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">Konfirmasi Toko</h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Pihak toko mengonfirmasi ketersediaan barang dan mengatur transaksi secara langsung.
            </p>
          </div>
        </div>
      </div>

      {/* Informasi Operasional (Label Placeholder) */}
      <div className="border-t border-neutral-100 pt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-neutral-500 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Jam Operasional (Placeholder)
            </h4>
            <p className="text-sm text-neutral-900 font-medium mt-0.5">
              Senin – Sabtu: 08.00 – 17.00 WIB
            </p>
            <p className="text-xs text-neutral-500">
              *Jadwal resmi menunggu konfirmasi pemilik toko.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-neutral-500 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Area Layanan (Placeholder)
            </h4>
            <p className="text-sm text-neutral-900 font-medium mt-0.5">
              Area lokal sekitar toko
            </p>
            <p className="text-xs text-neutral-500">
              *Alamat spesifik akan diperbarui setelah disetujui.
            </p>
          </div>
        </div>
      </div>

      {/* Edukasi Tidak Ada Stok Real-Time */}
      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
        <AlertCircle className="h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
        <div>
          <p className="font-semibold">Bukan Sistem E-Commerce Otomatis</p>
          <p className="mt-0.5 text-amber-800">
            Website ini menyajikan katalog informasi produk dan tidak terhubung langsung dengan mesin kasir/POS toko secara real-time. Klik tombol WhatsApp tidak membuat pesanan otomatis; transaksi hanya sah setelah disepakati dengan pengelola toko.
          </p>
        </div>
      </div>
    </section>
  );
}
