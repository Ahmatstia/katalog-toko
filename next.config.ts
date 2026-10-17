import type { NextConfig } from "next";

// Static export untuk Cloudflare Pages (hasil build ada di folder `out/`).
// Tidak ada fitur server runtime. Lihat docs/TECH_STACK_AND_ARCHITECTURE.md.
const nextConfig: NextConfig = {
  output: "export",
  // Jangan biarkan `next dev` menambah/menulis ulang AGENTS.md proyek.
  agentRules: false,
  images: {
    // Tidak ada image optimizer server pada static export.
    unoptimized: true,
  },
  // Dari scaffold: mengaktifkan Tailwind CSS di Turbopack.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
