import { ref, computed } from 'vue'
import { useAuth } from './useAuth'

interface ProgramLatihan {
  id: number
  nama_program: string
  cabor: {
    id: number
    nama: string
  }
  kategori: {
    id: number
    nama: string
  }
  periode: {
    mulai: string
    selesai: string
    formatted: string
  }
  keterangan: string
  jumlah_rencana_latihan?: number
  created_at: string
  updated_at: string
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

export const useProgramLatihan = () => {
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
  const programs = ref<ProgramLatihan[]>([])
  const caborList = ref<Cabor[]>([])
  const caborKategoriList = ref<Cabor[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Pagination
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const perPage = ref(10)

  // Filters
  const searchQuery = ref('')
  const selectedCabor = ref<number[]>([])
  const startDate = ref('')
  const endDate = ref('')

  // Computed
  const filteredPrograms = computed(() => {
    let filtered = programs.value

    // Filter by search query
    if (searchQuery.value) {
      const beforeFilter = filtered.length
      filtered = filtered.filter(
        (program) =>
          program.nama_program
            ?.toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          program.cabor
            ?.toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          program.kategori
            ?.toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          program.keterangan
            ?.toLowerCase()
            .includes(searchQuery.value.toLowerCase())
      )
    }

    // Filter by selected cabor
    if (selectedCabor.value.length > 0) {
      filtered = filtered.filter((program) => {
        // Find cabor by name in the caborList
        const cabor = caborList.value.find((c) => c.nama === program.cabor)
        return cabor && selectedCabor.value.includes(cabor.id)
      })
    }

    // Filter by date range
    if (startDate.value && endDate.value) {
      filtered = filtered.filter((program) => {
        // Parse periode string to get start and end dates
        const parts = program.periode.split(' ')
        if (parts.length < 3) return true

        // Extract year from periode (assuming format like "1-24 Agustus 2025")
        const yearIndex = parts.findIndex((part) => /^\d{4}$/.test(part))
        if (yearIndex === -1) return true

        const year = parseInt(parts[yearIndex] || '0')
        const month = getMonthNumber(parts[yearIndex - 1] || 'Januari')
        const day = parseInt(parts[0]?.split('-')[0] || '1')

        const programStart = new Date(year, month, day)
        const filterStart = new Date(startDate.value)
        const filterEnd = new Date(endDate.value)

        return programStart >= filterStart && programStart <= filterEnd
      })
    }

    return filtered
  })

  // Helper function to get month number
  const getMonthNumber = (monthName: string): number => {
    const months: { [key: string]: number } = {
      Januari: 0,
      Februari: 1,
      Maret: 2,
      April: 3,
      Mei: 4,
      Juni: 5,
      Juli: 6,
      Agustus: 7,
      September: 8,
      Oktober: 9,
      November: 10,
      Desember: 11,
    }
    return months[monthName] || 0
  }

  // API Functions
  const fetchPrograms = async (page = 1, forceRefresh = false) => {
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
      programs.value = []
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
        ' Fetching programs with URL:',
        `${baseURL}/program-latihan/mobile?${params}`
      )
      console.log(' Auth headers:', getAuthHeaders())

      if (searchQuery.value) {
        params.append('search', searchQuery.value)
      }

      if (selectedCabor.value.length > 0) {
        params.append('cabor_id', selectedCabor.value.join(','))
      }

      if (startDate.value) {
        params.append('start_date', startDate.value)
      }

      if (endDate.value) {
        params.append('end_date', endDate.value)
      }

      console.log(
        'Fetching from URL:',
        `${baseURL}/program-latihan/mobile?${params}`
      )
      console.log(' Auth headers:', getAuthHeaders())

      // Add cache busting parameter
      const cacheBuster = Date.now()
      const url = `${baseURL}/program-latihan/mobile?${params}&_t=${cacheBuster}`

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
      console.log('User Agent:', navigator.userAgent)

      const response = await $fetch<ApiResponse<ProgramLatihan[]>>(url, {
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
          ' BEFORE ASSIGN - Current programs count:',
          programs.value.length
        )
        console.log(' BEFORE ASSIGN - Current programs data:', programs.value)

        programs.value = response.data

        console.log(
          ' AFTER ASSIGN - New programs count:',
          programs.value.length
        )
        console.log(' AFTER ASSIGN - New programs data:', programs.value)
        console.log(' Programs loaded:', response.data.length, 'items')
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
      console.error('Error fetching programs:', err)

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
        error.value = err.message || 'Gagal mengambil data program latihan'
      }
    } finally {
      loading.value = false
    }
  }

