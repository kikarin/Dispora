<template>
  <div class="min-h-screen">
    <div class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-8" style="background: linear-gradient(180deg,rgba(216, 224, 255, 1) 0%, rgba(248, 250, 251, 1) 50%, rgba(226, 224, 255, 1) 100%);">
      

      <!-- Search & Filter Section -->
      <div class="mb-6 space-y-4">
        <!-- Search Bar with Calendar -->
        <div class="relative">
          <div class="flex items-center gap-2 rounded-2xl bg-white/80 p-3 shadow-sm backdrop-blur">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari pemeriksaan..."
              class="flex-1 text-[15px] bg-transparent outline-none placeholder:text-gray-400"
            />
            <!-- Calendar Button -->
            <button 
              @click="toggleCalendar"
              class="p-1 mr-1 rounded-xl bg-[#597BF9]/10 text-[#597BF9] hover:bg-[#597BF9]/20 transition-colors"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          
          <!-- Calendar Dropdown -->
          <div v-if="showCalendar" class="absolute top-full left-0 right-0 mt-2 z-50">
            <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-700">Filter Tanggal</h3>
                <button @click="toggleCalendar" class="text-gray-400 hover:text-gray-600">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <!-- Date Input -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Tanggal Pemeriksaan</label>
                <input 
                  v-model="selectedDate" 
                  type="date" 
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
                />
              </div>
              
              <!-- Action Buttons -->
              <div class="flex gap-2 mt-4">
                <button 
                  @click="applyDateFilter"
                  class="flex-1 bg-[#597BF9] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
                >
                  Terapkan
                </button>
                <button 
                  @click="clearDateFilter"
                  class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter Cabor -->
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="cabor in caborList"
            :key="cabor"
            @click="toggleCaborFilter(cabor)"
            class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="selectedCabor.includes(cabor) ? 'bg-[#597BF9] text-white shadow-lg' : 'bg-white/80 text-gray-600 hover:bg-white'"
          >
            {{ cabor }}
          </button>
        </div>
      </div>

      <!-- Pemeriksaan List -->
      <div class="space-y-6">
        <div
          v-for="pemeriksaan in filteredPemeriksaan"
          :key="pemeriksaan.id"
          class="group rounded-2xl bg-white/90 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Pemeriksaan Header -->
          <div class="mb-6">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-800 group-hover:text-[#597BF9] transition-colors">
                  {{ pemeriksaan.nama }}
                </h3>
                <span class="inline-flex items-center mt-1 py-0.5 text-xs font-medium rounded-full text-[#597BF9]">
                  {{ pemeriksaan.cabor }} - {{ pemeriksaan.kategori }}
                </span>
              </div>
              
              <!-- Status Badge -->
              <div class="ml-3">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      :class="getStatusBadgeClass(pemeriksaan.status)">
                  {{ pemeriksaan.status }}
                </span>
              </div>
            </div>

            <!-- Tenaga Pendukung -->
            <div class="mb-3">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Pemeriksa:</span>
                <span>{{ pemeriksaan.tenagaPendukung }}</span>
              </div>
            </div>

            <!-- Tanggal Pemeriksaan -->
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatTanggal(pemeriksaan.tanggal) }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button 
              @click="viewPeserta(pemeriksaan.id)"
              class="flex-1 bg-[#597BF9] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
            >
              Peserta
            </button>
            <button 
              @click="viewDetail(pemeriksaan.id)"
              class="flex-1 bg-green-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Pemeriksaan
            </button>
          </div>
        </div>
      </div>

      <!-- Spacer for bottom navigation -->
      <div class="h-20"></div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNavigation />
    
    <!-- Click outside handler for calendar -->
    <div 
      v-if="showCalendar" 
      @click="showCalendar = false"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BottomNavigation from '~/components/BottomNavigation.vue'

const router = useRouter()

// Search & Filter
const searchQuery = ref('')
const selectedCabor = ref<string[]>([])

// Calendar Filter
const showCalendar = ref(false)
const selectedDate = ref('')

