<template>
    <div class="min-h-screen">
      <div
        class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col justify-between px-4 py-8 bg-gradient-to-b from-[#f8faff] to-white"
      >
        <!-- Header -->
        <div>
          <h1 class="text-[30px] font-bold leading-tight text-gray-900">
            Dispora
          </h1>
          <p class="mt-1 text-[14px] text-gray-500">
            Log in to continue your journey
          </p>
  
          <!-- Email -->
          <div class="mt-20 space-y-2">
            <label
              for="email"
              class="block text-[13px] font-medium text-gray-700"
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
                  d="M12 11c.5304 0 1.0391-.2107 1.4142-.5858C13.7893 10.0391 14 9.5304 14 9s-.2107-1.0391-.5858-1.4142C12.9609 7.2107 12.5304 7 12 7s-1.0391.2107-1.4142.5858C10.2107 7.9609 10 8.4696 10 9s.2107 1.0391.5858 1.4142C10.9609 10.7893 11.4696 11 12 11zm0 0v4m-6 4h12a2 2 0 0 0 2-2V9.236a2 2 0 0 0-.684-1.51l-6-5.368a2 2 0 0 0-2.632 0l-6 5.368A2 2 0 0 0 4 9.236V17a2 2 0 0 0 2 2z"
                />
              </svg>
              <input
                id="password"
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
            class="mt-8 inline-flex items-center gap-2 text-[13px] text-gray-700"
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
            class="mt-25 w-full rounded-2xl bg-gradient-to-r from-[#597BF9] to-[#4c6ef5] py-3 text-center text-[15px] font-medium text-white shadow-lg shadow-blue-500/30 active:scale-[0.98] transition"
          >
            Log in
          </button>

        </div>
  
        <!-- Bottom section -->
        <div class="absolute bottom-138 left-1/2 -translate-x-1/2 w-[350px]">
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
                <g
                mask="url(#softFade)"
                fill="#597BF9"
                transform="skewX(-20)"
                >
                <rect
                    v-for="(cube, i) in cubes"
                    :key="i"
                    :x="cube.x"
                    :y="cube.y"
                    :width="cube.size"
                    :height="cube.size"
                    rx="2"
                    ry="2"
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
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  interface Cube {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const cubes = ref<Cube[]>([]);

// generate grid halftone cubes
const cols = 24;
const rows = 12;
const baseSize = 8;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const size = Math.max(2, baseSize - row * 0.4); // makin ke atas makin kecil
    const opacity = 0.12 + row * 0.015; // makin ke bawah makin pekat
    cubes.value.push({
      x: col * 18,
      y: row * 12,
      size,
      opacity,
    });
  }
}
  const showPassword = ref(false);

  // Handle login
  const handleLogin = () => {
    // Simulate login process
    setTimeout(() => {
      router.push('/home');
    }, 1000);
  };
  </script>
  