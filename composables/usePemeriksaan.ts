import { ref, computed } from 'vue'
import { useAuth } from './useAuth'

interface Pemeriksaan {
  id: number
  nama: string
  cabor: string
  kategori: string
  tenagaPendukung: string
  peserta: number
  tanggal: string
  status: string
  jumlah_parameter: number
  jumlah_atlet: number
  jumlah_pelatih: number
  jumlah_tenaga_pendukung: number
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
      tanggal_pemeriksaan: string | null
    }
  }
}

export const usePemeriksaan = () => {
  // Get runtime config or use fallback
  let baseURL = 'http://dispora.jaganet.id/api'

  try {
    const config = useRuntimeConfig()
    baseURL = config.public.apiBase || 'http://dispora.jaganet.id/api'
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
  const pemeriksaanList = ref<Pemeriksaan[]>([])
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
  const selectedDate = ref('')

  // Computed
  const filteredPemeriksaan = computed(() => {
    let filtered = pemeriksaanList.value

    // Filter by search query
    if (searchQuery.value) {
      filtered = filtered.filter(
        (pemeriksaan) =>
          pemeriksaan.nama
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          pemeriksaan.cabor
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          pemeriksaan.tenagaPendukung
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
      )
    }

    // Filter by selected cabor
    if (selectedCabor.value.length > 0) {
      filtered = filtered.filter((pemeriksaan) => {
        return selectedCabor.value.includes(pemeriksaan.cabor)
      })
    }

    // Filter by date
    if (selectedDate.value) {
      filtered = filtered.filter((pemeriksaan) => {
        return pemeriksaan.tanggal === selectedDate.value
      })
    }

    return filtered
  })

  // API Functions
  const fetchPemeriksaan = async (page = 1, forceRefresh = false) => {
    // Check authentication first
    if (!isAuthenticated.value || !token.value) {
      console.log('❌ User not authenticated, redirecting to login...')
      console.log('Auth state:', {
        isAuthenticated: isAuthenticated.value,
        hasToken: !!token.value,
      })
      error.value = 'Anda harus login terlebih dahulu.'
      if (process.client) {
        window.location.href = '/login'
      }
      return
    }

    // Clear old data if force refresh
    if (forceRefresh) {
      pemeriksaanList.value = []
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
        '🔍 Fetching pemeriksaan with URL:',
        `${baseURL}/pemeriksaan/mobile?${params}`
      )
      console.log('🔑 Auth headers:', getAuthHeaders())

      if (searchQuery.value) {
        params.append('search', searchQuery.value)
      }

      if (selectedCabor.value.length > 0) {
        // For cabor filter, we need to find the cabor ID from the list
        // Since the API expects cabor_id but we have cabor names, we'll filter client-side
        // and let the server handle the search
      }

      if (selectedDate.value) {
        params.append('tanggal_pemeriksaan', selectedDate.value)
      }

      console.log(
        '🌐 Fetching from URL:',
        `${baseURL}/pemeriksaan/mobile?${params}`
      )
      console.log('🔑 Auth headers:', getAuthHeaders())

      // Add cache busting parameter
      const cacheBuster = Date.now()
      const url = `${baseURL}/pemeriksaan/mobile?${params}&_t=${cacheBuster}`

      // Log full request details
      console.log('🚀 FULL REQUEST DETAILS:')
      console.log('URL:', url)
      console.log('Headers:', {
        ...getAuthHeaders(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      })
      console.log('Credentials:', 'include')
      console.log('User Agent:', navigator.userAgent)

      const response = await $fetch<ApiResponse<Pemeriksaan[]>>(url, {
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
          ' BEFORE ASSIGN - Current pemeriksaan count:',
          pemeriksaanList.value.length
        )
        console.log(
          ' BEFORE ASSIGN - Current pemeriksaan data:',
          pemeriksaanList.value
        )

        pemeriksaanList.value = response.data

        console.log(
          ' AFTER ASSIGN - New pemeriksaan count:',
          pemeriksaanList.value.length
        )
        console.log(
          ' AFTER ASSIGN - New pemeriksaan data:',
          pemeriksaanList.value
        )
        console.log(' Pemeriksaan loaded:', response.data.length, 'items')
        console.log(
          ' Cabor found:',
          response.data.map((p) => p.cabor)
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
      console.error('Error fetching pemeriksaan:', err)

      // Handle different types of errors
      if (err.status === 302 || err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        // Redirect to login if unauthorized
        if (process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 404) {
        error.value =
          'API endpoint tidak ditemukan. Periksa konfigurasi backend.'
      } else if (err.status >= 500) {
        error.value = 'Server error. Silakan coba lagi nanti.'
      } else {
        error.value = err.message || 'Gagal mengambil data pemeriksaan'
      }
    } finally {
      loading.value = false
    }
  }

  const fetchCaborList = async (forceRefresh = false) => {
    try {
      const response = await $fetch<ApiResponse<string[]>>(
        `${baseURL}/pemeriksaan/cabor/list`,
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

  const fetchCaborListForCreate = async () => {
    try {
      const response = await $fetch<ApiResponse<Cabor[]>>(
        `${baseURL}/pemeriksaan/cabor/list-for-create`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching cabor list for create:', err)
      throw err
    }
  }

  const fetchCaborKategoriByCabor = async (caborId: number) => {
    try {
      const response = await $fetch<ApiResponse<Cabor[]>>(
        `${baseURL}/pemeriksaan/cabor/${caborId}/kategori`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching cabor kategori:', err)
      throw err
    }
  }

  const fetchTenagaPendukungByKategori = async (kategoriId: number) => {
    try {
      const response = await $fetch<ApiResponse<Cabor[]>>(
        `${baseURL}/pemeriksaan/cabor-kategori/${kategoriId}/tenaga-pendukung`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching tenaga pendukung:', err)
      throw err
    }
  }

  const fetchPemeriksaanDetail = async (id: number) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/pemeriksaan/${id}`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        return response.data
      }
    } catch (err: any) {
      error.value = err.message || 'Gagal mengambil detail pemeriksaan'
      console.error('Error fetching pemeriksaan detail:', err)
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
    selectedDate.value = ''
  }

  const applyDateFilter = () => {
    // Date filter is applied automatically through computed property
  }

  // Pagination Functions
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      fetchPemeriksaan(currentPage.value)
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      fetchPemeriksaan(currentPage.value)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      fetchPemeriksaan(page)
    }
  }

  // Force refresh function
  const forceRefreshData = async () => {
    console.log(' Force refreshing pemeriksaan data...')
    console.log('Current auth state:', {
      isAuthenticated: isAuthenticated.value,
    })

    // Clear browser cache and localStorage for this data
    if (process.client) {
      // Clear any cached data
      sessionStorage.removeItem('pemeriksaan_cache')
      sessionStorage.removeItem('cabor_list_cache')

      // Force browser to not use cache
      const timestamp = Date.now()
      console.log(' Cache busting timestamp:', timestamp)
    }

    // Clear all data first
    pemeriksaanList.value = []
    caborList.value = []
    currentPage.value = 1
    totalPages.value = 1
    totalItems.value = 0
    error.value = null

    console.log(
      ' AFTER CLEAR - Pemeriksaan count:',
      pemeriksaanList.value.length
    )
    console.log(' AFTER CLEAR - Pemeriksaan data:', pemeriksaanList.value)

    // Wait a bit to ensure data is cleared
    await new Promise((resolve) => setTimeout(resolve, 100))

    try {
      await Promise.all([fetchPemeriksaan(1, true), fetchCaborList(true)])
      console.log(
        '✅ Force refresh completed. New data count:',
        pemeriksaanList.value.length
      )
    } catch (error) {
      console.error('❌ Force refresh failed:', error)
    }
  }

  // Hard refresh - clear everything and reload
  const hardRefresh = async () => {
    console.log(' HARD REFRESH - Clearing everything...')

    // Clear all data
    pemeriksaanList.value = []
    caborList.value = []
    currentPage.value = 1
    totalPages.value = 1
    totalItems.value = 0
    error.value = null
    searchQuery.value = ''
    selectedCabor.value = []
    selectedDate.value = ''

    // Clear browser storage
    if (process.client) {
      sessionStorage.clear()
      localStorage.removeItem('pemeriksaan_cache')
      localStorage.removeItem('cabor_list_cache')
    }

    // Wait and reload
    await new Promise((resolve) => setTimeout(resolve, 200))

    try {
      await forceRefreshData()
      console.log(' Hard refresh completed!')
    } catch (error) {
      console.error(' Hard refresh failed:', error)
    }
  }

  // Test API manually with exact same headers as Postman
  const testApiManually = async () => {
    console.log(' TESTING API MANUALLY...')

    try {
      const testUrl = `${baseURL}/pemeriksaan/mobile?page=1&per_page=10`
      console.log(' Test URL:', testUrl)

      // Test with minimal headers like Postman
      const testResponse = await $fetch<ApiResponse<Pemeriksaan[]>>(testUrl, {
        headers: {
          Authorization: `Bearer ${token.value}`,
          Accept: 'application/json',
        },
        credentials: 'include',
      })

      console.log(' Test Response:', testResponse)
      console.log(' Test Data Count:', testResponse.data?.length || 0)
      console.log(' Test Cabor:', testResponse.data?.map((p) => p.cabor) || [])
    } catch (error) {
      console.error(' Test API Error:', error)
    }
  }

  // CRUD Methods
  const createPemeriksaan = async (data: any) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<Pemeriksaan>>(
        `${baseURL}/pemeriksaan`,
        {
          method: 'POST',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: {
            cabor_id: data.cabor_id,
            cabor_kategori_id: data.cabor_kategori_id,
            tenaga_pendukung_id: data.tenaga_pendukung_id,
            nama_pemeriksaan: data.nama_pemeriksaan,
            tanggal_pemeriksaan: data.tanggal_pemeriksaan,
            status: data.status,
          },
        }
      )

      if (response.status === 'success') {
        // Refresh the pemeriksaan list
        await fetchPemeriksaan()
        return response.data
      }
    } catch (err: any) {
      console.error('Error creating pemeriksaan:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 403) {
        error.value = 'Anda tidak memiliki izin untuk membuat pemeriksaan.'
      } else if (err.status === 422) {
        error.value = err.data?.message || 'Data yang dimasukkan tidak valid.'
      } else {
        error.value = err.data?.message || 'Gagal membuat pemeriksaan'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePemeriksaan = async (id: number, data: any) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<Pemeriksaan>>(
        `${baseURL}/pemeriksaan/${id}`,
        {
          method: 'PUT',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: {
            cabor_id: data.cabor_id,
            cabor_kategori_id: data.cabor_kategori_id,
            tenaga_pendukung_id: data.tenaga_pendukung_id,
            nama_pemeriksaan: data.nama_pemeriksaan,
            tanggal_pemeriksaan: data.tanggal_pemeriksaan,
            status: data.status,
          },
        }
      )

      if (response.status === 'success') {
        // Refresh the pemeriksaan list
        await fetchPemeriksaan()
        return response.data
      }
    } catch (err: any) {
      console.error('Error updating pemeriksaan:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 403) {
        error.value = 'Anda tidak memiliki izin untuk mengupdate pemeriksaan.'
      } else if (err.status === 404) {
        error.value = 'Pemeriksaan tidak ditemukan.'
      } else if (err.status === 422) {
        error.value = err.data?.message || 'Data yang dimasukkan tidak valid.'
      } else {
        error.value = err.data?.message || 'Gagal mengupdate pemeriksaan'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePemeriksaan = async (id: number) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/pemeriksaan/${id}`,
        {
          method: 'DELETE',
          headers: {
            ...getAuthHeaders(),
          },
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        // Refresh the pemeriksaan list
        await fetchPemeriksaan()
        return true
      }
    } catch (err: any) {
      console.error('Error deleting pemeriksaan:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 403) {
        error.value = 'Anda tidak memiliki izin untuk menghapus pemeriksaan.'
      } else if (err.status === 404) {
        error.value = 'Pemeriksaan tidak ditemukan.'
      } else {
        error.value = err.data?.message || 'Gagal menghapus pemeriksaan'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    pemeriksaanList,
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
    selectedDate,

    // Computed
    filteredPemeriksaan,

    // API Functions
    fetchPemeriksaan,
    fetchCaborList,
    fetchCaborListForCreate,
    fetchCaborKategoriByCabor,
    fetchTenagaPendukungByKategori,
    fetchPemeriksaanDetail,
    forceRefreshData,
    hardRefresh,
    testApiManually,

    // Filter Functions
    toggleCaborFilter,
    clearFilters,
    applyDateFilter,

    // Pagination Functions
    nextPage,
    prevPage,
    goToPage,

    // CRUD Functions
    createPemeriksaan,
    updatePemeriksaan,
    deletePemeriksaan,
  }
}
