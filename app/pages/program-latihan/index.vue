<template>
  <PageLayout>
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
          <p class="text-red-500 text-xs mt-1">
            Status: {{ error.includes('login') ? 'Unauthorized' : 'Error' }}
          </p>
        </div>
      </div>
      <div class="mt-3 flex gap-2">
        <button
          @click="fetchPrograms()"
          class="px-3 py-1 text-red-700 underline text-sm hover:text-red-800"
        >
          Coba lagi
        </button>
        <button
          @click="navigateTo('/login')"
          v-if="error.includes('login')"
          class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
        >
          Login
        </button>
      </div>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Search & Filter Section -->
      <div class="mb-3 space-y-4">
        <!-- Search Bar with Calendar -->
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
              placeholder="Cari program latihan..."
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
                  Filter Periode
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

              <!-- Date Range Inputs -->
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1"
                    >Dari Tanggal</label
                  >
                  <input
                    v-model="startDate"
                    type="date"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1"
                    >Sampai Tanggal</label
                  >
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
            :key="cabor.id"
            @click="toggleCaborFilter(cabor.id)"
            class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="
              selectedCabor.includes(cabor.id)
                ? 'bg-[#597BF9] text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            "
          >
            {{ cabor.nama }}
          </button>
        </div>
      </div>

      <!-- Program List -->
      <div v-if="filteredPrograms.length > 0" class="space-y-6">
        <div
          v-for="program in filteredPrograms"
          :key="program.id"
          class="group rounded-2xl bg-white/90 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Program Header -->
          <div class="mb-6">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div>
                  <h3
                    class="text-lg font-semibold text-gray-800 group-hover:text-[#597BF9] transition-colors"
                  >
                    {{ program.nama_program }}
                  </h3>
                  <span
                    class="inline-flex items-center mt-2 py-0.5 text-xs font-medium rounded-full text-[#597BF9]"
                  >
                    {{ program.cabor }} - {{ program.kategori }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Program Info -->
            <div class="grid gap-3 text-sm text-gray-600">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{{ program.periode }}</span>
              </div>
              <div v-if="program.keterangan" class="text-gray-500 text-sm">
                {{ program.keterangan }}
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              @click="viewRencana(program.id)"
              class="flex-1 bg-[#597BF9] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
            >
              Rencana Latihan ({{ program.jumlah_rencana_latihan }})
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading" class="text-center py-12">
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
          Tidak ada program latihan
        </h3>
        <p class="text-gray-500">
          {{
            hasActiveFilters
              ? 'Coba ubah filter atau hapus semua filter'
              : 'Belum ada program latihan yang tersedia'
          }}
        </p>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex justify-center items-center gap-2 mt-8"
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { useProgramLatihan } from '../../../composables/useProgramLatihan'
import { useAuth } from '../../../composables/useAuth'
const router = useRouter()
const { user, logout, isAuthenticated, initAuth } = useAuth()

// Use composable
const {
  programs,
  caborList,
  loading,
  error,
  currentPage,
  totalPages,
  totalItems,
  perPage,
  searchQuery,
  selectedCabor,
  startDate,
  endDate,
  filteredPrograms,
  fetchPrograms,
  fetchCaborList,
  fetchProgramDetail,
  toggleCaborFilter,
  clearFilters,
  applyDateFilter,
  nextPage,
  prevPage,
  goToPage,
} = useProgramLatihan()

// Calendar state
const showCalendar = ref(false)

// Computed
const hasActiveFilters = computed(() => {
  return (
    searchQuery.value ||
    selectedCabor.value.length > 0 ||
    startDate.value ||
    endDate.value
  )
})

// Methods
const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value
}

const clearDateFilter = () => {
  startDate.value = ''
  endDate.value = ''
  showCalendar.value = false
}

const viewRencana = (id: number) => {
  router.push(`/program-latihan/${id}`)
}

// Search is now handled by computed property filteredPrograms - no debounce needed for client-side filtering

// Lifecycle
onMounted(async () => {
  initAuth()
  await Promise.all([fetchPrograms(), fetchCaborList()])
})
</script>
