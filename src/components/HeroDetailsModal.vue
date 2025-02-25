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

      <h2 class="text-xl mb-4">
        <span v-if="!isEditing">{{ hero?.name || "Loading..." }}</span>
        <input
          v-else
          v-model="editableHero.name"
          class="bg-gray-700 text-white border border-gray-500 px-2 py-1 rounded w-full"
        />
      </h2>

      <div v-if="loading" class="text-white">Loading hero details...</div>
      <div v-else class="flex flex-wrap gap-8">
        <!-- Image -->
        <div class="flex-none w-[120px]">
          <img
            v-if="hero.imageUrl || isEditing"
            :src="editableHero.imageUrl || placeholderImage"
            alt="Hero Image"
            class="w-full h-48 object-cover rounded-lg border border-gray-600"
          />
        </div>

        <!-- Content -->
        <div class="flex-1 text-left">
          <div class="mb-2">
            <strong>Full Name:</strong>
            <p v-if="!isEditing" class="text-gray-300">
              {{ hero.fullName || "N/A" }}
            </p>
            <input
              v-else
              v-model="editableHero.fullName"
              class="bg-gray-700 text-white border border-gray-500 px-2 py-1 rounded w-full"
            />
          </div>
          <div class="mb-2">
            <strong>Created By:</strong>
            <p v-if="!isEditing" class="text-gray-300">
              {{ hero.createdBy || "N/A" }}
            </p>
            <input
              v-else
              v-model="editableHero.createdBy"
              class="bg-gray-700 text-white border border-gray-500 px-2 py-1 rounded w-full"
            />
          </div>
          <div class="mb-2">
            <strong>Actor:</strong>
            <p v-if="!isEditing" class="text-gray-300">
              {{ hero.actor || "N/A" }}
            </p>
            <input
              v-else
              v-model="editableHero.actor"
              class="bg-gray-700 text-white border border-gray-500 px-2 py-1 rounded w-full"
            />
          </div>
        </div>

        <div class="flex-1 text-left">
          <div class="mb-4">
            <strong>Abilities:</strong>
            <ul v-if="!isEditing" class="list-disc pl-6 text-gray-300">
              <li v-for="ability in hero.abilities" :key="ability">
                {{ ability }}
              </li>
              <li v-if="!hero.abilities?.length">No abilities listed.</li>
            </ul>
            <textarea
              v-else
              v-model="editableHero.abilities"
              class="bg-gray-700 text-white border border-gray-500 px-2 py-1 rounded w-full"
              placeholder="Enter abilities separated by commas"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Bio -->
      <div class="w-full text-left mt-6">
        <strong>Bio:</strong>
        <p v-if="!isEditing" class="text-gray-300">
          {{ hero.bio || "No bio available." }}
        </p>
        <textarea
          v-else
          v-model="editableHero.bio"
          class="bg-gray-700 text-white border border-gray-500 px-2 py-1 rounded w-full"
        ></textarea>
      </div>

      <!-- Image URL -->
      <div v-if="isEditing" class="w-full text-left mt-2">
        <strong>Image URL:</strong>
        <input
          v-model="editableHero.imageUrl"
          placeholder="Enter image URL"
          class="bg-gray-700 text-white border border-gray-500 px-2 py-1 rounded w-full"
        />
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="text-red-400 text-sm bg-red-800/30 p-2 rounded-md text-center mt-4"
      >
        {{ errorMessage }}
      </div>

      <!-- Buttons -->
      <div class="flex justify-end mt-4 gap-4">
        <button
          v-if="!isEditing"
          @click="toggleEdit"
          class="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          v-if="isEditing"
          @click="saveHero"
          class="px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
        >
          Save
        </button>

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
import placeholderImage from "../assets/placeholder.jpg";
import { ref } from "vue";
import { useHeroesStore } from "../store/heroes";

const isVisible = ref(false);
const loading = ref(false);
const isEditing = ref(false);
const hero = ref({});
const editableHero = ref({});
const errorMessage = ref("");
const heroesStore = useHeroesStore();

const openModal = async (selectedHero) => {
  errorMessage.value = "";
  isVisible.value = true;
  loading.value = true;

  try {
    hero.value = await heroesStore.getHeroById(selectedHero.id);

    // Convert abilities array to a string for editing
    editableHero.value = {
      ...hero.value,
      abilities: Array.isArray(hero.value.abilities)
        ? hero.value.abilities.join(", ")
        : hero.value.abilities || "",
    };
  } catch (error) {
    console.error("Error fetching hero details:", error);
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  errorMessage.value = "";
  isVisible.value = false;
  isEditing.value = false;
};

const toggleEdit = () => {
  isEditing.value = true;
};

const saveHero = async () => {
  errorMessage.value = "";

  // Validate all fields except abilities
  if (
    !editableHero.value.name ||
    !editableHero.value.fullName ||
    !editableHero.value.createdBy ||
    !editableHero.value.actor ||
    !editableHero.value.bio ||
    !editableHero.value.imageUrl
  ) {
    errorMessage.value = "Please fill in all required fields.";
    return;
  }

  try {
    const { id, ...rest } = editableHero.value;

    // Convert abilities string back to an array
    rest.abilities = rest.abilities
      ? rest.abilities.split(",").map((ability) => ability.trim())
      : [];

    await heroesStore.updateHero(id, rest);

    hero.value = {
      ...rest,
      abilities: rest.abilities,
    };

    isEditing.value = false;
  } catch (error) {
    console.error("Error updating hero:", error);
  }
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
