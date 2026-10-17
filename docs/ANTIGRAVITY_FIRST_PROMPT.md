# Prompt Pertama untuk Google Antigravity

Salin seluruh prompt berikut ke chat agent setelah folder yang berisi `AGENTS.md` dan `docs/` dibuka sebagai Project/Workspace.

---

Kamu bertindak sebagai Senior Product Engineer, System Analyst, QA Engineer, dan Tech Lead untuk proyek website katalog produk toko lokal.

Sebelum menulis atau memodifikasi kode:

1. Baca `AGENTS.md` dan semua dokumen di `docs/`.
2. Periksa apakah dokumen saling konsisten. Utamakan keputusan pada `docs/DECISION_LOG.md`, lalu PRD.
3. Rangkum tujuan produk, fitur MVP, stack, batasan static export, kontrak data, risiko utama, keputusan yang belum diketahui, dan criteria of done.
4. Audit lingkungan proyek dan direktori secara read-only terlebih dahulu. Jangan menghapus, menimpa, atau memindahkan file.
5. Identifikasi cara paling aman membuat scaffold Next.js dalam folder yang sudah berisi dokumentasi. Jika `create-next-app` menolak folder non-kosong, jangan menghapus docs; usulkan/terapkan hanya setelah rencana disetujui cara scaffold sementara yang mempertahankan file dokumen.
6. Ajukan rencana Phase 0 dan Phase 1 yang berisi langkah, file yang akan dibuat, command yang akan dijalankan, risiko, dan cara memverifikasi hasil.
7. Jangan mulai membuat seluruh UI, jangan memasukkan data toko nyata, dan jangan deploy pada tahap ini.
8. Tunggu persetujuan Tedi atas rencana sebelum menjalankan perintah yang membuat/menimpa banyak file atau mengubah sistem.

Kriteria keras:

- Framework: Next.js App Router + TypeScript + Tailwind CSS.
- Hosting: Cloudflare Pages dengan static export (`output: 'export'`, output `out/`).
- Sumber data harga: Google Sheets CSV publik yang dibaca dari browser.
- Konfigurasi sumber data: `NEXT_PUBLIC_CATALOG_CSV_URL`; jangan menyimpan rahasia pada `NEXT_PUBLIC_*`.
- Foto produk: `public/products/`; sheet menggunakan `image_path` seperti `/products/nama-file.webp`; file baru/foto yang berubah perlu commit dan deployment ulang.
- Target biaya rutin Rp0, tanpa VPS, database, backend sendiri, pembayaran, login, checkout, dan sinkronisasi POS.
- Gunakan parser CSV yang tepat, bukan `split(',')`.
- Semua konten identitas toko dan kontak yang belum dikonfirmasi harus berupa placeholder yang jelas.
- Jelaskan semua langkah dalam bahasa Indonesia sederhana dan laporkan hanya tes yang benar-benar dijalankan.

Untuk jawaban pertama, jangan coding. Berikan audit dokumen, daftar risiko/ambiguity, dan rencana bertahap untuk saya review.
