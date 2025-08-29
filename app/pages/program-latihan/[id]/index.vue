<template>
  <div class="min-h-screen">
    <div class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-4" style="background: linear-gradient(180deg,rgba(216, 224, 255, 1) 0%, rgba(248, 250, 251, 1) 50%, rgba(226, 224, 255, 1) 100%);">
      
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-4">
          <button @click="$router.back()" class="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-xl font-bold text-gray-700">Rencana Latihan</h1>
        </div>
        
        <!-- Search and Calendar -->
        <div class="relative">
          <div class="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2  backdrop-blur">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari rencana latihan..."
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
                <label class="block text-xs font-medium text-gray-700 mb-1">Tanggal</label>
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
        

      </div>

      <!-- Rencana Latihan -->
      <div >

        
        <div class="space-y-4">
          <div v-for="rencana in filteredRencanaLatihan" :key="rencana.id" 
               class="p-4 bg-gray-50 rounded-xl ">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-sm font-medium text-gray-700">{{ formatTanggalBulan(rencana.tanggal) }}</span>
                </div>
                <h4 class="font-semibold text-gray-700 mb-2">{{ rencana.materi }}</h4>
              </div>
            </div>
            
            <div class="space-y-2 text-sm mb-4">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-gray-600">{{ rencana.lokasi }}</span>
              </div>
              
              <div class="flex items-start gap-2">
                <svg class="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="text-gray-600">{{ rencana.catatan }}</span>
              </div>
              
              <div class="flex items-start gap-2">
                <svg class="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span class="text-gray-600">{{ rencana.targetLatihan }}</span>
              </div>
              
              <!-- Info Jumlah Peserta -->
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="text-gray-600">Peserta: {{ getTotalPeserta(rencana) }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3">
              <button 
                @click="viewPesertaRencana(rencana.id)"
                class="flex-1 bg-[#597BF9] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
              >
                Lihat Peserta
              </button>
              <button 
                @click="viewTargetRencana(rencana.id)"
                class="flex-1 bg-green-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Lihat Target
              </button>
            </div>
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BottomNavigation from '~/components/BottomNavigation.vue'

const route = useRoute()
const router = useRouter()

// Search and Calendar
const searchQuery = ref('')
const showCalendar = ref(false)
const selectedDate = ref('')

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

// Validate and handle route params
const programIdParam = route.params.id as string
console.log('Detail page - Raw route param:', programIdParam)

// Simple validation without throwing error
let programId = 1
if (programIdParam && !isNaN(Number(programIdParam))) {
  programId = parseInt(programIdParam)
} else {
  console.warn('Invalid program ID, using default:', programIdParam)
}

// Program Data
const program = ref({
  id: programId,
  nama: `Latihan Fisik Dasar - ${programId}`,
  cabor: "Sepak Bola",
  kategori: "Putra",
  periode: "2025-08-01 s/d 2025-08-24",
  keterangan: "Fokus pada penguatan fisik dan stamina.",
  jumlahPeserta: 15,
  isSaved: false
})

// Rencana Latihan Data
const rencanaLatihan = ref([
  {
    id: 1,
    tanggal: "2025-08-12",
    materi: "Latihan strategi dan simulasi pertandingan",
    lokasi: "Lapangan Indoor",
    catatan: "Simulasi pertandingan internal",
    targetLatihan: "Kekuatan Angkat Berat, Kemampuan Analisis Teknik, Kerjasama Tim",
    atlet: ["Budi Santoso", "Siti Aminah"],
    pelatih: ["Agus Salim", "Sri Rahayu"],
    tenagaPendukung: ["Slamet Raharjo"]
  },
  {
    id: 2,
    tanggal: "2025-08-15",
    materi: "Latihan teknik dasar dan kondisi fisik",
    lokasi: "Lapangan Outdoor",
    catatan: "Fokus pada penguatan stamina",
    targetLatihan: "Peningkatan Stamina, Koordinasi Gerakan",
    atlet: ["Andi Wijaya", "Rizky Pratama"],
    pelatih: ["Agus Salim"],
    tenagaPendukung: ["Slamet Raharjo"]
  },
  {
    id: 3,
    tanggal: "2025-08-18",
    materi: "Latihan taktik dan formasi",
    lokasi: "Lapangan Indoor",
    catatan: "Latihan formasi 4-4-2 dan 3-5-2",
    targetLatihan: "Pemahaman Taktik, Koordinasi Tim, Komunikasi",
    atlet: ["Budi Santoso", "Andi Wijaya", "Rizky Pratama"],
    pelatih: ["Agus Salim", "Sri Rahayu"],
    tenagaPendukung: ["Slamet Raharjo"]
  }
])

// Calendar Functions
const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value
}

const applyDateFilter = () => {
  showCalendar.value = false
}

const clearDateFilter = () => {
  selectedDate.value = ''
  showCalendar.value = false
}

// Helper function untuk menghitung total peserta per rencana
const getTotalPeserta = (rencana: any) => {
  return rencana.atlet.length + rencana.pelatih.length + rencana.tenagaPendukung.length
}

// Computed Properties for filtering and counting
const filteredRencanaLatihan = computed(() => {
  let filtered = rencanaLatihan.value

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(rencana => 
      rencana.materi.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      rencana.lokasi.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      rencana.catatan.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by selected date
  if (selectedDate.value) {
    filtered = filtered.filter(rencana => 
      rencana.tanggal === selectedDate.value
    )
  }

  return filtered
})

// Count total participants
const totalAtlet = computed(() => {
  const uniqueAtlet = new Set()
  rencanaLatihan.value.forEach(rencana => {
    rencana.atlet.forEach(atlet => uniqueAtlet.add(atlet))
  })
  return uniqueAtlet.size
})

const totalPelatih = computed(() => {
  const uniquePelatih = new Set()
  rencanaLatihan.value.forEach(rencana => {
    rencana.pelatih.forEach(pelatih => uniquePelatih.add(pelatih))
  })
  return uniquePelatih.size
})

const totalTenagaPendukung = computed(() => {
  const uniqueTenagaPendukung = new Set()
  rencanaLatihan.value.forEach(rencana => {
    rencana.tenagaPendukung.forEach(tenaga => uniqueTenagaPendukung.add(tenaga))
  })
  return uniqueTenagaPendukung.size
})

// Navigation Functions
const viewTarget = () => {
  console.log('Navigating to target for program:', programId)
  router.push(`/program-latihan/${programId}/targets`)
}

const viewRencana = () => {
  console.log('View detailed rencana for program:', programId)
}

const viewPesertaRencana = (rencanaId: number) => {
  console.log('Navigating to peserta rencana for:', rencanaId)
  router.push(`/program-latihan/${programId}/rencana/${rencanaId}/peserta`)
}

const viewTargetRencana = (rencanaId: number) => {
  console.log('Navigating to target for rencana:', rencanaId)
  router.push(`/program-latihan/${programId}/rencana/${rencanaId}/targets`)
}

onMounted(() => {
  console.log('Detail page loaded for Program ID:', programId)
  console.log('Route params:', route.params)
})
</script>
