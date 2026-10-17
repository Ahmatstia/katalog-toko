import { describe, expect, it } from "vitest";
import { isValidImagePath, parseCatalogCsv } from "./parse";

describe("isValidImagePath", () => {
  it("menerima path internal produk yang valid", () => {
    expect(isValidImagePath("/products/cabai-bubuk.webp")).toBe(true);
    expect(isValidImagePath("/products/beras_premium-5kg.png")).toBe(true);
    expect(isValidImagePath("/products/P001.jpg")).toBe(true);
  });

  it("menolak path traversal dan skema berbahaya", () => {
    expect(isValidImagePath("/products/../secret.txt")).toBe(false);
    expect(isValidImagePath("https://external.com/photo.jpg")).toBe(false);
    expect(isValidImagePath("javascript:alert(1)")).toBe(false);
    expect(isValidImagePath("/uploads/cabai.webp")).toBe(false);
    expect(isValidImagePath("/products/")).toBe(false);
    expect(isValidImagePath("/products/sub/photo.jpg")).toBe(false);
  });
});

describe("parseCatalogCsv", () => {
  const sampleValidCsv = `id,name,category,price_idr,unit,image_path,description,is_published,sort_order,updated_at
P001,Cabai Bubuk,Bumbu Dapur,15000,pack,/products/cabai-bubuk.webp,Cabai merah kering giling murni.,TRUE,1,2026-10-17
P002,Gula Pasir,Sembako,18000,kg,/products/gula-pasir.webp,Gula kristal putih manis alami.,TRUE,2,2026-10-17
P003,Beras Rojolele,Sembako,75000,karung 5kg,,Beras pulen pilihan keluarga.,FALSE,3,2026-10-17`;

  it("berhasil parse CSV valid dengan 10 header produksi", () => {
    const res = parseCatalogCsv(sampleValidCsv);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.totalRows).toBe(3);
    // P003 is_published = FALSE sehingga hanya P001 dan P002 yang kembali
    expect(res.products).toHaveLength(2);

    expect(res.products[0]).toEqual({
      id: "P001",
      name: "Cabai Bubuk",
      category: "Bumbu Dapur",
      priceIdr: 15000,
      unit: "pack",
      imagePath: "/products/cabai-bubuk.webp",
      description: "Cabai merah kering giling murni.",
      sortOrder: 1,
      updatedAt: "2026-10-17",
    });

    expect(res.products[1].id).toBe("P002");
    expect(res.issues).toHaveLength(0);
  });

  it("mengenali header yang posisinya diacak", () => {
    const randomizedCsv = `price_idr,is_published,name,id,unit,category
15000,TRUE,Cabai Bubuk,P001,pack,Bumbu Dapur`;
    const res = parseCatalogCsv(randomizedCsv);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.products).toHaveLength(1);
    expect(res.products[0].id).toBe("P001");
    expect(res.products[0].name).toBe("Cabai Bubuk");
    expect(res.products[0].priceIdr).toBe(15000);
    expect(res.products[0].category).toBe("Bumbu Dapur");
  });

  it("menangani UTF-8 BOM dan karakter khusus bahasa Indonesia", () => {
    const csvWithBom = `\uFEFFid,name,category,price_idr,unit,is_published
P001,Kopi Luwak Asli (100% Murni),Minuman Hangat,50000,cup,TRUE`;
    const res = parseCatalogCsv(csvWithBom);
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.products[0].name).toBe("Kopi Luwak Asli (100% Murni)");
  });

  it("menangani quoted values yang memuat koma, kutipan ganda, dan newline", () => {
    const complexCsv = `id,name,category,price_idr,unit,description,is_published
P001,"Bawang Goreng, Renyah & Gurih",Bumbu Dapur,25000,toples,"Deskripsi baris 1
Deskripsi baris 2 dengan ""kutipan khusus"".",TRUE`;
    const res = parseCatalogCsv(complexCsv);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.products[0].name).toBe("Bawang Goreng, Renyah & Gurih");
    expect(res.products[0].description).toBe(
      'Deskripsi baris 1\nDeskripsi baris 2 dengan "kutipan khusus".',
    );
  });

  it("menolak CSV kosong atau whitespace", () => {
    const res = parseCatalogCsv("   \n\n  ");
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.schemaError).toMatch(/CSV kosong/i);
  });

  it("menolak respons server yang berupa halaman HTML (misal error redirect Google Sheets)", () => {
    const htmlResponse = `<!DOCTYPE html><html><head><title>Error</title></head><body>Sign in to continue</body></html>`;
    const res = parseCatalogCsv(htmlResponse);
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.schemaError).toMatch(/bukan CSV/i);
  });

  it("menolak bila ada kolom wajib yang hilang dari header", () => {
    // Hilang kolom unit dan is_published
    const incompleteHeaders = `id,name,category,price_idr\nP001,Gula,Sembako,10000`;
    const res = parseCatalogCsv(incompleteHeaders);
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.schemaError).toMatch(/Kolom wajib tidak ditemukan/i);
    expect(res.schemaError).toContain("unit");
    expect(res.schemaError).toContain("is_published");
  });

  it("melewati baris dengan ID duplikat secara aman dan mencatat issue", () => {
    const duplicateCsv = `id,name,category,price_idr,unit,is_published
P001,Barang Pertama,Kategori,10000,pcs,TRUE
P001,Barang Kembar Beda Nama,Kategori,12000,pcs,TRUE`;
    const res = parseCatalogCsv(duplicateCsv);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.products).toHaveLength(1);
    expect(res.products[0].name).toBe("Barang Pertama");
    expect(res.issues).toHaveLength(1);
    expect(res.issues[0]).toMatchObject({
      line: 3,
      field: "id",
      severity: "skipped",
    });
  });

  it("melewati baris dengan kolom wajib kosong (name, category, unit, price)", () => {
    const invalidRowsCsv = `id,name,category,price_idr,unit,is_published
P001,,Sembako,10000,pcs,TRUE
P002,Nama Ada,,10000,pcs,TRUE
P003,Nama Ada,Sembako,10000,,TRUE
P004,Nama Ada,Sembako,,pcs,TRUE
P005,Barang Benar,Sembako,10000,pcs,TRUE`;
    const res = parseCatalogCsv(invalidRowsCsv);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.products).toHaveLength(1);
    expect(res.products[0].id).toBe("P005");
    expect(res.issues).toHaveLength(4);
  });

  it("menolak harga non-numerik atau desimal / ada teks Rp", () => {
    const invalidPrices = `id,name,category,price_idr,unit,is_published
P001,Barang A,Kat,Rp15000,pcs,TRUE
P002,Barang B,Kat,15.000,pcs,TRUE
P003,Barang C,Kat,-5000,pcs,TRUE
P004,Barang D,Kat,gratis,pcs,TRUE
P005,Barang E,Kat,0,pcs,TRUE`;
    const res = parseCatalogCsv(invalidPrices);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    // Hanya P005 (harga 0) yang valid integer
    expect(res.products).toHaveLength(1);
    expect(res.products[0].id).toBe("P005");
    expect(res.products[0].priceIdr).toBe(0);
    expect(res.issues).toHaveLength(4);
  });

  it("menormalisasi variasi boolean is_published ('TRUE', 'true', ' true ')", () => {
    const boolCsv = `id,name,category,price_idr,unit,is_published
P001,Barang A,Kat,1000,pcs,TRUE
P002,Barang B,Kat,1000,pcs,true
P003,Barang C,Kat,1000,pcs, true 
P004,Barang D,Kat,1000,pcs,FALSE
P005,Barang E,Kat,1000,pcs,false
P006,Barang F,Kat,1000,pcs,tidak`;
    const res = parseCatalogCsv(boolCsv);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.products.map((p) => p.id)).toEqual(["P001", "P002", "P003"]);
    // P006 menghasilkan issue karena nilainya tak dikenal ('tidak')
    expect(res.issues).toHaveLength(1);
    expect(res.issues[0].field).toBe("is_published");
  });

  it("memberi warning jika image_path tidak valid tanpa mendrop produk", () => {
    const badImageCsv = `id,name,category,price_idr,unit,image_path,is_published
P001,Barang A,Kat,1000,pcs,https://cdn.com/bad.png,TRUE`;
    const res = parseCatalogCsv(badImageCsv);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.products).toHaveLength(1);
    expect(res.products[0].imagePath).toBeUndefined();
    expect(res.issues).toHaveLength(1);
    expect(res.issues[0]).toMatchObject({
      field: "image_path",
      severity: "warning",
    });
  });

  it("mengurutkan produk berdasarkan sort_order secara stabil", () => {
    const unsortedCsv = `id,name,category,price_idr,unit,is_published,sort_order
P001,Tanpa Urutan 1,Kat,1000,pcs,TRUE,
P002,Urutan 10,Kat,1000,pcs,TRUE,10
P003,Urutan 2,Kat,1000,pcs,TRUE,2
P004,Urutan 1,Kat,1000,pcs,TRUE,1
P005,Tanpa Urutan 2,Kat,1000,pcs,TRUE,`;
    const res = parseCatalogCsv(unsortedCsv);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    const ids = res.products.map((p) => p.id);
    // Yang punya sort_order: 1 (P004), 2 (P003), 10 (P002)
    // Yang tanpa sort_order di akhir sesuai urutan baris: P001, P005
    expect(ids).toEqual(["P004", "P003", "P002", "P001", "P005"]);
  });
});
