"use client";

import { useState } from "react";
import { Package } from "lucide-react";

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
}

/**
 * Komponen gambar produk dengan fallback placeholder SVG.
 * Menjamin aspect ratio tetap stabil dan tidak merusak layout saat foto tidak ditemukan.
 */
export default function ProductImage({
  src,
  alt,
  className = "",
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  // Jika path kosong atau gagal dimuat, tampilkan placeholder
  if (!src || hasError) {
    return (
      <div
        className={`flex aspect-square w-full items-center justify-center bg-neutral-100 text-neutral-400 ${className}`}
        aria-label={`Placeholder foto untuk ${alt}`}
        role="img"
      >
        <div className="flex flex-col items-center gap-1.5 p-4 text-center">
          <Package className="h-10 w-10 stroke-1 text-neutral-400" aria-hidden="true" />
          <span className="text-xs text-neutral-500">Foto belum tersedia</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-square w-full overflow-hidden bg-neutral-50 ${className}`}>
      {/* Menggunakan elemen img biasa yang kompatibel penuh dengan static export */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setHasError(true)}
        className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
      />
    </div>
  );
}
