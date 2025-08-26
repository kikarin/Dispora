<template>
  <div class="min-h-screen">
    <div class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-8" style="background: linear-gradient(180deg,rgba(216, 224, 255, 1) 0%, rgba(248, 250, 251, 1) 50%, rgba(226, 224, 255, 1) 100%);">
      
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-4">
          <button @click="$router.back()" class="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-[24px] font-bold text-gray-900">Target Program ID: {{ programId }}</h1>
        </div>
        <p class="text-sm text-gray-600">Program: {{ program.nama }}</p>
      </div>

      <!-- Tab Navigation -->
      <div class="mb-6">
        <div class="flex bg-white/80 rounded-2xl p-1 backdrop-blur">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200"
            :class="activeTab === tab.id 
              ? 'bg-[#597BF9] text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Content based on active tab -->
      <div class="rounded-2xl bg-white/90 p-6 shadow-sm backdrop-blur">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ tabs.find((t: any) => t.id === activeTab)?.label }}
        </h3>
        
        <div class="text-center py-8">
          <p class="text-gray-600">Ini adalah halaman Target untuk Program ID: {{ programId }}</p>
          <p class="text-sm text-gray-500 mt-2">Tab aktif: {{ activeTab }}</p>
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BottomNavigation from '~/components/BottomNavigation.vue'

const route = useRoute()
const programId = parseInt(route.params.id as string)

// Tab Management
const activeTab = ref('individu')
const tabs = [
  { id: 'individu', label: 'Target Individu' },
  { id: 'kelompok', label: 'Target Kelompok' },
  { id: 'latihan', label: 'Target Latihan' }
]

// Program Data
const program = ref({
  id: programId,
  nama: `Program Latihan ID ${programId}`
})

onMounted(() => {
  console.log('Target page loaded for Program ID:', programId)
  console.log('Route params:', route.params)
})
</script>
