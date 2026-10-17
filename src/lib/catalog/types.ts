// Tipe data katalog. Lihat docs/DATA_CONTRACT.md.

export interface Product {
  id: string;
  name: string;
  category: string;
  /** Harga dalam Rupiah, bilangan bulat >= 0. */
  priceIdr: number;
  unit: string;
  /** Path internal seperti `/products/cabai-bubuk.webp`; undefined bila kosong/tidak valid. */
  imagePath?: string;
  /** Teks biasa. Jangan dirender sebagai HTML. */
  description?: string;
  sortOrder?: number;
  /** Teks apa adanya dari sheet; formatnya belum ditetapkan. */
  updatedAt?: string;
}

export type IssueSeverity = "skipped" | "warning";

/** Diagnostik aman: tidak memuat nilai sel, hanya nomor baris, kolom, dan pesan. */
export interface CatalogIssue {
  /** Nomor baris pada CSV (baris header = 1, data pertama = 2). */
  line: number;
  field?: string;
  severity: IssueSeverity;
  message: string;
}

export type ParseResult =
  | {
      ok: true;
      /** Hanya produk valid dengan `is_published = TRUE`, sudah terurut. */
      products: Product[];
      issues: CatalogIssue[];
      /** Jumlah baris data yang dibaca (tidak termasuk header). */
      totalRows: number;
    }
  | {
      ok: false;
      /** Masalah skema keseluruhan: katalog tidak boleh ditampilkan. */
      schemaError: string;
    };
