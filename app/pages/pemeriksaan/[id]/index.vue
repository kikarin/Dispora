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
          <h1 class="text-[24px] font-bold text-gray-700">Parameter Pemeriksaan</h1>
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-4">
        <!-- Parameter List -->
        <div v-for="parameter in parameterData" :key="parameter.id" 
             class="p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
             @click="navigateToParameterDetail(parameter.id)">
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1">
              <h4 class="font-semibold text-gray-700 mb-2">{{ parameter.nama }}</h4>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mb-2"
                      :class="getPesertaBadgeClass(parameter.untukSiapa)">
                  {{ parameter.untukSiapa }}
                </span>
                <span class="flex ml-0.5 gap-1 text-sm text-gray-600">
                  {{ parameter.satuan }}
                </span>
            </div>
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9] mx-auto"></div>
          <p class="text-gray-500 mt-2">Memuat data parameter...</p>
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
const pemeriksaanIdParam = route.params.id as string

console.log('Parameter pemeriksaan page - Pemeriksaan ID:', pemeriksaanIdParam)

// Simple validation
let pemeriksaanId = 1

if (pemeriksaanIdParam && !isNaN(Number(pemeriksaanIdParam))) {
  pemeriksaanId = parseInt(pemeriksaanIdParam)
}

// Loading state
const loading = ref(false)

// Parameter Data
const parameterData = ref([
  {
    id: 1,
    nama: "Suhu Tubuh",
    untukSiapa: "Semua Peserta",
    satuan: "°C"
  },
  {
    id: 2,
    nama: "Tekanan Darah",
    untukSiapa: "Semua Peserta",
    satuan: "mmHg"
  },
  {
    id: 3,
    nama: "Denyut Nadi",
    untukSiapa: "Semua Peserta",
    satuan: "bpm"
  },
  {
    id: 4,
    nama: "Tinggi Badan",
    untukSiapa: "Semua Peserta",
    satuan: "cm"
  },
  {
    id: 5,
    nama: "Berat Badan",
    untukSiapa: "Semua Peserta",
    satuan: "kg"
  },
  {
    id: 6,
    nama: "VO2 Max",
    untukSiapa: "Atlet",
    satuan: "ml/kg/min"
  },
  {
    id: 7,
    nama: "Fleksibilitas",
    untukSiapa: "Semua Peserta",
    satuan: "cm"
  },
  {
    id: 8,
    nama: "Kekuatan Otot",
    untukSiapa: "Atlet",
    satuan: "kg"
  }
])

// Functions
const navigateToParameterDetail = (parameterId: number) => {
  console.log('Navigating to parameter detail for:', parameterId)
  router.push(`/pemeriksaan/${pemeriksaanId}/parameter/${parameterId}`)
}

// Helper function untuk mendapatkan class badge berdasarkan jenis peserta
const getPesertaBadgeClass = (jenisPeserta: string) => {
  switch (jenisPeserta) {
    case 'Atlet':
      return 'bg-blue-100 text-blue-800 border border-blue-200'
    case 'Pelatih':
      return 'bg-green-100 text-green-800 border border-green-200'
    case 'Tenaga Pendukung':
      return 'bg-orange-100 text-orange-800 border border-orange-200'
    case 'Semua Peserta':
      return 'bg-purple-100 text-purple-800 border border-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

onMounted(() => {
  console.log('Parameter pemeriksaan page loaded for Pemeriksaan ID:', pemeriksaanId)
  console.log('Route params:', route.params)
})
</script>