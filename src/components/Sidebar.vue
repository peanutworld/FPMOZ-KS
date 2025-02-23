<template>
  <div
    :class="{
      'w-64': isSidebarOpen,
      'w-16': !isSidebarOpen,
    }"
    class="fixed mt-19 left-0 h-full bg-gray-900 text-white z-20 shadow-lg border-r border-white/20 transition-all duration-300"
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
          <span v-if="showText">Home</span>
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
          <span v-if="showText">Profile</span>
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
          <span v-if="showText">Settings</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, inject, watch } from "vue";
import { useMenuStore } from "../store/menu";
import { HomeIcon, UserCircleIcon, CogIcon } from "@heroicons/vue/24/outline";

const menuStore = useMenuStore();
const isSidebarOpen = inject("isSidebarOpen");
const showText = ref(true);

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
