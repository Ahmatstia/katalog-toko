import { describe, expect, it } from "vitest";
import {
  createGeneralWhatsAppUrl,
  createProductWhatsAppUrl,
  sanitizeWhatsAppNumber,
} from "./whatsapp";
import type { Product } from "./catalog/types";

describe("sanitizeWhatsAppNumber", () => {
  it("mengubah format lokal 08xxx menjadi 628xxx", () => {
    expect(sanitizeWhatsAppNumber("08123456789")).toBe("628123456789");
  });

  it("menghapus karakter spasi, strip, dan tanda tambah", () => {
    expect(sanitizeWhatsAppNumber("+62 812-3456-7890")).toBe("6281234567890");
  });

  it("mempertahankan nomor yang sudah dalam format internasional tanpa awalan nol", () => {
    expect(sanitizeWhatsAppNumber("6281234567890")).toBe("6281234567890");
  });
});

describe("createProductWhatsAppUrl", () => {
  const dummyProduct: Product = {
    id: "P001",
    name: "Cabai Bubuk",
    category: "Bumbu Dapur",
    priceIdr: 15000,
    unit: "pack",
  };

  it("menghasilkan URL wa.me dengan teks ter-encode yang sesuai template PRD", () => {
    const url = createProductWhatsAppUrl(dummyProduct, "08123456789");

    expect(url).toContain("https://wa.me/628123456789?text=");
    const encodedPart = url.split("?text=")[1];
    const decodedMessage = decodeURIComponent(encodedPart);

    expect(decodedMessage).toContain("Nama: Cabai Bubuk");
    expect(decodedMessage).toContain("Satuan: pack");
    expect(decodedMessage).toMatch(/Harga pada katalog: Rp\s?15\.000/);
    expect(decodedMessage).toContain("Apakah produk tersedia? Terima kasih.");
  });
});

describe("createGeneralWhatsAppUrl", () => {
  it("menghasilkan tautan chat umum dengan nama toko", () => {
    const url = createGeneralWhatsAppUrl("Toko Berkah", "08123456789");
    expect(url).toContain("https://wa.me/628123456789?text=");
    const decodedMessage = decodeURIComponent(url.split("?text=")[1]);
    expect(decodedMessage).toContain("Halo Toko Berkah");
  });
});
