<template>
  <header
    class="w-full flex items-center pr-6 border-b border-white/20 bg-white/10 backdrop-blur-lg text-white shadow-lg fixed top-0 left-0 z-10"
  >
    <!-- Left Section: Logo, Burger Icon, and Filter -->
    <div class="flex items-center gap-6">
      <!-- Logo -->
      <div
        class="bg-gray-900 w-64 h-18 border-r border-white/20 flex items-center justify-center"
      >
        <img
          src="../assets/logo.png"
          alt="Marvel Heroes Logo"
          class="w-55 h-auto"
        />
      </div>
      <!-- Burger Icon -->
      <div class="my-2 flex items-center justify-center">
        <button @click="toggleSidebar" class="text-white cursor-pointer">
          <Bars3Icon class="w-6 h-6" />
        </button>
      </div>
      <!-- Filter -->
      <div class="my-2 flex items-center justify-center">
        <GlassInput
          v-model="filter"
          @update:modelValue="handleFilterChange($event)"
          placeholder="Search heroes..."
          :padding="2"
          :width="64"
        />
      </div>
    </div>

    <!-- Right Section: User Menu -->
    <div class="my-2 flex items-center ml-auto">
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
