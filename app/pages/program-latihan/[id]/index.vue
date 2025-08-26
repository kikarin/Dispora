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
          <h1 class="text-[24px] font-bold text-gray-900">Detail Program</h1>
        </div>
      </div>

      <!-- Program Info Card -->
      <div class="rounded-2xl bg-white/90 p-6 shadow-sm backdrop-blur mb-6">
        <div class="flex items-start justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900">{{ program.nama }}</h2>
          <button 
            @click="toggleSave"
            class="rounded-full p-2 transition-all duration-200 hover:scale-110"
            :class="program.isSaved ? 'bg-[#597BF9] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'"
          >
            <svg v-if="program.isSaved" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
            </svg>
            <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
            </svg>
          </button>
        </div>

        <!-- Cabor Badge -->
        <div class="mb-4">
          <span class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#597BF9]/10 text-[#597BF9] border border-[#597BF9]/20">
            {{ program.cabor }}
          </span>
        </div>

        <!-- Program Details -->
        <div class="space-y-3 mb-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[#597BF9]/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-[#597BF9]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-500">Kategori</p>
              <p class="text-sm font-medium text-gray-900">{{ program.kategori }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[#597BF9]/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-[#597BF9]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-500">Periode</p>
              <p class="text-sm font-medium text-gray-900">{{ program.periode }}</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-[#597BF9]/10 flex items-center justify-center mt-1">
              <svg class="w-4 h-4 text-[#597BF9]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-500">Keterangan</p>
              <p class="text-sm text-gray-900">{{ program.keterangan }}</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button 
            @click="viewTarget"
            class="flex-1 bg-[#597BF9] text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
          >
            Lihat Target
          </button>
          <button 
            @click="viewRencana"
            class="flex-1 bg-white border border-[#597BF9] text-[#597BF9] py-3 px-4 rounded-xl text-sm font-medium hover:bg-[#597BF9]/5 transition-colors"
          >
            Rencana Latihan
          </button>
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
import { useRoute, useRouter } from 'vue-router'
import BottomNavigation from '~/components/BottomNavigation.vue'

const route = useRoute()
const router = useRouter()

// Validate and handle route params
const programIdParam = route.params.id as string
console.log('Detail page - Raw route param:', programIdParam)

// Simple validation without throwing error
let programId = 1
if (programIdParam && !isNaN(Number(programIdParam))) {
  programId = parseInt(programIdParam)
} else {
  console.warn('Invalid program ID, using default:', programIdParam)
}

// Program Data
const program = ref({
  id: programId,
  nama: `Latihan Fisik Dasar - ${programId}`,
  cabor: "Sepak Bola",
  kategori: "Putra",
  periode: "2025-08-01 s/d 2025-08-31",
  keterangan: "Fokus pada penguatan fisik dan stamina.",
  isSaved: false
})

// Toggle Save
const toggleSave = () => {
  program.value.isSaved = !program.value.isSaved
}

// Navigation Functions
const viewTarget = () => {
  console.log('Navigating to target for program:', programId)
  router.push(`/program-latihan/${programId}/target`)
}

const viewRencana = () => {
  console.log('View detailed rencana for program:', programId)
}

onMounted(() => {
  console.log('Detail page loaded for Program ID:', programId)
  console.log('Route params:', route.params)
})
</script>
