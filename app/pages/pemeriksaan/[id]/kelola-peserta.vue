<template>
  <PageLayout>
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-2">
        <button
          @click="$router.back()"
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            class="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 class="text-xl font-semibold text-gray-800">
          Kelola Peserta Pemeriksaan
        </h1>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="mb-4 flex items-center gap-2">
      <div
        class="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 backdrop-blur"
      >
        <svg
          class="h-5 w-5 text-gray-400"
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
        <input
          v-model="search"
          type="text"
          placeholder="Cari peserta..."
          class="flex-1 text-[15px] bg-transparent outline-none placeholder:text-gray-400"
        />
      </div>
      <!-- Custom dropdown ala home.vue -->
      <div class="relative" style="position: relative; z-index: 1">
        <div
          @click="toggleJenisFilterDropdown"
          data-dropdown-trigger="filter-jenis"
          class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-3 pr-8 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] hover:shadow-md"
        >
          <span>{{ selectedJenisFilterLabel }}</span>
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
              :class="{ 'rotate-180': isJenisFilterOpen }"
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
              v-if="isJenisFilterOpen"
              class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99999] w-56"
              :style="getJenisFilterDropdownPosition()"
            >
              <div class="p-1">
                <div
                  v-for="opt in jenisFilterOptions"
                  :key="opt.value"
                  @click="selectJenisFilter(opt.value)"
                  class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer"
                  :class="{
                    'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                      jenis === opt.value,
                  }"
                >
                  <span>{{ opt.label }}</span>
                  <svg
                    v-if="jenis === opt.value"
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
      <p class="text-red-600 text-sm">{{ error }}</p>
    </div>
    <div v-else>
      <div v-if="items.length > 0" class="space-y-3">
        <div
          v-for="it in items"
          :key="it.id"
          class="rounded-2xl bg-white/90 p-4 border border-gray-100"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
              >
                <img
                  v-if="it.peserta.foto"
                  :src="it.peserta.foto"
                  class="w-full h-full object-cover"
                />
                <svg
                  v-else
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <div class="font-semibold text-gray-800">
                  {{ it.peserta.nama }}
                </div>
                <div class="text-xs text-gray-500 mt-1" v-if="it.status?.nama">
                  Status: <span class="font-medium">{{ it.status.nama }}</span>
                </div>
                <div class="text-xs text-gray-500 mt-1" v-if="it.catatan_umum">
                  Catatan:
                  <span class="font-medium">{{ it.catatan_umum }}</span>
                </div>
              </div>
            </div>
            <div class="relative" v-if="canManage">
              <button
                @click="activeMenu = activeMenu === it.id ? null : it.id"
                class="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                  />
                </svg>
              </button>
              <div
                v-if="activeMenu === it.id"
                class="dropdown-menu absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-[9999]"
                style="pointer-events: auto; z-index: 9999 !important"
              >
                <div class="py-2">
                  <button
                    @click="
                      () => {
                        activeMenu = null
                        openUpdate(it)
                      }
                    "
                    class="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span class="font-medium">Update Status/Catatan</span>
                  </button>
                  <button
                    @click="
                      () => {
                        activeMenu = null
                        confirmDelete(it.id)
                      }
                    "
                    class="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span class="font-medium">Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-12">
        Belum ada peserta.
      </div>
    </div>

    <!-- FAB Tambah Peserta -->
    <button
      v-if="canManage"
      @click="openBulkAdd"
      class="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#597BF9] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-[#4c6ef5] transition-colors z-50 transform"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>

    <!-- Modal Bulk Add -->
    <div
      v-if="showBulk"
      class="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center bg-black/40 p-3"
    >
      <div class="bg-white rounded-2xl w-full max-w-lg shadow-xl p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-700">Tambah Peserta</h3>
          <button @click="closeBulk" class="p-2 rounded-full hover:bg-gray-100">
            <svg
              class="w-5 h-5 text-gray-500"
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
        <div class="space-y-3 max-h-[60vh] overflow-y-auto">
          <div class="grid grid-cols-3 gap-2">
            <button :class="tabClass('atlet')" @click="tab = 'atlet'">
              Atlet
            </button>
            <button :class="tabClass('pelatih')" @click="tab = 'pelatih'">
              Pelatih
            </button>
            <button
              :class="tabClass('tenaga-pendukung')"
              @click="tab = 'tenaga-pendukung'"
            >
              Pendukung
            </button>
          </div>
          <div class="flex items-center gap-2">
            <div
              class="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2"
            >
              <svg
                class="h-4 w-4 text-gray-400"
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
              <input
                v-model="searchKandidat"
                type="text"
                placeholder="Cari peserta..."
                class="text-sm bg-transparent outline-none"
              />
            </div>
            <button
              class="px-3 py-2 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
              @click="selectAllKandidat"
            >
              Pilih Semua
            </button>
            <button
              class="px-3 py-2 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
              @click="clearAllKandidat"
            >
              Hapus Pilihan
            </button>
          </div>
          <div v-if="kandidatLoading" class="text-center py-6 text-sm">
            Memuat...
          </div>
          <div v-else class="space-y-2">
            <div
              v-for="k in kandidat"
              :key="k.id"
              class="flex items-center gap-3 p-3 bg-white rounded-xl border"
            >
              <input type="checkbox" :value="k.id" v-model="selectedIds" />
              <div
                class="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
              >
                <img
                  v-if="k.foto"
                  :src="k.foto"
                  class="w-full h-full object-cover"
                />
                <svg
                  v-else
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div class="text-sm">
                <div class="font-medium text-gray-800">{{ k.nama }}</div>
                <div class="text-xs text-gray-500">{{ k.posisi || '' }}</div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-2">
            <label class="text-sm font-medium text-gray-700"
              >Status Pemeriksaan (opsional)</label
            >
            <!-- Dropdown status pemeriksaan -->
            <div class="relative" style="position: relative; z-index: 9998">
              <div
                @click="toggleBulkStatusDropdown"
                data-dropdown-trigger="bulk-status"
                class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-2.5 pr-8 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] hover:shadow-md"
              >
                <span>{{ bulkSelectedStatusLabel }}</span>
                <div
                  class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
                >
                  <svg
                    class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
                    :class="{ 'rotate-180': isBulkStatusOpen }"
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
                    v-if="isBulkStatusOpen"
                    class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99998] w-64"
                    :style="getBulkStatusDropdownPosition()"
                  >
                    <div class="p-1">
                      <div
                        v-for="st in refStatusList"
                        :key="st.id"
                        @click="selectBulkStatus(st)"
                        class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer"
                        :class="{
                          'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                            bulk.statusId === st.id,
                        }"
                      >
                        <span>{{ st.nama }}</span>
                        <svg
                          v-if="bulk.statusId === st.id"
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
                        @click="clearBulkStatus()"
                        class="mt-1 w-full px-3 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        Kosongkan
                      </div>
                    </div>
                  </div>
                </transition>
              </Teleport>
            </div>
            <textarea
              v-model="bulk.catatan"
              rows="2"
              class="px-3 py-2 rounded-xl bg-gray-50 border text-sm"
              placeholder="Catatan umum (opsional)"
            ></textarea>
          </div>
        </div>
        <div class="flex gap-2 pt-4">
          <button
            @click="closeBulk"
            class="flex-1 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            @click="submitBulk"
            class="flex-1 px-4 py-2 rounded-xl bg-[#597BF9] text-white hover:bg-[#4c6ef5]"
            :disabled="selectedIds.length === 0"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Update Status/Catatan -->
    <div
      v-if="showUpdate"
      class="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center bg-black/40 p-3"
    >
      <div class="bg-white rounded-2xl w-full max-w-lg shadow-xl p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-700">
            Update Status/Catatan
          </h3>
          <button
            @click="closeUpdate"
            class="p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              class="w-5 h-5 text-gray-500"
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
        <div class="space-y-3">
          <div>
            <label class="text-sm font-medium text-gray-700"
              >Status Pemeriksaan</label
            >
            <div class="relative" style="position: relative; z-index: 9998">
              <div
                @click="toggleUpdateStatusDropdown"
                data-dropdown-trigger="update-status"
                class="relative cursor-pointer rounded-xl bg-gradient-to-r from-[#EBEFFE] to-[#E0E7FF] px-4 py-2.5 pr-8 text-sm font-semibold text-[#597BF9] border-2 border-transparent hover:border-[#597BF9]/30 focus:border-[#597BF9] hover:shadow-md"
              >
                <span>{{ updateSelectedStatusLabel }}</span>
                <div
                  class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
                >
                  <svg
                    class="h-4 w-4 text-[#597BF9] transition-transform duration-200"
                    :class="{ 'rotate-180': isUpdateStatusOpen }"
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
                    v-if="isUpdateStatusOpen"
                    class="fixed rounded-xl bg-white/95 backdrop-blur-md border border-white/50 ring-1 ring-black/5 z-[99998] w-64"
                    :style="getUpdateStatusDropdownPosition()"
                  >
                    <div class="p-1">
                      <div
                        v-for="st in refStatusList"
                        :key="st.id"
                        @click="selectUpdateStatus(st)"
                        class="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-[#597BF9]/10 hover:to-[#4c6ef5]/10 hover:text-[#597BF9] cursor-pointer"
                        :class="{
                          'bg-gradient-to-r from-[#597BF9]/20 to-[#4c6ef5]/20 text-[#597BF9]':
                            updateForm.statusId === st.id,
                        }"
                      >
                        <span>{{ st.nama }}</span>
                        <svg
                          v-if="updateForm.statusId === st.id"
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
                        @click="clearUpdateStatus()"
                        class="mt-1 w-full px-3 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        Kosongkan
                      </div>
                    </div>
                  </div>
                </transition>
              </Teleport>
            </div>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">Catatan</label>
            <textarea
              v-model="updateForm.catatan"
              rows="3"
              class="w-full px-3 py-2 rounded-xl bg-gray-50 border text-sm"
              placeholder="Catatan"
            ></textarea>
          </div>
        </div>
        <div class="flex gap-2 pt-4">
          <button
            @click="closeUpdate"
            class="flex-1 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            @click="submitUpdate"
            class="flex-1 px-4 py-2 rounded-xl bg-[#597BF9] text-white hover:bg-[#4c6ef5]"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>

    <!-- Alert -->
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
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PageLayout from '~/components/PageLayout.vue'
import Alert from '~/components/Alert.vue'
import { useAuth } from '../../../../composables/useAuth'
import { useAlert } from '../../../../composables/useAlert'
import { usePemeriksaanPesertaCrud } from '../../../../composables/usePemeriksaanPesertaCrud'

