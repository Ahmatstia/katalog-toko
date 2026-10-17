import Papa from "papaparse";
import type { CatalogIssue, ParseResult, Product } from "./types";

// Kontrak: docs/DATA_CONTRACT.md. Kolom dipetakan lewat nama header, bukan urutan.
const REQUIRED_HEADERS = [
  "id",
  "name",
  "category",
  "price_idr",
  "unit",
  "is_published",
] as const;

// Hanya path internal sederhana di bawah /products/. Tanpa "..", skema, query, atau backslash.
const IMAGE_PATH_PATTERN = /^\/products\/[A-Za-z0-9][A-Za-z0-9._-]*$/;

const PRICE_PATTERN = /^\d+$/;
const INTEGER_PATTERN = /^-?\d+$/;

type Row = Record<string, string | undefined>;

function clean(value: string | undefined): string {
  return (value ?? "").trim();
}

/** `TRUE`/`true`/` true ` => true, `FALSE` => false, lainnya => null (tidak dikenali). */
function parseBoolean(value: string | undefined): boolean | null {
  const v = clean(value).toLowerCase();
  if (v === "true") return true;
  if (v === "false") return false;
  return null;
}

export function isValidImagePath(path: string): boolean {
  return IMAGE_PATH_PATTERN.test(path) && !path.includes("..");
}

/**
 * Parse teks CSV katalog menjadi produk valid.
 * - Masalah skema keseluruhan => `{ ok: false }`.
 * - Baris rusak dilewati dan dicatat di `issues` (tanpa nilai sel).
 * - Produk dengan `is_published` bukan TRUE tidak dikembalikan.
 */
export function parseCatalogCsv(input: string): ParseResult {
  const text = input.replace(/^\uFEFF/, "");

  if (text.trim() === "") {
    return { ok: false, schemaError: "CSV kosong." };
  }
  // Google Sheets kadang mengembalikan halaman HTML (mis. login/error) dengan status 200.
  if (/^\s*<(!doctype|html|head|body)/i.test(text)) {
    return { ok: false, schemaError: "Respons bukan CSV (berupa halaman HTML)." };
  }

  const parsed = Papa.parse<Row>(text, {
    header: true,
    delimiter: ",",
    skipEmptyLines: "greedy",
    transformHeader: (h) => h.trim().toLowerCase(),
  });

  const headers = parsed.meta.fields ?? [];
  const missing = REQUIRED_HEADERS.filter((h) => !headers.includes(h));
  if (missing.length > 0) {
    return {
      ok: false,
      schemaError: `Kolom wajib tidak ditemukan: ${missing.join(", ")}.`,
    };
  }

  const issues: CatalogIssue[] = [];

  // Papa melaporkan baris dengan jumlah kolom tidak sesuai, kutipan rusak, dll.
  const rowErrors = new Map<number, string>();
  for (const err of parsed.errors) {
    if (typeof err.row === "number" && !rowErrors.has(err.row)) {
      rowErrors.set(err.row, err.message);
    }
  }

  const seenIds = new Set<string>();
  const products: Array<{ product: Product; index: number }> = [];

  parsed.data.forEach((row, index) => {
    const line = index + 2; // header = baris 1
    const skip = (field: string | undefined, message: string) =>
      issues.push({ line, field, severity: "skipped", message });
    const warn = (field: string, message: string) =>
      issues.push({ line, field, severity: "warning", message });

    if (rowErrors.has(index)) {
      skip(undefined, "Baris tidak terbaca dengan benar (format CSV).");
      return;
    }

    const id = clean(row.id);
    const name = clean(row.name);
    const category = clean(row.category);
    const unit = clean(row.unit);
    const priceRaw = clean(row.price_idr);

    if (!id) return skip("id", "ID kosong.");
    if (seenIds.has(id)) return skip("id", "ID duplikat; baris pertama dipakai.");
    seenIds.add(id);

    if (!name) return skip("name", "Nama kosong.");
    if (!category) return skip("category", "Kategori kosong.");
    if (!unit) return skip("unit", "Satuan kosong.");

    if (!PRICE_PATTERN.test(priceRaw)) {
      return skip("price_idr", "Harga harus bilangan bulat tanpa simbol atau pemisah.");
    }
    const priceIdr = Number(priceRaw);
    if (!Number.isSafeInteger(priceIdr)) {
      return skip("price_idr", "Harga terlalu besar.");
    }

    const published = parseBoolean(row.is_published);
    if (published === null) {
      return skip("is_published", "Nilai is_published tidak dikenali (gunakan TRUE atau FALSE).");
    }
    if (!published) return; // sengaja disembunyikan; bukan masalah

    const product: Product = { id, name, category, priceIdr, unit };

    const imageRaw = clean(row.image_path);
    if (imageRaw) {
      if (isValidImagePath(imageRaw)) {
        product.imagePath = imageRaw;
      } else {
        // Foto bermasalah tidak menyembunyikan produk; UI memakai placeholder.
        warn("image_path", "Path foto tidak valid; placeholder dipakai.");
      }
    }

    const description = clean(row.description);
    if (description) product.description = description;

    const sortRaw = clean(row.sort_order);
    if (sortRaw) {
      const sortOrder = Number(sortRaw);
      if (INTEGER_PATTERN.test(sortRaw) && Number.isSafeInteger(sortOrder)) {
        product.sortOrder = sortOrder;
      } else {
        warn("sort_order", "sort_order bukan bilangan bulat; urutan default dipakai.");
      }
    }

    const updatedAt = clean(row.updated_at);
    if (updatedAt) product.updatedAt = updatedAt;

    products.push({ product, index });
  });

  // Urutan stabil: sort_order naik (kosong di akhir), lalu urutan baris di sheet.
  products.sort((a, b) => {
    const sa = a.product.sortOrder;
    const sb = b.product.sortOrder;
    if (sa !== undefined && sb !== undefined && sa !== sb) return sa - sb;
    if (sa !== undefined && sb === undefined) return -1;
    if (sa === undefined && sb !== undefined) return 1;
    return a.index - b.index;
  });

  return {
    ok: true,
    products: products.map((p) => p.product),
    issues,
    totalRows: parsed.data.length,
  };
}
