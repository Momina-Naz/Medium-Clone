<template>
  <main>
    <div class="bg-white rounded-xl shadow-lg p-7 py-4 w-[500px]">
      <div class="flex justify-end">
        <button
          class="bg-transparent text-gray-600 text-xl"
          @click="$emit('close')"
        >
          ×
        </button>
      </div>
      <h1
        class="text-3xl font-serif font-semibold text-gray-800 mb-6 text-center"
      >
        Welcome Back.
      </h1>
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <!-- email -->
        <div class="flex flex-col">
          <label class="mb-1 text-gray-600 font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <!-- password -->
        <div class="flex flex-col">
          <label class="mb-1 text-gray-600 font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="mt-4 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import { useNuxtApp } from "#app";
import { useAuthStore } from "~~/stores/Auth";
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const handleSubmit = async () => {
  const nuxtApp = useNuxtApp();

  try {
    const response = await nuxtApp.$api.post("api/v1/auth/sign-in", {
      email: email.value,
      password: password.value,
    });
    const { token, user } = response.data.data;
    authStore.setAuth(token, user);
    navigateTo("/reading");
    console.log("Signin response:", response.data);
  } catch (error) {
    console.error("Signin error:", error);
  }
};
</script>

