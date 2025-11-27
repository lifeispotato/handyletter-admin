import * as dotenv from "dotenv";
// .env 파일 로드
dotenv.config();

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
    open: true,
    proxy: process.env.VITE_API_URL
      ? {
          "/v1": {
            target: process.env.VITE_API_URL,
            changeOrigin: true,
          },
        }
      : {},
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
