import { describe, expect, it } from "vitest";
import { fetchCatalog } from "./fetch";

describe("fetchCatalog", () => {
  const validCsv = `id,name,category,price_idr,unit,is_published
P001,Beras,Sembako,50000,karung,TRUE`;

  it("berhasil mengambil dan mem-parse katalog dari mock fetch", async () => {
    const mockFetch: typeof fetch = async () =>
      new Response(validCsv, { status: 200 });

    const res = await fetchCatalog("https://mock.test/catalog.csv", {
      fetchImpl: mockFetch,
    });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.products).toHaveLength(1);
    expect(res.products[0].id).toBe("P001");
    expect(res.loadedAt).toBeInstanceOf(Date);
  });

  it("mengembalikan error jenis http jika status bukan 200 (misal 404)", async () => {
    const mockFetch: typeof fetch = async () =>
      new Response("Not Found", { status: 404 });

    const res = await fetchCatalog("https://mock.test/catalog.csv", {
      fetchImpl: mockFetch,
    });
    expect(res.ok).toBe(false);
    if (res.ok) return;

    expect(res.kind).toBe("http");
    expect(res.message).toContain("404");
  });

  it("mengembalikan error jenis network bila fetch melempar error (koneksi putus / CORS block)", async () => {
    const mockFetch: typeof fetch = async () => {
      throw new TypeError("Failed to fetch");
    };

    const res = await fetchCatalog("https://mock.test/catalog.csv", {
      fetchImpl: mockFetch,
    });
    expect(res.ok).toBe(false);
    if (res.ok) return;

    expect(res.kind).toBe("network");
    expect(res.message).toMatch(/Tidak dapat menghubungi sumber katalog/i);
  });

  it("mengembalikan error jenis timeout jika waktu melebihi batas", async () => {
    const mockFetch: typeof fetch = async (_, init) => {
      return new Promise((resolve, reject) => {
        const signal = init?.signal;
        if (signal) {
          signal.addEventListener("abort", () => {
            const err = new Error("The operation was aborted");
            err.name = "AbortError";
            reject(err);
          });
        }
      });
    };

    const res = await fetchCatalog("https://mock.test/catalog.csv", {
      fetchImpl: mockFetch,
      timeoutMs: 50,
    });

    expect(res.ok).toBe(false);
    if (res.ok) return;

    expect(res.kind).toBe("timeout");
    expect(res.message).toMatch(/terlalu lama/i);
  });

  it("mengembalikan error jenis aborted jika dibatalkan oleh signal eksternal", async () => {
    const controller = new AbortController();
    const mockFetch: typeof fetch = async (_, init) => {
      return new Promise((resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          const err = new Error("Aborted");
          err.name = "AbortError";
          reject(err);
        });
      });
    };

    const promise = fetchCatalog("https://mock.test/catalog.csv", {
      fetchImpl: mockFetch,
      signal: controller.signal,
      timeoutMs: 5000,
    });

    controller.abort();
    const res = await promise;

    expect(res.ok).toBe(false);
    if (res.ok) return;

    expect(res.kind).toBe("aborted");
  });

  it("mengembalikan error jenis schema bila respons adalah halaman HTML atau header salah", async () => {
    const mockFetch: typeof fetch = async () =>
      new Response("<html><body>Login Page</body></html>", { status: 200 });

    const res = await fetchCatalog("https://mock.test/catalog.csv", {
      fetchImpl: mockFetch,
    });
    expect(res.ok).toBe(false);
    if (res.ok) return;

    expect(res.kind).toBe("schema");
    expect(res.message).toMatch(/bukan CSV/i);
  });
});
