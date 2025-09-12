import { ref } from 'vue'
import { useAuth } from './useAuth'
import { useProgramLatihan } from './useProgramLatihan'

interface ApiResponse<T> {
  status: string
  message: string
  data: T
  meta?: any
}

interface TargetLite {
  id: number
  deskripsi: string
  peruntukan: string
  jenis_target: 'individu' | 'kelompok'
}
interface PersonLite {
  id: number
  nama: string
  foto: string | null
}

export const useRencanaLatihanForm = () => {
  let baseURL = 'http://localhost:8000/api'
  try {
    const config = useRuntimeConfig()
    baseURL = config.public.apiBase || baseURL
  } catch {}

  const { getAuthHeaders, isAuthenticated, token, initAuth } = useAuth()
  if (process.client) initAuth()

  const loading = ref(false)
  const error = ref<string | null>(null)

  const programDetail = ref<any>(null)
  const targets = ref<TargetLite[]>([])
  const atlet = ref<PersonLite[]>([])
  const pelatih = ref<PersonLite[]>([])
  const tenagaPendukung = ref<PersonLite[]>([])

  const fetchProgramDetailForForm = async (programId: number) => {
    const { fetchProgramDetail } = useProgramLatihan()
    programDetail.value = await fetchProgramDetail(programId)
    return programDetail.value
  }

  const getCaborKategoriId = (): number | null => {
    return programDetail.value?.kategori?.id ?? null
  }

  const fetchTargetList = async (programId: number, search = '') => {
    try {
      loading.value = true
      error.value = null
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      const url = `${baseURL}/program-latihan/${programId}/target-latihan-list?${params}`
      const res = await $fetch<ApiResponse<TargetLite[]>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })
      targets.value = (res.data || []).map((t: any) => ({
        id: Number(t.id),
        deskripsi: t.deskripsi,
        peruntukan: t.peruntukan,
        jenis_target: t.jenis_target,
      }))
    } catch (e: any) {
      error.value = e?.message || 'Gagal memuat target latihan'
    } finally {
      loading.value = false
    }
  }

  const fetchAtletList = async (caborKategoriId: number, search = '') => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    const url = `${baseURL}/cabor-kategori/${caborKategoriId}/atlet-list?${params}`
    const res = await $fetch<ApiResponse<any[]>>(url, {
      headers: getAuthHeaders(),
      credentials: 'include',
    })
    atlet.value = (res.data || []).map((a: any) => ({
      id: Number(a.id),
      nama: a.nama,
      foto: a.foto || null,
    }))
  }

  const fetchPelatihList = async (caborKategoriId: number, search = '') => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    const url = `${baseURL}/cabor-kategori/${caborKategoriId}/pelatih-list?${params}`
    const res = await $fetch<ApiResponse<any[]>>(url, {
      headers: getAuthHeaders(),
      credentials: 'include',
    })
    pelatih.value = (res.data || []).map((p: any) => ({
      id: Number(p.id),
      nama: p.nama,
      foto: p.foto || null,
    }))
  }

  const fetchTenagaList = async (caborKategoriId: number, search = '') => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    const url = `${baseURL}/cabor-kategori/${caborKategoriId}/tenaga-pendukung-list?${params}`
    const res = await $fetch<ApiResponse<any[]>>(url, {
      headers: getAuthHeaders(),
      credentials: 'include',
    })
    tenagaPendukung.value = (res.data || []).map((t: any) => ({
      id: Number(t.id),
      nama: t.nama,
      foto: t.foto || null,
    }))
  }

  const createRencana = async (payload: any) => {
    try {
      loading.value = true
      error.value = null
      const res = await $fetch<ApiResponse<any>>(`${baseURL}/rencana-latihan`, {
        method: 'POST',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        credentials: 'include',
        body: payload,
      })
      return res.data
    } catch (e: any) {
      error.value =
        e?.data?.message || e?.message || 'Gagal membuat rencana latihan'
      throw e
    } finally {
      loading.value = false
    }
  }

  const updateRencana = async (id: number, payload: any) => {
    try {
      loading.value = true
      error.value = null
      const res = await $fetch<ApiResponse<any>>(
        `${baseURL}/rencana-latihan/${id}`,
        {
          method: 'PUT',
          headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
          credentials: 'include',
          body: payload,
        }
      )
      return res.data
    } catch (e: any) {
      error.value =
        e?.data?.message || e?.message || 'Gagal memperbarui rencana latihan'
      throw e
    } finally {
      loading.value = false
    }
  }

  const deleteRencana = async (id: number) => {
    try {
      loading.value = true
      error.value = null
      await $fetch<ApiResponse<any>>(`${baseURL}/rencana-latihan/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      })
      return true
    } catch (e: any) {
      error.value =
        e?.data?.message || e?.message || 'Gagal menghapus rencana latihan'
      throw e
    } finally {
      loading.value = false
    }
  }

  const fetchRencanaDetail = async (id: number) => {
    try {
      loading.value = true
      error.value = null
      const url = `${baseURL}/rencana-latihan/${id}`
      const res = await $fetch<ApiResponse<any>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })
      return res.data
    } catch (e: any) {
      error.value = e?.message || 'Gagal mengambil detail rencana latihan'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    programDetail,
    targets,
    atlet,
    pelatih,
    tenagaPendukung,
    fetchProgramDetailForForm,
    getCaborKategoriId,
    fetchTargetList,
    fetchAtletList,
    fetchPelatihList,
    fetchTenagaList,
    createRencana,
    updateRencana,
    deleteRencana,
    fetchRencanaDetail,
  }
}
