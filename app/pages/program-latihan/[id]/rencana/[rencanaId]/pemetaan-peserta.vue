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
        <h1 class="text-xl font-semibold text-gray-700">Pemetaan Peserta</h1>
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
    </div>

    <!-- Content -->
    <div v-else-if="mappingData">
      <!-- Rencana Info -->
      <div class="mb-6 bg-white rounded-2xl p-4 shadow-sm">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">
          {{ mappingData.rencana_latihan.materi }}
        </h2>
        <div class="text-sm text-gray-600 space-y-1">
          <div class="flex items-center gap-2">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{{ formatDate(mappingData.rencana_latihan.tanggal) }}</span>
          </div>
          <div class="flex items-center gap-2">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{{ mappingData.rencana_latihan.lokasi_latihan }}</span>
          </div>
        </div>
      </div>

      <!-- Filter Jenis Peserta -->
      <div class="mb-4">
        <div class="relative" style="position: relative; z-index: 9999">
          <div
            @click="toggleJenisPesertaDropdown"
            data-dropdown-trigger="jenis-peserta"
            class="relative cursor-pointer rounded-xl bg-white px-4 py-3 pr-8 text-sm font-semibold text-gray-700 focus:border-[#597BF9] hover:shadow-md"
          >
            <span>{{ selectedJenisPesertaLabel }}</span>
            <div
              class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
            >
              <svg
                class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
                :class="{ 'rotate-180': isJenisPesertaDropdownOpen }"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <Teleport to="body">
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="isJenisPesertaDropdownOpen"
                class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99999] w-56"
                :style="getJenisPesertaDropdownPosition()"
              >
                <div class="p-1">
                  <div
                    v-for="opt in jenisPesertaOptions"
                    :key="opt.value"
                    @click="selectJenisPeserta(opt.value)"
                    class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer"
                    :class="{
                      'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                        jenisPeserta === opt.value,
                    }"
                  >
                    <span>{{ opt.label }}</span>
                    <svg
                      v-if="jenisPeserta === opt.value"
                      class="ml-auto h-4 w-4 text-[#597BF9]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </transition>
          </Teleport>
        </div>
      </div>

      <!-- Participants List -->
      <div v-if="filteredPesertaList.length > 0" class="space-y-4">
        <div
          v-for="peserta in filteredPesertaList"
          :key="peserta.peserta_id"
          class="bg-white rounded-2xl p-4 shadow-sm"
        >
          <!-- Participant Info -->
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
            >
              <img
                v-if="peserta.peserta.foto"
                :src="peserta.peserta.foto"
                class="w-full h-full object-cover"
              />
              <svg
                v-else
                class="w-6 h-6 text-gray-400"
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
            <div>
              <h3 class="font-semibold text-gray-800">
                {{ peserta.peserta.nama }}
              </h3>
              <div class="text-sm text-gray-500">
                {{ peserta.peserta.jenis_kelamin }} •
                {{ peserta.peserta.usia }} tahun
                <span v-if="peserta.peserta.posisi"
                  >• {{ peserta.peserta.posisi }}</span
                >
                <span v-if="peserta.peserta.jenis_pelatih"
                  >• {{ peserta.peserta.jenis_pelatih }}</span
                >
                <span v-if="peserta.peserta.jenis_tenaga_pendukung"
                  >• {{ peserta.peserta.jenis_tenaga_pendukung }}</span
                >
              </div>
            </div>
          </div>

          <!-- Targets -->
          <div class="space-y-3">
            <div
              v-for="target in peserta.targets"
              :key="target.target_latihan_id"
              class="border border-gray-200 rounded-xl p-3"
            >
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-gray-800">
                  {{ target.deskripsi }}
                </h4>
                <span class="text-xs text-gray-500">
                  Target: {{ target.nilai_target }} {{ target.satuan }}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <!-- Nilai Input -->
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">
                    Nilai
                  </label>
                  <input
                    v-model="target.nilai"
                    type="text"
                    :placeholder="`Masukkan nilai dalam ${target.satuan}`"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
                  />
                </div>

                <!-- Trend Dropdown -->
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">
                    Trend
                  </label>
                  <div class="relative">
                    <div
                      @click="
                        toggleTrendDropdown(
                          peserta.peserta_id,
                          target.target_latihan_id
                        )
                      "
                      :data-dropdown-trigger="`trend-${peserta.peserta_id}-${target.target_latihan_id}`"
                      class="relative cursor-pointer rounded-lg bg-gray-50 px-3 py-2 pr-8 text-sm border border-gray-300 hover:border-[#597BF9] focus:border-[#597BF9]"
                    >
  <span :class="getTrendColor(target.trend)">
    {{ getTrendLabel(target.trend) }}
  </span>
                      <div
                        class="pointer-events-none absolute inset-y-0 right-2 flex items-center"
                      >
                        <svg
                          class="h-4 w-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    <Teleport to="body">
                      <transition
                        enter-active-class="transition duration-200 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-150 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                      >
                        <div
                          v-if="
                            activeTrendDropdown ===
                            `${peserta.peserta_id}-${target.target_latihan_id}`
                          "
                          class="fixed rounded-lg bg-white shadow-lg border border-gray-200 z-[99999] w-32"
                          :style="
                            getTrendDropdownPosition(
                              peserta.peserta_id,
                              target.target_latihan_id
                            )
                          "
                        >
                          <div class="p-1">
                            <div
                              v-for="trend in trendOptions"
                              :key="trend.value"
                              @click="
                                selectTrend(
                                  peserta.peserta_id,
                                  target.target_latihan_id,
                                  trend.value
                                )
                              "
                              class="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
  :class="[
    getTrendColor(trend.value),
    { 'bg-gray-100': target.trend === trend.value }
  ]"
                            >
                              {{ trend.label }}
                            </div>
                          </div>
                        </div>
                      </transition>
                    </Teleport>
                  </div>
                </div>
              </div>
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Tidak ada peserta
        </h3>
        <p class="text-gray-500">
          Belum ada peserta {{ selectedJenisPesertaLabel.toLowerCase() }} dalam
          rencana latihan ini.
        </p>
      </div>

      <!-- Action Buttons -->
      <div v-if="filteredPesertaList.length > 0" class="flex gap-3 pt-6">
        <button
          @click="$router.back()"
          class="flex-1 px-6 py-3 text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
        >
          Batal
        </button>
        <button
          @click="saveChanges"
          :disabled="saving"
          class="flex-1 px-6 py-3 bg-gradient-to-r from-[#597BF9] to-[#4c6ef5] text-white rounded-xl font-semibold hover:from-[#4c6ef5] hover:to-[#3b5bdb] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="saving" class="flex items-center justify-center">
            <div
              class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
            ></div>
            Menyimpan...
          </span>
          <span v-else>Simpan Perubahan</span>
        </button>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { useTargetMapping } from '../../../../../../composables/useTargetMapping'