const route = useRoute()
const router = useRouter()
const pemeriksaanId = computed(() => parseInt(route.params.id as string))
const { user, initAuth } = useAuth()
const canManage = computed(() => {
  if (!user.value) return false
  const allowed = [1, 11, 37]
  return allowed.includes(user.value.current_role?.id)
})

const {
  showAlert,
  alertConfig,
  showConfirm,
  hideAlert,
  handleConfirm,
  handleCancel,
} = useAlert()
const {
  items,
  loading,
  error,
  fetchList,
  bulkAdd,
  updatePeserta,
  deletePeserta,
  fetchKandidat,
  fetchRefStatus,
  refStatusList,
} = usePemeriksaanPesertaCrud()

const jenis = ref('')
const search = ref('')
let sDeb: any
watch([jenis, search], () => {
  clearTimeout(sDeb)
  sDeb = setTimeout(
    () => fetchList(pemeriksaanId.value, jenis.value, search.value),
    300
  )
})

const activeMenu = ref<number | null>(null)

// Bulk add modal state
const showBulk = ref(false)
const tab = ref<'atlet' | 'pelatih' | 'tenaga-pendukung'>('atlet')
const kandidat = ref<any[]>([])
const kandidatLoading = ref(false)
const searchKandidat = ref('')
const selectedIds = ref<number[]>([])
const bulk = ref<{ statusId: number | null; catatan: string | null }>({
  statusId: null,
  catatan: null,
})
let kDeb: any
watch([tab, searchKandidat], () => {
  loadKandidat()
})

