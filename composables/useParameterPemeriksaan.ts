import { ref, watch, computed } from 'vue'
import { useAuth } from './useAuth'

interface Parameter {
  id: number
  nama_parameter: string
  satuan: string
}

interface PemeriksaanInfo {
  id: number
  nama_pemeriksaan: string
  tanggal_pemeriksaan: string
}

interface ParameterListResponse {
  pemeriksaan: PemeriksaanInfo
  parameter: Parameter[]
}

interface PesertaAtlet {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  posisi: string
  nilai: string
  status: string
}

interface PesertaPelatih {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  jenisPelatih: string
  nilai: string
  status: string
}

interface PesertaTenagaPendukung {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  jenisTenagaPendukung: string
  nilai: string
  status: string
}

interface ParameterDetail {
  id: number
  nama_parameter: string
  satuan: string
}

interface ParameterDetailResponse {
  pemeriksaan: PemeriksaanInfo
  parameter: ParameterDetail
  atlet: PesertaAtlet[]
  pelatih: PesertaPelatih[]
  tenagaPendukung: PesertaTenagaPendukung[]
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const useParameterPemeriksaan = (pemeriksaanId: number) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'https://dispora.summitbreak.com//api'
  const { getAuthHeaders, isAuthenticated, initAuth } = useAuth()

  // State untuk list parameter
  const pemeriksaanInfo = ref<PemeriksaanInfo | null>(null)
  const parameterList = ref<Parameter[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')

  // State untuk detail parameter
  const parameterDetail = ref<ParameterDetail | null>(null)
  const atlet = ref<PesertaAtlet[]>([])
  const pelatih = ref<PesertaPelatih[]>([])
  const tenagaPendukung = ref<PesertaTenagaPendukung[]>([])
  const detailLoading = ref(false)
  const detailError = ref<string | null>(null)
  const detailSearchQuery = ref('')

  // Computed properties for filtering
  const filteredParameterList = computed(() => {
    if (!searchQuery.value) {
      return parameterList.value
    }

    return parameterList.value.filter(
      (parameter) =>
        parameter.nama_parameter
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        parameter.satuan.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  const filteredAtlet = computed(() => {
    if (!detailSearchQuery.value) {
      return atlet.value
    }

    return atlet.value.filter(
      (peserta) =>
        peserta.nama
          .toLowerCase()
          .includes(detailSearchQuery.value.toLowerCase()) ||
        peserta.posisi
          .toLowerCase()
          .includes(detailSearchQuery.value.toLowerCase())
    )
  })

  const filteredPelatih = computed(() => {
    if (!detailSearchQuery.value) {
      return pelatih.value
    }

    return pelatih.value.filter(
      (peserta) =>
        peserta.nama
          .toLowerCase()
          .includes(detailSearchQuery.value.toLowerCase()) ||
        peserta.jenisPelatih
          .toLowerCase()
          .includes(detailSearchQuery.value.toLowerCase())
    )
  })

  const filteredTenagaPendukung = computed(() => {
    if (!detailSearchQuery.value) {
      return tenagaPendukung.value
    }

    return tenagaPendukung.value.filter(
      (peserta) =>
        peserta.nama
          .toLowerCase()
          .includes(detailSearchQuery.value.toLowerCase()) ||
        peserta.jenisTenagaPendukung
          .toLowerCase()
          .includes(detailSearchQuery.value.toLowerCase())
    )
  })

  // Fetch list parameter
  const fetchParameterList = async () => {
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

      const params = new URLSearchParams()
      if (searchQuery.value) params.append('search', searchQuery.value)

      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/parameter?${params}`

      console.log('🔍 Fetching parameter list with URL:', url)
      console.log('🔑 Auth headers:', getAuthHeaders())

      const response = await $fetch<ApiResponse<ParameterListResponse>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })

      console.log(' API Response:', response)

      if (response.status === 'success') {
        pemeriksaanInfo.value = response.data.pemeriksaan
        parameterList.value = response.data.parameter || []

        console.log(' Parameters loaded:', parameterList.value.length, 'items')
      } else {
        error.value =
          response.message || 'Gagal mengambil data parameter pemeriksaan'
      }
    } catch (err: any) {
      console.error('Error fetching parameter list:', err)

      if (err?.status === 302 || err?.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        error.value = 'Pemeriksaan atau parameter tidak ditemukan.'
      } else {
        error.value = err?.message || 'Terjadi kesalahan saat mengambil data.'
      }
    } finally {
      loading.value = false
    }
  }

  // Fetch detail parameter
  const fetchParameterDetail = async (parameterId: number) => {
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

      const params = new URLSearchParams()
      if (detailSearchQuery.value)
        params.append('search', detailSearchQuery.value)

      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/parameter/${parameterId}?${params}`

      console.log('🔍 Fetching parameter detail with URL:', url)
      console.log('🔑 Auth headers:', getAuthHeaders())

      const response = await $fetch<ApiResponse<ParameterDetailResponse>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })

      console.log(' API Response:', response)

      if (response.status === 'success') {
        pemeriksaanInfo.value = response.data.pemeriksaan
        parameterDetail.value = response.data.parameter
        atlet.value = response.data.atlet || []
        pelatih.value = response.data.pelatih || []
        tenagaPendukung.value = response.data.tenagaPendukung || []

        console.log(' Parameter detail loaded:', {
          atlet: atlet.value.length,
          pelatih: pelatih.value.length,
          tenagaPendukung: tenagaPendukung.value.length,
        })
      } else {
        detailError.value =
          response.message || 'Gagal mengambil detail parameter pemeriksaan'
      }
    } catch (err: any) {
      console.error('Error fetching parameter detail:', err)

      if (err?.status === 302 || err?.status === 401) {
        detailError.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        detailError.value = 'Parameter atau peserta tidak ditemukan.'
      } else {
        detailError.value =
          err?.message || 'Terjadi kesalahan saat mengambil data.'
      }
    } finally {
      detailLoading.value = false
    }
  }

  // Debounce search untuk list parameter
  let searchTimeout: any
  watch(searchQuery, () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      fetchParameterList()
    }, 400)
  })

  // Debounce search untuk detail parameter
  let detailSearchTimeout: any
  watch(detailSearchQuery, () => {
    clearTimeout(detailSearchTimeout)
    detailSearchTimeout = setTimeout(() => {
      // Re-fetch detail dengan search query baru
      if (parameterDetail.value) {
        fetchParameterDetail(parameterDetail.value.id)
      }
    }, 400)
  })

  return {
    // List parameter state
    pemeriksaanInfo,
    parameterList,
    loading,
    error,
    searchQuery,
    fetchParameterList,

    // Computed filtered data
    filteredParameterList,

    // Detail parameter state
    parameterDetail,
    atlet,
    pelatih,
    tenagaPendukung,
    detailLoading,
    detailError,
    detailSearchQuery,
    fetchParameterDetail,

    // Computed filtered detail data
    filteredAtlet,
    filteredPelatih,
    filteredTenagaPendukung,
  }
}