const router = useRouter()
const route = useRoute()
const rencanaId = computed(() => parseInt(route.params.rencanaId as string))

const {
  loading,
  error,
  fetchParticipantMapping,
  bulkUpdateParticipantTargets,
} = useTargetMapping()

// State
const mappingData = ref<any>(null)
const jenisPeserta = ref('atlet')
const saving = ref(false)

// Dropdown state
const isJenisPesertaDropdownOpen = ref(false)
const activeTrendDropdown = ref<string | null>(null)

// Options
const jenisPesertaOptions = [
  { value: 'atlet', label: 'Atlet' },
  { value: 'pelatih', label: 'Pelatih' },
  { value: 'tenaga-pendukung', label: 'Tenaga Pendukung' },
]

const trendOptions = [
  { value: 'naik', label: 'Naik' },
  { value: 'stabil', label: 'Stabil' },
  { value: 'turun', label: 'Turun' },
]

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'naik':
      return 'text-green-600 font-medium'
    case 'stabil':
      return 'text-blue-600 font-medium'
    case 'turun':
      return 'text-red-600 font-medium'
    default:
      return 'text-gray-600'
  }
}


// Computed
const selectedJenisPesertaLabel = computed(() => {
  return (
    jenisPesertaOptions.find((opt) => opt.value === jenisPeserta.value)
      ?.label || 'Atlet'
  )
})

