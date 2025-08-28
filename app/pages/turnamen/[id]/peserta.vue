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
          <h1 class="text-[24px] font-bold text-gray-700">Peserta Turnamen</h1>
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
              : 'text-gray-600 hover:text-gray-700'"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Content based on active tab -->
      <div class="space-y-4">
        <!-- Peserta Atlet -->
        <div v-if="activeTab === 'atlet'" class="space-y-3">
          <div v-for="peserta in pesertaData.atlet" :key="peserta.id" 
               class="bg-white/90 rounded-2xl p-4 shadow-sm backdrop-blur">
            <div class="flex items-start gap-4">
              <!-- Foto Peserta -->
              <div class="flex-shrink-0 mt-1">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#597BF9]/20 to-[#4c6ef5]/30 flex items-center justify-center overflow-hidden">
                  <img v-if="peserta.foto" :src="peserta.foto" :alt="peserta.nama" class="w-full h-full object-cover" />
                  <svg v-else class="w-8 h-8 text-[#597BF9]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <!-- Info Peserta -->
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-700 text-md mb-1 truncate">{{ peserta.nama }}</h4>
                <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ peserta.jenisKelamin }}
                  </span>
                  <span>{{ peserta.usia }} tahun</span>
                </div>
                
                <!-- Badge Posisi -->
                <div class="mb-2">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ peserta.posisi }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Peserta Pelatih -->
        <div v-else-if="activeTab === 'pelatih'" class="space-y-3">
          <div v-for="peserta in pesertaData.pelatih" :key="peserta.id" 
               class="bg-white/90 rounded-2xl p-4 shadow-sm backdrop-blur">
            <div class="flex items-start gap-4">
              <!-- Foto Peserta -->
              <div class="flex-shrink-0 mt-1">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center overflow-hidden">
                  <img v-if="peserta.foto" :src="peserta.foto" :alt="peserta.nama" class="w-full h-full object-cover" />
                  <svg v-else class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <!-- Info Peserta -->
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-700 text-md mb-1 truncate">{{ peserta.nama }}</h4>
                <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ peserta.jenisKelamin }}
                  </span>
                  <span>{{ peserta.usia }} tahun</span>
                </div>
                
                <!-- Badge Jenis Pelatih -->
                <div class="mb-2">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ peserta.jenisPelatih }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Peserta Tenaga Pendukung -->
        <div v-else-if="activeTab === 'tenaga-pendukung'" class="space-y-3">
          <div v-for="peserta in pesertaData.tenagaPendukung" :key="peserta.id" 
               class="bg-white/90 rounded-2xl p-4 shadow-sm backdrop-blur">
            <div class="flex items-start gap-4">
              <!-- Foto Peserta -->
              <div class="flex-shrink-0 mt-1">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-red-200 flex items-center justify-center overflow-hidden">
                  <img v-if="peserta.foto" :src="peserta.foto" :alt="peserta.nama" class="w-full h-full object-cover" />
                  <svg v-else class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <!-- Info Peserta -->
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-700 text-md mb-1 truncate">{{ peserta.nama }}</h4>
                <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ peserta.jenisKelamin }}
                  </span>
                  <span>{{ peserta.usia }} tahun</span>
                </div>
                
                <!-- Badge Jenis Tenaga Pendukung -->
                <div class="mb-2">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {{ peserta.jenisTenagaPendukung }}
                  </span>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import BottomNavigation from '~/components/BottomNavigation.vue'

const route = useRoute()

// Validate and handle route params
const turnamenIdParam = route.params.id as string

console.log('Peserta turnamen page - Turnamen ID:', turnamenIdParam)

// Simple validation
let turnamenId = 1

if (turnamenIdParam && !isNaN(Number(turnamenIdParam))) {
  turnamenId = parseInt(turnamenIdParam)
}

// Tab Management
const activeTab = ref('atlet')
const tabs = computed(() => [
  { id: 'atlet', label: `Atlet (${pesertaData.value.atlet.length})` },
  { id: 'pelatih', label: `Pelatih (${pesertaData.value.pelatih.length})` },
  { id: 'tenaga-pendukung', label: `T. Pendukung (${pesertaData.value.tenagaPendukung.length})` },
])

// Loading state
const loading = ref(false)

// Peserta Data untuk turnamen
const pesertaData = ref({
  atlet: [
    {
      id: 1,
      nama: "Budi Santoso",
      jenisKelamin: "Laki-laki",
      usia: 25,
      posisi: "Small Forward",
      foto: null,
    },
    {
      id: 2,
      nama: "Andi Wijaya",
      jenisKelamin: "Laki-laki", 
      usia: 23,
      posisi: "Point Guard",
      foto: null,
    },
    {
      id: 3,
      nama: "Rizky Pratama",
      jenisKelamin: "Laki-laki",
      usia: 21,
      posisi: "Bek Tengah",
      foto: null,
    },
    {
      id: 4,
      nama: "Siti Aminah",
      jenisKelamin: "Perempuan",
      usia: 22,
      posisi: "Shooting Guard",
      foto: null,
    },
    {
      id: 5,
      nama: "Dewi Sartika",
      jenisKelamin: "Perempuan",
      usia: 20,
      posisi: "Power Forward",
      foto: null,
    }
  ],
  pelatih: [
    {
      id: 1,
      nama: "Agus Salim",
      jenisKelamin: "Laki-laki",
      usia: 45,
      jenisPelatih: "Pelatih Fisik",
      foto: null,
    },
    {
      id: 2,
      nama: "Sri Rahayu",
      jenisKelamin: "Perempuan",
      usia: 42,
      jenisPelatih: "Pelatih Teknik",
      foto: null,
    },
    {
      id: 3,
      nama: "Bambang Sutejo",
      jenisKelamin: "Laki-laki",
      usia: 38,
      jenisPelatih: "Pelatih Taktik",
      foto: null,
    }
  ],
  tenagaPendukung: [
    {
      id: 1,
      nama: "Siti Nurhaliza",
      jenisKelamin: "Perempuan",
      usia: 30,
      jenisTenagaPendukung: "Administrasi",
      foto: null,
    },
    {
      id: 2,
      nama: "Ahmad Hidayat",
      jenisKelamin: "Laki-laki",
      usia: 35,
      jenisTenagaPendukung: "Fisioterapis",
      foto: null,
    },
    {
      id: 3,
      nama: "Maya Indah",
      jenisKelamin: "Perempuan",
      usia: 28,
      jenisTenagaPendukung: "Nutrisionis",
      foto: null,
    }
  ]
})

onMounted(() => {
  console.log('Peserta turnamen page loaded for Turnamen ID:', turnamenId)
})
</script>