// Helper function untuk format tanggal
const formatTanggal = (tanggalString: string) => {
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

// Cabor List
const caborList = ['Sepak Bola', 'Basket', 'Badminton', 'Tenis', 'Renang', 'Atletik', 'Voli']

// Toggle Cabor Filter
const toggleCaborFilter = (cabor: string) => {
  const index = selectedCabor.value.indexOf(cabor)
  if (index > -1) {
    selectedCabor.value.splice(index, 1)
  } else {
    selectedCabor.value.push(cabor)
  }
}

// Calendar Functions
const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value
}

const applyDateFilter = () => {
  showCalendar.value = false
  // Filter logic will be applied in computed property
}

const clearDateFilter = () => {
  selectedDate.value = ''
  showCalendar.value = false
}

// Navigation Functions
const viewPeserta = (id: number) => {
  console.log('View peserta pemeriksaan:', id)
  router.push(`/pemeriksaan/${id}/peserta`)
}

const viewDetail = (id: number) => {
  console.log('View detail pemeriksaan:', id)
  router.push(`/pemeriksaan/${id}`)
}

// Status Badge Classes
const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Sudah':
      return 'bg-green-100 text-green-800 border border-green-200'
    case 'Sebagian':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    case 'Belum':
      return 'bg-red-100 text-red-800 border border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

// Filtered Pemeriksaan
const filteredPemeriksaan = computed(() => {
  let filtered = dataPemeriksaan.value

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(pemeriksaan => 
      pemeriksaan.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      pemeriksaan.cabor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      pemeriksaan.tenagaPendukung.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by selected cabor
  if (selectedCabor.value.length > 0) {
    filtered = filtered.filter(pemeriksaan => 
      selectedCabor.value.includes(pemeriksaan.cabor)
    )
  }

  // Filter by selected date
  if (selectedDate.value) {
    filtered = filtered.filter(pemeriksaan => 
      pemeriksaan.tanggal === selectedDate.value
    )
  }

  return filtered
})

// Dummy Data Pemeriksaan
const dataPemeriksaan = ref([
  {
    id: 1,
    nama: "Pemeriksaan Fisik Komprehensif Atlet",
    cabor: "Sepak Bola",
    kategori: "Putra",
    tenagaPendukung: "Dr. Siti Aminah",
    tanggal: "2025-08-15",
    status: "Sudah"
  },
  {
    id: 2,
    nama: "Tes Kebugaran Jasmani & VO2 Max",
    cabor: "Basket",
    kategori: "Putra/Putri",
    tenagaPendukung: "Dr. Andi Wijaya",
    tanggal: "2025-08-20",
    status: "Sebagian"
  },
  {
    id: 3,
    nama: "Pemeriksaan Jantung & Kardiovaskular",
    cabor: "Renang",
    kategori: "Putra",
    tenagaPendukung: "Dr. Rizky Pratama",
    tanggal: "2025-08-25",
    status: "Sudah"
  },
  {
    id: 4,
    nama: "Analisis Biomekanik & Postur",
    cabor: "Badminton",
    kategori: "Putra",
    tenagaPendukung: "Dr. Budi Santoso",
    tanggal: "2025-08-30",
    status: "Belum"
  },
  {
    id: 5,
    nama: "Screening Cedera & Rehabilitasi",
    cabor: "Tenis",
    kategori: "Putra/Putri",
    tenagaPendukung: "Dr. Sri Rahayu",
    tanggal: "2025-09-05",
    status: "Sebagian"
  },
  {
    id: 6,
    nama: "Pemeriksaan Mata & Refleks",
    cabor: "Atletik",
    kategori: "Putra",
    tenagaPendukung: "Dr. Agus Salim",
    tanggal: "2025-09-10",
    status: "Sudah"
  },
  {
    id: 7,
    nama: "Tes Fleksibilitas & Mobilitas",
    cabor: "Voli",
    kategori: "Putri",
    tenagaPendukung: "Dr. Siti Nurhaliza",
    tanggal: "2025-09-15",
    status: "Belum"
  }
])
</script>


