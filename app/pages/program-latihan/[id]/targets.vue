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
        
        <!-- Target Individu -->
        <div v-if="activeTab === 'individu'" class="space-y-4">
          <div v-for="target in targetData.targetIndividu" :key="target.id" 
               class="p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
               @click="navigateToTargetDetail(target.id)">
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900 mb-2">{{ target.nama }}</h4>
                <span v-if="target.peserta" 
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                      :class="getPesertaBadgeClass(target.peserta)">
                  {{ target.peserta }}
                </span>
              </div>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p class="text-sm text-gray-600">{{ target.target }}</p>
          </div>
        </div>

        <!-- Target Kelompok -->
        <div v-else-if="activeTab === 'kelompok'" class="space-y-4">
          <div v-for="target in targetData.targetKelompok" :key="target.id" 
               class="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-gray-900">{{ target.nama }}</h4>
            </div>
            <p class="text-sm text-gray-600">{{ target.target }}</p>
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9] mx-auto"></div>
          <p class="text-gray-500 mt-2">Memuat data target...</p>
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
console.log('Target page - Raw route param:', programIdParam)

// Simple validation without throwing error
let programId = 1
if (programIdParam && !isNaN(Number(programIdParam))) {
  programId = parseInt(programIdParam)
} else {
  console.warn('Invalid program ID in target page, using default:', programIdParam)
}

// Tab Management
const activeTab = ref('individu')
const tabs = [
  { id: 'individu', label: 'Target Individu' },
  { id: 'kelompok', label: 'Target Kelompok' },
]

// Loading state
const loading = ref(true)

// Program Data
const program = ref({
  id: programId,
  nama: `Program Latihan ID ${programId}`
})

// Target Data Types
interface TargetItem {
  id: number
  nama: string
  target: string
  peserta?: string // Badge peserta: Atlet, Pelatih, Tenaga Pendukung
}

interface TargetApiResponse {
  id: number
  programId: number
  nama: string
  targetIndividu: TargetItem[]
  targetKelompok: TargetItem[]
  success: boolean
}

// Target Data from API
const targetData = ref<{
  targetIndividu: TargetItem[]
  targetKelompok: TargetItem[]
  success: boolean
}>({
  targetIndividu: [],
  targetKelompok: [],
  success: false
})

// Fetch target data from API
const fetchTargetData = async () => {
  try {
    loading.value = true
    console.log('Fetching target data for program ID:', programId)
    
    const response = await $fetch<TargetApiResponse>(`/api/program-latihan/${programId}/target`)
    
    if (response && response.success) {
      targetData.value = {
        targetIndividu: response.targetIndividu,
        targetKelompok: response.targetKelompok,
        success: response.success
      }
      program.value.nama = response.nama || `Program Latihan ID ${programId}`
      console.log('Target data loaded successfully:', response)
    } else {
      console.warn('Failed to load target data, using defaults')
      // Use default data if API fails
      targetData.value = {
        targetIndividu: [
          { id: 1, nama: "Peningkatan stamina", target: "12,5 Detik", peserta: "Atlet" },
          { id: 2, nama: "Kekuatan otot", target: "50 push-up", peserta: "Atlet" },
          { id: 3, nama: "Analisis teknik", target: "Evaluasi video pertandingan", peserta: "Pelatih" },
          { id: 4, nama: "Persiapan alat", target: "Setup peralatan latihan", peserta: "Tenaga Pendukung" }
        ],
        targetKelompok: [
          { id: 1, nama: "Kerjasama tim", target: "Latihan passing", },
          { id: 2, nama: "Strategi bermain", target: "Taktik pertahanan", }
        ],
        success: false
      }
    }
  } catch (error) {
    console.error('Error fetching target data:', error)
    // Use default data on error
    targetData.value = {
      targetIndividu: [
        { id: 1, nama: "Peningkatan stamina", target: "12,5 Detik", peserta: "Atlet" },
        { id: 2, nama: "Kekuatan otot", target: "50 push-up", peserta: "Atlet" },
        { id: 3, nama: "Analisis teknik", target: "Evaluasi video pertandingan", peserta: "Pelatih" },
        { id: 4, nama: "Persiapan alat", target: "Setup peralatan latihan", peserta: "Tenaga Pendukung" }
      ],
      targetKelompok: [
        { id: 1, nama: "Kerjasama tim", target: "Latihan passing", },
        { id: 2, nama: "Strategi bermain", target: "Taktik pertahanan", }
      ],
      success: false
    }
  } finally {
    loading.value = false
  }
}

// Functions
const getPesertaBadgeClass = (peserta: string) => {
  switch (peserta) {
    case 'Atlet':
      return 'bg-blue-100 text-blue-800 border border-blue-200'
    case 'Pelatih':
      return 'bg-green-100 text-green-800 border border-green-200'
    case 'Tenaga Pendukung':
      return 'bg-orange-100 text-orange-800 border border-orange-200'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

const navigateToTargetDetail = (targetId: number) => {
  console.log('Navigating to target detail for:', targetId)
  router.push(`/program-latihan/${programId}/target/${targetId}`)
}

onMounted(() => {
  console.log('Target page loaded for Program ID:', programId)
  console.log('Route params:', route.params)
  fetchTargetData()
})
</script>
