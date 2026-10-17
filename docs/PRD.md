# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Website Katalog Produk Toko

**Versi:** 1.2  
**Tanggal:** 17 Oktober 2026  
**Status:** Draft untuk validasi kebutuhan bisnis; uji awal sumber data CSV lulus; keputusan penyimpanan foto telah ditetapkan  
**Pemilik bisnis:** Abang Tedi — nama dan identitas toko belum ditetapkan dalam dokumen ini  
**Product Owner / Koordinator proyek:** Tedi  
**Target:** Pelanggan lokal yang ingin melihat produk dan harga, lalu menghubungi toko melalui WhatsApp

> **Catatan status:** Arah produk dan batasan teknis utama telah disepakati. Uji awal pembacaan serta pembaruan data Google Sheets → CSV berhasil pada lingkungan pengujian. Foto akan disimpan sebagai aset statis di repository pada `public/products/`; perubahan foto memerlukan commit dan deployment. Identitas toko, nomor WhatsApp, daftar produk produksi, serta pengujian ulang dari URL deployment masih perlu diselesaikan sebelum produksi.

---

## 1. Ringkasan Eksekutif

Website Katalog Produk Toko adalah website responsif yang membantu calon pelanggan lokal melihat produk, kategori, satuan, dan harga barang tanpa harus meminta daftar harga melalui chat satu per satu. Pelanggan dapat mencari atau menyaring produk, lalu membuka percakapan WhatsApp toko dengan pesan yang telah berisi informasi produk yang diminati.

Produk ini **bukan website e-commerce penuh**. Website tidak menerima pembayaran, tidak mengelola checkout, tidak menghitung ongkos kirim, dan tidak menyimpan pesanan sebagai transaksi. Konfirmasi stok, harga akhir bila berubah, serta proses pemesanan dilakukan langsung oleh pihak toko melalui WhatsApp.

Arsitektur awal menggunakan **Next.js App Router, TypeScript, Tailwind CSS, static export, Cloudflare Pages, Google Sheets sebagai sumber data publik, GitHub untuk version control, dan WhatsApp Click to Chat**. Sasaran biaya layanan rutin adalah **Rp0**, tanpa VPS, backend yang berjalan terus-menerus, database berbayar, atau domain khusus berbayar. Target biaya tersebut bergantung pada ketersediaan dan ketentuan paket gratis penyedia layanan.

## 2. Latar Belakang dan Masalah

Pelanggan mungkin perlu mengetahui produk dan harga sebelum datang atau menghubungi toko. Tanpa katalog online, informasi produk berpotensi harus dijelaskan berulang kali melalui chat atau daftar harga manual. Toko juga membutuhkan cara sederhana untuk memperlihatkan katalog yang bisa dibuka dari ponsel.

Kendala proyek:

1. Anggaran operasional untuk hosting dan VPS sangat terbatas; target awalnya Rp0.
2. Kebutuhan bisnis hanya katalog, bukan platform penjualan online.
3. Pengelola toko harus dapat memperbarui harga dan informasi produk tanpa mengedit source code.
4. Website tetap perlu sederhana, cepat, ramah ponsel, dan mudah dipindahkan jika kebijakan layanan gratis berubah.
5. Website tidak boleh mengklaim stok real-time karena belum ada integrasi dengan aplikasi POS.

## 3. Visi Produk

Menyediakan katalog online yang sederhana dan tepercaya agar pelanggan lokal dapat menemukan produk dan harga dengan cepat serta melanjutkan pertanyaan atau pemesanan melalui WhatsApp.

### 3.1 Tujuan

- Menampilkan katalog produk dan harga toko melalui tautan publik.
- Memudahkan pelanggan mencari produk berdasarkan nama dan kategori.
- Mengurangi pertanyaan awal yang berulang mengenai nama barang dan harga.
- Menyediakan tombol WhatsApp dengan pesan yang relevan untuk setiap produk.
- Memungkinkan pemilik toko memperbarui data katalog tanpa mengubah kode untuk perubahan data rutin.
- Menghindari biaya wajib untuk VPS, backend, database, dan domain khusus pada versi MVP.
- Menjaga source code dan data katalog tetap dapat dicadangkan serta dipindahkan.

### 3.2 Bukan Tujuan

- Menggantikan aplikasi POS.
- Mengelola stok real-time atau menyinkronkan stok POS.
- Menjadi marketplace multi-penjual.
- Memproses pembayaran, checkout, invoice, pengiriman, retur, atau refund.
- Menyimpan pesanan dan data pelanggan ke database.
- Menyediakan login pelanggan, kasir, atau administrator.
- Menjanjikan layanan gratis selamanya tanpa perubahan kebijakan penyedia.

## 4. Pemangku Kepentingan dan Pengguna

