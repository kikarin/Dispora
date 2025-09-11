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
        <h1 class="text-xl font-semibold text-gray-800">Edit Target Latihan</h1>
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
      <p class="text-red-600 text-sm">{{ error }}</p>
    </div>
    <div v-else class="bg-white rounded-2xl p-6 shadow-sm">
      <TargetLatihanForm
        :program-id="programId"
        :initial-data="formData"
        :loading="submitting"
        :is-edit="true"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import TargetLatihanForm from '~/components/TargetLatihanForm.vue'
import { useProgramTargetLatihan } from '../../../../../../composables/useProgramTargetLatihan'

const router = useRouter()
const route = useRoute()
const programId = computed(() => parseInt(route.params.id as string))
const targetId = computed(() => parseInt(route.params.targetId as string))

const { fetchTargetDetail, updateTarget } = useProgramTargetLatihan()

const loading = ref(true)
const error = ref<string | null>(null)
const submitting = ref(false)
const formData = ref<any>(null)

onMounted(async () => {
  try {
    const data = await fetchTargetDetail(targetId.value)
    if (data) {
      formData.value = {
        program_latihan_id: data.program_latihan?.id ?? programId.value,
        jenis_target:
          (data.jenis_target as 'individu' | 'kelompok') ?? 'individu',
        peruntukan: (data.peruntukan as any) ?? '',
        deskripsi: data.deskripsi ?? '',
        satuan: data.satuan ?? '',
        nilai_target: data.nilai_target ?? '',
      }
    } else {
      formData.value = {
        program_latihan_id: programId.value,
        jenis_target: 'individu',
        peruntukan: '',
        deskripsi: '',
        satuan: '',
        nilai_target: '',
      }
    }
  } catch (e: any) {
    error.value = e?.message || 'Gagal memuat data.'
  } finally {
    loading.value = false
  }
})

const handleSubmit = async (payload: any) => {
  try {
    submitting.value = true
    await updateTarget(targetId.value, payload)
    router.push(`/program-latihan/${programId.value}/target`)
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  router.push(`/program-latihan/${programId.value}/target`)
}
</script>
