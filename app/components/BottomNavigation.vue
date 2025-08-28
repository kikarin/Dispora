<template>
  <div class="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[410px]">
    <div class="mx-4 mb-3 rounded-3xl bg-white/95 p-1 backdrop-blur-xl shadow-lg border border-gray-100">
      <div class="flex items-center justify-around">
        <!-- Home -->
        <button 
          @click="navigateTo('/home')" 
          class="relative flex flex-col items-center gap-1 rounded-2xl p-3 px-4 transition-all duration-300 ease-out"
          :class="isActive('/home') ? 'bg-blue-50 text-blue-500 scale-105' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:scale-105'"
        >
          <div class="relative">
            <svg class="h-6 w-6 transition-transform duration-300" 
                 :class="isActive('/home') ? 'scale-110' : ''" 
                 fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span class="text-xs font-semibold transition-all duration-300" 
                :class="isActive('/home') ? 'text-blue-500' : ''">Home</span>
        </button>

        <!-- Program Latihan -->
        <button 
          @click="navigateTo('/program-latihan')" 
          class="relative flex flex-col items-center gap-1 rounded-2xl p-3 px-4 transition-all duration-300 ease-out"
          :class="isActive('/program-latihan') ? 'bg-blue-50 text-blue-500 scale-105' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:scale-105'"
        >
          <div class="relative">
            <svg class="h-6 w-6 transition-transform duration-300" 
                 :class="isActive('/program-latihan') ? 'scale-110' : ''" 
                 fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="text-xs font-semibold transition-all duration-300" 
                :class="isActive('/program-latihan') ? 'text-blue-500' : ''">Prog. Latihan</span>
        </button>

        <!-- Pemeriksaan -->
        <button 
          @click="navigateTo('/pemeriksaan')" 
          class="relative flex flex-col items-center gap-1 rounded-2xl p-3 px-4 transition-all duration-300 ease-out"
          :class="isActive('/pemeriksaan') ? 'bg-blue-50 text-blue-500 scale-105' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:scale-105'"
        >
          <div class="relative">
            <svg class="h-6 w-6 transition-transform duration-300" 
                 :class="isActive('/pemeriksaan') ? 'scale-110' : ''" 
                 fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-xs font-semibold transition-all duration-300" 
                :class="isActive('/pemeriksaan') ? 'text-blue-500' : ''">Periksa</span>
        </button>

        <!-- Profile -->
        <button 
          @click="navigateTo('/profile')" 
          class="relative flex flex-col items-center gap-1 rounded-2xl p-3 px-4 transition-all duration-300 ease-out"
          :class="isActive('/profile') ? 'bg-blue-50 text-blue-500 scale-105' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:scale-105'"
        >
          <div class="relative">
            <svg class="h-6 w-6 transition-transform duration-300" 
                 :class="isActive('/profile') ? 'scale-110' : ''" 
                 fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span class="text-xs font-semibold transition-all duration-300" 
                :class="isActive('/profile') ? 'text-blue-500' : ''">Profile</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isActive = (path: string) => {
  if (path === '/home') {
    return route.path === '/' || route.path === '/home'
  }
  return route.path.startsWith(path)
}

const navigateTo = (path: string) => {
  router.push(path)
}
</script>