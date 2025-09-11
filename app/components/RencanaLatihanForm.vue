<template>
  <div class="space-y-6">
    <!-- Toast -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-2 opacity-0"
    >
      <div
        v-if="toast.show"
        class="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999]"
      >
        <div
          class="px-4 py-2 rounded-lg bg-red-600 text-white text-sm shadow-lg min-w-[220px] text-center"
        >
          {{ toast.message }}
        </div>
      </div>
    </transition>
    <!-- Step Indicator -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div :class="stepClass(1)">1</div>
        <span class="text-sm font-medium" :class="labelClass(1)"
          >Informasi Dasar</span
        >
      </div>
      <div class="flex items-center gap-2">
        <div :class="stepClass(2)">2</div>
        <span class="text-sm font-medium" :class="labelClass(2)"
          >Target Latihan</span
        >
      </div>
      <div class="flex items-center gap-2">
        <div :class="stepClass(3)">3</div>
        <span class="text-sm font-medium" :class="labelClass(3)">Peserta</span>
      </div>
    </div>

    <!-- Step 1: Basic -->
    <div v-if="currentStep === 1" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Tanggal <span class="text-red-500">*</span></label
        >
        <input
          v-model="form.tanggal"
          type="date"
          class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9]"
        />
        <p v-if="errors.tanggal" class="mt-1 text-xs text-red-600">
          {{ errors.tanggal }}
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Materi <span class="text-red-500">*</span></label
        >
        <input
          v-model="form.materi"
          type="text"
          placeholder="Materi latihan"
          class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9]"
        />
        <p v-if="errors.materi" class="mt-1 text-xs text-red-600">
          {{ errors.materi }}
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Lokasi <span class="text-red-500">*</span></label
        >
        <input
          v-model="form.lokasi_latihan"
          type="text"
          placeholder="Lokasi latihan"
          class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9]"
        />
        <p v-if="errors.lokasi_latihan" class="mt-1 text-xs text-red-600">
          {{ errors.lokasi_latihan }}
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Catatan</label
        >
        <textarea
          v-model="form.catatan"
          rows="3"
          placeholder="Catatan (opsional)"
          class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9]"
        ></textarea>
      </div>
    </div>

    <!-- Step 2: Target -->
    <div v-else-if="currentStep === 2" class="space-y-3">
      <div class="flex items-center justify-between">
        <label class="block text-sm font-medium text-gray-700"
          >Pilih Target</label
        >
        <input
          v-model="searchTarget"
          type="text"
          placeholder="Cari target..."
          class="px-3 py-2 text-sm rounded-lg border border-gray-200"
          @input="debouncedFetchTargets()"
        />
      </div>
      <div class="flex items-center gap-2 mb-1">
        <button
          type="button"
          class="px-3 py-1.5 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
          @click="selectAllTargets"
        >
          Pilih Semua
        </button>
        <button
          type="button"
          class="px-3 py-1.5 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
          @click="clearAllTargets"
        >
          Hapus Pilihan
        </button>
      </div>
      <div
        v-if="targets.length === 0"
        class="text-gray-500 text-sm py-6 text-center"
      >
        Tidak ada target
      </div>
      <div v-else class="space-y-2">
        <label class="text-xs text-gray-500">Centang untuk memilih</label>
        <div
          v-for="t in targets"
          :key="t.id"
          class="flex items-center gap-3 p-3 bg-white rounded-xl border"
        >
          <input
            type="checkbox"
            :value="t.id"
            v-model="form.target_latihan_ids"
          />
          <div class="flex-1">
            <div class="text-sm font-medium text-gray-800">
              {{ t.deskripsi }}
            </div>
            <div class="text-xs text-gray-500">
              Jenis: {{ t.jenis_target }} • Peruntukan: {{ t.peruntukan }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3: Peserta -->
    <div v-else class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Atlet</label
        >
        <div class="flex items-center gap-2 mb-1">
          <button
            type="button"
            class="px-3 py-1.5 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
            @click="selectAll('atlet')"
          >
            Pilih Semua
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
            @click="clearAll('atlet')"
          >
            Hapus Pilihan
          </button>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <div
            v-for="p in atlet"
            :key="p.id"
            class="flex items-center gap-3 p-3 bg-white rounded-xl border"
          >
            <input type="checkbox" :value="p.id" v-model="form.atlet_ids" />
            <div
              class="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
            >
              <img
                v-if="p.foto"
                :src="p.foto"
                class="w-full h-full object-cover"
              />
              <svg
                v-else
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
            </div>
            <div class="text-sm font-medium text-gray-800">{{ p.nama }}</div>
          </div>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Pelatih</label
        >
        <div class="flex items-center gap-2 mb-1">
          <button
            type="button"
            class="px-3 py-1.5 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
            @click="selectAll('pelatih')"
          >
            Pilih Semua
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
            @click="clearAll('pelatih')"
          >
            Hapus Pilihan
          </button>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <div
            v-for="p in pelatih"
            :key="p.id"
            class="flex items-center gap-3 p-3 bg-white rounded-xl border"
          >
            <input type="checkbox" :value="p.id" v-model="form.pelatih_ids" />
            <div
              class="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
            >
              <img
                v-if="p.foto"
                :src="p.foto"
                class="w-full h-full object-cover"
              />
              <svg
                v-else
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
            </div>
            <div class="text-sm font-medium text-gray-800">{{ p.nama }}</div>
          </div>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Tenaga Pendukung</label
        >
        <div class="flex items-center gap-2 mb-1">
          <button
            type="button"
            class="px-3 py-1.5 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
            @click="selectAll('tenaga')"
          >
            Pilih Semua
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
            @click="clearAll('tenaga')"
          >
            Hapus Pilihan
          </button>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <div
            v-for="p in tenagaPendukung"
            :key="p.id"
            class="flex items-center gap-3 p-3 bg-white rounded-xl border"
          >
            <input
              type="checkbox"
              :value="p.id"
              v-model="form.tenaga_pendukung_ids"
            />
            <div
              class="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
            >
              <img
                v-if="p.foto"
                :src="p.foto"
                class="w-full h-full object-cover"
              />
              <svg
                v-else
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
            </div>
            <div class="text-sm font-medium text-gray-800">{{ p.nama }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-3 pt-2">
      <button
        v-if="currentStep > 1"
        @click="prevStep"
        type="button"
        class="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
      >
        Sebelumnya
      </button>
      <div class="flex-1"></div>
      <button
        v-if="currentStep < 3"
        @click="nextStep"
        type="button"
        class="px-6 py-3 bg-[#597BF9] text-white rounded-xl font-semibold hover:bg-[#4c6ef5]"
      >
        Lanjut
      </button>
      <button
        v-else
        @click="submit"
        type="button"
        class="px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600"
        :disabled="loading"
      >
        {{ isEdit ? 'Update' : 'Simpan' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRencanaLatihanForm } from '../../composables/useRencanaLatihanForm'

interface Props {
  programId: number
  initialData?: any
  isEdit?: boolean
}
interface Emits {
  (e: 'submit', data: any): void
}

const props = withDefaults(defineProps<Props>(), { isEdit: false })
const emit = defineEmits<Emits>()

const {
  loading,
  fetchProgramDetailForForm,
  getCaborKategoriId,
  fetchTargetList,
  fetchAtletList,
  fetchPelatihList,
  fetchTenagaList,
  targets,
  atlet,
  pelatih,
  tenagaPendukung,
} = useRencanaLatihanForm()

const currentStep = ref(1)
const form = ref<any>({
  program_latihan_id: props.programId,
  tanggal: '',
  materi: '',
  lokasi_latihan: '',
  catatan: '',
  target_latihan_ids: [] as number[],
  atlet_ids: [] as number[],
  pelatih_ids: [] as number[],
  tenaga_pendukung_ids: [] as number[],
})

const errors = ref<Record<string, string>>({})
const toast = ref<{ show: boolean; message: string }>({
  show: false,
  message: '',
})
let toastTimer: any
const showToast = (msg: string) => {
  toast.value = { show: true, message: msg }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value.show = false), 2000)
}

const searchTarget = ref('')
let targetTimeout: any
const debouncedFetchTargets = () => {
  clearTimeout(targetTimeout)
  targetTimeout = setTimeout(
    () => fetchTargetList(props.programId, searchTarget.value),
    300
  )
}

const selectAllTargets = () => {
  const ids = targets.value.map((t) => t.id)
  form.value.target_latihan_ids = Array.from(
    new Set([...(form.value.target_latihan_ids || []), ...ids])
  )
}
const clearAllTargets = () => {
  form.value.target_latihan_ids = []
}

const selectAll = (type: 'atlet' | 'pelatih' | 'tenaga') => {
  if (type === 'atlet') {
    form.value.atlet_ids = atlet.value.map((a) => a.id)
  } else if (type === 'pelatih') {
    form.value.pelatih_ids = pelatih.value.map((p) => p.id)
  } else {
    form.value.tenaga_pendukung_ids = tenagaPendukung.value.map((t) => t.id)
  }
}
const clearAll = (type: 'atlet' | 'pelatih' | 'tenaga') => {
  if (type === 'atlet') form.value.atlet_ids = []
  else if (type === 'pelatih') form.value.pelatih_ids = []
  else form.value.tenaga_pendukung_ids = []
}

const stepClass = (step: number) =>
  `w-8 h-8 rounded-full flex items-center justify-center ${currentStep.value >= step ? 'bg-[#597BF9] text-white' : 'bg-gray-200 text-gray-600'}`
const labelClass = (step: number) =>
  currentStep.value >= step ? 'text-[#597BF9]' : 'text-gray-500'

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++
}
const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const submit = () => {
  errors.value = {}
  if (!form.value.tanggal) errors.value.tanggal = 'Tanggal wajib diisi'
  if (!form.value.materi?.trim()) errors.value.materi = 'Materi wajib diisi'
  if (!form.value.lokasi_latihan?.trim())
    errors.value.lokasi_latihan = 'Lokasi latihan wajib diisi'
  const firstError = Object.values(errors.value)[0]
  if (firstError) {
    showToast(firstError)
    return
  }
  emit('submit', { ...form.value })
}

onMounted(async () => {
  if (props.initialData) form.value = { ...form.value, ...props.initialData }
  await fetchProgramDetailForForm(props.programId)
  const caborKategoriId = getCaborKategoriId()
  await fetchTargetList(props.programId)
  if (caborKategoriId) {
    await Promise.all([
      fetchAtletList(caborKategoriId),
      fetchPelatihList(caborKategoriId),
      fetchTenagaList(caborKategoriId),
    ])
  }
})
</script>
