"use client";

import { useCallback, useEffect, useState } from "react";
import { getCatalogConfig } from "./config";
import { fetchCatalog, type CatalogErrorKind } from "./fetch";
import type { CatalogIssue, Product } from "./types";

export type CatalogState =
  | { status: "loading" }
  | { status: "not-configured"; reason: string }
  | { status: "error"; kind: Exclude<CatalogErrorKind, "aborted">; message: string }
  | { status: "ready"; products: Product[]; issues: CatalogIssue[]; loadedAt: Date };

// Nilai env ditanam saat build, jadi cukup dievaluasi sekali.
const config = getCatalogConfig();

/** Memuat katalog di browser. `reload` mengulang pemuatan (tombol "Coba lagi"). */
export function useCatalog(): { state: CatalogState; reload: () => void } {
  const [state, setState] = useState<CatalogState>(
    config.configured
      ? { status: "loading" }
      : { status: "not-configured", reason: config.reason },
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!config.configured) return;

    const controller = new AbortController();
    fetchCatalog(config.url, { signal: controller.signal }).then((result) => {
      if (controller.signal.aborted) return; // komponen dilepas atau ada retry baru
      if (result.ok) {
        if (process.env.NODE_ENV !== "production" && result.issues.length > 0) {
          for (const issue of result.issues) {
            console.warn(
              `[katalog] baris ${issue.line}${issue.field ? ` (${issue.field})` : ""}: ${issue.message}`,
            );
          }
        }
        setState({
          status: "ready",
          products: result.products,
          issues: result.issues,
          loadedAt: result.loadedAt,
        });
      } else if (result.kind !== "aborted") {
        setState({ status: "error", kind: result.kind, message: result.message });
      }
    });

    return () => controller.abort();
  }, [attempt]);

  const reload = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  }, []);

  return { state, reload };
}
