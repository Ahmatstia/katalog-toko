# Tech Stack dan Arsitektur

**Versi:** 1.0 — rancangan untuk MVP

## 1. Stack

| Area | Keputusan | Catatan |
|---|---|---|
| Framework | Next.js App Router | Pilih rilis stabil yang kompatibel saat proyek dibuat; jangan mengunci versi lama tanpa alasan. |
| Bahasa | TypeScript | Hindari `any` kecuali ada alasan terdokumentasi. |
| Styling | Tailwind CSS | Gunakan token warna/spacing yang konsisten. |
| Ikon | Lucide React | Ikon dekoratif tidak boleh menggantikan label penting. |
| CSV parser | Papa Parse atau parser CSV matang setara | Harus menangani quoted values, koma, newline, UTF-8, dan header. Hindari parser buatan yang rapuh. |
| Sumber data | Google Sheets yang dipublikasikan sebagai CSV | Hanya sheet katalog publik; harga dapat terlambat tampil beberapa menit. |
| Foto | Aset statis di `public/products/` | CSV menyimpan `image_path`, bukan URL gambar eksternal. |
| Version control | Git + GitHub | Jangan commit `.env.local`, token, atau data internal. |
| Hosting | Cloudflare Pages Free | Target menggunakan subdomain `*.pages.dev`, tanpa domain berbayar. |
| Pemesanan | WhatsApp Click to Chat | Pembeli mengirim pesan sendiri; bukan order system. |

## 2. Arsitektur data flow

1. Cloudflare Pages mengirim HTML/CSS/JS statis hasil Next.js export.
2. Browser mengambil URL CSV publik dari konfigurasi `NEXT_PUBLIC_CATALOG_CSV_URL` yang ditanam saat build.
3. Parser CSV memvalidasi header dan setiap baris.
4. UI hanya menampilkan produk valid dengan `is_published` bernilai true.
5. Foto dimuat dari path relatif seperti `/products/cabai-bubuk.webp`.
6. Tombol WhatsApp menyusun URL `https://wa.me/<nomor>?text=<pesan-ter-encode>`.

Tidak ada request ke backend milik kita. CSV Google Sheets dan aset website adalah sumber eksternal/statis.

## 3. Static export

`next.config.ts` (atau format konfigurasi yang dibuat scaffold) harus memiliki:

```ts
const nextConfig = {
  output: 'export',
  // Jika menggunakan next/image, set images.unoptimized: true
  // karena proyek tidak menggunakan image optimization server.
};

export default nextConfig;
```

Sesuaikan bentuk ekspor di atas dengan konfigurasi TypeScript scaffold yang sebenarnya. Hindari menyalin konfigurasi tanpa menggabungkannya dengan opsi yang sudah ada.

Build menghasilkan folder `out/`. Gunakan perintah build standar package manager yang disepakati dan pastikan folder `out/` benar-benar terisi sebelum dianggap lulus.

## 4. Fitur yang tidak boleh dipakai pada MVP

Jangan menggunakan fitur yang memerlukan server runtime, termasuk Server Actions, middleware/proxy server, dynamic request handlers, cookies server, ISR, route dinamis yang tidak dapat dipre-render, dan Next image optimizer default. Route Handler statis hanya boleh ditambahkan jika benar-benar diperlukan dan hasilnya dapat dihasilkan pada waktu build.

Jangan menambah database, autentikasi, API backend, serverless function, Workers, atau integrasi POS hanya karena lebih nyaman secara teknis. Setiap pengecualian harus diajukan dengan alasan bisnis, dampak biaya, dan persetujuan pemilik.

## 5. Konfigurasi URL CSV

- Gunakan satu konfigurasi `NEXT_PUBLIC_CATALOG_CSV_URL`.
- Tambahkan `.env.example` berisi placeholder, tanpa kredensial.
- Simpan URL kerja lokal pada `.env.local` yang masuk `.gitignore`.
- Atur variabel yang sama pada konfigurasi build Cloudflare Pages ketika siap deploy.
- Variabel `NEXT_PUBLIC_*` bukan rahasia; nilainya dapat dilihat oleh pengunjung. CSV memang sengaja publik.
- Jika URL belum diatur, tampilkan state konfigurasi yang jelas pada development dan cegah data palsu tampil seolah-olah produksi.

## 6. Perilaku kegagalan

- CSV gagal di-fetch: tampilan error yang ramah, tombol coba lagi, dan kontak WhatsApp jika nomor sudah dikonfirmasi.
- CSV tidak valid: jangan crash. Laporkan kesalahan skema secara aman dan jangan menampilkan baris invalid.
- Gambar gagal: gunakan placeholder.
- Data kosong/pencarian tanpa hasil: tampilkan empty state berbeda dari error.
- Jangan menggunakan cached data lama tanpa penanda waktu/kepastian kesegaran yang dapat dipertanggungjawabkan.

## 7. Rujukan

- https://nextjs.org/docs/app/guides/static-exports
- https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
- https://antigravity.google/docs/rules/
