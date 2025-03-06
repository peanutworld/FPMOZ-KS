<template>
  <div
    :class="{
      'w-63': isSidebarOpen && !isMobile, // sidebar opened on desktop
      'w-full': isSidebarOpen && isMobile, // sidebar full width on mobile
      'w-16': !isSidebarOpen, // sidebar closed on desktop
      'h-full': !isMobile, // full height on desktop
      hidden: !isSidebarOpen && isMobile, // hide on mobile when sidebar is closed
    }"
    class="fixed mt-18 left-0 z-20 bg-gray-900 text-white shadow-lg border-r border-white/20 transition-all duration-300"
  >
    <ul class="mt-3">
      <li
        @click="selectMenu(1)"
        :class="{
          'bg-gray-700': menuStore.active === 1,
          'hover:bg-gray-700': menuStore.active !== 1,
        }"
      >
        <a href="#" class="flex items-center gap-4 text-md px-5 py-3 rounded">
          <HomeIcon class="w-6 h-6" />
          <span v-if="showText && !isMobile">Home</span>
        </a>
      </li>
      <li
        @click="selectMenu(2)"
        :class="{
          'bg-gray-700': menuStore.active === 2,
          'hover:bg-gray-700': menuStore.active !== 2,
        }"
      >
        <a href="#" class="flex items-center gap-4 text-md px-5 py-3 rounded">
          <UserCircleIcon class="w-6 h-6" />
          <span v-if="showText && !isMobile">Profile</span>
        </a>
      </li>
      <li
        @click="selectMenu(3)"
        :class="{
          'bg-gray-700': menuStore.active === 3,
          'hover:bg-gray-700': menuStore.active !== 3,
        }"
      >
        <a href="#" class="flex items-center gap-4 text-md px-5 py-3 rounded">
          <CogIcon class="w-6 h-6" />
          <span v-if="showText && !isMobile">Settings</span>
        </a>
      </li>
    </ul>

    <!-- Mobile Dropdown Menu -->
    <div
      v-if="isMobile && isSidebarOpen"
      class="absolute top-0 left-0 w-full bg-gray-900"
    >
      <ul>
        <li
          @click="selectMenu(1)"
          :class="{
            'bg-gray-700': menuStore.active === 1,
            'hover:bg-gray-700': menuStore.active !== 1,
          }"
        >
          <a href="#" class="flex items-center gap-4 text-md px-5 py-3 rounded">
            <HomeIcon class="w-6 h-6" />
            Home
          </a>
        </li>
        <li
          @click="selectMenu(2)"
          :class="{
            'bg-gray-700': menuStore.active === 2,
            'hover:bg-gray-700': menuStore.active !== 2,
          }"
        >
          <a href="#" class="flex items-center gap-4 text-md px-5 py-3 rounded">
            <UserCircleIcon class="w-6 h-6" />
            Profile
          </a>
        </li>
        <li
          @click="selectMenu(3)"
          :class="{
            'bg-gray-700': menuStore.active === 3,
            'hover:bg-gray-700': menuStore.active !== 3,
          }"
        >
          <a href="#" class="flex items-center gap-4 text-md px-5 py-3 rounded">
            <CogIcon class="w-6 h-6" />
            Settings
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from "vue";
import { useMenuStore } from "../store/menu";
import { useWindowSize } from "@vueuse/core";
import { HomeIcon, UserCircleIcon, CogIcon } from "@heroicons/vue/24/outline";

const menuStore = useMenuStore();
const isSidebarOpen = inject("isSidebarOpen");
const showText = ref(isSidebarOpen.value);
const { width } = useWindowSize();
watch(width, () => {
  isMobile.value = width.value < 768;
});
const isMobile = ref(width.value < 768);

const selectMenu = async (menu) => {
  await menuStore.selectMenu(menu);
};

watch(isSidebarOpen, (newVal) => {
  if (newVal) {
    // wait for the sidebar to fully widen before showing the text
    setTimeout(() => {
      showText.value = true;
    }, 100);
  } else {
    // hide text when closing
    showText.value = false;
  }
});
</script>
