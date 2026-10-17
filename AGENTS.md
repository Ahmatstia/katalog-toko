# Instruksi Proyek untuk AI Agent

Baca file ini sebelum mengubah kode. Proyek ini adalah **website katalog produk toko lokal**, bukan e-commerce.

## Sumber kebenaran

Sebelum implementasi atau perubahan fitur, baca dokumen berikut:

1. `docs/PRD.md` — kebutuhan produk dan aturan bisnis utama.
2. `docs/TECH_STACK_AND_ARCHITECTURE.md` — stack, arsitektur statis, dan batasan teknis.
3. `docs/DATA_CONTRACT.md` — kontrak data katalog Google Sheets/CSV.
4. `docs/UI_UX_GUIDELINES.md` — arah desain dan perilaku antarmuka.
5. `docs/QA_TEST_PLAN.md` — pengujian dan acceptance criteria.
6. `docs/DEPLOYMENT_AND_OPERATIONS.md` — setup, deployment, dan operasi.
7. `docs/DECISION_LOG.md` — keputusan yang sudah dikunci dan keputusan yang belum ditetapkan.
8. `docs/IMPLEMENTATION_ROADMAP.md` — urutan kerja bertahap.

Jika ada konflik, ikuti urutan: keputusan eksplisit terbaru dari pemilik proyek, `docs/DECISION_LOG.md`, `docs/PRD.md`, lalu dokumen teknis. Jangan menebak hal bisnis yang belum dipastikan.

## Konteks produk

- Pengguna utama: pelanggan lokal yang melihat produk/harga lalu menghubungi toko melalui WhatsApp.
- Pemilik katalog: pengelola toko yang memperbarui data melalui Google Sheets.
- Target biaya rutin: Rp0 menggunakan layanan gratis yang sesuai ketentuan saat deployment; jangan menjanjikan gratis selamanya.
- Foto produk berada di repository pada `public/products/`. Nilai katalog menggunakan `image_path`, contoh `/products/cabai-bubuk.webp`.
- Perubahan data teks/harga dilakukan melalui Google Sheets dan tidak perlu deployment ulang. Penambahan/perubahan file foto memerlukan commit dan deployment ulang.
- Tidak ada backend, server database, VPS, login, checkout, pembayaran, order management, atau sinkronisasi POS pada MVP.

## Batasan arsitektur wajib

- Gunakan Next.js App Router + TypeScript + Tailwind CSS.
- Deployment menggunakan Next.js Static Export dan Cloudflare Pages.
- `next.config.*` harus mengatur `output: 'export'`; hasil build di `out/`.
- Data katalog diambil oleh browser dari URL CSV publik yang dikonfigurasi saat build.
- Gunakan parser CSV yang menangani koma, kutip, dan newline dengan benar; jangan memecah CSV secara naif dengan `split(',')`.
- URL katalog publik bukan rahasia, tetapi jangan memasukkan URL spreadsheet uji atau data bisnis yang belum disetujui ke source control secara default.
- Konfigurasi URL katalog dikelola satu kali melalui variabel `NEXT_PUBLIC_CATALOG_CSV_URL` atau pola konfigurasi setara yang didokumentasikan.
- Jangan menggunakan fitur Next.js yang memerlukan server runtime. Verifikasi kompatibilitas static export sebelum menambahkan package/fitur baru.
- Next/Image tidak boleh bergantung pada image optimizer server; gunakan konfigurasi yang sesuai static export atau elemen gambar yang memenuhi aksesibilitas.

## Aturan cara bekerja

1. Kerjakan bertahap sesuai `docs/IMPLEMENTATION_ROADMAP.md`; jangan membangun semua fitur sekaligus.
2. Sebelum perubahan besar, jelaskan rencana singkat, file yang akan dibuat/diubah, risiko, dan tes yang akan dijalankan.
3. Jangan mengarang nama toko, logo, alamat, jam buka, nomor WhatsApp, harga produksi, atau daftar produk. Gunakan placeholder atau data dummy yang diberi label sampai pemilik mengonfirmasi.
4. Jangan menghapus, memindahkan, atau menimpa file penting tanpa menjelaskan dampak dan meminta persetujuan.
5. Jangan menjalankan perintah destruktif, mengubah izin akun, memublikasikan spreadsheet lain, atau melakukan deployment produksi tanpa persetujuan eksplisit pengguna.
6. Jangan menambahkan layanan berbayar, API key, analytics, database, backend, atau dependency besar tanpa alasan yang jelas dan persetujuan bila berdampak pada biaya/arsitektur.
7. Jangan menampilkan data internal/rahasia. Spreadsheet publik hanya berisi kolom katalog yang aman untuk pelanggan.
8. Terapkan TypeScript yang jelas, komponen kecil yang punya tanggung jawab spesifik, validasi data, error/loading/empty states, dan aksesibilitas dasar.
9. Hindari overengineering. Jangan menambahkan state manager, UI kit besar, abstraksi, atau pola arsitektur tanpa kebutuhan nyata.
10. Setelah mengubah kode, jalankan pemeriksaan yang tersedia (lint, typecheck, test, build). Laporkan hasil yang benar-benar terjadi; jangan mengklaim lulus jika belum dijalankan.
11. Jika perintah gagal, jelaskan penyebab yang diketahui, perbaikan, dan hasil percobaan ulang.
12. Dokumentasikan perubahan arsitektur atau aturan bisnis pada dokumen yang sesuai.
13. Berkomunikasilah dalam bahasa Indonesia yang jelas dan bertahap. Jangan mengasumsikan pemilik proyek sudah mahir.

## Tugas pertama agent

Baca seluruh dokumen yang dirujuk. **Jangan langsung membuat UI lengkap.** Lakukan audit konsistensi dokumen, rangkum keputusan yang dikunci, identifikasi risiko yang belum teruji, lalu usulkan rencana Phase 0 yang kecil dan dapat diverifikasi. Minta persetujuan Tedi sebelum menjalankan perintah setup yang membuat atau menimpa banyak file.
