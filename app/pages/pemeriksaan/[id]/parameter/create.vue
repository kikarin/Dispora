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
          Tambah Parameter Pemeriksaan
        </h1>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <PemeriksaanParameterForm
        :loading="submitting"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import PemeriksaanParameterForm from '~/components/PemeriksaanParameterForm.vue'
import { usePemeriksaanParameter } from '../../../../../composables/usePemeriksaanParameter'

const router = useRouter()
const route = useRoute()
const pemeriksaanId = computed(() => parseInt(route.params.id as string))

const { createParam } = usePemeriksaanParameter()
const submitting = ref(false)

const handleSubmit = async (mstParameterId: number) => {
  try {
    submitting.value = true
    await createParam(pemeriksaanId.value, mstParameterId)
    router.push(`/pemeriksaan/${pemeriksaanId.value}/parameter`)
  } finally {
    submitting.value = false
  }
}

const handleCancel = () =>
  router.push(`/pemeriksaan/${pemeriksaanId.value}/parameter`)
</script>
