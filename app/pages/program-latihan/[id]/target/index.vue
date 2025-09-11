<template>
  <PageLayout>
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-md font-bold text-gray-700">Target Latihan</h1>
      <button
        @click="router.push(`/program-latihan/${programId}/target/create`)"
        class="px-4 py-2 bg-[#597BF9] text-white rounded-xl text-sm font-semibold hover:bg-[#4c6ef5] transition-colors"
      >
        Tambah Target
      </button>
    </div>

    <!-- Filters (no search, reactive) -->
    <div class="mb-4 flex gap-2 items-center">
      <!-- Jenis Target Dropdown -->
      <div class="relative" style="position: relative; z-index: 9999">
        <div
          @click="toggleJenisDropdown"
          data-dropdown-trigger="jenis"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#bac8fc] to-[#c8d3fd] px-4 py-3 pr-8 text-sm font-semibold text-gray-700 border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] hover:shadow-md"
        >
          <span>{{ selectedJenisLabel }}</span>
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-gray-700 transition-transform duration-200"
              :class="{ 'rotate-180': isJenisDropdownOpen }"
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
              v-if="isJenisDropdownOpen"
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99999] w-48"
              :style="getJenisDropdownPosition()"
            >
              <div class="p-1">
                <div
                  v-for="opt in jenisOptions"
                  :key="opt.value"
                  @click="selectJenis(opt.value)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-[#597BF9]/10 hover:text-[#597BF9] cursor-pointer"
                  :class="{
                    'bg-[#597BF9]/20 text-[#597BF9]': jenisTarget === opt.value,
                  }"
                >
                  <span>{{ opt.label }}</span>
                  <svg
                    v-if="jenisTarget === opt.value"
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

      <!-- Peruntukan Dropdown -->
      <div class="relative" style="position: relative; z-index: 9998">
        <div
          @click="togglePeruntukanDropdown"
          data-dropdown-trigger="peruntukan"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-8 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] hover:shadow-md"
          :class="{
            'opacity-50 cursor-not-allowed': jenisTarget !== 'individu',
          }"
        >
          <span>{{ selectedPeruntukanLabel }}</span>
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
              :class="{ 'rotate-180': isPeruntukanDropdownOpen }"
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
              v-if="isPeruntukanDropdownOpen && jenisTarget === 'individu'"
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99998] w-56"
              :style="getPeruntukanDropdownPosition()"
            >
              <div class="p-1">
                <div
                  v-for="opt in peruntukanOptions"
                  :key="opt.value"
                  @click="selectPeruntukan(opt.value)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-[#597BF9]/10 hover:text-[#597BF9] cursor-pointer"
                  :class="{
                    'bg-[#597BF9]/20 text-[#597BF9]': peruntukan === opt.value,
                  }"
                >
                  <span>{{ opt.label }}</span>
                  <svg
                    v-if="peruntukan === opt.value"
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
      <button
        @click="resetFilters"
        class="px-3 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold text-sm"
      >
        Reset
      </button>
    </div>

    <!-- List -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#597BF9]"
      ></div>
    </div>
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4"
    >
      <p class="text-red-600">{{ error }}</p>
    </div>
    <div v-else>
      <div v-if="items.length > 0" class="space-y-3">
        <div
          v-for="item in items"
          :key="item.id"
          class="rounded-2xl bg-white/90 p-4 border border-gray-100"
        >
          <div class="flex items-start justify-between">
            <div>
              <div class="font-semibold text-gray-800">
                {{ item.deskripsi }}
              </div>
              <div class="text-xs text-gray-500 mt-1">
                Jenis: <span class="font-medium">{{ item.jenis_target }}</span>
                <span v-if="item.peruntukan"
                  >• Peruntukan:
                  <span class="font-medium">{{ item.peruntukan }}</span></span
                >
              </div>
              <div class="text-xs text-gray-500 mt-1" v-if="item.satuan">
                Satuan: <span class="font-medium">{{ item.satuan }}</span>
              </div>
              <div class="text-xs text-gray-500 mt-1" v-if="item.nilai_target">
                Nilai Target:
                <span class="font-medium">{{ item.nilai_target }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                @click="editItem(item.id)"
                class="px-3 py-1.5 text-xs rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                Edit
              </button>
              <button
                @click="deleteItem(item.id, item.deskripsi)"
                class="px-3 py-1.5 text-xs rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-12">
        Belum ada target latihan.
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex justify-center items-center gap-2 mt-6"
      >
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-2 bg-white border rounded-md disabled:opacity-50"
        >
          Sebelumnya
        </button>
        <span class="">{{ currentPage }} dari {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 bg-white border rounded-md disabled:opacity-50"
        >
          Selanjutnya
        </button>
      </div>
    </div>

    <!-- Alert Component -->
    <Alert
      :show-alert="showAlert"
      :alert-config="alertConfig"
      @hide="hideAlert"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import { useProgramTargetLatihan } from '../../../../../composables/useProgramTargetLatihan'
import Alert from '~/components/Alert.vue'
import { useAlert } from '../../../../../composables/useAlert'

const router = useRouter()
const route = useRoute()
const programId = computed(() => parseInt(route.params.id as string))

const {
  items,
  loading,
  error,
  currentPage,
  totalPages,
  searchQuery,
  jenisTarget,
  peruntukan,
  fetchTargets,
  deleteTarget,
} = useProgramTargetLatihan()

// alert handlers
const {
  showAlert,
  alertConfig,
  showConfirm,
  hideAlert,
  handleConfirm,
  handleCancel,
} = useAlert()

// Dropdown UI state & options
const isJenisDropdownOpen = ref(false)
const isPeruntukanDropdownOpen = ref(false)
const jenisOptions = [
  { value: '', label: 'Semua' },
  { value: 'individu', label: 'Individu' },
  { value: 'kelompok', label: 'Kelompok' },
]
const peruntukanOptions = [
  { value: '', label: 'Peruntukan' },
  { value: 'atlet', label: 'Atlet' },
  { value: 'pelatih', label: 'Pelatih' },
  { value: 'tenaga-pendukung', label: 'Tenaga Pendukung' },
]

const selectedJenisLabel = computed(
  () =>
    jenisOptions.find((o) => o.value === jenisTarget.value)?.label ||
    'Semua Jenis'
)
const selectedPeruntukanLabel = computed(() => {
  if (jenisTarget.value !== 'individu') return 'Peruntukan'
  return (
    peruntukanOptions.find((o) => o.value === peruntukan.value)?.label ||
    'Semua Peruntukan'
  )
})

const toggleJenisDropdown = () => {
  isJenisDropdownOpen.value = !isJenisDropdownOpen.value
  if (isJenisDropdownOpen.value) isPeruntukanDropdownOpen.value = false
}
const togglePeruntukanDropdown = () => {
  if (jenisTarget.value !== 'individu') return
  isPeruntukanDropdownOpen.value = !isPeruntukanDropdownOpen.value
  if (isPeruntukanDropdownOpen.value) isJenisDropdownOpen.value = false
}
const selectJenis = (val: string) => {
  jenisTarget.value = val
  if (val !== 'individu') peruntukan.value = ''
  isJenisDropdownOpen.value = false
}
const selectPeruntukan = (val: string) => {
  peruntukan.value = val
  isPeruntukanDropdownOpen.value = false
}

// Dropdown positioning like home.vue
const getJenisDropdownPosition = () => {
  const el = document.querySelector(
    '[data-dropdown-trigger="jenis"]'
  ) as HTMLElement | null
  if (!el) return { top: '100px', left: '20px' }
  const r = el.getBoundingClientRect()
  return { top: `${r.bottom + 8}px`, left: `${r.left}px` }
}
const getPeruntukanDropdownPosition = () => {
  const el = document.querySelector(
    '[data-dropdown-trigger="peruntukan"]'
  ) as HTMLElement | null
  if (!el) return { top: '100px', left: '20px' }
  const r = el.getBoundingClientRect()
  return { top: `${r.bottom + 8}px`, left: `${r.left}px` }
}

// reactive filtering: fetch whenever filters change
watch([jenisTarget, peruntukan], () => {
  fetchTargets(programId.value, 1)
})

const resetFilters = () => {
  jenisTarget.value = ''
  peruntukan.value = ''
  fetchTargets(programId.value, 1)
}

const applyFilters = () => fetchTargets(programId.value, 1)

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    fetchTargets(programId.value, currentPage.value + 1)
  }
}
const prevPage = () => {
  if (currentPage.value > 1) {
    fetchTargets(programId.value, currentPage.value - 1)
  }
}

const editItem = (id: number) => {
  router.push(`/program-latihan/${programId.value}/target/edit/${id}`)
}

const deleteItem = (id: number, name: string) => {
  showConfirm({
    title: 'Konfirmasi Hapus',
    message: `Hapus target "${name}"?`,
    type: 'warning',
    confirmText: 'Hapus',
    cancelText: 'Batal',
    onConfirm: async () => {
      const ok = await deleteTarget(id)
      if (ok) {
        await fetchTargets(programId.value, currentPage.value)
      }
    },
  })
}

onMounted(async () => {
  await fetchTargets(programId.value)
})
</script>
