import { ref, computed } from 'vue'
import { useAuth } from './useAuth'

// Interfaces
interface PesertaInfo {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number
  posisi: string
}

interface ParameterInfo {
  id: number
  nama: string
  parameter: string
  nilaiTerakhir: string
  status: string
}

interface ChartDataItem {
  month: string
  nilai: number
  trend?: string
}

interface DetailDataItem {
  tanggal: string
  pemeriksaan: string
  nilai: string
  status?: string
}

interface PesertaParameterListResponse {
  pesertaInfo: PesertaInfo
  parameterList: ParameterInfo[]
}

interface PesertaParameterChartResponse {
  pesertaInfo: PesertaInfo
  parameterInfo: ParameterInfo
  chartData: ChartDataItem[]
  detailData: DetailDataItem[]
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const usePesertaPemeriksaanParameter = (
  pemeriksaanId: number,
  pesertaId: number,
  pesertaType: string = 'atlet'
) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://dispora.summitbreak.com/api'
  const { getAuthHeaders, isAuthenticated, initAuth } = useAuth()

  // Initialize auth immediately
  if (process.client) {
    initAuth()
  }

  // State untuk parameter list
  const pesertaInfo = ref<PesertaInfo | null>(null)
  const parameterList = ref<ParameterInfo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // State untuk chart data
  const parameterInfo = ref<ParameterInfo | null>(null)
  const chartData = ref<ChartDataItem[]>([])
  const detailData = ref<DetailDataItem[]>([])
  const chartLoading = ref(false)
  const chartError = ref<string | null>(null)

  // API Functions
  const fetchPesertaParameterList = async () => {
    if (!isAuthenticated.value) {
      error.value = 'Anda harus login terlebih dahulu.'
      if (process.client) {
        window.location.href = '/login'
      }
      return
    }

    try {
      loading.value = true
      error.value = null

      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/peserta/${pesertaId}/parameter`
      const params = new URLSearchParams({
        peserta_type: pesertaType,
      })

      console.log('Fetching peserta parameter list:', url)
      console.log('Auth headers:', getAuthHeaders())

      const response = await $fetch<ApiResponse<PesertaParameterListResponse>>(
        `${url}?${params}`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      console.log('Peserta parameter list API Response:', response)

      if (response.status === 'success') {
        pesertaInfo.value = response.data.pesertaInfo
        parameterList.value = response.data.parameterList
        console.log('Peserta parameter list loaded:', {
          pesertaInfo: pesertaInfo.value,
          parameterCount: parameterList.value.length,
        })
      } else {
        error.value =
          response.message || 'Gagal mengambil data parameter peserta'
      }
    } catch (err: any) {
      console.error('Error fetching peserta parameter list:', err)

      if (err?.status === 302 || err?.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        error.value = 'Data peserta tidak ditemukan.'
      } else {
        error.value =
          err?.message ||
          'Terjadi kesalahan saat mengambil data parameter peserta.'
      }
    } finally {
      loading.value = false
    }
  }

  const fetchPesertaParameterChart = async (parameterId: number) => {
    if (!isAuthenticated.value) {
      chartError.value = 'Anda harus login terlebih dahulu.'
      if (process.client) {
        window.location.href = '/login'
      }
      return
    }

    try {
      chartLoading.value = true
      chartError.value = null

      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/peserta/${pesertaId}/parameter/${parameterId}/grafik`
      const params = new URLSearchParams({
        peserta_type: pesertaType,
      })

      console.log('Fetching peserta parameter chart:', url)
      console.log('Auth headers:', getAuthHeaders())

      const response = await $fetch<ApiResponse<PesertaParameterChartResponse>>(
        `${url}?${params}`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      console.log('Peserta parameter chart API Response:', response)

      if (response.status === 'success') {
        pesertaInfo.value = response.data.pesertaInfo
        parameterInfo.value = response.data.parameterInfo
        chartData.value = response.data.chartData
        detailData.value = response.data.detailData
        console.log('Peserta parameter chart loaded:', {
          pesertaInfo: pesertaInfo.value,
          parameterInfo: parameterInfo.value,
          chartDataCount: chartData.value.length,
          detailDataCount: detailData.value.length,
        })
      } else {
        chartError.value =
          response.message || 'Gagal mengambil data grafik parameter peserta'
      }
    } catch (err: any) {
      console.error('Error fetching peserta parameter chart:', err)

      if (err?.status === 302 || err?.status === 401) {
        chartError.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        chartError.value = 'Data grafik parameter tidak ditemukan.'
      } else {
        chartError.value =
          err?.message ||
          'Terjadi kesalahan saat mengambil data grafik parameter peserta.'
      }
    } finally {
      chartLoading.value = false
    }
  }

  // Helper functions
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Stabil':
        return 'bg-green-100 text-green-800 border border-green-200'
      case 'Kenaikan':
        return 'bg-red-100 text-red-800 border border-red-200'
      case 'Penurunan':
        return 'bg-purple-100 text-purple-800 border border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }

  // Computed properties untuk chart formatting
  const getFormattedChartData = computed(() => {
    return chartData.value.map((item) => ({
      month: item.month,
      nilai: item.nilai,
    }))
  })

  const getChartCategories = computed(() => {
    return {
      nilai: { name: 'Nilai', color: '#22c55e' },
    }
  })

  const getXFormatter = computed(() => {
    return (tick: number, _i?: number, _ticks?: number[]): string => {
      return chartData.value[tick]?.month ?? ''
    }
  })

  return {
    // State
    pesertaInfo,
    parameterList,
    parameterInfo,
    chartData,
    detailData,
    loading,
    error,
    chartLoading,
    chartError,

    // API Functions
    fetchPesertaParameterList,
    fetchPesertaParameterChart,

    // Helper Functions
    getStatusClass,
    getFormattedChartData,
    getChartCategories,
    getXFormatter,
  }
}
