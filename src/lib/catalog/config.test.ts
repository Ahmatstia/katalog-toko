import { describe, expect, it } from "vitest";
import { resolveCatalogConfig } from "./config";

describe("resolveCatalogConfig", () => {
  it("menolak nilai kosong atau undefined", () => {
    expect(resolveCatalogConfig(undefined)).toEqual({
      configured: false,
      reason: "NEXT_PUBLIC_CATALOG_CSV_URL belum diatur.",
    });
    expect(resolveCatalogConfig("   ")).toEqual({
      configured: false,
      reason: "NEXT_PUBLIC_CATALOG_CSV_URL belum diatur.",
    });
  });

  it("menolak URL yang malformed", () => {
    expect(resolveCatalogConfig("bukan-url")).toEqual({
      configured: false,
      reason: "NEXT_PUBLIC_CATALOG_CSV_URL bukan URL yang valid.",
    });
  });

  it("menolak protokol selain http/https", () => {
    expect(resolveCatalogConfig("ftp://example.com/catalog.csv")).toEqual({
      configured: false,
      reason: "NEXT_PUBLIC_CATALOG_CSV_URL harus berawalan https://.",
    });
    expect(resolveCatalogConfig("javascript:alert(1)")).toEqual({
      configured: false,
      reason: "NEXT_PUBLIC_CATALOG_CSV_URL harus berawalan https://.",
    });
  });

  it("mendeteksi domain .invalid (placeholder .env.example)", () => {
    const result = resolveCatalogConfig(
      "https://contoh.invalid/GANTI-DENGAN-URL-CSV-PUBLIK.csv",
    );
    expect(result).toEqual({
      configured: false,
      reason:
        "NEXT_PUBLIC_CATALOG_CSV_URL masih berisi placeholder dari .env.example.",
    });
  });

  it("menerima URL https publik yang valid", () => {
    const validUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-example/pub?output=csv";
    expect(resolveCatalogConfig(validUrl)).toEqual({
      configured: true,
      url: validUrl,
    });
  });

  it("menerima URL http untuk server lokal / development testing", () => {
    const localUrl = "http://localhost:3000/mock-catalog.csv";
    expect(resolveCatalogConfig(localUrl)).toEqual({
      configured: true,
      url: localUrl,
    });
  });

  it("menerima path relatif berakhiran .csv untuk staging / preview", () => {
    expect(resolveCatalogConfig("/mock-products.csv")).toEqual({
      configured: true,
      url: "/mock-products.csv",
    });
  });

  it("menolak path relatif dengan traversal .. atau tidak berakhiran .csv", () => {
    expect(resolveCatalogConfig("/../secret.csv")).toEqual({
      configured: false,
      reason: "NEXT_PUBLIC_CATALOG_CSV_URL berupa path relatif harus aman dan berakhiran .csv.",
    });
    expect(resolveCatalogConfig("/mock-products.json")).toEqual({
      configured: false,
      reason: "NEXT_PUBLIC_CATALOG_CSV_URL berupa path relatif harus aman dan berakhiran .csv.",
    });
  });
});

