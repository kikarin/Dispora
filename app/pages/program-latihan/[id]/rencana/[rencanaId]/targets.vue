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
      <h1 class="text-xl font-bold text-gray-700">Target Latihan</h1>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-6">
      <div class="flex bg-white/80 rounded-2xl p-1 backdrop-blur">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200"
          :class="
            activeTab === tab.id
              ? 'bg-[#597BF9] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-700'
          "
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Content based on active tab -->
    <div>
      <!-- Error State -->
      <div
        v-if="error"
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
            @click="fetchTargetList(rencanaId)"
            class="px-3 py-1 text-red-700 underline text-sm hover:text-red-800"
          >
            Coba lagi
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="
          !loading &&
          (!targetList ||
            (targetList.targetIndividu.length === 0 &&
              targetList.targetKelompok.length === 0))
        "
        class="text-center py-12"
      >
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
          Belum ada target latihan yang tersedia untuk rencana ini.
        </p>
      </div>

      <!-- Target Individu -->
      <div
        v-else-if="
          activeTab === 'individu' && targetList?.targetIndividu?.length > 0
        "
        class="space-y-4"
      >
        <div
          v-for="target in targetList.targetIndividu"
          :key="target.id"
          class="p-4 bg-white rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
          @click="navigateToTargetDetail(target.id)"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1">
              <h4 class="font-semibold text-gray-700 mb-2">
                {{ target.nama }}
              </h4>
              <span
                v-if="target.peserta"
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                :class="getPesertaBadgeClass(target.peserta)"
              >
                {{ target.peserta }}
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
          <p class="text-sm text-gray-600">{{ target.target }}</p>
        </div>
      </div>

      <!-- Target Kelompok -->
      <div
        v-else-if="
          activeTab === 'kelompok' && targetList?.targetKelompok?.length > 0
        "
        class="space-y-4"
      >
        <div
          v-for="target in targetList.targetKelompok"
          :key="target.id"
          class="p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
          @click="openTargetKelompokModal(target)"
        >
          <div class="flex items-start justify-between mb-2">
            <h4 class="font-semibold text-gray-700">{{ target.nama }}</h4>
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
          <p class="text-sm text-gray-600">{{ target.target }}</p>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9] mx-auto"
        ></div>
        <p class="text-gray-500 mt-2">Memuat data target...</p>
      </div>
    </div>

    <!-- Modal Target Kelompok -->
    <div
      v-if="showTargetKelompokModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="closeTargetKelompokModal"
      ></div>
      <div
        class="relative bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-700">
            {{ selectedTargetKelompok.nama }}
          </h3>
          <button
            @click="closeTargetKelompokModal"
            class="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              class="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div v-if="selectedTargetKelompok" class="space-y-4">
          <div>
            <p class="text-sm text-gray-600">
              {{ selectedTargetKelompok.target }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-3 bg-gray-50 rounded-xl">
              <p class="text-xs text-gray-500 mb-1">Nilai</p>
              <p class="text-2xl font-bold text-[#597BF9]">
                {{ selectedTargetKelompok.nilai || 'N/A' }}
              </p>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-xl">
              <p class="text-xs text-gray-500 mb-1">Status</p>
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                :class="getTrendClass(selectedTargetKelompok.trend)"
              >
                {{ selectedTargetKelompok.trend || 'Belum di-set' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Spacer for bottom navigation -->
    <div class="h-20"></div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  ArrowTrendingUpIcon,
  MinusIcon,
  ArrowTrendingDownIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/24/solid'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { useTargetLatihan } from '../../../../../../composables/useTargetLatihan'

const route = useRoute()
const router = useRouter()

// Validate and handle route params
const programIdParam = route.params.id as string
const rencanaIdParam = route.params.rencanaId as string

console.log('Target rencana page - Program ID:', programIdParam)
console.log('Target rencana page - Rencana ID:', rencanaIdParam)

// Simple validation
let programId = 1
let rencanaId = 1

if (programIdParam && !isNaN(Number(programIdParam))) {
  programId = parseInt(programIdParam)
}

if (rencanaIdParam && !isNaN(Number(rencanaIdParam))) {
  rencanaId = parseInt(rencanaIdParam)
}

// Use composable
const { targetList, loading, error, fetchTargetList } = useTargetLatihan()

// Tab Management
const activeTab = ref('individu')
const tabs = computed(() => [
  {
    id: 'individu',
    label: `Target Individu (${targetList.value?.targetIndividu?.length || 0})`,
  },
  {
    id: 'kelompok',
    label: `Target Kelompok (${targetList.value?.targetKelompok?.length || 0})`,
  },
])

// Modal State
const showTargetKelompokModal = ref(false)
const selectedTargetKelompok = ref<any>(null)

// Functions
const getPesertaBadgeClass = (peserta: string) => {
  switch (peserta) {
    case 'Atlet':
      return 'bg-blue-100 text-blue-800 border border-blue-200'
    case 'Pelatih':
      return 'bg-green-100 text-green-800 border border-green-200'
    case 'Tenaga Pendukung':
      return 'bg-orange-100 text-orange-800 border border-orange-200'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

const navigateToTargetDetail = (targetId: number) => {
  console.log('Navigating to target detail for:', targetId)
  router.push(
    `/program-latihan/${programId}/rencana/${rencanaId}/target/${targetId}`
  )
}

const openTargetKelompokModal = (target: any) => {
  selectedTargetKelompok.value = target
  showTargetKelompokModal.value = true
}

const closeTargetKelompokModal = () => {
  showTargetKelompokModal.value = false
  selectedTargetKelompok.value = null
}

const getTrendClass = (trend: string | null) => {
  switch (trend) {
    case 'naik':
      return 'text-green-600 bg-green-100'
    case 'turun':
      return 'text-red-600 bg-red-100'
    case 'stabil':
      return 'text-yellow-600 bg-yellow-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

onMounted(() => {
  console.log(
    'Target rencana page loaded for Program ID:',
    programId,
    'Rencana ID:',
    rencanaId
  )
  console.log('Route params:', route.params)
  fetchTargetList(rencanaId)
})
</script>
