import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Mirragio",
        short_name: "Mirragio",
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "/icon/idQGa_7jrp_1765509723944.jpeg",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icon/ide0xBqxbi_1765509841930.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
})
