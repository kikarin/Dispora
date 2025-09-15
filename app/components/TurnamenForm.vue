<template>
  <div class="space-y-6">
    <!-- Cabor Kategori Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Cabor Kategori <span class="text-red-500">*</span>
      </label>
      <div class="relative" style="position: relative; z-index: 9999">
        <div
          @click="toggleCaborKategoriDropdown"
          data-dropdown-trigger="cabor-kategori"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-10 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{ 'opacity-50': loading }"
        >
          <span>{{ selectedCaborKategori.label }}</span>
          <!-- Animated arrow icon -->
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
              :class="{ 'rotate-180': isCaborKategoriDropdownOpen }"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
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
              v-if="isCaborKategoriDropdownOpen"
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99999] w-64"
              :style="getCaborKategoriDropdownPosition()"
            >
              <div class="p-1">
                <div
                  v-for="item in caborKategoriList"
                  :key="item.id"
                  @click="selectCaborKategori(item)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  :class="{
                    'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                      selectedCaborKategori.value === item.id,
                  }"
                >
                  <div class="flex-1">
                    <div class="font-medium">{{ item.cabor.nama }}</div>
                    <div class="text-xs text-gray-500">{{ item.nama }}</div>
                  </div>
                  <!-- Check mark for selected option -->
                  <svg
                    v-if="selectedCaborKategori.value === item.id"
                    class="ml-auto h-4 w-4 text-[#597BF9]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </transition>
        </Teleport>
      </div>
      <p v-if="errors.cabor_kategori_id" class="mt-1 text-sm text-red-600">
        {{ errors.cabor_kategori_id }}
      </p>
    </div>

    <!-- Nama Turnamen -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Nama Turnamen <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <input
          v-model="formData.nama"
          type="text"
          placeholder="Masukkan nama turnamen"
          class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 placeholder:text-gray-500 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] focus:outline-none transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{ 'opacity-50': loading }"
          :disabled="loading"
        />
        <!-- Input icon -->
        <div
          class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-[#597BF9]"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
      </div>
      <p v-if="errors.nama" class="mt-1 text-sm text-red-600">
        {{ errors.nama }}
      </p>
    </div>

    <!-- Tanggal Mulai -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Tanggal Mulai <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <input
          v-model="formData.tanggal_mulai"
          type="date"
          class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] focus:outline-none transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{ 'opacity-50': loading }"
          :disabled="loading"
        />
        <!-- Calendar icon -->
        <div
          class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-[#597BF9]"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
      <p v-if="errors.tanggal_mulai" class="mt-1 text-sm text-red-600">
        {{ errors.tanggal_mulai }}
      </p>
    </div>

    <!-- Tanggal Selesai -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Tanggal Selesai <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <input
          v-model="formData.tanggal_selesai"
          type="date"
          class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] focus:outline-none transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{ 'opacity-50': loading }"
          :disabled="loading"
          :min="formData.tanggal_mulai"
        />
        <!-- Calendar icon -->
        <div
          class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-[#597BF9]"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
      <p v-if="errors.tanggal_selesai" class="mt-1 text-sm text-red-600">
        {{ errors.tanggal_selesai }}
      </p>
    </div>

    <!-- Tingkat -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Tingkat <span class="text-red-500">*</span>
      </label>
      <div class="relative" style="position: relative; z-index: 9998">
        <div
          @click="toggleTingkatDropdown"
          data-dropdown-trigger="tingkat"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-10 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{ 'opacity-50': loading }"
        >
          <span>{{ selectedTingkat.label }}</span>
          <!-- Animated arrow icon -->
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
              :class="{ 'rotate-180': isTingkatDropdownOpen }"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
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
              v-if="isTingkatDropdownOpen"
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99998] w-64"
              :style="getTingkatDropdownPosition()"
            >
              <div class="p-1">
                <div
                  v-for="tingkat in tingkatList"
                  :key="tingkat.id"
                  @click="selectTingkat(tingkat)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  :class="{
                    'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                      selectedTingkat.value === tingkat.id,
                  }"
                >
                  <span>{{ tingkat.nama }}</span>
                  <!-- Check mark for selected option -->
                  <svg
                    v-if="selectedTingkat.value === tingkat.id"
                    class="ml-auto h-4 w-4 text-[#597BF9]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </transition>
        </Teleport>
      </div>
      <p v-if="errors.tingkat_id" class="mt-1 text-sm text-red-600">
        {{ errors.tingkat_id }}
      </p>
    </div>

    <!-- Lokasi -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Lokasi <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <input
          v-model="formData.lokasi"
          type="text"
          placeholder="Masukkan lokasi turnamen"
          class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 placeholder:text-gray-500 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] focus:outline-none transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{ 'opacity-50': loading }"
          :disabled="loading"
        />
        <!-- Input icon -->
        <div
          class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-[#597BF9]"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>
      <p v-if="errors.lokasi" class="mt-1 text-sm text-red-600">
        {{ errors.lokasi }}
      </p>
    </div>

    <!-- Juara -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Juara <span class="text-gray-400 text-xs">(Opsional)</span>
      </label>
      <div class="relative" style="position: relative; z-index: 9997">
        <div
          @click="toggleJuaraDropdown"
          data-dropdown-trigger="juara"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-10 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{ 'opacity-50': loading }"
        >
          <span>{{ selectedJuara.label }}</span>
          <!-- Animated arrow icon -->
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
              :class="{ 'rotate-180': isJuaraDropdownOpen }"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
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
              v-if="isJuaraDropdownOpen"
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99997] w-64"
              :style="getJuaraDropdownPosition()"
            >
              <div class="p-1">
                <div
                  @click="selectJuara({ id: null, nama: 'Tidak ada' })"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  :class="{
                    'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                      selectedJuara.value === null,
                  }"
                >
                  <span>Tidak ada</span>
                  <!-- Check mark for selected option -->
                  <svg
                    v-if="selectedJuara.value === null"
                    class="ml-auto h-4 w-4 text-[#597BF9]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  v-for="juara in juaraList"
                  :key="juara.id"
                  @click="selectJuara(juara)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  :class="{
                    'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                      selectedJuara.value === juara.id,
                  }"
                >
                  <span>{{ juara.nama }}</span>
                  <!-- Check mark for selected option -->
                  <svg
                    v-if="selectedJuara.value === juara.id"
                    class="ml-auto h-4 w-4 text-[#597BF9]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </transition>
        </Teleport>
      </div>
      <p v-if="errors.juara_id" class="mt-1 text-sm text-red-600">
        {{ errors.juara_id }}
      </p>
    </div>

    <!-- Hasil -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Hasil <span class="text-gray-400 text-xs">(Opsional)</span>
      </label>
      <div class="relative">
        <input
          v-model="formData.hasil"
          type="text"
          placeholder="Masukkan hasil turnamen"
          class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 placeholder:text-gray-500 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] focus:outline-none transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          :class="{ 'opacity-50': loading }"
          :disabled="loading"
        />
        <!-- Input icon -->
        <div
          class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-[#597BF9]"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
      </div>
      <p v-if="errors.hasil" class="mt-1 text-sm text-red-600">
        {{ errors.hasil }}
      </p>
    </div>

    <!-- Evaluasi -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Evaluasi <span class="text-gray-400 text-xs">(Opsional)</span>
      </label>
      <div class="relative">
        <textarea
          v-model="formData.evaluasi"
          rows="3"
          placeholder="Masukkan evaluasi turnamen (opsional)"
          class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] text-sm font-medium text-gray-700 placeholder:text-gray-500 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] focus:outline-none transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] resize-none"
          :class="{ 'opacity-50': loading }"
          :disabled="loading"
        ></textarea>
        <!-- Textarea icon -->
        <div class="absolute top-3 right-3 pointer-events-none">
          <svg
            class="h-5 w-5 text-[#597BF9]"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </div>
      </div>
      <p v-if="errors.evaluasi" class="mt-1 text-sm text-red-600">
        {{ errors.evaluasi }}
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3 pt-6">
      <button
        @click="$emit('cancel')"
        type="button"
        class="flex-1 px-6 py-3 text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        :disabled="loading"
      >
        Batal
      </button>
      <button
        @click="handleSubmit"
        type="button"
        class="flex-1 px-6 py-3 bg-gradient-to-r from-[#597BF9] to-[#4c6ef5] text-white rounded-xl font-semibold hover:from-[#4c6ef5] hover:to-[#3b5bdb] transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="loading || !isFormValid"
      >
        <span v-if="loading" class="flex items-center justify-center">
          <div
            class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
          ></div>
          Menyimpan...
        </span>
        <span v-else>{{ isEdit ? 'Update' : 'Simpan' }}</span>
      </button>
    </div>

    <!-- Click outside handler for dropdowns -->
    <div
      v-if="isCaborKategoriDropdownOpen || isTingkatDropdownOpen || isJuaraDropdownOpen"
      @click="closeAllDropdowns"
      class="fixed inset-0 z-30"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useTurnamenForm } from '../../composables/useTurnamenForm'

