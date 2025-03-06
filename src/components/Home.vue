<template>
  <div
    class="m-6"
    :class="{
      'pl-64': isSidebarOpen && !isMobile,
      'pl-16': !isSidebarOpen && !isMobile,
      'pl-0': isMobile,
    }"
  >
    <div v-if="loading" class="text-white">Loading heroes...</div>
    <div v-else-if="heroes.length === 0" class="text-white">
      No heroes found.
    </div>

    <div
      class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2"
      style="grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr))"
    >
      <!-- Add New Hero Card -->
      <AddNewHeroCard @openModal="handleOpenModal" />

      <!-- Actual Hero Cards -->
      <HeroCard
        v-for="hero in heroesStore.filteredHeroes"
        :key="hero.id"
        :hero="hero"
        @showDetails="openHeroDetailsModal"
      />
    </div>

    <!-- Hero Modals -->
    <HeroAdditionModal ref="heroAdditionModal" />
    <HeroDetailsModal ref="heroDetailsModal" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch, inject } from "vue";
import { useHeroesStore } from "../store/heroes";
import AddNewHeroCard from "../components/AddNewHeroCard.vue";
import HeroCard from "../components/HeroCard.vue";
import HeroAdditionModal from "../components/HeroAdditionModal.vue";
import HeroDetailsModal from "../components/HeroDetailsModal.vue";
import { useWindowSize } from "@vueuse/core";

const heroesStore = useHeroesStore();
const loading = ref(true);
const heroes = ref();
const heroAdditionModal = ref(null);
const heroDetailsModal = ref(null);

const { width } = useWindowSize();
watch(width, () => {
  isMobile.value = width.value < 768;
});
const isMobile = ref(width.value < 768);
const isSidebarOpen = inject("isSidebarOpen");

const handleOpenModal = () => {
  heroAdditionModal.value.openModal();
};

const openHeroDetailsModal = (hero) => {
  heroDetailsModal.value.openModal(hero);
};

watch(
  () => heroesStore.heroes,
  async (newHeroes) => {
    heroes.value = newHeroes;
    loading.value = false;
  }
);

onMounted(async () => {
  await heroesStore.fetchHeroes();
});
</script>
