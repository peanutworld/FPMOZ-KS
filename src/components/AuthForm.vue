<template>
  <div
    class="p-6 max-w-sm mx-auto rounded-xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-lg text-white"
    :class="{ 'animate-shake': errorMessage }"
  >
    <h2 class="text-2xl font-bold text-center">
      {{ isLogin ? "Login" : "Signup" }}
    </h2>

    <p
      v-if="errorMessage"
      class="text-red-400 text-sm bg-red-800/30 p-2 rounded-md text-center my-2"
    >
      {{ errorMessage }}
    </p>

    <div v-if="!isLogin">
      <GlassInput v-model="firstName" placeholder="First Name" :padding="3" />
      <GlassInput v-model="lastName" placeholder="Last Name" :padding="3" />
    </div>

    <GlassInput v-model="email" placeholder="Email" :padding="3" />

    <GlassInput
      v-model="password"
      type="password"
      placeholder="Password"
      :padding="3"
      @keyup.enter="submit"
    />

    <button
      @click="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white my-2 p-3 w-full rounded-md transition-all duration-300"
    >
      {{ isLogin ? "Login" : "Signup" }}
    </button>

    <p
      @click="isLogin = !isLogin"
      class="text-sm text-blue-400 cursor-pointer mt-4 text-center hover:underline"
    >
      {{ isLogin ? "Create an account" : "Already have an account?" }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import GlassInput from "../components/GlassInput.vue";

const authStore = useAuthStore();
const router = useRouter();
const isLogin = ref(true);
const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const errorMessage = ref("");

const submit = async () => {
  errorMessage.value = ""; // reset errors

  // basic validation
  if (
    !email.value ||
    !password.value ||
    (!isLogin.value && (!firstName.value || !lastName.value))
  ) {
    errorMessage.value = "All fields are required!";
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = "Password must be at least 8 characters long!";
    return;
  }

  try {
    if (isLogin.value) {
      await authStore.login({ email: email.value, password: password.value });
    } else {
      await authStore.signup({
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      });
    }
    router.push("/");
  } catch (err) {
    errorMessage.value = "Invalid email or password!";
    console.error(err);
  }
};
</script>
