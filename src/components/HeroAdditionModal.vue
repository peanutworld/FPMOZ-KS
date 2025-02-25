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

      <h2 class="text-xl mb-4">Add New Hero</h2>

      <form
        @submit.prevent="submitHero"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div>
          <label for="name" class="block">Name</label>
          <input
            type="text"
            id="name"
            v-model="hero.name"
            class="w-full p-2 mt-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label for="fullName" class="block">Full Name</label>
          <input
            type="text"
            id="fullName"
            v-model="hero.fullName"
            class="w-full p-2 mt-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div class="sm:col-span-2">
          <label for="bio" class="block">Bio</label>
          <textarea
            id="bio"
            v-model="hero.bio"
            class="w-full p-2 mt-1 border border-gray-300 rounded resize-none h-30"
            required
          ></textarea>
        </div>

        <div>
          <label for="actor" class="block">Actor</label>
          <input
            type="text"
            id="actor"
            v-model="hero.actor"
            class="w-full p-2 mt-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label for="abilities" class="block">Abilities</label>
          <input
            type="text"
            id="abilities"
            v-model="hero.abilities"
            class="w-full p-2 mt-1 border border-gray-300 rounded"
            placeholder="Comma-separated abilities"
          />
        </div>

        <div>
          <label for="createdBy" class="block">Created By</label>
          <input
            type="text"
            id="createdBy"
            v-model="hero.createdBy"
            class="w-full p-2 mt-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label for="imageUrl" class="block">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            v-model="hero.imageUrl"
            class="w-full p-2 mt-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div class="col-span-2 flex justify-end space-x-4 mt-4">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          >
            Add Hero
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHeroesStore } from "../store/heroes";

const isVisible = ref(false);
const hero = ref({
  name: "",
  fullName: "",
  bio: "",
  actor: "",
  createdBy: "",
  abilities: "",
  imageUrl: "",
});

const openModal = () => {
  isVisible.value = true;
  hero.value = {
    name: "",
    fullName: "",
    bio: "",
    actor: "",
    createdBy: "",
    abilities: "",
    imageUrl: "",
  };
};

const closeModal = () => {
  isVisible.value = false;
};

const submitHero = async () => {
  const abilitiesArray = hero.value.abilities
    ? hero.value.abilities.split(",").map((ability) => ability.trim())
    : [];

  await useHeroesStore().addHero({
    name: hero.value.name,
    fullName: hero.value.fullName,
    bio: hero.value.bio,
    actor: hero.value.actor,
    createdBy: hero.value.createdBy,
    abilities: abilitiesArray,
    imageUrl: hero.value.imageUrl,
  });

  closeModal();
};

defineExpose({
  openModal,
});
</script>
