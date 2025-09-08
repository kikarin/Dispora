
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
interface _GlobalComponents {
      'BottomNavigation': typeof import("../app/components/BottomNavigation.vue")['default']
    'ContentLayout': typeof import("../app/components/ContentLayout.vue")['default']
    'LoadingSplash': typeof import("../app/components/LoadingSplash.vue")['default']
    'PageLayout': typeof import("../app/components/PageLayout.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'AreaChart': typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaChart']
    'AreaStackedChart': typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaStackedChart']
    'LineChart': typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['LineChart']
    'BarChart': typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['BarChart']
    'DonutChart': typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['DonutChart']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'AreaChart': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['AreaChart']
    'AreaStackedChart': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['AreaStackedChart']
    'LineChart': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['LineChart']
    'BarChart': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['BarChart']
    'DonutChart': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['DonutChart']
      'LazyBottomNavigation': LazyComponent<typeof import("../app/components/BottomNavigation.vue")['default']>
    'LazyContentLayout': LazyComponent<typeof import("../app/components/ContentLayout.vue")['default']>
    'LazyLoadingSplash': LazyComponent<typeof import("../app/components/LoadingSplash.vue")['default']>
    'LazyPageLayout': LazyComponent<typeof import("../app/components/PageLayout.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyAreaChart': LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaChart']>
    'LazyAreaStackedChart': LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaStackedChart']>
    'LazyLineChart': LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['LineChart']>
    'LazyBarChart': LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['BarChart']>
    'LazyDonutChart': LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['DonutChart']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyAreaChart': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['AreaChart']>
    'LazyAreaStackedChart': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['AreaStackedChart']>
    'LazyLineChart': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['LineChart']>
    'LazyBarChart': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['BarChart']>
    'LazyDonutChart': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['DonutChart']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const BottomNavigation: typeof import("../app/components/BottomNavigation.vue")['default']
export const ContentLayout: typeof import("../app/components/ContentLayout.vue")['default']
export const LoadingSplash: typeof import("../app/components/LoadingSplash.vue")['default']
export const PageLayout: typeof import("../app/components/PageLayout.vue")['default']
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
export const LazyBottomNavigation: LazyComponent<typeof import("../app/components/BottomNavigation.vue")['default']>
export const LazyContentLayout: LazyComponent<typeof import("../app/components/ContentLayout.vue")['default']>
export const LazyLoadingSplash: LazyComponent<typeof import("../app/components/LoadingSplash.vue")['default']>
export const LazyPageLayout: LazyComponent<typeof import("../app/components/PageLayout.vue")['default']>
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
