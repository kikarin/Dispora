<template>
  <PageLayout>
    <!-- Header -->
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
      <h1 class="text-xl font-bold text-gray-700">Target Latihan Peserta</h1>
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
          @click="fetchPesertaTargets"
          class="px-3 py-1 text-red-700 underline text-sm hover:text-red-800"
        >
          Coba lagi
        </button>
      </div>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Peserta Info Card -->
      <div
        v-if="pesertaInfo"
        class="rounded-2xl bg-white/90 p-4 backdrop-blur mb-6"
      >
        <div class="flex items-center gap-4">
          <!-- Foto Peserta -->
          <div class="flex-shrink-0">
            <div
              class="w-16 h-16 rounded-full bg-gradient-to-br from-[#597BF9]/20 to-[#4c6ef5]/30 flex items-center justify-center overflow-hidden"
            >
              <img
                v-if="pesertaInfo.foto"
                :src="pesertaInfo.foto"
                :alt="pesertaInfo.nama"
                class="w-full h-full object-cover"
              />
              <svg
                v-else
                class="w-10 h-10 text-[#597BF9]"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          <!-- Info Peserta -->
          <div class="flex-1">
            <h2 class="text-lg font-bold text-gray-700 mb-1">
              {{ pesertaInfo.nama }}
            </h2>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span>{{ pesertaInfo.jenisKelamin }}</span>
              <span>•</span>
              <span>{{ pesertaInfo.usia }} tahun</span>
              <span>•</span>
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ pesertaInfo.posisi }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Target List -->
      <div v-if="targets && targets.length > 0" class="space-y-4">
        <div
          v-for="target in targets"
          :key="target.id"
          class="p-4 bg-white/90 rounded-2xl backdrop-blur cursor-pointer hover:bg-white transition-all duration-300 hover:-translate-y-1"
          @click="viewGrafik(target.id)"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h4 class="font-semibold text-gray-700 mb-2">
                {{ target.nama }}
              </h4>
              <div class="flex items-center gap-4 text-sm text-gray-600">
                <span>Target: {{ target.target }}</span>
                <span>•</span>
                <span>Nilai Terakhir: {{ target.nilaiTerakhir }}</span>
              </div>
              <div class="mt-2">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="getTrendClass(target.trend)"
                >
                  {{ target.trend }}
                </span>
              </div>
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

      <!-- Empty State -->
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
          Tidak ada target latihan
        </h3>
        <p class="text-gray-500">
          Peserta ini belum memiliki target latihan yang tercatat.
        </p>
      </div>
    </div>

    <!-- Spacer for bottom navigation -->
    <div class="h-20"></div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { usePesertaTargetLatihan } from '../../../../../../../../composables/usePesertaTargetLatihan'

const route = useRoute()
const router = useRouter()

// Validate and handle route params
const programIdParam = route.params.id as string
const rencanaIdParam = route.params.rencanaId as string
const pesertaIdParam = route.params.pesertaId as string
const pesertaTypeParam = (route.query.peserta_type as string) || 'atlet'

console.log('Target peserta page - Program ID:', programIdParam)
console.log('Target peserta page - Rencana ID:', rencanaIdParam)
console.log('Target peserta page - Peserta ID:', pesertaIdParam)
console.log('Target peserta page - Peserta Type:', pesertaTypeParam)

// Simple validation
let programId = 1
let rencanaId = 1
let pesertaId = 1

if (programIdParam && !isNaN(Number(programIdParam))) {
  programId = parseInt(programIdParam)
}

if (rencanaIdParam && !isNaN(Number(rencanaIdParam))) {
  rencanaId = parseInt(rencanaIdParam)
}

if (pesertaIdParam && !isNaN(Number(pesertaIdParam))) {
  pesertaId = parseInt(pesertaIdParam)
}

// Use composable untuk API
const {
  pesertaInfo,
  targets,
  loading,
  error,
  fetchPesertaTargets,
  getTrendClass,
} = usePesertaTargetLatihan(programId, rencanaId, pesertaId, pesertaTypeParam)

// Navigation function
const viewGrafik = (targetId: number) => {
  console.log('Navigating to grafik for target:', targetId)
  router.push(
    `/program-latihan/${programId}/rencana/${rencanaId}/peserta/${pesertaId}/target/${targetId}/grafik?peserta_type=${pesertaTypeParam}`
  )
}

onMounted(async () => {
  console.log('Target peserta page loaded for:', {
    programId,
    rencanaId,
    pesertaId,
  })
  await fetchPesertaTargets()
})
</script>
