<template>
  <PageLayout>
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-4">
        <button
          @click="$router.back()"
          class="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white transition-colors"
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
        <h1 class="text-[24px] font-bold text-gray-700">Pengaturan</h1>
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-6">
      <!-- Profile Info Section -->
      <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Informasi Akun</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2"
              >Nama Lengkap</label
            >
            <input
              type="text"
              :value="profileData.name"
              disabled
              class="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-700 cursor-not-allowed"
            />
            <p class="text-xs text-gray-500 mt-1">Nama tidak dapat diubah</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2"
              >Email</label
            >
            <input
              v-model="profileData.email"
              type="email"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#597BF9] focus:border-transparent transition-all"
              placeholder="Masukkan email baru"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2"
              >Nomor HP</label
            >
            <input
              v-model="profileData.no_hp"
              type="tel"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#597BF9] focus:border-transparent transition-all"
              placeholder="Masukkan nomor HP"
            />
          </div>

          <button
            @click="handleUpdateProfile"
            :disabled="settingsLoading"
            class="w-full bg-[#597BF9] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#4c6ef5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="settingsLoading">Loading...</span>
            <span v-else>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      <!-- Password Section -->
      <div class="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Ubah Password</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2"
              >Password Lama</label
            >
            <div class="relative">
              <input
                v-model="passwordData.old_password"
                :type="showOldPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#597BF9] focus:border-transparent transition-all"
                placeholder="Masukkan password lama"
              />
              <button
                @click="showOldPassword = !showOldPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  v-if="showOldPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2"
              >Password Baru</label
            >
            <div class="relative">
              <input
                v-model="passwordData.new_password"
                :type="showNewPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#597BF9] focus:border-transparent transition-all"
                placeholder="Masukkan password baru"
              />
              <button
                @click="showNewPassword = !showNewPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  v-if="showNewPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2"
              >Konfirmasi Password Baru</label
            >
            <div class="relative">
              <input
                v-model="passwordData.confirm_password"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#597BF9] focus:border-transparent transition-all"
                placeholder="Konfirmasi password baru"
              />
              <button
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  v-if="showConfirmPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            @click="handleChangePassword"
            :disabled="settingsLoading"
            class="w-full bg-[#597BF9] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#4c6ef5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="settingsLoading">Loading...</span>
            <span v-else>Ubah Password</span>
          </button>
        </div>
      </div>

      <!-- Danger Zone Section -->
      <div class="bg-red-50 rounded-2xl p-6 border border-red-200">
        <h2 class="text-lg font-bold text-red-800 mb-4">Zona Berbahaya</h2>
        <p class="text-sm text-red-600 mb-4">
          Tindakan ini tidak dapat dibatalkan. Semua data akun Anda akan dihapus
          secara permanen.
        </p>

        <!-- Password field untuk delete account -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-red-700 mb-2"
            >Password Konfirmasi</label
          >
          <div class="relative">
            <input
              v-model="passwordData.old_password"
              :type="showOldPassword ? 'text' : 'password'"
              class="w-full px-4 py-3 pr-12 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="Masukkan password untuk konfirmasi"
            />
            <button
              @click="showOldPassword = !showOldPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600 transition-colors"
            >
              <svg
                v-if="showOldPassword"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
              <svg
                v-else
                class="h5 w-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          @click="handleDeleteAccountConfirm"
          :disabled="settingsLoading"
          class="w-full bg-red-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Hapus Akun
        </button>
      </div>
    </div>

    <!-- Spacer for bottom navigation -->
    <div class="h-20"></div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div
        class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300"
      >
        <div class="text-center">
          <div
            class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">
            {{ successMessage.title }}
          </h3>
          <p class="text-sm text-gray-600 mb-6">{{ successMessage.message }}</p>
          <button
            @click="closeSuccessModal"
            class="w-full bg-green-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>

    <!-- Error Modal -->
    <div
      v-if="showErrorModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div
        class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300"
      >
        <div class="text-center">
          <div
            class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Oops!</h3>
          <p class="text-sm text-gray-600 mb-6">{{ errorMessage }}</p>
          <button
            @click="showErrorModal = false"
            class="w-full bg-red-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Account Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div
        class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300"
      >
        <div class="text-center">
          <div
            class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Hapus Akun?</h3>
          <p class="text-sm text-gray-600 mb-6">
            Tindakan ini tidak dapat dibatalkan. Semua data akun Anda akan
            dihapus secara permanen.
          </p>
          <div class="flex gap-3">
            <button
              @click="showDeleteConfirm = false"
              class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              @click="handleDeleteAccount"
              :disabled="settingsLoading"
              class="flex-1 bg-red-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="settingsLoading">Loading...</span>
              <span v-else>Hapus</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="settingsLoading"
      class="fixed inset-0 z-40 flex items-center justify-center bg-black/30"
    >
      <div class="bg-white rounded-2xl p-6 shadow-xl">
        <div class="flex items-center gap-3">
          <div
            class="w-6 h-6 border-2 border-[#597BF9] border-t-transparent rounded-full animate-spin"
          ></div>
          <span class="text-gray-700 font-medium">Memproses...</span>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../../composables/useAuth'
import PageLayout from '~/components/PageLayout.vue'

const router = useRouter()
const { user, getAuthHeaders, initAuth } = useAuth()

