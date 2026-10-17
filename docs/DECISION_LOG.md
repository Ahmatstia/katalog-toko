# Decision Log

Dokumen ini memisahkan keputusan yang telah disetujui dari asumsi dan hal yang masih terbuka. Update log ketika ada keputusan baru.

## Keputusan disetujui

| ID | Keputusan | Alasan | Dampak |
|---|---|---|---|
| D-001 | Produk adalah website katalog, bukan e-commerce penuh. | Kebutuhan hanya menampilkan produk/harga dan mengarahkan pemesanan ke WhatsApp. | Tidak ada checkout, payment, database transaksi, atau order management. |
| D-002 | Target biaya layanan rutin Rp0. | Anggaran operasional terbatas dan target pelanggan lokal. | Hindari layanan berbayar wajib; gratis bergantung pada ketentuan penyedia. |
| D-003 | Next.js App Router + TypeScript + Tailwind CSS. | Stack pilihan pemilik proyek. | Gunakan fitur yang kompatibel dengan static export. |
| D-004 | Hosting Cloudflare Pages dengan static export. | Hosting statis gratis dan tidak perlu VPS. | Build harus menghasilkan `out/`; server runtime tidak tersedia. |
| D-005 | Google Sheets dipublikasikan sebagai CSV adalah sumber data harga/katalog awal. | Pemilik perlu memperbarui harga tanpa mengedit kode. | Sheet publik hanya berisi data katalog aman; update mungkin terlambat beberapa menit. |
| D-006 | CSV fetch awal dan pembaruan harga telah lolos technical spike lokal. | Hasil uji dilaporkan 200 HTTP, 10 kolom, 3 baris; P001 berubah dari 15000 ke 15123 di hasil yang dibaca ulang. | Wajib ulangi pengujian dari website hasil deployment. |
| D-007 | Foto disimpan sebagai aset lokal di `public/products/`. | Menghindari layanan storage foto tambahan. | Foto baru/perubahan file memerlukan commit dan deployment ulang. |
| D-008 | Field produksi untuk foto adalah `image_path`, bukan `image_url`. | Path menunjuk ke aset website sendiri. | Header sheet sampel perlu disesuaikan sebelum katalog produksi. |
| D-009 | WhatsApp Click to Chat menjadi saluran pertanyaan/pemesanan manual. | Tidak perlu backend untuk transaksi. | Klik WA bukan bukti pesanan diterima; toko mengonfirmasi lewat chat. |
| D-010 | Tidak ada integrasi real-time dengan aplikasi POS. | POS lokal dan website statis belum terhubung. | Jangan klaim stok real-time; audit ekspor POS hanya untuk opsi import data awal. |

## Catatan teknis Phase 1 (17 Oktober 2026)

Catatan hasil implementasi scaffold. Ini bukan keputusan produk baru dan tidak mengubah D-001 s.d. D-010.

| ID | Catatan | Rincian |
|---|---|---|
| T-001 | Versi terpasang saat scaffold. | Next.js 16.4.2 (Turbopack), React 19.3.0, TypeScript 5, Tailwind CSS 4 (diaktifkan lewat aturan `turbopack` + `@tailwindcss/turbopack` bawaan scaffold), ESLint 9. Lingkungan: Node.js v22.23.0, npm 10.9.8. Dependency tambahan: `papaparse`, `lucide-react`, `@types/papaparse`. |
| T-002 | Strategi scaffold sementara. | `create-next-app` dijalankan di `_scaffold-tmp/` (folder induk tidak dapat ditulis), lalu file aplikasi disalin ke root tanpa menimpa file yang ada. Folder sementara dihapus setelah build terbukti berjalan tanpanya. |
| T-003 | File scaffold yang sengaja tidak disalin. | `AGENTS.md` (bentrok dengan milik proyek), `README.md` (diganti README teknis proyek), `next.config.ts` (ditulis ulang, lihat T-004), `next-env.d.ts` (dibuat ulang otomatis oleh Next.js), `node_modules/` dan `.next/` (dibuat ulang oleh `npm install`/build), serta SVG contoh di `public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). |
| T-004 | Konfigurasi static export. | `next.config.ts`: `output: "export"`, `images.unoptimized: true`, aturan `turbopack` untuk Tailwind, dan `agentRules: false`. Opsi bawaan scaffold `cacheComponents` dan `partialPrefetching` **tidak dipakai** karena berisiko tidak cocok dengan static export. Build menghasilkan `out/`. |
| T-005 | `agentRules: false`. | `next dev` versi ini otomatis menambahkan blok `nextjs-agent-rules` ke `AGENTS.md`. Fitur dimatikan agar file aturan proyek tidak berubah sendiri. Blok yang sempat tertambah sudah dihapus dan file dikembalikan ke ukuran semula. |
| T-006 | Temuan `npm audit`: 5 "high", satu akar. | Paket `braces <= 3.0.3` (GHSA-vfj7-8cjw-p6xm, DoS via pola bersarang dalam). Tidak ada versi perbaikan saat dicek. Hanya lewat devDependency `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`; `npm audit --omit=dev` melaporkan 0 temuan. `npm audit fix --force` ditolak karena akan menurunkan `eslint-config-next` ke 14.x (breaking). Dependency tidak diubah; cek ulang pada Phase 4 dan sebelum deployment. |

## Belum diputuskan / perlu validasi

- Nama resmi toko, logo, palet brand final, dan tagline.
- Nomor WhatsApp bisnis yang benar.
- Daftar/kategori produk produksi, satuan, foto dan harga yang disetujui.
- Alamat, jam buka, dan area layanan yang boleh ditampilkan.
- Perkiraan jumlah produk saat peluncuran.
- Apakah pemilik akan memperbarui data sendiri atau dengan bantuan Tedi.
- Verifikasi CSV dan foto pada deployment Cloudflare Pages.
- Perlu/tidaknya halaman individual produk untuk SEO setelah evaluasi bisnis.

Jangan menafsirkan daftar terbuka sebagai izin untuk mengisi data secara fiktif. Gunakan placeholder sampai dikonfirmasi.
