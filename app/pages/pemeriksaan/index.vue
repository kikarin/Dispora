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
          @click="fetchPemeriksaan()"
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
            class="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 shadow-sm backdrop-blur"
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
              placeholder="Cari pemeriksaan..."
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
                  >Tanggal Pemeriksaan</label
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

        <!-- Filter Cabor -->
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="cabor in caborList"
            :key="cabor"
            @click="toggleCaborFilter(cabor)"
            class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="
              selectedCabor.includes(cabor)
                ? 'bg-[#597BF9] text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            "
          >
            {{ cabor }}
          </button>
        </div>
      </div>

      <!-- Pemeriksaan List -->
      <div v-if="filteredPemeriksaan.length > 0" class="space-y-6">
        <div
          v-for="pemeriksaan in filteredPemeriksaan"
          :key="pemeriksaan.id"
          class="group rounded-2xl bg-white/90 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Pemeriksaan Header -->
          <div class="mb-6">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h3
                  class="text-lg font-semibold text-gray-800 group-hover:text-[#597BF9] transition-colors"
                >
                  {{ pemeriksaan.nama }}
                </h3>
                <span
                  class="inline-flex items-center mt-1 py-0.5 text-xs font-medium rounded-full text-[#597BF9]"
                >
                  {{ pemeriksaan.cabor }} - {{ pemeriksaan.kategori }}
                </span>
              </div>

              <div class="flex items-center gap-3">
                <!-- Status Badge -->
                <div>
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                    :class="getStatusBadgeClass(pemeriksaan.status)"
                  >
                    {{ pemeriksaan.status }}
                  </span>
                </div>

                <!-- Menu Options -->
                <div v-if="canManagePemeriksaan" class="relative">
                <button
                  @click="
                    activeMenu =
                      activeMenu === pemeriksaan.id ? null : pemeriksaan.id
                  "
                  :data-menu-trigger="pemeriksaan.id"
                  class="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                  :class="{ 'bg-gray-100': activeMenu === pemeriksaan.id }"
                >
                    <svg
                      class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                      />
                    </svg>
                  </button>

                  <!-- Dropdown Menu -->
                  <Teleport to="body">
                    <div
                      v-if="activeMenu === pemeriksaan.id"
                      class="fixed bg-white rounded-xl shadow-xl border border-gray-200 z-[99999] w-48"
                      :style="getDropdownPosition(pemeriksaan.id)"
                    >
                    <div class="py-2">
                      <button
                        @click="
                          () => {
                            activeMenu = null
                            router.push(
                              `/pemeriksaan/${pemeriksaan.id}/kelola-peserta`
                            )
                          }
                        "
                        class="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 cursor-pointer group"
                      >
                        <svg
                          class="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        <span class="font-medium">Kelola Peserta</span>
                      </button>
                      <button
                        @click="
                          () => {
                            activeMenu = null
                            router.push(
                              `/pemeriksaan/${pemeriksaan.id}/parameter`
                            )
                          }
                        "
                        class="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 cursor-pointer group"
                      >
                        <svg
                          class="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        <span class="font-medium">Lihat Parameter</span>
                      </button>
                      <button
                        @click="
                          () => {
                            activeMenu = null
                            router.push(
                              `/pemeriksaan/${pemeriksaan.id}/pemetaan-peserta`
                            )
                          }
                        "
                      class="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                      >
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
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                        <span class="font-medium">Pemetaan Peserta</span>
                      </button>
                      <button
                        @click="
                          () => {
                            activeMenu = null
                            router.push(`/pemeriksaan/edit/${pemeriksaan.id}`)
                          }
                        "
                        class="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 cursor-pointer group"
                      >
                        <svg
                          class="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span class="font-medium">Edit</span>
                      </button>
                      <button
                        @click="
                          () =>
                            handleDeleteClick(pemeriksaan.id, pemeriksaan.nama)
                        "
                        class="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 cursor-pointer group"
                      >
                        <svg
                          class="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span class="font-medium">Hapus</span>
                      </button>
                    </div>
                    </div>
                  </Teleport>
                </div>
              </div>
            </div>

            <!-- Tenaga Pendukung -->
            <div class="mb-3">
              <div class="flex items-center gap-2 text-sm text-gray-600">
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
                <span>Pemeriksa:</span>
                <span>{{ pemeriksaan.tenagaPendukung }}</span>
              </div>
            </div>

            <!-- Peserta -->
            <div class="mb-3">
              <div class="flex items-center gap-2 text-sm text-gray-600">
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
                <span>Peserta:</span>
                <span>{{ pemeriksaan.peserta }}</span>
              </div>
            </div>

            <!-- Tanggal Pemeriksaan -->
            <div class="flex items-center gap-2 text-sm text-gray-600">
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
              <span>{{ formatTanggal(pemeriksaan.tanggal) }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              @click="viewPeserta(pemeriksaan.id)"
              class="flex-1 bg-[#597BF9] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#4c6ef5] transition-colors"
            >
              Peserta
            </button>
            <button
              @click="viewDetail(pemeriksaan.id)"
              class="flex-1 bg-green-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Pemeriksaan
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
          Tidak ada pemeriksaan
        </h3>
        <p class="text-gray-500">
          {{
            hasActiveFilters
              ? 'Coba ubah filter atau hapus semua filter'
              : 'Belum ada pemeriksaan yang tersedia'
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

    <!-- FAB Create Pemeriksaan -->
    <button
      v-if="canManagePemeriksaan"
      @click="router.push('/pemeriksaan/create')"
      class="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#597BF9] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-[#4c6ef5] transition-colors z-50 transform"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>

    <!-- Spacer for bottom navigation -->
    <div class="h-20"></div>

    <!-- Click outside handler for calendar and menu - DISABLED FOR TESTING -->
    <!-- <div
      v-if="showCalendar || activeMenu"
      @click="closeAllDropdowns"
      class="fixed inset-0 z-40"
    ></div> -->

    <!-- Alert Component -->
    <Alert
      :show-alert="showAlert"
      :alert-config="alertConfig"
      @hide="hideAlert"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, Teleport } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import Alert from '~/components/Alert.vue'
import { usePemeriksaan } from '../../../composables/usePemeriksaan'
import { useAuth } from '../../../composables/useAuth'
import { useAlert } from '../../../composables/useAlert'

const router = useRouter()
const { user, initAuth } = useAuth()
const {
  showAlert,
  alertConfig,
  showConfirm,
  hideAlert,
  handleConfirm,
  handleCancel,
} = useAlert()

// Permission check
const canManagePemeriksaan = computed(() => {
  if (!user.value) return false

  const allowedRoles = [1, 11, 37] // Superadmin, Admin, Tenaga Pendukung
  return allowedRoles.includes(user.value.current_role?.id)
})

// Use composable
const {
  caborList,
  loading,
  error,
  currentPage,
  totalPages,
  searchQuery,
  selectedCabor,
  selectedDate,
  filteredPemeriksaan,
  fetchPemeriksaan,
  fetchCaborList,
  fetchPemeriksaanDetail,
  toggleCaborFilter,
  applyDateFilter,
  nextPage,
  prevPage,
  deletePemeriksaan,
} = usePemeriksaan()

// Calendar Filter
const showCalendar = ref(false)

// Menu state
const activeMenu = ref<number | null>(null)

// Helper function untuk format tanggal
const formatTanggal = (tanggalString: string) => {
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

// Computed
const hasActiveFilters = computed(() => {
  return (
    searchQuery.value || selectedCabor.value.length > 0 || selectedDate.value
  )
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
}

// Navigation Functions
const viewPeserta = (id: number) => {
  console.log('View peserta pemeriksaan:', id)
  router.push(`/pemeriksaan/${id}/peserta`)
}

const viewDetail = (id: number) => {
  console.log('View detail pemeriksaan:', id)
  router.push(`/pemeriksaan/${id}`)
}

// Status Badge Classes
const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Sudah':
      return 'bg-green-100 text-green-800 border border-green-200'
    case 'Sebagian':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    case 'Belum':
      return 'bg-red-100 text-red-800 border border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

// Function untuk handle delete
const handleDeleteClick = (pemeriksaanId: number, pemeriksaanName: string) => {
  activeMenu.value = null

  showConfirm({
    title: 'Konfirmasi Hapus',
    message: `Apakah Anda yakin ingin menghapus pemeriksaan "${pemeriksaanName}"?`,
    type: 'warning',
    confirmText: 'Hapus',
    cancelText: 'Batal',
    onConfirm: async () => {
      try {
        await deletePemeriksaan(pemeriksaanId)
        console.log('Pemeriksaan berhasil dihapus')
      } catch (err) {
        console.error('Error deleting pemeriksaan:', err)
      }
    },
  })
}

const closeAllDropdowns = () => {
  showCalendar.value = false
  activeMenu.value = null
}

// Function to get dropdown position
const getDropdownPosition = (pemeriksaanId: number) => {
  const button = document.querySelector(`[data-menu-trigger="${pemeriksaanId}"]`) as HTMLElement
  if (!button) return { top: '100px', right: '20px' }
  
  const rect = button.getBoundingClientRect()
  return {
    top: `${rect.bottom + 8}px`,
    right: `${window.innerWidth - rect.right}px`
  }
}

// Search is now handled by computed property filteredPemeriksaan - no debounce needed for client-side filtering

// Lifecycle
onMounted(async () => {
  initAuth()
  await Promise.all([fetchPemeriksaan(), fetchCaborList()])
})
</script>

<style scoped>
/* Ensure dropdown menu is clickable */
.dropdown-menu {
  pointer-events: auto !important;
  z-index: 9999 !important;
}

/* Force higher z-index for all dropdowns */
[class*='z-'] {
  z-index: 9999 !important;
}

/* Ensure buttons inside dropdown are clickable */
.dropdown-menu button {
  pointer-events: auto !important;
  cursor: pointer !important;
}

/* Hover effects for dropdown items */
.dropdown-menu button:hover {
  background-color: rgba(59, 130, 246, 0.1) !important;
  color: rgb(29, 78, 216) !important;
}

.dropdown-menu button:hover svg {
  transform: scale(1.1) !important;
}
</style>
