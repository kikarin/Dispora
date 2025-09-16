<template>
  <transition name="fade" appear>
    <div
      v-if="show"
      class="fixed inset-0 z-[9999] overflow-hidden bg-[#597BF9] max-w-[410px] mx-auto"
    >
      <!-- Animated soft blobs background -->
      <div class="pointer-events-none absolute inset-0">
        <div
          class="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-float-slow"
        ></div>
        <div
          class="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float"
        ></div>
        <div
          class="absolute top-1/3 left-1/4 h-40 w-40 rounded-full bg-white/8 blur-2xl animate-float-delayed"
        ></div>
      </div>

      <!-- Logo -->
      <div class="relative flex h-full items-center justify-center">
        <img
          :src="logoUrl"
          alt="Logo Dispora"
          class="h-16 w-16 animate-soft-pulse drop-shadow-[0_8px_24px_rgba(255,255,255,0.35)]"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import logoUrl from '~/assets/css/Logo.png'

const props = defineProps<{ show: boolean }>()
const show = computed(() => props.show)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 400ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0) scale(1);
  }
  50% {
    transform: translateY(-12px) translateX(6px) scale(1.02);
  }
  100% {
    transform: translateY(0) translateX(0) scale(1);
  }
}
@keyframes float-slow {
  0% {
    transform: translateY(0) translateX(0) scale(1);
  }
  50% {
    transform: translateY(10px) translateX(-8px) scale(1.03);
  }
  100% {
    transform: translateY(0) translateX(0) scale(1);
  }
}
@keyframes float-delayed {
  0% {
    transform: translateY(0) translateX(0) scale(1);
  }
  50% {
    transform: translateY(-8px) translateX(10px) scale(1.01);
  }
  100% {
    transform: translateY(0) translateX(0) scale(1);
  }
}
@keyframes softPulse {
  0% {
    transform: scale(1);
    filter: drop-shadow(0 8px 24px rgba(255, 255, 255, 0.25));
  }
  50% {
    transform: scale(1.06);
    filter: drop-shadow(0 10px 28px rgba(255, 255, 255, 0.45));
  }
  100% {
    transform: scale(1);
    filter: drop-shadow(0 8px 24px rgba(255, 255, 255, 0.25));
  }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-float-slow {
  animation: float-slow 9s ease-in-out infinite;
}
.animate-float-delayed {
  animation: float-delayed 7s ease-in-out infinite;
}
.animate-soft-pulse {
  animation: softPulse 1.6s ease-in-out infinite;
}
</style>