| Pihak | Peran dan kebutuhan |
|---|---|
| Pemilik/pengelola toko | Memastikan nama produk, harga, satuan, foto, dan status tayang benar; memperbarui Google Sheets. |
| Calon pelanggan lokal | Menemukan produk, melihat harga dan satuan, lalu menanyakan ketersediaan atau memesan lewat WhatsApp. |
| Developer / koordinator proyek | Menjaga struktur kode, deployment, validasi data, dokumentasi, dan backup. |

### 4.1 Skenario Pengguna Utama

**Pelanggan:** membuka tautan katalog dari WhatsApp, media sosial, atau hasil pencarian; mengetik nama produk atau memilih kategori; melihat harga dan satuan; menekan tombol WhatsApp; memeriksa pesan yang disiapkan; lalu mengirimnya sendiri.

**Pengelola toko:** membuka sheet katalog; menambah atau mengubah data produk; memeriksa harga dan satuan; mengubah status tayang; serta memastikan `image_path` merujuk ke file yang ada di repository. Perubahan foto dilakukan dengan menambahkan/mengganti file di repository lalu melakukan commit dan deployment.

## 5. Ruang Lingkup MVP

### 5.1 Fitur Wajib (P0)

1. **Beranda katalog** dengan nama/logo toko (jika tersedia), pengantar singkat, dan ajakan melihat produk.
2. **Daftar produk** dalam grid kartu yang responsif untuk ponsel dan desktop.
3. **Kartu produk** berisi foto atau placeholder, nama, harga Rupiah, satuan, kategori, dan tombol tindakan.
4. **Pencarian** berdasarkan nama produk; pencarian tidak peka huruf besar/kecil.
5. **Filter kategori**; tersedia pilihan untuk menampilkan semua produk.
6. **Urutan produk** berdasarkan `sort_order` bila ada, kemudian aturan default yang konsisten.
7. **Kontak WhatsApp** untuk produk dan kontak umum toko.
8. **Pesan WhatsApp terisi otomatis** dengan nama produk, satuan, dan harga yang tertera.
9. **Bagian informasi toko** berisi alamat atau area layanan, jam operasional, dan kontak hanya setelah informasi dikonfirmasi pemilik.
10. **State loading, error, dan data kosong** saat katalog sedang dimuat, sumber data gagal diakses, atau hasil pencarian tidak ditemukan.
11. **Pengelolaan katalog berbasis Google Sheets/CSV publik**, dengan sheet publik terpisah yang hanya memuat informasi aman untuk diketahui pelanggan.
12. **SEO dasar**: title, description, metadata Open Graph dasar, favicon, struktur heading yang benar, dan halaman yang dapat diindeks.
13. **Desain responsif dan aksesibilitas dasar**: kontras memadai, teks mudah dibaca, label tombol jelas, alt text gambar, dan interaksi yang dapat digunakan dengan keyboard.
14. **Deployment otomatis dari repository GitHub ke Cloudflare Pages** setelah konfigurasi awal.

### 5.2 Fitur Prioritas Berikutnya (P1)

- Daftar pilihan/favorit sementara di browser untuk menanyakan beberapa barang sekaligus melalui WhatsApp.
- Halaman informasi toko terpisah jika kontennya cukup.
- Filter tambahan berdasarkan jenis atau satuan produk jika jumlah katalog membutuhkannya.
- Statistik penggunaan sederhana bila bisa dilakukan tanpa menambah biaya, pelacakan invasif, atau kompleksitas yang tidak perlu.
- Mekanisme impor data dari file ekspor CSV aplikasi POS setelah format POS diperiksa.

### 5.3 Di Luar Ruang Lingkup MVP

- Login, role, dan dashboard admin buatan sendiri.
- Database seperti PostgreSQL/MySQL dan API backend sendiri.
- Checkout, keranjang transaksi persisten, payment gateway, dan pembayaran online.
- Pesanan otomatis yang dianggap sudah sah tanpa konfirmasi toko.
- Penghitungan ongkos kirim atau integrasi kurir.
- Sinkronisasi otomatis stok dan harga dari POS lokal.
- Notifikasi push, chat di dalam website, loyalty point, kupon kompleks, atau ulasan pelanggan.
- Domain berbayar sebagai syarat peluncuran.

## 6. Struktur Halaman dan Navigasi

### 6.1 Struktur MVP

MVP dapat dimulai sebagai satu halaman utama dengan section yang terurut:

1. Header: identitas toko, navigasi ringkas, tombol WhatsApp.
2. Hero: pesan utama dan tombol “Lihat Katalog”.
3. Search dan filter kategori.
4. Katalog produk: kartu produk dan pagination sederhana atau tombol “Muat lebih banyak” jika jumlah produk besar.
5. Informasi pemesanan: penjelasan bahwa konfirmasi stok/harga dilakukan via WhatsApp.
6. Informasi toko: area/alamat, jam operasional, dan kontak yang telah diverifikasi.
7. Footer: identitas toko, tautan kontak, dan catatan harga/ketersediaan.

