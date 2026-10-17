# QA Test Plan — MVP Katalog

## 1. Pemeriksaan wajib saat setiap milestone

Jalankan skrip yang benar-benar tersedia di `package.json`, sekurang-kurangnya:

- lint;
- typecheck bila script tersedia;
- unit test bila sudah dibuat;
- `npm run build` (atau skrip package manager setara).

Jangan mengklaim test lulus jika belum dijalankan. Catat perintah, hasil, dan kegagalan yang tersisa.

## 2. Data dan parser CSV

- [ ] CSV valid dengan 10 header produksi dikenali.
- [ ] Header kolom dapat diacak tanpa salah membaca nilai.
- [ ] Nilai dengan koma dalam kutipan terbaca benar.
- [ ] Kutipan ganda dan newline di field deskripsi ditangani dengan benar.
- [ ] File UTF-8/karakter Indonesia tampil benar.
- [ ] ID duplikat, field wajib kosong, harga nonnumerik, dan nilai boolean tak dikenal ditangani aman.
- [ ] `is_published=FALSE` tidak muncul di katalog.
- [ ] Data draft bukan data nyata; harga `0` tidak otomatis ditafsirkan sebagai stok habis.
- [ ] Error HTTP, CORS, respons HTML, CSV kosong, dan timeout/ketiadaan jaringan memberi error state yang jelas.
- [ ] Tidak ada fallback yang menampilkan harga lama sebagai informasi pasti terbaru.

## 3. Pembaruan data

- [ ] Uji awal Google Sheets CSV telah berhasil di `localhost` dengan HTTP 200, 10 kolom terdeteksi, dan 3 baris data uji.
- [ ] Uji perubahan P001 dari `15000` menjadi `15123` berhasil terbaca pada pengujian yang dilaporkan.
- [ ] Setelah konfigurasi domain deployment tersedia, ulangi fetch dari website yang sudah deployed.
- [ ] Ukur keterlambatan publikasi; jangan menjanjikan real-time.
- [ ] Uji tombol muat ulang/retry dan pastikan perubahan state tidak menghasilkan duplikasi event atau hasil salah.

## 4. Produk dan interaksi

- [ ] Search berdasarkan nama; tidak peka kapitalisasi dan trim whitespace.
- [ ] Search dan kategori dapat aktif bersamaan.
- [ ] Kategori “Semua” mengembalikan katalog yang sesuai.
- [ ] `sort_order` kosong/tidak valid tetap menghasilkan urutan stabil.
- [ ] Harga terformat Rupiah dengan benar.
- [ ] Satuan terlihat jelas dekat harga.
- [ ] Produk dengan harga/satuan berbeda tidak tercampur.
- [ ] Pesan WhatsApp memuat nama, satuan, dan harga sesuai produk; karakter khusus ter-encode.
- [ ] Nomor WhatsApp tidak menggunakan angka dummy pada production.

## 5. Foto produk

- [ ] `image_path` dimulai dengan `/products/`.
- [ ] File path cocok dengan file di `public/products/` (termasuk kapitalisasi nama file).
- [ ] Gambar tampil saat development dan sesudah static export.
- [ ] Gambar hilang/URL rusak memunculkan placeholder dan tidak memecahkan layout.
- [ ] Foto dioptimalkan dengan dimensi dan ukuran file yang wajar.
- [ ] Foto baru tampil setelah commit/build/deploy, bukan diasumsikan otomatis dari sheet.

## 6. UI/UX

- [ ] 360 px, 390 px, tablet jika tersedia, dan desktop diuji.
- [ ] Tidak ada horizontal overflow yang tak disengaja.
- [ ] Loading, error, katalog kosong, dan pencarian tanpa hasil dibedakan.
- [ ] Keyboard focus terlihat dan tombol punya label aksesibel.
- [ ] Kontras teks dan ukuran tulisan cukup.
- [ ] Tidak ada klaim stok real-time.
- [ ] SEO metadata, favicon, judul, deskripsi, dan informasi toko sudah ditinjau.

## 7. Build dan deployment

- [ ] `output: 'export'` dikonfigurasi dan build menghasilkan folder `out/`.
- [ ] Build tidak bergantung pada server Node.js runtime.
- [ ] Semua rute yang diperlukan dapat dilayani oleh hosting statis.
- [ ] `NEXT_PUBLIC_CATALOG_CSV_URL` tersedia saat build production.
- [ ] URL produksi menggunakan HTTPS.
- [ ] Foto statis dan CSV dapat dibaca di browser setelah deployment.
- [ ] Tidak ada API key, credential, `.env.local`, atau data internal ter-commit.
- [ ] Tidak ada layanan berbayar yang menjadi dependensi wajib tanpa persetujuan pemilik.

## 8. Go-live gate

Jangan menyatakan siap produksi sampai identitas/nomor WhatsApp disetujui pemilik, data dummy dipisahkan dari data nyata, pengujian deployment selesai, data publik di-review, tidak ada bug kritis/tinggi yang belum dimitigasi, dan panduan update katalog diserahkan ke pengelola toko.
