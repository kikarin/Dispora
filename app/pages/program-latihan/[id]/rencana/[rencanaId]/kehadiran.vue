<template>
  <PageLayout>
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
        <h1 class="text-xl font-semibold text-gray-700">Kelola Kehadiran</h1>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9]"
      ></div>
    </div>
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

    <div v-else class="space-y-6">
      <div class="bg-white rounded-2xl p-4 shadow-sm">
        <div class="mb-3">
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="opt in jenisPesertaOptions"
              :key="opt.value"
              @click="selectJenisPeserta(opt.value)"
              class="py-2 rounded-lg text-sm font-medium"
              :class="
                jenisPeserta === opt.value
                  ? 'bg-[#597BF9] text-white'
                  : 'bg-gray-100 text-gray-700'
              "
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1"
            >Kehadiran</label
          >
          <div class="relative" style="position: relative; z-index: 9999">
            <div
              @click="toggleKehadiranDropdown"
              data-dropdown-trigger="kehadiran-select"
              class="relative cursor-pointer rounded-xl bg-white px-4 py-3 pr-8 text-sm font-semibold text-gray-700 border border-gray-300 hover:shadow-md"
            >
              <span>{{ kehadiranLabel }}</span>
              <div
                class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
              >
                <svg
                  class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
                  :class="{ 'rotate-180': isKehadiranDropdownOpen }"
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
                  v-if="isKehadiranDropdownOpen"
                  class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99999] w-56"
                  :style="getKehadiranDropdownPosition()"
                >
                  <div class="p-1">
                    <div
                      v-for="opt in kehadiranOptions"
                      :key="opt.value"
                      @click="selectKehadiran(opt.value)"
                      class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer"
                      :class="{
                        'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                          kehadiran === opt.value,
                      }"
                    >
                      <span>{{ opt.label }}</span>
                      <svg
                        v-if="kehadiran === opt.value"
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
      </div>

      <div v-if="pesertaList.length > 0" class="space-y-3">
        <div
          class="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              :checked="allSelected"
              @change="toggleSelectAll"
              class="h-4 w-4"
            />
            <span class="text-sm text-gray-700">Pilih semua</span>
          </div>
          <div class="text-sm text-gray-500">
            Terpilih: {{ selectedCount }} / {{ pesertaList.length }}
          </div>
        </div>
        <div
          v-for="item in pesertaList"
          :key="itemKey(item)"
          class="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div class="flex items-start gap-3">
            <div
              class="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
            >
              <img
                v-if="item.foto"
                :src="item.foto"
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
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h4 class="font-semibold text-gray-800 truncate">
                  {{ item.nama }}
                </h4>
                <input
                  type="checkbox"
                  v-model="selected[itemKey(item)]"
                  class="h-4 w-4"
                />
              </div>
              <div class="text-sm text-gray-500">
                {{ item.jenisKelamin }} • {{ item.usia }} tahun
              </div>
              <div class="mt-1 text-xs text-gray-600">
                <span v-if="item.posisi">{{ item.posisi }}</span>
                <span v-if="item.jenisPelatih">{{ item.jenisPelatih }}</span>
                <span v-if="item.jenisTenagaPendukung">{{
                  item.jenisTenagaPendukung
                }}</span>
              </div>
              <!-- Kehadiran saat ini dan perubahan -->
              <div class="mt-2 flex items-center gap-2 text-sm">
                <span class="text-gray-500">Kehadiran:</span>
                <span
                  v-if="item.kehadiran"
                  :class="[
                    'px-2 py-0.5 rounded-full text-xs font-medium',
                    getKehadiranBadgeClass(item.kehadiran),
                  ]"
                  >{{ item.kehadiran }}</span
                >
                <span v-else class="text-gray-500 text-xs">-</span>
                <template v-if="selected[itemKey(item)]">
                  <span class="text-gray-400 text-xs">→</span>
                  <span
                    :class="[
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      getKehadiranBadgeClass(kehadiran),
                    ]"
                    >{{ kehadiran }}</span
                  >
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Tidak ada peserta
        </h3>
        <p class="text-gray-500">Belum ada peserta pada rencana ini.</p>
      </div>

      <div class="flex gap-3 pt-6">
        <button
          @click="$router.back()"
          class="flex-1 px-6 py-3 text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
        >
          Batal
        </button>
        <button
          @click="submitKehadiran"
          :disabled="saving || selectedIds.length === 0"
          class="flex-1 px-6 py-3 bg-gradient-to-r from-[#597BF9] to-[#4c6ef5] text-white rounded-xl font-semibold hover:from-[#4c6ef5] hover:to-[#3b5bdb] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="saving" class="flex items-center justify-center">
            <div
              class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
            ></div>
            Menyimpan...
          </span>
          <span v-else>Terapkan</span>
        </button>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { useAuth } from '../../../../../../composables/useAuth'

const route = useRoute()
const programId = computed(() => parseInt(route.params.id as string))
const rencanaId = computed(() => parseInt(route.params.rencanaId as string))

const jenisPeserta = ref<'atlet' | 'pelatih' | 'tenaga-pendukung'>('atlet')
const jenisPesertaOptions = [
  { value: 'atlet', label: 'Atlet' },
  { value: 'pelatih', label: 'Pelatih' },
  { value: 'tenaga-pendukung', label: 'T Pendukung' },
]

