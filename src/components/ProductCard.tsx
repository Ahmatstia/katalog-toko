"use client";

import { MessageCircle, Eye } from "lucide-react";
import type { Product } from "../lib/catalog/types";
import { formatRupiah } from "../lib/format";
import { createProductWhatsAppUrl } from "../lib/whatsapp";
import ProductImage from "./ProductImage";

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export default function ProductCard({
  product,
  onOpenDetail,
}: ProductCardProps) {
  const whatsappUrl = createProductWhatsAppUrl(product);

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-blue-600">
      {/* Area Gambar yang dapat diklik untuk membuka detail */}
      <button
        type="button"
        onClick={() => onOpenDetail(product)}
        className="w-full text-left focus:outline-hidden"
        aria-label={`Buka rincian produk ${product.name}`}
      >
        <ProductImage src={product.imagePath} alt={product.name} />
      </button>

      {/* Konten Kartu */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <span className="inline-block rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700">
            {product.category}
          </span>

          <h3 className="mt-2 text-base font-semibold text-neutral-900 line-clamp-2">
            <button
              type="button"
              onClick={() => onOpenDetail(product)}
              className="text-left hover:text-blue-600 focus:outline-hidden"
            >
              {product.name}
            </button>
          </h3>

          {product.description && (
            <p className="mt-1 text-xs text-neutral-500 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100">
          {/* Harga dan Satuan */}
          <div className="mb-3">
            <p className="text-xs text-neutral-500">Harga</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-neutral-900">
                {formatRupiah(product.priceIdr)}
              </span>
              <span className="text-xs font-medium text-neutral-600">
                / {product.unit}
              </span>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onOpenDetail(product)}
              className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              aria-label={`Lihat detail ${product.name}`}
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>Detail</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 flex-2 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              aria-label={`Tanya ketersediaan ${product.name} via WhatsApp`}
            >
              <MessageCircle className="h-4 w-4 fill-white text-emerald-600" aria-hidden="true" />
              <span>Tanya WA</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
