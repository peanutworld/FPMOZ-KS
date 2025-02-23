<template>
  <div class="p-4">
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
        v-for="hero in heroes"
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
import { onMounted, ref, watch } from "vue";
import { useHeroesStore } from "../store/heroes";
import AddNewHeroCard from "../components/AddNewHeroCard.vue";
import HeroCard from "../components/HeroCard.vue";
import HeroAdditionModal from "../components/HeroAdditionModal.vue";
import HeroDetailsModal from "../components/HeroDetailsModal.vue";

const heroesStore = useHeroesStore();
const heroes = ref([]);
const loading = ref(true);
const heroAdditionModal = ref(null);
const heroDetailsModal = ref(null);

const handleOpenModal = () => {
  heroAdditionModal.value.openModal();
};

const openHeroDetailsModal = (hero) => {
  heroDetailsModal.value.openModal(hero);
};

watch(
  () => heroesStore.heroes,
  (newHeroes) => {
    heroes.value = newHeroes;
    loading.value = false;
  }
);

onMounted(async () => {
  await heroesStore.fetchHeroes();
});
</script>