const loading = ref(false)
const error = ref<string | null>(null)
const saving = ref(false)
const pesertaList = ref<any[]>([])
const selected = ref<Record<string, boolean>>({})
const kehadiran = ref<'Hadir' | 'Tidak Hadir' | 'Izin' | 'Sakit'>('Hadir')

// baseURL & auth headers
let baseURL = 'http://localhost:8000/api'
try {
  const config = useRuntimeConfig()
  baseURL = config.public.apiBase || baseURL
} catch {}
const { getAuthHeaders, isAuthenticated, initAuth } = useAuth()

const itemKey = (item: any) => {
  if (jenisPeserta.value === 'atlet') return `${item.id}`
  // gunakan pivot jika tersedia
  return `${item.rencanaLatihanPesertaId || item.rencana_latihan_peserta_id || item.id}`
}

const selectedIds = computed<number[]>(() => {
  return pesertaList.value
    .filter((it) => selected.value[itemKey(it)])
    .map((it) => {
      if (jenisPeserta.value === 'atlet') return Number(it.id)
      // pelatih/tenaga pendukung gunakan ID pivot
      return Number(it.rencanaLatihanPesertaId || it.rencana_latihan_peserta_id)
    })
})

const allSelected = computed(() => {
  if (pesertaList.value.length === 0) return false
  return pesertaList.value.every((it) => selected.value[itemKey(it)])
})
const selectedCount = computed(
  () => Object.values(selected.value).filter(Boolean).length
)
const toggleSelectAll = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked
  const map: Record<string, boolean> = {}
  for (const it of pesertaList.value) {
    map[itemKey(it)] = checked
  }
  selected.value = map
}

const fetchPeserta = async () => {
  loading.value = true
  error.value = null
  pesertaList.value = []
  try {
    if (process.client) initAuth()
    if (!isAuthenticated.value)
      throw new Error('Anda harus login terlebih dahulu.')
    const payloadResp: any = await $fetch(
      `${baseURL}/rencana-latihan/${rencanaId.value}/peserta`,
      {
        headers: getAuthHeaders(),
        credentials: 'include',
      }
    )
    const payload = payloadResp?.data || payloadResp
    const groupKey =
      jenisPeserta.value === 'tenaga-pendukung'
        ? 'tenagaPendukung'
        : jenisPeserta.value
    pesertaList.value = payload?.[groupKey] || []
    // normalisasi nama field untuk pivot id agar konsisten dengan frontend lain
    pesertaList.value = pesertaList.value.map((it: any) => ({
      ...it,
      rencanaLatihanPesertaId:
        it.rencanaLatihanPesertaId || it.rencana_latihan_peserta_id,
    }))
  } catch (e: any) {
    error.value = e?.message || 'Terjadi kesalahan'
  } finally {
    loading.value = false
  }
}

const submitKehadiran = async () => {
  if (selectedIds.value.length === 0) return
  try {
    saving.value = true
    const body: any = {
      ids: selectedIds.value,
      kehadiran: kehadiran.value,
      ...(jenisPeserta.value === 'atlet' ? {} : { by: 'pivot' }),
    }
    await $fetch(
      `${baseURL}/rencana-latihan/${rencanaId.value}/peserta/${jenisPeserta.value}/bulk-kehadiran`,
      {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body,
      }
    )
    await fetchPeserta()
    selected.value = {}
  } catch (e) {
    // noop, error state already handled if needed
  } finally {
    saving.value = false
  }
}

const selectJenisPeserta = async (
  val: 'atlet' | 'pelatih' | 'tenaga-pendukung'
) => {
  jenisPeserta.value = val
  await fetchPeserta()
}

// Dropdown kehadiran helpers
const isKehadiranDropdownOpen = ref(false)
const kehadiranOptions = [
  { value: 'Hadir', label: 'Hadir' },
  { value: 'Tidak Hadir', label: 'Tidak Hadir' },
  { value: 'Izin', label: 'Izin' },
  { value: 'Sakit', label: 'Sakit' },
]
const kehadiranLabel = computed(() => kehadiran.value)
const toggleKehadiranDropdown = () => {
  isKehadiranDropdownOpen.value = !isKehadiranDropdownOpen.value
}
const getKehadiranDropdownPosition = () => {
  const el = document.querySelector(
    '[data-dropdown-trigger="kehadiran-select"]'
  ) as HTMLElement | null
  if (!el) return { top: '100px', left: '20px' }
  const r = el.getBoundingClientRect()
  return { top: `${r.bottom + 8}px`, left: `${r.left}px` }
}
const selectKehadiran = (val: 'Hadir' | 'Tidak Hadir' | 'Izin' | 'Sakit') => {
  kehadiran.value = val
  isKehadiranDropdownOpen.value = false
}

onMounted(async () => {
  await fetchPeserta()
})

// Badge helper
const getKehadiranBadgeClass = (val: string) => {
  switch (val) {
    case 'Hadir':
      return 'bg-green-100 text-green-700'
    case 'Tidak Hadir':
      return 'bg-red-100 text-red-700'
    case 'Izin':
      return 'bg-yellow-100 text-yellow-700'
    case 'Sakit':
      return 'bg-purple-100 text-purple-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
</script>
