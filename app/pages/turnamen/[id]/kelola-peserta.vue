<template>
  <PageLayout>
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-2">
        <button
          @click="$router.back()"
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            class="w-5 h-5 text-gray-600"
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
        <div>
          <h1 class="text-xl font-semibold text-gray-800">
            Kelola Peserta Turnamen
          </h1>
          <p v-if="turnamenInfo" class="text-sm text-gray-600">
            {{ turnamenInfo.nama }}
          </p>
        </div>
      </div>
    </div>

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
          @click="loadPeserta"
          class="px-3 py-1 text-red-700 underline text-sm hover:text-red-800"
        >
          Coba lagi
        </button>
      </div>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Filter Tabs -->
      <div class="mb-6">
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="switchTab(tab.key as any)"
            class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="
              activeTab === tab.key
                ? 'bg-[#597BF9] text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            "
          >
            {{ tab.label }} ({{ getTabCount(tab.key) }})
          </button>
        </div>
      </div>

      <!-- Peserta List -->
      <div v-if="getCurrentPesertaList().length > 0" class="space-y-4">
        <div
          v-for="peserta in getCurrentPesertaList()"
          :key="peserta.id"
          class="group rounded-2xl bg-white/90 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1"
        >
          <div class="flex items-center gap-4">
            <!-- Avatar -->
            <div class="flex-shrink-0">
              <div
                v-if="peserta.foto"
                class="w-12 h-12 rounded-full bg-cover bg-center"
                :style="{ backgroundImage: `url(${peserta.foto})` }"
              ></div>
              <div
                v-else
                class="w-12 h-12 rounded-full bg-gradient-to-br from-[#597BF9]/20 to-[#4c6ef5]/30 flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-[#597BF9]"
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

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-gray-800 truncate">
                {{ peserta.nama }}
              </h3>
              <div class="flex items-center gap-4 mt-1 text-xs text-gray-600">
                <span>{{ peserta.jenisKelamin }}</span>
                <span v-if="peserta.posisi">{{ peserta.posisi }}</span>
                <span v-else-if="peserta.jenisPelatih">{{ peserta.jenisPelatih }}</span>
                <span v-else-if="peserta.jenisTenagaPendukung">{{ peserta.jenisTenagaPendukung }}</span>
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex-shrink-0">
              <button
                @click="removePeserta(peserta.id, activeTab)"
                class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus peserta"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Belum ada peserta {{ getCurrentTabLabel() }}
        </h3>
        <p class="text-gray-500 mb-4">
          Klik tombol "Tambah Peserta" untuk menambahkan peserta turnamen.
        </p>
      </div>

      <!-- FAB Add Peserta -->
      <button
        @click="openAddPesertaModal"
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
    </div>

    <!-- Add Peserta Modal -->
    <div
      v-if="showAddPesertaModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showAddPesertaModal = false"
    >
      <div class="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        <!-- Modal Header -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-800">
              Tambah Peserta {{ getCurrentTabLabel() }}
            </h2>
            <button
              @click="showAddPesertaModal = false"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                class="w-5 h-5 text-gray-500"
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
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <!-- Search -->
          <div class="mb-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari peserta..."
              class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 placeholder:text-gray-500 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] focus:outline-none transition-all duration-200"
            />
          </div>

          <!-- Loading State -->
          <div v-if="availableLoading" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9]"></div>
          </div>

          <!-- Error State -->
          <div v-else-if="availableError" class="text-center py-8">
            <div class="text-red-400 mb-2">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <p class="text-red-600 text-sm mb-4">{{ availableError }}</p>
            <button
              @click="loadAvailablePeserta"
              class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>

          <!-- Peserta List -->
          <div v-else class="max-h-60 overflow-y-auto space-y-2">
            <div
              v-for="peserta in getAvailablePesertaList()"
              :key="peserta.id"
              @click="addPeserta(peserta.id)"
              class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div class="flex-shrink-0">
                <div
                  v-if="peserta.foto"
                  class="w-10 h-10 rounded-full bg-cover bg-center"
                  :style="{ backgroundImage: `url(${peserta.foto})` }"
                ></div>
                <div
                  v-else
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-[#597BF9]/20 to-[#4c6ef5]/30 flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-[#597BF9]"
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
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-semibold text-gray-800 truncate">
                  {{ peserta.nama }}
                </h3>
                <p class="text-xs text-gray-600">
                  {{ peserta.jenisKelamin }} • {{ peserta.usia }} tahun
                </p>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="getAvailablePesertaList().length === 0" class="text-center py-8">
            <div class="text-gray-400 mb-2">
              <svg
                class="mx-auto h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <p class="text-sm text-gray-500">
              {{
                searchQuery
                  ? 'Tidak ada peserta yang sesuai dengan pencarian'
                  : 'Tidak ada peserta tersedia'
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { useAuth } from '../../../../composables/useAuth'
import { usePesertaTurnamenCrud } from '../../../../composables/usePesertaTurnamenCrud'

const route = useRoute()
const turnamenId = computed(() => parseInt(route.params.id as string))

// Initialize auth
const { initAuth } = useAuth()

// Use composable
const {
  turnamenInfo,
  atletList,
  pelatihList,
  tenagaPendukungList,
  loading,
  error,
  availableLoading,
  availableError,
  fetchPeserta,
  addPesertaToTurnamen,
  removePesertaFromTurnamen,
  fetchAvailablePeserta,
} = usePesertaTurnamenCrud(turnamenId.value)

// Local state
const activeTab = ref<'atlet' | 'pelatih' | 'tenaga-pendukung'>('atlet')
const showAddPesertaModal = ref(false)
const searchQuery = ref('')
const availablePesertaList = ref<any[]>([])

// Tabs configuration
const tabs = [
  { key: 'atlet', label: 'Atlet' },
  { key: 'pelatih', label: 'Pelatih' },
  { key: 'tenaga-pendukung', label: 'Tenaga Pendukung' },
]

// Computed
const getTabCount = (tabKey: string) => {
  switch (tabKey) {
    case 'atlet':
      return atletList.value.length
    case 'pelatih':
      return pelatihList.value.length
    case 'tenaga-pendukung':
      return tenagaPendukungList.value.length
    default:
      return 0
  }
}

const getCurrentTabLabel = () => {
  const tab = tabs.find((t) => t.key === activeTab.value)
  return tab?.label || 'Peserta'
}

const getCurrentPesertaList = () => {
  switch (activeTab.value) {
    case 'atlet':
      return atletList.value
    case 'pelatih':
      return pelatihList.value
    case 'tenaga-pendukung':
      return tenagaPendukungList.value
    default:
      return []
  }
}

const getAvailablePesertaList = () => {
  // This will be populated when modal is opened
  return availablePesertaList.value
}

// Methods
const loadPeserta = async () => {
  try {
    await fetchPeserta()
  } catch (err) {
    console.error('Error loading peserta:', err)
  }
}

const addPeserta = async (pesertaId: number) => {
  try {
    await addPesertaToTurnamen(pesertaId, activeTab.value)
    showAddPesertaModal.value = false
    searchQuery.value = ''
    availablePesertaList.value = []
  } catch (err) {
    console.error('Error adding peserta:', err)
    // Error handling is already done in the composable
  }
}

const openAddPesertaModal = async () => {
  showAddPesertaModal.value = true
  await loadAvailablePeserta()
}

const switchTab = async (tab: 'atlet' | 'pelatih' | 'tenaga-pendukung') => {
  activeTab.value = tab
  if (showAddPesertaModal.value) {
    await loadAvailablePeserta()
  }
}

const loadAvailablePeserta = async () => {
  try {
    const data = await fetchAvailablePeserta(activeTab.value, searchQuery.value)
    availablePesertaList.value = data || []
  } catch (err) {
    console.error('Error loading available peserta:', err)
    availablePesertaList.value = []
  }
}

const removePeserta = async (pesertaId: number, type: string) => {
  try {
    await removePesertaFromTurnamen(pesertaId, type as any)
  } catch (err) {
    console.error('Error removing peserta:', err)
  }
}

// Watch search query
watch(searchQuery, async () => {
  if (showAddPesertaModal.value) {
    await loadAvailablePeserta()
  }
})

// Lifecycle
onMounted(async () => {
  initAuth()
  await loadPeserta()
})
</script>

<style scoped>
/* Custom scrollbar for modal content */
.max-h-60::-webkit-scrollbar {
  width: 6px;
}

.max-h-60::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.max-h-60::-webkit-scrollbar-thumb {
  background: rgba(89, 123, 249, 0.3);
  border-radius: 10px;
}

.max-h-60::-webkit-scrollbar-thumb:hover {
  background: rgba(89, 123, 249, 0.5);
}
</style>
