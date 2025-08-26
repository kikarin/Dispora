<script setup lang="ts">
// Removed automatic redirect - let users navigate naturally
</script>

<template>
  <div class="min-h-screen">
    <div class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-8" style="background: linear-gradient(180deg,rgba(216, 224, 255, 1) 0%, rgba(248, 250, 251, 1) 50%, rgba(226, 224, 255, 1) 100%);">
      
      <!-- Welcome Section -->
      <div class="flex flex-col items-center justify-center h-full text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Selamat Datang di Dispora</h1>
        <p class="text-lg text-gray-600 mb-8">Temukan program olahraga terbaik untuk Anda</p>
        
        <!-- Action Buttons -->
        <div class="space-y-4 w-full max-w-xs">
          <button 
            @click="$router.push('/home')"
            class="w-full bg-[#597BF9] text-white py-3 px-6 rounded-xl text-lg font-medium hover:bg-[#4c6ef5] transition-colors"
          >
            Mulai Jelajahi
          </button>
          
          <button 
            @click="$router.push('/login')"
            class="w-full bg-white border-2 border-[#597BF9] text-[#597BF9] py-3 px-6 rounded-xl text-lg font-medium hover:bg-[#597BF9]/5 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

