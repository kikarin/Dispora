<template>
  <PageLayout>
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
        <h1 class="text-[24px] font-bold text-gray-700">
          Informasi Pribadi Peserta
        </h1>
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

    <div v-else-if="profileData" class="space-y-6">
      <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Information</h2>
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">NIK</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.nik || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Nama</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.nama || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Jenis Kelamin</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.jenisKelamin || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Tempat Lahir</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.tempatLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Tanggal Lahir</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.tanggalLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tanggal Bergabung</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.tanggalBergabung || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Lama Bergabung</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.lamaBergabung || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Alamat</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.alamat || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Kecamatan</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.kecamatan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Kelurahan</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.kelurahan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">No HP</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.noHP || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Email</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.email || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Status</span
            ><span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >{{ profileData.status || '-' }}</span
            >
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Foto</span>
            <div v-if="profileData.foto" class="flex items-center gap-2">
              <button
                @click="openImageModal(profileData.foto, 'Foto Profil')"
                class="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Lihat
              </button>
            </div>
            <span v-else class="text-sm text-gray-800 text-right"
              >Tidak ada foto</span
            >
          </div>
        </div>
      </div>

      <div
        class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur"
        v-if="
          profileData.ibu &&
          (profileData.ibu.nama ||
            profileData.ibu.tempatLahir ||
            profileData.ibu.tanggalLahir ||
            profileData.ibu.noHP ||
            profileData.ibu.pekerjaan ||
            profileData.ibu.alamat)
        "
      >
        <h2 class="text-lg font-bold text-gray-800 mb-4">Data Ibu Kandung</h2>
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Nama Ibu Kandung</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.ibu?.nama || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tempat Lahir Ibu</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.ibu?.tempatLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tanggal Lahir Ibu</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.ibu?.tanggalLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">No. HP Ibu</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.ibu?.noHP || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Pekerjaan Ibu</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.ibu?.pekerjaan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Alamat Ibu</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.ibu?.alamat || '-'
            }}</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur"
        v-if="
          profileData.ayah &&
          (profileData.ayah.nama ||
            profileData.ayah.tempatLahir ||
            profileData.ayah.tanggalLahir ||
            profileData.ayah.noHP ||
            profileData.ayah.pekerjaan ||
            profileData.ayah.alamat)
        "
      >
        <h2 class="text-lg font-bold text-gray-800 mb-4">Data Ayah Kandung</h2>
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Nama Ayah Kandung</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.ayah?.nama || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tempat Lahir Ayah</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.ayah?.tempatLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tanggal Lahir Ayah</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.ayah?.tanggalLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">No. HP Ayah</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.ayah?.noHP || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Pekerjaan Ayah</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.ayah?.pekerjaan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Alamat Ayah</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.ayah?.alamat || '-'
            }}</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur"
        v-if="
          profileData.wali &&
          (profileData.wali.nama ||
            profileData.wali.tempatLahir ||
            profileData.wali.tanggalLahir ||
            profileData.wali.noHP ||
            profileData.wali.pekerjaan ||
            profileData.wali.alamat)
        "
      >
        <h2 class="text-lg font-bold text-gray-800 mb-4">Data Wali</h2>
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Nama Wali</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.wali?.nama || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tempat Lahir Wali</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.wali?.tempatLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tanggal Lahir Wali</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.wali?.tanggalLahir || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">No. HP Wali</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.wali?.noHP || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Pekerjaan Wali</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.wali?.pekerjaan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Alamat Wali</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.wali?.alamat || '-'
            }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
        <h2 class="text-lg font-bold text-gray-800 mb-4">
          Informasi Semua Sertifikat
        </h2>
        <div class="space-y-4">
          <div
            v-for="(sertifikat, index) in profileData.sertifikat || []"
            :key="sertifikat.id"
            class="p-4 bg-gray-50 rounded-xl border border-gray-200"
          >
            <div class="flex items-center gap-2 mb-3">
              <div
                class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <span class="text-sm font-bold text-blue-600">{{
                  index + 1
                }}</span>
              </div>
              <h3 class="font-semibold text-gray-800 text-sm">
                {{ sertifikat.nama }}
              </h3>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500">Penyelenggara</span
                ><span class="text-sm text-gray-800 font-medium">{{
                  sertifikat.penyelenggara
                }}</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500">Tanggal Terbit</span
                ><span class="text-sm text-gray-800">{{
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

      <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
        <h2 class="text-lg font-bold text-gray-800 mb-4">
          Informasi Semua Prestasi
        </h2>
        <div class="space-y-4">
          <div
            v-for="(prestasi, index) in profileData.prestasi || []"
            :key="prestasi.id"
            class="p-4 bg-gray-50 rounded-xl border border-gray-200"
          >
            <div class="flex items-center gap-2 mb-3">
              <div
                class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"
              >
                <span class="text-sm font-bold text-yellow-600">{{
                  index + 1
                }}</span>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800 text-sm">
                  {{ prestasi.namaEvent }}
                </h3>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500">Tingkat</span
                ><span class="text-sm text-gray-800">{{
                  prestasi.tingkat
                }}</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500">Peringkat</span
                ><span class="text-sm text-gray-800">{{
                  prestasi.peringkat
                }}</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500">Tanggal</span
                ><span class="text-sm text-gray-800">{{
                  prestasi.tanggal
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
        <h2 class="text-lg font-bold text-gray-800 mb-4">
          Informasi Semua Dokumen
        </h2>
        <div class="space-y-4">
          <div
            v-for="(dokumen, index) in profileData.dokumen || []"
            :key="dokumen.id"
            class="p-4 bg-gray-50 rounded-xl border border-gray-200"
          >
            <div class="flex items-start gap-3">
              <div
                class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              >
                <span class="text-sm font-bold text-green-600">{{
                  index + 1
                }}</span>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800 text-sm mb-2">
                  {{ dokumen.jenis }}
                </h3>
                <div class="space-y-2">
                  <div class="flex justify-between items-start">
                    <span class="text-xs text-gray-500">Nomor Dokumen</span
                    ><span class="text-sm text-gray-800 font-medium">{{
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

      <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Data Kesehatan</h2>
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Tinggi Badan (cm)</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.kesehatan?.tinggiBadan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Berat Badan (kg)</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.kesehatan?.beratBadan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Penglihatan</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.kesehatan?.penglihatan || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Pendengaran</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.kesehatan?.pendengaran || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600"
              >Riwayat Penyakit</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.kesehatan?.riwayatPenyakit || '-'
            }}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-600">Alergi</span
            ><span class="text-sm text-gray-800 text-right">{{
              profileData.kesehatan?.alergi || '-'
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="h-20"></div>

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
import { useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import ImageModal from '~/components/ImageModal.vue'
import PdfModal from '~/components/PdfModal.vue'
import { useParticipantProfile } from '../../../../../../composables/useParticipantProfile'

const route = useRoute()
const pemeriksaanId = computed(() => parseInt(route.params.id as string))
const pesertaId = computed(() => parseInt(route.params.pesertaId as string))
const pesertaType = computed(
  () => (route.query.peserta_type as string) || 'atlet'
)

const { profile, loading, error, fetchProfile } = useParticipantProfile()
const profileData = computed(() => profile.value)

// Modals & file opener
const imageModal = ref({ isOpen: false, url: '', title: '' })
const pdfModal = ref({ isOpen: false, url: '', title: '' })
const openImageModal = (url: string, title: string) => {
  imageModal.value = { isOpen: true, url, title }
}
const closeImageModal = () => {
  imageModal.value.isOpen = false
}
const openPdfModal = (url: string, title: string) => {
  pdfModal.value = { isOpen: true, url, title }
}
const closePdfModal = () => {
  pdfModal.value.isOpen = false
}
const getFileType = (url: string): 'image' | 'pdf' | 'unknown' => {
  if (!url) return 'unknown'
  const ext = url.split('.').pop()?.toLowerCase()
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || ''))
    return 'image'
  if (ext === 'pdf' || url.includes('.pdf')) return 'pdf'
  return 'unknown'
}
const openFileModal = (url: string, title: string) => {
  const t = getFileType(url)
  if (t === 'image') return openImageModal(url, title)
  return openPdfModal(url, title)
}

onMounted(async () => {
  await fetchProfile({
    context: 'pemeriksaan',
    pemeriksaanId: pemeriksaanId.value,
    jenis: pesertaType.value as any,
    pesertaId: pesertaId.value,
  })
})
</script>
