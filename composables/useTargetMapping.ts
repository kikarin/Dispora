import { ref } from 'vue'
import { useAuth } from './useAuth'

interface Participant {
  id: number
  nama: string
  foto?: string
  jenis_kelamin: 'Laki-laki' | 'Perempuan'
  usia: number | string
  posisi?: string
  jenis_pelatih?: string
  jenis_tenaga_pendukung?: string
}

interface Target {
  target_latihan_id: number
  deskripsi: string
  satuan: string
  nilai_target: string
  nilai: string
  trend: 'naik' | 'stabil' | 'turun'
  jenis_target?: 'individu' | 'kelompok'
  peruntukan?: 'atlet' | 'pelatih' | 'tenaga-pendukung'
}

interface RencanaLatihan {
  id: number
  tanggal: string
  materi: string
  lokasi_latihan: string
  program_latihan: {
    nama_program: string
    cabor_nama: string
    cabor_kategori_nama: string
  }
}

interface ParticipantMappingData {
  rencana_latihan: RencanaLatihan
  jenis_peserta: string
  peserta_list: Array<{
    peserta_id: number
    peserta: Participant
    targets: Target[]
  }>
}

interface GroupMappingData {
  program_latihan: {
    nama_program: string
    cabor_nama: string
    cabor_kategori_nama: string
  }
  rencana_latihan_list: Array<{
    rencana_id: number
    tanggal: string
    materi: string
    lokasi_latihan: string
    jumlah_atlet: number
    jumlah_pelatih: number
    jumlah_tenaga_pendukung: number
    targets: Target[]
  }>
}

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const useTargetMapping = () => {
  // Get runtime config
  let baseURL = 'http://dispora.jaganet.id/api'
  try {
    const config = useRuntimeConfig()
    baseURL = config.public.apiBase || 'http://dispora.jaganet.id/api'
  } catch (error) {
    console.warn('useRuntimeConfig not available, using fallback URL:', baseURL)
  }

  // Get auth headers
  const { getAuthHeaders, isAuthenticated, token, initAuth } = useAuth()

  // Initialize auth immediately
  if (process.client) {
    initAuth()
  }

  // State
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Get participant target mapping
  const fetchParticipantMapping = async (
    rencanaId: number,
    jenisPeserta: string = 'atlet'
  ): Promise<ParticipantMappingData | null> => {
    if (!isAuthenticated.value || !token.value) {
      error.value = 'Anda harus login terlebih dahulu.'
      if (process.client) {
        window.location.href = '/login'
      }
      return null
    }

    try {
      loading.value = true
      error.value = null

      const params = new URLSearchParams({
        jenis_peserta: jenisPeserta,
      })

      const response = await $fetch<ApiResponse<ParticipantMappingData>>(
        `${baseURL}/rencana-latihan/${rencanaId}/target-mapping/participant?${params}`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching participant mapping:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 404) {
        error.value = 'Rencana latihan tidak ditemukan.'
      } else {
        error.value =
          err.data?.message || 'Gagal mengambil data mapping peserta'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  // Get group target mapping
  const fetchGroupMapping = async (
    programId: number
  ): Promise<GroupMappingData | null> => {
    if (!isAuthenticated.value || !token.value) {
      error.value = 'Anda harus login terlebih dahulu.'
      if (process.client) {
        window.location.href = '/login'
      }
      return null
    }

    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<GroupMappingData>>(
        `${baseURL}/program-latihan/${programId}/target-mapping/group`,
        {
          headers: getAuthHeaders(),
          credentials: 'include',
        }
      )

      if (response.status === 'success') {
        return response.data
      }
    } catch (err: any) {
      console.error('Error fetching group mapping:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 404) {
        error.value = 'Program latihan tidak ditemukan.'
      } else {
        error.value =
          err.data?.message || 'Gagal mengambil data mapping kelompok'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  // Bulk update participant targets
  const bulkUpdateParticipantTargets = async (
    rencanaId: number,
    data: Array<{
      peserta_id: number
      target_latihan_id: number
      nilai: string
      trend: 'naik' | 'stabil' | 'turun'
    }>
  ): Promise<boolean> => {
    if (!isAuthenticated.value || !token.value) {
      error.value = 'Anda harus login terlebih dahulu.'
      if (process.client) {
        window.location.href = '/login'
      }
      return false
    }

    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/rencana-latihan/${rencanaId}/target-mapping/participant/bulk-update`,
        {
          method: 'POST',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: { data },
        }
      )

      if (response.status === 'success') {
        return true
      }
    } catch (err: any) {
      console.error('Error bulk updating participant targets:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 422) {
        error.value = err.data?.message || 'Data yang dimasukkan tidak valid.'
      } else {
        error.value =
          err.data?.message || 'Gagal memperbarui data target peserta'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  // Bulk update group targets
  const bulkUpdateGroupTargets = async (
    programId: number,
    data: Array<{
      rencana_latihan_id: number
      target_latihan_id: number
      nilai: string
      trend: 'naik' | 'stabil' | 'turun'
    }>
  ): Promise<boolean> => {
    if (!isAuthenticated.value || !token.value) {
      error.value = 'Anda harus login terlebih dahulu.'
      if (process.client) {
        window.location.href = '/login'
      }
      return false
    }

    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(
        `${baseURL}/program-latihan/${programId}/target-mapping/group/bulk-update`,
        {
          method: 'POST',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: { data },
        }
      )

      if (response.status === 'success') {
        return true
      }
    } catch (err: any) {
      console.error('Error bulk updating group targets:', err)

      if (err.status === 401) {
        error.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
        if (process.client) {
          window.location.href = '/login'
        }
      } else if (err.status === 422) {
        error.value = err.data?.message || 'Data yang dimasukkan tidak valid.'
      } else {
        error.value =
          err.data?.message || 'Gagal memperbarui data target kelompok'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    loading,
    error,

    // API Functions
    fetchParticipantMapping,
    fetchGroupMapping,
    bulkUpdateParticipantTargets,
    bulkUpdateGroupTargets,
  }
}
