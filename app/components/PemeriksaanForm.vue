<template>
  <div class="space-y-6">
    <!-- Cabor Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Cabor <span class="text-red-500">*</span>
      </label>
      <div class="relative" style="position: relative; z-index: 9999">
        <div
          @click="toggleCaborDropdown"
          data-dropdown-trigger="cabor"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-10 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{ 'opacity-50': loading }"
        >
          <span>{{ selectedCabor.label }}</span>
          <!-- Animated arrow icon -->
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
              :class="{ 'rotate-180': isCaborDropdownOpen }"
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

        <!-- Enhanced Dropdown Menu with animations -->
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
              v-if="isCaborDropdownOpen"
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99999] w-64"
              :style="getCaborDropdownPosition()"
            >
              <div class="p-1">
                <div
                  v-for="cabor in caborList"
                  :key="cabor.id"
                  @click="selectCabor(cabor)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  :class="{
                    'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                      selectedCabor.value === cabor.id,
                  }"
                >
                  <span>{{ cabor.nama }}</span>
                  <!-- Check mark for selected option -->
                  <svg
                    v-if="selectedCabor.value === cabor.id"
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
      <p v-if="errors.cabor_id" class="mt-1 text-sm text-red-600">
        {{ errors.cabor_id }}
      </p>
    </div>

    <!-- Kategori Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Kategori <span class="text-red-500">*</span>
      </label>
      <div class="relative" style="position: relative; z-index: 9998">
        <div
          @click="toggleKategoriDropdown"
          data-dropdown-trigger="kategori"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-10 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{
            'opacity-50': !formData.cabor_id || loading || isLoadingKategori,
            'cursor-not-allowed':
              !formData.cabor_id || loading || isLoadingKategori,
          }"
        >
          <span>{{ selectedKategori.label }}</span>
          <!-- Animated arrow icon -->
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
              :class="{ 'rotate-180': isKategoriDropdownOpen }"
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

        <!-- Enhanced Dropdown Menu with animations -->
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
              v-if="isKategoriDropdownOpen"
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99998] w-64"
              :style="getKategoriDropdownPosition()"
            >
              <div class="p-1">
                <div
                  v-for="kategori in availableKategori"
                  :key="kategori.id"
                  @click="selectKategori(kategori)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  :class="{
                    'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                      selectedKategori.value === kategori.id,
                  }"
                >
                  <span>{{ kategori.nama }}</span>
                  <!-- Check mark for selected option -->
                  <svg
                    v-if="selectedKategori.value === kategori.id"
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
      <p v-if="errors.cabor_kategori_id" class="mt-1 text-sm text-red-600">
        {{ errors.cabor_kategori_id }}
      </p>
    </div>

    <!-- Tenaga Pendukung Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Tenaga Pendukung <span class="text-red-500">*</span>
      </label>
      <div class="relative" style="position: relative; z-index: 9997">
        <div
          @click="toggleTenagaPendukungDropdown"
          data-dropdown-trigger="tenaga-pendukung"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-10 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{
            'opacity-50':
              !formData.cabor_kategori_id ||
              loading ||
              isLoadingTenagaPendukung,
            'cursor-not-allowed':
              !formData.cabor_kategori_id ||
              loading ||
              isLoadingTenagaPendukung,
          }"
        >
          <span>{{ selectedTenagaPendukung.label }}</span>
          <!-- Animated arrow icon -->
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
              :class="{ 'rotate-180': isTenagaPendukungDropdownOpen }"
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

        <!-- Enhanced Dropdown Menu with animations -->
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
              v-if="isTenagaPendukungDropdownOpen"
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99997] w-64"
              :style="getTenagaPendukungDropdownPosition()"
            >
              <div class="p-1">
                <div
                  v-for="tenagaPendukung in availableTenagaPendukung"
                  :key="tenagaPendukung.id"
                  @click="selectTenagaPendukung(tenagaPendukung)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  :class="{
                    'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                      selectedTenagaPendukung.value === tenagaPendukung.id,
                  }"
                >
                  <span>{{ tenagaPendukung.nama }}</span>
                  <!-- Check mark for selected option -->
                  <svg
                    v-if="selectedTenagaPendukung.value === tenagaPendukung.id"
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
      <p v-if="errors.tenaga_pendukung_id" class="mt-1 text-sm text-red-600">
        {{ errors.tenaga_pendukung_id }}
      </p>
    </div>

    <!-- Nama Pemeriksaan -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Nama Pemeriksaan <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <input
          v-model="formData.nama_pemeriksaan"
          type="text"
          placeholder="Masukkan nama pemeriksaan"
          class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 placeholder:text-gray-500 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] focus:outline-none transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{ 'opacity-50': loading }"
          :disabled="loading"
        />
        <!-- Input icon -->
        <div
          class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-[#597BF9]"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      </div>
      <p v-if="errors.nama_pemeriksaan" class="mt-1 text-sm text-red-600">
        {{ errors.nama_pemeriksaan }}
      </p>
    </div>

    <!-- Tanggal Pemeriksaan -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Tanggal Pemeriksaan <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <input
          v-model="formData.tanggal_pemeriksaan"
          type="date"
          class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] focus:outline-none transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{ 'opacity-50': loading }"
          :disabled="loading"
        />
        <!-- Calendar icon -->
        <div
          class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-[#597BF9]"
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
        </div>
      </div>
      <p v-if="errors.tanggal_pemeriksaan" class="mt-1 text-sm text-red-600">
        {{ errors.tanggal_pemeriksaan }}
      </p>
    </div>

    <!-- Status -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Status <span class="text-red-500">*</span>
      </label>
      <div class="relative" style="position: relative; z-index: 9996">
        <div
          @click="toggleStatusDropdown"
          data-dropdown-trigger="status"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-10 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{ 'opacity-50': loading }"
        >
          <span>{{ selectedStatus.label }}</span>
          <!-- Animated arrow icon -->
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
              :class="{ 'rotate-180': isStatusDropdownOpen }"
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

        <!-- Enhanced Dropdown Menu with animations -->
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
              v-if="isStatusDropdownOpen"
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99996] w-64"
              :style="getStatusDropdownPosition()"
            >
              <div class="p-1">
                <div
                  v-for="status in statusOptions"
                  :key="status.value"
                  @click="selectStatus(status)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  :class="{
                    'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                      selectedStatus.value === status.value,
                  }"
                >
                  <span>{{ status.label }}</span>
                  <!-- Check mark for selected option -->
                  <svg
                    v-if="selectedStatus.value === status.value"
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
      <p v-if="errors.status" class="mt-1 text-sm text-red-600">
        {{ errors.status }}
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3 pt-6">
      <button
        @click="$emit('cancel')"
        type="button"
        class="flex-1 px-6 py-3 text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        :disabled="loading"
      >
        Batal
      </button>
      <button
        @click="handleSubmit"
        type="button"
        class="flex-1 px-6 py-3 bg-gradient-to-r from-[#597BF9] to-[#4c6ef5] text-white rounded-xl font-semibold hover:from-[#4c6ef5] hover:to-[#3b5bdb] transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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

    <!-- Click outside handler for dropdowns -->
    <div
      v-if="
        isCaborDropdownOpen ||
        isKategoriDropdownOpen ||
        isTenagaPendukungDropdownOpen ||
        isStatusDropdownOpen
      "
      @click="closeAllDropdowns"
      class="fixed inset-0 z-30"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

