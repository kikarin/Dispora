<template>
  <div class="space-y-6">
    <!-- Jenis Target -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Jenis Target <span class="text-red-500">*</span>
      </label>
      <div class="relative" style="position: relative; z-index: 9999">
        <div
          @click="toggleJenisDropdown"
          data-dropdown-trigger="jenis"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-10 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>{{ selectedJenis.label }}</span>
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
              :class="{ 'rotate-180': isJenisDropdownOpen }"
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
              v-if="isJenisDropdownOpen"
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99999] w-64"
              :style="getJenisDropdownPosition()"
            >
              <div class="p-1">
                <div
                  v-for="opt in jenisOptions"
                  :key="opt.value"
                  @click="selectJenis(opt)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  :class="{
                    'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                      formData.jenis_target === opt.value,
                  }"
                >
                  <span>{{ opt.label }}</span>
                  <svg
                    v-if="formData.jenis_target === opt.value"
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
      <p v-if="errors.jenis_target" class="mt-1 text-sm text-red-600">
        {{ errors.jenis_target }}
      </p>
    </div>

    <!-- Peruntukan -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Peruntukan
        <span class="text-gray-400 text-xs">(Wajib jika Individu)</span>
      </label>
      <div class="relative" style="position: relative; z-index: 9998">
        <div
          @click="togglePeruntukanDropdown"
          data-dropdown-trigger="peruntukan"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-10 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{
            'opacity-50 cursor-not-allowed':
              formData.jenis_target !== 'individu' || loading,
          }"
        >
          <span>{{ selectedPeruntukan.label }}</span>
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
              :class="{ 'rotate-180': isPeruntukanDropdownOpen }"
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
                isPeruntukanDropdownOpen && formData.jenis_target === 'individu'
              "
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99998] w-64"
              :style="getPeruntukanDropdownPosition()"
            >
              <div class="p-1">
                <div
                  v-for="opt in peruntukanOptions"
                  :key="opt.value"
                  @click="selectPeruntukan(opt)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  :class="{
                    'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                      formData.peruntukan === opt.value,
                  }"
                >
                  <span>{{ opt.label }}</span>
                  <svg
                    v-if="formData.peruntukan === opt.value"
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
      <p v-if="errors.peruntukan" class="mt-1 text-sm text-red-600">
        {{ errors.peruntukan }}
      </p>
    </div>

    <!-- Deskripsi -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Deskripsi <span class="text-red-500">*</span></label
      >
      <input
        v-model="formData.deskripsi"
        type="text"
        placeholder="Deskripsi target"
        class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 placeholder:text-gray-500 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] focus:outline-none transition-all duration-200"
        :disabled="loading"
      />
      <p v-if="errors.deskripsi" class="mt-1 text-sm text-red-600">
        {{ errors.deskripsi }}
      </p>
    </div>

    <!-- Satuan (opsional) -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Satuan <span class="text-gray-400 text-xs">(Opsional)</span></label
      >
      <input
        v-model="formData.satuan"
        type="text"
        placeholder="cth: detik, cm, skor"
        class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 placeholder:text-gray-500 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] focus:outline-none transition-all duration-200"
        :disabled="loading"
      />
    </div>

    <!-- Nilai Target (opsional) -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Nilai Target
        <span class="text-gray-400 text-xs">(Opsional)</span></label
      >
      <input
        v-model="formData.nilai_target"
        type="text"
        placeholder="cth: 12, 5, A, B, dst"
        class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 placeholder:text-gray-500 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] focus:outline-none transition-all duration-200"
        :disabled="loading"
      />
    </div>

    <!-- Actions -->
    <div class="flex gap-3 pt-4">
      <button
        @click="$emit('cancel')"
        type="button"
        class="flex-1 px-6 py-3 text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
        :disabled="loading"
      >
        Batal
      </button>
      <button
        @click="handleSubmit"
        type="button"
        class="flex-1 px-6 py-3 bg-gradient-to-r from-[#597BF9] to-[#4c6ef5] text-white rounded-xl font-semibold hover:from-[#4c6ef5] hover:to-[#3b5bdb] transition-all duration-200 disabled:opacity-50"
        :disabled="loading || !isFormValid"
      >
        <span v-if="loading" class="flex items-center justify-center">
          <div
            class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
          ></div>
          Menyimpan...
        </span>
        <span v-else>{{ isEdit ? 'Update' : 'Simpan' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface FormData {
  program_latihan_id: number
  jenis_target: 'individu' | 'kelompok'
  peruntukan: 'atlet' | 'pelatih' | 'tenaga-pendukung' | ''
  deskripsi: string
  satuan: string | ''
  nilai_target: string | ''
}

interface Props {
  initialData?: Partial<FormData>
  programId: number
  loading?: boolean
  isEdit?: boolean
}

interface Emits {
  (e: 'submit', data: FormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  isEdit: false,
})
const emit = defineEmits<Emits>()

const formData = ref<FormData>({
  program_latihan_id: props.programId,
  jenis_target: 'individu',
  peruntukan: '',
  deskripsi: '',
  satuan: '',
  nilai_target: '',
})

const errors = ref<Partial<Record<keyof FormData, string>>>({})

const jenisOptions = [
  { value: 'individu', label: 'Individu' },
  { value: 'kelompok', label: 'Kelompok' },
]

const peruntukanOptions = [
  { value: 'atlet', label: 'Atlet' },
  { value: 'pelatih', label: 'Pelatih' },
  { value: 'tenaga-pendukung', label: 'Tenaga Pendukung' },
]

const isJenisDropdownOpen = ref(false)
const isPeruntukanDropdownOpen = ref(false)

const selectedJenis = computed(() => {
  const found = jenisOptions.find(
    (o) => o.value === formData.value.jenis_target
  )
  return found || jenisOptions[0]
})

const selectedPeruntukan = computed(() => {
  if (formData.value.jenis_target !== 'individu')
    return { value: '', label: 'Tidak berlaku untuk Kelompok' }
  const found = peruntukanOptions.find(
    (o) => o.value === formData.value.peruntukan
  )
  return found || { value: '', label: 'Pilih Peruntukan' }
})

const isFormValid = computed(() => {
  const basic = !!(formData.value.jenis_target && formData.value.deskripsi)
  const individuOk =
    formData.value.jenis_target === 'kelompok' || !!formData.value.peruntukan
  return basic && individuOk
})

const toggleJenisDropdown = () => {
  isJenisDropdownOpen.value = !isJenisDropdownOpen.value
  if (isJenisDropdownOpen.value) isPeruntukanDropdownOpen.value = false
}

const togglePeruntukanDropdown = () => {
  if (formData.value.jenis_target !== 'individu' || props.loading) return
  isPeruntukanDropdownOpen.value = !isPeruntukanDropdownOpen.value
  if (isPeruntukanDropdownOpen.value) isJenisDropdownOpen.value = false
}

const selectJenis = (opt: any) => {
  formData.value.jenis_target = opt.value
  if (opt.value === 'kelompok') {
    formData.value.peruntukan = ''
  }
  isJenisDropdownOpen.value = false
}

const selectPeruntukan = (opt: any) => {
  formData.value.peruntukan = opt.value
  isPeruntukanDropdownOpen.value = false
}

const handleSubmit = () => {
  errors.value = {}
  if (!isFormValid.value) {
    if (!formData.value.deskripsi)
      errors.value.deskripsi = 'Deskripsi harus diisi'
    if (
      formData.value.jenis_target === 'individu' &&
      !formData.value.peruntukan
    )
      errors.value.peruntukan = 'Peruntukan harus dipilih untuk Individu'
    return
  }
  emit('submit', { ...formData.value })
}

watch(
  () => props.initialData,
  (val) => {
    if (val) {
      formData.value = {
        ...formData.value,
        ...val,
        program_latihan_id: props.programId,
      }
    }
  },
  { immediate: true, deep: true }
)

// Dropdown positioning helpers (fix: referenced in template)
const getJenisDropdownPosition = () => {
  const el = document.querySelector(
    '[data-dropdown-trigger="jenis"]'
  ) as HTMLElement | null
  if (!el) return { top: '100px', left: '20px' }
  const r = el.getBoundingClientRect()
  return { top: `${r.bottom + 8}px`, left: `${r.left}px` }
}

const getPeruntukanDropdownPosition = () => {
  const el = document.querySelector(
    '[data-dropdown-trigger="peruntukan"]'
  ) as HTMLElement | null
  if (!el) return { top: '150px', left: '20px' }
  const r = el.getBoundingClientRect()
  return { top: `${r.bottom + 8}px`, left: `${r.left}px` }
}
</script>
