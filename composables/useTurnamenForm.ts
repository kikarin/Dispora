import { ref } from 'vue'
import { useAuth } from './useAuth'

interface CaborKategori {
  id: number
  nama: string
  cabor: {
    id: number
    nama: string
  }
}

interface Tingkat {
  id: number
  nama: string
}

interface Juara {
  id: number
  nama: string
}

interface Atlet {
  id: number
  nama: string
  foto: string | null
  posisi: string
  jenis_kelamin: string
  usia: number
  lama_bergabung: string
}

interface Pelatih {
  id: number
  nama: string
  foto: string | null
  jenis_pelatih: string
  jenis_kelamin: string
  usia: number
  lama_bergabung: string
}

interface TenagaPendukung {
  id: number
  nama: string
  foto: string | null
  jenis_tenaga_pendukung: string
  jenis_kelamin: string
  usia: number
  lama_bergabung: string
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const useTurnamenForm = () => {
  let baseURL = 'http://localhost:8000/api'
  try {
    const config = useRuntimeConfig()
    baseURL = config.public.apiBase || baseURL
  } catch {}

  const { getAuthHeaders, isAuthenticated, initAuth } = useAuth()
  if (typeof window !== 'undefined') {
    initAuth()
  }

  const loading = ref(false)
  const error = ref<string | null>(null)

  // Form data
  const caborKategoriList = ref<CaborKategori[]>([])
  const tingkatList = ref<Tingkat[]>([])
  const juaraList = ref<Juara[]>([])
  const atletList = ref<Atlet[]>([])
  const pelatihList = ref<Pelatih[]>([])
  const tenagaPendukungList = ref<TenagaPendukung[]>([])

  // Fetch cabor kategori list
  const fetchCaborKategoriList = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<CaborKategori[]>>(
        `${baseURL}/turnamen/form/cabor-kategori`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        caborKategoriList.value = response.data || []
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching cabor kategori list:', err)
      error.value = err?.data?.message || 'Gagal memuat data cabor kategori'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch tingkat list
  const fetchTingkatList = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<Tingkat[]>>(
        `${baseURL}/turnamen/form/tingkat`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        tingkatList.value = response.data || []
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching tingkat list:', err)
      error.value = err?.data?.message || 'Gagal memuat data tingkat'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch juara list
  const fetchJuaraList = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<Juara[]>>(
        `${baseURL}/turnamen/form/juara`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        juaraList.value = response.data || []
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching juara list:', err)
      error.value = err?.data?.message || 'Gagal memuat data juara'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch atlet by cabor kategori
  const fetchAtletByCaborKategori = async (
    caborKategoriId: number,
    search = ''
  ) => {
    try {
      loading.value = true
      error.value = null

      const params = new URLSearchParams()
      if (search) params.append('search', search)

      const response = await $fetch<ApiResponse<Atlet[]>>(
        `${baseURL}/turnamen/form/cabor-kategori/${caborKategoriId}/atlet?${params}`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        atletList.value = response.data || []
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching atlet list:', err)
      error.value = err?.data?.message || 'Gagal memuat data atlet'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch pelatih by cabor kategori
  const fetchPelatihByCaborKategori = async (
    caborKategoriId: number,
    search = ''
  ) => {
    try {
      loading.value = true
      error.value = null

      const params = new URLSearchParams()
      if (search) params.append('search', search)

      const response = await $fetch<ApiResponse<Pelatih[]>>(
        `${baseURL}/turnamen/form/cabor-kategori/${caborKategoriId}/pelatih?${params}`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        pelatihList.value = response.data || []
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching pelatih list:', err)
      error.value = err?.data?.message || 'Gagal memuat data pelatih'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch tenaga pendukung by cabor kategori
  const fetchTenagaPendukungByCaborKategori = async (
    caborKategoriId: number,
    search = ''
  ) => {
    try {
      loading.value = true
      error.value = null

      const params = new URLSearchParams()
      if (search) params.append('search', search)

      const response = await $fetch<ApiResponse<TenagaPendukung[]>>(
        `${baseURL}/turnamen/form/cabor-kategori/${caborKategoriId}/tenaga-pendukung?${params}`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        tenagaPendukungList.value = response.data || []
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching tenaga pendukung list:', err)
      error.value = err?.data?.message || 'Gagal memuat data tenaga pendukung'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    caborKategoriList,
    tingkatList,
    juaraList,
    atletList,
    pelatihList,
    tenagaPendukungList,
    fetchCaborKategoriList,
    fetchTingkatList,
    fetchJuaraList,
    fetchAtletByCaborKategori,
    fetchPelatihByCaborKategori,
    fetchTenagaPendukungByCaborKategori,
  }
}