interface FormData {
  cabor_id: number | null
  cabor_kategori_id: number | null
  tenaga_pendukung_id: number | null
  nama_pemeriksaan: string
  tanggal_pemeriksaan: string
  status: string
}

interface Cabor {
  id: number
  nama: string
}

interface Props {
  initialData?: Partial<FormData>
  caborList: Cabor[]
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

// Form data
const formData = ref<FormData>({
  cabor_id: null,
  cabor_kategori_id: null,
  tenaga_pendukung_id: null,
  nama_pemeriksaan: '',
  tanggal_pemeriksaan: '',
  status: 'belum',
})

// Errors
const errors = ref<Partial<Record<keyof FormData, string>>>({})

// Options from API
const availableKategori = ref<Cabor[]>([])
const availableTenagaPendukung = ref<Cabor[]>([])

// Status options
const statusOptions = [
  { value: 'belum', label: 'Belum' },
  { value: 'sebagian', label: 'Sebagian' },
  { value: 'selesai', label: 'Selesai' },
]

// Dropdown states
const isCaborDropdownOpen = ref(false)
const isKategoriDropdownOpen = ref(false)
const isTenagaPendukungDropdownOpen = ref(false)
const isStatusDropdownOpen = ref(false)

// Loading states
const isLoadingKategori = ref(false)
const isLoadingTenagaPendukung = ref(false)

const isFormValid = computed(() => {
  return !!(
    formData.value.cabor_id &&
    formData.value.cabor_kategori_id &&
    formData.value.tenaga_pendukung_id &&
    formData.value.nama_pemeriksaan &&
    formData.value.tanggal_pemeriksaan &&
    formData.value.status
  )
})

// Selected options for dropdowns
const selectedCabor = computed(() => {
  const cabor = props.caborList.find((c) => c.id === formData.value.cabor_id)
  return cabor
    ? { value: cabor.id, label: cabor.nama }
    : { value: null, label: 'Pilih Cabor' }
})

const selectedKategori = computed(() => {
  if (isLoadingKategori.value) {
    return { value: null, label: 'Memuat kategori...' }
  }
  if (availableKategori.value.length === 0 && formData.value.cabor_id) {
    return { value: null, label: 'Tidak ada kategori tersedia' }
  }
  const kategori = availableKategori.value.find(
    (k) => k.id === formData.value.cabor_kategori_id
  )
  return kategori
    ? { value: kategori.id, label: kategori.nama }
    : { value: null, label: 'Pilih Kategori' }
})

const selectedTenagaPendukung = computed(() => {
  if (isLoadingTenagaPendukung.value) {
    return { value: null, label: 'Memuat tenaga pendukung...' }
  }
  if (
    availableTenagaPendukung.value.length === 0 &&
    formData.value.cabor_kategori_id
  ) {
    return { value: null, label: 'Tidak ada tenaga pendukung tersedia' }
  }
  const tenagaPendukung = availableTenagaPendukung.value.find(
    (t) => t.id === formData.value.tenaga_pendukung_id
  )
  return tenagaPendukung
    ? { value: tenagaPendukung.id, label: tenagaPendukung.nama }
    : { value: null, label: 'Pilih Tenaga Pendukung' }
})

const selectedStatus = computed(() => {
  const status = statusOptions.find((s) => s.value === formData.value.status)
  return status || statusOptions[0]
})

// Methods
const toggleCaborDropdown = () => {
  if (props.loading) return
  isCaborDropdownOpen.value = !isCaborDropdownOpen.value
  if (isCaborDropdownOpen.value) {
    isKategoriDropdownOpen.value = false
    isTenagaPendukungDropdownOpen.value = false
    isStatusDropdownOpen.value = false
  }
}

const toggleKategoriDropdown = () => {
  if (!formData.value.cabor_id || props.loading || isLoadingKategori.value)
    return
  isKategoriDropdownOpen.value = !isKategoriDropdownOpen.value
  if (isKategoriDropdownOpen.value) {
    isCaborDropdownOpen.value = false
    isTenagaPendukungDropdownOpen.value = false
    isStatusDropdownOpen.value = false
  }
}

const toggleTenagaPendukungDropdown = () => {
  if (
    !formData.value.cabor_kategori_id ||
    props.loading ||
    isLoadingTenagaPendukung.value
  )
    return
  isTenagaPendukungDropdownOpen.value = !isTenagaPendukungDropdownOpen.value
  if (isTenagaPendukungDropdownOpen.value) {
    isCaborDropdownOpen.value = false
    isKategoriDropdownOpen.value = false
    isStatusDropdownOpen.value = false
  }
}

const toggleStatusDropdown = () => {
  if (props.loading) return
  isStatusDropdownOpen.value = !isStatusDropdownOpen.value
  if (isStatusDropdownOpen.value) {
    isCaborDropdownOpen.value = false
    isKategoriDropdownOpen.value = false
    isTenagaPendukungDropdownOpen.value = false
  }
}

const selectCabor = async (cabor: Cabor) => {
  formData.value.cabor_id = cabor.id
  formData.value.cabor_kategori_id = null
  formData.value.tenaga_pendukung_id = null
  errors.value.cabor_id = ''
  errors.value.cabor_kategori_id = ''
  errors.value.tenaga_pendukung_id = ''
  availableKategori.value = []
  availableTenagaPendukung.value = []
  isCaborDropdownOpen.value = false

  if (cabor.id) {
    await fetchKategoriByCabor(cabor.id)
  }
}

const selectKategori = async (kategori: Cabor) => {
  formData.value.cabor_kategori_id = kategori.id
  formData.value.tenaga_pendukung_id = null
  errors.value.cabor_kategori_id = ''
  errors.value.tenaga_pendukung_id = ''
  availableTenagaPendukung.value = []
  isKategoriDropdownOpen.value = false

  if (kategori.id) {
    await fetchTenagaPendukungByKategori(kategori.id)
  }
}

const selectTenagaPendukung = (tenagaPendukung: Cabor) => {
  formData.value.tenaga_pendukung_id = tenagaPendukung.id
  errors.value.tenaga_pendukung_id = ''
  isTenagaPendukungDropdownOpen.value = false
}

const selectStatus = (status: { value: string; label: string }) => {
  formData.value.status = status.value
  errors.value.status = ''
  isStatusDropdownOpen.value = false
}

const fetchKategoriByCabor = async (caborId: number) => {
  try {
    isLoadingKategori.value = true
    const { usePemeriksaan } = await import('../../composables/usePemeriksaan')
    const { fetchCaborKategoriByCabor } = usePemeriksaan()
    const kategori = await fetchCaborKategoriByCabor(caborId)
    availableKategori.value = kategori || []
  } catch (error) {
    availableKategori.value = []
  } finally {
    isLoadingKategori.value = false
  }
}

const fetchTenagaPendukungByKategori = async (kategoriId: number) => {
  try {
    isLoadingTenagaPendukung.value = true
    const { usePemeriksaan } = await import('../../composables/usePemeriksaan')
    const { fetchTenagaPendukungByKategori } = usePemeriksaan()
    const tenagaPendukung = await fetchTenagaPendukungByKategori(kategoriId)
    availableTenagaPendukung.value = tenagaPendukung || []
  } catch (error) {
    availableTenagaPendukung.value = []
  } finally {
    isLoadingTenagaPendukung.value = false
  }
}

// Position calculation functions
const getCaborDropdownPosition = () => {
  const trigger = document.querySelector('[data-dropdown-trigger="cabor"]')
  if (trigger) {
    const rect = trigger.getBoundingClientRect()
    return {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
    }
  }
  return {
    top: '100px',
    left: '20px',
  }
}

const getKategoriDropdownPosition = () => {
  const trigger = document.querySelector('[data-dropdown-trigger="kategori"]')
  if (trigger) {
    const rect = trigger.getBoundingClientRect()
    return {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
    }
  }
  return {
    top: '200px',
    left: '20px',
  }
}

const getTenagaPendukungDropdownPosition = () => {
  const trigger = document.querySelector(
    '[data-dropdown-trigger="tenaga-pendukung"]'
  )
  if (trigger) {
    const rect = trigger.getBoundingClientRect()
    return {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
    }
  }
  return {
    top: '300px',
    left: '20px',
  }
}

const getStatusDropdownPosition = () => {
  const trigger = document.querySelector('[data-dropdown-trigger="status"]')
  if (trigger) {
    const rect = trigger.getBoundingClientRect()
    return {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
    }
  }
  return {
    top: '500px',
    left: '20px',
  }
}

// Close dropdowns when clicking outside
const closeAllDropdowns = () => {
  isCaborDropdownOpen.value = false
  isKategoriDropdownOpen.value = false
  isTenagaPendukungDropdownOpen.value = false
  isStatusDropdownOpen.value = false
}

// Close dropdowns on escape key
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeAllDropdowns()
  }
}

