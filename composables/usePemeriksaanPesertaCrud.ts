import { ref } from 'vue'
import { useAuth } from './useAuth'

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

interface PesertaItem {
  id: number
  peserta: {
    id: number
    nama: string
    foto: string | null
    jenis_kelamin?: string
    tanggal_lahir?: string
  }
  status: { id: number | null; nama: string | null }
  catatan_umum: string | null
}

interface KandidatItem {
  id: number
  nama: string
  foto: string | null
  posisi?: string
  jenis_kelamin?: string
  usia?: number
}
interface RefStatusItem {
  id: number
  nama: string
}

export const usePemeriksaanPesertaCrud = () => {
  let baseURL = 'http://dispora.jaganet.id/api'
  try {
    const config = useRuntimeConfig()
    baseURL = config.public.apiBase || baseURL
  } catch {}

  const { getAuthHeaders, initAuth, isAuthenticated, token } = useAuth()
  try {
    // guard for SSR typings
    // @ts-ignore
    if (typeof process !== 'undefined' && (process as any).client) initAuth()
  } catch {}

  const loading = ref(false)
  const error = ref<string | null>(null)
  const items = ref<PesertaItem[]>([])
  const refStatusList = ref<RefStatusItem[]>([])

  const fetchList = async (pemeriksaanId: number, jenis = '', search = '') => {
    if (!isAuthenticated.value || !token.value) {
      error.value = 'Anda harus login terlebih dahulu.'
      try {
        // @ts-ignore
        if (typeof window !== 'undefined') window.location.href = '/login'
      } catch {}
      return
    }
    try {
      loading.value = true
      error.value = null
      const params = new URLSearchParams()
      if (jenis) params.append('jenis', jenis)
      if (search) params.append('search', search)
      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/peserta/list?${params}`
      const res = await $fetch<ApiResponse<PesertaItem[]>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })
      items.value = res.data || []
    } catch (e: any) {
      error.value = e?.message || 'Gagal memuat peserta pemeriksaan'
    } finally {
      loading.value = false
    }
  }

  const bulkAdd = async (
    pemeriksaanId: number,
    payload: {
      atlet_ids?: number[]
      pelatih_ids?: number[]
      tenaga_pendukung_ids?: number[]
      ref_status_pemeriksaan_id?: number | null
      catatan_umum?: string | null
    }
  ) => {
    try {
      loading.value = true
      error.value = null
      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/peserta`
      await $fetch<ApiResponse<any>>(url, {
        method: 'POST',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        credentials: 'include',
        body: payload,
      })
      return true
    } catch (e: any) {
      error.value =
        e?.data?.message || e?.message || 'Gagal menambahkan peserta'
      throw e
    } finally {
      loading.value = false
    }
  }

  const updatePeserta = async (
    pemeriksaanId: number,
    id: number,
    payload: {
      ref_status_pemeriksaan_id?: number | null
      catatan_umum?: string | null
    }
  ) => {
    try {
      loading.value = true
      error.value = null
      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/peserta/${id}`
      await $fetch<ApiResponse<any>>(url, {
        method: 'PUT',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        credentials: 'include',
        body: payload,
      })
      return true
    } catch (e: any) {
      error.value =
        e?.data?.message || e?.message || 'Gagal memperbarui peserta'
      throw e
    } finally {
      loading.value = false
    }
  }

  const deletePeserta = async (pemeriksaanId: number, id: number) => {
    try {
      loading.value = true
      error.value = null
      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/peserta/${id}`
      await $fetch<ApiResponse<any>>(url, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      })
      return true
    } catch (e: any) {
      error.value = e?.data?.message || e?.message || 'Gagal menghapus peserta'
      throw e
    } finally {
      loading.value = false
    }
  }

  const fetchKandidat = async (
    pemeriksaanId: number,
    tipe: 'atlet' | 'pelatih' | 'tenaga-pendukung',
    search = ''
  ) => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/kandidat/${tipe}?${params}`
    const res = await $fetch<ApiResponse<KandidatItem[]>>(url, {
      headers: getAuthHeaders(),
      credentials: 'include',
    })
    return res.data || []
  }

  const fetchRefStatus = async () => {
    try {
      const url = `${baseURL}/pemeriksaan/ref-status/list`
      // Backend mengembalikan array langsung: RefStatusItem[]
      const res = await $fetch<RefStatusItem[] | ApiResponse<RefStatusItem[]>>(
        url,
        { headers: getAuthHeaders(), credentials: 'include' }
      )
      // Normalisasi: dukung keduanya (array langsung atau wrapped)
      const list = Array.isArray(res) ? res : (res as any)?.data || []
      refStatusList.value = list as RefStatusItem[]
      return refStatusList.value
    } catch (e) {
      // Jangan fail keras untuk opsi dropdown; biarkan kosong jika error
      refStatusList.value = []
      return [] as RefStatusItem[]
    }
  }

  return {
    loading,
    error,
    items,
    refStatusList,
    fetchList,
    bulkAdd,
    updatePeserta,
    deletePeserta,
    fetchKandidat,
    fetchRefStatus,
  }
}
