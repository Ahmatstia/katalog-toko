# Katalog Produk Toko

Website katalog produk dan harga untuk toko lokal. Pelanggan melihat produk lalu menghubungi toko lewat WhatsApp. **Bukan e-commerce**: tidak ada checkout, pembayaran, login, database, atau backend.

> **Status:** Phase 1 (scaffold dan bukti static export). Halaman saat ini hanya placeholder. Nama toko, nomor WhatsApp, dan data produk belum dikonfirmasi pemilik dan tidak ada di repository ini.

## Teknologi

Next.js (App Router) + TypeScript + Tailwind CSS, dengan **static export** (`output: 'export'`) untuk Cloudflare Pages. Data katalog akan dibaca browser dari Google Sheets yang dipublikasikan sebagai CSV. Rincian ada di [docs/TECH_STACK_AND_ARCHITECTURE.md](docs/TECH_STACK_AND_ARCHITECTURE.md).

## Prasyarat

- Node.js 22 atau lebih baru (dikembangkan dengan v22.23.0).
- npm 10 atau lebih baru (dikembangkan dengan 10.9.8).
- Git.

## Instalasi

```bash
npm install
cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
```

Lalu isi `.env.local` (lihat bagian *Konfigurasi URL CSV*).

## Perintah

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan di http://localhost:3000 |
| `npm run lint` | Memeriksa kode dengan ESLint |
| `npx tsc --noEmit` | Memeriksa tipe TypeScript |
| `npm run build` | Membuat static export ke folder `out/` |

Sebelum menganggap perubahan selesai, jalankan `lint`, `tsc`, dan `build`.

> `npm start` tidak dipakai karena proyek tidak memakai server Node.js. Untuk melihat hasil build, sajikan folder `out/` dengan static server apa pun.

## Konfigurasi URL CSV

Katalog dibaca dari satu variabel lingkungan:

```env
NEXT_PUBLIC_CATALOG_CSV_URL=https://contoh.invalid/GANTI-DENGAN-URL-CSV-PUBLIK.csv
```

- `.env.example` hanya berisi **placeholder** dan boleh di-commit.
- URL kerja yang asli disimpan di `.env.local`, yang **tidak** di-commit.
- Nilai `NEXT_PUBLIC_*` ditanam saat build dan **dapat dilihat pengunjung**. Jangan isi rahasia apa pun.
- Mengubah URL memerlukan build dan deployment ulang. Mengubah harga atau nama di Google Sheets tidak.
- Sheet publik hanya boleh berisi data aman untuk pelanggan. Lihat [docs/DATA_CONTRACT.md](docs/DATA_CONTRACT.md).

## Struktur folder

```text
katalog-toko/
├── AGENTS.md                 # Aturan proyek untuk AI agent
├── README.md                 # Dokumen ini
├── README-PACK.md            # Catatan paket dokumen awal
├── docs/                     # PRD, arsitektur, kontrak data, QA, operasi, keputusan
├── .agents/rules/            # Aturan UI/UX untuk agent
├── public/
│   └── products/             # Foto produk (mis. cabai-bubuk.webp)
├── src/app/                  # Halaman, layout, dan CSS global (App Router)
├── next.config.ts            # Static export
├── .env.example              # Contoh konfigurasi (placeholder saja)
└── out/                      # Hasil build (dibuat otomatis, tidak di-commit)
```

Folder `src/lib/` dan `src/components/` akan ditambahkan pada Phase 2 dan 3.

## Foto produk

- Simpan di `public/products/` dengan nama huruf kecil dan tanda hubung, mis. `cabai-bubuk.webp`.
- Di sheet, isi kolom `image_path` dengan `/products/cabai-bubuk.webp`.
- Foto baru atau yang diganti memerlukan commit dan deployment ulang.

## Dokumen proyek

[PRD](docs/PRD.md) · [Tech stack](docs/TECH_STACK_AND_ARCHITECTURE.md) · [Kontrak data](docs/DATA_CONTRACT.md) · [UI/UX](docs/UI_UX_GUIDELINES.md) · [QA](docs/QA_TEST_PLAN.md) · [Deployment](docs/DEPLOYMENT_AND_OPERATIONS.md) · [Keputusan](docs/DECISION_LOG.md) · [Roadmap](docs/IMPLEMENTATION_ROADMAP.md)
