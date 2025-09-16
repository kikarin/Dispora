<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-x-0 bottom-4 z-50 px-4">
      <div
        class="mx-auto max-w-md rounded-xl shadow-lg border border-gray-200 bg-white p-3"
      >
        <div class="flex items-start gap-3">
          <img
            src="/pwa-192x192.png"
            alt="Ikon aplikasi Dispora"
            class="w-10 h-10 rounded-md"
          />
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">Pasang aplikasi?</p>
            <p v-if="isIOS" class="text-xs text-gray-600 mt-0.5">
              Buka menu Share → Add to Home Screen untuk memasang aplikasi.
            </p>
            <p v-else-if="isAndroid" class="text-xs text-gray-600 mt-0.5">
              Tekan tombol Pasang atau buka menu browser → Add to Home Screen.
            </p>
            <p v-else class="text-xs text-gray-600 mt-0.5">
              Tekan tombol Pasang untuk menambahkan ke layar utama.
            </p>
          </div>
        </div>
        <div class="flex gap-2 mt-3">
          <button
            @click="hide"
            class="flex-1 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200"
            aria-label="Tutup prompt pemasangan"
          >
            Nanti
          </button>
          <button
            v-if="!isIOS"
            @click="install"
            class="flex-1 py-2 rounded-lg text-white bg-[#597BF9] hover:bg-[#4c6ef5]"
            aria-label="Pasang aplikasi"
          >
            Pasang
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePWAInstall } from '../../composables/usePWAInstall'

const { canInstall, isIOS, isAndroid, showPrompt, install, hide } =
  usePWAInstall()
const show = computed(() => showPrompt.value && canInstall.value)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
