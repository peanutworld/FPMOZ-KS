<template>
  <header
    class="w-full flex items-center pr-0 pl-0 border-b border-white/20 bg-white/10 backdrop-blur-lg text-white shadow-lg fixed top-0 left-0 z-10"
  >
    <!-- Left Section: Logo & Burger Icon -->
    <div class="flex items-center gap-6 md:w-auto justify-between w-full">
      <!-- Logo & Burger Icon (Mobile version) -->
      <div
        class="bg-gray-900 w-full h-18 border-r border-white/20 flex items-center justify-between px-4"
      >
        <!-- Logo -->
        <img
          src="../assets/logo.png"
          alt="Marvel Heroes Logo"
          class="w-55 h-auto"
        />
        <!-- Burger Icon (Mobile version) -->
        <button
          @click="toggleSidebar"
          class="text-white cursor-pointer flex md:hidden ml-auto relative z-20"
        >
          <Bars3Icon class="w-6 h-6" />
        </button>
      </div>

      <!-- Burger Icon (Desktop version) -->
      <button
        @click="toggleSidebar"
        class="text-white cursor-pointer hidden md:flex ml-auto relative z-20"
      >
        <Bars3Icon class="w-6 h-6" />
      </button>

      <!-- Filter -->
      <div class="hidden md:flex items-center justify-center">
        <GlassInput
          v-model="filter"
          @update:modelValue="handleFilterChange($event)"
          placeholder="Search heroes..."
          autocomplete="off"
          name="filter"
          id="filter"
          :padding="2"
          :width="64"
        />
      </div>
    </div>

    <!-- Right Section -->
    <div class="hidden md:flex items-center ml-auto mr-4">
      <UserMenu :username="username" />
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "../store/auth";
import { useHeroesStore } from "../store/heroes";
import UserMenu from "../components/UserMenu.vue";
import GlassInput from "../components/GlassInput.vue";

const emit = defineEmits(["filterChanged"]);
const username = ref("Mario Jonjic");
const authStore = useAuthStore();
const heroesStore = useHeroesStore();
const isSidebarOpen = inject("isSidebarOpen");

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleFilterChange = (value) => {
  heroesStore.setFilter(value);
};

onMounted(() => {
  if (authStore.user) {
    username.value = authStore.user.firstName + " " + authStore.user.lastName;
  }
});
</script>
