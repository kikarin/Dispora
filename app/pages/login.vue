<template>
  <div class="min-h-screen">
    <div
      class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col justify-center px-4 py-8 bg-gradient-to-b from-[#f8faff] to-white"
    >
      <!-- Header -->
      <div>
        <h1
          class="absolute top-16 text-[30px] font-bold leading-tight text-gray-900"
        >
          Dispora
        </h1>
        <p
          class="absolute top-26 mt-1 w-full max-w-xs break-words text-[14px] text-gray-500"
        >
          Silahkan masukkan email dan password Anda untuk melanjutkan
        </p>

        <!-- Email -->
        <div class="mt-20 space-y-2">
          <label for="email" class="block text-[13px] font-medium text-gray-700"
            >Email</label
          >
          <div
            class="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/70 p-3 shadow-sm backdrop-blur"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="you@email.com"
              class="w-full text-[15px] bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <!-- Password -->
        <div class="mt-10 space-y-2">
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-[13px] font-medium text-gray-700"
              >Password</label
            >
            <a href="#" class="text-[13px] text-[#597BF9] font-medium"
              >Forgot?</a
            >
          </div>
          <div
            class="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/70 p-3 shadow-sm backdrop-blur"
          >
            <LockClosedIcon class="h-5 w-5 text-gray-400" />
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full text-[15px] bg-transparent outline-none placeholder:text-gray-400"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg
                v-if="showPassword"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5C3.7 7.11 8 4 12 4c.67 0 1.33.06 1.97.175M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <svg
                v-else
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3l18 18M9.88 9.88a3 3 0 104.24 4.24M10.73 5.08A9.994 9.994 0 0121 12c-1.73 4.39-6 7.5-11 7.5-1.35 0-2.63-.22-3.82-.62"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Remember -->
        <label
          class="mt-4 mb-2 inline-flex items-center gap-2 text-[13px] text-gray-700"
        >
          <input
            type="checkbox"
            checked
            class="h-4 w-4 rounded border-gray-300 text-[#597BF9] focus:ring-[#597BF9]"
          />
          Remember me
        </label>

        <!-- Button -->
        <button
          @click="handleLogin"
          :disabled="isLoading || isDisabledAfterSuccess"
          class="mt-4 w-full rounded-2xl bg-gradient-to-r from-[#597BF9] to-[#4c6ef5] py-3 text-center text-[15px] font-medium text-white shadow-lg shadow-blue-500/30 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading || isDisabledAfterSuccess">
            <div class="flex items-center justify-center gap-2">
              <div
                class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></div>
              Loading...
            </div>
          </span>
          <span v-else>Log in</span>
        </button>
      </div>
      <div class="relative mt-4 min-h-[60px]">
        <!-- Error Message (Improved) -->
        <Transition
          enter-active-class="duration-200 ease-out"
          enter-from-class="transform opacity-0 scale-95 -translate-y-2"
          enter-to-class="transform opacity-100 scale-100 translate-y-0"
          leave-active-class="duration-150 ease-in"
          leave-from-class="transform opacity-100 scale-100 translate-y-0"
          leave-to-class="transform opacity-0 scale-95 -translate-y-2"
        >
          <div v-if="errorMessage" class="mt-4">
            <div
              class="relative p-4 bg-red-50 border border-red-200 rounded-2xl shadow-sm"
            >
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                  <svg
                    class="w-5 h-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-red-800">
                    Oops! Ada yang salah
                  </p>
                  <p class="mt-1 text-sm text-red-600">
                    {{ errorMessage }}
                  </p>
                </div>
                <button
                  @click="errorMessage = ''"
                  class="flex-shrink-0 ml-auto pl-3 pr-1 py-1 text-red-400 hover:text-red-600 transition-colors"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Transition>
        <!-- Success Message (Improved) -->
        <Transition
          enter-active-class="duration-200 ease-out"
          enter-from-class="transform opacity-0 scale-95 -translate-y-2"
          enter-to-class="transform opacity-100 scale-100 translate-y-0"
          leave-active-class="duration-150 ease-in"
          leave-from-class="transform opacity-100 scale-100 translate-y-0"
          leave-to-class="transform opacity-0 scale-95 -translate-y-2"
        >
          <div v-if="successMessage" class="mt-4">
            <div
              class="relative p-4 bg-green-50 border border-green-200 rounded-2xl shadow-sm"
            >
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                  <svg
                    class="w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-green-800">Berhasil!</p>
                  <p class="mt-1 text-sm text-green-600">
                    {{ successMessage }}
                  </p>
                </div>
                <button
                  @click="successMessage = ''"
                  class="flex-shrink-0 ml-auto pl-3 pr-1 py-1 text-green-400 hover:text-green-600 transition-colors"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Bottom section -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[450px]">
        <div class="relative h-42 w-full overflow-hidden">
          <svg
            class="absolute inset-0 h-full w-full"
            viewBox="0 0 400 150"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <!-- Gradient Fade -->
              <linearGradient id="fadeY" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="white" stop-opacity="1" />
                <stop offset="100%" stop-color="white" stop-opacity="0" />
              </linearGradient>
              <mask id="softFade">
                <rect width="100%" height="100%" fill="url(#fadeY)" />
              </mask>
            </defs>

            <!-- Group dengan transform biar miring -->
            <g mask="url(#softFade)" fill="#597BF9" transform="skewX(-20)">
              <rect
                v-for="(cube, i) in cubes"
                :key="i"
                :x="cube.x"
                :y="cube.y"
                :width="cube.size"
                :height="cube.size"
                rx="2"
                ry="10"
                :opacity="cube.opacity"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { LockClosedIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const { login, isLoading } = useAuth()
const isDisabledAfterSuccess = ref(false)

interface Cube {
  x: number
  y: number
  size: number
  opacity: number
}

const cubes = ref<Cube[]>([])

// generate grid halftone cubes
const cols = 24
const rows = 12
const baseSize = 8

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const size = Math.max(2, baseSize - row * 0.4) // makin ke atas makin kecil
    const opacity = 0.12 + row * 0.015 // makin ke bawah makin pekat
    cubes.value.push({
      x: col * 18,
      y: row * 12,
      size,
      opacity,
    })
  }
}

