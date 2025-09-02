import { ref, watch } from 'vue'
import { useAuth } from './useAuth'

interface PesertaAtlet {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  posisi: string
  kehadiran: string | null
}

interface PesertaPelatih {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  jenisPelatih: string
  kehadiran: string | null
}

interface PesertaTenagaPendukung {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  jenisTenagaPendukung: string
  kehadiran: string | null
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const usePesertaRencana = (rencanaId: number) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:8000/api'
  const { getAuthHeaders } = useAuth()

  // State
  const atlet = ref<PesertaAtlet[]>([])
  const pelatih = ref<PesertaPelatih[]>([])
  const tenagaPendukung = ref<PesertaTenagaPendukung[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')

  const fetchPeserta = async () => {
    try {
      loading.value = true
      error.value = null

      const params = new URLSearchParams()
      if (searchQuery.value) params.append('search', searchQuery.value)

      const url = `${baseURL}/rencana-latihan/${rencanaId}/peserta?${params}`

      const response = await $fetch<
        ApiResponse<{
          atlet: PesertaAtlet[]
          pelatih: PesertaPelatih[]
          tenagaPendukung: PesertaTenagaPendukung[]
        }>
      >(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })

      if (response.status === 'success') {
        atlet.value = response.data?.atlet || []
        pelatih.value = response.data?.pelatih || []
        tenagaPendukung.value = response.data?.tenagaPendukung || []
      } else {
        error.value = response.message || 'Gagal mengambil data peserta'
      }
    } catch (err: any) {
      if (err?.status === 302 || err?.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        error.value = 'Endpoint peserta tidak ditemukan.'
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
    atlet,
    pelatih,
    tenagaPendukung,
    loading,
    error,
    searchQuery,
    fetchPeserta,
  }
}
