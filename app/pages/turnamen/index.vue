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
              placeholder="Cari turnamen..."
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
                <h3 class="text-sm font-semibold text-gray-700">Filter Periode</h3>
                <button @click="toggleCalendar" class="text-gray-400 hover:text-gray-600">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <!-- Date Range Inputs -->
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Dari Tanggal</label>
                  <input 
                    v-model="startDate" 
                    type="date" 
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Sampai Tanggal</label>
                  <input 
                    v-model="endDate" 
                    type="date" 
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
                  />
                </div>
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
            :class="selectedCabor.includes(cabor) 
              ? 'bg-[#597BF9] text-white shadow-lg' 
              : 'bg-white/80 text-gray-600 hover:bg-white'"
          >
            {{ cabor }}
          </button>
        </div>
      </div>

      <!-- Turnamen List -->
      <div class="space-y-6">
        <div
          v-for="turnamen in filteredTurnamen"
          :key="turnamen.id"
          class="group rounded-2xl bg-white/90 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Turnamen Header -->
          <div class="mb-6">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-800 group-hover:text-[#597BF9] transition-colors">
                  {{ turnamen.nama }}
                </h3>
                <span class="inline-flex items-center mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-[#597BF9]/10 text-[#597BF9]">
                  {{ turnamen.cabor }} - {{ turnamen.kategori }}
                </span>
              </div>
            </div>

            <!-- Turnamen Info -->
            <div class="grid gap-3 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatPeriode(turnamen.periode) }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{{ turnamen.tingkat }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ turnamen.lokasi }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Juara: {{ turnamen.juara }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Hasil: {{ turnamen.hasil }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Peserta: {{ turnamen.jumlahPeserta }} orang</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button 
              @click="viewPeserta(turnamen.id)"
              class="flex-1 bg-[#597BF9] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
            >
              Lihat Peserta
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
const startDate = ref('')
const endDate = ref('')

// Helper function untuk format periode tanggal
const formatPeriode = (periodeString: string) => {
  try {
    // Parse format "2025-08-01 s/d 2025-08-31"
    const parts = periodeString.split(' s/d ')
    if (parts.length !== 2) {
      return periodeString // Fallback jika format tidak sesuai
    }
    
    const [startDateStr = '', endDateStr = ''] = parts
    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)
    
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ]
    
    const startDay = startDate.getDate()
    const startMonth = startDate.getMonth()
    const startYear = startDate.getFullYear()
    
    const endDay = endDate.getDate()
    const endMonth = endDate.getMonth()
    const endYear = endDate.getFullYear()
    
    // Jika tahun berbeda
    if (startYear !== endYear) {
      return `${startDay} ${monthNames[startMonth]} ${startYear} - ${endDay} ${monthNames[endMonth]} ${endYear}`
    }
    // Jika bulan berbeda
    else if (startMonth !== endMonth) {
      return `${startDay} ${monthNames[startMonth]} - ${endDay} ${monthNames[endMonth]} ${startYear}`
    }
    // Jika bulan sama
    else {
      return `${startDay}-${endDay} ${monthNames[startMonth]} ${startYear}`
    }
  } catch (error) {
    // Fallback jika parsing gagal
    return periodeString
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
  startDate.value = ''
  endDate.value = ''
  showCalendar.value = false
}

// Navigation Functions
const viewPeserta = (id: number) => {
  console.log('View peserta turnamen:', id)
  router.push(`/turnamen/${id}/peserta`)
}

// Filtered Turnamen
const filteredTurnamen = computed(() => {
  let filtered = dataTurnamen.value

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(turnamen => 
      turnamen.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      turnamen.cabor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      turnamen.lokasi.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      turnamen.tingkat.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by selected cabor
  if (selectedCabor.value.length > 0) {
    filtered = filtered.filter(turnamen => 
      selectedCabor.value.includes(turnamen.cabor)
    )
  }

  // Filter by date range
  if (startDate.value && endDate.value) {
    filtered = filtered.filter(turnamen => {
      const parts = turnamen.periode.split(' s/d ')
      if (parts.length !== 2) return true
      
      const turnamenStart = parts[0] || ''
      const turnamenEnd = parts[1] || ''
      
      return turnamenStart >= startDate.value && turnamenEnd <= endDate.value
    })
  }

  return filtered
})

// Dummy Data Turnamen
const dataTurnamen = ref([
  {
    id: 1,
    nama: "Turnamen Sepak Bola U-17 Nasional",
    cabor: "Sepak Bola",
    kategori: "Putra",
    periode: "2025-08-01 s/d 2025-08-31",
    tingkat: "Nasional",
    lokasi: "Jakarta",
    juara: "Juara 1",
    hasil: "Tim A",
    jumlahPeserta: 30
  },
  {
    id: 2,
    nama: "Kejuaraan Basket 3x3 Indonesia Open",
    cabor: "Basket",
    kategori: "Putra/Putri",
    periode: "2025-08-15 s/d 2025-09-15",
    tingkat: "Internasional",
    lokasi: "Surabaya",
    juara: "Juara 2",
    hasil: "Tim B",
    jumlahPeserta: 18
  },
  {
    id: 3,
    nama: "Indonesia Open Badminton Championship",
    cabor: "Badminton",
    kategori: "Putra/Putri",
    periode: "2025-08-20 s/d 2025-09-20",
    tingkat: "Nasional",
    lokasi: "Bandung",
    juara: "Juara 1",
    hasil: "Tim C",
    jumlahPeserta: 12
  },
  {
    id: 4,
    nama: "Turnamen Tenis Junior Asia Pacific",
    cabor: "Tenis",
    kategori: "Putra/Putri",
    periode: "2025-08-25 s/d 2025-09-25",
    tingkat: "Regional",
    lokasi: "Semarang",
    juara: "Juara 3",
    hasil: "Tim D",
    jumlahPeserta: 12
  },
  {
    id: 5,
    nama: "Kejuaraan Renang Nasional 2024",
    cabor: "Renang",
    kategori: "Putra/Putri",
    periode: "2025-09-01 s/d 2025-09-30",
    tingkat: "Nasional",
    lokasi: "Yogyakarta",
    juara: "Juara 1",
    hasil: "Tim E",
    jumlahPeserta: 20
  },
  {
    id: 6,
    nama: "Turnamen Voli Antar Universitas",
    cabor: "Voli",
    kategori: "Putra/Putri",
    periode: "2025-09-10 s/d 2025-10-10",
    tingkat: "Provinsi",
    lokasi: "Malang",
    juara: "Juara 2",
    hasil: "Tim F",
    jumlahPeserta: 15
  },
  {
    id: 7,
    nama: "Kejuaraan Atletik Pelajar",
    cabor: "Atletik",
    kategori: "Putra/Putri",
    periode: "2025-09-15 s/d 2025-10-15",
    tingkat: "Kota",
    lokasi: "Solo",
    juara: "Juara 1",
    hasil: "Tim G",
    jumlahPeserta: 30
  }
])
</script>
