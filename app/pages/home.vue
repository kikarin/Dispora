<template>
  <div class="min-h-screen">
    <div class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-4" style="background: linear-gradient(180deg,rgba(216, 224, 255, 1) 0%, rgba(248, 250, 251, 1) 50%, rgba(226, 224, 255, 1) 100%);">

      <!-- Header + Search -->
      <div class="mb-10">
        <!-- Header with animated gradient text -->
        <div class="mb-6 text-center sm:text-left ml-1">
          <h1 class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#597BF9] via-[#4c6ef5] to-[#845ef7] bg-clip-text text-transparent">
            Dispora
          </h1>
          <p class="mt-1 text-sm text-gray-600 font-medium">
            Temukan program olahraga terbaik
          </p>
        </div>

        <!-- Enhanced Search Bar with glassmorphism -->
        <div class="relative">
          <div class="flex flex-col gap-3 rounded-2xl bg-white/60 p-4 shadow-lg backdrop-blur-md border border-white/30 sm:flex-row sm:items-center">
            <!-- Search Icon + Input with focus effects -->
            <div class="flex flex-1 items-center gap-3 group">
              <div class="p-2 rounded-xl bg-gradient-to-br from-[#597BF9]/10 to-[#4c6ef5]/10 group-focus-within:from-[#597BF9]/20 group-focus-within:to-[#4c6ef5]/20 transition-all duration-200">
                <svg
                  class="h-5 w-5 text-[#597BF9] group-focus-within:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari..."
                class="w-full bg-transparent text-[15px] placeholder:text-gray-500 outline-none font-medium focus:placeholder:text-gray-400 transition-colors duration-200"
              />
            </div>

            <!-- Enhanced Custom Select Dropdown -->
            <div class="relative" style="position: relative; z-index: 9999;">
              <div 
                @click="toggleDropdown"
                data-dropdown-trigger="program"
                class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-10 text-xs font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{{ selectedOption.label }}</span>
                <!-- Animated arrow icon -->
                <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
                    :class="{ 'rotate-180': isDropdownOpen }"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <!-- Enhanced Dropdown Menu with animations -->
              <Teleport to="body">
                <transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-150 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <div
                    v-if="isDropdownOpen"
                    class="fixed rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-white/50 ring-1 ring-black/5 z-[99999] w-48"
                    :style="getDropdownPosition()"
                  >
                    <div class="p-1">
                      <div
                        v-for="(option, index) in dropdownOptions"
                        :key="option.value"
                        @click="selectOption(option)"
                        class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                        :class="{
                          'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]': selectedOption.value === option.value
                        }"
                      >
                        <!-- Icon for each option -->
                        <div class="mr-3 flex-shrink-0">
                          <svg v-if="option.value === 'program-latihan'" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <svg v-else-if="option.value === 'pemeriksaan'" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <svg v-else-if="option.value === 'turnamen'" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                        </div>
                        <span>{{ option.label }}</span>
                        <!-- Check mark for selected option -->
                        <svg 
                          v-if="selectedOption.value === option.value"
                          class="ml-auto h-4 w-4 text-[#597BF9]" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </transition>
              </Teleport>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Navigation Cards with hover effects -->
      <div class="mb-8">
        <div class="rounded-2xl bg-white/70 backdrop-blur-md p-5 shadow-lg border border-white/40">
          <!-- Top row with enhanced icons and animations -->
          <div class="grid grid-cols-4 gap-4 mb-5">
            <div @click="navigateTo('/program-latihan')" class="flex flex-col items-center gap-2 group cursor-pointer">
              <div class="rounded-2xl bg-gradient-to-br from-[#597BF9]/10 to-[#4c6ef5]/20 p-4 group-hover:from-[#597BF9]/20 group-hover:to-[#4c6ef5]/30 transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                <svg class="h-6 w-6 text-[#597BF9] group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="text-xs font-semibold text-gray-700 text-center group-hover:text-[#597BF9] transition-colors duration-200">Program Latihan</span>
            </div>
            
            <div @click="navigateTo('/pemeriksaan')" class="flex flex-col items-center gap-2 group cursor-pointer">
              <div class="rounded-2xl bg-gradient-to-br from-emerald-100 to-green-200 p-4 group-hover:from-emerald-200 group-hover:to-green-300 transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                <svg class="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="text-xs font-semibold text-gray-700 text-center group-hover:text-green-600 transition-colors duration-200">Pemeriksaan</span>
            </div>
            
            <div @click="navigateTo('/turnamen')" class="flex flex-col items-center gap-2 group cursor-pointer">
              <div class="rounded-2xl bg-gradient-to-br from-orange-100 to-red-200 p-4 group-hover:from-orange-200 group-hover:to-red-300 transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                <svg class="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span class="text-xs font-semibold text-gray-700 text-center group-hover:text-orange-600 transition-colors duration-200">Turnamen</span>
            </div>

            <div @click="navigateTo('/simpan')" class="flex flex-col items-center gap-2 group cursor-pointer">
              <div class="rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-200 p-4 group-hover:from-emerald-200 group-hover:to-green-300 transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                <svg class="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                </svg>
              </div>
              <span class="text-xs font-semibold text-gray-700 text-center group-hover:text-purple-600 transition-colors duration-200">Simpan</span>
            </div>
          </div>
          
          <!-- Enhanced Category Filter -->
          <div class="pt-4 p-2 border-t border-gray-200/50 relative" style="position: relative; z-index: 9999;">
            <div 
              @click="toggleCategoryDropdown"
              data-dropdown-trigger="category"
              class="w-full bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200/50 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer hover:from-gray-100 hover:to-gray-200 hover:border-[#597BF9]/30 focus:outline-none focus:ring-2 focus:ring-[#597BF9]/20 focus:border-[#597BF9] transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <svg class="h-4 w-4 mr-2 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  <span>{{ selectedCategory.label }}</span>
                </div>
                <svg 
                  class="h-4 w-4 text-gray-500 transition-transform duration-200"
                  :class="{ 'rotate-180': isCategoryDropdownOpen }"
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <!-- Category Dropdown -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <Teleport to="body">
                <div
                  v-if="isCategoryDropdownOpen"
                  class="fixed left-2 right-2 origin-top rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-white/50 ring-1 ring-black/5 z-[99999] w-auto"
                  :style="getCategoryDropdownPosition()"
                >
                  <div class="p-1">
                    <div
                      v-for="category in categoryOptions"
                      :key="category.value"
                      @click="selectCategory(category)"
                      class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer transition-all duration-200"
                      :class="{
                        'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]': selectedCategory.value === category.value
                      }"
                    >
                      <svg class="h-4 w-4 mr-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                      </svg>
                      <span>{{ category.label }}</span>
                      <svg 
                        v-if="selectedCategory.value === category.value"
                        class="ml-auto h-4 w-4 text-[#597BF9]" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Teleport>
            </transition>
          </div>
        </div>
      </div>

      <!-- Enhanced Program Cards Sections -->
      <!-- Program Latihan Terbaru -->
      <div class="mb-8">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900">Program Latihan Terbaru</h2>
          <button class="text-[#597BF9] text-sm font-semibold hover:text-[#4c6ef5] transition-colors duration-200 hover:underline">Lihat Semua</button>
        </div>
        <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div v-for="program in programLatihan" :key="program.id" class="flex-shrink-0 w-64 rounded-2xl bg-white/80 backdrop-blur-sm p-5 shadow-md border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div class="mb-4 h-32 rounded-2xl bg-gradient-to-br from-[#597BF9]/20 to-[#4c6ef5]/30 flex items-center justify-center relative overflow-hidden">
              <!-- Background pattern -->
              <div class="absolute inset-0 opacity-20">
                <div class="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/30"></div>
                <div class="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-white/20"></div>
              </div>
              <svg class="h-12 w-12 text-[#597BF9] z-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <!-- Enhanced Badge -->
            <div class="mb-3">
              <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#597BF9]/10 to-[#4c6ef5]/20 text-[#597BF9] border border-[#597BF9]/30">
                <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                {{ program.cabor }}
              </span>
            </div>
            
            <h3 class="mb-4 text-sm font-bold text-gray-900 line-clamp-2">{{ program.nama }}</h3>
            <div class="mt-3 flex items-center justify-between text-xs text-gray-600">
              <span class="font-medium">{{ program.lokasi }}</span>
              <button 
                @click="toggleSave('program-latihan', program.id)"
                class="rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95"
                :class="program.isSaved ? 'bg-gradient-to-r from-[#597BF9] to-[#4c6ef5] text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'"
              >
                <svg v-if="program.isSaved" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                </svg>
                <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pemeriksaan -->
      <div class="mb-8">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900">Pemeriksaan Terbaru</h2>
          <button class="text-[#597BF9] text-sm font-semibold hover:text-[#4c6ef5] transition-colors duration-200 hover:underline">Lihat Semua</button>
        </div>
        <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div v-for="pemeriksaan in dataPemeriksaan" :key="pemeriksaan.id" class="flex-shrink-0 w-64 rounded-2xl bg-white/80 backdrop-blur-sm p-5 shadow-md border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div class="mb-4 h-32 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 opacity-20">
                <div class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/40"></div>
                <div class="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-white/30"></div>
              </div>
              <svg class="h-12 w-12 text-green-600 z-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div class="mb-3">
              <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-green-100 to-emerald-200 text-green-700 border border-green-300">
                <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                {{ pemeriksaan.cabor }}
              </span>
            </div>
            
            <h3 class="mb-4 text-sm font-bold text-gray-900 line-clamp-2">{{ pemeriksaan.nama }}</h3>
            <div class="mt-3 flex items-center justify-between text-xs text-gray-600">
              <span class="font-medium">{{ pemeriksaan.lokasi }}</span>
              <button 
                @click="toggleSave('pemeriksaan', pemeriksaan.id)"
                class="rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95"
                :class="pemeriksaan.isSaved ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'"
              >
                <svg v-if="pemeriksaan.isSaved" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                </svg>
                <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Turnamen -->
      <div class="mb-8">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900">Turnamen Terbaru</h2>
          <button class="text-[#597BF9] text-sm font-semibold hover:text-[#4c6ef5] transition-colors duration-200 hover:underline">Lihat Semua</button>
        </div>
        <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div v-for="turnamen in dataTurnamen" :key="turnamen.id" class="flex-shrink-0 w-64 rounded-2xl bg-white/80 backdrop-blur-sm p-5 shadow-md border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div class="mb-4 h-32 rounded-2xl bg-gradient-to-br from-orange-100 to-red-200 flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 opacity-20">
                <div class="absolute top-3 left-3 w-5 h-5 rounded-full bg-white/40"></div>
                <div class="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/30"></div>
              </div>
              <svg class="h-12 w-12 text-orange-600 z-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            
            <div class="mb-3">
              <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-orange-100 to-red-200 text-orange-700 border border-orange-300">
                <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                {{ turnamen.cabor }}
              </span>
            </div>
            
            <h3 class="mb-4 text-sm font-bold text-gray-900 line-clamp-2">{{ turnamen.nama }}</h3>
            <div class="mt-3 flex items-center justify-between text-xs text-gray-600">
              <span class="font-medium">{{ turnamen.lokasi }}</span>
              <button 
                @click="toggleSave('turnamen', turnamen.id)"
                class="rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95"
                :class="turnamen.isSaved ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'"
              >
                <svg v-if="turnamen.isSaved" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                </svg>
                <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Spacer for bottom navigation -->
      <div class="h-20"></div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNavigation />

    <!-- Click outside handler for dropdowns -->
    <div 
      v-if="isDropdownOpen || isCategoryDropdownOpen" 
      @click="closeAllDropdowns"
      class="fixed inset-0 z-30"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Dropdown state management
const isDropdownOpen = ref(false)
const isCategoryDropdownOpen = ref(false)

// Dropdown options for search filter
const dropdownOptions = ref([
  { value: '', label: 'Semua Program' },
  { value: 'program-latihan', label: 'Program Latihan' },
  { value: 'pemeriksaan', label: 'Pemeriksaan' },
  { value: 'turnamen', label: 'Turnamen' }
])

const selectedOption = ref(dropdownOptions.value[0])

// Category filter options
const categoryOptions = ref([
  { value: '', label: 'Semua Kategori' },
  { value: 'program-latihan', label: 'Program Latihan Terbaru' },
  { value: 'pemeriksaan', label: 'Pemeriksaan Terbaru' },
  { value: 'turnamen', label: 'Turnamen Terbaru' }
])

const selectedCategory = ref(categoryOptions.value[0])

// Dropdown toggle functions
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) {
    isCategoryDropdownOpen.value = false
  }
}

