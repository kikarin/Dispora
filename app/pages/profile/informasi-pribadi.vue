<template>
  <PageLayout>
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-4">
        <button
          @click="$router.back()"
          class="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 class="text-[24px] font-bold text-gray-700">Informasi Pribadi</h1>
      </div>
    </div>

    <!-- Avatar Atas -->
    <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur mb-6 flex items-center gap-4">
      <div
        class="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold flex-shrink-0"
        :class="{ 'cursor-pointer': !!profilePhotoUrl }"
        @click="profilePhotoUrl && openImageModal(profilePhotoUrl, profileData.nama || 'Foto Profil')"
      >
        <img
          v-if="profilePhotoUrl"
          :src="profilePhotoUrl"
          alt="Foto Profil"
          class="w-full h-full object-cover"
        />
        <span v-else>{{ profileInitials }}</span>
      </div>
      <div class="min-w-0">
        <p class="text-base font-semibold text-gray-800 truncate">{{ profileData.nama || '-' }}</p>
        <p class="text-sm text-gray-600 truncate">{{ profileData.email || '-' }}</p>
      </div>
    </div>

    <div
      v-if="loading"
      class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur"
    >
      <p class="text-sm text-gray-600">Memuat profil...</p>
    </div>
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4"
    >
      {{ error }}
    </div>
    <!-- Content -->
    <div v-else class="space-y-6">
      <!-- Information Section -->
      <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Information</h2>
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">NIK</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.nik
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Nama</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.nama
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Jenis Kelamin</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.jenisKelamin
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Tempat Lahir</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.tempatLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Tanggal Lahir</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.tanggalLahir
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tanggal Bergabung</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.tanggalBergabung
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Lama Bergabung</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.lamaBergabung
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Alamat</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.alamat || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Kecamatan</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.kecamatan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Kelurahan</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.kelurahan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">No HP</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.noHP || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Email</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.email || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Status</span>
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              {{ profileData.status }}
            </span>
          </div>
          <!-- Foto dipindah ke Avatar Atas -->
        </div>
      </div>

      <!-- Data Ibu Kandung Section -->
      <div
        v-if="showParentSections"
        class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur"
      >
        <h2 class="text-lg font-bold text-gray-800 mb-4">Data Ibu Kandung</h2>
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Nama Ibu Kandung</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.ibu.nama || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tempat Lahir Ibu</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.ibu.tempatLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tanggal Lahir Ibu</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.ibu.tanggalLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">No. HP Ibu</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.ibu.noHP || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Pekerjaan Ibu</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.ibu.pekerjaan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Alamat Ibu</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.ibu.alamat || '-'
            }}</span>
          </div>
        </div>
      </div>

      <!-- Data Ayah Kandung Section -->
      <div
        v-if="showParentSections"
        class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur"
      >
        <h2 class="text-lg font-bold text-gray-800 mb-4">Data Ayah Kandung</h2>
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Nama Ayah Kandung</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.ayah.nama || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tempat Lahir Ayah</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.ayah.tempatLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tanggal Lahir Ayah</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.ayah.tanggalLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">No. HP Ayah</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.ayah.noHP || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Pekerjaan Ayah</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.ayah.pekerjaan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Alamat Ayah</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.ayah.alamat || '-'
            }}</span>
          </div>
        </div>
      </div>

      <!-- Data Wali Section -->
      <div
        v-if="showParentSections"
        class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur"
      >
        <h2 class="text-lg font-bold text-gray-800 mb-4">Data Wali</h2>
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Nama Wali</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.wali.nama || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tempat Lahir Wali</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.wali.tempatLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tanggal Lahir Wali</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.wali.tanggalLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">No. HP Wali</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.wali.noHP || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Pekerjaan Wali</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.wali.pekerjaan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Alamat Wali</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.wali.alamat || '-'
            }}</span>
          </div>
        </div>
      </div>

      <!-- Sertifikat Section - Card Layout for Mobile -->
      <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
        <h2 class="text-lg font-bold text-gray-800 mb-4">
          Informasi Semua Sertifikat
        </h2>
        <div class="space-y-4">
          <div
            v-for="(sertifikat, index) in profileData.sertifikat"
            :key="sertifikat.id"
            class="p-4 bg-gray-50 rounded-xl border border-gray-200"
          >
            <div class="flex items-center gap-2 mb-3">

              <h3 class="font-semibold text-gray-800 text-sm">
                {{ sertifikat.nama }}
              </h3>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500">Penyelenggara</span>
                <span class="text-sm text-gray-800 font-medium">{{
                  sertifikat.penyelenggara
                }}</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500">Tanggal Terbit</span>
                <span class="text-sm text-gray-800">{{
                  sertifikat.tanggalTerbit
                }}</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500">File</span>
                <div v-if="sertifikat.file" class="flex items-center gap-2">
                  <button
                    @click="
                      openFileModal(
                        sertifikat.file,
                        `Sertifikat: ${sertifikat.nama}`
                      )
                    "
                    class="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                  >
                    Lihat
                  </button>
                </div>
                <span v-else class="text-sm text-gray-800">-</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Prestasi Section - Card Layout for Mobile -->
      <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
        <h2 class="text-lg font-bold text-gray-800 mb-4">
          Informasi Semua Prestasi
        </h2>
        <div class="space-y-4">
          <div
            v-for="(prestasi, index) in profileData.prestasi"
            :key="prestasi.id"
            class="p-4 bg-gray-50 rounded-xl border border-gray-200"
          >
            <div class="flex items-center gap-2 mb-3">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800 text-sm">
                  {{ prestasi.namaEvent }}
                </h3>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500">Tingkat</span>
                <span class="text-sm text-gray-800">{{
                  prestasi.tingkat
                }}</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500">Peringkat</span>
                <span class="text-sm text-gray-800">{{
                  prestasi.peringkat
                }}</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500">Tanggal</span>
                <span class="text-sm text-gray-800">{{
                  prestasi.tanggal
                }}</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500">Keterangan</span>
                <span class="text-sm text-gray-800 text-right">{{
                  prestasi.keterangan
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dokumen Section - Card Layout for Mobile -->
      <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
        <h2 class="text-lg font-bold text-gray-800 mb-4">
          Informasi Semua Dokumen
        </h2>
        <div class="space-y-4">
          <div
            v-for="(dokumen, index) in profileData.dokumen"
            :key="dokumen.id"
            class="p-4 bg-gray-50 rounded-xl border border-gray-200"
          >
            <div class="flex items-start gap-3">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800 text-sm mb-2">
                  {{ dokumen.jenis }}
                </h3>
                <div class="space-y-2">
                  <div class="flex justify-between items-start">
                    <span class="text-xs text-gray-500">Nomor Dokumen</span>
                    <span class="text-sm text-gray-800 font-medium">{{
                      dokumen.nomor
                    }}</span>
                  </div>
                  <div class="flex justify-between items-start">
                    <span class="text-xs text-gray-500">File</span>
                    <div v-if="dokumen.file" class="flex items-center gap-2">
                      <button
                        @click="
                          openFileModal(
                            dokumen.file,
                            `Dokumen: ${dokumen.jenis}`
                          )
                        "
                        class="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                      >
                        Lihat
                      </button>
                    </div>
                    <span v-else class="text-sm text-gray-800">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Kesehatan Section -->
      <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Data Kesehatan</h2>
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tinggi Badan (cm)</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.kesehatan.tinggiBadan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Berat Badan (kg)</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.kesehatan.beratBadan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Penglihatan</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.kesehatan.penglihatan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Pendengaran</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.kesehatan.pendengaran || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Riwayat Penyakit</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              profileData.kesehatan.riwayatPenyakit || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Alergi</span>
            <span class="text-sm text-gray-800 text-right">{{
              profileData.kesehatan.alergi || '-'
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Spacer for bottom navigation -->
    <div class="h-20"></div>

    <!-- Bottom Navigation -->

    <!-- Modals -->
    <ImageModal
      :is-open="imageModal.isOpen"
      :image-url="imageModal.url"
      :title="imageModal.title"
      @close="closeImageModal"
    />

    <PdfModal
      :is-open="pdfModal.isOpen"
      :pdf-url="pdfModal.url"
      :title="pdfModal.title"
      @close="closePdfModal"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import PageLayout from '~/components/PageLayout.vue'
import ImageModal from '~/components/ImageModal.vue'
import PdfModal from '~/components/PdfModal.vue'
import { useProfil } from '../../../composables/useProfil'

// Profile Data
const profileData = ref({
  nik: '1234567890123460',
  nama: 'Rizky Pratama',
  jenisKelamin: 'Laki-laki',
  tempatLahir: 'Yogyakarta',
  tanggalLahir: '5/5/2004',
  tanggalBergabung: '5/5/2024',
  lamaBergabung: '1 tahun 3 bulan',
  alamat: 'Jl. Anggrek 5',
  kecamatan: '-',
  kelurahan: '-',
  noHP: '081234567894',
  email: 'rizky@example.com',
  status: 'Aktif',
  foto: 'Tidak ada foto',

  ibu: {
    nama: 'Yuni Astuti',
    tempatLahir: '-',
    tanggalLahir: '-',
    noHP: '-',
    pekerjaan: '-',
    alamat: '-',
  },

  ayah: {
    nama: 'Dedi Mulyadi',
    tempatLahir: '-',
    tanggalLahir: '-',
    noHP: '-',
    pekerjaan: '-',
    alamat: '-',
  },

  wali: {
    nama: '-',
    tempatLahir: '-',
    tanggalLahir: '-',
    noHP: '-',
    pekerjaan: '-',
    alamat: '-',
  },

  sertifikat: [
    {
      id: 1,
      nama: 'Sertifikat Kejuaraan',
      penyelenggara: 'Dispora',
      tanggalTerbit: '1/5/2022',
      file: '-',
    },
  ],

  prestasi: [
    {
      id: 1,
      namaEvent: 'Kejuaraan Antar Club',
      tingkat: 'Nasional',
      tanggal: '1/5/2023',
      peringkat: '2',
      keterangan: 'Juara 2 Club',
    },
  ],

  dokumen: [
    {
      id: 1,
      jenis: 'Kartu Tanda Penduduk (KTP)',
      nomor: 'DOK005',
      file: '-',
    },
  ],

  kesehatan: {
    tinggiBadan: '175 cm',
    beratBadan: '65 kg',
    penglihatan: '-',
    pendengaran: '-',
    riwayatPenyakit: '-',
    alergi: '-',
  },
})

const { profil, jenis, loading, error, fetchProfil } = useProfil()
const showParentSections = computed(
  () => (jenis.value || (profil.value as any)?.jenis) === 'atlet'
)

// Avatar helpers
const profilePhotoUrl = computed(() => {
  const url = (profileData.value as any)?.foto as string | null
  if (!url) return null
  const type = getFileType(url)
  return type === 'image' ? url : null
})

const profileInitials = computed(() => {
  const name = profileData.value?.nama || ''
  if (!name) return 'P'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w.charAt(0).toUpperCase())
    .join('')
})

// Modal states
const imageModal = ref({
  isOpen: false,
  url: '',
  title: '',
})

const pdfModal = ref({
  isOpen: false,
  url: '',
  title: '',
})

// Modal functions
const openImageModal = (url: string, title: string) => {
  imageModal.value = {
    isOpen: true,
    url,
    title,
  }
}

const closeImageModal = () => {
  imageModal.value.isOpen = false
}

const openPdfModal = (url: string, title: string) => {
  pdfModal.value = {
    isOpen: true,
    url,
    title,
  }
}

const closePdfModal = () => {
  pdfModal.value.isOpen = false
}

// Utility function to detect file type
const getFileType = (url: string): 'image' | 'pdf' | 'unknown' => {
  if (!url) return 'unknown'

  const extension = url.split('.').pop()?.toLowerCase()
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  const pdfExtensions = ['pdf']

  if (imageExtensions.includes(extension || '')) return 'image'
  if (pdfExtensions.includes(extension || '')) return 'pdf'

  // Check by URL pattern or content-type hints
  if (
    url.includes('/media/') &&
    (url.includes('jpg') || url.includes('png') || url.includes('webp'))
  ) {
    return 'image'
  }
  if (url.includes('.pdf') || url.includes('pdf')) {
    return 'pdf'
  }

  return 'unknown'
}

// Smart file opener - detects file type and opens appropriate modal
const openFileModal = (url: string, title: string) => {
  const fileType = getFileType(url)

  if (fileType === 'image') {
    openImageModal(url, title)
  } else if (fileType === 'pdf') {
    openPdfModal(url, title)
  } else {
    // Default to PDF modal for unknown types
    openPdfModal(url, title)
  }
}

onMounted(async () => {
  try {
    await fetchProfil({ tipe: 'me' })
    if (profil.value) {
      profileData.value = {
        nik: profil.value.nik || '-',
        nama: profil.value.nama || '-',
        jenisKelamin: profil.value.jenisKelamin || '-',
        tempatLahir: profil.value.tempatLahir || '-',
        tanggalLahir: profil.value.tanggalLahir || '-',
        tanggalBergabung: profil.value.tanggalBergabung || '-',
        lamaBergabung: profil.value.lamaBergabung || '-',
        alamat: profil.value.alamat || '-',
        kecamatan: profil.value.kecamatan || '-',
        kelurahan: profil.value.kelurahan || '-',
        noHP: profil.value.noHP || '-',
        email: profil.value.email || '-',
        status: profil.value.status || '-',
        foto: (profil.value as any).foto || null,
        ibu: (profil.value as any).ibu || {
          nama: null,
          tempatLahir: null,
          tanggalLahir: null,
          noHP: null,
          pekerjaan: null,
          alamat: null,
        },
        ayah: (profil.value as any).ayah || {
          nama: null,
          tempatLahir: null,
          tanggalLahir: null,
          noHP: null,
          pekerjaan: null,
          alamat: null,
        },
        wali: (profil.value as any).wali || {
          nama: null,
          tempatLahir: null,
          tanggalLahir: null,
          noHP: null,
          pekerjaan: null,
          alamat: null,
        },
        sertifikat: (profil.value as any).sertifikat || [],
        prestasi: (profil.value as any).prestasi || [],
        dokumen: (profil.value as any).dokumen || [],
        kesehatan: (profil.value as any).kesehatan || {
          tinggiBadan: null,
          beratBadan: null,
          penglihatan: null,
          pendengaran: null,
          riwayatPenyakit: null,
          alergi: null,
        },
      } as any
    }
  } catch {}
})
</script>