  const fetchCaborList = async (forceRefresh = false) => {
    try {
      const response = await $fetch<ApiResponse<Cabor[]>>(
        `${baseURL}/program-latihan/cabor/list`,
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
        `${baseURL}/program-latihan/cabor/list-for-create`,
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
        `${baseURL}/program-latihan/cabor/${caborId}/kategori`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        caborKategoriList.value = response.data
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching cabor kategori:', err)
      throw err
    }
  }

  const fetchProgramDetail = async (id: number) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/program-latihan/${id}`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        return response.data
      }
    } catch (err: any) {
      error.value = err.message || 'Gagal mengambil detail program latihan'
      console.error('Error fetching program detail:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Filter Functions
  const toggleCaborFilter = (caborId: number) => {
    const index = selectedCabor.value.indexOf(caborId)
    if (index > -1) {
      selectedCabor.value.splice(index, 1)
    } else {
      selectedCabor.value.push(caborId)
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
      fetchPrograms(currentPage.value)
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      fetchPrograms(currentPage.value)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      fetchPrograms(page)
    }
  }

  // Force refresh function
  const forceRefreshData = async () => {
    console.log(' Force refreshing program data...')
    console.log('Current auth state:', {
      isAuthenticated: isAuthenticated.value,
    })

    // Clear browser cache and localStorage for this data
    if (process.client) {
      // Clear any cached data
      sessionStorage.removeItem('program_latihan_cache')
      sessionStorage.removeItem('cabor_list_cache')

      // Force browser to not use cache
      const timestamp = Date.now()
      console.log(' Cache busting timestamp:', timestamp)
    }

    // Clear all data first
    programs.value = []
    caborList.value = []
    currentPage.value = 1
    totalPages.value = 1
    totalItems.value = 0
    error.value = null

    console.log(' AFTER CLEAR - Programs count:', programs.value.length)
    console.log(' AFTER CLEAR - Programs data:', programs.value)

    // Wait a bit to ensure data is cleared
    await new Promise((resolve) => setTimeout(resolve, 100))

    try {
      await Promise.all([fetchPrograms(1, true), fetchCaborList(true)])
      console.log(
        '✅ Force refresh completed. New data count:',
        programs.value.length
      )
    } catch (error) {
      console.error('❌ Force refresh failed:', error)
    }
  }

  // Hard refresh - clear everything and reload
  const hardRefresh = async () => {
    console.log(' HARD REFRESH - Clearing everything...')

    // Clear all data
    programs.value = []
    caborList.value = []
    currentPage.value = 1
    totalPages.value = 1
    totalItems.value = 0
    error.value = null
    searchQuery.value = ''
    selectedCabor.value = []
    startDate.value = ''
    endDate.value = ''

    // Clear browser storage
    if (process.client) {
      sessionStorage.clear()
      localStorage.removeItem('program_latihan_cache')
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
      const testUrl = `${baseURL}/program-latihan/mobile?page=1&per_page=10`
      console.log(' Test URL:', testUrl)

      // Test with minimal headers like Postman
      const testResponse = await $fetch<ApiResponse<ProgramLatihan[]>>(
        testUrl,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
            Accept: 'application/json',
          },
          credentials: 'include',
        }
      )

      console.log(' Test Response:', testResponse)
      console.log(' Test Data Count:', testResponse.data?.length || 0)
      console.log(' Test Cabor:', testResponse.data?.map((p) => p.cabor) || [])
    } catch (error) {
      console.error(' Test API Error:', error)
    }
  }

  // CRUD Methods
  const createProgram = async (data: any) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<ProgramLatihan>>(
        `${baseURL}/program-latihan`,
        {
          method: 'POST',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: {
            cabor_id: data.cabor_id,
            nama_program: data.nama_program,
            cabor_kategori_id: data.cabor_kategori_id,
            periode_mulai: data.periode_mulai,
            periode_selesai: data.periode_selesai,
            keterangan: data.keterangan || null,
          },
        }
      )

      if (response.status === 'success') {
        // Refresh the programs list
        await fetchPrograms()
        return response.data
      }
    } catch (err: any) {
      console.error('Error creating program:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 403) {
        error.value = 'Anda tidak memiliki izin untuk membuat program latihan.'
      } else if (err.status === 422) {
        error.value = err.data?.message || 'Data yang dimasukkan tidak valid.'
      } else {
        error.value = err.data?.message || 'Gagal membuat program latihan'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProgram = async (id: number, data: any) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<ProgramLatihan>>(
        `${baseURL}/program-latihan/${id}`,
        {
          method: 'PUT',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: {
            cabor_id: data.cabor_id,
            nama_program: data.nama_program,
            cabor_kategori_id: data.cabor_kategori_id,
            periode_mulai: data.periode_mulai,
            periode_selesai: data.periode_selesai,
            keterangan: data.keterangan || null,
          },
        }
      )

      if (response.status === 'success') {
        // Refresh the programs list
        await fetchPrograms()
        return response.data
      }
    } catch (err: any) {
      console.error('Error updating program:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 403) {
        error.value =
          'Anda tidak memiliki izin untuk mengupdate program latihan.'
      } else if (err.status === 404) {
        error.value = 'Program latihan tidak ditemukan.'
      } else if (err.status === 422) {
        error.value = err.data?.message || 'Data yang dimasukkan tidak valid.'
      } else {
        error.value = err.data?.message || 'Gagal mengupdate program latihan'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteProgram = async (id: number) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/program-latihan/${id}`,
        {
          method: 'DELETE',
          headers: {
            ...getAuthHeaders(),
          },
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        // Refresh the programs list
        await fetchPrograms()
        return true
      }
    } catch (err: any) {
      console.error('Error deleting program:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 403) {
        error.value =
          'Anda tidak memiliki izin untuk menghapus program latihan.'
      } else if (err.status === 404) {
        error.value = 'Program latihan tidak ditemukan.'
      } else {
        error.value = err.data?.message || 'Gagal menghapus program latihan'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    programs,
    caborList,
    caborKategoriList,
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
    filteredPrograms,

    // API Functions
    fetchPrograms,
    fetchCaborList,
    fetchCaborListForCreate,
    fetchCaborKategoriByCabor,
    fetchProgramDetail,
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
    createProgram,
    updateProgram,
    deleteProgram,
  }
}
