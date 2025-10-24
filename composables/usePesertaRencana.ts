import { ref, watch } from 'vue'
import { useAuth } from './useAuth'

interface PesertaAtlet {
  id: number
  rencanaLatihanPesertaId: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  posisi: string
  kehadiran: string | null
}

interface PesertaPelatih {
  id: number
  rencanaLatihanPesertaId: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  jenisPelatih: string
  kehadiran: string | null
}

interface PesertaTenagaPendukung {
  id: number
  rencanaLatihanPesertaId: number
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
  const baseURL = config.public.apiBase || 'http://dispora.summitbreak.com/api'
  const { getAuthHeaders, isAuthenticated, token, initAuth } = useAuth()

  // State
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

      const url = `${baseURL}/rencana-latihan/${rencanaId}/peserta?${params}`

      console.log('🔍 Fetching peserta rencana with URL:', url)
      console.log('🔑 Auth headers:', getAuthHeaders())

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

      console.log('📊 API Response:', response)
      console.log('📊 Raw atlet data:', response.data?.atlet)
      console.log('📊 Raw pelatih data:', response.data?.pelatih)
      console.log(
        '📊 Raw tenaga pendukung data:',
        response.data?.tenagaPendukung
      )

      if (response.status === 'success') {
        // Map data dengan rencanaLatihanPesertaId (backend menggunakan rencana_latihan_peserta_id)
        atlet.value = (response.data?.atlet || []).map((item: any) => {
          console.log('Mapping atlet item:', item)
          return {
            ...item,
            rencanaLatihanPesertaId: item.rencana_latihan_peserta_id,
          }
        })

        pelatih.value = (response.data?.pelatih || []).map((item: any) => {
          console.log('Mapping pelatih item:', item)
          return {
            ...item,
            rencanaLatihanPesertaId: item.rencana_latihan_peserta_id,
          }
        })

        tenagaPendukung.value = (response.data?.tenagaPendukung || []).map(
          (item: any) => {
            console.log('Mapping tenaga pendukung item:', item)
            return {
              ...item,
              rencanaLatihanPesertaId: item.rencana_latihan_peserta_id,
            }
          }
        )

        // Log untuk debugging
        console.log(' Peserta rencana loaded:', {
          atlet: atlet.value.length,
          pelatih: pelatih.value.length,
          tenagaPendukung: tenagaPendukung.value.length,
        })

        // Log sample data untuk debugging
        if (atlet.value.length > 0) {
          console.log('Sample atlet data:', atlet.value[0])
          console.log(
            'Atlet rencanaLatihanPesertaId:',
            atlet.value[0]?.rencanaLatihanPesertaId
          )
        }
        if (pelatih.value.length > 0) {
          console.log('Sample pelatih data:', pelatih.value[0])
          console.log(
            'Pelatih rencanaLatihanPesertaId:',
            pelatih.value[0]?.rencanaLatihanPesertaId
          )
        }
        if (tenagaPendukung.value.length > 0) {
          console.log('Sample tenaga pendukung data:', tenagaPendukung.value[0])
          console.log(
            'Tenaga pendukung rencanaLatihanPesertaId:',
            tenagaPendukung.value[0]?.rencanaLatihanPesertaId
          )
        }
      } else {
        error.value = response.message || 'Gagal mengambil data peserta'
      }
    } catch (err: any) {
      if (err?.status === 302 || err?.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) {
          window.location.href = '/login'
        }
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
