import { ArrowDown, MessageCircle } from "lucide-react";
import { createGeneralWhatsAppUrl } from "../lib/whatsapp";

interface HeroProps {
  storeName?: string;
}

export default function Hero({ storeName = "[Nama Toko]" }: HeroProps) {
  const generalWaUrl = createGeneralWhatsAppUrl(storeName);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-b from-blue-50/50 via-white to-white p-6 sm:p-10 text-center">
      <div className="mx-auto max-w-2xl space-y-4">
        {/* Badge status identitas */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Placeholder — Nama toko & identitas belum dikonfirmasi</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Katalog Produk & Harga Toko
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Temukan produk kebutuhan Anda dengan harga transparan. Untuk memastikan ketersediaan barang dan pemesanan, silakan langsung hubungi toko melalui WhatsApp.
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#katalog"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
          >
            <span>Lihat Produk</span>
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>

          <a
            href={generalWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            <span>Tanya via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
