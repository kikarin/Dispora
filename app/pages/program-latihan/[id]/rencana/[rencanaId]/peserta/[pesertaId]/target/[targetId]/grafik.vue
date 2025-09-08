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
      <h1 class="text-xl font-bold text-gray-700">Grafik Target Latihan</h1>
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
          @click="fetchPesertaTargetChart(targetId)"
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

      <!-- Target Info Card -->
      <div
        v-if="targetInfo"
        class="rounded-2xl bg-white/90 p-4 backdrop-blur mb-6"
      >
        <h3 class="text-lg font-bold text-gray-700 mb-2">
          {{ targetInfo.nama }}
        </h3>
        <div class="flex items-center gap-4 text-sm text-gray-600">
          <span>•</span>
          <span>Target: {{ targetInfo.target }}</span>
          <span v-if="targetInfo.nilaiTerakhir">•</span>
          <span v-if="targetInfo.nilaiTerakhir"
            >Nilai Terakhir: {{ targetInfo.nilaiTerakhir }}</span
          >
          <span v-if="targetInfo.trend">•</span>
          <span
            v-if="targetInfo.trend"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
            :class="getTrendClass(targetInfo.trend)"
          >
            {{ targetInfo.trend }}
          </span>
        </div>
      </div>

      <!-- Grafik Card -->
      <div
        v-if="chartData && chartData.length > 0"
        class="rounded-2xl bg-white/90 p-6 backdrop-blur mb-6"
      >
        <h4 class="text-lg font-semibold text-gray-700 mb-4">
          Perkembangan Target
        </h4>
        <LineChart
          :data="getFormattedChartData()"
          :height="300"
          x-label="Tanggal"
          y-label="Nilai"
          :categories="getChartCategories()"
          :y-num-ticks="4"
          :x-num-ticks="7"
          :x-formatter="getXFormatter()"
          :curve-type="CurveType.Basis"
          :legend-position="LegendPosition.Top"
          :hide-legend="false"
          :y-grid-line="true"
        />
      </div>

      <!-- Empty Chart State -->
      <div v-else class="rounded-2xl bg-white/90 p-6 backdrop-blur mb-6">
        <h4 class="text-lg font-semibold text-gray-700 mb-4">
          Perkembangan Target
        </h4>
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
          <p class="text-gray-500">Belum ada data grafik untuk target ini.</p>
        </div>
      </div>

      <!-- Detail Data Card -->
      <div class="rounded-2xl bg-white/90 p-6 backdrop-blur">
        <h4 class="text-lg font-semibold text-gray-700 mb-4">Detail Data</h4>
        <div v-if="detailData && detailData.length > 0" class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-2 font-medium text-gray-700">
                  Tanggal
                </th>
                <th class="text-left py-3 px-2 font-medium text-gray-700">
                  Rencana Latihan
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
                <td class="py-3 px-2 text-gray-600">
                  {{ item.rencanaLatihan }}
                </td>
                <td class="py-3 px-2 text-gray-600 font-medium">
                  <div class="flex items-center gap-2">
                    <span>{{ item.nilai }}</span>
                    <!-- Icon Naik (Panah Ke Atas - Hijau) -->
                    <ArrowTrendingUpIcon
                      v-if="(item.trend || item.status) === 'Naik'"
                      class="w-5 h-5 text-green-500"
                    />
                    <!-- Icon Stabil (Garis Horizontal - Kuning) -->
                    <MinusIcon
                      v-else-if="(item.trend || item.status) === 'Stabil'"
                      class="w-5 h-5 text-yellow-500"
                    />
                    <!-- Icon Turun (Panah Ke Bawah - Merah) -->
                    <ArrowTrendingDownIcon
                      v-else-if="(item.trend || item.status) === 'Turun'"
                      class="w-5 h-5 text-red-500"
                    />
                    <!-- Default icon jika trend tidak dikenali -->
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
            Tidak ada detail data
          </h3>
          <p class="text-gray-500">Belum ada detail data untuk target ini.</p>
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
import { usePesertaTargetLatihan } from '../../../../../../../../../../composables/usePesertaTargetLatihan'
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
const programIdParam = route.params.id as string
const rencanaIdParam = route.params.rencanaId as string
const pesertaIdParam = route.params.pesertaId as string
const targetIdParam = route.params.targetId as string
const pesertaTypeParam = (route.query.peserta_type as string) || 'atlet'

console.log('Grafik target peserta page - Program ID:', programIdParam)
console.log('Grafik target peserta page - Rencana ID:', rencanaIdParam)
console.log('Grafik target peserta page - Peserta ID:', pesertaIdParam)
console.log('Grafik target peserta page - Target ID:', targetIdParam)
console.log('Grafik target peserta page - Peserta Type:', pesertaTypeParam)

// Simple validation
let programId = 1
let rencanaId = 1
let pesertaId = 1
let targetId = 1

if (programIdParam && !isNaN(Number(programIdParam))) {
  programId = parseInt(programIdParam)
}

if (rencanaIdParam && !isNaN(Number(rencanaIdParam))) {
  rencanaId = parseInt(rencanaIdParam)
}

if (pesertaIdParam && !isNaN(Number(pesertaIdParam))) {
  pesertaId = parseInt(pesertaIdParam)
}

if (targetIdParam && !isNaN(Number(targetIdParam))) {
  targetId = parseInt(targetIdParam)
}

// Use composable untuk API
const {
  pesertaInfo,
  targetInfo,
  chartData,
  detailData,
  chartLoading,
  chartError,
  fetchPesertaTargetChart,
  getTrendClass,
  getFormattedChartData,
  getChartCategories,
  getXFormatter,
} = usePesertaTargetLatihan(programId, rencanaId, pesertaId, pesertaTypeParam)

onMounted(async () => {
  console.log('Grafik target peserta page loaded for:', {
    programId,
    rencanaId,
    pesertaId,
    targetId,
  })
  await fetchPesertaTargetChart(targetId)

  // Debug: Log data untuk testing
  console.log('Chart data:', chartData.value)
  console.log('Detail data:', detailData.value)
})
</script>
