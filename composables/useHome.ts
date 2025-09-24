import { ref, watch } from 'vue'
import { useAuth } from './useAuth'

interface ProgramLatihan {
  id: number
  nama: string
  cabor: string
  kategori: string
  periode: string
  created_at: string
}

interface Pemeriksaan {
  id: number
  nama: string
  cabor: string
  kategori: string
  tanggal: string
  status: string
  created_at: string
}

interface Turnamen {
  id: number
  nama: string
  cabor: string
  kategori: string
  periode: string
  tingkat: string
  lokasi: string
  created_at: string
}

interface HomeData {
  programLatihan: ProgramLatihan[]
  pemeriksaan: Pemeriksaan[]
  turnamen: Turnamen[]
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const useHome = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://dispora.jaganet.id/api'
  const { getAuthHeaders, isAuthenticated, initAuth } = useAuth()

  if (process.client) {
    initAuth()
  }

  // State
  const homeData = ref<HomeData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Search and Filter
  const searchQuery = ref('')
  const selectedCabor = ref<string[]>([])
  const selectedModule = ref<string>('all') // 'all', 'program', 'pemeriksaan', 'turnamen'

  // Computed properties for filtered data
  const filteredProgramLatihan = computed(() => {
    if (!homeData.value?.programLatihan) return []

    let filtered = homeData.value.programLatihan

    // Filter by search query
    if (searchQuery.value) {
      filtered = filtered.filter(
        (item) =>
          item.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.cabor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.kategori.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    // Filter by selected cabor
    if (selectedCabor.value.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCabor.value.includes(item.cabor)
      )
    }

    return filtered
  })

  const filteredPemeriksaan = computed(() => {
    if (!homeData.value?.pemeriksaan) return []

    let filtered = homeData.value.pemeriksaan

    // Filter by search query
    if (searchQuery.value) {
      filtered = filtered.filter(
        (item) =>
          item.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.cabor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.kategori
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          item.status.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    // Filter by selected cabor
    if (selectedCabor.value.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCabor.value.includes(item.cabor)
      )
    }

    return filtered
  })

  const filteredTurnamen = computed(() => {
    if (!homeData.value?.turnamen) return []

    let filtered = homeData.value.turnamen

    // Filter by search query
    if (searchQuery.value) {
      filtered = filtered.filter(
        (item) =>
          item.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.cabor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.kategori
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          item.tingkat
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          item.lokasi.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    // Filter by selected cabor
    if (selectedCabor.value.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCabor.value.includes(item.cabor)
      )
    }

    return filtered
  })

  // Get unique cabor list from all data
  const availableCabor = computed(() => {
    if (!homeData.value) return []

    const caborSet = new Set<string>()

    homeData.value.programLatihan?.forEach((item) => {
      if (item.cabor && item.cabor !== '-') caborSet.add(item.cabor)
    })

    homeData.value.pemeriksaan?.forEach((item) => {
      if (item.cabor && item.cabor !== '-') caborSet.add(item.cabor)
    })

    homeData.value.turnamen?.forEach((item) => {
      if (item.cabor && item.cabor !== '-') caborSet.add(item.cabor)
    })

    return Array.from(caborSet).sort()
  })

  // Fetch home data
  const fetchHomeData = async () => {
    if (process.client) {
      initAuth()
    }

    if (!isAuthenticated.value) {
      error.value = 'Anda harus login terlebih dahulu.'
      loading.value = false
      if (process.client) {
        window.location.href = '/login'
      }
      return
    }

    try {
      loading.value = true
      error.value = null

      const url = `${baseURL}/home`

      console.log(' Fetching home data with URL:', url)
      console.log(' Auth headers:', getAuthHeaders())

      const response = await $fetch<ApiResponse<HomeData>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })

      console.log(' Home API Response:', response)

      if (response.status === 'success') {
        homeData.value = response.data
        console.log(' Home data loaded:', {
          programLatihan: homeData.value?.programLatihan?.length || 0,
          pemeriksaan: homeData.value?.pemeriksaan?.length || 0,
          turnamen: homeData.value?.turnamen?.length || 0,
        })
      } else {
        error.value = response.message || 'Gagal mengambil data home'
      }
    } catch (err: any) {
      console.error('Error fetching home data:', err)

      if (err?.status === 302 || err?.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        error.value = 'Endpoint home tidak ditemukan.'
      } else {
        error.value = err?.message || 'Terjadi kesalahan saat mengambil data.'
      }
    } finally {
      loading.value = false
    }
  }

  // Helper functions
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
    selectedModule.value = 'all'
  }

  const setModuleFilter = (module: string) => {
    selectedModule.value = module
  }

  return {
    // State
    homeData,
    loading,
    error,

    // Search and Filter
    searchQuery,
    selectedCabor,
    selectedModule,

    // Computed
    filteredProgramLatihan,
    filteredPemeriksaan,
    filteredTurnamen,
    availableCabor,

    // Methods
    fetchHomeData,
    toggleCaborFilter,
    clearFilters,
    setModuleFilter,
  }
}
