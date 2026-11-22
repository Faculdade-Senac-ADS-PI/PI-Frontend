import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const __dirname = import.meta.dirname

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined

          if (id.includes("@tanstack")) return "vendor-query"
          if (id.includes("@radix-ui")) return "vendor-radix"
          if (id.includes("react-router")) return "vendor-router"
          if (id.includes("lucide-react")) return "vendor-icons"
          if (id.includes("axios")) return "vendor-http"
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/")
          ) {
            return "vendor-react"
          }

          return "vendor"
        },
      },
    },
  },
})