Detail produk pada MVP ditampilkan melalui modal/panel detail atau perluasan kartu, bukan route dinamis satu halaman per produk. Pemilihan ini mengurangi kompleksitas static export dan menghindari ketergantungan pada server dinamis. Kebutuhan halaman produk khusus untuk SEO dapat dievaluasi setelah validasi bisnis.

## 7. Alur Pengguna

### 7.1 Alur Pelanggan

1. Pelanggan membuka URL katalog.
2. Website memuat struktur halaman statis.
3. Browser meminta data dari CSV katalog publik.
4. Website menampilkan produk yang valid dan berstatus tayang.
5. Pelanggan mencari atau memfilter produk.
6. Pelanggan memilih produk dan menekan tombol WhatsApp.
7. WhatsApp terbuka dengan pesan awal berisi produk, harga, dan satuan.
8. Pelanggan memeriksa serta mengirim pesan; toko mengonfirmasi stok dan langkah selanjutnya.

### 7.2 Alur Pengelola

1. Pengelola membuka Google Sheets yang dapat diedit oleh pemilik.
2. Pengelola mengubah informasi di sheet kerja.
3. Hanya sheet khusus data publik yang dipublikasikan ke web.
4. Pengelola memeriksa data, harga, serta kecocokan `image_path` dengan file foto di repository.
5. Perubahan pada versi publik dapat memerlukan beberapa menit untuk terlihat.
6. Pengelola membuka website dan menguji minimal satu produk yang diperbarui.

## 8. Aturan Bisnis

1. **Satu baris mewakili satu barang jual/satuan yang harganya jelas.** Jika produk dijual dalam satuan berbeda dengan harga berbeda, buat baris/varian terpisah. Contoh: “Cabai Bubuk - Pack” dan “Cabai Bubuk - Dus” bukan satu baris dengan harga yang ambigu.
2. Harga disimpan sebagai angka Rupiah tanpa teks `Rp` dan tanpa pemisah ribuan. Website mengatur formatnya, misalnya `15000` menjadi `Rp15.000`.
3. Harga harus bilangan bulat lebih besar atau sama dengan nol; produk yang dipublikasikan wajib memiliki harga yang telah disetujui pemilik.
4. Nama produk, ID, kategori, harga, satuan, dan status tayang adalah data wajib.
5. ID produk harus unik dan stabil. Mengubah nama produk tidak boleh mengubah ID yang sudah digunakan.
6. Hanya produk dengan `is_published = TRUE` yang ditampilkan.
7. Data kosong atau rusak tidak boleh menyebabkan seluruh halaman crash. Baris tidak valid diabaikan dan kesalahan dicatat pada console pengembangan; pada produksi tampilkan kondisi yang mudah dipahami.
8. Website tidak menunjukkan stok tersedia/habis secara otomatis. Jika status stok tidak diintegrasikan dengan POS, tampilkan instruksi untuk konfirmasi melalui WhatsApp.
9. Harga pada katalog merupakan informasi saat katalog terakhir diperbarui. Footer atau informasi pemesanan menjelaskan bahwa ketersediaan dan harga akhir perlu dikonfirmasi kepada toko bila dapat berubah.
10. Klik WhatsApp tidak berarti pesanan telah tercatat atau diterima. Pesanan baru ditindaklanjuti setelah komunikasi dengan toko.
11. Nomor WhatsApp menggunakan format internasional berupa angka saja pada URL `wa.me`, misalnya kode negara `62` tanpa angka `0` awal, spasi, tanda plus, atau tanda hubung.
12. Semua kolom pada sheet yang dipublikasikan dianggap dapat dilihat publik. Data modal, margin, pemasok, nomor identitas, catatan internal, atau data pribadi dilarang berada di sheet publik.

## 9. Spesifikasi Data Katalog

Header katalog produksi ditetapkan seperti berikut. Sheet contoh technical spike masih memakai `image_url`; sebelum integrasi produksi, ubah header tersebut menjadi `image_path` agar sesuai dengan keputusan penyimpanan foto di repository.

| Kolom | Tipe/format | Wajib | Aturan |
|---|---|---:|---|
| `id` | Teks | Ya | Unik, stabil, tanpa duplikasi. |
| `name` | Teks | Ya | Nama yang mudah dipahami pembeli. |
| `category` | Teks | Ya | Kategori yang konsisten; hindari variasi ejaan untuk kategori sama. |
| `price_idr` | Bilangan bulat | Ya | Harga dalam Rupiah, misalnya `15000`, tanpa simbol mata uang. |
| `unit` | Teks | Ya | Satuan yang tepat, misalnya pcs, pack, dus, kg, atau karung sesuai produk sebenarnya. |
| `image_path` | Path aset statis | Tidak | Path situs, misalnya `/products/cabai-bubuk.webp`, yang merujuk ke `public/products/cabai-bubuk.webp`. Jika kosong/file tidak ada, gunakan placeholder. |
| `description` | Teks | Tidak | Deskripsi singkat, tanpa HTML yang dieksekusi. |
| `is_published` | Boolean (`TRUE`/`FALSE`) | Ya | Menentukan apakah produk ditampilkan. Format nilai perlu diuji pada CSV aktual. |
| `sort_order` | Bilangan bulat | Tidak | Urutan manual; nilai kosong memakai urutan default. |
| `updated_at` | Tanggal/waktu atau teks | Tidak | Opsional untuk audit; format ditetapkan dan divalidasi saat implementasi. |

