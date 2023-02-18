import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["favicon.png", "apple-touch-icon.png"],
      manifest: {
        name: "Hype!",
        short_name: "Hype!",
        theme_color: "#f49d3f",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/dashboard",
        id: "/dashboard",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        permissions: {
          android: {
            requested: ["READ_CONTACTS"],
          },
          ios: {
            requested: ["contacts"],
          },
        },
      },
    }),
  ],
});
