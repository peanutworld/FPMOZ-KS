<template>
  <div class="add-new-hero-card group">
    <div
      class="absolute top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center opacity-100 visibility-visible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:scale-[1.05]"
    >
      <span
        class="text-6xl text-white transition-all transform duration-300 ease-in-out group-hover:translate-y-[-30px] select-none"
      >
        ?
      </span>
      <button
        @click="handleClick"
        class="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg w-36 text-center cursor-pointer opacity-0 pointer-events-none transition-all transform duration-300 ease-in-out group-hover:opacity-100 group-hover:pointer-events-auto group-hover:cursor-pointer group-hover:transform group-hover:translate-y-2"
      >
        Add New Hero
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits();

const handleClick = () => {
  emit("openModal");
};
</script>

<style scoped>
.add-new-hero-card {
  position: relative;
  aspect-ratio: 182 / 330;
  border-radius: 1rem;
  transition: transform 0.3s ease-in-out;
}

.add-new-hero-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../assets/border.png") 50% no-repeat;
  background-size: 100% 91%;
  z-index: 2;
  transition: transform 0.3s ease-in-out;
}

.add-new-hero-card:hover::before {
  transform: scale(1.05);
}
</style>
