import { ref } from 'vue'
import { useAuth } from './useAuth'

type ContextType = 'rencana' | 'pemeriksaan' | 'turnamen'

interface FetchParams {
  context: ContextType
  rencanaId?: number
  pemeriksaanId?: number
  turnamenId?: number
  jenis: 'atlet' | 'pelatih' | 'tenaga-pendukung' | 'tenaga_pendukung'
  pesertaId: number
}

export function useParticipantProfile() {
  const profile = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://dispora.summitbreak.com/api'
  const { getAuthHeaders, isAuthenticated, initAuth } = useAuth()

  const buildUrl = (params: FetchParams) => {
    const jenis = params.jenis
    switch (params.context) {
      case 'rencana':
        if (!params.rencanaId) throw new Error('rencanaId diperlukan')
        return `/rencana-latihan/${params.rencanaId}/peserta/${jenis}/profil/${params.pesertaId}`
      case 'pemeriksaan':
        if (!params.pemeriksaanId) throw new Error('pemeriksaanId diperlukan')
        return `/pemeriksaan/${params.pemeriksaanId}/peserta/${jenis}/profil/${params.pesertaId}`
      case 'turnamen':
        if (!params.turnamenId) throw new Error('turnamenId diperlukan')
        return `/turnamen/${params.turnamenId}/peserta/${jenis}/profil/${params.pesertaId}`
      default:
        throw new Error('Context tidak valid')
    }
  }

  const fetchProfile = async (params: FetchParams) => {
    loading.value = true
    error.value = null
    profile.value = null
    try {
      if (process.client) {
        initAuth()
      }
      if (!isAuthenticated.value) {
        throw new Error('Anda harus login terlebih dahulu.')
      }

      const url = `${baseURL}${buildUrl(params)}`

      const response: any = await $fetch(url, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })

      // ApiResponseResource: { status, message, data }
      profile.value = response?.data ?? response
      return profile.value
    } catch (e: any) {
      error.value = e?.message || 'Terjadi kesalahan'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    profile,
    loading,
    error,
    fetchProfile,
  }
}