interface FormData {
  cabor_kategori_id: number | null
  nama: string
  tanggal_mulai: string
  tanggal_selesai: string
  tingkat_id: number | null
  lokasi: string
  juara_id: number | null
  hasil: string
  evaluasi: string
  atlet_ids: number[]
  pelatih_ids: number[]
  tenaga_pendukung_ids: number[]
}

interface Props {
  initialData?: Partial<FormData>
  loading?: boolean
  isEdit?: boolean
}

interface Emits {
  (e: 'submit', data: FormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  isEdit: false,
})

const emit = defineEmits<Emits>()

// Use form composable
const {
  loading: formLoading,
  error: formError,
  caborKategoriList,
  tingkatList,
  juaraList,
  fetchCaborKategoriList,
  fetchTingkatList,
  fetchJuaraList,
} = useTurnamenForm()

// Form data
const formData = ref<FormData>({
  cabor_kategori_id: null,
  nama: '',
  tanggal_mulai: '',
  tanggal_selesai: '',
  tingkat_id: null,
  lokasi: '',
  juara_id: null,
  hasil: '',
  evaluasi: '',
  atlet_ids: [],
  pelatih_ids: [],
  tenaga_pendukung_ids: [],
})

// Errors
const errors = ref<Partial<Record<keyof FormData, string>>>({})

