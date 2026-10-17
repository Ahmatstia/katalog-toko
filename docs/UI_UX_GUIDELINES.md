# Pedoman UI/UX — Katalog Produk Toko

## 1. Prinsip produk

- Mobile-first: mayoritas pelanggan lokal mungkin membuka tautan dari ponsel atau aplikasi chat.
- Cepat dipahami: harga, satuan, nama produk, dan cara bertanya harus jelas tanpa memaksa pelanggan membaca banyak teks.
- Minimal, rapi, dan profesional; jangan menggunakan efek visual berlebihan.
- Utamakan foto produk dan keterbacaan harga, tetapi hindari layout padat.
- Antarmuka harus tetap berguna ketika foto hilang, CSV lambat, atau pencarian tidak menghasilkan produk.

## 2. Arah visual

Belum ada brand guide resmi. Sebagai arah awal, usulkan visual bersih dengan putih/off-white, biru sebagai warna aksi, dan abu-abu netral. Ini proposal desain, bukan keputusan merek final; jangan menambahkan logo atau warna identitas seolah sudah disetujui pemilik toko.

Gunakan:
- spacing yang konsisten;
- radius dan bayangan yang halus;
- tipografi sans-serif yang mudah dibaca;
- tombol utama yang terlihat jelas dan memiliki label;
- card produk dengan tinggi serta rasio gambar konsisten;
- state hover/focus yang tidak mengganggu.

Hindari:
- neon, gradien dekoratif yang berlebihan, animasi berat, carousel otomatis;
- teks harga yang kecil atau satuan yang tersembunyi;
- warna merah/hijau sebagai satu-satunya pembawa makna;
- tombol WhatsApp kecil yang sulit diketuk;
- placeholder gambar yang membuat layout berubah-ubah.

## 3. Struktur halaman MVP

1. Header dengan identitas toko dan kontak.
2. Hero ringkas: jenis toko, manfaat katalog, CTA ke produk.
3. Search bar yang jelas.
4. Filter kategori berupa chip/tab/dropdown yang nyaman pada layar kecil.
5. Grid kartu produk.
6. Catatan bahwa harga dan ketersediaan dikonfirmasi dengan toko jika sewaktu-waktu berubah.
7. Kontak dan informasi toko yang telah disetujui.
8. Footer minimal.

## 4. Kartu produk

Setiap kartu perlu menampilkan:
- foto dengan rasio yang konsisten dan `alt` yang tepat;
- nama produk;
- kategori bila membantu navigasi;
- harga Rupiah;
- satuan harga secara eksplisit;
- tombol bertuliskan jelas, misalnya “Tanya via WhatsApp”.

Jangan menggunakan tombol ikon saja untuk aksi pemesanan. Jangan menyatakan “stok tersedia” jika tidak ada integrasi stok.

## 5. Interaksi dan state

- Search bekerja tanpa peka kapitalisasi dan memangkas spasi.
- Filter kategori bisa digunakan bersamaan dengan search.
- Loading, error, empty catalog, dan no search results harus memiliki tampilan berbeda.
- Saat katalog gagal dimuat, jangan tampilkan data dummy sebagai katalog produksi.
- Tombol WhatsApp harus memberi pesan yang relevan, URL ter-encode, dan buka target dengan aman.
- Modal/detail (jika dipakai) mendukung Escape, fokus keyboard, tombol tutup yang berlabel, dan tidak mengunci layar secara tidak sengaja.

## 6. Responsivitas dan aksesibilitas

Uji mulai dari lebar 360 px. Pastikan tidak ada overflow horizontal, tap target memadai, kontras teks cukup, focus ring terlihat, elemen semantik digunakan, dan seluruh interaksi penting dapat dilakukan memakai keyboard. Uji desktop dan perangkat nyata saat tersedia.

## 7. Persetujuan desain

Sebelum polish visual besar, buat wireframe/implementasi awal sederhana lalu laporkan asumsi: nama toko, logo, palet, jumlah kategori, dan area informasi toko. Gunakan placeholder yang jelas sampai pemilik mengonfirmasi konten.