### 9.1 Validasi Data

- Baris header harus ada dan dikenali.
- Harga nonnumerik, ID duplikat, atau kolom wajib kosong ditandai sebagai data tidak valid.
- Nilai boolean harus dinormalisasi agar variasi `TRUE`, `true`, dan `FALSE` tidak mengubah perilaku secara tidak sengaja.
- Teks produk diperlakukan sebagai teks biasa; jangan memasukkan HTML atau script dari spreadsheet ke halaman.
- `image_path` harus dimulai dengan `/products/` dan menunjuk ke file yang tersedia pada folder `public/products/`. Jika file tidak ada atau gambar gagal dimuat, tampilkan placeholder secara aman.
- Format Rupiah menggunakan `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })` atau formatter setara yang diuji.

## 10. Pengelolaan Data dan Foto

### 10.1 Google Sheets

Gunakan workbook yang dimiliki pemilik toko, dengan sheet kerja dan **sheet khusus katalog publik** terpisah. Hanya sheet katalog publik yang dipublikasikan sebagai CSV. Google menyatakan perubahan pada file yang dipublikasikan dapat muncul setelah beberapa menit; pembaruan tidak boleh diperlakukan sebagai jaminan real-time.

Website membaca CSV dari browser pada saat halaman dibuka atau saat pelanggan meminta muat ulang. Implementasi harus menguji URL publik dan perilaku CORS di browser. Jika pembacaan CSV lintas-origin tidak dapat diandalkan, hentikan integrasi tersebut dan gunakan fallback yang tetap tanpa biaya: file JSON/CSV statis di repository dengan prosedur pembaruan dan deployment yang terdokumentasi. Fallback berarti perubahan data memerlukan commit/deployment oleh pengelola teknis sampai metode yang lebih baik dipilih.

Ketika CSV tidak dapat diakses, jangan menampilkan harga palsu atau menganggap data lama pasti mutakhir. Tampilkan pesan bahwa katalog sementara tidak dapat dimuat serta tombol untuk menghubungi toko melalui WhatsApp.

### Hasil Technical Spike — 17 Oktober 2026

- **Uji pembacaan awal: LULUS.** Alat uji browser menerima HTTP 200, membaca respons berukuran 387 byte, mendeteksi 10 kolom, dan menampilkan 3 baris data. Waktu respons yang dilaporkan pada satu percobaan adalah sekitar 1.272 ms; angka ini bukan jaminan performa umum.
- **Uji perubahan data: LULUS pada percobaan yang dilaporkan.** Setelah harga `P001` diubah dari `15000` menjadi `15123`, hasil CSV yang dikirim kembali menunjukkan `15123`. Ini membuktikan alur pembaruan berfungsi pada uji saat ini, tetapi tidak menjamin pembaruan instan untuk semua pengunjung.
- **Belum terverifikasi:** pembacaan dan pembaruan setelah website di-deploy ke Cloudflare Pages, perilaku ketika Google Sheets tidak tersedia, serta cache/perubahan yang terlambat. Pengujian tersebut tetap wajib sebelum produksi.
- Setelah pengujian, kembalikan nilai contoh `P001` ke `15000` agar data uji bersih. Jangan menggunakan data contoh ini sebagai harga toko sebenarnya.

### 10.2 Foto Produk

**Keputusan final MVP:** seluruh foto produk disimpan sebagai aset statis di repository pada folder `public/products/`. Tidak digunakan layanan hosting gambar eksternal pada MVP. Pendekatan ini mempertahankan target biaya rutin Rp0 dan membuat aset foto ikut tercadangkan bersama kode.

- Nama file menggunakan huruf kecil dan tanda hubung, misalnya `cabai-bubuk.webp`.
- Simpan file produk pada `public/products/`; website merujuknya melalui path seperti `/products/cabai-bubuk.webp`.
- Gunakan format gambar web yang teroptimasi dan ukuran yang wajar untuk jaringan seluler.
- Jangan menyimpan gambar sebagai base64 di Google Sheets.
- Foto yang gagal dimuat diganti placeholder tanpa mengganggu layout.
- Foto baru atau foto yang diganti memerlukan perubahan repository, commit, dan deployment ulang. Harga, nama, kategori, satuan, deskripsi, dan status tayang tetap dapat diperbarui melalui Google Sheets tanpa deployment.

