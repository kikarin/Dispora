<template>
  <PageLayout>
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
          @click="fetchParameterList()"
          class="px-3 py-1 text-red-700 underline text-sm hover:text-red-800"
        >
          Coba lagi
        </button>
      </div>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-4">
          <button
            @click="$router.back()"
            class="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white"
          >
            <svg
              class="w-5 h-5"
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
          <div class="flex-1">
            <h1 class="text-[24px] font-bold text-gray-700">
              Parameter Pemeriksaan
            </h1>
          </div>
        </div>
      </div>

      <!-- Parameter List -->
      <div v-if="filteredParameterList.length > 0" class="space-y-4">
        <div
          v-for="parameter in filteredParameterList"
          :key="parameter.id"
          class="p-4 bg-white/90 rounded-2xl backdrop-blur cursor-pointer hover:bg-white transition-all duration-300 hover:-translate-y-1"
          @click="navigateToParameterDetail(parameter.id)"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h4 class="font-semibold text-gray-700 mb-2">
                {{ parameter.nama_parameter }}
              </h4>
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ parameter.satuan }}
              </span>
            </div>
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Spacer for bottom navigation -->
    <div class="h-20"></div>

    <div class="h-20"></div>
  </PageLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { useParameterPemeriksaan } from '../../../../composables/useParameterPemeriksaan'
import { useAuth } from '../../../../composables/useAuth'

const route = useRoute()
const router = useRouter()
const { initAuth } = useAuth()

// Validate and handle route params
const pemeriksaanIdParam = route.params.id as string

console.log('Parameter pemeriksaan page - Pemeriksaan ID:', pemeriksaanIdParam)

// Simple validation
let pemeriksaanId = 1

if (pemeriksaanIdParam && !isNaN(Number(pemeriksaanIdParam))) {
  pemeriksaanId = parseInt(pemeriksaanIdParam)
}

// Use composable
const { loading, error, fetchParameterList, filteredParameterList } =
  useParameterPemeriksaan(pemeriksaanId)

// Functions
const navigateToParameterDetail = (parameterId: number) => {
  console.log('Navigating to parameter detail for:', parameterId)
  router.push(`/pemeriksaan/${pemeriksaanId}/parameter/${parameterId}`)
}

onMounted(async () => {
  initAuth()
  await fetchParameterList()
  console.log(
    'Parameter pemeriksaan page loaded for Pemeriksaan ID:',
    pemeriksaanId
  )
  console.log('Route params:', route.params)
})
</script>
