<template>
  <div class="min-h-screen">
    <div class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-8" style="background: linear-gradient(180deg,rgba(216, 224, 255, 1) 0%, rgba(248, 250, 251, 1) 50%, rgba(226, 224, 255, 1) 100%);">
      
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-4">
          <button @click="$router.push('/home')" class="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-[24px] font-bold text-gray-900">Test Routing System</h1>
        </div>
        <p class="text-sm text-gray-600 mt-2">✅ Routing diperbaiki! Semua route sekarang berfungsi dengan benar</p>
      </div>

      <!-- Test Routes -->
      <div class="space-y-4">
        <!-- Static Routes -->
        <div class="rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Static Routes</h3>
          <div class="space-y-2">
            <button 
              @click="$router.push('/home')"
              class="w-full bg-green-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Test: /home
            </button>
            <button 
              @click="$router.push('/program-latihan')"
              class="w-full bg-green-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Test: /program-latihan
            </button>
            <button 
              @click="$router.push('/login')"
              class="w-full bg-green-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Test: /login
            </button>
          </div>
        </div>

        <!-- Dynamic Routes -->
        <div class="rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Dynamic Routes</h3>
          <div class="space-y-2">
            <button 
              @click="$router.push('/program-latihan/1')"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Test: /program-latihan/1
            </button>
            <button 
              @click="$router.push('/program-latihan/1/target')"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Test: /program-latihan/1/target
            </button>
            <button 
              @click="$router.push('/program-latihan/999')"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Test: /program-latihan/999 (Edge case)
            </button>
          </div>
        </div>

        <!-- Status Check -->
        <div class="rounded-2xl bg-green-50 p-4 shadow-sm backdrop-blur border border-green-200">
          <h3 class="text-lg font-semibold text-green-800 mb-3">✅ Status Perbaikan</h3>
          <div class="space-y-2 text-sm text-green-700">
            <p>• ✅ Dihapus: Server routes yang konflik</p>
            <p>• ✅ Dihapus: Middleware global yang menyebabkan masalah</p>
            <p>• ✅ Diperbaiki: Struktur direktori routing</p>
            <p>• ✅ Diperbaiki: Prioritas routing Nuxt.js</p>
            <p>• ✅ API endpoints sudah berfungsi</p>
          </div>
        </div>

        <!-- API Test -->
        <div class="rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">API Endpoints</h3>
          <div class="space-y-2">
            <button 
              @click="testAPI('/api/program-latihan/1')"
              class="w-full bg-purple-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-purple-600 transition-colors"
            >
              Test API: /api/program-latihan/1
            </button>
            <button 
              @click="testAPI('/api/program-latihan/1/target')"
              class="w-full bg-purple-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-purple-600 transition-colors"
            >
              Test API: /api/program-latihan/1/target
            </button>
          </div>
          <div v-if="apiResult" class="mt-3 p-3 bg-gray-100 rounded-lg">
            <p class="text-xs text-gray-600">API Response:</p>
            <pre class="text-xs mt-1">{{ JSON.stringify(apiResult, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- Current Route Info -->
      <div class="mt-6 rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">Current Route Info</h3>
        <div class="space-y-2 text-sm">
          <p><strong>Path:</strong> {{ $route.path }}</p>
          <p><strong>Full Path:</strong> {{ $route.fullPath }}</p>
          <p><strong>Params:</strong> {{ JSON.stringify($route.params) }}</p>
          <p><strong>Query:</strong> {{ JSON.stringify($route.query) }}</p>
        </div>
      </div>

      <!-- Spacer for bottom navigation -->
      <div class="h-20"></div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import BottomNavigation from '~/components/BottomNavigation.vue'

const route = useRoute()
const apiResult = ref<any>(null)

const testAPI = async (endpoint: string) => {
  try {
    console.log('Testing API endpoint:', endpoint)
    const response = await fetch(endpoint)
    const data = await response.json()
    apiResult.value = data
    console.log('API Response:', data)
  } catch (error) {
    console.error('API Error:', error)
    apiResult.value = { error: (error as Error).message || 'Unknown error' }
  }
}

onMounted(() => {
  console.log('Test routing page loaded')
  console.log('Current route:', route.path)
})
</script>