Pada sheet katalog produksi, gunakan field `image_path`, bukan `image_url`. Contoh nilai: `/products/cabai-bubuk.webp`, yang merujuk pada file `public/products/cabai-bubuk.webp`. Saat website dibangun, folder `public/products/` menjadi bagian dari aset statis yang dipublikasikan. Jangan menganggap link berbagi Google Drive sebagai URL gambar langsung. Jika path kosong, salah, atau file tidak tersedia, gunakan placeholder. Penambahan atau penggantian foto memerlukan commit dan deployment ulang; perubahan data teks/harga di Google Sheets tidak.

## 11. Spesifikasi WhatsApp

Gunakan fitur Click to Chat melalui URL `https://wa.me/<nomor>?text=<pesan-ter-encode>`. Pesan dibuat dari data katalog yang telah divalidasi, lalu dienkode untuk URL.

Contoh template pesan:

> Halo, saya ingin bertanya tentang produk berikut:  
> Nama: {nama_produk}  
> Satuan: {satuan}  
> Harga pada katalog: {harga}  
> Apakah produk tersedia? Terima kasih.

Ketentuan:

- Nomor WhatsApp merupakan konfigurasi milik toko dan tidak boleh dikarang saat implementasi.
- Pesan harus di-URL-encode untuk menjaga spasi dan karakter Indonesia.
- Tombol tidak boleh mengklaim transaksi selesai; hanya membuka percakapan.
- Uji pada Android dengan WhatsApp terpasang, browser desktop, dan WhatsApp Web.
- Jika produk tidak dapat dimuat, tombol kontak umum tetap tersedia jika nomor telah dikonfirmasi.

## 12. Arsitektur Teknis

### 12.1 Stack yang Disepakati

| Bagian | Teknologi | Tanggung jawab |
|---|---|---|
| Framework | Next.js App Router | Struktur halaman dan metadata. |
| Bahasa | TypeScript | Tipe data dan pemeriksaan saat build. |
| UI | Tailwind CSS | Styling responsif dan konsisten. |
| Ikon | Lucide React | Ikon antarmuka seperlunya. |
| Mode deployment | Next.js static export (`output: 'export'`) | Menghasilkan aset HTML/CSS/JS statis ke folder `out`. |
| Hosting | Cloudflare Pages Free | Menyajikan hasil build statis. |
| Foto produk | Repository (`public/products/`) | Foto ikut di-build dan di-deploy sebagai aset statis; perubahan foto memerlukan commit/deployment. |
| Version control | Git + GitHub | Riwayat perubahan dan backup source code. |
| Sumber data awal | Google Sheets yang dipublikasikan sebagai CSV | Katalog publik yang dapat diperbarui pengelola. |
| Komunikasi | WhatsApp Click to Chat | Pertanyaan dan pemesanan manual. |

### 12.2 Alur Arsitektur

1. Developer menyimpan kode pada GitHub.
2. Cloudflare Pages menjalankan build `npx next build` saat perubahan kode dipublikasikan ke branch produksi.
3. Hasil static export berada di folder `out` dan disajikan melalui subdomain `*.pages.dev`.
4. Browser pelanggan mengambil data dari CSV publik Google Sheets.
5. Browser merender kartu produk, pencarian, filter, dan pesan WhatsApp.
6. WhatsApp menangani komunikasi selanjutnya di luar sistem katalog.

### 12.3 Batasan Arsitektur

MVP tidak menggunakan Node.js server yang terus aktif, database, server-side rendering per request, Route Handler/API backend, Server Actions, middleware server, atau Incremental Static Regeneration. Fitur yang memerlukan server harus dinilai ulang sebelum ditambahkan. Static export dipilih agar website dapat di-hosting sebagai aset statis.

### 12.4 Hosting dan Biaya

- Gunakan subdomain Cloudflare Pages (`*.pages.dev`) untuk menghindari biaya domain.
- Jangan menambahkan layanan berbayar sebagai ketergantungan wajib.
- Tidak ada VPS, database berbayar, layanan pembayaran, atau API backend milik sendiri pada MVP.
- Catat semua layanan pihak ketiga beserta fungsi dan ketentuannya.
- Target operasional adalah Rp0 biaya rutin, bukan jaminan bahwa ketentuan paket gratis akan tetap sama selamanya.
- Lakukan backup berkala dan pastikan hasil static export dapat dipindahkan ke static host lain bila diperlukan.

## 13. Persyaratan Nonfungsional

### 13.1 Kinerja

- Halaman awal harus ringan dan menghindari library yang tidak mendukung kebutuhan katalog.
- Foto harus dioptimalkan dan memiliki ukuran/aspect ratio yang konsisten.
- Katalog harus nyaman digunakan melalui jaringan seluler yang tidak selalu cepat.
- Gunakan loading skeleton atau indikator yang sederhana; jangan mengunci seluruh halaman saat data gagal dimuat.

### 13.2 Responsivitas dan Aksesibilitas

