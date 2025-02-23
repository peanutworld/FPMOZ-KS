<template>
  <div
    id="background-container"
    class="relative min-h-screen flex flex-col items-center bg-cover bg-center"
    :style="{ backgroundImage: `url(${marvelWallpaper})` }"
  >
    <!-- Dark overlay for readability -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- Content -->
    <div class="relative z-10 w-full">
      <TopBar />
      <Sidebar />
      <div
        class="pt-18"
        :class="{ 'pl-64': isSidebarOpen, 'pl-16': !isSidebarOpen }"
      >
        <p v-if="menuStore.active === 1" class="text-white">
          Your main content for Home goes here.
        </p>
        <p v-if="menuStore.active === 2" class="text-white">
          Your main content for Profile goes here.
        </p>
        <p v-if="menuStore.active === 3" class="text-white">
          Your main content for Settings goes here.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import TopBar from "../components/TopBar.vue";
import Sidebar from "../components/Sidebar.vue";
import marvelWallpaper from "../assets/marvel-heroes-background.jpg";
import { useMenuStore } from "../store/menu";

const menuStore = useMenuStore();
const isSidebarOpen = ref(true);

provide("isSidebarOpen", isSidebarOpen);
</script>
