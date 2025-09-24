import { ref, computed } from 'vue'
import { useAuth } from './useAuth'

interface TargetLatihan {
  id: number
  program_latihan_nama?: string
  jenis_target: 'individu' | 'kelompok'
  peruntukan: 'atlet' | 'pelatih' | 'tenaga-pendukung' | null
  deskripsi: string
  satuan: string | null
  nilai_target: string | null
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
  meta?: {
    total: number
    current_page: number
    per_page: number
    search: string
    filters: {
      jenis_target: string | null
      peruntukan: string | null
    }
  }
}

export const useProgramTargetLatihan = () => {
  let baseURL = 'http://dispora.jaganet.id/api'
  try {
    const config = useRuntimeConfig()
    baseURL = config.public.apiBase || 'http://dispora.jaganet.id/api'
  } catch (error) {
    console.warn('useRuntimeConfig not available, using fallback URL:', baseURL)
  }

  const { getAuthHeaders, isAuthenticated, token, initAuth } = useAuth()

  if (process.client) {
    initAuth()
  }

  // State
  const items = ref<TargetLatihan[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const perPage = ref(10)

  // Filters
  const searchQuery = ref('')
  const jenisTarget = ref<string>('')
  const peruntukan = ref<string>('')

  const hasActiveFilters = computed(() => {
    return !!(searchQuery.value || jenisTarget.value || peruntukan.value)
  })

  const fetchTargets = async (programId: number, page = 1) => {
    if (!isAuthenticated.value || !token.value) {
      error.value = 'Anda harus login terlebih dahulu.'
      if (process.client) window.location.href = '/login'
      return
    }

    try {
      loading.value = true
      error.value = null

      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.value.toString(),
      })

      if (searchQuery.value) params.append('search', searchQuery.value)
      if (jenisTarget.value) params.append('jenis_target', jenisTarget.value)
      if (jenisTarget.value === 'individu' && peruntukan.value) {
        params.append('peruntukan', peruntukan.value)
      }

      const cacheBuster = Date.now()
      const url = `${baseURL}/program-latihan/${programId}/target-latihan?${params}&_t=${cacheBuster}`

      const response = await $fetch<ApiResponse<TargetLatihan[]>>(url, {
        headers: {
          ...getAuthHeaders(),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
        credentials: 'include',
      })

      if (response.status === 'success') {
        items.value = response.data
        if (response.meta) {
          totalItems.value = response.meta.total
          currentPage.value = response.meta.current_page
          perPage.value = response.meta.per_page
          totalPages.value = Math.ceil(
            response.meta.total / response.meta.per_page
          )
        }
      } else {
        error.value = response.message || 'Gagal mengambil data target latihan'
      }
    } catch (err: any) {
      if (err?.status === 302 || err?.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err?.status === 404) {
        error.value = 'Endpoint target latihan tidak ditemukan.'
      } else {
        error.value = err?.message || 'Terjadi kesalahan saat mengambil data.'
      }
    } finally {
      loading.value = false
    }
  }

  const fetchTargetDetail = async (id: number) => {
    try {
      const url = `${baseURL}/target-latihan/${id}`
      const response = await $fetch<ApiResponse<any>>(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })
      if (response.status === 'success') {
        return response.data
      }
      return null
    } catch (err) {
      throw err
    }
  }

  const createTarget = async (data: any) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<TargetLatihan>>(
        `${baseURL}/target-latihan`,
        {
          method: 'POST',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: data,
        }
      )

      if (response.status === 'success') {
        return response.data
      }
    } catch (err: any) {
      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err.status === 403) {
        error.value = 'Anda tidak memiliki izin untuk membuat target latihan.'
      } else if (err.status === 422) {
        error.value = err.data?.message || 'Data yang dimasukkan tidak valid.'
      } else {
        error.value = err.data?.message || 'Gagal membuat target latihan'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTarget = async (id: number, data: any) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<TargetLatihan>>(
        `${baseURL}/target-latihan/${id}`,
        {
          method: 'PUT',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: data,
        }
      )

      if (response.status === 'success') {
        return response.data
      }
    } catch (err: any) {
      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err.status === 403) {
        error.value =
          'Anda tidak memiliki izin untuk mengupdate target latihan.'
      } else if (err.status === 404) {
        error.value = 'Target latihan tidak ditemukan.'
      } else if (err.status === 422) {
        error.value = err.data?.message || 'Data yang dimasukkan tidak valid.'
      } else {
        error.value = err.data?.message || 'Gagal mengupdate target latihan'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTarget = async (id: number) => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/target-latihan/${id}`,
        {
          method: 'DELETE',
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        return true
      }
    } catch (err: any) {
      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) window.location.href = '/login'
      } else if (err.status === 403) {
        error.value = 'Anda tidak memiliki izin untuk menghapus target latihan.'
      } else if (err.status === 404) {
        error.value = 'Target latihan tidak ditemukan.'
      } else {
        error.value = err.data?.message || 'Gagal menghapus target latihan'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    items,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    perPage,

    // Filters
    searchQuery,
    jenisTarget,
    peruntukan,
    hasActiveFilters,

    // API
    fetchTargets,
    fetchTargetDetail,
    createTarget,
    updateTarget,
    deleteTarget,
  }
}
