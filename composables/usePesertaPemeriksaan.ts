import { ref, watch } from 'vue'
import { useAuth } from './useAuth'

interface PesertaAtlet {
  id: number
  pemeriksaanPesertaId: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  posisi: string
  statusPemeriksaan: string | null
}

interface PesertaPelatih {
  id: number
  pemeriksaanPesertaId: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  jenisPelatih: string
  statusPemeriksaan: string | null
}

interface PesertaTenagaPendukung {
  id: number
  pemeriksaanPesertaId: number
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
  const baseURL = config.public.apiBase || 'http://dispora.summitbreak.com/api'
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

        // Map data dengan pemeriksaanPesertaId (backend menggunakan pemeriksaan_peserta_id)
        atlet.value = (response.data.atlet || []).map((item: any) => ({
          ...item,
          pemeriksaanPesertaId: item.pemeriksaan_peserta_id,
        }))

        pelatih.value = (response.data.pelatih || []).map((item: any) => ({
          ...item,
          pemeriksaanPesertaId: item.pemeriksaan_peserta_id,
        }))

        tenagaPendukung.value = (response.data.tenagaPendukung || []).map(
          (item: any) => ({
            ...item,
            pemeriksaanPesertaId: item.pemeriksaan_peserta_id,
          })
        )

        // Log untuk debugging
        console.log(' Peserta loaded:', {
          atlet: atlet.value.length,
          pelatih: pelatih.value.length,
          tenagaPendukung: tenagaPendukung.value.length,
        })

        // Log sample data untuk debugging
        if (atlet.value.length > 0) {
          console.log('Sample atlet data:', atlet.value[0])
          console.log(
            'Atlet pemeriksaanPesertaId:',
            atlet.value[0].pemeriksaanPesertaId
          )
        }
        if (pelatih.value.length > 0) {
          console.log('Sample pelatih data:', pelatih.value[0])
          console.log(
            'Pelatih pemeriksaanPesertaId:',
            pelatih.value[0].pemeriksaanPesertaId
          )
        }
        if (tenagaPendukung.value.length > 0) {
          console.log('Sample tenaga pendukung data:', tenagaPendukung.value[0])
          console.log(
            'Tenaga pendukung pemeriksaanPesertaId:',
            tenagaPendukung.value[0].pemeriksaanPesertaId
          )
        }
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