- Layout minimum diuji pada lebar 360 px dan tampilan desktop.
- Tidak boleh ada horizontal scrolling yang tidak diperlukan.
- Target area sentuh tombol sesuai praktik aksesibilitas umum dan mudah diketuk di ponsel.
- Semua gambar produk memiliki alt text yang relevan; gambar dekoratif menggunakan alt kosong.
- Input pencarian memiliki label yang jelas.
- Fokus keyboard terlihat, tombol memiliki nama aksesibel, dan heading memiliki urutan yang logis.
- Warna teks dan latar memiliki kontras yang memadai.

### 13.3 Keandalan

- Data yang tidak valid tidak boleh menyebabkan aplikasi crash.
- Kegagalan CSV atau gambar menampilkan fallback yang dipahami pengguna.
- Tombol retry tersedia ketika pemuatan katalog gagal.
- Tidak menampilkan status stok real-time jika tidak ada sumber data stok yang valid.

### 13.4 Keamanan dan Privasi

- Tidak ada informasi rahasia dalam source code frontend, CSV publik, atau path/aset gambar.
- Sheet publik hanya memuat kolom yang memang dimaksudkan untuk pelanggan.
- Tidak mengumpulkan nama, nomor telepon, atau lokasi pelanggan pada MVP.
- Tidak menggunakan login atau cookies pelacakan yang tidak diperlukan.
- Nomor WhatsApp bisnis akan terlihat publik karena merupakan kanal kontak toko.
- Masukan dari spreadsheet ditampilkan sebagai teks dan bukan diinterpretasikan sebagai HTML.

### 13.5 Kompatibilitas

- Browser utama: Chrome Android dan browser desktop modern.
- Uji tambahan pada Safari/iOS jika perangkat tersedia; bila tidak, catat sebagai keterbatasan pengujian, bukan klaim telah diuji.
- Link WhatsApp diuji di perangkat dengan aplikasi WhatsApp dan di desktop melalui WhatsApp Web.

## 14. SEO dan Penemuan Lokal

MVP akan menerapkan metadata title dan description yang jelas, heading semantik, gambar dengan alt text, Open Graph dasar, favicon, dan konten identitas toko yang diberikan pemilik.

Karena data katalog dimuat di browser dari CSV publik, SEO individual untuk setiap produk terbatas pada MVP. Produk tidak memiliki URL statis individual yang dibangun saat deployment. Apabila pencarian organik untuk nama setiap produk menjadi tujuan utama, arsitektur data dan proses build perlu dievaluasi agar halaman produk dapat dihasilkan secara statis tanpa mengorbankan kemudahan pembaruan data.

Jangan membuat alamat toko, jam buka, area layanan, nomor telepon, atau klaim bisnis yang belum diverifikasi oleh pemilik.

## 15. Pengukuran Keberhasilan

Pada MVP tidak perlu langsung memasang layanan analitik pihak ketiga. Keberhasilan awal dapat diukur melalui pengujian penerimaan dan evaluasi manual.

| Indikator | Target penerimaan awal |
|---|---|
| Data katalog valid | Semua produk yang disetujui untuk tayang memiliki nama, kategori, harga, satuan, dan status yang benar. |
| Kemudahan pembaruan | Pengelola dapat mengubah harga di sheet tanpa mengubah source code. |
| Waktu pembaruan | Dalam pengujian normal, perubahan publik terlihat di website dalam target 10 menit; keterlambatan penyedia dicatat dan tidak dijanjikan real-time. |
| Alur WhatsApp | Nama produk, satuan, dan harga di pesan cocok dengan produk yang dipilih. |
| Responsivitas | Tidak ada layout rusak pada viewport mobile 360 px dan desktop yang diuji. |
| Kegagalan sumber data | Pengunjung melihat pesan kegagalan dan cara menghubungi toko, bukan layar kosong atau harga rekaan. |
| Biaya wajib layanan | Rp0 biaya rutin wajib pada konfigurasi yang dirilis. |
| Pemindahan | Source code dan data katalog dapat dicadangkan dan prosedur deployment terdokumentasi. |

## 16. Kriteria Penerimaan (Acceptance Criteria)

MVP hanya dinyatakan siap rilis apabila seluruh kriteria wajib berikut terpenuhi.

1. Beranda dan katalog terbuka melalui URL publik HTTPS.
2. Data CSV yang valid dapat dimuat pada browser yang didukung setelah uji teknis.
3. Produk dengan `is_published = FALSE` tidak tampil.
4. Pencarian nama produk dan filter kategori bekerja bersamaan tanpa hasil yang menyesatkan.
5. Harga tampil dalam format Rupiah dan satuan tampil dekat dengan harga.
6. Produk dengan beberapa satuan penjualan tampil dengan harga yang tidak ambigu.
7. Klik WhatsApp membuka nomor bisnis yang benar dan pesan terisi dengan produk yang dipilih.
8. Produk dengan `image_path` kosong/salah atau file foto yang tidak ditemukan menggunakan placeholder tanpa merusak layout.
9. Kegagalan pemuatan CSV menampilkan pesan yang ramah, tombol mencoba ulang, dan kanal kontak jika telah dikonfirmasi.
10. Pengelola dapat mengubah harga dan memverifikasi bahwa harga baru muncul tanpa perubahan source code.
11. Sheet publik tidak memuat harga modal, margin keuntungan, pemasok, atau informasi internal.
12. Halaman dapat digunakan pada ukuran ponsel dan desktop yang ditentukan dalam pengujian.
13. Tidak ada error kritis di console browser pada skenario pengujian utama.
14. Metadata dasar, favicon, teks informasi toko, dan nomor WhatsApp telah ditinjau pemilik.
15. Source code berada di repository GitHub, langkah build/deploy terdokumentasi, dan hasil static export berhasil dipublikasikan.
16. Tidak ada layanan berbayar yang dibutuhkan agar fungsi inti katalog dan WhatsApp berjalan.