// Dropdown states
const isCaborKategoriDropdownOpen = ref(false)
const isTingkatDropdownOpen = ref(false)
const isJuaraDropdownOpen = ref(false)

// Computed
const loading = computed(() => props.loading || formLoading.value)

const isFormValid = computed(() => {
  return !!(
    formData.value.cabor_kategori_id &&
    formData.value.nama &&
    formData.value.tanggal_mulai &&
    formData.value.tanggal_selesai &&
    formData.value.tingkat_id &&
    formData.value.lokasi
  )
})

// Selected options for dropdowns
const selectedCaborKategori = computed(() => {
  const item = caborKategoriList.value.find((c) => c.id === formData.value.cabor_kategori_id)
  return item
    ? { value: item.id, label: `${item.cabor.nama} - ${item.nama}` }
    : { value: null, label: 'Pilih Cabor Kategori' }
})

const selectedTingkat = computed(() => {
  const tingkat = tingkatList.value.find((t) => t.id === formData.value.tingkat_id)
  return tingkat
    ? { value: tingkat.id, label: tingkat.nama }
    : { value: null, label: 'Pilih Tingkat' }
})

const selectedJuara = computed(() => {
  if (formData.value.juara_id === null) {
    return { value: null, label: 'Tidak ada' }
  }
  const juara = juaraList.value.find((j) => j.id === formData.value.juara_id)
  return juara
    ? { value: juara.id, label: juara.nama }
    : { value: null, label: 'Tidak ada' }
})

// Methods
const toggleCaborKategoriDropdown = () => {
  if (props.loading) return
  isCaborKategoriDropdownOpen.value = !isCaborKategoriDropdownOpen.value
  if (isCaborKategoriDropdownOpen.value) {
    isTingkatDropdownOpen.value = false
    isJuaraDropdownOpen.value = false
  }
}

const toggleTingkatDropdown = () => {
  if (props.loading) return
  isTingkatDropdownOpen.value = !isTingkatDropdownOpen.value
  if (isTingkatDropdownOpen.value) {
    isCaborKategoriDropdownOpen.value = false
    isJuaraDropdownOpen.value = false
  }
}

const toggleJuaraDropdown = () => {
  if (props.loading) return
  isJuaraDropdownOpen.value = !isJuaraDropdownOpen.value
  if (isJuaraDropdownOpen.value) {
    isCaborKategoriDropdownOpen.value = false
    isTingkatDropdownOpen.value = false
  }
}

