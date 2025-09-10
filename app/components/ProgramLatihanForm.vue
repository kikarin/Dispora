<template>
  <div class="space-y-6">
    <!-- Cabor Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Cabor <span class="text-red-500">*</span>
      </label>
      <select
        v-model="formData.cabor_id"
        @change="onCaborChange"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
        :disabled="loading"
      >
        <option value="">Pilih Cabor</option>
        <option v-for="cabor in caborList" :key="cabor.id" :value="cabor.id">
          {{ cabor.nama }}
        </option>
      </select>
      <p v-if="errors.cabor_id" class="mt-1 text-sm text-red-600">
        {{ errors.cabor_id }}
      </p>
    </div>

    <!-- Kategori Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Kategori <span class="text-red-500">*</span>
      </label>
      <select
        v-model="formData.cabor_kategori_id"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
        :disabled="!formData.cabor_id || loading || isLoadingKategori"
      >
        <option value="">
          {{
            isLoadingKategori
              ? 'Memuat kategori...'
              : availableKategori.length === 0 && formData.cabor_id
                ? 'Tidak ada kategori tersedia'
                : 'Pilih Kategori'
          }}
        </option>
        <option
          v-for="kategori in availableKategori"
          :key="kategori.id"
          :value="kategori.id"
        >
          {{ kategori.nama }}
        </option>
      </select>
      <p v-if="errors.cabor_kategori_id" class="mt-1 text-sm text-red-600">
        {{ errors.cabor_kategori_id }}
      </p>
    </div>

    <!-- Nama Program -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Nama Program <span class="text-red-500">*</span>
      </label>
      <input
        v-model="formData.nama_program"
        type="text"
        placeholder="Masukkan nama program latihan"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
        :disabled="loading"
      />
      <p v-if="errors.nama_program" class="mt-1 text-sm text-red-600">
        {{ errors.nama_program }}
      </p>
    </div>

    <!-- Periode Mulai -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Periode Mulai <span class="text-red-500">*</span>
      </label>
      <input
        v-model="formData.periode_mulai"
        type="date"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
        :disabled="loading"
      />
      <p v-if="errors.periode_mulai" class="mt-1 text-sm text-red-600">
        {{ errors.periode_mulai }}
      </p>
    </div>

    <!-- Periode Selesai -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Periode Selesai <span class="text-red-500">*</span>
      </label>
      <input
        v-model="formData.periode_selesai"
        type="date"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent"
        :disabled="loading"
        :min="formData.periode_mulai"
      />
      <p v-if="errors.periode_selesai" class="mt-1 text-sm text-red-600">
        {{ errors.periode_selesai }}
      </p>
    </div>

    <!-- Keterangan -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Keterangan <span class="text-gray-400 text-xs">(Opsional)</span>
      </label>
      <textarea
        v-model="formData.keterangan"
        rows="3"
        placeholder="Masukkan keterangan program latihan (opsional)"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#597BF9] focus:border-transparent resize-none"
        :disabled="loading"
      ></textarea>
      <p v-if="errors.keterangan" class="mt-1 text-sm text-red-600">
        {{ errors.keterangan }}
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3 pt-4">
      <button
        @click="$emit('cancel')"
        type="button"
        class="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        :disabled="loading"
      >
        Batal
      </button>
      <button
        @click="handleSubmit"
        type="button"
        class="flex-1 px-4 py-2 bg-[#597BF9] text-white rounded-lg hover:bg-[#4c6ef5] transition-colors disabled:opacity-50"
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
import { ref, computed, watch, onMounted } from 'vue'

interface FormData {
  cabor_id: number | null
  cabor_kategori_id: number | null
  nama_program: string
  periode_mulai: string
  periode_selesai: string
  keterangan: string
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
  nama_program: '',
  periode_mulai: '',
  periode_selesai: '',
  keterangan: '',
})

// Errors
const errors = ref<Partial<Record<keyof FormData, string>>>({})

// Kategori options from API
const availableKategori = ref<Cabor[]>([])

// Computed
const isLoadingKategori = ref(false)

const isFormValid = computed(() => {
  return !!(
    formData.value.cabor_id &&
    formData.value.cabor_kategori_id &&
    formData.value.nama_program &&
    formData.value.periode_mulai &&
    formData.value.periode_selesai
  )
})

// Methods
const onCaborChange = async () => {
  // Reset kategori when cabor changes
  formData.value.cabor_kategori_id = null
  errors.value.cabor_kategori_id = ''
  availableKategori.value = []

  if (formData.value.cabor_id) {
    await fetchKategoriByCabor(formData.value.cabor_id)
  }
}

const fetchKategoriByCabor = async (caborId: number) => {
  try {
    console.log('🔄 Fetching kategori for cabor ID:', caborId)
    isLoadingKategori.value = true
    const { useProgramLatihan } = await import(
      '../../composables/useProgramLatihan'
    )
    const { fetchCaborKategoriByCabor } = useProgramLatihan()
    const kategori = await fetchCaborKategoriByCabor(caborId)
    console.log('✅ Kategori loaded:', kategori)
    availableKategori.value = kategori
  } catch (error) {
    console.error('❌ Error fetching kategori:', error)
    availableKategori.value = []
  } finally {
    isLoadingKategori.value = false
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

  if (!formData.value.nama_program.trim()) {
    errors.value.nama_program = 'Nama program harus diisi'
    isValid = false
  }

  if (!formData.value.periode_mulai) {
    errors.value.periode_mulai = 'Periode mulai harus diisi'
    isValid = false
  }

  if (!formData.value.periode_selesai) {
    errors.value.periode_selesai = 'Periode selesai harus diisi'
    isValid = false
  }

  if (formData.value.periode_mulai && formData.value.periode_selesai) {
    const startDate = new Date(formData.value.periode_mulai)
    const endDate = new Date(formData.value.periode_selesai)

    if (startDate >= endDate) {
      errors.value.periode_selesai =
        'Periode selesai harus setelah periode mulai'
      isValid = false
    }
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
      console.log('🔄 Initial data changed:', newData)
      formData.value = { ...formData.value, ...newData }

      // Jika ada cabor_id, load kategori
      if (newData.cabor_id) {
        console.log(
          '🔄 Loading kategori for initial cabor ID:',
          newData.cabor_id
        )
        fetchKategoriByCabor(newData.cabor_id)
      }
    }
  },
  { immediate: true, deep: true }
)

// Watch for cabor_id changes (untuk edit mode)
watch(
  () => formData.value.cabor_id,
  (newCaborId, oldCaborId) => {
    console.log('🔄 Cabor ID changed:', { newCaborId, oldCaborId })
    // Load kategori jika cabor berubah (kecuali saat initial load)
    if (newCaborId && newCaborId !== oldCaborId) {
      console.log('🔄 Loading kategori for changed cabor ID:', newCaborId)
      fetchKategoriByCabor(newCaborId)
    }
  }
)

// Initialize form data
onMounted(() => {
  if (props.initialData) {
    formData.value = { ...formData.value, ...props.initialData }
  }
})
</script>
