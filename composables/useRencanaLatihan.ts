import { ref, watch } from 'vue'
import { useAuth } from './useAuth'

interface RencanaLatihanItem {
  id: number
  tanggal: string
  materi: string
  lokasi: string
  catatan: string
  targetLatihan: string
  jumlah_atlet?: number
  jumlah_pelatih?: number
  jumlah_tenaga_pendukung?: number
  total_peserta?: number
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
  meta?: {
    total: number
    current_page: number
    per_page: number
    search?: string
    filters?: { date?: string | null }
  }
}

export const useRencanaLatihan = (programId: number) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://dispora.jaganet.id/api'
  const { getAuthHeaders, isAuthenticated, token, initAuth } = useAuth()
  // State
  const rencanaList = ref<RencanaLatihanItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Pagination
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const perPage = ref(10)

  // Filters
  const searchQuery = ref('')
  const selectedDate = ref('')

  const fetchRencana = async (page = 1) => {
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

      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.value.toString(),
      })

      if (searchQuery.value) params.append('search', searchQuery.value)
      if (selectedDate.value) params.append('date', selectedDate.value)

      const url = `${baseURL}/program-latihan/${programId}/rencana-latihan?${params}`

      console.log('🔍 Fetching rencana latihan with URL:', url)
      console.log('🔑 Auth headers:', getAuthHeaders())

      const response = await $fetch<ApiResponse<RencanaLatihanItem[]>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })

      console.log('📊 API Response:', response)

      if (response.status === 'success') {
        rencanaList.value = response.data || []
        if (response.meta) {
          currentPage.value = response.meta.current_page
          totalPages.value = Math.ceil(
            response.meta.total / response.meta.per_page
          )
          totalItems.value = response.meta.total
        } else {
          currentPage.value = 1
          totalPages.value = 1
          totalItems.value = rencanaList.value.length
        }
      } else {
        error.value = response.message || 'Gagal mengambil data rencana latihan'
      }
    } catch (err: any) {
      if (err?.status === 302 || err?.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        error.value = 'Endpoint rencana latihan tidak ditemukan.'
      } else {
        error.value = err?.message || 'Terjadi kesalahan saat mengambil data.'
      }
    } finally {
      loading.value = false
    }
  }

  // Pagination
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      fetchRencana(currentPage.value)
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      fetchRencana(currentPage.value)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      fetchRencana(page)
    }
  }

  // Date filter helpers
  const applyDateFilter = () => {
    currentPage.value = 1
    fetchRencana(1)
  }

  const clearDateFilter = () => {
    selectedDate.value = ''
    currentPage.value = 1
    fetchRencana(1)
  }

  // Debounce search
  let searchTimeout: any
  watch(searchQuery, () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      currentPage.value = 1
      fetchRencana(1)
    }, 500)
  })

  return {
    // State
    rencanaList,
    loading,
    error,

    // Pagination
    currentPage,
    totalPages,
    totalItems,
    perPage,

    // Filters
    searchQuery,
    selectedDate,

    // Methods
    fetchRencana,
    nextPage,
    prevPage,
    goToPage,
    applyDateFilter,
    clearDateFilter,
  }
}
