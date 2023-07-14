import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react";
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: { https: true , open:true},
  build: {
    outDir: "D:/LearnMaster/LearnMaster/wwwroot",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
