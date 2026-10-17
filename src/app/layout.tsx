import type { Metadata } from "next";
import "./globals.css";

// Placeholder: nama toko belum dikonfirmasi pemilik (lihat docs/DECISION_LOG.md).
export const metadata: Metadata = {
  title: "[Nama Toko] — Katalog Produk (placeholder)",
  description:
    "Katalog produk dan harga toko lokal. Hubungi toko melalui WhatsApp untuk konfirmasi ketersediaan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
