import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['nuxt-auth-sanctum', 'nuxt-charts'],

  // Runtime config untuk API base URL
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api',
    },
  },

  // @ts-ignore
  sanctum: {
    baseUrl: 'http://localhost:8000',
    origin: 'http://localhost:3000',
  },

  // Debugging dan development
  debug: process.env.NODE_ENV === 'development',

  // Enable page transitions and routing
  experimental: {
    payloadExtraction: false,
  },

  // Ensure proper routing untuk Nuxt 4
  router: {
    options: {
      strict: false,
      sensitive: false,
      hashMode: false,
    },
  },

  // SSR Configuration
  ssr: true,

  // Nitro configuration for better routing
  nitro: {
    experimental: {
      wasm: true,
    },
    externals: {
      inline: [],
      external: ['detect-libc'],
    },
    alias: {
      './process': 'process',
    },
  },

  app: {
    // Page transitions configuration
    pageTransition: {
      name: 'page',
      mode: 'default',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'default',
    },
    head: {
      viewport:
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Symbols:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
      ],
      meta: [
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        process: 'process/browser',
      },
    },
    define: {
      'process.env': {},
    },
  },
})
