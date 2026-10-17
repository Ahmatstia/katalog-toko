const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

/** `15000` => `Rp 15.000` (spasi setelah Rp mengikuti keluaran Intl; bisa berupa NBSP). */
export function formatRupiah(amount: number): string {
  return rupiah.format(amount);
}
