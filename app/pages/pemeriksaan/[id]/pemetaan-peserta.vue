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
        <h1 class="text-xl font-semibold text-gray-800">Pemetaan Peserta Pemeriksaan</h1>
      </div>
    </div>

    <!-- Filter Jenis Peserta -->
    <div class="mb-4">
      <div class="relative" style="position: relative; z-index: 9999">
        <div
          @click="toggleJenisPesertaDropdown"
          data-dropdown-trigger="jenis-peserta"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-8 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] hover:shadow-md"
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
                      jenis === opt.value,
                  }"
                >
                  <span>{{ opt.label }}</span>
                  <svg
                    v-if="jenis === opt.value"
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

    <!-- Parameter Header -->
    <div class="bg-white rounded-2xl p-4 shadow-sm mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-2">
        Parameter Pemeriksaan
      </h2>
      <div class="flex flex-wrap gap-2 text-sm">
        <span
          v-for="p in parameters"
          :key="p.id"
          class="px-3 py-1 bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-[#597BF9] rounded-full font-medium"
          >{{ p.nama_parameter }}
          <span class="text-[#597BF9]/70">({{ p.satuan }})</span></span
        >
      </div>
    </div>

    <!-- Loading / Error -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9]"
      ></div>
    </div>
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4"
    >
      <p class="text-red-600 text-sm">{{ error }}</p>
    </div>

    <!-- Peserta List -->
    <div v-else>
      <div v-if="pesertaItems.length > 0" class="space-y-4">
        <div
          v-for="it in pesertaItems"
          :key="it.id"
          class="bg-white rounded-2xl p-4 shadow-sm"
        >
          <!-- Peserta Info -->
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
            >
              <img
                v-if="it.peserta.foto"
                :src="it.peserta.foto"
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
                {{ it.peserta.nama }}
              </h3>
              <div class="text-sm text-gray-500">
                {{ it.peserta.jenis_kelamin }} •
                {{ it.peserta.usia }} tahun
                <span v-if="it.peserta.posisi"
                  >• {{ it.peserta.posisi }}</span
                >
                <span v-if="it.peserta.jenis_pelatih"
                  >• {{ it.peserta.jenis_pelatih }}</span
                >
                <span v-if="it.peserta.jenis_tenaga_pendukung"
                  >• {{ it.peserta.jenis_tenaga_pendukung }}</span
                >
              </div>
            </div>
          </div>

          <!-- Parameters -->
          <div class="space-y-3">
            <div
              v-for="p in parameters"
              :key="p.id"
              class="border border-gray-200 rounded-xl p-3"
            >
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-gray-800">
                  {{ p.nama_parameter }}
                </h4>
                <span class="text-xs text-gray-500">
                  Satuan: {{ p.satuan }}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <!-- Nilai Input -->
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">
                    Nilai
                  </label>
                  <input
                    v-model="getBindingNilai(it.id, p.id).nilai"
                    type="text"
                    :placeholder="`Masukkan nilai dalam ${p.satuan}`"
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
                          it.id,
                          p.id
                        )
                      "
                      :data-dropdown-trigger="`trend-${it.id}-${p.id}`"
                      class="relative cursor-pointer rounded-lg bg-gray-50 px-3 py-2 pr-8 text-sm border border-gray-300 hover:border-[#597BF9] focus:border-[#597BF9]"
                    >
                      <span :class="getTrendColor(getBindingNilai(it.id, p.id).trend)">
                        {{ getTrendLabel(getBindingNilai(it.id, p.id).trend) }}
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
                            `${it.id}-${p.id}`
                          "
                          class="fixed rounded-lg bg-white shadow-lg border border-gray-200 z-[99999] w-32"
                          :style="
                            getTrendDropdownPosition(
                              it.id,
                              p.id
                            )
                          "
                        >
                          <div class="p-1">
                            <div
                              v-for="trend in trendOptions"
                              :key="trend.value"
                              @click="
                                selectTrend(
                                  it.id,
                                  p.id,
                                  trend.value
                                )
                              "
                              class="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                              :class="[
                                getTrendColor(trend.value),
                                { 'bg-gray-100': getBindingNilai(it.id, p.id).trend === trend.value }
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
          pemeriksaan ini.
        </p>
      </div>

      <!-- Action Buttons -->
      <div v-if="pesertaItems.length > 0" class="flex gap-3 pt-6">
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { usePemeriksaanParameterMapping } from '../../../../composables/usePemeriksaanParameterMapping'

const route = useRoute()
const router = useRouter()
const pemeriksaanId = computed(() => parseInt(route.params.id as string))

const {
  loading,
  error,
  parameters,
  pesertaItems,
  fetchParameters,
  fetchPesertaWithParameters,
  bulkUpdate,
} = usePemeriksaanParameterMapping()

const jenis = ref<'atlet' | 'pelatih' | 'tenaga-pendukung'>('atlet')
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
  { value: 'stabil', label: 'Stabil' },
  { value: 'kenaikan', label: 'Kenaikan' },
  { value: 'penurunan', label: 'Penurunan' },
]

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'kenaikan':
      return 'text-red-600 font-medium'
    case 'stabil':
      return 'text-green-600 font-medium'
    case 'penurunan':
      return 'text-purple-600 font-medium'
    default:
      return 'text-gray-600'
  }
}

