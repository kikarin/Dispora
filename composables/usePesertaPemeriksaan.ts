import { ref, watch } from 'vue'
import { useAuth } from './useAuth'

interface PesertaAtlet {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  posisi: string
  statusPemeriksaan: string | null
}

interface PesertaPelatih {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  jenisPelatih: string
  statusPemeriksaan: string | null
}

interface PesertaTenagaPendukung {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  jenisTenagaPendukung: string
  statusPemeriksaan: string | null
}

interface PemeriksaanInfo {
  id: number
  nama_pemeriksaan: string
  tanggal_pemeriksaan: string
  status: string
}

interface PesertaPemeriksaanResponse {
  pemeriksaan: PemeriksaanInfo
  atlet: PesertaAtlet[]
  pelatih: PesertaPelatih[]
  tenagaPendukung: PesertaTenagaPendukung[]
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const usePesertaPemeriksaan = (pemeriksaanId: number) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:8000/api'
  const { getAuthHeaders, isAuthenticated, initAuth } = useAuth()

  // State
  const pemeriksaanInfo = ref<PemeriksaanInfo | null>(null)
  const atlet = ref<PesertaAtlet[]>([])
  const pelatih = ref<PesertaPelatih[]>([])
  const tenagaPendukung = ref<PesertaTenagaPendukung[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')

  const fetchPeserta = async () => {
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

      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/peserta?${params}`

      console.log('🔍 Fetching peserta pemeriksaan with URL:', url)
      console.log('🔑 Auth headers:', getAuthHeaders())

      const response = await $fetch<ApiResponse<PesertaPemeriksaanResponse>>(
        url,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      console.log(' API Response:', response)

      if (response.status === 'success') {
        pemeriksaanInfo.value = response.data.pemeriksaan
        atlet.value = response.data.atlet || []
        pelatih.value = response.data.pelatih || []
        tenagaPendukung.value = response.data.tenagaPendukung || []

        console.log(' Peserta loaded:', {
          atlet: atlet.value.length,
          pelatih: pelatih.value.length,
          tenagaPendukung: tenagaPendukung.value.length,
        })
      } else {
        error.value =
          response.message || 'Gagal mengambil data peserta pemeriksaan'
      }
    } catch (err: any) {
      console.error('Error fetching peserta pemeriksaan:', err)

      if (err?.status === 302 || err?.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        error.value = 'Pemeriksaan atau peserta tidak ditemukan.'
      } else {
        error.value = err?.message || 'Terjadi kesalahan saat mengambil data.'
      }
    } finally {
      loading.value = false
    }
  }

  // Debounce search
  let searchTimeout: any
  watch(searchQuery, () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      fetchPeserta()
    }, 400)
  })

  return {
    pemeriksaanInfo,
    atlet,
    pelatih,
    tenagaPendukung,
    loading,
    error,
    searchQuery,
    fetchPeserta,
  }
}
