import { ref } from 'vue'

export const useAlert = () => {
  const showAlert = ref(false)
  const alertConfig = ref({
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error',
    confirmText: 'OK',
    cancelText: 'Batal',
    showCancel: false,
    onConfirm: () => {},
    onCancel: () => {},
  })

  const showConfirm = (config: {
    title: string
    message: string
    type?: 'info' | 'success' | 'warning' | 'error'
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel?: () => void
  }) => {
    alertConfig.value = {
      title: config.title,
      message: config.message,
      type: config.type || 'info',
      confirmText: config.confirmText || 'OK',
      cancelText: config.cancelText || 'Batal',
      showCancel: true,
      onConfirm: config.onConfirm,
      onCancel: config.onCancel || (() => {}),
    }
    showAlert.value = true
  }

  const showInfo = (config: {
    title: string
    message: string
    confirmText?: string
    onConfirm?: () => void
  }) => {
    alertConfig.value = {
      title: config.title,
      message: config.message,
      type: 'info',
      confirmText: config.confirmText || 'OK',
      cancelText: 'Batal',
      showCancel: false,
      onConfirm: config.onConfirm || (() => {}),
      onCancel: () => {},
    }
    showAlert.value = true
  }

  const hideAlert = () => {
    showAlert.value = false
  }

  const handleConfirm = () => {
    alertConfig.value.onConfirm()
    hideAlert()
  }

  const handleCancel = () => {
    alertConfig.value.onCancel()
    hideAlert()
  }

  return {
    showAlert,
    alertConfig,
    showConfirm,
    showInfo,
    hideAlert,
    handleConfirm,
    handleCancel,
  }
}
