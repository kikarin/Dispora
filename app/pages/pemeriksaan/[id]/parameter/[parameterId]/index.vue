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
            <h1 class="text-[24px] font-bold text-gray-700">Detail Parameter</h1>
          </div>
        </div>
  
        <!-- Parameter Info Card -->
        <div class="rounded-2xl bg-white/90 p-6 backdrop-blur mb-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h2 class="text-xl font-bold text-gray-700 mb-2">{{ parameterInfo.nama }}</h2>
              <div class="flex flex-col text-sm text-gray-600">
                <span class="flex items-center gap-1 mb-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {{ parameterInfo.untukSiapa }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {{ parameterInfo.satuan }}
                </span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Peserta yang Sudah Diperiksa -->
        <div>        
          <div class="space-y-4">
            <div v-for="peserta in pesertaParameterData" :key="peserta.id" 
                 class="relative bg-white rounded-xl p-5 ">
             
              <!-- Status Badge (pojok kanan atas) -->
              <div class="absolute top-2 right-3">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" 
                      :class="getStatusClass(peserta.status)">
                  {{ peserta.status }}
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
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" 
                           viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" 
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {{ peserta.jenisKelamin }}
                    </span>
                    <span>{{ peserta.usia }} tahun</span>
                  </div>
                  
                  <!-- Badge Jenis Peserta -->
                  <div class="mt-2 mb-3">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                          :class="getPesertaBadgeClass(peserta.jenisPeserta)">
                      {{ peserta.jenisPeserta }}
                    </span>
                  </div>
  
                  <!-- Nilai dan Status -->
                  <div class="mt-3 flex items-center justify-between">
                    <p class="text-sm text-gray-500">
                      Nilai: <span class="font-medium text-gray-700">{{ peserta.nilai }} {{ parameterInfo.satuan }}</span>
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
  const pemeriksaanIdParam = route.params.id as string
  const parameterIdParam = route.params.parameterId as string
  
  console.log('Parameter detail page - Pemeriksaan ID:', pemeriksaanIdParam)
  console.log('Parameter detail page - Parameter ID:', parameterIdParam)
  
  // Simple validation
  let pemeriksaanId = 1
  let parameterId = 1
  
  if (pemeriksaanIdParam && !isNaN(Number(pemeriksaanIdParam))) {
    pemeriksaanId = parseInt(pemeriksaanIdParam)
  }
  
  if (parameterIdParam && !isNaN(Number(parameterIdParam))) {
    parameterId = parseInt(parameterIdParam)
  }
  
  // Loading state
  const loading = ref(false)
  
  // Parameter Info
  const parameterInfo = ref({
    id: parameterId,
    nama: "Suhu Tubuh",
    untukSiapa: "Semua Peserta",
    satuan: "°C"
  })
  
  // Mock data untuk peserta yang sudah diperiksa parameter ini
  const pesertaParameterData = ref([
    {
      id: 1,
      nama: "Budi Santoso",
      jenisKelamin: "Laki-laki",
      usia: 25,
      jenisPeserta: "Atlet",
      nilai: 36.5,
      status: "Stabil"
    },
    {
      id: 2,
      nama: "Andi Wijaya", 
      jenisKelamin: "Laki-laki",
      usia: 23,
      jenisPeserta: "Pelatih",
      nilai: 37.2,
      status: "Kenaikan"
    },
    {
      id: 3,
      nama: "Rizky Pratama",
      jenisKelamin: "Laki-laki", 
      usia: 21,
      jenisPeserta: "Atlet",
      nilai: 35.8,
      status: "Penurunan"
    },
    {
      id: 4,
      nama: "Siti Aminah",
      jenisKelamin: "Perempuan",
      usia: 22,
      jenisPeserta: "Tenaga Pendukung",
      nilai: 36.8,
      status: "Stabil"
    }
  ])
  
  // Update parameter info berdasarkan parameterId
  const updateParameterInfo = (parameterId: number) => {
    const parameters = [
      { id: 1, nama: "Suhu Tubuh", untukSiapa: "Semua Peserta", satuan: "°C" },
      { id: 2, nama: "Tekanan Darah", untukSiapa: "Semua Peserta", satuan: "mmHg" },
      { id: 3, nama: "Denyut Nadi", untukSiapa: "Semua Peserta", satuan: "bpm" },
      { id: 4, nama: "Tinggi Badan", untukSiapa: "Semua Peserta", satuan: "cm" },
      { id: 5, nama: "Berat Badan", untukSiapa: "Semua Peserta", satuan: "kg" },
      { id: 6, nama: "VO2 Max", untukSiapa: "Atlet", satuan: "ml/kg/min" },
      { id: 7, nama: "Fleksibilitas", untukSiapa: "Semua Peserta", satuan: "cm" },
      { id: 8, nama: "Kekuatan Otot", untukSiapa: "Atlet", satuan: "kg" }
    ]
    
    const parameter = parameters.find(p => p.id === parameterId)
    if (parameter) {
      parameterInfo.value = parameter
    }
    
    // Update peserta data berdasarkan parameter yang dipilih
    updatePesertaData(parameterId)
  }
  
  // Update peserta data berdasarkan parameter yang dipilih
  const updatePesertaData = (parameterId: number) => {
    const parameterData = {
          1: { // Suhu Tubuh
      satuan: "°C",
      peserta: [
        { id: 1, nama: "Budi Santoso", jenisKelamin: "Laki-laki", usia: 25, jenisPeserta: "Atlet", nilai: 36.5, status: "Stabil" },
        { id: 2, nama: "Andi Wijaya", jenisKelamin: "Laki-laki", usia: 23, jenisPeserta: "Pelatih", nilai: 37.2, status: "Kenaikan" },
        { id: 3, nama: "Rizky Pratama", jenisKelamin: "Laki-laki", usia: 21, jenisPeserta: "Atlet", nilai: 35.8, status: "Penurunan" },
        { id: 4, nama: "Siti Aminah", jenisKelamin: "Perempuan", usia: 22, jenisPeserta: "Tenaga Pendukung", nilai: 36.8, status: "Stabil" }
      ]
    },
          2: { // Tekanan Darah
      satuan: "mmHg",
      peserta: [
        { id: 1, nama: "Budi Santoso", jenisKelamin: "Laki-laki", usia: 25, jenisPeserta: "Atlet", nilai: 120, status: "Stabil" },
        { id: 2, nama: "Andi Wijaya", jenisKelamin: "Laki-laki", usia: 23, jenisPeserta: "Pelatih", nilai: 135, status: "Kenaikan" },
        { id: 3, nama: "Rizky Pratama", jenisKelamin: "Laki-laki", usia: 21, jenisPeserta: "Atlet", nilai: 110, status: "Penurunan" }
      ]
    },
    3: { // Denyut Nadi
      satuan: "bpm",
      peserta: [
        { id: 1, nama: "Budi Santoso", jenisKelamin: "Laki-laki", usia: 25, jenisPeserta: "Atlet", nilai: 72, status: "Stabil" },
        { id: 2, nama: "Andi Wijaya", jenisKelamin: "Laki-laki", usia: 23, jenisPeserta: "Pelatih", nilai: 85, status: "Kenaikan" },
        { id: 4, nama: "Siti Aminah", jenisKelamin: "Perempuan", usia: 22, jenisPeserta: "Tenaga Pendukung", nilai: 68, status: "Penurunan" }
      ]
    }
    }
    
    const selectedParameter = parameterData[parameterId as keyof typeof parameterData]
    if (selectedParameter) {
      pesertaParameterData.value = selectedParameter.peserta
      // Update parameter info juga
      parameterInfo.value.satuan = selectedParameter.satuan
    }
  }
  
  // Functions
const getPesertaBadgeClass = (jenisPeserta: string) => {
  switch (jenisPeserta) {
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

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Stabil':
      return 'bg-green-100 text-green-800 border border-green-200'
    case 'Kenaikan':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    case 'Penurunan':
      return 'bg-red-100 text-red-800 border border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}
  
  const getStatusTextClass = (status: string) => {
    switch (status) {
      case 'Stabil':
        return 'text-green-600'
      case 'Kenaikan':
        return 'text-yellow-600'
      case 'Penurunan':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }
  
  // Load parameter info based on parameterId
  const loadParameterInfo = () => {
    // Update parameter info berdasarkan parameterId
    updateParameterInfo(parameterId)
  }
  
  onMounted(() => {
    console.log('Parameter detail page loaded for Pemeriksaan ID:', pemeriksaanId, 'Parameter ID:', parameterId)
    loadParameterInfo()
  })
  </script>