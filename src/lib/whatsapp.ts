/**
 * Helper untuk tautan WhatsApp Click to Chat.
 * Sesuai spesifikasi docs/PRD.md Bagian 11.
 */

import { formatRupiah } from "./format";
import type { Product } from "./catalog/types";

// Nomor placeholder jika pemilik toko belum menentukan nomor resmi
export const DEFAULT_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "6280000000000";

/**
 * Membersihkan nomor telepon agar hanya berisi digit dengan format internasional (tanpa '+', spasi, strip).
 * Contoh: "0812-3456-7890" -> "6281234567890"
 */
export function sanitizeWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return "62" + digits.slice(1);
  }
  return digits;
}

/**
 * Membuat tautan WhatsApp untuk menanyakan produk tertentu.
 * Template pesan:
 * Halo, saya ingin bertanya tentang produk berikut:
 * Nama: {nama_produk}
 * Satuan: {satuan}
 * Harga pada katalog: {harga}
 * Apakah produk tersedia? Terima kasih.
 */
export function createProductWhatsAppUrl(
  product: Product,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER,
): string {
  const cleanPhone = sanitizeWhatsAppNumber(phoneNumber);
  const formattedPrice = formatRupiah(product.priceIdr);

  const message = [
    "Halo, saya ingin bertanya tentang produk berikut:",
    `Nama: ${product.name}`,
    `Satuan: ${product.unit}`,
    `Harga pada katalog: ${formattedPrice}`,
    "Apakah produk tersedia? Terima kasih.",
  ].join("\n");

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Membuat tautan WhatsApp untuk pertanyaan umum toko.
 */
export function createGeneralWhatsAppUrl(
  storeName: string = "[Nama Toko]",
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER,
): string {
  const cleanPhone = sanitizeWhatsAppNumber(phoneNumber);
  const message = `Halo ${storeName}, saya ingin bertanya tentang produk yang ada di katalog.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