const toggleCategoryDropdown = () => {
  isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value
  if (isCategoryDropdownOpen.value) {
    isDropdownOpen.value = false
  }
}

const closeAllDropdowns = () => {
  isDropdownOpen.value = false
  isCategoryDropdownOpen.value = false
}

// Selection functions
const selectOption = (option: any) => {
  selectedOption.value = option
  isDropdownOpen.value = false
  console.log('Selected option:', option.value)
}

// Function to calculate dropdown position
const getDropdownPosition = () => {
  const trigger = document.querySelector('[data-dropdown-trigger="program"]')
  if (trigger) {
    const rect = trigger.getBoundingClientRect()
    return {
      top: `${rect.bottom + 8}px`,
      right: `${window.innerWidth - rect.right}px`
    }
  }
  return {
    top: '100px',
    right: '20px'
  }
}

// Function to calculate category dropdown position
const getCategoryDropdownPosition = () => {
  const trigger = document.querySelector('[data-dropdown-trigger="category"]')
  if (trigger) {
    const rect = trigger.getBoundingClientRect()
    return {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
      right: `${window.innerWidth - rect.right}px`
    }
  }
  return {
    top: '200px',
    left: '20px',
    right: '20px'
  }
}

// Navigation function
const navigateTo = (path: string) => {
  router.push(path)
}

