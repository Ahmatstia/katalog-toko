"use client";

import { formatRupiah } from "../lib/format";
import { useCatalog } from "../lib/catalog/useCatalog";

/**
 * Pratinjau data Phase 2 untuk membuktikan alur data.
 * BUKAN UI final: kartu produk, pencarian, filter, dan WhatsApp dibuat di Phase 3.
 */
export default function CatalogPreview() {
  const { state, reload } = useCatalog();

  return (
    <section aria-labelledby="catalog-preview-title" className="flex flex-col gap-3">
      <h2 id="catalog-preview-title" className="text-xl font-semibold">
        Pratinjau data katalog
      </h2>

      {state.status === "loading" && (
        <p role="status" className="text-neutral-700">
          Memuat katalog…
        </p>
      )}

      {state.status === "not-configured" && (
        <div role="status" className="rounded border border-neutral-300 bg-neutral-50 p-3">
          <p className="font-medium">Sumber katalog belum dikonfigurasi.</p>
          <p className="text-sm text-neutral-700">{state.reason}</p>
          <p className="text-sm text-neutral-700">
            Isi <code>NEXT_PUBLIC_CATALOG_CSV_URL</code> di <code>.env.local</code>, lalu jalankan
            ulang. Tidak ada data contoh yang ditampilkan.
          </p>
        </div>
      )}

      {state.status === "error" && (
        <div role="alert" className="rounded border border-red-300 bg-red-50 p-3">
          <p className="font-medium text-red-900">Katalog sementara tidak dapat dimuat.</p>
          <p className="text-sm text-red-900">{state.message}</p>
          <p className="text-sm text-red-900">
            Harga tidak ditampilkan agar tidak keliru. Kontak WhatsApp toko akan ditampilkan di sini
            setelah nomornya dikonfirmasi pemilik.
          </p>
          <button
            type="button"
            onClick={reload}
            className="mt-2 min-h-11 rounded bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Coba lagi
          </button>
        </div>
      )}

      {state.status === "ready" && state.products.length === 0 && (
        <p role="status" className="rounded border border-neutral-300 bg-neutral-50 p-3">
          Belum ada produk yang ditayangkan.
        </p>
      )}

      {state.status === "ready" && state.products.length > 0 && (
        <>
          <p className="text-sm text-neutral-700">
            {state.products.length} produk tayang
            {state.issues.length > 0 ? ` · ${state.issues.length} catatan data (lihat console dev)` : ""}
            . Harga sesuai data terakhir dimuat; konfirmasi ketersediaan ke toko.
          </p>
          <ul className="flex flex-col gap-2">
            {state.products.map((p) => (
              <li key={p.id} className="rounded border border-neutral-200 p-3">
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-neutral-700">
                  {formatRupiah(p.priceIdr)} / {p.unit} · {p.category}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
