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
      <div class="pt-18">
        <Home v-if="menuStore.active === 1" />
        <Profile v-if="menuStore.active === 2" />
        <Settings v-if="menuStore.active === 3" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, watch } from "vue";
import TopBar from "../components/TopBar.vue";
import Sidebar from "../components/Sidebar.vue";
import Home from "../components/Home.vue";
import Profile from "../components/Profile.vue";
import Settings from "../components/Settings.vue";
import marvelWallpaper from "../assets/marvel-heroes-background.jpg";
import { useMenuStore } from "../store/menu";
import { useWindowSize } from "@vueuse/core";

const menuStore = useMenuStore();

const { width } = useWindowSize();
watch(width, () => {
  isMobile.value = width.value < 768;
});
const isMobile = ref(width.value < 768);

const isSidebarOpen = ref(!isMobile.value);

provide("isSidebarOpen", isSidebarOpen);
</script>
