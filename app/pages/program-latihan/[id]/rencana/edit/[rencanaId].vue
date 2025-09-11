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
        <h1 class="text-xl font-semibold text-gray-800">
          Edit Rencana Latihan
        </h1>
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
      <p class="text-red-600">{{ error }}</p>
    </div>
    <div v-else class="bg-white rounded-2xl p-6 shadow-sm">
      <RencanaLatihanForm
        :program-id="programId"
        :initial-data="formData"
        :is-edit="true"
        @submit="handleSubmit"
      />
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import RencanaLatihanForm from '~/components/RencanaLatihanForm.vue'
import { useRencanaLatihanForm } from '../../../../../../composables/useRencanaLatihanForm'

const router = useRouter()
const route = useRoute()
const programId = computed(() => parseInt(route.params.id as string))
const rencanaId = computed(() => parseInt(route.params.rencanaId as string))

const { updateRencana, fetchRencanaDetail } = useRencanaLatihanForm()

const loading = ref(false)
const error = ref<string | null>(null)
const formData = ref<any>(null)

onMounted(async () => {
  try {
    loading.value = true
    const data = await fetchRencanaDetail(rencanaId.value)
    formData.value = {
      program_latihan_id: data?.program_latihan?.id ?? programId.value,
      tanggal: data?.tanggal ?? '',
      materi: data?.materi ?? '',
      lokasi_latihan: data?.lokasi_latihan ?? '',
      catatan: data?.catatan ?? '',
      target_latihan_ids: (data?.targets || []).map((t: any) => t.id),
      atlet_ids: (data?.atlet || []).map((a: any) => a.id),
      pelatih_ids: (data?.pelatih || []).map((p: any) => p.id),
      tenaga_pendukung_ids: (data?.tenaga_pendukung || []).map(
        (t: any) => t.id
      ),
    }
  } catch (e: any) {
    error.value = e?.message || 'Gagal memuat data'
  } finally {
    loading.value = false
  }
})

const handleSubmit = async (payload: any) => {
  await updateRencana(rencanaId.value, payload)
  router.push(`/program-latihan/${programId.value}`)
}
</script>
