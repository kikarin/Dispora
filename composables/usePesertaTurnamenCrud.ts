import { ref } from 'vue'
import { useAuth } from './useAuth'

interface PesertaAtlet {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  posisi: string
}

interface PesertaPelatih {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  jenisPelatih: string
}

interface PesertaTenagaPendukung {
  id: number
  nama: string
  foto: string | null
  jenisKelamin: string
  usia: number | string
  jenisTenagaPendukung: string
}

interface TurnamenInfo {
  id: number
  nama: string
  tanggal_mulai: string
  tanggal_selesai: string
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const usePesertaTurnamenCrud = (turnamenId: number) => {
  // Get runtime config or use fallback
  let baseURL = 'http://localhost:8000/api'

  try {
    const config = useRuntimeConfig()
    baseURL = config.public.apiBase || 'http://localhost:8000/api'
  } catch (error) {
    console.warn('useRuntimeConfig not available, using fallback URL:', baseURL)
  }

  // Get auth headers
  const { getAuthHeaders } = useAuth()

  // State
  const turnamenInfo = ref<TurnamenInfo | null>(null)
  const atletList = ref<PesertaAtlet[]>([])
  const pelatihList = ref<PesertaPelatih[]>([])
  const tenagaPendukungList = ref<PesertaTenagaPendukung[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const availableLoading = ref(false)
  const availableError = ref<string | null>(null)

  // API Functions
  const fetchPeserta = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/turnamen/${turnamenId}/peserta/kelola`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        turnamenInfo.value = response.data.turnamen
        atletList.value = response.data.atlet || []
        pelatihList.value = response.data.pelatih || []
        tenagaPendukungList.value = response.data.tenaga_pendukung || []
      }
    } catch (err: any) {
      console.error('Error fetching peserta turnamen:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      } else if (err.status === 403) {
        error.value =
          'Anda tidak memiliki izin untuk mengakses peserta turnamen.'
      } else if (err.status === 404) {
        error.value = 'Turnamen tidak ditemukan.'
      } else {
        error.value =
          err.data?.message || 'Gagal mengambil data peserta turnamen'
      }
    } finally {
      loading.value = false
    }
  }

  const addPesertaToTurnamen = async (
    pesertaId: number,
    type: 'atlet' | 'pelatih' | 'tenaga-pendukung'
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/turnamen/${turnamenId}/peserta/kelola`,
        {
          method: 'POST',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: {
            peserta_id: pesertaId,
            jenis_peserta: type,
          },
        }
      )

      if (response.status === 'success') {
        // Refresh peserta list
        await fetchPeserta()
        return response.data
      }
    } catch (err: any) {
      console.error('Error adding peserta to turnamen:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      } else if (err.status === 403) {
        error.value =
          'Anda tidak memiliki izin untuk menambahkan peserta turnamen.'
      } else if (err.status === 404) {
        error.value = 'Turnamen atau peserta tidak ditemukan.'
      } else if (err.status === 422) {
        error.value = err.data?.message || 'Data yang dimasukkan tidak valid.'
      } else {
        error.value = err.data?.message || 'Gagal menambahkan peserta turnamen'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const removePesertaFromTurnamen = async (
    pesertaId: number,
    type: 'atlet' | 'pelatih' | 'tenaga-pendukung'
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/turnamen/${turnamenId}/peserta/kelola/${pesertaId}`,
        {
          method: 'DELETE',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: {
            jenis_peserta: type,
          },
        }
      )

      if (response.status === 'success') {
        // Refresh peserta list
        await fetchPeserta()
        return true
      }
    } catch (err: any) {
      console.error('Error removing peserta from turnamen:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      } else if (err.status === 403) {
        error.value =
          'Anda tidak memiliki izin untuk menghapus peserta turnamen.'
      } else if (err.status === 404) {
        error.value = 'Peserta turnamen tidak ditemukan.'
      } else {
        error.value = err.data?.message || 'Gagal menghapus peserta turnamen'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchAvailablePeserta = async (
    type: 'atlet' | 'pelatih' | 'tenaga-pendukung',
    search = ''
  ) => {
    try {
      availableLoading.value = true
      availableError.value = null

      const params = new URLSearchParams({
        jenis_peserta: type,
        search: search,
      })

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/turnamen/${turnamenId}/peserta/kelola/available?${params}`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching available peserta:', err)
      availableError.value =
        err.data?.message || 'Gagal mengambil data peserta tersedia'
      return []
    } finally {
      availableLoading.value = false
    }
  }

  return {
    // State
    turnamenInfo,
    atletList,
    pelatihList,
    tenagaPendukungList,
    loading,
    error,
    availableLoading,
    availableError,

    // API Functions
    fetchPeserta,
    addPesertaToTurnamen,
    removePesertaFromTurnamen,
    fetchAvailablePeserta,
  }
}
