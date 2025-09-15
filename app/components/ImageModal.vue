<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex flex-col bg-black"
    @click="closeModal"
  >
    <!-- Header Mobile -->
    <div class="flex justify-between items-center p-4 bg-black bg-opacity-75 text-white">
      <h3 class="text-lg font-semibold truncate">{{ title || 'Preview Gambar' }}</h3>
      <button
    @click="closeModal"
    class="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 flex-shrink-0"
  >
    <XMarkIcon class="w-6 h-6 text-gray-700" />
  </button>
    </div>
    
    <!-- Image Container -->
    <div class="flex-1 flex items-center justify-center p-4 overflow-hidden" @click.stop>
      <img
        :src="imageUrl"
        :alt="title || 'Preview'"
        class="max-w-full max-h-full object-contain rounded-lg shadow-lg"
        style="max-height: calc(100vh - 120px);"
      />
    </div>
    
    <!-- Bottom Actions (Mobile) -->
    <div class="p-4 bg-black bg-opacity-75 text-white flex justify-center gap-4">
      <a
        :href="imageUrl"
        target="_blank"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
      >
        Buka di Tab Baru
      </a>
      <button
        @click="closeModal"
        class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
      >
        Tutup
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
  isOpen: boolean
  imageUrl?: string
  title?: string
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const closeModal = () => {
  emit('close')
}

// Close modal on escape key and handle body scroll
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeModal()
    }
  }
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})

// Prevent body scroll when modal is open
watch(() => props.isOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>
