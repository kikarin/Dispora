<template>
  <PageLayout>
    <!-- Header -->
    <div class="flex items-center gap-3 mb-4">
      <button
        @click="$router.back()"
        class="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-gray-700">Peserta Rencana Latihan</h1>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-6">
      <div class="flex bg-white/80 rounded-2xl p-1 backdrop-blur">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="flex-1 py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200"
          :class="
            activeTab === tab.id
              ? 'bg-[#597BF9] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-700'
          "
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Content based on active tab -->
    <div class="space-y-4">
      <!-- Search -->
      <div class="relative">
        <div
          class="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 backdrop-blur"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari peserta..."
            class="flex-1 text-[15px] bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-600 text-sm">{{ error }}</p>
        <button
          @click="fetchPeserta"
          class="mt-2 text-red-700 underline text-sm hover:text-red-800"
        >
          Coba lagi
        </button>
      </div>

      <!-- Empty State All Tabs -->
      <div
        v-else-if="
          !loading &&
          pesertaData.atlet.length === 0 &&
          pesertaData.pelatih.length === 0 &&
          pesertaData.tenagaPendukung.length === 0
        "
        class="text-center py-12"
      >
        <div class="text-gray-400 mb-4">
          <svg
            class="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Tidak ada peserta
        </h3>
        <p class="text-gray-500">
          {{
            searchQuery
              ? 'Coba ubah kata kunci pencarian'
              : 'Belum ada peserta yang terdaftar untuk rencana ini.'
          }}
        </p>
      </div>
      <!-- Peserta Atlet -->
      <div v-if="activeTab === 'atlet'" class="space-y-3">
        <div
          v-for="peserta in pesertaData.atlet"
          :key="peserta.id"
          class="bg-white/90 rounded-2xl p-4 backdrop-blur"
        >
          <div class="flex items-start gap-4">
            <!-- Foto Peserta -->
            <div class="flex-shrink-0 mt-1">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-[#597BF9]/20 to-[#4c6ef5]/30 flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="peserta.foto"
                  :src="peserta.foto"
                  :alt="peserta.nama"
                  class="w-full h-full object-cover cursor-zoom-in"
                  @click="openPhotoModal(peserta.foto)"
                />
                <svg
                  v-else
                  class="w-8 h-8 text-[#597BF9]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            <!-- Info Peserta -->
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-700 text-md mb-1 truncate">
                {{ peserta.nama }}
              </h4>
              <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span class="flex items-center gap-1">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {{ peserta.jenisKelamin }}
                </span>
                <span>{{ peserta.usia }} tahun</span>
              </div>

              <!-- Badge Posisi/Jenis Pelatih/Tenaga Pendukung -->
              <div class="mb-2">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {{ peserta.posisi }}
                </span>
              </div>

              <!-- Status Kehadiran -->
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-gray-500">Kehadiran:</span>
                <span
                  v-if="peserta.kehadiran"
                  class="inline-flex items-center py-1 text-xs font-medium"
                  :class="getKehadiranBadgeClass(peserta.kehadiran)"
                >
                  {{ peserta.kehadiran }}
                </span>
                <span
                  v-else
                  class="inline-flex items-center py-1 text-xs font-medium text-gray-600"
                >
                  -
                </span>
              </div>

              <!-- Action Button -->
              <button
                @click="
                  viewTargetPeserta(getPesertaIdForNavigation(peserta), 'atlet')
                "
                class="w-full bg-[#597BF9] text-white py-2 px-1 rounded-xl w-fit mx-auto text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
              >
                Lihat Target Latihan
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Peserta Pelatih -->
      <div v-else-if="activeTab === 'pelatih'" class="space-y-3">
        <div
          v-for="peserta in pesertaData.pelatih"
          :key="peserta.id"
          class="bg-white/90 rounded-2xl p-4 backdrop-blur"
        >
          <div class="flex items-start gap-4">
            <!-- Foto Peserta -->
            <div class="flex-shrink-0 mt-1">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="peserta.foto"
                  :src="peserta.foto"
                  :alt="peserta.nama"
                  class="w-full h-full object-cover cursor-zoom-in"
                  @click="openPhotoModal(peserta.foto)"
                />
                <svg
                  v-else
                  class="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            <!-- Info Peserta -->
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-700 text-md mb-1 truncate">
                {{ peserta.nama }}
              </h4>
              <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span class="flex items-center gap-1">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {{ peserta.jenisKelamin }}
                </span>
                <span>{{ peserta.usia }} tahun</span>
              </div>

              <!-- Badge Posisi/Jenis Pelatih/Tenaga Pendukung -->
              <div class="mb-2">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {{ peserta.jenisPelatih }}
                </span>
              </div>

              <!-- Status Kehadiran -->
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-gray-500">Kehadiran:</span>
                <span
                  v-if="peserta.kehadiran"
                  class="inline-flex items-center py-1 text-xs font-medium"
                  :class="getKehadiranBadgeClass(peserta.kehadiran)"
                >
                  {{ peserta.kehadiran }}
                </span>
                <span
                  v-else
                  class="inline-flex items-center py-1 text-xs font-medium text-gray-600"
                >
                  -
                </span>
              </div>

              <!-- Action Button -->
              <button
                @click="
                  viewTargetPeserta(
                    getPesertaIdForNavigation(peserta),
                    'pelatih'
                  )
                "
                class="w-full bg-[#597BF9] text-white py-2 px-1 rounded-xl w-fit mx-auto text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
              >
                Lihat Target Latihan
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Peserta Tenaga Pendukung -->
      <div v-else-if="activeTab === 'tenaga-pendukung'" class="space-y-3">
        <div
          v-for="peserta in pesertaData.tenagaPendukung"
          :key="peserta.id"
          class="bg-white/90 rounded-2xl p-4 backdrop-blur"
        >
          <div class="flex items-start gap-4">
            <!-- Foto Peserta -->
            <div class="flex-shrink-0 mt-1">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-red-200 flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="peserta.foto"
                  :src="peserta.foto"
                  :alt="peserta.nama"
                  class="w-full h-full object-cover cursor-zoom-in"
                  @click="openPhotoModal(peserta.foto)"
                />
                <svg
                  v-else
                  class="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            <!-- Info Peserta -->
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-700 text-md mb-1 truncate">
                {{ peserta.nama }}
              </h4>
              <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span class="flex items-center gap-1">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {{ peserta.jenisKelamin }}
                </span>
                <span>{{ peserta.usia }} tahun</span>
              </div>

              <!-- Badge Posisi/Jenis Pelatih/Tenaga Pendukung -->
              <div class="mb-2">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                >
                  {{ peserta.jenisTenagaPendukung }}
                </span>
              </div>

              <!-- Status Kehadiran -->
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-gray-500">Kehadiran:</span>
                <span
                  v-if="peserta.kehadiran"
                  class="inline-flex items-center py-1 text-xs font-medium"
                  :class="getKehadiranBadgeClass(peserta.kehadiran)"
                >
                  {{ peserta.kehadiran }}
                </span>
                <span
                  v-else
                  class="inline-flex items-center py-1 text-xs font-medium text-gray-600"
                >
                  -
                </span>
              </div>

              <!-- Action Button -->
              <button
                @click="
                  viewTargetPeserta(
                    getPesertaIdForNavigation(peserta),
                    'tenaga-pendukung'
                  )
                "
                class="w-full bg-[#597BF9] text-white py-2 px-1 rounded-xl w-fit mx-auto text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
              >
                Lihat Target Latihan
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9] mx-auto"
        ></div>
        <p class="text-gray-500 mt-2">Memuat data peserta...</p>
      </div>
    </div>

    <div class="h-20"></div>

    <!-- Photo Modal -->
    <div
      v-if="showPhotoModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      @click.self="closePhotoModal"
    >
      <div
        class="relative bg-white rounded-2xl p-2 shadow-xl max-w-[95vw] max-h-[90vh]"
      >
        <button
          @click="closePhotoModal"
          class="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow hover:shadow-md"
          aria-label="Tutup"
        >
          <svg
            class="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          v-if="modalPhotoSrc"
          :src="modalPhotoSrc"
          alt="Foto Peserta"
          class="max-h-[80vh] max-w-[90vw] object-contain rounded-lg"
        />
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { usePesertaRencana } from '../../../../../../../composables/usePesertaRencana'

