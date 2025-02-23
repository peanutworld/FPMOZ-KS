<template>
  <input
    :value="modelValue"
    @input="updateValue"
    :placeholder="placeholder"
    :class="[inputClass, widthClass]"
    class="border border-white/20 bg-transparent my-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: String,
  padding: {
    type: Number,
    default: 3,
  },
  width: {
    type: [String, Number],
    default: "full",
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputClass = computed(() => `p-${props.padding}`); // dynamically apply padding

const widthClass = computed(() => `w-${props.width}`); // dynamically apply width

const updateValue = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit("update:modelValue", input.value);
};
</script>
