// Konfigurasi URL CSV katalog. Lihat docs/TECH_STACK_AND_ARCHITECTURE.md bagian 5.

export type CatalogConfig =
  | { configured: true; url: string }
  | { configured: false; reason: string };

/**
 * Evaluasi URL mentah. Dipisah dari `process.env` agar bisa dites.
 * URL placeholder dari `.env.example` (host `.invalid`) dianggap belum dikonfigurasi,
 * supaya tidak ada request ke alamat palsu.
 */
export function resolveCatalogConfig(raw: string | undefined): CatalogConfig {
  const value = (raw ?? "").trim();
  if (!value) {
    return { configured: false, reason: "NEXT_PUBLIC_CATALOG_CSV_URL belum diatur." };
  }

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return { configured: false, reason: "NEXT_PUBLIC_CATALOG_CSV_URL bukan URL yang valid." };
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return { configured: false, reason: "NEXT_PUBLIC_CATALOG_CSV_URL harus berawalan https://." };
  }
  if (parsed.hostname.endsWith(".invalid")) {
    return {
      configured: false,
      reason: "NEXT_PUBLIC_CATALOG_CSV_URL masih berisi placeholder dari .env.example.",
    };
  }

  return { configured: true, url: parsed.toString() };
}

/**
 * Harus ditulis literal `process.env.NEXT_PUBLIC_CATALOG_CSV_URL`
 * agar Next.js menanamkan nilainya saat build (static export).
 */
export function getCatalogConfig(): CatalogConfig {
  return resolveCatalogConfig(process.env.NEXT_PUBLIC_CATALOG_CSV_URL);
}
