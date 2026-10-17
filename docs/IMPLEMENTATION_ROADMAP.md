# Roadmap Implementasi

Gunakan milestone kecil. Jangan pindah fase jika exit criteria belum terpenuhi.

## Phase 0 — Audit dokumen dan setup aman

**Tugas:**
- Baca semua dokumen proyek.
- Periksa konsistensi PRD, stack, schema, hosting, dan alur foto.
- Periksa lingkungan Node.js/npm dan kondisi direktori; jangan timpa dokumen yang sudah ada.
- Usulkan struktur aplikasi Next.js dan strategi scaffold yang mempertahankan docs.
- Catat open questions dan rencana validasi.

**Exit criteria:** Tedi menyetujui rencana setup; tidak ada konflik kontrak data/arsitektur yang belum dibahas.

## Phase 1 — Scaffold dan proof of static export

**Tugas:**
- Inisialisasi Next.js App Router, TypeScript, Tailwind CSS dan skrip lint/build.
- Aktifkan `output: 'export'`.
- Buat struktur folder dasar dan placeholder merek/data.
- Tambahkan `.gitignore`, `.env.example`, dan README teknis.
- Build dan pastikan `out/` tersedia.

**Exit criteria:** aplikasi scaffold bisa dijalankan lokal dan build statis lulus tanpa fitur server-only.

## Phase 2 — Data contract dan CSV loader

**Tugas:**
- Implementasikan konfigurasi `NEXT_PUBLIC_CATALOG_CSV_URL`.
- Implementasikan CSV parser menggunakan library yang matang.
- Validasi header, field, ID duplikat, angka harga, status tayang, dan image path.
- Buat loading/error/empty state dan retry.
- Tes data sample dengan `image_path` yang benar.

**Exit criteria:** katalog hanya menampilkan data valid; data gagal tidak membuat crash atau tampil sebagai harga pasti.

## Phase 3 — UI MVP

**Tugas:**
- Bangun header, hero, search, kategori, grid kartu produk, catatan harga/stok, kontak, footer.
- Buat format Rupiah dan pesan WhatsApp ter-encode.
- Tambahkan gambar lokal dan placeholder.
- Pastikan responsive dan accessibility dasar.

**Exit criteria:** seluruh fitur P0 PRD bekerja pada data dummy dan lolos QA inti.

## Phase 4 — Pengujian dan UAT

**Tugas:**
- Jalankan lint, typecheck, tests, build.
- Uji kegagalan CSV/gambar, pencarian, filter, WhatsApp, responsive dan keyboard.
- Review konten dengan pemilik toko; ganti data dummy hanya setelah data asli disetujui.

**Exit criteria:** tidak ada bug kritis/tinggi yang belum dimitigasi; pemilik menyetujui konten.

## Phase 5 — Deployment preview dan production

**Tugas:**
- Hubungkan GitHub dan Cloudflare Pages setelah ada persetujuan.
- Set environment build URL CSV.
- Deploy preview/production, uji data dan foto dari URL publik.
- Dokumentasikan update katalog dan prosedur backup.

**Exit criteria:** URL HTTPS bekerja, data/foto benar, WhatsApp benar, dan pengelola memahami proses pembaruan.

## Aturan fase

- Jangan membangun login/admin/dashboard tanpa perubahan scope yang disetujui.
- Jangan mengintegrasikan POS live pada MVP.
- Jangan melakukan deployment production atau mengubah data publik nyata tanpa persetujuan eksplisit.
- Setiap fase harus menuliskan file yang berubah, perintah uji, hasil aktual, dan sisa risiko.
