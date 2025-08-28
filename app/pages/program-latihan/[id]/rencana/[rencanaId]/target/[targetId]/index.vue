<template>
  <div class="min-h-screen">
    <div class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-4"
      style="background: linear-gradient(180deg,rgba(216, 224, 255, 1) 0%, rgba(248, 250, 251, 1) 50%, rgba(226, 224, 255, 1) 100%);">

      <!-- Header -->
      <div class="flex items-center gap-3 mb-4">
        <button @click="$router.back()" class="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-xl font-bold text-gray-700">Detail Target</h1>
      </div>

      <!-- Target Info Card -->
      <div class="rounded-2xl bg-white/90 p-6 backdrop-blur mb-6">
        <div class="flex items-start justify-between mb-2">
          <div class="flex-1">
            <h2 class="text-xl font-bold text-gray-700">{{ targetInfo.nama }}</h2>
          </div>
        </div>
        <div class="mb-1">
          <p class="text-sm text-gray-600">Peruntukan: {{ targetInfo.peserta }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Target: {{ targetInfo.target }}</p>
        </div>
      </div>

      <!-- Peserta yang Sudah Melakukan Target -->
      <div>
        <div class="space-y-4">
          <div v-for="peserta in pesertaTargetData" :key="peserta.id" class="relative bg-white rounded-xl p-5 ">

            <!-- Trend Badge (pojok kanan atas) -->
            <div class="absolute top-2 right-3">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                :class="getTrendClass(peserta.trend)">
                {{ peserta.trend }}
              </span>
            </div>

            <div class="flex items-start gap-4">
              <!-- Foto Peserta -->
              <div class="flex-shrink-0 mt-3">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#597BF9]/20 to-[#4c6ef5]/30 
                    flex items-center justify-center overflow-hidden">
                  <svg class="w-8 h-8 text-[#597BF9]" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              <!-- Info Peserta -->
              <div class="flex-1 min-w-0 mt-3">
                <h4 class="font-semibold text-gray-700 text-md leading-snug truncate">
                  {{ peserta.nama }}
                </h4>

                <div class="flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-1">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ peserta.jenisKelamin }}
                  </span>
                  <span>{{ peserta.usia }} tahun</span>
                </div>

                <!-- Badge Posisi -->
                <div class="mt-2 mb-3">
                  <span
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ peserta.posisi }}
                  </span>
                </div>

                <!-- Target dan Nilai -->
                <div class="mt-3 flex items-center justify-between">
                  <p class="text-sm text-gray-500">
                    Target: <span class="font-medium text-gray-700">{{ peserta.target }}</span>
                  </p>
                  <p class="text-sm text-gray-500">
                    Nilai: <span class="font-medium text-gray-700">{{ peserta.nilai }}</span>
                  </p>
                </div>
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
const rencanaIdParam = route.params.rencanaId as string
const targetIdParam = route.params.targetId as string

console.log('Target detail rencana page - Program ID:', programIdParam)
console.log('Target detail rencana page - Rencana ID:', rencanaIdParam)
console.log('Target detail rencana page - Target ID:', targetIdParam)

// Simple validation
let programId = 1
let rencanaId = 1
let targetId = 1

if (programIdParam && !isNaN(Number(programIdParam))) {
  programId = parseInt(programIdParam)
}

if (rencanaIdParam && !isNaN(Number(rencanaIdParam))) {
  rencanaId = parseInt(rencanaIdParam)
}

if (targetIdParam && !isNaN(Number(targetIdParam))) {
  targetId = parseInt(targetIdParam)
}

// Loading state
const loading = ref(false)

// Rencana Info
const rencanaInfo = ref({
  id: rencanaId,
  materi: "Latihan strategi dan simulasi pertandingan",
  tanggal: "2025-08-12"
})

// Target Info
const targetInfo = ref({
  id: targetId,
  nama: "Peningkatan stamina",
  target: "12,5 Detik",
  peserta: "Atlet"
})

// Mock data untuk peserta yang sudah melakukan target (akan diupdate berdasarkan targetId)
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
  },
  {
    id: 4,
    nama: "Siti Aminah",
    jenisKelamin: "Perempuan",
    usia: 22,
    posisi: "Shooting Guard",
    nilai: 11.8,
    target: "12.5 Detik",
    trend: "Naik"
  }
])

