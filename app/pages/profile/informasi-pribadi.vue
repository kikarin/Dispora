<template>
  <div class="min-h-screen">
    <div class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-8" style="background: linear-gradient(180deg,rgba(216, 224, 255, 1) 0%, rgba(248, 250, 251, 1) 50%, rgba(226, 224, 255, 1) 100%);">
      
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-4">
          <button @click="$router.back()" class="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-[24px] font-bold text-gray-700">Informasi Pribadi</h1>
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <!-- Information Section -->
        <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Information</h2>
          <div class="space-y-3">
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">NIK</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.nik }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Nama</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.nama }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Jenis Kelamin</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.jenisKelamin }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Tempat Lahir</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.tempatLahir || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Tanggal Lahir</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.tanggalLahir }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Tanggal Bergabung</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.tanggalBergabung }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Lama Bergabung</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.lamaBergabung }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Alamat</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.alamat || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Kecamatan</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.kecamatan || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Kelurahan</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.kelurahan || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">No HP</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.noHP || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Email</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.email || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Status</span>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {{ profileData.status }}
              </span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Foto</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.foto || 'Tidak ada foto' }}</span>
            </div>
          </div>
        </div>

        <!-- Data Ibu Kandung Section -->
        <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Data Ibu Kandung</h2>
          <div class="space-y-3">
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Nama Ibu Kandung</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.ibu.nama || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Tempat Lahir Ibu</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.ibu.tempatLahir || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Tanggal Lahir Ibu</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.ibu.tanggalLahir || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">No. HP Ibu</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.ibu.noHP || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Pekerjaan Ibu</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.ibu.pekerjaan || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Alamat Ibu</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.ibu.alamat || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- Data Ayah Kandung Section -->
        <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Data Ayah Kandung</h2>
          <div class="space-y-3">
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Nama Ayah Kandung</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.ayah.nama || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Tempat Lahir Ayah</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.ayah.tempatLahir || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Tanggal Lahir Ayah</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.ayah.tanggalLahir || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">No. HP Ayah</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.ayah.noHP || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Pekerjaan Ayah</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.ayah.pekerjaan || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Alamat Ayah</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.ayah.alamat || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- Data Wali Section -->
        <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Data Wali</h2>
          <div class="space-y-3">
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Nama Wali</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.wali.nama || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Tempat Lahir Wali</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.wali.tempatLahir || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Tanggal Lahir Wali</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.wali.tanggalLahir || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">No. HP Wali</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.wali.noHP || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Pekerjaan Wali</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.wali.pekerjaan || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Alamat Wali</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.wali.alamat || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- Sertifikat Section - Card Layout for Mobile -->
        <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Informasi Semua Sertifikat</h2>
          <div class="space-y-4">
            <div v-for="(sertifikat, index) in profileData.sertifikat" :key="sertifikat.id" 
                 class="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-bold text-blue-600">{{ index + 1 }}</span>
                </div>
                <h3 class="font-semibold text-gray-800 text-sm">{{ sertifikat.nama }}</h3>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between items-start">
                  <span class="text-xs text-gray-500">Penyelenggara</span>
                  <span class="text-sm text-gray-800 font-medium">{{ sertifikat.penyelenggara }}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-xs text-gray-500">Tanggal Terbit</span>
                  <span class="text-sm text-gray-800">{{ sertifikat.tanggalTerbit }}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-xs text-gray-500">File</span>
                  <span class="text-sm text-gray-800">{{ sertifikat.file || '-' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Prestasi Section - Card Layout for Mobile -->
        <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Informasi Semua Prestasi</h2>
          <div class="space-y-4">
            <div v-for="(prestasi, index) in profileData.prestasi" :key="prestasi.id" 
                 class="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-bold text-yellow-600">{{ index + 1 }}</span>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-800 text-sm">{{ prestasi.namaEvent }}</h3>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">{{ prestasi.tingkat }}</span>
                    <span class="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-semibold">
                      Peringkat {{ prestasi.peringkat }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between items-start">
                  <span class="text-xs text-gray-500">Tanggal</span>
                  <span class="text-sm text-gray-800">{{ prestasi.tanggal }}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-xs text-gray-500">Keterangan</span>
                  <span class="text-sm text-gray-800 text-right">{{ prestasi.keterangan }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dokumen Section - Card Layout for Mobile -->
        <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Informasi Semua Dokumen</h2>
          <div class="space-y-4">
            <div v-for="(dokumen, index) in profileData.dokumen" :key="dokumen.id" 
                 class="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-sm font-bold text-green-600">{{ index + 1 }}</span>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-800 text-sm mb-2">{{ dokumen.jenis }}</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between items-start">
                      <span class="text-xs text-gray-500">Nomor Dokumen</span>
                      <span class="text-sm text-gray-800 font-medium">{{ dokumen.nomor }}</span>
                    </div>
                    <div class="flex justify-between items-start">
                      <span class="text-xs text-gray-500">File</span>
                      <span class="text-sm text-gray-800">{{ dokumen.file || '-' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Kesehatan Section -->
        <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Data Kesehatan Atlet</h2>
          <div class="space-y-3">
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Tinggi Badan (cm)</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.kesehatan.tinggiBadan || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Berat Badan (kg)</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.kesehatan.beratBadan || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Penglihatan</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.kesehatan.penglihatan || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Pendengaran</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.kesehatan.pendengaran || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Riwayat Penyakit</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.kesehatan.riwayatPenyakit || '-' }}</span>
            </div>
            <div class="flex justify-between items-start">
              <span class="text-sm font-medium text-gray-600">Alergi</span>
              <span class="text-sm text-gray-800 text-right">{{ profileData.kesehatan.alergi || '-' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Spacer for bottom navigation -->
      <div class="h-20"></div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BottomNavigation from '~/components/BottomNavigation.vue'

// Profile Data
const profileData = ref({
  nik: "1234567890123460",
  nama: "Rizky Pratama",
  jenisKelamin: "Laki-laki",
  tempatLahir: "Yogyakarta",
  tanggalLahir: "5/5/2004",
  tanggalBergabung: "5/5/2024",
  lamaBergabung: "1 tahun 3 bulan",
  alamat: "Jl. Anggrek 5",
  kecamatan: "-",
  kelurahan: "-",
  noHP: "081234567894",
  email: "rizky@example.com",
  status: "Aktif",
  foto: "Tidak ada foto",
  
  ibu: {
    nama: "Yuni Astuti",
    tempatLahir: "-",
    tanggalLahir: "-",
    noHP: "-",
    pekerjaan: "-",
    alamat: "-"
  },
  
  ayah: {
    nama: "Dedi Mulyadi",
    tempatLahir: "-",
    tanggalLahir: "-",
    noHP: "-",
    pekerjaan: "-",
    alamat: "-"
  },
  
  wali: {
    nama: "-",
    tempatLahir: "-",
    tanggalLahir: "-",
    noHP: "-",
    pekerjaan: "-",
    alamat: "-"
  },
  
  sertifikat: [
    {
      id: 1,
      nama: "Sertifikat Kejuaraan",
      penyelenggara: "Dispora",
      tanggalTerbit: "1/5/2022",
      file: "-"
    }
  ],
  
  prestasi: [
    {
      id: 1,
      namaEvent: "Kejuaraan Antar Club",
      tingkat: "Nasional",
      tanggal: "1/5/2023",
      peringkat: "2",
      keterangan: "Juara 2 Club"
    }
  ],
  
  dokumen: [
    {
      id: 1,
      jenis: "Kartu Tanda Penduduk (KTP)",
      nomor: "DOK005",
      file: "-"
    }
  ],
  
  kesehatan: {
    tinggiBadan: "175 cm",
    beratBadan: "65 kg",
    penglihatan: "-",
    pendengaran: "-",
    riwayatPenyakit: "-",
    alergi: "-"
  }
})
</script>