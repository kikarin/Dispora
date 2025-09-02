<template>
  <div class="min-h-screen">
    <div
      class="mx-auto flex min-h-screen w-full max-w-[410px] flex-col px-4 py-4"
      style="
        background: linear-gradient(
          180deg,
          rgb(238, 241, 255) 0%,
          rgb(236, 245, 249) 75%,
          rgb(245, 252, 255) 100%
        );
      "
    >
      <!-- Slot untuk konten halaman -->
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// Layout ini tidak memerlukan bottom navigation
</script>