const tabClass = (t: string) =>
  t === tab.value
    ? 'px-3 py-2 rounded-xl bg-[#597BF9] text-white text-sm'
    : 'px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm'

const openBulkAdd = () => {
  showBulk.value = true
  selectedIds.value = []
  searchKandidat.value = ''
  loadKandidat()
}
const closeBulk = () => {
  showBulk.value = false
}

const loadKandidat = async () => {
  kandidatLoading.value = true
  try {
    kandidat.value = await fetchKandidat(
      pemeriksaanId.value,
      tab.value,
      searchKandidat.value
    )
  } finally {
    kandidatLoading.value = false
  }
}

const selectAllKandidat = () => {
  selectedIds.value = kandidat.value.map((k: any) => k.id)
}
const clearAllKandidat = () => {
  selectedIds.value = []
}

const submitBulk = async () => {
  const payload: any = {
    atlet_ids: [],
    pelatih_ids: [],
    tenaga_pendukung_ids: [],
  }
  if (tab.value === 'atlet') payload.atlet_ids = selectedIds.value
  if (tab.value === 'pelatih') payload.pelatih_ids = selectedIds.value
  if (tab.value === 'tenaga-pendukung')
    payload.tenaga_pendukung_ids = selectedIds.value
  if (bulk.value.statusId)
    payload.ref_status_pemeriksaan_id = bulk.value.statusId
  if (bulk.value.catatan) payload.catatan_umum = bulk.value.catatan
  await bulkAdd(pemeriksaanId.value, payload)
  showBulk.value = false
  await fetchList(pemeriksaanId.value, jenis.value, search.value)
}