const getTrendLabel = (trend: string) => {
  return trendOptions.find((opt) => opt.value === trend)?.label || 'Stabil'
}

// Computed
const selectedJenisPesertaLabel = computed(() => {
  return (
    jenisPesertaOptions.find((opt) => opt.value === jenis.value)
      ?.label || 'Atlet'
  )
})

// Dropdown methods
const toggleJenisPesertaDropdown = () => {
  isJenisPesertaDropdownOpen.value = !isJenisPesertaDropdownOpen.value
  activeTrendDropdown.value = null
}

const selectJenisPeserta = async (value: string) => {
  jenis.value = value as 'atlet' | 'pelatih' | 'tenaga-pendukung'
  isJenisPesertaDropdownOpen.value = false
  await fetchPesertaWithParameters(pemeriksaanId.value, jenis.value)
  rebuildLocalModel()
}

const toggleTrendDropdown = (pesertaId: number, parameterId: number) => {
  const key = `${pesertaId}-${parameterId}`
  activeTrendDropdown.value = activeTrendDropdown.value === key ? null : key
  isJenisPesertaDropdownOpen.value = false
}

const selectTrend = (pesertaId: number, parameterId: number, trend: string) => {
  const k = keyFor(pesertaId, parameterId)
  if (!localMap.value[k]) localMap.value[k] = { nilai: '', trend: 'stabil' }
  localMap.value[k].trend = trend as 'stabil' | 'kenaikan' | 'penurunan'
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

const getTrendDropdownPosition = (pesertaId: number, parameterId: number) => {
  const el = document.querySelector(
    `[data-dropdown-trigger="trend-${pesertaId}-${parameterId}"]`
  ) as HTMLElement | null
  if (!el) return { top: '100px', left: '20px' }
  const r = el.getBoundingClientRect()
  return { top: `${r.bottom + 8}px`, left: `${r.left}px` }
}

// Model lokal untuk nilai input agar two-way binding tidak merusak data asli
// Map key: `${pemeriksaan_peserta_id}-${parameter_id}`
const localMap = ref<
  Record<string, { nilai: string; trend: 'stabil' | 'kenaikan' | 'penurunan' }>
>({})

const keyFor = (ppId: number, paramId: number) => `${ppId}-${paramId}`

const rebuildLocalModel = () => {
  const m: Record<
    string,
    { nilai: string; trend: 'stabil' | 'kenaikan' | 'penurunan' }
  > = {}
  for (const it of pesertaItems.value) {
    for (const p of parameters.value) {
      const existing = it.parameters.find((x) => x.parameter_id === p.id)
      m[keyFor(it.id, p.id)] = {
        nilai: (existing?.nilai ?? '').toString(),
        trend: (existing?.trend as any) || 'stabil',
      }
    }
  }
  localMap.value = m
}

const getBindingNilai = (ppId: number, paramId: number) => {
  const k = keyFor(ppId, paramId)
  if (!localMap.value[k]) localMap.value[k] = { nilai: '', trend: 'stabil' }
  return localMap.value[k]
}

const saveChanges = async () => {
  try {
    saving.value = true
    // Susun payload per peserta
    const payload: Array<{
      peserta_id: number
      status: number | null
      catatan: string | null
      parameters: Array<{
        parameter_id: number
        nilai: string
        trend: 'stabil' | 'kenaikan' | 'penurunan'
      }>
    }> = []
    for (const it of pesertaItems.value) {
      const params: Array<{
        parameter_id: number
        nilai: string
        trend: 'stabil' | 'kenaikan' | 'penurunan'
      }> = []
      for (const p of parameters.value) {
        const v = localMap.value[keyFor(it.id, p.id)] || {
          nilai: '',
          trend: 'stabil',
        }
        params.push({
          parameter_id: p.id,
          nilai: (v.nilai ?? '').toString(),
          trend: v.trend,
        })
      }
      payload.push({
        peserta_id: it.id,
        status: it.ref_status_pemeriksaan_id ?? null,
        catatan: it.catatan_umum ?? null,
        parameters: params,
      })
    }
    const ok = await bulkUpdate(pemeriksaanId.value, payload)
    if (ok) {
      await Promise.all([
        fetchParameters(pemeriksaanId.value),
        fetchPesertaWithParameters(pemeriksaanId.value, jenis.value),
      ])
      rebuildLocalModel()
    }
  } finally {
    saving.value = false
  }
}

// Close dropdowns on click outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('[data-dropdown-trigger]')) {
    isJenisPesertaDropdownOpen.value = false
    activeTrendDropdown.value = null
  }
}

onMounted(async () => {
  await fetchParameters(pemeriksaanId.value)
  await fetchPesertaWithParameters(pemeriksaanId.value, jenis.value)
  rebuildLocalModel()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
