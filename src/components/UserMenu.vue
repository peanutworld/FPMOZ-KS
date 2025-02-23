<template>
  <div
    class="ml-auto flex items-center gap-2 border border-white/20 p-2 rounded-md group relative overflow-hidden min-w-[100px] hover:min-w-[210px] transition-all duration-300 ease-in-out"
  >
    <!-- View Profile Button (shown on hover) -->
    <button
      @click="menuStore.selectMenu(2)"
      class="absolute left-0 text-blue-500 opacity-0 group-hover:opacity-100 group-hover:visible transform group-hover:translate-x-1 transition-all duration-300 ease-in-out cursor-pointer py-2 px-4"
    >
      View Profile
    </button>

    <!-- User Icon (hidden on hover) -->
    <span
      class="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white transform group-hover:scale-75 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M4 20c0-4 8-4 8-4s8 0 8 4"></path>
      </svg>
    </span>

    <!-- Username (hidden on hover) -->
    <span
      class="transition-all duration-300 ease-in-out opacity-100 group-hover:opacity-0 transform group-hover:scale-75"
    >
      {{ username }}
    </span>

    <!-- Logout Button (shown on hover) -->
    <button
      @click="logout"
      class="absolute right-0 text-red-500 opacity-0 group-hover:opacity-100 group-hover:visible transform group-hover:translate-x-[-5px] transition-all duration-300 ease-in-out cursor-pointer py-2 px-4"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { useMenuStore } from "../store/menu";

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const authStore = useAuthStore();
const menuStore = useMenuStore();

// Logout function
const logout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>
