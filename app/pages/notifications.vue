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
          <h1 class="text-[24px] font-bold text-gray-700">Notifikasi</h1>
        </div>
      </div>

      <!-- Notification List -->
      <div class="space-y-3">
        <div v-for="notification in notifications" :key="notification.id" 
             class="bg-white/90 rounded-2xl p-4 shadow-sm backdrop-blur border-l-4"
             :class="getNotificationBorderClass(notification.type)">
          <div class="flex items-start gap-3">
            <!-- Icon -->
            <div class="flex-shrink-0 mt-1">
              <div class="w-10 h-10 rounded-full flex items-center justify-center"
                   :class="getNotificationIconClass(notification.type)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                     :class="getNotificationIconColor(notification.type)">
                  <path v-if="notification.type === 'program'" stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  <path v-else-if="notification.type === 'pemeriksaan'" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path v-else-if="notification.type === 'turnamen'" stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-700 text-sm mb-1 line-clamp-2">{{ notification.title }}</h4>
              <p class="text-xs text-gray-600 mb-2 line-clamp-2">{{ notification.message }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">{{ formatTimeAgo(notification.timestamp) }}</span>
                <span v-if="!notification.isRead" class="w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="notifications.length === 0" class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-5 5v-5zM4.5 9.5a5 5 0 0110 0v1.5a2 2 0 002 2h2a2 2 0 002-2V9.5a5 5 0 01-10 0v-1.5a2 2 0 00-2-2h-2a2 2 0 00-2 2v1.5z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-700 mb-2">Tidak ada notifikasi</h3>
        <p class="text-sm text-gray-500">Anda akan melihat notifikasi di sini ketika ada pembaruan</p>
      </div>

      <!-- Spacer for bottom navigation -->
      <div class="h-20"></div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BottomNavigation from '~/components/BottomNavigation.vue'

// Notification data
const notifications = ref([
  {
    id: 1,
    type: 'program',
    title: 'Program Latihan Baru Tersedia',
    message: 'Program latihan "Basket Elite Training" telah ditambahkan untuk bulan Agustus 2025',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 jam yang lalu
    isRead: false
  },
  {
    id: 2,
    type: 'pemeriksaan',
    title: 'Jadwal Pemeriksaan Diperbarui',
    message: 'Pemeriksaan fisik untuk tim basket dijadwalkan ulang pada 20 Agustus 2025',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 jam yang lalu
    isRead: false
  },
  {
    id: 3,
    type: 'turnamen',
    title: 'Pendaftaran Turnamen Dibuka',
    message: 'Pendaftaran untuk "Kejuaraan Basket 3x3 Indonesia Open" telah dibuka',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 jam yang lalu
    isRead: true
  },
  {
    id: 4,
    type: 'program',
    title: 'Evaluasi Program Latihan',
    message: 'Laporan evaluasi program latihan bulan Juli 2025 telah tersedia',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 hari yang lalu
    isRead: true
  },
  {
    id: 5,
    type: 'pemeriksaan',
    title: 'Hasil Pemeriksaan Tersedia',
    message: 'Hasil pemeriksaan fisik untuk Siti Aminah telah tersedia',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 hari yang lalu
    isRead: true
  }
])

// Helper functions
const getNotificationBorderClass = (type: string) => {
  switch (type) {
    case 'program':
      return 'border-l-blue-500'
    case 'pemeriksaan':
      return 'border-l-green-500'
    case 'turnamen':
      return 'border-l-orange-500'
    default:
      return 'border-l-gray-500'
  }
}

const getNotificationIconClass = (type: string) => {
  switch (type) {
    case 'program':
      return 'bg-blue-100'
    case 'pemeriksaan':
      return 'bg-green-100'
    case 'turnamen':
      return 'bg-orange-100'
    default:
      return 'bg-gray-100'
  }
}

const getNotificationIconColor = (type: string) => {
  switch (type) {
    case 'program':
      return 'text-blue-600'
    case 'pemeriksaan':
      return 'text-green-600'
    case 'turnamen':
      return 'text-orange-600'
    default:
      return 'text-gray-600'
  }
}

const formatTimeAgo = (timestamp: Date) => {
  const now = new Date()
  const diffInMs = now.getTime() - timestamp.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) {
    return 'Baru saja'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`
  } else if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`
  } else if (diffInDays < 7) {
    return `${diffInDays} hari yang lalu`
  } else {
    return timestamp.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }
}

onMounted(() => {
  console.log('Notifications page loaded')
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
