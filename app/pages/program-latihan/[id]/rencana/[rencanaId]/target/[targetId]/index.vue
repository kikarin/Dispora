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
      <h1 class="text-xl font-bold text-gray-700">Detail Target</h1>
    </div>

    <!-- Target Info Card -->
    <div class="rounded-2xl bg-white/90 p-6 backdrop-blur mb-6">
      <div class="flex items-start justify-between mb-2">
        <div class="flex-1">
          <h2 class="text-xl font-bold text-gray-700">
            {{ targetInfo.nama }}
          </h2>
        </div>
      </div>
      <div class="mb-1">
        <p class="text-sm text-gray-600">
          Peruntukan: {{ targetInfo.peserta }}
        </p>
      </div>
      <div>
        <p class="text-sm text-gray-600">Target: {{ targetInfo.target }}</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-if="showError"
      class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4"
    >
      <div class="flex items-start gap-3">
        <svg
          class="w-5 h-5 text-red-400 mt-0.5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <div class="flex-1">
          <p class="text-red-600 text-sm font-medium">{{ error }}</p>
        </div>
      </div>
      <div class="mt-3">
        <button
          @click="fetchTargetDetail(rencanaId, targetId)"
          class="px-3 py-1 text-red-700 underline text-sm hover:text-red-800"
        >
          Coba lagi
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!loading && pesertaTargetData.length === 0"
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
      <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak ada peserta</h3>
      <p class="text-gray-500">Belum ada peserta yang melakukan target ini.</p>
    </div>

    <!-- Peserta yang Sudah Melakukan Target -->
    <div v-else>
      <div class="space-y-4">
        <div
          v-for="peserta in pesertaTargetData"
          :key="peserta.id"
          class="relative bg-white rounded-xl p-5"
        >
          <div class="flex items-start gap-4">
            <!-- Foto Peserta -->
            <div class="flex-shrink-0 mt-3">
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
            <div class="flex-1 min-w-0 mt-3">
              <h4
                class="font-semibold text-gray-700 text-md leading-snug truncate"
              >
                {{ peserta.nama }}
              </h4>

              <div
                class="flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-1"
              >
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

              <!-- Badge Posisi -->
              <div class="mt-2 mb-3">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {{ peserta.posisi }}
                </span>
              </div>

              <!-- Nilai -->
              <div class="mt-3 flex items-center justify-between">
                <p class="text-sm text-gray-500 flex items-center gap-2">
                  Nilai:
                  <span class="font-medium text-gray-700">{{
                    peserta.nilai
                  }}</span>

                  <!-- Icon Trend -->
                  <ArrowTrendingUpIcon
                    v-if="
                      peserta.trend === 'Naik' || peserta.trend === 'Kenaikan'
                    "
                    class="w-5 h-5 text-green-500"
                  />
                  <MinusIcon
                    v-else-if="peserta.trend === 'Stabil'"
                    class="w-5 h-5 text-yellow-500"
                  />
                  <ArrowTrendingDownIcon
                    v-else-if="
                      peserta.trend === 'Turun' || peserta.trend === 'Penurunan'
                    "
                    class="w-5 h-5 text-red-500"
                  />
                  <QuestionMarkCircleIcon
                    v-else
                    class="w-5 h-5 text-gray-400"
                  />
                </p>
              </div>
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

    <!-- Spacer for bottom navigation -->
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
import {
  ArrowTrendingUpIcon,
  MinusIcon,
  ArrowTrendingDownIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { useTargetLatihan } from '../../../../../../../../composables/useTargetLatihan'

const route = useRoute()

// Validate and handle route params
const programIdParam = route.params.id as string
const rencanaIdParam = route.params.rencanaId as string
const targetIdParam = route.params.targetId as string

console.log('Target detail rencana page - Program ID:', programIdParam)
console.log('Target detail rencana page - Rencana ID:', rencanaIdParam)
console.log('Target detail rencana page - Target ID:', targetIdParam)

// Simple validation
let programId = 1
let rencanaId = 1
let targetId = 1

if (programIdParam && !isNaN(Number(programIdParam))) {
  programId = parseInt(programIdParam)
}

if (rencanaIdParam && !isNaN(Number(rencanaIdParam))) {
  rencanaId = parseInt(rencanaIdParam)
}

if (targetIdParam && !isNaN(Number(targetIdParam))) {
  targetId = parseInt(targetIdParam)
}

// Use composable
const {
  targetDetail,
  detailLoading: loading,
  detailError: error,
  fetchTargetDetail,
} = useTargetLatihan()

// Computed properties untuk data dari API
const targetInfo = computed(
  () =>
    targetDetail.value?.target || {
      id: targetId,
      nama: 'Loading...',
      target: 'Loading...',
      peserta: 'Loading...',
    }
)

const rencanaInfo = computed(
  () =>
    targetDetail.value?.rencana || {
      id: rencanaId,
      materi: 'Loading...',
      tanggal: 'Loading...',
    }
)

const pesertaTargetData = computed(
  () => targetDetail.value?.pesertaTarget || []
)

// Error State
const showError = computed(() => !!error.value)

// Helper function untuk format tanggal rencana (contoh: "12 Agustus 2025")
const formatTanggalBulan = (tanggalString: string) => {
  try {
    const date = new Date(tanggalString)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ]

    return `${day} ${monthNames[month]} ${year}`
  } catch (error) {
    return tanggalString
  }
}

// Load target info based on targetId
const loadTargetInfo = () => {
  // Fetch data from API
  fetchTargetDetail(rencanaId, targetId)
}

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

onMounted(() => {
  console.log(
    'Target detail rencana page loaded for Program ID:',
    programId,
    'Rencana ID:',
    rencanaId,
    'Target ID:',
    targetId
  )
  loadTargetInfo()
})
</script>