const showPassword = ref(false)
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

// Handle login dengan API
const handleLogin = async () => {
  try {
    // Reset messages
    errorMessage.value = ''
    successMessage.value = ''

    // Validasi input
    if (!email.value || !password.value) {
      errorMessage.value = 'Email dan password harus diisi!'
      return
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      errorMessage.value = 'Format email tidak valid!'
      return
    }

    // Call login API
    const result = await login({
      email: email.value,
      password: password.value,
    })

    if (result.success) {
      successMessage.value = result.message || 'Login berhasil!'
      isDisabledAfterSuccess.value = true

      setTimeout(() => {
        router.push('/home')
      }, 1000)
    }
  } catch (error: any) {
    console.error('Login error:', error)

    // Handle specific error types dengan pesan yang user-friendly
    if (error.data?.message) {
      // Handle validation errors dari backend
      if (error.data.errors) {
        const errorMessages = Object.values(error.data.errors).flat()
        errorMessage.value = errorMessages.join(', ')
      } else {
        errorMessage.value = error.data.message
      }
    } else if (error.message?.includes('CSRF')) {
      errorMessage.value = 'Masalah keamanan. Silakan coba lagi.'
    } else if (error.message?.includes('network')) {
      errorMessage.value =
        'Masalah koneksi jaringan. Periksa koneksi internet Anda.'
    } else if (error.message?.includes('422')) {
      errorMessage.value =
        'Data yang dimasukkan tidak valid. Periksa email dan password Anda.'
    } else {
      errorMessage.value = 'Email atau password salah. Silakan coba lagi.'
    }
  }
}
</script>
