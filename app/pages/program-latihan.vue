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
          <h1 class="text-[24px] font-bold text-gray-900">Program Latihan</h1>
        </div>
      </div>

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
        <div v-for="program in filteredPrograms" :key="program.id" class="rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur">
          <!-- Program Header -->
          <div class="mb-6">
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-lg font-semibold text-gray-900">{{ program.nama }}</h3>
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
            
            <!-- Cabor Badge -->
            <div class="mb-3">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#597BF9]/10 text-[#597BF9] border border-[#597BF9]/20">
                {{ program.cabor }}
              </span>
            </div>

            <!-- Program Info -->
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span class="text-gray-600">{{ program.kategori }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-gray-600">{{ program.periode }}</span>
              </div>
            </div>

            <!-- Keterangan -->
            <p class="text-sm text-gray-600 mt-3">{{ program.keterangan }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button 
              @click="viewDetail(program.id)"
              class="flex-1 bg-[#597BF9] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
            >
              Lihat Detail
            </button>
            <button 
              @click="viewTarget(program.id)"
              class="flex-1 bg-white border border-[#597BF9] text-[#597BF9] py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#597BF9]/5 transition-colors"
            >
              Target
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
const viewDetail = (id: number) => {
  router.push(`/program-latihan/${id}`)
}

const viewTarget = (id: number) => {
  router.push(`/program-latihan/${id}/target`)
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
    periode: "2025-08-01 s/d 2025-08-31",
    keterangan: "Fokus pada penguatan fisik dan stamina.",
    isSaved: false
  },
  {
    id: 2,
    nama: "Program Teknik Dasar Basket",
    cabor: "Basket",
    kategori: "Putra/Putri",
    periode: "2025-08-15 s/d 2025-09-15",
    keterangan: "Pengembangan teknik dribbling, shooting, dan passing.",
    isSaved: false
  },
  {
    id: 3,
    nama: "Latihan Kebugaran Badminton",
    cabor: "Badminton",
    kategori: "Putra",
    periode: "2025-08-10 s/d 2025-09-10",
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
