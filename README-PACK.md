# Paket Dokumen Antigravity — Website Katalog Produk Toko

Paket ini disiapkan sebelum repository aplikasi dibuat. File-file di sini adalah acuan produk, arsitektur, aturan agent, pengujian, dan deployment.

## Cara menggunakan

1. Buat folder proyek lokal, misalnya `katalog-produk`.
2. Ekstrak/ salin **seluruh isi paket ini** ke folder proyek tersebut. Pastikan `AGENTS.md` berada di root dan folder `docs/` serta `.agents/` berada sejajar dengannya.
3. Buka folder proyek tersebut di Google Antigravity sebagai project/workspace.
4. Buka `docs/ANTIGRAVITY_FIRST_PROMPT.md` dan salin prompt di dalamnya ke chat agent.
5. Minta agent membaca dokumen, memvalidasi konsistensi, dan menyusun rencana. Jangan izinkan agent langsung membangun seluruh website tanpa review tahap awal.
6. Setelah rencana disetujui, lanjutkan implementasi sesuai `docs/IMPLEMENTATION_ROADMAP.md`.

Folder ini sengaja belum berisi aplikasi Next.js. Agent nantinya membuat scaffold aplikasi dengan tetap mempertahankan dokumen yang ada. Jika tool scaffolding menolak direktori tidak kosong, jangan hapus dokumen; buat scaffold sementara di subfolder/sibling dan pindahkan file aplikasi secara hati-hati setelah memeriksa konflik.

## Struktur paket

```text
katalog-produk/
├── AGENTS.md
├── README-PACK.md
├── .agents/
│   └── rules/
│       └── ui-ux.md
└── docs/
    ├── PRD.md
    ├── TECH_STACK_AND_ARCHITECTURE.md
    ├── DATA_CONTRACT.md
    ├── UI_UX_GUIDELINES.md
    ├── QA_TEST_PLAN.md
    ├── DEPLOYMENT_AND_OPERATIONS.md
    ├── DECISION_LOG.md
    ├── IMPLEMENTATION_ROADMAP.md
    └── ANTIGRAVITY_FIRST_PROMPT.md
```

## Dokumen sumber resmi teknis

- Antigravity rules: https://antigravity.google/docs/rules/
- Next.js static export: https://nextjs.org/docs/app/guides/static-exports
- Cloudflare Pages static Next.js: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/

Selalu cek dokumentasi resmi lagi saat deployment karena dukungan fitur dan ketentuan gratis bisa berubah.
