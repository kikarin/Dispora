<template>
  <div>
    <LoadingSplash :show="splashVisible && isLoginPage" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import LoadingSplash from '~/components/LoadingSplash.vue'

const route = useRoute()
const splashVisible = ref(true)

// Check if current page is login
const isLoginPage = computed(() => {
  return route.path === '/login'
})

onMounted(() => {
  // Only show splash on login page
  if (isLoginPage.value) {
    setTimeout(() => { 
      splashVisible.value = false 
    }, 1200)
  } else {
    splashVisible.value = false
  }
})
</script>

<style>
/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
  filter: blur(0.5rem);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
  filter: blur(0.5rem);
}

/* Layout Transitions */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.layout-enter-from {
  opacity: 0;
  transform: scale(0.98);
}

.layout-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>