const validateForm = (): boolean => {
  errors.value = {}
  let isValid = true

  if (!formData.value.cabor_id) {
    errors.value.cabor_id = 'Cabor harus dipilih'
    isValid = false
  }

  if (!formData.value.cabor_kategori_id) {
    errors.value.cabor_kategori_id = 'Kategori harus dipilih'
    isValid = false
  }

  if (!formData.value.tenaga_pendukung_id) {
    errors.value.tenaga_pendukung_id = 'Tenaga pendukung harus dipilih'
    isValid = false
  }

  if (!formData.value.nama_pemeriksaan.trim()) {
    errors.value.nama_pemeriksaan = 'Nama pemeriksaan harus diisi'
    isValid = false
  }

  if (!formData.value.tanggal_pemeriksaan) {
    errors.value.tanggal_pemeriksaan = 'Tanggal pemeriksaan harus diisi'
    isValid = false
  }

  if (!formData.value.status) {
    errors.value.status = 'Status harus dipilih'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return

  emit('submit', { ...formData.value })
}

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = { ...formData.value, ...newData }

      // Jika ada cabor_id, load kategori
      if (newData.cabor_id) {
        fetchKategoriByCabor(newData.cabor_id)
      }

      // Jika ada cabor_kategori_id, load tenaga pendukung
      if (newData.cabor_kategori_id) {
        fetchTenagaPendukungByKategori(newData.cabor_kategori_id)
      }
    }
  },
  { immediate: true, deep: true }
)

