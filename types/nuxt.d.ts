declare module '~/composables/useAuth' {
  export const useAuth: () => {
    user: any
    isAuthenticated: any
    isLoading: any
    token: any
    login: (credentials: {
      email: string
      password: string
    }) => Promise<{ success: boolean; message?: string }>
    logout: () => Promise<void>
    fetchUser: () => Promise<any>
    checkAuth: () => boolean
    initAuth: () => void
    getAuthHeaders: () => {
      Authorization: string
      Accept: string
      'Content-Type': string
    }
    requireAuth: () => boolean
  }
}

declare module '~/composables/useSettings' {
  export const useSettings: () => {
    isLoading: any
    updateProfile: (profileData: any) => Promise<any>
    changePassword: (passwordData: any) => Promise<any>
    resetPassword: (email: string) => Promise<any>
    deleteAccount: (password: string) => Promise<any>
  }
}

declare module '~/composables/useProgramLatihan' {
  export const useProgramLatihan: () => {
    programs: any
    caborList: any
    loading: any
    error: any
    currentPage: any
    totalPages: any
    totalItems: any
    perPage: any
    searchQuery: any
    selectedCabor: any
    startDate: any
    endDate: any
    filteredPrograms: any
    fetchPrograms: (page?: number, forceRefresh?: boolean) => Promise<void>
    fetchCaborList: (forceRefresh?: boolean) => Promise<void>
    fetchProgramDetail: (id: number) => Promise<any>
    forceRefreshData: () => Promise<void>
    toggleCaborFilter: (caborId: number) => void
    clearFilters: () => void
    applyDateFilter: () => void
    nextPage: () => void
    prevPage: () => void
    goToPage: (page: number) => void
  }
}

declare module '~/composables/useTargetLatihan' {
  export const useTargetLatihan: () => {
    targetList: any
    loading: any
    error: any
    fetchTargetList: (rencanaId: number) => Promise<void>
    targetDetail: any
    detailLoading: any
    detailError: any
    fetchTargetDetail: (rencanaId: number, targetId: number) => Promise<void>
  }
}

declare module '~/composables/usePemeriksaan' {
  export const usePemeriksaan: () => {
    pemeriksaanList: any
    caborList: any
    loading: any
    error: any
    currentPage: any
    totalPages: any
    totalItems: any
    perPage: any
    searchQuery: any
    selectedCabor: any
    selectedDate: any
    filteredPemeriksaan: any
    fetchPemeriksaan: (page?: number, forceRefresh?: boolean) => Promise<void>
    fetchCaborList: (forceRefresh?: boolean) => Promise<void>
    fetchPemeriksaanDetail: (id: number) => Promise<any>
    forceRefreshData: () => Promise<void>
    hardRefresh: () => Promise<void>
    testApiManually: () => Promise<void>
    toggleCaborFilter: (caborName: string) => void
    clearFilters: () => void
    applyDateFilter: () => void
    nextPage: () => void
    prevPage: () => void
    goToPage: (page: number) => void
  }
}

declare module '~/composables/usePesertaPemeriksaan' {
  export const usePesertaPemeriksaan: (pemeriksaanId: number) => {
    pemeriksaanInfo: any
    atlet: any
    pelatih: any
    tenagaPendukung: any
    loading: any
    error: any
    searchQuery: any
    fetchPeserta: () => Promise<void>
  }
}

declare module '~/composables/useParameterPemeriksaan' {
  export const useParameterPemeriksaan: (pemeriksaanId: number) => {
    pemeriksaanInfo: any
    parameterList: any
    loading: any
    error: any
    searchQuery: any
    fetchParameterList: () => Promise<void>

    parameterDetail: any
    atlet: any
    pelatih: any
    tenagaPendukung: any
    detailLoading: any
    detailError: any
    detailSearchQuery: any
    fetchParameterDetail: (parameterId: number) => Promise<void>
  }
}

declare module '~/composables/useTurnamen' {
  export const useTurnamen: () => {
    turnamenList: any
    caborList: any
    loading: any
    error: any
    currentPage: any
    totalPages: any
    totalItems: any
    perPage: any
    searchQuery: any
    selectedCabor: any
    startDate: any
    endDate: any
    filteredTurnamen: any
    fetchTurnamen: (page?: number, forceRefresh?: boolean) => Promise<void>
    fetchCaborList: (forceRefresh?: boolean) => Promise<void>
    fetchTurnamenDetail: (id: number) => Promise<any>
    forceRefreshData: () => Promise<void>
    toggleCaborFilter: (caborName: string) => void
    clearFilters: () => void
    applyDateFilter: () => void
    nextPage: () => void
    prevPage: () => void
    goToPage: (page: number) => void
  }
}

declare module '~/composables/usePesertaTurnamen' {
  export const usePesertaTurnamen: (turnamenId: number) => {
    turnamenInfo: any
    atlet: any
    pelatih: any
    tenagaPendukung: any
    loading: any
    error: any
    searchQuery: any
    fetchPeserta: () => Promise<void>
  }
}

declare module '~/composables/useHome' {
  export const useHome: () => {
    homeData: any
    loading: any
    error: any
    searchQuery: any
    selectedCabor: any
    selectedModule: any
    filteredProgramLatihan: any
    filteredPemeriksaan: any
    filteredTurnamen: any
    availableCabor: any
    fetchHomeData: () => Promise<void>
    toggleCaborFilter: (caborName: string) => void
    clearFilters: () => void
    setModuleFilter: (module: string) => void
  }
}

// Global declarations
declare global {
  const process: {
    client: boolean
  }
}
