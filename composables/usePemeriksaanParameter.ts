import { ref } from 'vue'
import { useAuth } from './useAuth'

interface ApiResponse<T> {
  status?: string
  message?: string
  data: T
  meta?: any
}

interface MasterParam {
  id: number
  nama: string
  satuan?: string | null
}
interface PemeriksaanInfo {
  id: number
  nama_pemeriksaan: string
  tanggal_pemeriksaan: string
}

export const usePemeriksaanParameter = () => {
  let baseURL = 'http://dispora.jaganet.id/api'
  try {
    const config = useRuntimeConfig()
    baseURL = config.public.apiBase || baseURL
  } catch {}

  const { getAuthHeaders, isAuthenticated, token, initAuth } = useAuth()
  if (process.client) initAuth()

  const loading = ref(false)
  const error = ref<string | null>(null)

  const pemeriksaan = ref<PemeriksaanInfo | null>(null)
  const parameterItems = ref<
    { id: number; nama_parameter: string; satuan: string | null }[]
  >([])
  const masterParams = ref<MasterParam[]>([])

  const fetchList = async (pemeriksaanId: number) => {
    if (!isAuthenticated.value || !token.value) {
      error.value = 'Anda harus login terlebih dahulu.'
      if (process.client) window.location.href = '/login'
      return
    }
    try {
      loading.value = true
      error.value = null
      const url = `${baseURL}/pemeriksaan/${pemeriksaanId}/parameter`
      const res = await $fetch<
        ApiResponse<{ pemeriksaan: PemeriksaanInfo; parameter: any[] }>
      >(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })
      pemeriksaan.value = res.data.pemeriksaan
      parameterItems.value = res.data.parameter || []
    } catch (e: any) {
      error.value = e?.message || 'Gagal memuat parameter pemeriksaan'
    } finally {
      loading.value = false
    }
  }

  const fetchMaster = async () => {
    try {
      const url = `${baseURL}/mst-parameter`
      const res = await $fetch<ApiResponse<MasterParam[]>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })
      masterParams.value = Array.isArray(res.data)
        ? res.data
        : res.data?.data || []
    } catch (e) {
      masterParams.value = []
    }
  }

  const createParam = async (pemeriksaanId: number, mstParameterId: number) => {
    try {
      loading.value = true
      error.value = null
      const res = await $fetch<ApiResponse<any>>(
        `${baseURL}/pemeriksaan/${pemeriksaanId}/parameter`,
        {
          method: 'POST',
          headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
          credentials: 'include',
          body: { mst_parameter_id: mstParameterId },
        }
      )
      return res.data
    } catch (e: any) {
      error.value = e?.data?.message || e?.message || 'Gagal menambah parameter'
      throw e
    } finally {
      loading.value = false
    }
  }

  const updateParam = async (
    pemeriksaanId: number,
    id: number,
    mstParameterId: number
  ) => {
    try {
      loading.value = true
      error.value = null
      const res = await $fetch<ApiResponse<any>>(
        `${baseURL}/pemeriksaan/${pemeriksaanId}/parameter/${id}`,
        {
          method: 'PUT',
          headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
          credentials: 'include',
          body: { mst_parameter_id: mstParameterId },
        }
      )
      return res.data
    } catch (e: any) {
      error.value =
        e?.data?.message || e?.message || 'Gagal memperbarui parameter'
      throw e
    } finally {
      loading.value = false
    }
  }

  const deleteParam = async (pemeriksaanId: number, id: number) => {
    try {
      loading.value = true
      error.value = null
      await $fetch<ApiResponse<any>>(
        `${baseURL}/pemeriksaan/${pemeriksaanId}/parameter/${id}`,
        {
          method: 'DELETE',
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )
      return true
    } catch (e: any) {
      error.value =
        e?.data?.message || e?.message || 'Gagal menghapus parameter'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    pemeriksaan,
    parameterItems,
    masterParams,
    fetchList,
    fetchMaster,
    createParam,
    updateParam,
    deleteParam,
  }
}
