<template>
  <div class="min-h-screen">
    <div
      class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-8"
      style="
        background: linear-gradient(
          180deg,
          rgba(216, 224, 255, 1) 0%,
          rgba(248, 250, 251, 1) 50%,
          rgba(226, 224, 255, 1) 100%
        );
      "
    >
      <!-- Error Content -->
      <div class="flex flex-col items-center justify-center h-full text-center">
        <div class="mb-8">
          <div
            class="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center"
          >
            <svg
              class="w-12 h-12 text-red-500"
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

          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            {{
              error.statusCode === 404
                ? 'Halaman Tidak Ditemukan'
                : 'Terjadi Kesalahan'
            }}
          </h1>

          <p class="text-lg text-gray-600 mb-2">
            {{
              error.statusMessage ||
              'Halaman yang Anda cari tidak dapat ditemukan.'
            }}
          </p>

          <p class="text-sm text-gray-500 mb-8">
            Kode Error: {{ error.statusCode || 500 }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-4 w-full max-w-xs">
          <button
            @click="handleError"
            class="w-full bg-[#597BF9] text-white py-3 px-6 rounded-xl text-lg font-medium hover:bg-[#4c6ef5] transition-colors"
          >
            Coba Lagi
          </button>

          <button
            @click="$router.push('/home')"
            class="w-full bg-white border-2 border-[#597BF9] text-[#597BF9] py-3 px-6 rounded-xl text-lg font-medium hover:bg-[#597BF9]/5 transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ErrorProps {
  statusCode: number
  statusMessage?: string
}

const props = defineProps<{
  error: ErrorProps
}>()

const handleError = () => {
  // Sementara gunakan router push biasa
  // clearError({ redirect: '/home' })
  if (process.client) {
    window.location.href = '/home'
  }
}

// Log error untuk debugging
console.log('Error occurred:', props.error)
</script>
