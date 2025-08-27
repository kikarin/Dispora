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
  
  // SSR Configuration - gunakan static generation untuk Vercel
  ssr: false,
  
  // Nitro configuration for static generation
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/']
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
    ]
  }
})