// Profile Data
const profileData = ref({
  name: '',
  email: '',
  no_hp: '',
})

// Load user data on mount
onMounted(async () => {
  // Initialize auth from localStorage
  initAuth()

  try {
    // Load user data from useAuth
    if (user.value) {
      profileData.value = {
        name: user.value.name || '',
        email: user.value.email || '',
        no_hp: user.value.no_hp || '',
      }
    }
  } catch (error) {
    console.error('Failed to load user data:', error)
  }
})

// Password Data
const passwordData = ref({
  old_password: '',
  new_password: '',
  confirm_password: '',
})

// Show/Hide Password
const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Modal States
const showDeleteConfirm = ref(false)
const showSuccessModal = ref(false)
const showErrorModal = ref(false)

// Modal Messages
const successMessage = ref({ title: '', message: '' })
const errorMessage = ref('')

// Loading state
const settingsLoading = ref(false)

// Helper Functions
const showSuccess = (title: string, message: string) => {
  successMessage.value = { title, message }
  showSuccessModal.value = true
}

const showError = (message: string) => {
  errorMessage.value = message
  showErrorModal.value = true
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  successMessage.value = { title: '', message: '' }
}

// Handle Update Profile
const handleUpdateProfile = async () => {
  if (!profileData.value.name || !profileData.value.email) {
    showError('Nama dan Email tidak boleh kosong!')
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(profileData.value.email)) {
    showError('Format email tidak valid!')
    return
  }

  try {
    settingsLoading.value = true

    // Call API to update profile
    const response = await $fetch<{
      status: string
      message: string
      data?: { user: any }
    }>('/settings/profile', {
      baseURL: 'http://localhost:8000/api',
      method: 'PUT',
      headers: getAuthHeaders(),
      body: {
        name: profileData.value.name,
        email: profileData.value.email,
        no_hp: profileData.value.no_hp,
      },
    })

    if (response.status === 'success') {
      showSuccess('Berhasil!', 'Informasi akun berhasil diperbarui!')

      // Update local user data
      if (user.value) {
        user.value.name = profileData.value.name
        user.value.email = profileData.value.email
        user.value.no_hp = profileData.value.no_hp
      }
    } else {
      showError(response.message || 'Gagal memperbarui profile')
    }
  } catch (error: any) {
    console.error('Update profile error:', error)
    showError(error.data?.message || error.message || 'Terjadi kesalahan')
  } finally {
    settingsLoading.value = false
  }
}

// Handle Change Password
const handleChangePassword = async () => {
  if (
    !passwordData.value.old_password ||
    !passwordData.value.new_password ||
    !passwordData.value.confirm_password
  ) {
    showError('Semua field password harus diisi!')
    return
  }

  if (passwordData.value.new_password !== passwordData.value.confirm_password) {
    showError('Password baru dan konfirmasi password tidak cocok!')
    return
  }

  if (passwordData.value.new_password.length < 8) {
    showError('Password baru minimal 8 karakter!')
    return
  }

  if (passwordData.value.old_password === passwordData.value.new_password) {
    showError('Password baru harus berbeda dengan password lama!')
    return
  }

  try {
    settingsLoading.value = true

    // Call API to change password
    const response = await $fetch<{
      status: string
      message: string
    }>('/settings/password', {
      baseURL: 'http://localhost:8000/api',
      method: 'PUT',
      headers: getAuthHeaders(),
      body: {
        old_password: passwordData.value.old_password,
        new_password: passwordData.value.new_password,
        confirm_password: passwordData.value.confirm_password,
      },
    })

    if (response.status === 'success') {
      showSuccess('Password Diubah!', 'Password Anda berhasil diperbarui!')

      // Reset form
      passwordData.value = {
        old_password: '',
        new_password: '',
        confirm_password: '',
      }
    } else {
      showError(response.message || 'Gagal mengubah password')
    }
  } catch (error: any) {
    console.error('Change password error:', error)
    showError(error.data?.message || error.message || 'Terjadi kesalahan')
  } finally {
    settingsLoading.value = false
  }
}

// Handle Delete Account
const handleDeleteAccount = async () => {
  if (!passwordData.value.old_password) {
    showError('Password harus diisi untuk menghapus akun!')
    return
  }

  try {
    settingsLoading.value = true

    // Call API to delete account
    const response = await $fetch<{
      status: string
      message: string
    }>('/settings/account', {
      baseURL: 'http://localhost:8000/api',
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: {
        password: passwordData.value.old_password,
      },
    })

    if (response.status === 'success') {
      showSuccess(
        'Akun Dihapus!',
        'Akun Anda berhasil dihapus. Anda akan diarahkan ke halaman login.'
      )

      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      showError(response.message || 'Gagal menghapus akun')
    }
  } catch (error: any) {
    console.error('Delete account error:', error)
    showError(error.data?.message || error.message || 'Terjadi kesalahan')
  } finally {
    settingsLoading.value = false
  }
}

// Handle Delete Account Confirmation
const handleDeleteAccountConfirm = () => {
  // Validasi password sebelum show confirm modal
  if (!passwordData.value.old_password) {
    showError('Password harus diisi untuk menghapus akun!')
    return
  }

  // Jika password sudah diisi, baru show confirm modal
  showDeleteConfirm.value = true
}
</script>
