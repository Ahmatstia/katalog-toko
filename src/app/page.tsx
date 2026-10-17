import Header from "../components/Header";
import Hero from "../components/Hero";
import CatalogSection from "../components/CatalogSection";
import StoreInfo from "../components/StoreInfo";
import Footer from "../components/Footer";

export default function Home() {
  const storeName = "[Nama Toko]";

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      {/* Header dengan tombol kontak WhatsApp */}
      <Header storeName={storeName} />

      {/* Konten Utama */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 space-y-12 sm:space-y-16">
        {/* Seksi Hero */}
        <Hero storeName={storeName} />

        {/* Seksi Katalog Utama (Search, Filter Kategori, Grid Produk, Modal Detail) */}
        <CatalogSection />

        {/* Seksi Informasi Toko & Cara Bertanya */}
        <StoreInfo />
      </main>

      {/* Footer */}
      <Footer storeName={storeName} />
    </div>
  );
}
