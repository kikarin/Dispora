<template>
  <PageLayout>
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h1 class="text-md font-bold text-gray-700">Parameter Pemeriksaan</h1>
      </div>
      <button
        @click="goCreate"
        class="px-4 py-2 bg-[#597BF9] text-white rounded-xl text-sm font-semibold hover:bg-[#4c6ef5] transition-colors"
      >
        Tambah Parameter
      </button>
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
      <p class="text-red-600">{{ error }}</p>
    </div>
    <div v-else>
      <div v-if="items.length > 0" class="space-y-3">
        <div
          v-for="item in items"
          :key="item.id"
          class="rounded-2xl bg-white/90 p-4 border border-gray-100"
        >
          <div class="flex items-start justify-between">
            <div>
              <div class="font-semibold text-gray-800">
                {{ item.nama_parameter }}
              </div>
              <div class="text-xs text-gray-500 mt-1" v-if="item.satuan">
                Satuan: <span class="font-medium">{{ item.satuan }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                @click="goEdit(item.id)"
                class="px-3 py-1.5 text-xs rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(item.id, item.nama_parameter)"
                class="px-3 py-1.5 text-xs rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-12">
        Belum ada parameter pemeriksaan.
      </div>
    </div>

    <Alert
      :show-alert="showAlert"
      :alert-config="alertConfig"
      @hide="hideAlert"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import Alert from '~/components/Alert.vue'
import { usePemeriksaanParameter } from '../../../../../composables/usePemeriksaanParameter'
import { useAlert } from '../../../../../composables/useAlert'

const router = useRouter()
const route = useRoute()
const pemeriksaanId = computed(() => parseInt(route.params.id as string))

const {
  loading,
  error,
  pemeriksaan,
  parameterItems: items,
  fetchList,
  deleteParam,
} = usePemeriksaanParameter()

const {
  showAlert,
  alertConfig,
  showConfirm,
  hideAlert,
  handleConfirm,
  handleCancel,
} = useAlert()

const goCreate = () =>
  router.push(`/pemeriksaan/${pemeriksaanId.value}/parameter/create`)
const goEdit = (paramId: number) =>
  router.push(`/pemeriksaan/${pemeriksaanId.value}/parameter/edit/${paramId}`)

const confirmDelete = (paramId: number, name: string) => {
  showConfirm({
    title: 'Konfirmasi Hapus',
    message: `Hapus parameter "${name}"?`,
    type: 'warning',
    confirmText: 'Hapus',
    cancelText: 'Batal',
    onConfirm: async () => {
      const ok = await deleteParam(pemeriksaanId.value, paramId)
      if (ok) await fetchList(pemeriksaanId.value)
    },
  })
}

onMounted(async () => {
  await fetchList(pemeriksaanId.value)
})
</script>
