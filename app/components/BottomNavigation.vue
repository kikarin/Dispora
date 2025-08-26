<template>
  <div class="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[410px]">
    <div class="mx-5 mb-5 rounded-2xl bg-white/90 p-2 shadow-lg backdrop-blur">
      <div class="flex items-center justify-around">
        <!-- Home -->
        <button 
          @click="navigateTo('/home')" 
          class="flex flex-col items-center gap-1 rounded-full p-3 transition-all duration-200"
          :class="isActive('/home') ? 'bg-blue-500/20 text-blue-600' : 'text-gray-500 hover:bg-gray-100/50'"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs font-medium">Home</span>
        </button>

        <!-- Program Latihan -->
        <button 
          @click="navigateTo('/program-latihan')" 
          class="flex flex-col items-center gap-1 rounded-full p-3 transition-all duration-200"
          :class="isActive('/program-latihan') ? 'bg-blue-500/20 text-blue-600' : 'text-gray-500 hover:bg-gray-100/50'"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span class="text-xs font-medium">Program Latihan</span>
        </button>

        <!-- Pemeriksaan -->
        <button 
          @click="navigateTo('/pemeriksaan')" 
          class="flex flex-col items-center gap-1 rounded-full p-3 transition-all duration-200"
          :class="isActive('/pemeriksaan') ? 'bg-blue-500/20 text-blue-600' : 'text-gray-500 hover:bg-gray-100/50'"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xs font-medium">Pemeriksaan</span>
        </button>

        <!-- Turnamen -->
        <button 
          @click="navigateTo('/turnamen')" 
          class="flex flex-col items-center gap-1 rounded-full p-3 transition-all duration-200"
          :class="isActive('/turnamen') ? 'bg-blue-500/20 text-blue-600' : 'text-gray-500 hover:bg-gray-100/50'"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span class="text-xs font-medium">Turnamen</span>
        </button>

        <!-- Profile -->
        <button 
          @click="navigateTo('/profile')" 
          class="flex flex-col items-center gap-1 rounded-full p-3 transition-all duration-200"
          :class="isActive('/profile') ? 'bg-blue-500/20 text-blue-600' : 'text-gray-500 hover:bg-gray-100/50'"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-xs font-medium">Profile</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/' || route.path === '/home'
  }
  return route.path.startsWith(path)
}

const navigateTo = (path: string) => {
  router.push(path)
}
</script>