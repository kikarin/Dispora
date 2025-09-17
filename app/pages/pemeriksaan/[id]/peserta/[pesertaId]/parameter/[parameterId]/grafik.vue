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
      <h1 class="text-xl font-bold text-gray-700">
        Grafik Parameter Pemeriksaan
      </h1>
    </div>

    <!-- Loading State -->
    <div v-if="chartLoading" class="flex justify-center items-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9]"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="chartError"
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
          <p class="text-red-600 text-sm font-medium">{{ chartError }}</p>
        </div>
      </div>
      <div class="mt-3">
        <button
          @click="fetchPesertaParameterChart(parameterId)"
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
            <h2 class="text-base font-bold text-gray-700 mb-1">
              {{ pesertaInfo.nama }}
            </h2>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span>{{ pesertaInfo.jenisKelamin }}</span>
              <span>•</span>
              <span>{{ pesertaInfo.usia }} tahun</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Parameter Info Card -->
      <div
        v-if="parameterInfo"
        class="rounded-2xl bg-white/90 p-4 backdrop-blur mb-6"
      >
        <h3 class="text-base font-bold text-gray-700 mb-2">
          {{ parameterInfo.parameter }}
        </h3>
        <div class="flex items-center gap-4 text-sm text-gray-600">
          <span>•</span>
          <span>Nilai Terakhir: {{ parameterInfo.nilaiTerakhir }}</span>
          <span>•</span>
          <span
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
            :class="getStatusClass(parameterInfo.status)"
          >
            {{ parameterInfo.status }}
          </span>
        </div>
      </div>

      <!-- Grafik Card -->
      <div
        v-if="chartData && chartData.length > 0"
        class="rounded-2xl bg-white/90 p-6 backdrop-blur mb-6"
      >
        <h4 class="text-base font-semibold text-gray-700 mb-4">
          Perkembangan Parameter
        </h4>
        <LineChart
          :data="getFormattedChartData"
          :height="300"
          x-label="Tanggal"
          y-label="Nilai"
          :categories="getChartCategories"
          :y-num-ticks="4"
          :x-num-ticks="7"
          :x-formatter="getXFormatter"
          :curve-type="CurveType.Basis"
          :legend-position="LegendPosition.Top"
          :hide-legend="false"
          :y-grid-line="true"
        />
      </div>

      <!-- Empty State untuk Chart -->
      <div
        v-else-if="!chartLoading"
        class="rounded-2xl bg-white/90 p-6 backdrop-blur mb-6"
      >
        <div class="text-center py-8">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Tidak ada data grafik
          </h3>
          <p class="text-gray-500">
            Belum ada data grafik untuk parameter ini.
          </p>
        </div>
      </div>

      <!-- Detail Data Card -->
      <div class="rounded-2xl bg-white/90 p-6 backdrop-blur">
        <h4 class="text-base font-semibold text-gray-700 mb-4">Detail Data</h4>
        <div v-if="detailData && detailData.length > 0" class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-2 font-medium text-gray-700">
                  Tanggal
                </th>
                <th class="text-left py-3 px-2 font-medium text-gray-700">
                  Pemeriksaan
                </th>
                <th class="text-left py-3 px-2 font-medium text-gray-700">
                  Nilai
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in detailData"
                :key="index"
                class="border-b border-gray-100"
              >
                <td class="py-3 px-2 text-gray-600">{{ item.tanggal }}</td>
                <td class="py-3 px-2 text-gray-600">{{ item.pemeriksaan }}</td>
                <td class="py-3 px-2 text-gray-600 font-medium">
                  <div class="flex items-center gap-2">
                    <span>{{ item.nilai }}</span>
                    <!-- Icon Kenaikan (Panah Ke Atas - Hijau) -->
                    <!-- Kenaikan -->
                    <ArrowTrendingUpIcon
                      v-if="item.status === 'Kenaikan'"
                      class="w-5 h-5 text-red-500"
                    />

                    <!-- Stabil -->
                    <MinusIcon
                      v-else-if="item.status === 'Stabil'"
                      class="w-5 h-5 text-green-500"
                    />

                    <!-- Penurunan -->
                    <ArrowTrendingDownIcon
                      v-else-if="item.status === 'Penurunan'"
                      class="w-5 h-5 text-purple-500"
                    />

                    <!-- Default -->
                    <QuestionMarkCircleIcon
                      v-else
                      class="w-5 h-5 text-gray-400"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Empty State untuk Detail Data -->
        <div v-else class="text-center py-8">
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
            Tidak ada data detail
          </h3>
          <p class="text-gray-500">
            Belum ada data detail untuk parameter ini.
          </p>
        </div>
      </div>
    </div>

    <!-- Spacer for bottom navigation -->
    <div class="h-20"></div>
  </PageLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import {
  ArrowTrendingUpIcon,
  MinusIcon,
  ArrowTrendingDownIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { usePesertaPemeriksaanParameter } from '../../../../../../../../composables/usePesertaPemeriksaanParameter'

// Import untuk NuxtCharts
const CurveType = {
  Linear: 'linear',
  Basis: 'basis',
  MonotoneX: 'monotoneX',
  MonotoneY: 'monotoneY',
}

const LegendPosition = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
  None: 'none',
}

const route = useRoute()

// Validate and handle route params
const pemeriksaanIdParam = route.params.id as string
const pesertaIdParam = route.params.pesertaId as string
const parameterIdParam = route.params.parameterId as string

console.log(
  'Grafik parameter pemeriksaan peserta page - Pemeriksaan ID:',
  pemeriksaanIdParam
)
console.log(
  'Grafik parameter pemeriksaan peserta page - Peserta ID:',
  pesertaIdParam
)
console.log(
  'Grafik parameter pemeriksaan peserta page - Parameter ID:',
  parameterIdParam
)

// Simple validation
let pemeriksaanId = 1
let pesertaId = 1
let parameterId = 1

if (pemeriksaanIdParam && !isNaN(Number(pemeriksaanIdParam))) {
  pemeriksaanId = parseInt(pemeriksaanIdParam)
}

if (pesertaIdParam && !isNaN(Number(pesertaIdParam))) {
  pesertaId = parseInt(pesertaIdParam)
}

if (parameterIdParam && !isNaN(Number(parameterIdParam))) {
  parameterId = parseInt(parameterIdParam)
}

// Use composable untuk API
const {
  pesertaInfo,
  parameterInfo,
  chartData,
  detailData,
  chartLoading,
  chartError,
  fetchPesertaParameterChart,
  getStatusClass,
  getFormattedChartData,
  getChartCategories,
  getXFormatter,
} = usePesertaPemeriksaanParameter(pemeriksaanId, pesertaId, 'atlet')

onMounted(async () => {
  console.log('Grafik parameter pemeriksaan peserta page loaded for:', {
    pemeriksaanId,
    pesertaId,
    parameterId,
  })
  await fetchPesertaParameterChart(parameterId)

  // Debug: Log data untuk testing
  console.log('Chart data:', chartData.value)
  console.log('Detail data:', detailData.value)
})
</script>
