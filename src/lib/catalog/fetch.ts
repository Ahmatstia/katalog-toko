import { parseCatalogCsv } from "./parse";
import type { CatalogIssue, Product } from "./types";

export type CatalogErrorKind = "timeout" | "network" | "http" | "schema" | "aborted";

export type CatalogLoadResult =
  | { ok: true; products: Product[]; issues: CatalogIssue[]; totalRows: number; loadedAt: Date }
  | { ok: false; kind: CatalogErrorKind; message: string };

export interface FetchCatalogOptions {
  /** Batas waktu request (ms). */
  timeoutMs?: number;
  /** Sinyal pembatalan dari pemanggil (mis. saat komponen di-unmount atau retry). */
  signal?: AbortSignal;
  /** Dapat diganti saat tes. */
  fetchImpl?: typeof fetch;
}

const DEFAULT_TIMEOUT_MS = 15_000;

/**
 * Ambil dan parse CSV katalog dari browser.
 * Tidak pernah melempar error: semua kegagalan dikembalikan sebagai `{ ok: false }`.
 * Tidak ada cache lokal: data lama tidak ditampilkan sebagai data terbaru.
 */
export async function fetchCatalog(
  url: string,
  { timeoutMs = DEFAULT_TIMEOUT_MS, signal, fetchImpl = fetch }: FetchCatalogOptions = {},
): Promise<CatalogLoadResult> {
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const onExternalAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", onExternalAbort, { once: true });
  }

  try {
    const response = await fetchImpl(url, {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return { ok: false, kind: "http", message: `Server katalog membalas HTTP ${response.status}.` };
    }

    const text = await response.text();
    const parsed = parseCatalogCsv(text);
    if (!parsed.ok) {
      return { ok: false, kind: "schema", message: parsed.schemaError };
    }
    return {
      ok: true,
      products: parsed.products,
      issues: parsed.issues,
      totalRows: parsed.totalRows,
      loadedAt: new Date(),
    };
  } catch {
    if (timedOut) {
      return { ok: false, kind: "timeout", message: "Katalog terlalu lama dimuat." };
    }
    if (signal?.aborted) {
      return { ok: false, kind: "aborted", message: "Pemuatan dibatalkan." };
    }
    // Termasuk kegagalan jaringan dan pemblokiran CORS (browser tidak membedakannya).
    return { ok: false, kind: "network", message: "Tidak dapat menghubungi sumber katalog." };
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onExternalAbort);
  }
}