const selectCategory = (category: any) => {
  selectedCategory.value = category
  isCategoryDropdownOpen.value = false
  console.log('Selected category:', category.value)
}

// Close dropdowns on escape key
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeAllDropdowns()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})

// Function to toggle save state
const toggleSave = (category: string, id: number) => {
  let targetArray: any[]
  
  switch(category) {
    case 'program-latihan':
      targetArray = programLatihan.value
      break
    case 'pemeriksaan':
      targetArray = dataPemeriksaan.value
      break
    case 'turnamen':
      targetArray = dataTurnamen.value
      break
    default:
      return
  }
  
  const item = targetArray.find(item => item.id === id)
  if (item) {
    item.isSaved = !item.isSaved
    console.log(`${category} ${id} ${item.isSaved ? 'disimpan' : 'dihapus dari simpan'}`)
  }
}

// Enhanced dummy data with more variety
const programLatihan = ref([
  {
    id: 1,
    nama: "Program Latihan Sepak Bola Intensif U-17",
    lokasi: "Gelora Bung Karno, Jakarta",
    isSaved: false,
    cabor: "Sepak Bola"
  },
  {
    id: 2,
    nama: "Program Latihan Basket 3x3 Championship",
    lokasi: "GOR Basket, Bogor",
    isSaved: true,
    cabor: "Basket"
  },
  {
    id: 3,
    nama: "Program Latihan Badminton Elite Training",
    lokasi: "GOR Bulutangkis, Bandung",
    isSaved: false,
    cabor: "Badminton"
  },
  {
    id: 4,
    nama: "Program Latihan Tenis Professional",
    lokasi: "Tennis Court Senayan, Jakarta",
    isSaved: false,
    cabor: "Tenis"
  },
  {
    id: 5,
    nama: "Program Latihan Renang Sprint & Distance",
    lokasi: "Aquatic Center, Jakarta",
    isSaved: true,
    cabor: "Renang"
  }
])

