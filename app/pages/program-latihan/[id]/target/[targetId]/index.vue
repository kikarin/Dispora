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
          <h1 class="text-[24px] font-bold text-gray-900">Detail Target</h1>
        </div>
      </div>

      <!-- Target Info Card -->
      <div class="rounded-2xl bg-white/90 p-6 shadow-sm backdrop-blur mb-6">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h2 class="text-xl font-bold text-gray-900 mb-2">{{ targetInfo.nama }}</h2>
            <span v-if="targetInfo.peserta" 
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="getPesertaBadgeClass(targetInfo.peserta)">
              {{ targetInfo.peserta }}
            </span>
          </div>
        </div>
        
        <div class="mb-4">
          <p class="text-sm text-gray-600">{{ targetInfo.target }}</p>
        </div>
      </div>

      <!-- Peserta yang Sudah Melakukan Target -->
      <div class="rounded-2xl bg-white/90 p-6 shadow-sm backdrop-blur">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Peserta yang Sudah Melakukan Target
        </h3>
        
        <div class="space-y-4">
          <div v-for="peserta in pesertaTargetData" :key="peserta.id" 
               class="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900 mb-1">{{ peserta.nama }}</h4>
                <div class="flex items-center gap-4 text-sm text-gray-600">
                  <span>{{ peserta.jenisKelamin }}</span>
                  <span>{{ peserta.usia }} tahun</span>
                  <span>{{ peserta.posisi }}</span>
                </div>
              </div>
              <div class="text-right">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" 
                      :class="getTrendClass(peserta.trend)">
                  {{ peserta.trend }}
                </span>
              </div>
            </div>
            
            <div class="flex items-center justify-between text-sm">
              <div>
                <p class="text-gray-500">Target: {{ peserta.target }}</p>
              </div>
              <div class="text-right">
                <p class="text-gray-500">Nilai</p>
                <p class="font-bold text-lg text-gray-900">{{ peserta.nilai }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9] mx-auto"></div>
          <p class="text-gray-500 mt-2">Memuat data peserta...</p>
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

// Validate and handle route params
const programIdParam = route.params.id as string
const targetIdParam = route.params.targetId as string

console.log('Target detail page - Program ID:', programIdParam)
console.log('Target detail page - Target ID:', targetIdParam)

// Simple validation
let programId = 1
let targetId = 1

if (programIdParam && !isNaN(Number(programIdParam))) {
  programId = parseInt(programIdParam)
}

if (targetIdParam && !isNaN(Number(targetIdParam))) {
  targetId = parseInt(targetIdParam)
}

// Loading state
const loading = ref(false)

// Target Info
const targetInfo = ref({
  id: targetId,
  nama: "Peningkatan stamina",
  target: "12,5 Detik",
  peserta: "Atlet"
})

// Mock data untuk peserta yang sudah melakukan target
const pesertaTargetData = ref([
  {
    id: 1,
    nama: "Budi Santoso",
    jenisKelamin: "Laki-laki",
    usia: 25,
    posisi: "Small Forward",
    nilai: 11.0,
    target: "12.5 Detik",
    trend: "Naik"
  },
  {
    id: 2,
    nama: "Andi Wijaya", 
    jenisKelamin: "Laki-laki",
    usia: 23,
    posisi: "Point Guard",
    nilai: 13.0,
    target: "12.5 Detik",
    trend: "Turun"
  },
  {
    id: 3,
    nama: "Rizky Pratama",
    jenisKelamin: "Laki-laki", 
    usia: 21,
    posisi: "Bek Tengah",
    nilai: 12.5,
    target: "12.5 Detik",
    trend: "Stabil"
  }
])

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

const getTrendClass = (trend: string) => {
  switch (trend) {
    case 'Naik':
      return 'text-green-600 bg-green-100'
    case 'Turun':
      return 'text-red-600 bg-red-100'
    case 'Stabil':
      return 'text-yellow-600 bg-yellow-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

// Load target info based on targetId
const loadTargetInfo = () => {
  // Mock data based on targetId
  const targets = [
    { id: 1, nama: "Peningkatan stamina", target: "12,5 detik", peserta: "Atlet" },
    { id: 2, nama: "Kekuatan otot", target: "50 push-up", peserta: "Atlet" },
    { id: 3, nama: "Analisis teknik", target: "Evaluasi video pertandingan", peserta: "Pelatih" },
    { id: 4, nama: "Persiapan alat", target: "Setup peralatan latihan", peserta: "Tenaga Pendukung" }
  ]
  
  const target = targets.find(t => t.id === targetId)
  if (target) {
    targetInfo.value = target
  }
}

onMounted(() => {
  console.log('Target detail page loaded for Program ID:', programId, 'Target ID:', targetId)
  loadTargetInfo()
})
</script>
