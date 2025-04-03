import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@adminPages": fileURLToPath(
        new URL("./src/features/admin/pages", import.meta.url)
      ),
      "@userPages": fileURLToPath(
        new URL("./src/features/user/pages", import.meta.url)
      ),
      "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
    },
  },
});
