<template>
  <div class="card relative group" @click="handleClick(hero)">
    <img
      :src="hero.imageUrl"
      :alt="hero.name"
      class="card-img object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9/10 h-full z-1 transition-all duration-300 ease-in-out group-hover:scale-[1.05]"
    />
  </div>
</template>

<script setup>
defineProps({
  hero: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits();

const handleClick = (hero) => {
  emit("showDetails", hero);
};
</script>

<style scoped>
.card {
  position: relative;
  aspect-ratio: 182 / 330;
  border-radius: 1rem;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.card::before {
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

.card:hover::before {
  transform: scale(1.05);
}
</style>
