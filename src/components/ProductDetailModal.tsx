"use client";

import { useEffect, useRef } from "react";
import { X, MessageCircle, AlertCircle } from "lucide-react";
import type { Product } from "../lib/catalog/types";
import { formatRupiah } from "../lib/format";
import { createProductWhatsAppUrl } from "../lib/whatsapp";
import ProductImage from "./ProductImage";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Menangani penutupan via tombol keyboard Escape dan mengunci scroll body
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Kunci scroll halaman saat modal terbuka
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Fokus ke tombol tutup ketika modal terbuka untuk aksesibilitas keyboard
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [product, onClose]);

  if (!product) return null;

  const whatsappUrl = createProductWhatsAppUrl(product);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Konten Modal */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-neutral-100 p-4">
          <span className="rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
            {product.category}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-blue-600"
            aria-label="Tutup detail produk"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 space-y-4">
          {/* Gambar Produk */}
          <div className="overflow-hidden rounded-xl border border-neutral-200">
            <ProductImage src={product.imagePath} alt={product.name} />
          </div>

          <div>
            <h2
              id="modal-product-title"
              className="text-xl font-bold text-neutral-900"
            >
              {product.name}
            </h2>

            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-neutral-900">
                {formatRupiah(product.priceIdr)}
              </span>
              <span className="text-sm font-medium text-neutral-600">
                / {product.unit}
              </span>
            </div>
          </div>

          {product.description && (
            <div className="rounded-lg bg-neutral-50 p-3.5 border border-neutral-100">
              <h3 className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Keterangan Produk
              </h3>
              {/* Teks biasa yang aman (bukan dangerouslySetInnerHTML) */}
              <p className="text-sm text-neutral-700 whitespace-pre-line leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Catatan Konfirmasi Stok / Harga */}
          <div className="flex gap-2.5 rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" aria-hidden="true" />
            <p>
              Harga dan ketersediaan stok dapat berubah sewaktu-waktu. Harap
              konfirmasikan langsung kepada toko melalui WhatsApp sebelum memesan.
            </p>
          </div>
        </div>

        {/* Footer Modal dengan Tombol WhatsApp */}
        <div className="border-t border-neutral-100 p-4 bg-neutral-50 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            Tutup
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 flex-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <MessageCircle className="h-5 w-5 fill-white text-emerald-600" aria-hidden="true" />
            <span>Tanya via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
