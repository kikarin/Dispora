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
      <div class="space-y-4">
        <!-- Peserta Atlet -->
        <div v-if="activeTab === 'atlet'" class="space-y-3">
          <div v-for="peserta in pesertaData.atlet" :key="peserta.id" 
               class="bg-white/90 rounded-2xl p-4 shadow-sm backdrop-blur">
            <div class="flex items-start gap-4">
              <!-- Foto Peserta -->
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#597BF9]/20 to-[#4c6ef5]/30 flex items-center justify-center overflow-hidden">
                  <img v-if="peserta.foto" :src="peserta.foto" :alt="peserta.nama" class="w-full h-full object-cover" />
                  <svg v-else class="w-8 h-8 text-[#597BF9]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <!-- Info Peserta -->
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-900 text-lg mb-1 truncate">{{ peserta.nama }}</h4>
                <div class="flex items-center gap-3 text-sm text-gray-600 mb-2">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ peserta.jenisKelamin }}
                  </span>
                  <span>{{ peserta.usia }} tahun</span>
                  <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">{{ peserta.posisi }}</span>
                </div>
                
                <!-- Status Kehadiran -->
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Kehadiran:</span>
                  <span v-if="peserta.kehadiran" 
                        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                        :class="getKehadiranBadgeClass(peserta.kehadiran)">
                    {{ peserta.kehadiran }}
                  </span>
                  <span v-else class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    -
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
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center overflow-hidden">
                  <img v-if="peserta.foto" :src="peserta.foto" :alt="peserta.nama" class="w-full h-full object-cover" />
                  <svg v-else class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <!-- Info Peserta -->
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-900 text-lg mb-1 truncate">{{ peserta.nama }}</h4>
                <div class="flex items-center gap-3 text-sm text-gray-600 mb-2">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ peserta.jenisKelamin }}
                  </span>
                  <span>{{ peserta.usia }} tahun</span>
                  <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">{{ peserta.jenisPelatih }}</span>
                </div>
                
                <!-- Status Kehadiran -->
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Kehadiran:</span>
                  <span v-if="peserta.kehadiran" 
                        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                        :class="getKehadiranBadgeClass(peserta.kehadiran)">
                    {{ peserta.kehadiran }}
                  </span>
                  <span v-else class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                   -
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
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-red-200 flex items-center justify-center overflow-hidden">
                  <img v-if="peserta.foto" :src="peserta.foto" :alt="peserta.nama" class="w-full h-full object-cover" />
                  <svg v-else class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <!-- Info Peserta -->
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-900 text-lg mb-1 truncate">{{ peserta.nama }}</h4>
                <div class="flex items-center gap-3 text-sm text-gray-600 mb-2">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ peserta.jenisKelamin }}
                  </span>
                  <span>{{ peserta.usia }} tahun</span>
                  <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">{{ peserta.jenisTenagaPendukung }}</span>
                </div>
                
                <!-- Status Kehadiran -->
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Kehadiran:</span>
                  <span v-if="peserta.kehadiran" 
                        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                        :class="getKehadiranBadgeClass(peserta.kehadiran)">
                    {{ peserta.kehadiran }}
                  </span>
                  <span v-else class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    -
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

// Helper function untuk mendapatkan class badge berdasarkan kehadiran
const getKehadiranBadgeClass = (kehadiran: string) => {
  switch (kehadiran) {
    case 'Hadir':
      return 'bg-green-100 text-green-800'
    case 'Tidak Hadir':
      return 'bg-red-100 text-red-800'
    case 'Izin':
      return 'bg-yellow-100 text-yellow-800'
    case 'Sakit':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-600'
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
          foto: null,
          kehadiran: "Hadir",
        },
        {
          id: 2,
          nama: "Andi Wijaya",
          jenisKelamin: "Laki-laki", 
          usia: 23,
          posisi: "Point Guard",
          foto: null,
          kehadiran: "Sakit",
        },
        {
          id: 3,
          nama: "Rizky Pratama",
          jenisKelamin: "Laki-laki",
          usia: 21,
          posisi: "Bek Tengah", 
          foto: null,
          kehadiran: "Izin",
        },
        {
          id: 4,
          nama: "Siti Aminah",
          jenisKelamin: "Perempuan",
          usia: 22,
          posisi: "Shooting Guard",
          foto: null,
          kehadiran: null, // Belum di-set
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
          kehadiran: "Hadir",
        },
        {
          id: 2,
          nama: "Sri Rahayu",
          jenisKelamin: "Perempuan",
          usia: 42,
          jenisPelatih: "Pelatih Fisik",
          foto: null,
          kehadiran: null, // Belum di-set
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
          kehadiran: "Sakit",
        }
      ]
})

onMounted(() => {
  console.log('Peserta page loaded for Program ID:', programId, 'Rencana ID:', rencanaId)
})
</script>

