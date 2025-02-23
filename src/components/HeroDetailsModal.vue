<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex justify-center items-center z-50 pointer-events-none"
  >
    <div
      class="relative bg-gray-800 shadow-lg text-white p-6 rounded-lg w-256 border border-white/20 pointer-events-auto"
    >
      <button
        @click="closeModal"
        class="absolute top-2 right-2 text-white text-xl font-bold p-1 hover:text-blue-500 cursor-pointer"
      >
        ✕
      </button>

      <h2 class="text-xl mb-4">{{ hero?.name || "Loading..." }}</h2>

      <div v-if="loading" class="text-white">Loading hero details...</div>
      <div v-else class="flex flex-wrap gap-8">
        <!-- Image column -->
        <div class="flex-none w-[120px]">
          <img
            v-if="hero.imageUrl"
            :src="hero.imageUrl"
            alt="Hero Image"
            class="w-full h-48 object-cover rounded-lg border border-gray-600"
          />
        </div>

        <!-- Content columns -->
        <div class="flex-1 text-left">
          <div class="mb-2">
            <strong>Full Name:</strong>
            <p class="text-gray-300">{{ hero.fullName || "N/A" }}</p>
          </div>
          <div class="mb-2">
            <strong>Created By:</strong>
            <p class="text-gray-300">{{ hero.createdBy || "N/A" }}</p>
          </div>
          <div class="mb-2">
            <strong>Actor:</strong>
            <p class="text-gray-300">{{ hero.actor || "N/A" }}</p>
          </div>
        </div>

        <div class="flex-1 text-left">
          <div class="mb-4">
            <strong>Abilities:</strong>
            <ul class="list-disc pl-6 text-gray-300">
              <li v-for="ability in hero.abilities" :key="ability">
                {{ ability }}
              </li>
              <li v-if="!hero.abilities?.length">No abilities listed.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bio section in its own row with full width -->
      <div class="w-full text-left mt-6">
        <strong>Bio:</strong>
        <p class="text-gray-300">{{ hero.bio || "No bio available." }}</p>
      </div>

      <div class="flex justify-end mt-4 gap-4">
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600"
        >
          Close
        </button>

        <!-- Delete Hero Button -->
        <button
          @click="deleteHero"
          class="px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700"
        >
          Delete Hero
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHeroesStore } from "../store/heroes";

const isVisible = ref(false);
const loading = ref(false);
const hero = ref({});
const heroesStore = useHeroesStore();

const openModal = async (selectedHero) => {
  isVisible.value = true;
  loading.value = true;

  try {
    hero.value = await heroesStore.getHeroById(selectedHero.id);
  } catch (error) {
    console.error("Error fetching hero details:", error);
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  isVisible.value = false;
};

const deleteHero = async () => {
  try {
    await heroesStore.deleteHero(hero.value.id);
    closeModal();
  } catch (error) {
    console.error("Error deleting hero:", error);
  }
};

defineExpose({
  openModal,
});
</script>
