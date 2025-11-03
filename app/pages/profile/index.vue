<template>
  <PageLayout>
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-4">
        <h1 class="text-[24px] font-bold text-gray-700">Profile</h1>
      </div>

      <!-- User Info Card -->
      <div v-if="user" class="bg-white/90 rounded-2xl backdrop-blur p-4 mb-4">
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg"
            :class="{ 'cursor-pointer': !!profilePhotoUrl }"
            @click="profilePhotoUrl && openImageModal(profilePhotoUrl, user?.name || 'Foto Profil')"
          >
            <img
              v-if="profilePhotoUrl"
              :src="profilePhotoUrl"
              alt="Foto Profil"
              class="w-full h-full object-cover"
            />
            <span v-else>{{ userInitials }}</span>
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-gray-800">{{ user.name }}</h3>
            <p class="text-sm text-gray-600">{{ user.email }}</p>
            <p
              v-if="user.current_role"
              class="text-xs text-blue-600 font-medium"
            >
              {{ user.current_role.name }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Menu List -->
    <div class="space-y-2">
      <!-- Informasi Pribadi -->
      <div class="bg-white/90 rounded-2xl backdrop-blur">
        <button
          @click="navigateTo('/profile/informasi-pribadi')"
          class="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors rounded-2xl"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span class="text-gray-700 font-medium">Informasi Pribadi</span>
          </div>
          <svg
            class="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Pengaturan -->
      <div class="bg-white/90 rounded-2xl backdrop-blur">
        <button
          @click="navigateTo('/profile/pengaturan')"
          class="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors rounded-2xl"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-indigo-600"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span class="text-gray-700 font-medium">Pengaturan</span>
          </div>
          <svg
            class="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Keluar -->
      <div class="bg-white/90 rounded-2xl backdrop-blur">
        <button
          @click="showLogoutConfirm = true"
          :disabled="isLoggingOut"
          class="w-full flex items-center justify-between p-4 text-left hover:bg-red-50 transition-colors rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <span class="text-red-600 font-medium">
              <span v-if="isLoggingOut">Logging out...</span>
              <span v-else>Keluar</span>
            </span>
          </div>
          <div v-if="isLoggingOut" class="w-5 h-5">
            <div
              class="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin"
            ></div>
          </div>
          <svg
            v-else
            class="w-5 h-5 text-red-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Spacer for bottom navigation -->
    <div class="h-20"></div>

    <!-- Logout Confirmation Modal -->
    <div
      v-if="showLogoutConfirm"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div
        class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300"
      >
        <div class="text-center">
          <div
            class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">
            Keluar dari Aplikasi?
          </h3>
          <p class="text-sm text-gray-600 mb-6">
            Apakah Anda yakin ingin keluar? Anda akan diarahkan ke halaman
            login.
          </p>
          <div class="flex gap-3">
            <button
              @click="showLogoutConfirm = false"
              class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              @click="confirmLogout"
              :disabled="isLoggingOut"
              class="flex-1 bg-red-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoggingOut">Loading...</span>
              <span v-else>Ya, Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Image Modal -->
    <ImageModal
      :is-open="imageModal.isOpen"
      :image-url="imageModal.url"
      :title="imageModal.title"
      @close="closeImageModal"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { useAuth } from '../../../composables/useAuth'
import { useProfil } from '../../../composables/useProfil'
import ImageModal from '~/components/ImageModal.vue'

const router = useRouter()
const { user, logout, isAuthenticated, initAuth } = useAuth()
const { profil, fetchProfil } = useProfil()

const isLoggingOut = ref(false)
const showLogoutConfirm = ref(false)

// Computed property untuk inisial user
const userInitials = computed(() => {
  if (!user.value?.name) return '?'
  return user.value.name
    .split(' ')
    .map((word: string) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

// Check authentication on mount
onMounted(() => {
  console.log('Profile page mounted, checking auth...')

  // Initialize auth from localStorage
  initAuth()

  // Fetch profil untuk foto
  fetchProfil({ tipe: 'me' }).catch(() => {})

  console.log('Current auth state:', {
    user: user.value?.name || 'No user',
    isAuthenticated: isAuthenticated.value,
    hasUser: !!user.value,
  })

  if (!isAuthenticated.value) {
    console.log('Not authenticated, redirecting to login...')
    router.push('/login')
  } else {
    console.log('Authenticated, showing profile...')
  }
})

const navigateTo = (path: string) => {
  router.push(path)
}

const handleLogout = async () => {
  try {
    isLoggingOut.value = true

    // Call logout from useAuth
    await logout()

    // Redirect ke login
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
    // Force redirect ke login jika logout gagal
    router.push('/login')
  } finally {
    isLoggingOut.value = false
  }
}

const confirmLogout = async () => {
  try {
    isLoggingOut.value = true
    await handleLogout()
    showLogoutConfirm.value = false
  } catch (error) {
    console.error('Confirm logout error:', error)
    showLogoutConfirm.value = false
  } finally {
    isLoggingOut.value = false
  }
}

// Foto profil URL
const profilePhotoUrl = computed(() => {
  const url = (profil.value as any)?.foto as string | null
  if (!url) return null
  // Sederhana: pakai langsung, diasumsikan URL image valid dari API
  return url
})

// Modal image
const imageModal = ref({ isOpen: false, url: '', title: '' })
const openImageModal = (url: string, title: string) => {
  imageModal.value = { isOpen: true, url, title }
}
const closeImageModal = () => {
  imageModal.value.isOpen = false
}
</script>
