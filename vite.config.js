import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        svgo: true,
        svgoConfig: {
          convertStyleToAttrs: true,
          prefixIds: true,
          cleanupIds: true,
        },
      },
    }),
    react(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    host: true,
  },
})
