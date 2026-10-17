"use client";

import { MessageCircle, Store } from "lucide-react";
import { createGeneralWhatsAppUrl } from "../lib/whatsapp";

interface HeaderProps {
  storeName?: string;
}

export default function Header({
  storeName = "[Nama Toko]",
}: HeaderProps) {
  const generalWaUrl = createGeneralWhatsAppUrl(storeName);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Identitas Toko */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
            <Store className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <span className="text-base font-bold text-neutral-900 block leading-tight">
              {storeName}
            </span>
            <span className="text-xs text-neutral-500">
              Katalog Produk Online
            </span>
          </div>
        </div>

        {/* Tombol Hubungi Toko */}
        <a
          href={generalWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          aria-label={`Hubungi ${storeName} via WhatsApp`}
        >
          <MessageCircle className="h-4 w-4 fill-white text-emerald-600" aria-hidden="true" />
          <span className="hidden sm:inline">Hubungi Toko</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
