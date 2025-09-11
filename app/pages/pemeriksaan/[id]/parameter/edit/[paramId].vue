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
          Edit Parameter Pemeriksaan
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
      <PemeriksaanParameterForm
        :initial-value="initialValue"
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
import PemeriksaanParameterForm from '~/components/PemeriksaanParameterForm.vue'
import { usePemeriksaanParameter } from '../../../../../../composables/usePemeriksaanParameter'

const router = useRouter()
const route = useRoute()
const pemeriksaanId = computed(() => parseInt(route.params.id as string))
const paramId = computed(() => parseInt(route.params.paramId as string))

const { fetchList, parameterItems, updateParam, loading, error } =
  usePemeriksaanParameter()
const initialValue = ref<number | null>(null)
const submitting = ref(false)

onMounted(async () => {
  await fetchList(pemeriksaanId.value)
  const found = parameterItems.value.find((p) => p.id === paramId.value)
  // initial value is the linked mst_parameter_id; since list endpoint doesn't return it, fallback to null; backend update accepts new mst_parameter_id
  initialValue.value = null
})

const handleSubmit = async (mstParameterId: number) => {
  try {
    submitting.value = true
    await updateParam(pemeriksaanId.value, paramId.value, mstParameterId)
    router.push(`/pemeriksaan/${pemeriksaanId.value}/parameter`)
  } finally {
    submitting.value = false
  }
}

const handleCancel = () =>
  router.push(`/pemeriksaan/${pemeriksaanId.value}/parameter`)
</script>