// Update modal state & logic
const showUpdate = ref(false)
const updateForm = ref<{
  id: number | null
  statusId: number | null
  catatan: string | null
}>({ id: null, statusId: null, catatan: null })

const openUpdate = (it: any) => {
  updateForm.value = {
    id: it.id,
    statusId: it.status?.id || null,
    catatan: it.catatan_umum || '',
  }
  showUpdate.value = true
}

const closeUpdate = () => {
  showUpdate.value = false
}

const submitUpdate = async () => {
  if (!updateForm.value.id) return
  await updatePeserta(pemeriksaanId.value, updateForm.value.id, {
    ref_status_pemeriksaan_id: updateForm.value.statusId,
    catatan_umum: updateForm.value.catatan || null,
  })
  showUpdate.value = false
  await fetchList(pemeriksaanId.value, jenis.value, search.value)
}

const confirmDelete = (id: number) => {
  showConfirm({
    title: 'Hapus Peserta',
    message: 'Yakin ingin menghapus peserta dari pemeriksaan?',
    type: 'warning',
    confirmText: 'Hapus',
    cancelText: 'Batal',
    onConfirm: async () => {
      await deletePeserta(pemeriksaanId.value, id)
      await fetchList(pemeriksaanId.value, jenis.value, search.value)
    },
  })
}

onMounted(async () => {
  initAuth()
  await Promise.all([fetchList(pemeriksaanId.value), fetchRefStatus()])
})

