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

  const isAndroid = computed(() => {
    if (typeof navigator === 'undefined') return false
    return /android/i.test(navigator.userAgent)
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
      (deferredPrompt.value !== null || isIOS.value || isAndroid.value)
  )

  async function install() {
    console.log('Install button clicked')
    console.log('deferredPrompt:', deferredPrompt.value)
    console.log('canInstall:', canInstall.value)

    if (deferredPrompt.value) {
      try {
        deferredPrompt.value.prompt()
        const choice = await deferredPrompt.value.userChoice
        console.log('User choice:', choice)
        if (choice.outcome === 'accepted') {
          isInstalled.value = true
          showPrompt.value = false
        }
      } catch (error) {
        console.error('Install error:', error)
      }
    } else {
      console.log('No deferred prompt available')
    }
  }

  function hide() {
    showPrompt.value = false
  }

  const handler = (e: Event) => {
    console.log('beforeinstallprompt event triggered')
    e.preventDefault()
    deferredPrompt.value = e as BeforeInstallPromptEvent
    showPrompt.value = true
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', handler as EventListener)
    }

    // For iOS and Android we cannot capture event; show a hint when not standalone
    if (!isInStandalone.value && (isIOS.value || isAndroid.value)) {
      showPrompt.value = true
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener(
        'beforeinstallprompt',
        handler as EventListener
      )
    }
  })

  return {
    canInstall,
    isIOS,
    isAndroid,
    isInStandalone,
    showPrompt,
    install,
    hide,
  }
}
