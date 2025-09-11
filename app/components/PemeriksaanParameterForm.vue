<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Pilih Parameter <span class="text-red-500">*</span></label
      >
      <div class="relative" style="position: relative; z-index: 9999">
        <div
          @click="toggleDropdown"
          data-dropdown-trigger="mst-parameter"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-10 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] transition-all duration-200 hover:shadow-md"
          :class="{ 'opacity-50': loading }"
        >
          <span>{{ selectedLabel }}</span>
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
              :class="{ 'rotate-180': isOpen }"
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
              v-if="isOpen"
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99999] w-72"
              :style="dropdownPosition"
            >
              <div class="p-1 max-h-72 overflow-auto">
                <div
                  v-for="opt in masterParams"
                  :key="opt.id"
                  @click="select(opt)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-[#597BF9]/10 hover:text-[#597BF9] cursor-pointer"
                  :class="{
                    'bg-[#597BF9]/20 text-[#597BF9]': value === opt.id,
                  }"
                >
                  <span>{{ opt.nama }}</span>
                  <span
                    v-if="opt.satuan"
                    class="ml-auto text-xs text-gray-400"
                    >{{ opt.satuan }}</span
                  >
                </div>
              </div>
            </div>
          </transition>
        </Teleport>
      </div>
      <p v-if="errorMessage" class="mt-1 text-sm text-red-600">
        {{ errorMessage }}
      </p>
    </div>

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
        :disabled="loading || !value"
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
import { ref, computed, onMounted } from 'vue'
import { usePemeriksaanParameter } from '../../composables/usePemeriksaanParameter'

interface Props {
  initialValue?: number | null
  loading?: boolean
  isEdit?: boolean
}

interface Emits {
  (e: 'submit', mstParameterId: number): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  isEdit: false,
})
const emit = defineEmits<Emits>()

const { masterParams, fetchMaster } = usePemeriksaanParameter()

const value = ref<number | null>(props.initialValue ?? null)
const isOpen = ref(false)
const errorMessage = ref<string | null>(null)
const dropdownPosition = ref<{ top: string; left: string }>({
  top: '100px',
  left: '20px',
})

const selectedLabel = computed(() => {
  const found = masterParams.value.find((m) => m.id === value.value)
  return found
    ? `${found.nama}${found.satuan ? ` (${found.satuan})` : ''}`
    : 'Pilih Parameter'
})

const toggleDropdown = () => {
  if (props.loading) return
  isOpen.value = !isOpen.value
  if (isOpen.value) calcDropdownPosition()
}

const calcDropdownPosition = () => {
  const el = document.querySelector(
    '[data-dropdown-trigger="mst-parameter"]'
  ) as HTMLElement | null
  if (!el) return
  const r = el.getBoundingClientRect()
  dropdownPosition.value = { top: `${r.bottom + 8}px`, left: `${r.left}px` }
}

const select = (opt: any) => {
  value.value = opt.id
  isOpen.value = false
}

const handleSubmit = () => {
  errorMessage.value = null
  if (!value.value) {
    errorMessage.value = 'Parameter harus dipilih'
    return
  }
  emit('submit', value.value)
}

onMounted(async () => {
  await fetchMaster()
})
</script>
