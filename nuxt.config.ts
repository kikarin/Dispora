import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  
  // Debugging dan development
  debug: process.env.NODE_ENV === 'development',
  
  // Enable page transitions and routing
  experimental: {
    payloadExtraction: false
  },
  
  // Ensure proper routing untuk Nuxt 4
  router: {
    options: {
      strict: false,
      sensitive: false,
      hashMode: false
    }
  },
  
  // SSR Configuration 
  ssr: true,
  
  // Nitro configuration for better routing
  nitro: {
    preset: 'vercel',
    experimental: {
      wasm: true,
    },
    externals: {
      inline: [],
      external: ['detect-libc']
    },
    alias: {
      './process': 'process'
    },
    // Pastikan dynamic routes ter-handle dengan baik
    routeRules: {
      '/program-latihan/**': { 
        prerender: false,
        ssr: true 
      },
      '/program-latihan/*/target': { 
        prerender: false,
        ssr: true 
      }
    }
  },
  
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      meta: [
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ]
    }
  },
  
  vite: {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: {
        process: "process/browser"
      }
    },
    define: {
      "process.env": {}
    }
  }
})