// --- UI State: Filter Jenis ala home.vue ---
const isJenisFilterOpen = ref(false)
const jenisFilterOptions = [
  { value: '', label: 'Semua Peserta' },
  { value: 'atlet', label: 'Atlet' },
  { value: 'pelatih', label: 'Pelatih' },
  { value: 'tenaga-pendukung', label: 'Tenaga Pendukung' },
]
const selectedJenisFilterLabel = computed(
  () =>
    jenisFilterOptions.find((o) => o.value === jenis.value)?.label ||
    'Semua Peserta'
)
const toggleJenisFilterDropdown = () => {
  isJenisFilterOpen.value = !isJenisFilterOpen.value
}
const selectJenisFilter = (val: string) => {
  jenis.value = val
  isJenisFilterOpen.value = false
}
const getJenisFilterDropdownPosition = () => {
  const el = document.querySelector(
    '[data-dropdown-trigger="filter-jenis"]'
  ) as HTMLElement | null
  if (!el) return { top: '100px', left: '20px' }
  const r = el.getBoundingClientRect()
  return { top: `${r.bottom + 8}px`, left: `${r.left}px` }
}

// --- UI State: Bulk Status Dropdown ---
const isBulkStatusOpen = ref(false)
const bulkSelectedStatusLabel = computed(() => {
  if (!bulk.value.statusId) return 'Pilih Status Pemeriksaan (opsional)'
  const f = refStatusList.value.find((x: any) => x.id === bulk.value.statusId)
  return f?.nama || 'Pilih Status Pemeriksaan (opsional)'
})
const toggleBulkStatusDropdown = () => {
  isBulkStatusOpen.value = !isBulkStatusOpen.value
}
const selectBulkStatus = (st: any) => {
  bulk.value.statusId = st.id
  isBulkStatusOpen.value = false
}
const clearBulkStatus = () => {
  bulk.value.statusId = null
  isBulkStatusOpen.value = false
}
const getBulkStatusDropdownPosition = () => {
  const el = document.querySelector(
    '[data-dropdown-trigger="bulk-status"]'
  ) as HTMLElement | null
  if (!el) return { top: '150px', left: '20px' }
  const r = el.getBoundingClientRect()
  const vw = typeof window !== 'undefined' ? window.innerWidth : 360
  const vh = typeof window !== 'undefined' ? window.innerHeight : 640
  const menuW = 256 // w-64
  const menuH = 260 // perkiraan tinggi konten
  // Posisi dasar di bawah trigger
  let top = r.bottom + 8
  // Jika tidak muat di bawah, tampilkan di atas
  if (top + menuH > vh - 8) {
    top = Math.max(8, r.top - menuH - 8)
  }
  // Clamp horizontal agar tidak keluar layar
  let left = Math.min(Math.max(8, r.left), vw - menuW - 8)
  return { top: `${top}px`, left: `${left}px` }
}

// --- UI State: Update Status Dropdown ---
const isUpdateStatusOpen = ref(false)
const updateSelectedStatusLabel = computed(() => {
  if (!updateForm.value.statusId) return 'Pilih Status Pemeriksaan'
  const f = refStatusList.value.find(
    (x: any) => x.id === updateForm.value.statusId
  )
  return f?.nama || 'Pilih Status Pemeriksaan'
})
const toggleUpdateStatusDropdown = () => {
  isUpdateStatusOpen.value = !isUpdateStatusOpen.value
}
const selectUpdateStatus = (st: any) => {
  updateForm.value.statusId = st.id
  isUpdateStatusOpen.value = false
}
const clearUpdateStatus = () => {
  updateForm.value.statusId = null
  isUpdateStatusOpen.value = false
}
const getUpdateStatusDropdownPosition = () => {
  const el = document.querySelector(
    '[data-dropdown-trigger="update-status"]'
  ) as HTMLElement | null
  if (!el) return { top: '150px', left: '20px' }
  const r = el.getBoundingClientRect()
  const vw = typeof window !== 'undefined' ? window.innerWidth : 360
  const vh = typeof window !== 'undefined' ? window.innerHeight : 640
  const menuW = 256 // w-64
  const menuH = 260 // perkiraan tinggi konten
  let top = r.bottom + 8
  if (top + menuH > vh - 8) {
    top = Math.max(8, r.top - menuH - 8)
  }
  let left = Math.min(Math.max(8, r.left), vw - menuW - 8)
  return { top: `${top}px`, left: `${left}px` }
}
</script>
