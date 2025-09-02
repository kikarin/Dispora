<template>
  <PageLayout>
    <!-- Header -->
    <div class="mb-6">
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
        <h1 class="text-xl font-bold text-gray-700">Rencana Latihan</h1>
      </div>

      <!-- Search and Calendar -->
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
            placeholder="Cari rencana latihan..."
            class="flex-1 text-[15px] bg-transparent outline-none placeholder:text-gray-400"
          />
          <!-- Calendar Button -->
          <button
            @click="toggleCalendar"
            class="p-1 mr-1 rounded-xl bg-[#597BF9]/10 text-[#597BF9] hover:bg-[#597BF9]/20 transition-colors"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        <!-- Calendar Dropdown -->
        <div
          v-if="showCalendar"
          class="absolute top-full left-0 right-0 mt-2 z-50"
        >
          <div
            class="bg-white rounded-2xl shadow-lg border border-gray-200 p-4"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-semibold text-gray-700">
                Filter Tanggal
              </h3>
              <button
                @click="toggleCalendar"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg
                  class="h-5 w-5"
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
            </div>

            <!-- Date Input -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1"
                >Tanggal</label
              >
              <input
                v-model="selectedDate"
                type="date"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
              />
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2 mt-4">
              <button
                @click="applyDateFilterLocal"
                class="flex-1 bg-[#597BF9] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
              >
                Terapkan
              </button>
              <button
                @click="clearDateFilterLocal"
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
    <div>
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9]"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
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
            @click="fetchRencana()"
            class="px-3 py-1 text-red-700 underline text-sm hover:text-red-800"
          >
            Coba lagi
          </button>
        </div>
      </div>

      <!-- List -->
      <div v-else>
        <div v-if="rencanaList.length === 0" class="text-center py-12">
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
            Tidak ada rencana latihan
          </h3>
          <p class="text-gray-500">
            {{
              searchQuery || selectedDate
                ? 'Coba ubah pencarian atau reset filter'
                : 'Program ini belum memiliki rencana latihan.'
            }}
          </p>
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="rencana in rencanaList"
            :key="rencana.id"
            class="p-4 bg-gray-50 rounded-xl"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <svg
                    class="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span class="text-sm font-medium text-gray-700">{{
                    formatTanggalBulan(rencana.tanggal)
                  }}</span>
                </div>
                <h4 class="font-semibold text-gray-700 mb-2">
                  {{ rencana.materi }}
                </h4>
              </div>
            </div>

            <div class="space-y-2 text-sm mb-4">
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span class="text-gray-600">{{ rencana.lokasi }}</span>
              </div>

              <div class="flex items-start gap-2">
                <svg
                  class="w-4 h-4 text-gray-400 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span class="text-gray-600">{{ rencana.catatan }}</span>
              </div>

              <div class="flex items-start gap-2">
                <svg
                  class="w-4 h-4 text-gray-400 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <span class="text-gray-600">{{ rencana.targetLatihan }}</span>
              </div>

              <!-- Info Jumlah Peserta -->
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-gray-400"
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
                <span class="text-gray-600"
                  >Peserta: {{ rencana.total_peserta }}</span
                >
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

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex justify-center items-center gap-2 mt-6"
        >
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>

          <span class="px-3 py-2 text-sm text-gray-700">
            {{ currentPage }} dari {{ totalPages }}
          </span>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>

    <!-- Spacer for bottom navigation -->
    <div class="h-20"></div>

    <!-- Click outside handler for calendar -->
    <div
      v-if="showCalendar"
      @click="showCalendar = false"
      class="fixed inset-0 z-40"
    ></div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { useRencanaLatihan } from '../../../../composables/useRencanaLatihan'

const route = useRoute()
const router = useRouter()

// Search and Calendar
const searchQuery = ref('')
const showCalendar = ref(false)
const selectedDate = ref('')

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

// Use composable for Rencana Latihan
const {
  rencanaList,
  loading,
  error,
  currentPage,
  totalPages,
  totalItems,
  perPage,
  searchQuery: rencanaSearch,
  selectedDate: rencanaDate,
  fetchRencana,
  nextPage,
  prevPage,
  goToPage,
  applyDateFilter,
  clearDateFilter,
} = useRencanaLatihan(programId)

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

// Runtime config & Auth
// Bridge local inputs to composable filters
watch(searchQuery, (val) => {
  rencanaSearch.value = val
})
watch(selectedDate, (val) => {
  rencanaDate.value = val
})

// Calendar Functions
const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value
}

const applyDateFilterLocal = () => {
  showCalendar.value = false
  applyDateFilter()
}

const clearDateFilterLocal = () => {
  selectedDate.value = ''
  showCalendar.value = false
  clearDateFilter()
}

// Pagination functions are provided by composable: nextPage, prevPage

// Debounce search
let searchTimeout: any
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchRencana(1)
  }, 500)
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

onMounted(async () => {
  await fetchRencana()
})
</script>
