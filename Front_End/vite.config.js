import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Feather Mound",
        short_name: "FM",
        start_url: "/",
        display: "standalone",

       
        background_color: "#000000",
        theme_color: "#000000",

        icons: [
          /* ✅ App Icon (FM logo) */
          {
            src: "/icon/3A8076C3-A742-45C8-8EC1-030243657F3A_1_201_a.jpeg",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icon/f9bf19b9-afab-44a2-8222-ce770d131e4d.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ]
});