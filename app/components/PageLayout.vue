<template>
  <div class="min-h-screen">
    <!-- Loading state while checking auth -->
    <div
      v-if="isCheckingAuth"
      class="min-h-screen flex items-center justify-center"
    >
      <div class="text-center">
        <div
          class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <div
            class="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
        <p class="text-gray-600">Memeriksa autentikasi...</p>
      </div>
    </div>

    <!-- Main content when authenticated -->
    <div
      v-else
      class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-4"
      style="
        background: linear-gradient(
          180deg,
          rgb(238, 241, 255) 0%,
          rgb(236, 245, 249) 75%,
          rgb(245, 252, 255) 100%
        );
      "
    >
      <!-- Slot untuk konten halaman -->
      <slot />

      <!-- Spacer untuk bottom navigation -->
      <div class="h-20"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

const router = useRouter()
const { isAuthenticated, initAuth } = useAuth()
const isCheckingAuth = ref(true)

onMounted(async () => {
  try {
    // Initialize auth
    initAuth()

    // Check if user is authenticated
    if (!isAuthenticated.value) {
      console.log('User not authenticated, redirecting to login...')
      await router.push('/login')
      return
    }

    console.log('User authenticated, showing page...')
    isCheckingAuth.value = false
  } catch (error) {
    console.error('Auth check failed:', error)
    await router.push('/login')
  }
})
</script>
