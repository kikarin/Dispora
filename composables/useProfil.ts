import { ref } from 'vue'
import { useAuth } from './useAuth'

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

type JenisPeserta = 'atlet' | 'pelatih' | 'tenaga-pendukung'

interface OrangTuaWali {
  nama: string | null
  tempatLahir: string | null
  tanggalLahir: string | null
  noHP: string | null
  pekerjaan: string | null
  alamat: string | null
}

interface SertifikatItem {
  id: number
  nama: string
  penyelenggara: string | null
  tanggalTerbit: string | null
  file: string | null
}

interface PrestasiItem {
  id: number
  namaEvent: string
  tingkat: string | null
  tanggal: string | null
  peringkat: string | number | null
  keterangan: string | null
}

interface DokumenItem {
  id: number
  jenis: string | null
  nomor: string | null
  file: string | null
}

interface Kesehatan {
  tinggiBadan: number | null
  beratBadan: number | null
  penglihatan: string | null
  pendengaran: string | null
  riwayatPenyakit: string | null
  alergi: string | null
}

interface ProfilDataBase {
  nik: string | null
  nama: string | null
  jenisKelamin: string | null
  tempatLahir: string | null
  tanggalLahir: string | null
  tanggalBergabung: string | null
  lamaBergabung: string | null
  alamat: string | null
  kecamatan: string | null
  kelurahan: string | null
  noHP: string | null
  email: string | null
  status: string | null
  foto: string | null
  sertifikat: SertifikatItem[]
  prestasi: PrestasiItem[]
  dokumen: DokumenItem[]
  kesehatan: Kesehatan
  // Hanya untuk atlet
  ibu?: OrangTuaWali
  ayah?: OrangTuaWali
  wali?: OrangTuaWali
  // Endpoint /profil/me menyertakan ini
  jenis?: JenisPeserta
}

export const useProfil = () => {
  let baseURL = 'http://dispora.jaganet.id/api'
  try {
    const config = useRuntimeConfig()
    baseURL = config.public.apiBase || baseURL
  } catch {}

  const { getAuthHeaders, isAuthenticated, token, initAuth } = useAuth()
  if (typeof window !== 'undefined') {
    initAuth()
  }

  const profil = ref<ProfilDataBase | null>(null)
  const jenis = ref<JenisPeserta | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProfil = async (opts?: {
    tipe?: 'me' | 'atlet' | 'pelatih' | 'tenaga-pendukung'
  }) => {
    if (!isAuthenticated.value || !token.value) {
      error.value = 'Anda harus login terlebih dahulu.'
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
      return
    }

    const tipe = opts?.tipe || 'me'
    const path =
      tipe === 'me'
        ? '/profil/me'
        : tipe === 'atlet'
          ? '/profil/atlet'
          : tipe === 'pelatih'
            ? '/profil/pelatih'
            : '/profil/tenaga-pendukung'

    try {
      loading.value = true
      error.value = null

      const response = await $fetch<ApiResponse<any>>(`${baseURL}${path}`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      })

      if (response.status === 'success') {
        const data = response.data as ProfilDataBase
        profil.value = data
        if (tipe === 'me') {
          // /profil/me menyertakan jenis
          jenis.value = (data as any).jenis || null
        } else {
          jenis.value = tipe as JenisPeserta
        }
      } else {
        error.value = response?.message || 'Gagal memuat data profil'
      }
    } catch (err: any) {
      // Konsisten dengan pola composable lain
      console.error('Error fetch profil:', err)
      const status = err?.status || err?.response?.status
      if (status === 401 && typeof window !== 'undefined') {
        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
      }
      error.value =
        err?.data?.message ||
        err?.message ||
        'Terjadi kesalahan saat memuat profil'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    profil,
    jenis,
    loading,
    error,
    fetchProfil,
  }
}
