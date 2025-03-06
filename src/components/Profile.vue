<template>
  <div
    class="m-6 space-y-6"
    :class="{
      'pl-64': isSidebarOpen && !isMobile,
      'pl-16': !isSidebarOpen && !isMobile,
      'pl-0': isMobile,
    }"
  >
    <div class="flex flex-wrap gap-6">
      <!-- Profile Information Card -->
      <div
        class="flex-1 max-h-70 p-6 bg-gray-800 text-white rounded-lg shadow-lg"
      >
        <h2 class="text-2xl font-semibold mb-4">Profile Information</h2>
        <div class="space-y-4">
          <div>
            <span class="font-semibold">First Name:</span>
            <p class="text-gray-300">{{ authStore.user?.firstName }}</p>
          </div>
          <div>
            <span class="font-semibold">Last Name:</span>
            <p class="text-gray-300">{{ authStore.user?.lastName }}</p>
          </div>
          <div>
            <span class="font-semibold">Email:</span>
            <p class="text-gray-300">{{ authStore.user?.email }}</p>
          </div>
        </div>
      </div>

      <!-- Change Password Card -->
      <div class="flex-1 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Change Password</h2>
        <div class="space-y-4">
          <div>
            <label class="font-semibold">Old Password:</label>
            <input
              type="password"
              class="w-full p-2 rounded-lg bg-gray-700 text-white"
              placeholder="Enter your old password"
            />
          </div>
          <div>
            <label class="font-semibold">New Password:</label>
            <input
              type="password"
              class="w-full p-2 rounded-lg bg-gray-700 text-white"
              placeholder="Enter your new password"
            />
          </div>
          <div>
            <label class="font-semibold">Confirm New Password:</label>
            <input
              type="password"
              class="w-full p-2 rounded-lg bg-gray-700 text-white"
              placeholder="Confirm your new password"
            />
          </div>

          <!-- Error message -->
          <div
            v-if="errorMessage"
            class="text-red-400 text-sm bg-red-800/30 p-2 rounded-md text-center mt-4"
          >
            {{ errorMessage }}
          </div>

          <!-- Button -->
          <button
            @click="changePassword"
            class="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from "vue";
import { useAuthStore } from "../store/auth";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
watch(width, () => {
  isMobile.value = width.value < 768;
});
const isMobile = ref(width.value < 768);
const isSidebarOpen = inject("isSidebarOpen");

const authStore = useAuthStore();
const errorMessage = ref("");

const changePassword = () => {
  errorMessage.value = "TODO: Implementation";
};

onMounted(() => {
  authStore.fetchUser();
});
</script>