## 17. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Google Sheets/CSV gagal dimuat atau pembaruan terlambat | Katalog tidak tampil atau harga tidak mutakhir. | Uji fetch lintas-origin lebih awal, tampilkan error state, tombol retry, dan fallback kontak. Siapkan fallback data statis jika perlu. |
| Kolom pada sheet publik berisi data internal | Informasi bisnis terekspos. | Pisahkan sheet publik, batasi kolom, review sebelum publikasi, dan lakukan uji dari browser tanpa login. |
| Path foto salah atau file tidak ada di repository | Foto hilang atau layout terganggu. | Validasi `image_path` terhadap file di `public/products/`, gunakan placeholder, optimalkan ukuran, dan uji gambar setelah deployment. |
| Harga di katalog berbeda dari harga aktual | Kepercayaan pelanggan menurun. | Tetapkan penanggung jawab pembaruan, cek berkala, tampilkan waktu pembaruan jika dapat dipercaya, dan sampaikan bahwa harga perlu dikonfirmasi. |
| Kesan stok tersedia padahal barang kosong | Ekspektasi pelanggan tidak terpenuhi. | Jangan menampilkan stok real-time tanpa integrasi POS; minta konfirmasi melalui WhatsApp. |
| Kebijakan layanan gratis berubah | Biaya atau migrasi diperlukan. | Backup source/data, hindari layanan khusus penyedia, gunakan static export, dan dokumentasikan cara memindahkan website. |
| Jumlah produk berkembang besar | Pencarian dan pengambilan katalog bisa terasa lambat. | Uji ukuran CSV, optimalkan foto, tampilkan produk bertahap, dan evaluasi arsitektur bila skala berubah. |
| Nomor WhatsApp atau identitas belum disahkan | Tombol salah tujuan atau informasi keliru. | Jadikan data wajib sebelum rilis produksi dan minta persetujuan pemilik. |

## 18. Rencana Pelaksanaan

### Tahap 0 — Discovery dan Technical Spike

- Konfirmasi nama toko, logo/warna, kategori, nomor WhatsApp, informasi lokasi/jam, dan perkiraan jumlah produk.
- Dapatkan contoh data produk dan format ekspor POS jika tersedia.
- Buat Google Sheet percobaan dengan data dummy nonrahasia.
- Uji pembacaan CSV di browser, termasuk CORS, header kolom, karakter Indonesia, perubahan harga, dan kegagalan koneksi.
- Buat uji foto statis: tambahkan satu gambar contoh di `public/products/`, rujuk melalui `image_path`, lalu verifikasi pemuatan lokal dan setelah deployment.
- Putuskan fallback sumber data apabila fetch CSV tidak stabil.

**Gerbang kelulusan:** CSV dapat dimuat tanpa backend berbayar; foto dari `public/products/` tampil menggunakan `image_path` pada build lokal dan URL deployment; fallback untuk CSV/gambar gagal tersedia.

### Tahap 1 — UX/UI dan Data

- Buat wireframe mobile-first.
- Tetapkan token desain dan komponen kartu produk.
- Tetapkan header kolom final dan contoh data.
- Review wireframe dengan pemilik toko sebelum implementasi penuh.

### Tahap 2 — Pengembangan MVP

- Setup Next.js App Router, TypeScript, Tailwind CSS, dan static export.
- Buat struktur UI, state loading/error/empty, pencarian, filter, kartu produk, dan WhatsApp.
- Integrasikan sumber katalog dan placeholder foto.
- Tambahkan metadata, optimasi gambar, dan validasi data.

### Tahap 3 — QA dan UAT

- Uji fungsi, responsive, keyboard, tautan WhatsApp, data invalid, foto rusak, dan sumber CSV tidak tersedia.
- Minta pemilik memvalidasi data dan alur pemesanan.
- Perbaiki semua bug kritis dan tinggi.

### Tahap 4 — Deployment dan Serah Terima

- Hubungkan GitHub repository ke Cloudflare Pages.
- Deploy ke subdomain `pages.dev`.
- Lakukan smoke test URL produksi.
- Berikan panduan edit katalog, pembaruan foto, backup, troubleshooting, dan prosedur migrasi sederhana.

## 19. Definition of Done

Satu versi MVP dianggap selesai apabila:

- Seluruh kriteria penerimaan P0 lulus.
- Pemilik memverifikasi katalog, harga, satuan, identitas, dan nomor WhatsApp.
- Skenario kegagalan CSV dan gambar telah diuji.
- Tidak ada bug blocker atau critical yang diketahui.
- Source code, konfigurasi build, dan panduan operasional tersedia di repository.
- Deployment produksi bekerja melalui HTTPS.
- Pemilik memahami bahwa harga/stok tidak tersinkron otomatis dengan POS dan bahwa pesanan harus dikonfirmasi via WhatsApp.
- Target biaya wajib rutin tetap Rp0 pada konfigurasi yang diluncurkan.

## 20. Keputusan Terbuka dan Keputusan yang Telah Dikunci

Tabel berikut memisahkan keputusan yang sudah dikunci dari pertanyaan yang masih perlu dikonfirmasi sebelum rilis.

| ID | Pertanyaan | Keputusan/penanggung jawab |
|---|---|---|
| O-01 | Apa nama resmi toko, logo, tagline, dan warna merek? | Pemilik toko — belum ditetapkan. |
| O-02 | Berapa nomor WhatsApp bisnis yang dipakai publik? | Pemilik toko — belum ditetapkan. |
| O-03 | Apa kategori produk yang benar-benar dijual dan bagaimana satuannya? | Pemilik toko — perlu contoh katalog. |
| O-04 | Berapa perkiraan jumlah produk saat peluncuran dan pertumbuhan per bulan? | Pemilik toko — belum diukur. |
| O-05 | Apakah tersedia file ekspor CSV dari POS dan apakah ID/nama/satuan/harga dapat dipetakan? | Tedi + pemilik toko — perlu audit sampel. |
| O-06 | Di mana foto produk disimpan pada MVP? | **DIPUTUSKAN:** `public/products/` di repository. Kolom produksi `image_path`, contoh `/products/cabai-bubuk.webp`. Foto baru/perubahan memerlukan commit dan deployment. |
| O-07 | Apakah browser berhasil fetch CSV publik Sheets di browser target? Jika tidak, fallback mana dipilih? | Uji awal pembacaan dan pembaruan CSV lulus; wajib diuji lagi di URL deployment dan pada kondisi gagal. |
| O-08 | Apakah alamat/jam toko ditampilkan atau cukup area layanan/kontak? | Pemilik toko — belum ditetapkan. |
| O-09 | Siapa penanggung jawab harian untuk memastikan harga dan foto benar? | Pemilik toko — perlu ditetapkan. |
| O-10 | Apakah katalog memerlukan halaman produk individual untuk pencarian Google sejak versi pertama? | Product Owner + pemilik toko — MVP saat ini memakai modal/panel. |

## 21. Dokumen Acuan Teknis

Dokumentasi resmi yang digunakan untuk memvalidasi pilihan arsitektur:

1. **Next.js — Static Exports**: https://nextjs.org/docs/app/guides/static-exports  
   Menjelaskan konfigurasi `output: 'export'`, output folder `out`, serta batas fitur yang membutuhkan server.
2. **Cloudflare Pages — Deploy a Next.js Static Site**: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/  
   Menjelaskan deployment static export Next.js di Pages dengan build `npx next build` dan folder output `out`.
3. **Cloudflare Pages — Limits**: https://developers.cloudflare.com/pages/platform/limits/  
   Rujukan untuk batas paket yang perlu diperiksa lagi sebelum produksi.
4. **Google Docs Editors Help — Make Google Docs, Sheets, Slides & Forms public**: https://support.google.com/docs/answer/183965  
   Menjelaskan publikasi file, pemilihan sheet/format, risiko data publik, dan bahwa pembaruan dapat memerlukan beberapa menit.
5. **WhatsApp Help Center — Click to Chat**: https://faq.whatsapp.com/5913398998672934  
   Menjelaskan format `wa.me` dan pesan awal yang telah diisi.

---

## Riwayat Versi

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 17 Oktober 2026 | Draft PRD awal: target katalog lokal dengan biaya rutin Rp0, static export, data produk CSV/Google Sheets, dan pemesanan WhatsApp. |
| 1.1 | 17 Oktober 2026 | Mencatat hasil uji awal Google Sheets CSV (pembacaan dan pembaruan data lulus pada lingkungan uji); menambahkan langkah verifikasi deployment. |
| 1.2 | 17 Oktober 2026 | Mengunci keputusan foto statis pada `public/products/`, mengganti field produksi dari `image_url` ke `image_path`, dan mendokumentasikan trade-off pembaruan foto melalui commit/deployment. |

**Status persetujuan:** Belum disetujui pemilik toko. Keputusan penyimpanan foto untuk MVP telah ditetapkan. Sebelum produksi, identitas toko dan kontak harus dikonfirmasi, header produksi `image_path` harus diterapkan, serta uji sumber data dan gambar perlu dilakukan pada URL deployment.
