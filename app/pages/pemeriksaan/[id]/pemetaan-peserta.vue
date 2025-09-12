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
        <h1 class="text-xl font-semibold text-gray-800">
          Pemetaan Peserta Pemeriksaan
        </h1>
      </div>
    </div>

    <!-- Jenis Peserta Tabs -->
    <div class="grid grid-cols-3 gap-2 mb-4">
      <button :class="tabClass('atlet')" @click="changeJenis('atlet')">
        Atlet
      </button>
      <button :class="tabClass('pelatih')" @click="changeJenis('pelatih')">
        Pelatih
      </button>
      <button
        :class="tabClass('tenaga-pendukung')"
        @click="changeJenis('tenaga-pendukung')"
      >
        Pendukung
      </button>
    </div>

    <!-- Parameter Header -->
    <div class="bg-white rounded-2xl p-4 shadow-sm mb-3">
      <div class="font-semibold text-gray-800 mb-2">Parameter Pemeriksaan</div>
      <div class="flex flex-wrap gap-2 text-sm">
        <span
          v-for="p in parameters"
          :key="p.id"
          class="px-3 py-1 bg-gray-100 rounded-full"
          >{{ p.nama_parameter }}
          <span class="text-gray-500">({{ p.satuan }})</span></span
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
              class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
            >
              <img
                v-if="it.peserta.foto"
                :src="it.peserta.foto"
                class="w-full h-full object-cover"
              />
              <svg
                v-else
                class="w-5 h-5 text-gray-400"
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
              <div class="font-semibold text-gray-800">
                {{ it.peserta.nama }}
              </div>
              <div class="text-xs text-gray-500">
                {{ it.peserta.jenis_kelamin }} • {{ it.peserta.usia }} tahun
              </div>
            </div>
          </div>

          <!-- Parameters Table-like -->
          <div class="space-y-3">
            <div
              v-for="p in parameters"
              :key="p.id"
              class="border border-gray-200 rounded-xl p-3"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="font-medium text-gray-800">
                  {{ p.nama_parameter }}
                </div>
                <div class="text-xs text-gray-500">Satuan: {{ p.satuan }}</div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1"
                    >Nilai</label
                  >
                  <input
                    v-model="getBindingNilai(it.id, p.id).nilai"
                    type="text"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1"
                    >Trend</label
                  >
                  <select
                    v-model="getBindingNilai(it.id, p.id).trend"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
                  >
                    <option value="stabil">Stabil</option>
                    <option value="kenaikan">Kenaikan</option>
                    <option value="penurunan">Penurunan</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-12">
        Belum ada peserta.
      </div>

      <!-- Actions -->
      <div class="flex gap-3 pt-6" v-if="pesertaItems.length > 0">
        <button
          @click="$router.back()"
          class="flex-1 px-6 py-3 text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300"
        >
          Batal
        </button>
        <button
          @click="saveChanges"
          :disabled="saving"
          class="flex-1 px-6 py-3 bg-gradient-to-r from-[#597BF9] to-[#4c6ef5] text-white rounded-xl font-semibold hover:from-[#4c6ef5] hover:to-[#3b5bdb] disabled:opacity-50"
        >
          <span v-if="saving" class="flex items-center justify-center"
            ><div
              class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
            ></div>
            Menyimpan...</span
          >
          <span v-else>Simpan Perubahan</span>
        </button>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

const tabClass = (t: string) =>
  t === jenis.value
    ? 'px-3 py-2 rounded-xl bg-[#597BF9] text-white text-sm'
    : 'px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm'
const changeJenis = async (t: 'atlet' | 'pelatih' | 'tenaga-pendukung') => {
  jenis.value = t
  await fetchPesertaWithParameters(pemeriksaanId.value, jenis.value)
  // Sinkronisasi model lokal
  rebuildLocalModel()
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

onMounted(async () => {
  await fetchParameters(pemeriksaanId.value)
  await fetchPesertaWithParameters(pemeriksaanId.value, jenis.value)
  rebuildLocalModel()
})
</script>
