import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  
  // Debugging dan development
  debug: process.env.NODE_ENV === 'development',
  
  // Enable page transitions and routing
  experimental: {
    payloadExtraction: false,
    clientNodeCompat: true
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
  
  // Nitro configuration optimized for Vercel
  nitro: {
    preset: 'vercel',
    experimental: {
      wasm: false
    },
    // Disable ALL prerendering to avoid entities error
    prerender: {
      routes: []
    },
    // Dynamic routes configuration
    routeRules: {
      '/program-latihan/**': { 
        ssr: true,
        headers: { 'cache-control': 's-maxage=60' }
      }
    },
    rollupConfig: {
      external: ['detect-libc', 'entities']
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
    build: {
      rollupOptions: {
        external: ['detect-libc', 'entities']
      }
    },
    optimizeDeps: {
      exclude: ['entities']
    },
    resolve: {
      alias: {
        process: "process/browser"
      }
    },
    define: {
      "process.env": {},
      "global": "globalThis"
    }
  },
  
  // Build optimizations for Vercel
  build: {
    transpile: process.env.NODE_ENV === 'production' ? ['vue', 'entities'] : ['entities']
  },
  
  // Future compatibility
  future: {
    compatibilityVersion: 4
  },
  

})