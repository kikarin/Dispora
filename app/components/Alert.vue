<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showAlert"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        @click.self="hideAlert"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <!-- Alert Modal -->
        <Transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="showAlert"
            class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4"
            @click.stop
          >
            <!-- Header -->
            <div class="flex items-center gap-3 p-6 pb-4">
              <div
                class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                :class="iconBgClass"
              >
                <svg
                  v-if="alertConfig.type === 'info'"
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <svg
                  v-else-if="alertConfig.type === 'success'"
                  class="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <svg
                  v-else-if="alertConfig.type === 'warning'"
                  class="w-5 h-5 text-yellow-600"
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
                <svg
                  v-else-if="alertConfig.type === 'error'"
                  class="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ alertConfig.title }}
                </h3>
              </div>
              <button
                @click="hideAlert"
                class="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="px-6 pb-6">
              <p class="text-gray-600 leading-relaxed">
                {{ alertConfig.message }}
              </p>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 px-6 pb-6">
              <button
                v-if="alertConfig.showCancel"
                @click="handleCancel"
                class="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                {{ alertConfig.cancelText }}
              </button>
              <button
                @click="handleConfirm"
                class="flex-1 px-4 py-2 rounded-lg font-medium transition-colors"
                :class="confirmButtonClass"
              >
                {{ alertConfig.confirmText }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  showAlert: boolean
  alertConfig: {
    title: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    confirmText: string
    cancelText: string
    showCancel: boolean
    onConfirm: () => void
    onCancel: () => void
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  hide: []
  confirm: []
  cancel: []
}>()

const iconBgClass = computed(() => {
  switch (props.alertConfig.type) {
    case 'info':
      return 'bg-blue-100'
    case 'success':
      return 'bg-green-100'
    case 'warning':
      return 'bg-yellow-100'
    case 'error':
      return 'bg-red-100'
    default:
      return 'bg-gray-100'
  }
})

const confirmButtonClass = computed(() => {
  switch (props.alertConfig.type) {
    case 'info':
      return 'bg-blue-600 text-white hover:bg-blue-700'
    case 'success':
      return 'bg-green-600 text-white hover:bg-green-700'
    case 'warning':
      return 'bg-red-600 text-white hover:bg-red-700'
    case 'error':
      return 'bg-red-600 text-white hover:bg-red-700'
    default:
      return 'bg-gray-600 text-white hover:bg-gray-700'
  }
})

const hideAlert = () => {
  emit('hide')
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>
