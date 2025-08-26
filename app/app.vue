<template>
  <div>
    <LoadingSplash :show="splashVisible" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoadingSplash from '~/components/LoadingSplash.vue'

const splashVisible = ref(true)

onMounted(() => {
  setTimeout(() => { 
    splashVisible.value = false 
  }, 1200)
})
</script>
