import { describe, expect, it } from "vitest";
import { formatRupiah } from "./format";

describe("formatRupiah", () => {
  it("memformat nominal integer ke Rupiah dengan benar", () => {
    // Note: Intl id-ID menggunakan spasi atau non-breaking space (NBSP) setelah "Rp"
    const formatted = formatRupiah(15000).replace(/\s/g, " ");
    expect(formatted).toBe("Rp 15.000");
  });

  it("memformat nominal 0", () => {
    const formatted = formatRupiah(0).replace(/\s/g, " ");
    expect(formatted).toBe("Rp 0");
  });

  it("memformat nominal besar tanpa desimal", () => {
    const formatted = formatRupiah(1250000).replace(/\s/g, " ");
    expect(formatted).toBe("Rp 1.250.000");
  });
});
