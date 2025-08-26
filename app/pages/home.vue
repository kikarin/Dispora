<template>
    <div class="min-h-screen">
      <div class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-8" style="background: linear-gradient(180deg,rgba(216, 224, 255, 1) 0%, rgba(248, 250, 251, 1) 50%, rgba(226, 224, 255, 1) 100%);">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-[30px] font-bold leading-tight text-gray-900">
            Dispora
          </h1>
          <p class="mt-1 text-[14px] text-gray-500">
            Temukan program olahraga terbaik
          </p>
        </div>
  
        <!-- Search Bar -->
        <div class="mb-8">
          <div class="relative">
            <div class="flex items-center gap-2 rounded-2xl bg-white/80 p-3 shadow-sm backdrop-blur">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari program olahraga..."
                class="w-full text-[15px] bg-transparent outline-none placeholder:text-gray-400"
              />
              <button class="flex items-center gap-1 rounded-xl bg-[#597BF9] px-3 py-1 text-xs text-white">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Olahraga
              </button>
            </div>
          </div>
        </div>
  
        <!-- Navigation Cards -->
        <div class="mb-8">
          <!-- Single combined navigation card -->
          <div class="rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur">
            <!-- Top row of 4 navigation items -->
            <div class="grid grid-cols-4 gap-3 mb-4">
              <div class="flex flex-col items-center gap-2">
                <div class="rounded-full bg-[#597BF9]/10 p-3">
                  <svg class="h-6 w-6 text-[#597BF9]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span class="text-xs font-medium text-gray-700 text-center">Program Latihan</span>
              </div>
              
              <div class="flex flex-col items-center gap-2">
                <div class="rounded-full bg-[#597BF9]/10 p-3">
                  <svg class="h-6 w-6 text-[#597BF9]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span class="text-xs font-medium text-gray-700 text-center">Pemeriksaan</span>
              </div>
              
              <div class="flex flex-col items-center gap-2">
                <div class="rounded-full bg-[#597BF9]/10 p-3">
                  <svg class="h-6 w-6 text-[#597BF9]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span class="text-xs font-medium text-gray-700 text-center">Turnamen</span>
              </div>

              <div class="flex flex-col items-center gap-2">
                <div class="rounded-full bg-[#597BF9]/10 p-3">
                  <svg class="h-6 w-6 text-[#597BF9]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                  </svg>
                </div>
                <span class="text-xs font-medium text-gray-700 text-center">Simpan</span>
              </div>
            </div>
            
            <!-- All Categories button -->
            <div class="pt-3 p-2 border-t border-gray-100 relative">
              <select 
                v-model="selectedCategory"
                @change="handleCategoryChange"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#597BF9] focus:border-transparent appearance-none cursor-pointer pr-10"
              >
                <option value="">Semua Kategori</option>
                <option value="program-latihan">Program Latihan Terbaru</option>
                <option value="pemeriksaan">Pemeriksaan Terbaru</option>
                <option value="turnamen">Turnamen Terbaru</option>
              </select>
              <!-- Custom arrow icon -->
              <div class="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Test Routing Link
        <div class="mb-6">
          <div class="rounded-2xl bg-yellow-100/80 p-4 shadow-sm backdrop-blur border border-yellow-200">
            <h3 class="text-lg font-semibold text-yellow-800 mb-2">🧪 Test Routing System</h3>
            <p class="text-sm text-yellow-700 mb-3">Verifikasi bahwa semua route berfungsi dengan baik</p>
            <button 
              @click="$router.push('/test-routing')"
              class="bg-yellow-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-yellow-600 transition-colors"
            >
              Buka Test Page
            </button>
          </div>
        </div> -->

        <!-- Program Latihan Terbaru -->
        <div class="mb-8">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Program Latihan Terbaru</h2>
            <button class="text-[#597BF9] text-sm font-medium">Lihat Semua</button>
          </div>
          <div class="flex gap-4 overflow-x-auto pb-2">
            <div v-for="program in programLatihan" :key="program.id" class="flex-shrink-0 w-64 rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur">
              <div class="mb-3 h-32 rounded-xl bg-gradient-to-br from-[#597BF9]/20 to-[#4c6ef5]/20 flex items-center justify-center">
                <svg class="h-12 w-12 text-[#597BF9]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <!-- Cabor Badge -->
              <div class="mb-3">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#597BF9]/10 text-[#597BF9] border border-[#597BF9]/20">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  {{ program.cabor }}
                </span>
              </div>
              
              <h3 class="mb-4 text-sm font-semibold text-gray-900">{{ program.nama }}</h3>
              <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{{ program.lokasi }}</span>
                <button 
                  @click="toggleSave('program-latihan', program.id)"
                  class="rounded-full p-1.5 transition-all duration-200 hover:scale-110"
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
            </div>
          </div>
        </div>
  
        <!-- Pemeriksaan -->
        <div class="mb-8">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Pemeriksaan Terbaru</h2>
            <button class="text-[#597BF9] text-sm font-medium">Lihat Semua</button>
          </div>
          <div class="flex gap-4 overflow-x-auto pb-2">
            <div v-for="pemeriksaan in dataPemeriksaan" :key="pemeriksaan.id" class="flex-shrink-0 w-64 rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur">
              <div class="mb-3 h-32 rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                <svg class="h-12 w-12 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <!-- Cabor Badge -->
              <div class="mb-3">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  {{ pemeriksaan.cabor }}
                </span>
              </div>
              
              <h3 class="mb-4 text-sm font-semibold text-gray-900">{{ pemeriksaan.nama }}</h3>
              <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{{ pemeriksaan.lokasi }}</span>
                <button 
                  @click="toggleSave('pemeriksaan', pemeriksaan.id)"
                  class="rounded-full p-1.5 transition-all duration-200 hover:scale-110"
                  :class="pemeriksaan.isSaved ? 'bg-[#597BF9] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'"
                >
                  <svg v-if="pemeriksaan.isSaved" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                  </svg>
                  <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Turnamen -->
        <div class="mb-8">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Turnamen Terbaru</h2>
            <button class="text-[#597BF9] text-sm font-medium">Lihat Semua</button>
          </div>
          <div class="flex gap-4 overflow-x-auto pb-2">
            <div v-for="turnamen in dataTurnamen" :key="turnamen.id" class="flex-shrink-0 w-64 rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur">
              <div class="mb-3 h-32 rounded-xl bg-gradient-to-br from-orange-100 to-red-200 flex items-center justify-center">
                <svg class="h-12 w-12 text-orange-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              
              <!-- Cabor Badge -->
              <div class="mb-3">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  {{ turnamen.cabor }}
                </span>
              </div>
              
              <h3 class="mb-4 text-sm font-semibold text-gray-900">{{ turnamen.nama }}</h3>
              <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{{ turnamen.lokasi }}</span>
                <button 
                  @click="toggleSave('turnamen', turnamen.id)"
                  class="rounded-full p-1.5 transition-all duration-200 hover:scale-110"
                  :class="turnamen.isSaved ? 'bg-[#597BF9] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'"
                >
                  <svg v-if="turnamen.isSaved" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                  </svg>
                  <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                  </svg>
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
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // Category selection
  const selectedCategory = ref('')

  const handleCategoryChange = () => {
    console.log('Selected category:', selectedCategory.value)
    // Handle category change logic here
  }

  // Function to toggle save state
  const toggleSave = (category: string, id: number) => {
    let targetArray: any[]
    
    switch(category) {
      case 'program-latihan':
        targetArray = programLatihan.value
        break
      case 'pemeriksaan':
        targetArray = dataPemeriksaan.value
        break
      case 'turnamen':
        targetArray = dataTurnamen.value
        break
      default:
        return
    }
    
    const item = targetArray.find(item => item.id === id)
    if (item) {
      item.isSaved = !item.isSaved
      console.log(`${category} ${id} ${item.isSaved ? 'disimpan' : 'dihapus dari simpan'}`)
    }
  }

  // Dummy data for Program Latihan with save state
  const programLatihan = ref([
    {
      id: 1,
      nama: "Program Latihan Sepak Bola",
      lokasi: "Gelora Bung Karno, Jakarta",
      isSaved: false,
      cabor: "Sepak Bola"
    },
    {
      id: 2,
      nama: "Program Latihan Basket",
      lokasi: "GOR, Bogor",
      isSaved: false,
      cabor: "Basket"
    },
    {
      id: 3,
      nama: "Program Latihan Badminton",
      lokasi: "GOR Bulutangkis, Bandung",
      isSaved: false,
      cabor: "Badminton"
    },
    {
      id: 4,
      nama: "Program Latihan Tenis",
      lokasi: "Tennis Court, Jakarta",
      isSaved: false,
      cabor: "Tenis"
    },
    {
      id: 5,
      nama: "Program Latihan Renang",
      lokasi: "Kolam Renang, Jakarta",
      isSaved: false,
      cabor: "Renang"
    }
  ])
  
  // Dummy data for Pemeriksaan with save state
  const dataPemeriksaan = ref([
    {
      id: 1,
      nama: "Pemeriksaan Fisik Olahragawan",
      lokasi: "Tenaga Pendukung",
      isSaved: false,
      cabor: "Basket"
    },
    {
      id: 2,
      nama: "Tes Kebugaran Jasmani",
      lokasi: "Tenaga Pendukung",
      isSaved: false,
      cabor: "Badminton"
    },
    {
      id: 3,
      nama: "Pemeriksaan Jantung",
      lokasi: "Tenaga Pendukung",
      isSaved: false,
      cabor: "Renang"
    },
    {
      id: 4,
      nama: "Tes VO2 Max",
      lokasi: "Tenaga Pendukung",
      isSaved: false,
      cabor: "Sepak Bola"
    },
    {
      id: 5,
      nama: "Pemeriksaan Cedera Olahraga",
      lokasi: "Tenaga Pendukung",
      isSaved: false,
      cabor: "Tenis"
    }
  ])
  
  // Dummy data for Turnamen with save state
  const dataTurnamen = ref([
    {
      id: 1,
      nama: "Turnamen Sepak Bola U-17",
      lokasi: "Juara 1 nasional",
      isSaved: false,
      cabor: "Sepak Bola"
    },
    {
      id: 2,
      nama: "Kejuaraan Basket 3x3",
      lokasi: "Juara 1 nasional",
      isSaved: false,
      cabor: "Basket"
    },
    {
      id: 3,
      nama: "Turnamen Badminton Terbuka",
      lokasi: "Juara 1 nasional",
      isSaved: false,
      cabor: "Badminton"
    },
    {
      id: 4,
      nama: "Kejuaraan Tenis Junior",
      lokasi: "Juara 1 nasional",
      isSaved: false,
      cabor: "Tenis"
    },
    {
      id: 5,
      nama: "Turnamen Renang Nasional",
      lokasi: "Juara 1 nasional",
      isSaved: false,
      cabor: "Renang"
    }
  ])
  </script>