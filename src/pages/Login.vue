<script setup lang="ts">
import marvelWallpaper from "../assets/marvel-heroes-background.jpg";
import AuthForm from "../components/AuthForm.vue";
</script>

<template>
  <div
    class="flex flex-col justify-center items-center h-screen bg-cover bg-center relative"
    :style="{ backgroundImage: `url(${marvelWallpaper})` }"
  >
    <!-- Dark overlay for readability -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- Content -->
    <div class="relative text-center mb-6 z-10">
      <h1 class="text-4xl font-extrabold text-blue-400 drop-shadow-lg">
        Welcome Hero
      </h1>
      <p class="text-gray-300 mt-2 drop-shadow-lg">
        Sign in or create an account to continue
      </p>
    </div>

    <AuthForm />
  </div>
</template>
