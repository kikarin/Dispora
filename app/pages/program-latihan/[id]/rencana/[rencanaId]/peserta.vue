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
          <h1 class="text-[24px] font-bold text-gray-900">Peserta Rencana Latihan</h1>
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
        
        <!-- Peserta Atlet -->
        <div v-if="activeTab === 'atlet'" class="space-y-4">
          <div v-for="peserta in pesertaData.atlet" :key="peserta.id" 
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
                <p class="text-xs text-gray-500 mb-1">Tempat Lahir</p>
                <p class="text-sm font-medium">{{ peserta.tempatLahir }}</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between text-sm">
              <div>
                <p class="text-gray-500">Tanggal Lahir</p>
                <p class="font-medium">{{ formatTanggal(peserta.tanggalLahir) }}</p>
              </div>
              <div class="text-right">
                <p class="text-gray-500">No HP</p>
                <p class="font-medium">{{ peserta.noHp }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Peserta Pelatih -->
        <div v-else-if="activeTab === 'pelatih'" class="space-y-4">
          <div v-for="peserta in pesertaData.pelatih" :key="peserta.id" 
               class="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900 mb-1">{{ peserta.nama }}</h4>
                <div class="flex items-center gap-4 text-sm text-gray-600">
                  <span>{{ peserta.jenisKelamin }}</span>
                  <span>{{ peserta.usia }} tahun</span>
                  <span>{{ peserta.jenisPelatih }}</span>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xs text-gray-500 mb-1">Tempat Lahir</p>
                <p class="text-sm font-medium">{{ peserta.tempatLahir }}</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between text-sm">
              <div>
                <p class="text-gray-500">Tanggal Lahir</p>
                <p class="font-medium">{{ formatTanggal(peserta.tanggalLahir) }}</p>
              </div>
              <div class="text-right">
                <p class="text-gray-500">No HP</p>
                <p class="font-medium">{{ peserta.noHp }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Peserta Tenaga Pendukung -->
        <div v-else-if="activeTab === 'tenaga-pendukung'" class="space-y-4">
          <div v-for="peserta in pesertaData.tenagaPendukung" :key="peserta.id" 
               class="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900 mb-1">{{ peserta.nama }}</h4>
                <div class="flex items-center gap-4 text-sm text-gray-600">
                  <span>{{ peserta.jenisKelamin }}</span>
                  <span>{{ peserta.usia }} tahun</span>
                  <span>{{ peserta.jenisTenagaPendukung }}</span>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xs text-gray-500 mb-1">Tempat Lahir</p>
                <p class="text-sm font-medium">{{ peserta.tempatLahir }}</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between text-sm">
              <div>
                <p class="text-gray-500">Tanggal Lahir</p>
                <p class="font-medium">{{ formatTanggal(peserta.tanggalLahir) }}</p>
              </div>
              <div class="text-right">
                <p class="text-gray-500">No HP</p>
                <p class="font-medium">{{ peserta.noHp }}</p>
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

console.log('Peserta page - Program ID:', programIdParam)
console.log('Peserta page - Rencana ID:', rencanaIdParam)

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
const activeTab = ref('atlet')
const tabs = [
  { id: 'atlet', label: 'Atlet' },
  { id: 'pelatih', label: 'Pelatih' },
  { id: 'tenaga-pendukung', label: 'Tenaga Pendukung' },
]

// Loading state
const loading = ref(false)

// Helper function untuk format tanggal
const formatTanggal = (tanggalString: string) => {
  try {
    const date = new Date(tanggalString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  } catch (error) {
    return tanggalString
  }
}

// Peserta Data berdasarkan gambar yang diberikan
const pesertaData = ref({
  atlet: [
    {
      id: 1,
      nama: "Budi Santoso",
      jenisKelamin: "Laki-laki",
      usia: 25,
      posisi: "Small Forward",
      tempatLahir: "Jakarta",
      tanggalLahir: "2000-01-01",
      noHp: "081234567890"
    },
    {
      id: 2,
      nama: "Andi Wijaya",
      jenisKelamin: "Laki-laki", 
      usia: 23,
      posisi: "Point Guard",
      tempatLahir: "Surabaya",
      tanggalLahir: "2002-03-03",
      noHp: "081234567892"
    },
    {
      id: 3,
      nama: "Rizky Pratama",
      jenisKelamin: "Laki-laki",
      usia: 21,
      posisi: "Bek Tengah", 
      tempatLahir: "Yogyakarta",
      tanggalLahir: "2004-05-05",
      noHp: "081234567894"
    }
  ],
  pelatih: [
    {
      id: 1,
      nama: "Agus Salim",
      jenisKelamin: "Laki-laki",
      usia: 45,
      jenisPelatih: "Pelatih Fisik",
      tempatLahir: "Medan",
      tanggalLahir: "1980-01-01",
      noHp: "081298765432"
    },
    {
      id: 2,
      nama: "Sri Rahayu",
      jenisKelamin: "Perempuan",
      usia: 42,
      jenisPelatih: "Pelatih Fisik",
      tempatLahir: "Padang", 
      tanggalLahir: "1982-02-02",
      noHp: "081298765433"
    }
  ],
  tenagaPendukung: [
    {
      id: 1,
      nama: "Siti Nurhaliza",
      jenisKelamin: "Perempuan",
      usia: 30,
      jenisTenagaPendukung: "Tenaga Pendukung Administrasi",
      tempatLahir: "Semarang",
      tanggalLahir: "1995-04-04", 
      noHp: "084444444444"
    }
  ]
})

onMounted(() => {
  console.log('Peserta page loaded for Program ID:', programId, 'Rencana ID:', rencanaId)
})
</script>
