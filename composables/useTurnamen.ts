import { ref, computed } from 'vue'
import { useAuth } from './useAuth'

interface Turnamen {
  id: number
  nama: string
  cabor: string
  kategori: string
  periode: string
  tingkat: string
  lokasi: string
  juara: string
  hasil: string
  jumlahPeserta: number
}

interface Cabor {
  id: number
  nama: string
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
  meta?: {
    total: number
    current_page: number
    per_page: number
    search: string
    filters: {
      cabor_id: number | null
      start_date: string | null
      end_date: string | null
    }
  }
}

export const useTurnamen = () => {
  // Get runtime config or use fallback
  let baseURL = 'https://dispora.summitbreak.com//api'

  try {
    const config = useRuntimeConfig()
    baseURL = config.public.apiBase || 'https://dispora.summitbreak.com//api'
  } catch (error) {
    console.warn('useRuntimeConfig not available, using fallback URL:', baseURL)
  }

  // Get auth headers
  const { getAuthHeaders, isAuthenticated, token, initAuth } = useAuth()

  // Initialize auth immediately
  if (process.client) {
    initAuth()
  }

  // State
  const turnamenList = ref<Turnamen[]>([])
  const caborList = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Pagination
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const perPage = ref(10)

  // Filters
  const searchQuery = ref('')
  const selectedCabor = ref<string[]>([])
  const startDate = ref('')
  const endDate = ref('')

  // Computed
  const filteredTurnamen = computed(() => {
    let filtered = turnamenList.value

    // Filter by search query
    if (searchQuery.value) {
      filtered = filtered.filter(
        (turnamen) =>
          turnamen.nama
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          turnamen.cabor
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          turnamen.lokasi
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          turnamen.tingkat
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          turnamen.hasil.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    // Filter by selected cabor
    if (selectedCabor.value.length > 0) {
      filtered = filtered.filter((turnamen) =>
        selectedCabor.value.includes(turnamen.cabor)
      )
    }

    // Filter by date range
    if (startDate.value && endDate.value) {
      filtered = filtered.filter((turnamen) => {
        // Parse periode string to get start and end dates
        const parts = turnamen.periode.split(' s/d ')
        if (parts.length < 2) return true

        const turnamenStart = parts[0] || ''
        const turnamenEnd = parts[1] || ''

        return turnamenStart >= startDate.value && turnamenEnd <= endDate.value
      })
    }

    return filtered
  })

  // API Functions
  const fetchTurnamen = async (page = 1, forceRefresh = false) => {
    // Check authentication first
    if (!isAuthenticated.value || !token.value) {
      console.log('❌ User not authenticated, redirecting to login...')
      console.log('Auth state:', {
        isAuthenticated: isAuthenticated.value,
        hasToken: !!token.value,
      })
      error.value = 'Anda harus login terlebih dahulu.'
      if (typeof process !== 'undefined' && process.client) {
        window.location.href = '/login'
      }
      return
    }

    // Clear old data if force refresh
    if (forceRefresh) {
      turnamenList.value = []
      caborList.value = []
    }

    try {
      loading.value = true
      error.value = null

      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.value.toString(),
      })

      console.log(
        ' Fetching turnamen with URL:',
        `${baseURL}/turnamen/mobile?${params}`
      )
      console.log(' Auth headers:', getAuthHeaders())

      if (searchQuery.value) {
        params.append('search', searchQuery.value)
      }

      if (selectedCabor.value.length > 0) {
        // Find cabor ID by name (this would need to be implemented based on your cabor structure)
        // For now, we'll use the cabor name directly
        params.append('cabor_id', selectedCabor.value.join(','))
      }

      if (startDate.value) {
        params.append('start_date', startDate.value)
      }

      if (endDate.value) {
        params.append('end_date', endDate.value)
      }

      console.log(' Fetching from URL:', `${baseURL}/turnamen/mobile?${params}`)
      console.log(' Auth headers:', getAuthHeaders())

      // Add cache busting parameter
      const cacheBuster = Date.now()
      const url = `${baseURL}/turnamen/mobile?${params}&_t=${cacheBuster}`

      // Log full request details
      console.log(' FULL REQUEST DETAILS:')
      console.log('URL:', url)
      console.log('Headers:', {
        ...getAuthHeaders(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      })
      console.log('Credentials:', 'include')

      const response = await $fetch<ApiResponse<Turnamen[]>>(url, {
        headers: {
          ...getAuthHeaders(),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
        credentials: 'include',
      })

      console.log(' API Response:', response)
      console.log(' Response Meta:', response.meta)

      if (response.status === 'success') {
        console.log(
          ' BEFORE ASSIGN - Current turnamen count:',
          turnamenList.value.length
        )
        console.log(
          ' BEFORE ASSIGN - Current turnamen data:',
          turnamenList.value
        )

        turnamenList.value = response.data

        console.log(
          ' AFTER ASSIGN - New turnamen count:',
          turnamenList.value.length
        )
        console.log(' AFTER ASSIGN - New turnamen data:', turnamenList.value)
        console.log(' Turnamen loaded:', response.data.length, 'items')
        console.log(
          ' Cabor found:',
          response.data.map((t) => t.cabor)
        )
        console.log(' Full data:', response.data)

        if (response.meta) {
          currentPage.value = response.meta.current_page
          totalPages.value = Math.ceil(
            response.meta.total / response.meta.per_page
          )
          totalItems.value = response.meta.total
        }
      }
    } catch (err: any) {
      console.error('Error fetching turnamen:', err)

      // Handle different types of errors
      if (err.status === 302 || err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        // Redirect to login if unauthorized
        if (typeof process !== 'undefined' && process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 404) {
        error.value =
          'API endpoint tidak ditemukan. Periksa konfigurasi backend.'
      } else if (err.status >= 500) {
        error.value = 'Server error. Silakan coba lagi nanti.'
      } else {
        error.value = err.message || 'Gagal mengambil data turnamen'
      }
    } finally {
      loading.value = false
    }
  }

  const fetchCaborList = async (forceRefresh = false) => {
    try {
      const response = await $fetch<ApiResponse<string[]>>(
        `${baseURL}/turnamen/cabor/list`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        caborList.value = response.data
      }
    } catch (err: any) {
      console.error('Error fetching cabor list:', err)

      // Handle different types of errors
      if (err.status === 302 || err.status === 401) {
        console.warn('Unauthorized access to cabor list')
        // Don't show error for cabor list, just log it
      }
    }
  }

  const fetchTurnamenDetail = async (id: number) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/turnamen/crud/${id}`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        return response.data
      }
    } catch (err: any) {
      error.value = err.message || 'Gagal mengambil detail turnamen'
      console.error('Error fetching turnamen detail:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Filter Functions
  const toggleCaborFilter = (caborName: string) => {
    const index = selectedCabor.value.indexOf(caborName)
    if (index > -1) {
      selectedCabor.value.splice(index, 1)
    } else {
      selectedCabor.value.push(caborName)
    }
  }

  const clearFilters = () => {
    searchQuery.value = ''
    selectedCabor.value = []
    startDate.value = ''
    endDate.value = ''
  }

  const applyDateFilter = () => {
    // Date filter is applied automatically through computed property
  }

  // Pagination Functions
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      fetchTurnamen(currentPage.value)
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      fetchTurnamen(currentPage.value)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      fetchTurnamen(page)
    }
  }

  // Force refresh function
  const forceRefreshData = async () => {
    console.log(' Force refreshing turnamen data...')
    console.log('Current auth state:', {
      isAuthenticated: isAuthenticated.value,
    })

    // Clear browser cache and localStorage for this data
    if (typeof process !== 'undefined' && process.client) {
      // Clear any cached data
      sessionStorage.removeItem('turnamen_cache')
      sessionStorage.removeItem('cabor_list_cache')

      // Force browser to not use cache
      const timestamp = Date.now()
      console.log(' Cache busting timestamp:', timestamp)
    }

    // Clear all data first
    turnamenList.value = []
    caborList.value = []
    currentPage.value = 1
    totalPages.value = 1
    totalItems.value = 0
    error.value = null

    console.log(' AFTER CLEAR - Turnamen count:', turnamenList.value.length)
    console.log(' AFTER CLEAR - Turnamen data:', turnamenList.value)

    // Wait a bit to ensure data is cleared
    await new Promise((resolve) => setTimeout(resolve, 100))

    try {
      await Promise.all([fetchTurnamen(1, true), fetchCaborList(true)])
      console.log(
        '✅ Force refresh completed. New data count:',
        turnamenList.value.length
      )
    } catch (error) {
      console.error('❌ Force refresh failed:', error)
    }
  }

  // CRUD Methods
  const createTurnamen = async (data: any) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/turnamen/crud`,
        {
          method: 'POST',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: {
            cabor_kategori_id: data.cabor_kategori_id,
            nama: data.nama,
            tanggal_mulai: data.tanggal_mulai,
            tanggal_selesai: data.tanggal_selesai,
            tingkat_id: data.tingkat_id,
            lokasi: data.lokasi,
            juara_id: data.juara_id || null,
            hasil: data.hasil || null,
            evaluasi: data.evaluasi || null,
            atlet_ids: data.atlet_ids || [],
            pelatih_ids: data.pelatih_ids || [],
            tenaga_pendukung_ids: data.tenaga_pendukung_ids || [],
          },
        }
      )

      if (response.status === 'success') {
        // Refresh the turnamen list
        await fetchTurnamen()
        return response.data
      }
    } catch (err: any) {
      console.error('Error creating turnamen:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (typeof process !== 'undefined' && process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 403) {
        error.value = 'Anda tidak memiliki izin untuk membuat turnamen.'
      } else if (err.status === 422) {
        error.value = err.data?.message || 'Data yang dimasukkan tidak valid.'
      } else {
        error.value = err.data?.message || 'Gagal membuat turnamen'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTurnamen = async (id: number, data: any) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/turnamen/crud/${id}`,
        {
          method: 'PUT',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: {
            cabor_kategori_id: data.cabor_kategori_id,
            nama: data.nama,
            tanggal_mulai: data.tanggal_mulai,
            tanggal_selesai: data.tanggal_selesai,
            tingkat_id: data.tingkat_id,
            lokasi: data.lokasi,
            juara_id: data.juara_id || null,
            hasil: data.hasil || null,
            evaluasi: data.evaluasi || null,
            atlet_ids: data.atlet_ids || [],
            pelatih_ids: data.pelatih_ids || [],
            tenaga_pendukung_ids: data.tenaga_pendukung_ids || [],
          },
        }
      )

      if (response.status === 'success') {
        // Refresh the turnamen list
        await fetchTurnamen()
        return response.data
      }
    } catch (err: any) {
      console.error('Error updating turnamen:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (typeof process !== 'undefined' && process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 403) {
        error.value = 'Anda tidak memiliki izin untuk mengupdate turnamen.'
      } else if (err.status === 404) {
        error.value = 'Turnamen tidak ditemukan.'
      } else if (err.status === 422) {
        error.value = err.data?.message || 'Data yang dimasukkan tidak valid.'
      } else {
        error.value = err.data?.message || 'Gagal mengupdate turnamen'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTurnamen = async (id: number) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/turnamen/crud/${id}`,
        {
          method: 'DELETE',
          headers: {
            ...getAuthHeaders(),
          },
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        // Refresh the turnamen list
        await fetchTurnamen()
        return true
      }
    } catch (err: any) {
      console.error('Error deleting turnamen:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (typeof process !== 'undefined' && process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 403) {
        error.value = 'Anda tidak memiliki izin untuk menghapus turnamen.'
      } else if (err.status === 404) {
        error.value = 'Turnamen tidak ditemukan.'
      } else {
        error.value = err.data?.message || 'Gagal menghapus turnamen'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    turnamenList,
    caborList,
    loading,
    error,

    // Pagination
    currentPage,
    totalPages,
    totalItems,
    perPage,

    // Filters
    searchQuery,
    selectedCabor,
    startDate,
    endDate,

    // Computed
    filteredTurnamen,

    // API Functions
    fetchTurnamen,
    fetchCaborList,
    fetchTurnamenDetail,
    forceRefreshData,

    // Filter Functions
    toggleCaborFilter,
    clearFilters,
    applyDateFilter,

    // Pagination Functions
    nextPage,
    prevPage,
    goToPage,

    // CRUD Functions
    createTurnamen,
    updateTurnamen,
    deleteTurnamen,
  }
}
