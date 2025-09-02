import { ref, watch } from 'vue'
import { useAuth } from './useAuth'

interface Rencana {
  id: number
  materi: string
  tanggal: string
}

interface TargetIndividu {
  id: number
  nama: string
  target: string
  peserta: string
}

interface TargetKelompok {
  id: number
  nama: string
  target: string
  nilai: string | null
  trend: string | null
}

interface TargetListResponse {
  rencana: Rencana
  targetIndividu: TargetIndividu[]
  targetKelompok: TargetKelompok[]
}

interface PesertaTarget {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number
  posisi: string
  nilai: string
  target: string
  trend: string
}

interface TargetDetailResponse {
  target: {
    id: number
    nama: string
    target: string
    peserta: string
  }
  rencana: Rencana
  pesertaTarget: PesertaTarget[]
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const useTargetLatihan = () => {
  let baseURL = 'http://localhost:8000/api'
  try {
    const config = useRuntimeConfig()
    baseURL = config.public.apiBase || 'http://localhost:8000/api'
  } catch (error) {
    console.warn('useRuntimeConfig not available, using fallback URL:', baseURL)
  }

  const { getAuthHeaders, isAuthenticated, initAuth } = useAuth()

  // Initialize auth on composable creation
  if (process.client) {
    initAuth()
  }

  // State untuk list targets
  const targetList = ref<TargetListResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // State untuk detail target
  const targetDetail = ref<TargetDetailResponse | null>(null)
  const detailLoading = ref(false)
  const detailError = ref<string | null>(null)

  // Fetch list targets
  const fetchTargetList = async (rencanaId: number) => {
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

      const url = `${baseURL}/rencana-latihan/${rencanaId}/targets`
      const response = await $fetch<ApiResponse<TargetListResponse>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })

      if (response.status === 'success') {
        targetList.value = response.data
      } else {
        error.value = response.message || 'Gagal mengambil data target latihan'
      }
    } catch (err: any) {
      if (err?.status === 302 || err?.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        error.value = 'Endpoint target latihan tidak ditemukan.'
      } else {
        error.value = err?.message || 'Terjadi kesalahan saat mengambil data.'
      }
    } finally {
      loading.value = false
    }
  }

  // Fetch detail target
  const fetchTargetDetail = async (rencanaId: number, targetId: number) => {
    // Re-check auth before API call
    if (process.client) {
      initAuth()
    }

    if (!isAuthenticated.value) {
      detailError.value = 'Anda harus login terlebih dahulu.'
      detailLoading.value = false
      console.warn('User not authenticated, redirecting to login')
      if (process.client) {
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      }
      return
    }

    try {
      detailLoading.value = true
      detailError.value = null

      const url = `${baseURL}/rencana-latihan/${rencanaId}/targets/${targetId}`
      const response = await $fetch<ApiResponse<TargetDetailResponse>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })

      if (response.status === 'success') {
        targetDetail.value = response.data
      } else {
        detailError.value =
          response.message || 'Gagal mengambil detail target latihan'
      }
    } catch (err: any) {
      if (err?.status === 302 || err?.status === 401) {
        detailError.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        detailError.value = 'Detail target latihan tidak ditemukan.'
      } else {
        detailError.value =
          err?.message || 'Terjadi kesalahan saat mengambil data.'
      }
    } finally {
      detailLoading.value = false
    }
  }

  return {
    // List targets
    targetList,
    loading,
    error,
    fetchTargetList,

    // Detail target
    targetDetail,
    detailLoading,
    detailError,
    fetchTargetDetail,
  }
}
