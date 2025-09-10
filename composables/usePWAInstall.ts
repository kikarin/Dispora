import { onMounted, onUnmounted, ref, computed } from 'vue'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function usePWAInstall() {
  const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
  const isInstalled = ref(false)
  const showPrompt = ref(false)

  const isIOS = computed(() => {
    if (typeof navigator === 'undefined') return false
    return /iphone|ipad|ipod/i.test(navigator.userAgent)
  })

  const isInStandalone = computed(() => {
    // iOS
    // @ts-ignore
    const iosStandalone =
      typeof window !== 'undefined' &&
      window.navigator &&
      (window.navigator as any).standalone
    // Other browsers
    const displayModeStandalone =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(display-mode: standalone)').matches
    return Boolean(iosStandalone || displayModeStandalone)
  })

  const canInstall = computed(
    () =>
      !isInstalled.value &&
      !isInStandalone.value &&
      (deferredPrompt.value !== null || isIOS.value)
  )

  async function install() {
    if (deferredPrompt.value) {
      deferredPrompt.value.prompt()
      const choice = await deferredPrompt.value.userChoice
      if (choice.outcome === 'accepted') {
        isInstalled.value = true
        showPrompt.value = false
      }
    }
  }

  function hide() {
    showPrompt.value = false
  }

  onMounted(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      deferredPrompt.value = e as BeforeInstallPromptEvent
      showPrompt.value = true
    }
    window.addEventListener('beforeinstallprompt', handler as EventListener)

    // For iOS we cannot capture event; show a hint when not standalone
    if (!isInStandalone.value && isIOS.value) {
      showPrompt.value = true
    }

    onUnmounted(() => {
      window.removeEventListener(
        'beforeinstallprompt',
        handler as EventListener
      )
    })
  })

  return { canInstall, isIOS, isInStandalone, showPrompt, install, hide }
}
