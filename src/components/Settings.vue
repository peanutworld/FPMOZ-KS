<template>
  <div
    class="m-6"
    :class="{
      'pl-64': isSidebarOpen && !isMobile,
      'pl-16': !isSidebarOpen && !isMobile,
      'pl-0': isMobile,
    }"
  >
    <!-- Settings Card -->
    <div
      :class="{
        'w-1/3': !isMobile,
        'w-full': isMobile,
      }"
      class="p-6 bg-gray-800 text-white rounded-lg shadow-lg"
    >
      <h2 class="text-2xl font-semibold mb-4">Settings</h2>
      <p class="text-gray-300">TODO: Implementation</p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from "vue";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
watch(width, () => {
  isMobile.value = width.value < 768;
});
const isMobile = ref(width.value < 768);
const isSidebarOpen = inject("isSidebarOpen");
</script>

<style scoped></style>
