<template>
  <div
    class="flex flex-col items-center justify-center h-screen bg-gray-100 text-center"
  >
    <h1 class="text-5xl font-extrabold text-red-600">404</h1>
    <p class="text-xl text-gray-700 mt-4">
      Oops! The page you're looking for doesn't exist.
    </p>
    <div class="mt-6">
      <router-link
        to="/"
        class="text-blue-600 hover:text-blue-800 font-semibold text-lg"
      >
        Go back to Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
