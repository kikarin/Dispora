<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex flex-col bg-black"
  >
    <!-- Header Mobile -->
    <div class="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h3 class="text-lg font-semibold truncate flex-1 mr-4">{{ title || 'Preview PDF' }}</h3>
      <div class="flex gap-2 flex-shrink-0">
        <!-- Download button -->
        <a
          :href="pdfUrl"
          target="_blank"
          class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          Download
        </a>
        <!-- Close button -->
        <button
          @click="closeModal"
          class="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- PDF Viewer -->
    <div class="flex-1 bg-white" @click.stop>
      <iframe
        :src="pdfUrl"
        class="w-full h-full"
        frameborder="0"
        style="min-height: calc(100vh - 80px);"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  pdfUrl?: string
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