const route = useRoute()
const router = useRouter()

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
const tabs = computed(() => [
  { id: 'atlet', label: `Atlet (${pesertaData.value.atlet.length})` },
  { id: 'pelatih', label: `Pelatih (${pesertaData.value.pelatih.length})` },
  {
    id: 'tenaga-pendukung',
    label: `Pendukung (${pesertaData.value.tenagaPendukung.length})`,
  },
])

// Fetch peserta via composable
const {
  atlet,
  pelatih,
  tenagaPendukung,
  loading,
  error,
  searchQuery,
  fetchPeserta,
} = usePesertaRencana(rencanaId)

// Helper function untuk mendapatkan class badge berdasarkan kehadiran
const getKehadiranBadgeClass = (kehadiran: string) => {
  switch (kehadiran) {
    case 'Hadir':
      return 'text-green-800'
    case 'Tidak Hadir':
      return 'text-red-800'
    case 'Izin':
      return 'text-yellow-800'
    case 'Sakit':
      return 'text-purple-800'
    default:
      return 'text-gray-600'
  }
}

// Helper function untuk mendapatkan ID yang benar untuk navigasi
const getPesertaIdForNavigation = (peserta: any) => {
  console.log('🔍 Peserta data for navigation:', {
    id: peserta.id,
    rencanaLatihanPesertaId: peserta.rencanaLatihanPesertaId,
    nama: peserta.nama,
    rawData: peserta,
  })
  // Prioritas: rencanaLatihanPesertaId > id
  const selectedId = peserta.rencanaLatihanPesertaId || peserta.id
  console.log('✅ Selected ID for navigation:', selectedId)
  return selectedId
}

// Navigation function untuk melihat target peserta
const viewTargetPeserta = (pesertaId: number, pesertaType: string) => {
  console.log('Navigating to target peserta for:', { pesertaId, pesertaType })
  router.push(
    `/program-latihan/${programId}/rencana/${rencanaId}/peserta/${pesertaId}?peserta_type=${pesertaType}`
  )
}

// Peserta Data reactive dari composable
const pesertaData = computed(() => ({
  atlet: atlet.value,
  pelatih: pelatih.value,
  tenagaPendukung: tenagaPendukung.value,
}))

onMounted(async () => {
  await fetchPeserta()
})

// Photo modal state and handlers
const showPhotoModal = ref(false)
const modalPhotoSrc = ref<string | null>(null)
const openPhotoModal = (src: string | null) => {
  if (!src) return
  modalPhotoSrc.value = src
  showPhotoModal.value = true
}
const closePhotoModal = () => {
  showPhotoModal.value = false
  modalPhotoSrc.value = null
}
</script>
