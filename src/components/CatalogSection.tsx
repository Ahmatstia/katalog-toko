"use client";

import { useMemo, useState } from "react";
import { Search, X, RotateCcw, AlertTriangle, AlertCircle, PackageSearch } from "lucide-react";
import type { Product } from "../lib/catalog/types";
import { useCatalog } from "../lib/catalog/useCatalog";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";

export default function CatalogSection() {
  const { state, reload } = useCatalog();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Mengambil daftar unik seluruh kategori dari data produk
  const categories = useMemo(() => {
    if (state.status !== "ready") return ["Semua"];
    const unique = Array.from(new Set(state.products.map((p) => p.category)));
    return ["Semua", ...unique.sort((a, b) => a.localeCompare(b))];
  }, [state]);

  // Filter produk bersamaan: Kategori dan Pencarian Nama
  const filteredProducts = useMemo(() => {
    if (state.status !== "ready") return [];

    const query = searchTerm.trim().toLowerCase();

    return state.products.filter((p) => {
      const matchCategory =
        selectedCategory === "Semua" || p.category === selectedCategory;
      const matchSearch =
        query === "" || p.name.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [state, searchTerm, selectedCategory]);

  const handleResetFilter = () => {
    setSearchTerm("");
    setSelectedCategory("Semua");
  };

  return (
    <section id="katalog" aria-labelledby="catalog-heading" className="w-full">
      <div className="flex flex-col gap-6">
        {/* Judul & Deskripsi Seksi */}
        <div>
          <h2
            id="catalog-heading"
            className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl"
          >
            Daftar Produk
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Temukan produk dan harga terbaru kami. Hubungi toko via WhatsApp untuk ketersediaan stok.
          </p>
        </div>

        {/* Kontrol Pencarian & Filter Kategori */}
        {state.status === "ready" && state.products.length > 0 && (
          <div className="flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative w-full">
              <label htmlFor="catalog-search" className="sr-only">
                Cari produk berdasarkan nama
              </label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                id="catalog-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama produk..."
                className="w-full min-h-11 rounded-xl border border-neutral-300 bg-white py-2.5 pr-10 pl-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-neutral-600"
                  aria-label="Hapus kata pencarian"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Filter Kategori (Chips) */}
            {categories.length > 1 && (
              <div
                role="group"
                aria-label="Filter kategori produk"
                className="flex flex-wrap gap-2"
              >
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`min-h-9 rounded-full px-4 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
                        isActive
                          ? "bg-neutral-900 text-white shadow-xs"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                      aria-pressed={isActive}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= STATE HANDLING ================= */}

        {/* 1. STATE: LOADING */}
        {state.status === "loading" && (
          <div aria-busy="true" aria-live="polite" className="space-y-4">
            <p className="sr-only">Sedang memuat data katalog produk...</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl border border-neutral-200 bg-white p-4 space-y-4"
                >
                  <div className="aspect-square w-full rounded-lg bg-neutral-200" />
                  <div className="h-4 w-24 rounded bg-neutral-200" />
                  <div className="h-5 w-full rounded bg-neutral-200" />
                  <div className="h-6 w-32 rounded bg-neutral-200" />
                  <div className="h-10 w-full rounded bg-neutral-200" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. STATE: NOT CONFIGURED */}
        {state.status === "not-configured" && (
          <div
            role="status"
            className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center"
          >
            <AlertCircle className="h-10 w-10 text-neutral-400 mb-3" aria-hidden="true" />
            <h3 className="text-base font-semibold text-neutral-900">
              Katalog Belum Dikonfigurasi
            </h3>
            <p className="mt-1 max-w-md text-sm text-neutral-600">
              {state.reason}
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Atur <code>NEXT_PUBLIC_CATALOG_CSV_URL</code> di <code>.env.local</code> untuk memuat data.
            </p>
          </div>
        )}

        {/* 3. STATE: ERROR */}
        {state.status === "error" && (
          <div
            role="alert"
            className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
          >
            <AlertTriangle className="h-10 w-10 text-red-600 mb-3" aria-hidden="true" />
            <h3 className="text-base font-semibold text-red-900">
              Katalog Sementara Tidak Dapat Dimuat
            </h3>
            <p className="mt-1 max-w-md text-sm text-red-800">
              {state.message}
            </p>
            <p className="mt-2 text-xs text-red-700">
              Untuk menghindari informasi harga yang keliru, data tidak ditampilkan. Silakan coba kembali atau hubungi toko.
            </p>
            <button
              type="button"
              onClick={reload}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Coba Muat Ulang</span>
            </button>
          </div>
        )}

        {/* 4. STATE: EMPTY CATALOG (Ready tapi 0 produk) */}
        {state.status === "ready" && state.products.length === 0 && (
          <div
            role="status"
            className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center"
          >
            <PackageSearch className="h-10 w-10 text-neutral-400 mb-3" aria-hidden="true" />
            <h3 className="text-base font-semibold text-neutral-900">
              Katalog Masih Kosong
            </h3>
            <p className="mt-1 text-sm text-neutral-600">
              Belum ada produk yang dipublikasikan saat ini.
            </p>
          </div>
        )}

        {/* 5. STATE: SEARCH / FILTER NO RESULTS */}
        {state.status === "ready" &&
          state.products.length > 0 &&
          filteredProducts.length === 0 && (
            <div
              role="status"
              className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center"
            >
              <Search className="h-10 w-10 text-neutral-400 mb-3" aria-hidden="true" />
              <h3 className="text-base font-semibold text-neutral-900">
                Produk Tidak Ditemukan
              </h3>
              <p className="mt-1 max-w-sm text-sm text-neutral-600">
                Tidak ada produk yang cocok dengan pencarian{" "}
                {searchTerm ? `"${searchTerm}"` : ""}
                {selectedCategory !== "Semua" ? ` pada kategori "${selectedCategory}"` : ""}.
              </p>
              <button
                type="button"
                onClick={handleResetFilter}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                Reset Filter & Pencarian
              </button>
            </div>
          )}

        {/* 6. STATE: READY DENGAN HASIL PRODUK */}
        {state.status === "ready" && filteredProducts.length > 0 && (
          <>
            <p className="text-xs text-neutral-500">
              Menampilkan {filteredProducts.length} dari {state.products.length} produk
              {selectedCategory !== "Semua" ? ` (${selectedCategory})` : ""}.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetail={(p) => setActiveProduct(p)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal Detail Produk */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </section>
  );
}
