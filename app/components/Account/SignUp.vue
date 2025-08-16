

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
      <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Join Medium
      </h1>
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="mb-1 text-gray-600 font-medium">Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="Name"
            class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex flex-col">
          <label class="mb-1 text-gray-600 font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
          Sign Up
        </button>

        <p class="text-sm my-6 text-gray-600 text-center">
          Already have account?
          <span
            class="text-blue-600 cursor-pointer"
            @click="emit('switch-to-signin')"
          >
            Sign in
          </span>
        </p>

        <p v-if="successMsg" class="text-green-500 text-center">
          {{ successMsg }}
        </p>
        <p v-if="errorMsg" class="text-red-500 text-center">{{ errorMsg }}</p>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~~/stores/Auth";
import { useNuxtApp } from "#app";

// Declare emitted events
const emit = defineEmits(["switch-to-signin", "close"]);

const authStore = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const successMsg = ref("");
const errorMsg = ref("");

const handleSubmit = async () => {
  const nuxtApp = useNuxtApp();
  try {
    const response = await nuxtApp.$api.post("api/v1/auth/sign-up", {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    const { token, user } = response.data.data;
    authStore.setAuth(token, user);
    navigateTo("/reading");
    console.log("Signup response:", response.data);
  } catch (error) {
    console.error("Signup error:", error);
  }
};
</script>