// Update peserta data berdasarkan target yang dipilih
const updatePesertaData = (targetId: number) => {
  const targetData = {
    1: { // Peningkatan stamina
      target: "12.5 Detik",
      peserta: [
        { id: 1, nama: "Budi Santoso", jenisKelamin: "Laki-laki", usia: 25, posisi: "Small Forward", nilai: 11.0, target: "12.5 Detik", trend: "Naik" },
        { id: 2, nama: "Andi Wijaya", jenisKelamin: "Laki-laki", usia: 23, posisi: "Point Guard", nilai: 13.0, target: "12.5 Detik", trend: "Turun" },
        { id: 3, nama: "Rizky Pratama", jenisKelamin: "Laki-laki", usia: 21, posisi: "Bek Tengah", nilai: 12.5, target: "12.5 Detik", trend: "Stabil" },
        { id: 4, nama: "Siti Aminah", jenisKelamin: "Perempuan", usia: 22, posisi: "Shooting Guard", nilai: 11.8, target: "12.5 Detik", trend: "Naik" }
      ]
    },
    2: { // Kekuatan otot
      target: "50 Push-up",
      peserta: [
        { id: 1, nama: "Budi Santoso", jenisKelamin: "Laki-laki", usia: 25, posisi: "Small Forward", nilai: 45, target: "50 Push-up", trend: "Naik" },
        { id: 2, nama: "Andi Wijaya", jenisKelamin: "Laki-laki", usia: 23, posisi: "Point Guard", nilai: 52, target: "50 Push-up", trend: "Naik" },
        { id: 3, nama: "Rizky Pratama", jenisKelamin: "Laki-laki", usia: 21, posisi: "Bek Tengah", nilai: 38, target: "50 Push-up", trend: "Turun" }
      ]
    },
    3: { // Analisis teknik
      target: "Evaluasi Video",
      peserta: [
        { id: 1, nama: "Agus Salim", jenisKelamin: "Laki-laki", usia: 45, posisi: "Pelatih Fisik", nilai: 85, target: "Evaluasi Video", trend: "Stabil" },
        { id: 2, nama: "Sri Rahayu", jenisKelamin: "Perempuan", usia: 42, posisi: "Pelatih Fisik", nilai: 92, target: "Evaluasi Video", trend: "Naik" }
      ]
    },
    4: { // Persiapan alat
      target: "Setup Peralatan",
      peserta: [
        { id: 1, nama: "Siti Nurhaliza", jenisKelamin: "Perempuan", usia: 30, posisi: "Administrasi", nilai: 95, target: "Setup Peralatan", trend: "Naik" }
      ]
    },
    5: { // Koordinasi tim
      target: "Latihan Passing",
      peserta: [
        { id: 1, nama: "Budi Santoso", jenisKelamin: "Laki-laki", usia: 25, posisi: "Small Forward", nilai: 78, target: "Latihan Passing", trend: "Naik" },
        { id: 2, nama: "Andi Wijaya", jenisKelamin: "Laki-laki", usia: 23, posisi: "Point Guard", nilai: 82, target: "Latihan Passing", trend: "Stabil" },
        { id: 3, nama: "Rizky Pratama", jenisKelamin: "Laki-laki", usia: 21, posisi: "Bek Tengah", nilai: 75, target: "Latihan Passing", trend: "Naik" },
        { id: 4, nama: "Siti Aminah", jenisKelamin: "Perempuan", usia: 22, posisi: "Shooting Guard", nilai: 80, target: "Latihan Passing", trend: "Stabil" }
      ]
    },
    6: { // Strategi pertahanan
      target: "Formasi 4-4-2",
      peserta: [
        { id: 1, nama: "Agus Salim", jenisKelamin: "Laki-laki", usia: 45, posisi: "Pelatih Fisik", nilai: 88, target: "Formasi 4-4-2", trend: "Naik" },
        { id: 2, nama: "Sri Rahayu", jenisKelamin: "Perempuan", usia: 42, posisi: "Pelatih Fisik", nilai: 85, target: "Formasi 4-4-2", trend: "Stabil" }
      ]
    }
  }

  const selectedTarget = targetData[targetId as keyof typeof targetData]
  if (selectedTarget) {
    pesertaTargetData.value = selectedTarget.peserta
    // Update target info juga
    targetInfo.value.target = selectedTarget.target
  }
}

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
    { id: 4, nama: "Persiapan alat", target: "Setup peralatan latihan", peserta: "Tenaga Pendukung" },
    { id: 5, nama: "Koordinasi tim", target: "Latihan passing", peserta: "Atlet" },
    { id: 6, nama: "Strategi pertahanan", target: "Formasi 4-4-2", peserta: "Pelatih" }
  ]

  const target = targets.find(t => t.id === targetId)
  if (target) {
    targetInfo.value = target
  }

  // Update peserta data berdasarkan target yang dipilih
  updatePesertaData(targetId)
}

onMounted(() => {
  console.log('Target detail rencana page loaded for Program ID:', programId, 'Rencana ID:', rencanaId, 'Target ID:', targetId)
  loadTargetInfo()
})
</script>
