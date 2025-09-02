<template>
  <PageLayout>
    <!-- Loading State -->
    <div v-if="detailLoading" class="flex justify-center items-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9]"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="detailError"
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
          <p class="text-red-600 text-sm font-medium">{{ detailError }}</p>
        </div>
      </div>
      <div class="mt-3">
        <button
          @click="fetchParameterDetail(parameterId)"
          class="px-3 py-1 text-red-700 underline text-sm hover:text-red-800"
        >
          Coba lagi
        </button>
      </div>
    </div>

    <!-- Content -->
    <div v-else>
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
          <div class="flex-1">
            <h1 class="text-xl font-bold text-gray-700">Detail Parameter</h1>
          </div>
        </div>
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
        <!-- Tab: Atlet -->
        <div v-if="activeTab === 'atlet'" class="space-y-3">
          <div
            v-for="peserta in filteredAtlet"
            :key="peserta.id"
            class="relative bg-white/90 rounded-2xl p-4 backdrop-blur"
          >
            <!-- Status Badge (pojok kanan atas) -->
            <div class="absolute top-2 right-3">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                :class="getStatusClass(peserta.status)"
              >
                {{ peserta.status }}
              </span>
            </div>

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
                    class="w-full h-full object-cover"
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

                <!-- Badge Posisi -->
                <div class="mb-2">
                  <span
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ peserta.posisi }}
                  </span>
                </div>

                <!-- Nilai -->
                <div class="mt-3">
                  <p class="text-sm text-gray-500">
                    Nilai:
                    <span class="font-medium text-gray-700"
                      >{{ peserta.nilai }} {{ parameterDetail?.satuan }}</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab: Pelatih -->
        <div v-else-if="activeTab === 'pelatih'" class="space-y-3">
          <div
            v-for="peserta in filteredPelatih"
            :key="peserta.id"
            class="relative bg-white/90 rounded-2xl p-4 backdrop-blur"
          >
            <!-- Status Badge (pojok kanan atas) -->
            <div class="absolute top-2 right-3">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                :class="getStatusClass(peserta.status)"
              >
                {{ peserta.status }}
              </span>
            </div>

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
                    class="w-full h-full object-cover"
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

                <!-- Badge Jenis Pelatih -->
                <div class="mb-2">
                  <span
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {{ peserta.jenisPelatih }}
                  </span>
                </div>

                <!-- Nilai -->
                <div class="mt-3">
                  <p class="text-sm text-gray-500">
                    Nilai:
                    <span class="font-medium text-gray-700"
                      >{{ peserta.nilai }} {{ parameterDetail?.satuan }}</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab: Tenaga Pendukung -->
        <div v-else-if="activeTab === 'tenaga-pendukung'" class="space-y-3">
          <div
            v-for="peserta in filteredTenagaPendukung"
            :key="peserta.id"
            class="relative bg-white/90 rounded-2xl p-4 backdrop-blur"
          >
            <!-- Status Badge (pojok kanan atas) -->
            <div class="absolute top-2 right-3">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                :class="getStatusClass(peserta.status)"
              >
                {{ peserta.status }}
              </span>
            </div>

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
                    class="w-full h-full object-cover"
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

                <!-- Badge Jenis Tenaga Pendukung -->
                <div class="mb-2">
                  <span
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                  >
                    {{ peserta.jenisTenagaPendukung }}
                  </span>
                </div>

                <!-- Nilai -->
                <div class="mt-3">
                  <p class="text-sm text-gray-500">
                    Nilai:
                    <span class="font-medium text-gray-700"
                      >{{ peserta.nilai }} {{ parameterDetail?.satuan }}</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="
            !detailLoading &&
            atlet.length === 0 &&
            pelatih.length === 0 &&
            tenagaPendukung.length === 0
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Tidak ada peserta
          </h3>
          <p class="text-gray-500">
            Belum ada peserta yang diperiksa untuk parameter ini
          </p>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9] mx-auto"
          ></div>
          <p class="text-gray-500 mt-2">Memuat data peserta...</p>
        </div>
      </div>

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

      <div class="h-20"></div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { useParameterPemeriksaan } from '../../../../../../composables/useParameterPemeriksaan'
import { useAuth } from '../../../../../..//composables/useAuth'

const route = useRoute()
const { initAuth } = useAuth()

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

// Use composable
const {
  parameterDetail,
  atlet,
  pelatih,
  tenagaPendukung,
  detailLoading,
  detailError,
  fetchParameterDetail,
  filteredAtlet,
  filteredPelatih,
  filteredTenagaPendukung,
} = useParameterPemeriksaan(pemeriksaanId)

// Tab Management
const activeTab = ref('atlet')
const tabs = computed(() => [
  { id: 'atlet', label: `Atlet (${filteredAtlet.value.length})` },
  { id: 'pelatih', label: `Pelatih (${filteredPelatih.value.length})` },
  {
    id: 'tenaga-pendukung',
    label: `Pendukung (${filteredTenagaPendukung.value.length})`,
  },
])

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

// Functions

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

onMounted(async () => {
  initAuth()
  await fetchParameterDetail(parameterId)
  console.log(
    'Parameter detail page loaded for Pemeriksaan ID:',
    pemeriksaanId,
    'Parameter ID:',
    parameterId
  )
})
</script>