const selectCaborKategori = (item: any) => {
  formData.value.cabor_kategori_id = item.id
  errors.value.cabor_kategori_id = ''
  isCaborKategoriDropdownOpen.value = false
}

const selectTingkat = (tingkat: any) => {
  formData.value.tingkat_id = tingkat.id
  errors.value.tingkat_id = ''
  isTingkatDropdownOpen.value = false
}

const selectJuara = (juara: any) => {
  formData.value.juara_id = juara.id
  errors.value.juara_id = ''
  isJuaraDropdownOpen.value = false
}

// Position calculation functions
const getCaborKategoriDropdownPosition = () => {
  const trigger = document.querySelector('[data-dropdown-trigger="cabor-kategori"]')
  if (trigger) {
    const rect = trigger.getBoundingClientRect()
    return {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
    }
  }
  return {
    top: '100px',
    left: '20px',
  }
}

const getTingkatDropdownPosition = () => {
  const trigger = document.querySelector('[data-dropdown-trigger="tingkat"]')
  if (trigger) {
    const rect = trigger.getBoundingClientRect()
    return {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
    }
  }
  return {
    top: '150px',
    left: '20px',
  }
}

const getJuaraDropdownPosition = () => {
  const trigger = document.querySelector('[data-dropdown-trigger="juara"]')
  if (trigger) {
    const rect = trigger.getBoundingClientRect()
    return {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
    }
  }
  return {
    top: '200px',
    left: '20px',
  }
}

// Close dropdowns when clicking outside
const closeAllDropdowns = () => {
  isCaborKategoriDropdownOpen.value = false
  isTingkatDropdownOpen.value = false
  isJuaraDropdownOpen.value = false
}

// Close dropdowns on escape key
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeAllDropdowns()
  }
}

const validateForm = (): boolean => {
  errors.value = {}
  let isValid = true

  if (!formData.value.cabor_kategori_id) {
    errors.value.cabor_kategori_id = 'Cabor kategori harus dipilih'
    isValid = false
  }

  if (!formData.value.nama.trim()) {
    errors.value.nama = 'Nama turnamen harus diisi'
    isValid = false
  }

  if (!formData.value.tanggal_mulai) {
    errors.value.tanggal_mulai = 'Tanggal mulai harus diisi'
    isValid = false
  }

  if (!formData.value.tanggal_selesai) {
    errors.value.tanggal_selesai = 'Tanggal selesai harus diisi'
    isValid = false
  }

  if (formData.value.tanggal_mulai && formData.value.tanggal_selesai) {
    const startDate = new Date(formData.value.tanggal_mulai)
    const endDate = new Date(formData.value.tanggal_selesai)

    if (startDate > endDate) {
      errors.value.tanggal_selesai = 'Tanggal selesai harus setelah atau sama dengan tanggal mulai'
      isValid = false
    }
  }

  if (!formData.value.tingkat_id) {
    errors.value.tingkat_id = 'Tingkat harus dipilih'
    isValid = false
  }

  if (!formData.value.lokasi.trim()) {
    errors.value.lokasi = 'Lokasi harus diisi'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return

  emit('submit', { ...formData.value })
}

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = { ...formData.value, ...newData }
    }
  },
  { immediate: true, deep: true }
)

// Initialize form data
onMounted(async () => {
  if (props.initialData) {
    formData.value = { ...formData.value, ...props.initialData }
  }

  // Load form data
  try {
    await Promise.all([
      fetchCaborKategoriList(),
      fetchTingkatList(),
      fetchJuaraList(),
    ])
  } catch (err) {
    console.error('Error loading form data:', err)
  }

  // Add event listeners
  document.addEventListener('keydown', handleEscapeKey)
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (!target.closest('[data-dropdown-trigger]')) {
      closeAllDropdowns()
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style scoped>
/* Custom focus styles for all inputs */
input:focus,
textarea:focus {
  outline: none;
}

/* Enhanced glass morphism effect */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property:
    transform, background-color, border-color, box-shadow, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ensure dropdowns are always on top */
[class*='z-'] {
  z-index: 9999 !important;
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(89, 123, 249, 0.3);
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(89, 123, 249, 0.5);
}

/* Date input styling */
input[type='date']::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* Ensure proper spacing and alignment */
.space-y-6 > * + * {
  margin-top: 1.5rem;
}
</style>
