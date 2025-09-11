
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)


export const Alert: typeof import("../app/components/Alert.vue")['default']
export const BottomNavigation: typeof import("../app/components/BottomNavigation.vue")['default']
export const ContentLayout: typeof import("../app/components/ContentLayout.vue")['default']
export const LoadingSplash: typeof import("../app/components/LoadingSplash.vue")['default']
export const PWAInstallPrompt: typeof import("../app/components/PWAInstallPrompt.vue")['default']
export const PageLayout: typeof import("../app/components/PageLayout.vue")['default']
export const PemeriksaanForm: typeof import("../app/components/PemeriksaanForm.vue")['default']
export const PemeriksaanParameterForm: typeof import("../app/components/PemeriksaanParameterForm.vue")['default']
export const ProgramLatihanForm: typeof import("../app/components/ProgramLatihanForm.vue")['default']
export const RencanaLatihanForm: typeof import("../app/components/RencanaLatihanForm.vue")['default']
export const TargetLatihanForm: typeof import("../app/components/TargetLatihanForm.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const AreaChart: typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaChart']
export const AreaStackedChart: typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaStackedChart']
export const LineChart: typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['LineChart']
export const BarChart: typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['BarChart']
export const DonutChart: typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['DonutChart']
export const Icon: typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
export const ColorScheme: typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
export const VitePwaManifest: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
export const NuxtPwaManifest: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
export const NuxtPwaAssets: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']
export const PwaAppleImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']
export const PwaAppleSplashScreenImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']
export const PwaFaviconImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']
export const PwaMaskableImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']
export const PwaTransparentImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const AreaChart: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['AreaChart']
export const AreaStackedChart: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['AreaStackedChart']
export const LineChart: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['LineChart']
export const BarChart: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['BarChart']
export const DonutChart: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['DonutChart']
export const LazyAlert: LazyComponent<typeof import("../app/components/Alert.vue")['default']>
export const LazyBottomNavigation: LazyComponent<typeof import("../app/components/BottomNavigation.vue")['default']>
export const LazyContentLayout: LazyComponent<typeof import("../app/components/ContentLayout.vue")['default']>
export const LazyLoadingSplash: LazyComponent<typeof import("../app/components/LoadingSplash.vue")['default']>
export const LazyPWAInstallPrompt: LazyComponent<typeof import("../app/components/PWAInstallPrompt.vue")['default']>
export const LazyPageLayout: LazyComponent<typeof import("../app/components/PageLayout.vue")['default']>
export const LazyPemeriksaanForm: LazyComponent<typeof import("../app/components/PemeriksaanForm.vue")['default']>
export const LazyPemeriksaanParameterForm: LazyComponent<typeof import("../app/components/PemeriksaanParameterForm.vue")['default']>
export const LazyProgramLatihanForm: LazyComponent<typeof import("../app/components/ProgramLatihanForm.vue")['default']>
export const LazyRencanaLatihanForm: LazyComponent<typeof import("../app/components/RencanaLatihanForm.vue")['default']>
export const LazyTargetLatihanForm: LazyComponent<typeof import("../app/components/TargetLatihanForm.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyAreaChart: LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaChart']>
export const LazyAreaStackedChart: LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaStackedChart']>
export const LazyLineChart: LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['LineChart']>
export const LazyBarChart: LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['BarChart']>
export const LazyDonutChart: LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['DonutChart']>
export const LazyIcon: LazyComponent<typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
export const LazyColorScheme: LazyComponent<typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
export const LazyVitePwaManifest: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
export const LazyNuxtPwaManifest: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
export const LazyNuxtPwaAssets: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']>
export const LazyPwaAppleImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']>
export const LazyPwaAppleSplashScreenImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']>
export const LazyPwaFaviconImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']>
export const LazyPwaMaskableImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']>
export const LazyPwaTransparentImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyAreaChart: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['AreaChart']>
export const LazyAreaStackedChart: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['AreaStackedChart']>
export const LazyLineChart: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['LineChart']>
export const LazyBarChart: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['BarChart']>
export const LazyDonutChart: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['DonutChart']>

export const componentNames: string[]
