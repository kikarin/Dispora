<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

const router = useRouter()
const { isAuthenticated, initAuth } = useAuth()

onMounted(async () => {
  // Initialize auth
  initAuth()

  // Check authentication status
  if (isAuthenticated.value) {
    // User is authenticated, redirect to home
    await router.push('/home')
  } else {
    // User is not authenticated, redirect to login
    await router.push('/login')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
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
</template>
