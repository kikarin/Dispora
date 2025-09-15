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
        <h1 class="text-xl font-semibold text-gray-800">
          Tambah Turnamen
        </h1>
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
    </div>

    <!-- Form -->
    <div v-else class="bg-white rounded-2xl p-6 shadow-sm">
      <TurnamenForm
        :loading="submitting"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import TurnamenForm from '~/components/TurnamenForm.vue'
import { useTurnamen } from '../../../composables/useTurnamen'

const router = useRouter()
const { loading, error, createTurnamen } = useTurnamen()

const submitting = ref(false)

const handleSubmit = async (formData: any) => {
  try {
    submitting.value = true
    await createTurnamen(formData)

    // Show success message (you can add a toast notification here)
    console.log('Turnamen berhasil dibuat')

    // Redirect to turnamen list
    router.push('/turnamen')
  } catch (err) {
    console.error('Error creating turnamen:', err)
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  router.push('/turnamen')
}

onMounted(async () => {
  // Initialize any required data here if needed
})
</script>
