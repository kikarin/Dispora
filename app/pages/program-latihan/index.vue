<template>
  <div class="min-h-screen">
    <div class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-8" style="background: linear-gradient(180deg,rgba(216, 224, 255, 1) 0%, rgba(248, 250, 251, 1) 50%, rgba(226, 224, 255, 1) 100%);">
      

      <!-- Search & Filter Section -->
      <div class="mb-6 space-y-4">
        <!-- Search Bar -->
        <div class="relative">
          <div class="flex items-center gap-2 rounded-2xl bg-white/80 p-3 shadow-sm backdrop-blur">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari program latihan..."
              class="w-full text-[15px] bg-transparent outline-none placeholder:text-gray-400"
            />
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

<!-- Program List -->
<div class="space-y-6">
  <div
    v-for="program in filteredPrograms"
    :key="program.id"
    class="group rounded-2xl bg-white/90 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <!-- Program Header -->
    <div class="mb-6">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-3">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-[#597BF9] transition-colors">
              {{ program.nama }}
            </h3>
            <span class="inline-flex items-center mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-[#597BF9]/10 text-[#597BF9]">
              {{ program.cabor }}
            </span>
          </div>
        </div>

        <!-- Save Button -->
        <button 
          @click="toggleSave(program.id)"
          class="rounded-full p-2 transition-all duration-200 hover:scale-110"
          :class="program.isSaved ? 'bg-[#597BF9] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'"
        >
          <svg v-if="program.isSaved" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
          </svg>
          <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
          </svg>
        </button>
      </div>

      <!-- Program Info -->
      <div class="grid gap-3 text-sm text-gray-600">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5l7 7-7 7-7-7z" />
          </svg>
          <span>{{ program.kategori }}</span>
        </div>
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
          <span>{{ formatPeriode(program.periode) }}</span>
        </div>
      </div>

    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3">
      <button 
        @click="viewRencana(program.id)"
        class="flex-1 bg-[#597BF9] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
      >
        Rencana Latihan
      </button>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BottomNavigation from '~/components/BottomNavigation.vue'

const router = useRouter()

// Search & Filter
const searchQuery = ref('')
const selectedCabor = ref<string[]>([])

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

// Toggle Save
const toggleSave = (id: number) => {
  const program = programLatihan.value.find(p => p.id === id)
  if (program) {
    program.isSaved = !program.isSaved
  }
}

// Navigation Functions
const viewRencana = (id: number) => {
  router.push(`/program-latihan/${id}`)
}




// Filtered Programs
const filteredPrograms = computed(() => {
  let filtered = programLatihan.value

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(program => 
      program.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      program.cabor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      program.keterangan.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by selected cabor
  if (selectedCabor.value.length > 0) {
    filtered = filtered.filter(program => 
      selectedCabor.value.includes(program.cabor)
    )
  }

  return filtered
})

// Dummy Data Program Latihan
const programLatihan = ref([
  {
    id: 1,
    nama: "Latihan Fisik Dasar",
    cabor: "Sepak Bola",
    kategori: "Putra",
    periode: "2025-08-01 s/d 2025-08-24",
    keterangan: "Fokus pada penguatan fisik dan stamina.",
    isSaved: false
  },
  {
    id: 2,
    nama: "Program Teknik Dasar Basket",
    cabor: "Basket",
    kategori: "Putra/Putri",
    periode: "2025-08-25 s/d 2025-09-15",
    keterangan: "Pengembangan teknik dribbling, shooting, dan passing.",
    isSaved: false
  },
  {
    id: 3,
    nama: "Latihan Kebugaran Badminton",
    cabor: "Badminton",
    kategori: "Putra",
    periode: "2025-12-03 s/d 2026-01-10",
    keterangan: "Peningkatan kebugaran dan ketahanan fisik.",
    isSaved: false
  },
  {
    id: 4,
    nama: "Program Tenis Junior",
    cabor: "Tenis",
    kategori: "Putra/Putri",
    periode: "2025-08-20 s/d 2025-09-20",
    keterangan: "Pelatihan teknik dasar tenis untuk pemula.",
    isSaved: false
  },
  {
    id: 5,
    nama: "Latihan Renang Kompetitif",
    cabor: "Renang",
    kategori: "Putra",
    periode: "2025-08-05 s/d 2025-09-05",
    keterangan: "Pengembangan teknik renang dan kecepatan.",
    isSaved: false
  }
])
</script>