// Watch for cabor_id changes (untuk edit mode)
watch(
  () => formData.value.cabor_id,
  (newCaborId, oldCaborId) => {
    // Load kategori jika cabor berubah (kecuali saat initial load)
    if (newCaborId && newCaborId !== oldCaborId) {
      fetchKategoriByCabor(newCaborId)
    }
  }
)

// Watch for cabor_kategori_id changes
watch(
  () => formData.value.cabor_kategori_id,
  (newKategoriId, oldKategoriId) => {
    // Load tenaga pendukung jika kategori berubah (kecuali saat initial load)
    if (newKategoriId && newKategoriId !== oldKategoriId) {
      fetchTenagaPendukungByKategori(newKategoriId)
    }
  }
)

// Initialize form data
onMounted(() => {
  if (props.initialData) {
    formData.value = { ...formData.value, ...props.initialData }
  }

  // Add event listeners
  document.addEventListener('keydown', handleEscapeKey)
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (!target.closest('[data-dropdown-trigger]')) {
      closeAllDropdowns()
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style scoped>
/* Custom focus styles for all inputs */
input:focus,
textarea:focus {
  outline: none;
}

/* Enhanced glass morphism effect */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property:
    transform, background-color, border-color, box-shadow, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ensure dropdowns are always on top */
[class*='z-'] {
  z-index: 9999 !important;
}

/* Date input styling */
input[type='date']::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* Ensure proper spacing and alignment */
.space-y-6 > * + * {
  margin-top: 1.5rem;
}
</style>
