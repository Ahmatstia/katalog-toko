import CatalogPreview from "../components/CatalogPreview";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-4 py-12">
      <div className="flex flex-col gap-2">
        <p className="w-fit rounded bg-amber-100 px-2 py-1 text-sm font-medium text-amber-900">
          Placeholder — bukan toko resmi
        </p>
        <h1 className="text-3xl font-semibold">[Nama Toko] — Katalog Produk</h1>
        <p className="text-neutral-700">
          Tahap 2: Pengujian integrasi loader dan parser data CSV Google Sheets.
        </p>
      </div>

      <CatalogPreview />
    </main>
  );
}