const dataPemeriksaan = ref([
  {
    id: 1,
    nama: "Pemeriksaan Fisik Komprehensif Atlet",
    lokasi: "Klinik Olahraga Senayan",
    isSaved: false,
    cabor: "Basket"
  },
  {
    id: 2,
    nama: "Tes Kebugaran Jasmani & VO2 Max",
    lokasi: "Lab Fisiologi Olahraga",
    isSaved: false,
    cabor: "Badminton"
  },
  {
    id: 3,
    nama: "Pemeriksaan Jantung & Kardiovaskular",
    lokasi: "RS Olahraga Nasional",
    isSaved: true,
    cabor: "Renang"
  },
  {
    id: 4,
    nama: "Analisis Biomekanik & Postur",
    lokasi: "Pusat Riset Olahraga",
    isSaved: false,
    cabor: "Sepak Bola"
  },
  {
    id: 5,
    nama: "Screening Cedera & Rehabilitasi",
    lokasi: "Klinik Fisioterapi Olahraga",
    isSaved: false,
    cabor: "Tenis"
  }
])

const dataTurnamen = ref([
  {
    id: 1,
    nama: "Turnamen Sepak Bola U-17 Nasional",
    lokasi: "Jakarta, Surabaya, Medan",
    isSaved: true,
    cabor: "Sepak Bola"
  },
  {
    id: 2,
    nama: "Kejuaraan Basket 3x3 Indonesia Open",
    lokasi: "GOR Basket Senayan",
    isSaved: false,
    cabor: "Basket"
  },
  {
    id: 3,
    nama: "Indonesia Open Badminton Championship",
    lokasi: "Istora Senayan, Jakarta",
    isSaved: false,
    cabor: "Badminton"
  },
  {
    id: 4,
    nama: "Turnamen Tenis Junior Asia Pacific",
    lokasi: "Tennis Indoor Senayan",
    isSaved: false,
    cabor: "Tenis"
  },
  {
    id: 5,
    nama: "Kejuaraan Renang Nasional 2024",
    lokasi: "Aquatic Stadium GBK",
    isSaved: true,
    cabor: "Renang"
  }
])
</script>

<style scoped>
/* Custom scrollbar for horizontal scroll */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: rgba(89, 123, 249, 0.3);
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(89, 123, 249, 0.5);
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth scroll behavior */
.overflow-x-auto {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Enhanced glass morphism effect */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Custom focus styles */
input:focus {
  outline: none;
}

/* Enhance button press effects */
button:active {
  transform: scale(0.98);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: transform, background-color, border-color, box-shadow, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ensure dropdowns are always on top */
.dropdown-menu {
  position: absolute !important;
  z-index: 9999 !important;
}

/* Force higher z-index for all dropdowns */
[class*="z-"] {
  z-index: 9999 !important;
}

/* Hidden scrollbar for horizontal scroll */
.scrollbar-hide {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}
</style>