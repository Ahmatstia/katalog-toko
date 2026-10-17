# Kontrak Data Katalog

**Tujuan:** menjadi kontrak antara Google Sheets, parser CSV, dan komponen UI. Header harus disepakati dan konsisten.

## 1. Header produksi

Urutan header rekomendasi:

```csv
id,name,category,price_idr,unit,image_path,description,is_published,sort_order,updated_at
```

Sheet technical spike awal menggunakan `image_url`. Itu **hanya untuk uji awal**. Untuk katalog produksi, ganti header menjadi `image_path` dan isi dengan path aset lokal di website seperti `/products/cabai-bubuk.webp`.

| Field | Wajib | Format dan aturan |
|---|---:|---|
| `id` | Ya | String unik dan stabil, contoh `P001`. Jangan membuat ID baru setiap kali nama berubah. |
| `name` | Ya | Nama yang tampil di katalog; trim whitespace. |
| `category` | Ya | Kategori yang konsisten, contoh `Bumbu Dapur`. |
| `price_idr` | Ya | Integer Rupiah tanpa simbol atau pemisah ribuan, contoh `15000`. |
| `unit` | Ya | Satuan yang jelas untuk harga ini, contoh `pack`, `kg`, `pcs`, `dus`, `karung`. |
| `image_path` | Tidak | Path relatif yang dimulai `/products/`; file harus ada di `public/products/`. |
| `description` | Tidak | Plain text; jangan dirender sebagai HTML. |
| `is_published` | Ya | Boolean CSV seperti `TRUE`/`FALSE`. Normalisasikan kapitalisasi dan whitespace. Nilai tak dikenal jangan dianggap true. |
| `sort_order` | Tidak | Angka untuk urutan manual; kosong menggunakan urutan default yang stabil. |
| `updated_at` | Tidak | Informasi pembaruan opsional. Tetapkan format konsisten jika akan digunakan di UI. |

## 2. Aturan validasi

- Tolak atau skip baris dengan ID kosong/duplikat, nama kosong, kategori kosong, harga bukan bilangan valid, atau satuan kosong.
- `price_idr` harus finite integer dan tidak negatif. Baris harga `0` hanya boleh tampil apabila memang disetujui sebagai harga valid oleh pemilik; jangan menafsirkan nilai 0 sebagai stok habis.
- Tampilkan hanya `is_published = true`.
- Anggap `TRUE`, `true`, dan ` true ` sebagai true; normalisasikan nilainya. Nilai seperti `yes`, `ya`, string kosong, atau nilai tidak dikenal harus false/tidak valid sampai diputuskan secara eksplisit.
- Escape teks secara normal melalui React; jangan menggunakan `dangerouslySetInnerHTML` untuk data spreadsheet.
- Jangan mengasumsikan urutan kolom tetap. Gunakan header untuk memetakan kolom.
- Parsing CSV wajib mendukung koma di dalam kutipan, kutipan ganda, baris baru dalam field kutipan, dan newline CRLF/LF.
- Jika schema keseluruhan tidak dikenali, tampilkan error data. Jika satu baris rusak, skip baris itu dan catat diagnostik yang tidak berisi informasi sensitif.
- `image_path` harus path internal website; jangan menerima `javascript:`, URL sembarang, atau path yang tidak dimulai `/products/`.

## 3. Format tampilan

- Harga dibentuk oleh `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })` atau formatter setara.
- Satuan tampil berdampingan dengan harga, misalnya `Rp15.000 / pack`.
- Harga di pesan WhatsApp harus cocok dengan harga yang sedang terlihat di kartu produk.
- Bila ada beberapa satuan dengan harga berbeda, gunakan ID/baris berbeda per satuan atau representasikan sebagai varian eksplisit yang disepakati. Jangan membuat harga ambigu.

## 4. Data uji

Gunakan hanya data dummy seperti Cabai Bubuk Rp15.000/pack dan Gula Pasir Rp18.000/kg pada development. Labeli sebagai data contoh. Jangan menganggap data tersebut sebagai daftar produk atau harga resmi toko.

## 5. Konfigurasi publik

CSV publik bisa diakses oleh siapa saja. Jangan pernah memasukkan harga modal, margin, detail pemasok, catatan kasir, stok internal, kredensial, atau informasi pribadi ke sheet yang dipublikasikan.
