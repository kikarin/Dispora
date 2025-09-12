import { ref } from 'vue'
import { useAuth } from './useAuth'

interface ParameterItem {
  id: number
  nama_parameter: string
  satuan: string
}

interface PesertaLite {
  id: number // pemeriksaan_peserta.id
  peserta_id: number
  peserta: {
    nama: string
    jenis_kelamin: string
    usia: number | string
    foto?: string | null
  }
  status: { id: number | null; nama: string | null }
  ref_status_pemeriksaan_id: number | null
  catatan_umum: string | null
  parameters: Array<{
    parameter_id: number
    nilai: string
    trend: 'stabil' | 'kenaikan' | 'penurunan'
  }>
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const usePemeriksaanParameterMapping = () => {
  let baseURL = 'http://localhost:8000/api'
  try {
    const config = useRuntimeConfig()
    baseURL = config.public.apiBase || baseURL
  } catch {}

  const { getAuthHeaders, isAuthenticated, token, initAuth } = useAuth()
  if (typeof process !== 'undefined' && process.client) initAuth()

  const loading = ref(false)
  const error = ref<string | null>(null)

  const parameters = ref<ParameterItem[]>([])
  const pesertaItems = ref<PesertaLite[]>([])

  const fetchParameters = async (pemeriksaanId: number) => {
    try {
      loading.value = true
      error.value = null
      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/parameter/pemetaan`
      const res = await $fetch<ApiResponse<ParameterItem[]>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })
      if (res.status === 'success') parameters.value = res.data || []
    } catch (err: any) {
      error.value = err?.data?.message || 'Gagal memuat parameter pemeriksaan'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchPesertaWithParameters = async (
    pemeriksaanId: number,
    jenisPeserta: 'atlet' | 'pelatih' | 'tenaga-pendukung'
  ) => {
    try {
      loading.value = true
      error.value = null
      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/peserta/${jenisPeserta}/parameter/pemetaan`
      const res = await $fetch<ApiResponse<PesertaLite[]>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })
      if (res.status === 'success') pesertaItems.value = res.data || []
    } catch (err: any) {
      error.value = err?.data?.message || 'Gagal memuat peserta pemeriksaan'
      throw err
    } finally {
      loading.value = false
    }
  }

  const bulkUpdate = async (
    pemeriksaanId: number,
    data: Array<{
      peserta_id: number // id dari pemeriksaan_peserta
      status: number | null
      catatan: string | null
      parameters: Array<{
        parameter_id: number
        nilai: string
        trend: 'stabil' | 'kenaikan' | 'penurunan'
      }>
    }>
  ) => {
    try {
      loading.value = true
      error.value = null
      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/peserta-parameter/bulk-update`
      const res = await $fetch<ApiResponse<any>>(url, {
        method: 'POST',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        credentials: 'include',
        body: { data },
      })
      return res.status === 'success'
    } catch (err: any) {
      error.value =
        err?.data?.message || 'Gagal menyimpan data parameter peserta'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    parameters,
    pesertaItems,
    fetchParameters,
    fetchPesertaWithParameters,
    bulkUpdate,
  }
}