const filteredPesertaList = computed(() => {
  if (!mappingData.value) return []
  // Backend sudah memfilter target: hanya individu dan sesuai peruntukan
  // Kita gunakan langsung data dari API tanpa filter tambahan di frontend
  return mappingData.value.peserta_list || []
})

// Methods
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getTrendLabel = (trend: string) => {
  return trendOptions.find((opt) => opt.value === trend)?.label || 'Stabil'
}

// Dropdown methods
const toggleJenisPesertaDropdown = () => {
  isJenisPesertaDropdownOpen.value = !isJenisPesertaDropdownOpen.value
  activeTrendDropdown.value = null
}

const selectJenisPeserta = async (value: string) => {
  jenisPeserta.value = value
  isJenisPesertaDropdownOpen.value = false
  await loadData()
}

const toggleTrendDropdown = (pesertaId: number, targetId: number) => {
  const key = `${pesertaId}-${targetId}`
  activeTrendDropdown.value = activeTrendDropdown.value === key ? null : key
  isJenisPesertaDropdownOpen.value = false
}

const selectTrend = (pesertaId: number, targetId: number, trend: string) => {
  // Find and update the target
  const peserta = filteredPesertaList.value.find(
    (p: any) => p.peserta_id === pesertaId
  )
  if (peserta) {
    const target = peserta.targets.find(
      (t: any) => t.target_latihan_id === targetId
    )
    if (target) {
      target.trend = trend
    }
  }
  activeTrendDropdown.value = null
}

// Position methods
const getJenisPesertaDropdownPosition = () => {
  const el = document.querySelector(
    '[data-dropdown-trigger="jenis-peserta"]'
  ) as HTMLElement | null
  if (!el) return { top: '100px', left: '20px' }
  const r = el.getBoundingClientRect()
  return { top: `${r.bottom + 8}px`, left: `${r.left}px` }
}

const getTrendDropdownPosition = (pesertaId: number, targetId: number) => {
  const el = document.querySelector(
    `[data-dropdown-trigger="trend-${pesertaId}-${targetId}"]`
  ) as HTMLElement | null
  if (!el) return { top: '100px', left: '20px' }
  const r = el.getBoundingClientRect()
  return { top: `${r.bottom + 8}px`, left: `${r.left}px` }
}

// Load data
const loadData = async () => {
  try {
    const data = await fetchParticipantMapping(
      rencanaId.value,
      jenisPeserta.value
    )
    if (data) {
      mappingData.value = data
    }
  } catch (err) {
    console.error('Error loading data:', err)
  }
}

// Save changes
const saveChanges = async () => {
  if (!mappingData.value) return

  try {
    saving.value = true

    const updateData: Array<{
      peserta_id: number
      target_latihan_id: number
      nilai: string
      trend: 'naik' | 'stabil' | 'turun'
    }> = []

    for (const peserta of filteredPesertaList.value) {
      for (const target of peserta.targets) {
        updateData.push({
          peserta_id: Number(peserta.peserta_id),
          target_latihan_id: Number(target.target_latihan_id),
          nilai: (target.nilai ?? '').toString(),
          trend: (target.trend || 'stabil') as 'naik' | 'stabil' | 'turun',
        })
      }
    }

    const ok = await bulkUpdateParticipantTargets(rencanaId.value, updateData)
    console.log('bulkUpdateParticipantTargets result:', ok, updateData)

    // Refetch to verify persisted values
    await loadData()
  } catch (err) {
    console.error('Error saving changes:', err)
  } finally {
    saving.value = false
  }
}

// Watch for jenis peserta changes
watch(jenisPeserta, () => {
  loadData()
})

// Close dropdowns on click outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('[data-dropdown-trigger]')) {
    isJenisPesertaDropdownOpen.value = false
    activeTrendDropdown.value = null
  }
}

onMounted(async () => {
  await loadData()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
