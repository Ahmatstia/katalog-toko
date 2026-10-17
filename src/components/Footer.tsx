import { MessageCircle } from "lucide-react";
import { createGeneralWhatsAppUrl } from "../lib/whatsapp";

interface FooterProps {
  storeName?: string;
}

export default function Footer({ storeName = "[Nama Toko]" }: FooterProps) {
  const generalWaUrl = createGeneralWhatsAppUrl(storeName);

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 text-neutral-600">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-base font-bold text-neutral-900">{storeName}</p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Katalog Produk Online Lokal
            </p>
          </div>

          <a
            href={generalWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Hubungi Toko via WhatsApp</span>
          </a>
        </div>

        {/* Disclaimer Resmi */}
        <div className="border-t border-neutral-200/70 pt-4 text-xs text-neutral-500 space-y-1.5 leading-relaxed">
          <p>
            <strong>Catatan Harga & Ketersediaan:</strong> Informasi harga dan produk yang tercantum pada katalog ini merupakan kondisi saat pembaruan terakhir. Harga dan ketersediaan stok aktual dapat berubah dan dikonfirmasi langsung oleh pihak toko saat berkomunikasi melalui WhatsApp.
          </p>
          <p>
            Website ini merupakan katalog produk statis tanpa backend atau database berbayar, dirancang untuk memudahkan pembeli lokal.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} {storeName}. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
