# Deployment dan Operasional

## 1. Setup lokal

Agent harus memeriksa lingkungan terlebih dahulu:

- versi Node.js dan package manager tersedia;
- direktori kerja dan dokumen yang sudah ada;
- tidak ada project atau file yang akan tertimpa;
- Git tersedia jika version control akan dipakai.

Pilih versi Node.js yang kompatibel dengan versi Next.js stabil yang dipasang. Catat versi di dokumentasi/project config bila sesuai. Jangan menghapus file dokumentasi untuk memaksa scaffolder berjalan.

## 2. Konfigurasi aplikasi

- Static export diaktifkan lewat `output: 'export'` dalam konfigurasi Next.js.
- `NEXT_PUBLIC_CATALOG_CSV_URL` diisi dengan URL **publikasi CSV produksi** dari sheet katalog publik.
- Buat `.env.example` berisi nama variabel dan placeholder saja.
- `.env.local` harus masuk `.gitignore`.
- Environment variables pada static export disisipkan saat build. Mengubah URL konfigurasi membutuhkan build/deployment ulang, tetapi mengubah harga/nama pada sheet tidak memerlukan deployment aplikasi.
- Nilai `NEXT_PUBLIC_*` dapat dilihat publik; tidak boleh dianggap rahasia.

## 3. Build lokal

Gunakan perintah dari `package.json`. Minimal validasi:

```bash
npm run lint
npm run build
```

Jalankan typecheck/test jika script tersedia. Pastikan folder `out/` dibuat dan berisi aset HTML/CSS/JS serta `products/` yang dibutuhkan.

## 4. Cloudflare Pages

Saat repository siap dan pemilik menyetujui deployment:

1. Push source code ke repository GitHub.
2. Di Cloudflare dashboard, buat aplikasi Pages dan pilih repository.
3. Pilih preset **Next.js (Static HTML Export)** atau konfigurasi build statis yang sesuai dengan dashboard saat itu.
4. Build command yang didokumentasikan Cloudflare adalah `npx next build`; jika package script `build` menjalankan perintah itu, `npm run build` dapat digunakan sesuai konfigurasi yang terdeteksi.
5. Output directory harus `out`.
6. Set `NEXT_PUBLIC_CATALOG_CSV_URL` untuk environment build/production.
7. Deployment pertama hanya setelah URL CSV, data publik, dan nomor kontak sudah direview.
8. Uji hasil di URL `*.pages.dev` sebelum menyatakan selesai.

Panduan resmi: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/

## 5. Prosedur pembaruan

### Data produk/harga

1. Pengelola mengedit sheet kerja.
2. Pastikan hanya sheet katalog publik yang diekspos.
3. Tunggu publikasi diperbarui dan buka website untuk verifikasi.
4. Jika masih data lama, tunggu beberapa menit, coba muat ulang, lalu cek CSV yang dipublikasikan.
5. Jangan menyatakan harga real-time; WhatsApp digunakan untuk konfirmasi akhir bila perlu.

### Foto produk

1. Siapkan gambar yang sah digunakan, potong dimensi konsisten, dan optimalkan ukuran.
2. Simpan di `public/products/` dengan nama file konsisten, huruf kecil, angka, dan tanda hubung; hindari spasi.
3. Ubah nilai `image_path` di Google Sheets, misalnya `/products/cabai-bubuk.webp`.
4. Commit perubahan file foto dan deploy ulang aplikasi.
5. Verifikasi gambar pada URL production dan perangkat mobile.

## 6. Backup dan migrasi

- Source code dan dokumentasi disimpan di GitHub.
- Pemilik katalog harus memiliki akses ke spreadsheet dan backup/export CSV berkala.
- Simpan file foto asli di lokasi yang dikendalikan pemilik; repository bukan satu-satunya arsip foto asli beresolusi tinggi.
- Karena output berupa aset statis, website bisa dipindahkan ke static hosting lain jika kebijakan paket gratis berubah, dengan verifikasi ulang routing, HTTPS, dan variabel build.

## 7. Batas biaya

Target biaya layanan rutin Rp0 menggunakan paket gratis yang masih tersedia dan sesuai ketentuan. Domain khusus, fitur dinamis, layanan foto pihak ketiga, dan fitur Cloudflare lain yang tidak dibutuhkan jangan ditambahkan sebagai dependensi. Evaluasi kebijakan layanan resmi sebelum produksi dan secara berkala. Jangan menjanjikan layanan gratis selamanya.
