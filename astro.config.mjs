// @ts-check
import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel/serverless"
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  // @ts-ignore
  adapter: vercel(), // <<--- AÑADIR ESTO
  output: "server", // <<--- CAMBIAR ESTO
  vite: {
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
      },
    },
  },
  build: {
    inlineStylesheets: "auto",
  },
  server: {
    host: true,
    port: 4321,
  },
})
