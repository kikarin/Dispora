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
        <h1 class="text-xl font-semibold text-gray-800">Pemetaan Kelompok</h1>
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
      <!-- Program Info -->
      <div class="mb-6 bg-white rounded-2xl p-4 shadow-sm">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">
          {{ mappingData.program_latihan.nama_program }}
        </h2>
        <div class="text-sm text-gray-600">
          {{ mappingData.program_latihan.cabor_nama }} -
          {{ mappingData.program_latihan.cabor_kategori_nama }}
        </div>
      </div>

      <!-- Rencana List -->
      <div v-if="mappingData.rencana_latihan_list.length > 0" class="space-y-4">
        <div
          v-for="rencana in mappingData.rencana_latihan_list"
          :key="rencana.rencana_id"
          class="bg-white rounded-2xl p-4 shadow-sm"
        >
          <!-- Rencana Header -->
          <div class="mb-4">
            <h3 class="font-semibold text-gray-800 mb-2">
              {{ rencana.materi }}
            </h3>
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
                <span>{{ formatDate(rencana.tanggal) }}</span>
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
                <span>{{ rencana.lokasi_latihan }}</span>
              </div>
            </div>
          </div>

          <!-- Targets -->
          <div v-if="rencana.targets.length > 0" class="space-y-3">
            <div
              v-for="target in rencana.targets"
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
                          rencana.rencana_id,
                          target.target_latihan_id
                        )
                      "
                      :data-dropdown-trigger="`trend-${rencana.rencana_id}-${target.target_latihan_id}`"
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
                            `${rencana.rencana_id}-${target.target_latihan_id}`
                          "
                          class="fixed rounded-lg bg-white shadow-lg border border-gray-200 z-[99999] w-32"
                          :style="
                            getTrendDropdownPosition(
                              rencana.rencana_id,
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
      rencana.rencana_id,
      target.target_latihan_id,
      trend.value
    )
  "
  class="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer rounded"
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

          <!-- Empty targets -->
          <div v-else class="text-center py-6 text-gray-500">
            <svg
              class="mx-auto h-8 w-8 text-gray-400 mb-2"
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
            <p class="text-sm">Tidak ada target kelompok untuk rencana ini</p>
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
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Tidak ada rencana latihan
        </h3>
        <p class="text-gray-500">
          Belum ada rencana latihan dengan target kelompok dalam program ini.
        </p>
      </div>

      <!-- Action Buttons -->
      <div
        v-if="mappingData.rencana_latihan_list.length > 0"
        class="flex gap-3 pt-6"
      >
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
          <span v-else>Simpan</span>
        </button>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { useTargetMapping } from '../../../../composables/useTargetMapping'

const router = useRouter()
const route = useRoute()
const programId = computed(() => parseInt(route.params.id as string))

const { loading, error, fetchGroupMapping, bulkUpdateGroupTargets } =
  useTargetMapping()

// State
const mappingData = ref<any>(null)
const saving = ref(false)

// Dropdown state
const activeTrendDropdown = ref<string | null>(null)

// Options
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
const toggleTrendDropdown = (rencanaId: number, targetId: number) => {
  const key = `${rencanaId}-${targetId}`
  activeTrendDropdown.value = activeTrendDropdown.value === key ? null : key
}

const selectTrend = (rencanaId: number, targetId: number, trend: string) => {
  // Find and update the target
  if (mappingData.value) {
    const rencana = mappingData.value.rencana_latihan_list.find(
      (r: any) => r.rencana_id === rencanaId
    )
    if (rencana) {
      const target = rencana.targets.find(
        (t: any) => t.target_latihan_id === targetId
      )
      if (target) {
        target.trend = trend
      }
    }
  }
  activeTrendDropdown.value = null
}

// Position methods
const getTrendDropdownPosition = (rencanaId: number, targetId: number) => {
  const el = document.querySelector(
    `[data-dropdown-trigger="trend-${rencanaId}-${targetId}"]`
  ) as HTMLElement | null
  if (!el) return { top: '100px', left: '20px' }
  const r = el.getBoundingClientRect()
  return { top: `${r.bottom + 8}px`, left: `${r.left}px` }
}

// Load data
const loadData = async () => {
  try {
    const data = await fetchGroupMapping(programId.value)
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

    // Prepare data for bulk update
    const updateData: Array<{
      rencana_latihan_id: number
      target_latihan_id: number
      nilai: string
      trend: 'naik' | 'stabil' | 'turun'
    }> = []

    for (const rencana of mappingData.value.rencana_latihan_list) {
      for (const target of rencana.targets) {
        updateData.push({
          rencana_latihan_id: rencana.rencana_id,
          target_latihan_id: target.target_latihan_id,
          nilai: target.nilai || '',
          trend: target.trend,
        })
      }
    }

    await bulkUpdateGroupTargets(programId.value, updateData)

    // Show success message or redirect
    router.back()
  } catch (err) {
    console.error('Error saving changes:', err)
  } finally {
    saving.value = false
  }
}

// Close dropdowns on click outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('[data-dropdown-trigger]')) {
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
