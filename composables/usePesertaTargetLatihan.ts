import { ref, watch } from 'vue'
import { useAuth } from './useAuth'

interface PesertaInfo {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number
  posisi: string
}

interface TargetInfo {
  id: number
  nama: string
  target: string
  nilaiTerakhir?: string
  trend?: string
}

interface ChartDataItem {
  month: string
  nilai: number
  trend?: string
}

interface DetailDataItem {
  tanggal: string
  rencanaLatihan: string
  nilai: string
  trend?: string
  status?: string
}

interface PesertaTargetsResponse {
  pesertaInfo: PesertaInfo
  targets: TargetInfo[]
}

interface PesertaTargetChartResponse {
  pesertaInfo: PesertaInfo
  targetInfo: TargetInfo
  chartData: ChartDataItem[]
  detailData: DetailDataItem[]
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const usePesertaTargetLatihan = (
  programId: number,
  rencanaId: number,
  pesertaId: number,
  pesertaType: string = 'atlet'
) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://dispora.summitbreak.com/api'
  const { getAuthHeaders, isAuthenticated, initAuth } = useAuth()

  // Initialize auth on composable creation
  if (process.client) {
    initAuth()
  }

  // State untuk list targets
  const pesertaInfo = ref<PesertaInfo | null>(null)
  const targets = ref<TargetInfo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // State untuk chart data
  const targetInfo = ref<TargetInfo | null>(null)
  const chartData = ref<ChartDataItem[]>([])
  const detailData = ref<DetailDataItem[]>([])
  const chartLoading = ref(false)
  const chartError = ref<string | null>(null)

  // Fetch participant targets
  const fetchPesertaTargets = async () => {
    // Re-check auth before API call
    if (process.client) {
      initAuth()
    }

    if (!isAuthenticated.value) {
      error.value = 'Anda harus login terlebih dahulu.'
      loading.value = false
      console.warn('User not authenticated, redirecting to login')
      if (process.client) {
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      }
      return
    }

    try {
      loading.value = true
      error.value = null

      const url = `${baseURL}/program-latihan/${programId}/rencana/${rencanaId}/peserta/${pesertaId}/targets/${pesertaType}`

      console.log('🔍 Fetching peserta targets with URL:', url)
      console.log('🔑 Auth headers:', getAuthHeaders())

      const response = await $fetch<ApiResponse<PesertaTargetsResponse>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })

      console.log('📊 API Response:', response)

      if (response.status === 'success') {
        pesertaInfo.value = response.data.pesertaInfo
        targets.value = response.data.targets || []

        console.log('✅ Peserta targets loaded:', {
          pesertaInfo: pesertaInfo.value,
          targetsCount: targets.value.length,
        })
      } else {
        error.value =
          response.message || 'Gagal mengambil data target latihan peserta'
      }
    } catch (err: any) {
      console.error('❌ Error fetching peserta targets:', err)

      if (err?.status === 302 || err?.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        error.value = 'Peserta atau target latihan tidak ditemukan.'
      } else {
        error.value = err?.message || 'Terjadi kesalahan saat mengambil data.'
      }
    } finally {
      loading.value = false
    }
  }

  // Fetch participant target chart data
  const fetchPesertaTargetChart = async (targetId: number) => {
    // Re-check auth before API call
    if (process.client) {
      initAuth()
    }

    if (!isAuthenticated.value) {
      chartError.value = 'Anda harus login terlebih dahulu.'
      chartLoading.value = false
      console.warn('User not authenticated, redirecting to login')
      if (process.client) {
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      }
      return
    }

    try {
      chartLoading.value = true
      chartError.value = null

      const url = `${baseURL}/program-latihan/${programId}/rencana/${rencanaId}/peserta/${pesertaId}/target/${targetId}/grafik/${pesertaType}`

      console.log('📈 Fetching peserta target chart with URL:', url)
      console.log('🔑 Auth headers:', getAuthHeaders())

      const response = await $fetch<ApiResponse<PesertaTargetChartResponse>>(
        url,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      console.log('📊 Chart API Response:', response)

      if (response.status === 'success') {
        pesertaInfo.value = response.data.pesertaInfo
        targetInfo.value = response.data.targetInfo
        chartData.value = response.data.chartData || []

        detailData.value = (response.data.detailData || []).map(
          (item: any) => ({
            tanggal: item.tanggal,
            rencanaLatihan: item.rencana,
            nilai: item.nilai,
            trend: item.status,
            status: item.status,
          })
        )

        console.log('✅ Peserta target chart loaded:', {
          pesertaInfo: pesertaInfo.value,
          targetInfo: targetInfo.value,
          chartDataCount: chartData.value.length,
          detailDataCount: detailData.value.length,
        })
      } else {
        chartError.value =
          response.message ||
          'Gagal mengambil data grafik target latihan peserta'
      }
    } catch (err: any) {
      console.error('❌ Error fetching peserta target chart:', err)

      if (err?.status === 302 || err?.status === 401) {
        chartError.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        chartError.value = 'Target latihan atau data grafik tidak ditemukan.'
      } else {
        chartError.value =
          err?.message || 'Terjadi kesalahan saat mengambil data grafik.'
      }
    } finally {
      chartLoading.value = false
    }
  }

  // Helper function untuk mendapatkan class trend
  const getTrendClass = (trend: string) => {
    switch (trend) {
      case 'Naik':
        return 'bg-green-100 text-green-800'
      case 'Turun':
        return 'bg-red-100 text-red-800'
      case 'Stabil':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Helper function untuk format chart data untuk NuxtCharts
  const getFormattedChartData = () => {
    return chartData.value.map((item) => ({
      month: item.month,
      nilai: item.nilai,
    }))
  }

  // Helper function untuk categories chart
  const getChartCategories = () => {
    return {
      nilai: { name: 'Nilai', color: '#22c55e' },
    }
  }

  // Helper function untuk x formatter
  const getXFormatter = () => {
    return (tick: number, _i?: number, _ticks?: number[]): string => {
      return chartData.value[tick]?.month ?? ''
    }
  }

  return {
    // State untuk list targets
    pesertaInfo,
    targets,
    loading,
    error,
    fetchPesertaTargets,

    // State untuk chart data
    targetInfo,
    chartData,
    detailData,
    chartLoading,
    chartError,
    fetchPesertaTargetChart,

    // Helper functions
    getTrendClass,
    getFormattedChartData,
    getChartCategories,
    getXFormatter,
  }
}
