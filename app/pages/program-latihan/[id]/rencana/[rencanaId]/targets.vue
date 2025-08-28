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
          <h1 class="text-[24px] font-bold text-gray-900">Target Latihan</h1>
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
               class="p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
               @click="openTargetKelompokModal(target)">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-gray-900">{{ target.nama }}</h4>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
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

      <!-- Modal Target Kelompok -->
      <div v-if="showTargetKelompokModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeTargetKelompokModal"></div>
        <div class="relative bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ selectedTargetKelompok.nama }}</h3>
            <button @click="closeTargetKelompokModal" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div v-if="selectedTargetKelompok" class="space-y-4">
            <div>
              <p class="text-sm text-gray-600">{{ selectedTargetKelompok.target }}</p>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-3 bg-gray-50 rounded-xl">
                <p class="text-xs text-gray-500 mb-1">Nilai</p>
                <p class="text-2xl font-bold text-[#597BF9]">{{ selectedTargetKelompok.nilai || 'N/A' }}</p>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-xl">
                <p class="text-xs text-gray-500 mb-1">Status</p>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                      :class="getTrendClass(selectedTargetKelompok.trend)">
                  {{ selectedTargetKelompok.trend || 'Belum di-set' }}
                </span>
              </div>
            </div>
          </div>
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
const rencanaIdParam = route.params.rencanaId as string

console.log('Target rencana page - Program ID:', programIdParam)
console.log('Target rencana page - Rencana ID:', rencanaIdParam)

// Simple validation
let programId = 1
let rencanaId = 1

if (programIdParam && !isNaN(Number(programIdParam))) {
  programId = parseInt(programIdParam)
}

if (rencanaIdParam && !isNaN(Number(rencanaIdParam))) {
  rencanaId = parseInt(rencanaIdParam)
}

// Tab Management
const activeTab = ref('individu')
const tabs = [
  { id: 'individu', label: 'Target Individu' },
  { id: 'kelompok', label: 'Target Kelompok' },
]

// Loading state
const loading = ref(false)

// Rencana Info
const rencanaInfo = ref({
  id: rencanaId,
  materi: "Latihan strategi dan simulasi pertandingan",
  tanggal: "2025-08-12"
})

// Target Data Types
interface TargetItem {
  id: number
  nama: string
  target: string
  peserta?: string // Badge peserta: Atlet, Pelatih, Tenaga Pendukung
  nilai?: number | null
  trend?: string | null
}

interface TargetApiResponse {
  id: number
  rencanaId: number
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

// Modal State
const showTargetKelompokModal = ref(false)
const selectedTargetKelompok = ref<TargetItem | null>(null)

// Helper function untuk format tanggal rencana (contoh: "12 Agustus 2025")
const formatTanggalBulan = (tanggalString: string) => {
  try {
    const date = new Date(tanggalString)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ]
    
    return `${day} ${monthNames[month]} ${year}`
  } catch (error) {
    return tanggalString
  }
}

// Fetch target data from API
const fetchTargetData = async () => {
  try {
    loading.value = true
    console.log('Fetching target data for rencana ID:', rencanaId)
    
    // For now, use mock data since we don't have API endpoint for rencana targets
    // In real implementation, you would call: const response = await $fetch<TargetApiResponse>(`/api/program-latihan/${programId}/rencana/${rencanaId}/targets`)
    
    // Mock data for demonstration
    targetData.value = {
      targetIndividu: [
        { id: 1, nama: "Peningkatan stamina", target: "12,5 Detik", peserta: "Atlet" },
        { id: 2, nama: "Kekuatan otot", target: "50 push-up", peserta: "Atlet" },
        { id: 3, nama: "Analisis teknik", target: "Evaluasi video pertandingan", peserta: "Pelatih" },
        { id: 4, nama: "Persiapan alat", target: "Setup peralatan latihan", peserta: "Tenaga Pendukung" }
      ],
              targetKelompok: [
          { id: 1, nama: "Kerjasama tim", target: "Latihan passing", nilai: 85, trend: "Naik" },
          { id: 2, nama: "Strategi bermain", target: "Taktik pertahanan", nilai: 78, trend: "Turun" }
        ],
      success: true
    }
    
    console.log('Target data loaded successfully for rencana:', rencanaId)
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
          { id: 1, nama: "Kerjasama tim", target: "Latihan passing", nilai: 85, trend: "Naik" },
          { id: 2, nama: "Strategi bermain", target: "Taktik pertahanan", nilai: 78, trend: "Turun" }
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
  router.push(`/program-latihan/${programId}/rencana/${rencanaId}/target/${targetId}`)
}

const openTargetKelompokModal = (target: TargetItem) => {
  selectedTargetKelompok.value = target
  showTargetKelompokModal.value = true
}

const closeTargetKelompokModal = () => {
  showTargetKelompokModal.value = false
  selectedTargetKelompok.value = null
}

const getTrendClass = (trend: string | null) => {
  if (trend === 'Naik') {
    return 'bg-green-100 text-green-800 border border-green-200'
  } else if (trend === 'Turun') {
    return 'bg-red-100 text-red-800 border border-red-200'
  } else {
    return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

onMounted(() => {
  console.log('Target rencana page loaded for Program ID:', programId, 'Rencana ID:', rencanaId)
  console.log('Route params:', route.params)
  fetchTargetData()
})
</script>
