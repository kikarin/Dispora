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
        <h1 class="text-xl font-semibold text-gray-800">Edit Pemeriksaan</h1>
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
      <div class="mt-3">
        <button
          @click="loadPemeriksaanData"
          class="px-3 py-1 text-red-700 underline text-sm hover:text-red-800"
        >
          Coba lagi
        </button>
      </div>
    </div>

    <!-- Form -->
    <div v-else-if="pemeriksaanData" class="bg-white rounded-2xl p-6 shadow-sm">
      <PemeriksaanForm
        :initial-data="formData"
        :cabor-list="caborListForForm"
        :loading="submitting"
        :is-edit="true"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>

    <!-- Not Found -->
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
        Pemeriksaan tidak ditemukan
      </h3>
      <p class="text-gray-500 mb-4">
        Pemeriksaan yang Anda cari tidak ditemukan atau telah dihapus.
      </p>
      <button
        @click="$router.push('/pemeriksaan')"
        class="px-4 py-2 bg-[#597BF9] text-white rounded-lg hover:bg-[#4c6ef5] transition-colors"
      >
        Kembali ke Daftar Pemeriksaan
      </button>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import PemeriksaanForm from '~/components/PemeriksaanForm.vue'
import { usePemeriksaan } from '../../../../composables/usePemeriksaan'

const router = useRouter()
const route = useRoute()
const {
  pemeriksaanList,
  caborList,
  loading,
  error,
  fetchCaborListForCreate,
  fetchPemeriksaanDetail,
  updatePemeriksaan,
} = usePemeriksaan()

const pemeriksaanData = ref<any>(null)
const submitting = ref(false)
const caborListForForm = ref<any[]>([])

const pemeriksaanId = computed(() => parseInt(route.params.id as string))

const formData = computed(() => {
  if (!pemeriksaanData.value) return null

  return {
    cabor_id: pemeriksaanData.value.cabor?.id || null,
    cabor_kategori_id: pemeriksaanData.value.kategori?.id || null,
    tenaga_pendukung_id: pemeriksaanData.value.tenaga_pendukung?.id || null,
    nama_pemeriksaan: pemeriksaanData.value.nama_pemeriksaan || '',
    tanggal_pemeriksaan: pemeriksaanData.value.tanggal_pemeriksaan || '',
    status: pemeriksaanData.value.status || 'belum',
  }
})

const loadPemeriksaanData = async () => {
  try {
    const data = await fetchPemeriksaanDetail(pemeriksaanId.value)
    if (data) {
      pemeriksaanData.value = data
    }
  } catch (err) {
    console.error('Error loading pemeriksaan data:', err)
  }
}

const handleSubmit = async (formData: any) => {
  try {
    submitting.value = true
    await updatePemeriksaan(pemeriksaanId.value, formData)

    // Show success message (you can add a toast notification here)
    console.log('Pemeriksaan berhasil diupdate')

    // Redirect to pemeriksaan list
    router.push('/pemeriksaan')
  } catch (err) {
    console.error('Error updating pemeriksaan:', err)
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  router.push('/pemeriksaan')
}

onMounted(async () => {
  try {
    const caborData = await fetchCaborListForCreate()
    caborListForForm.value = caborData || []
  } catch (err) {
    console.error('Error fetching cabor list:', err)
  }

  await loadPemeriksaanData()
})
</script>
