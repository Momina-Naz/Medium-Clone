<template>
  <!-- header -->
  <nav class="flex justify-around items-center py-5">
    <NuxtLink :to="`/reading`">
      <h1 class="text-3xl text-[#242424] font-bold font-serif tracking-tight">
        Medium
        <span class="text-gray-500 text-sm font-normal"
          >Draft in MominaNaz</span
        >
      </h1>
    </NuxtLink>

    <div class="flex items-center justify-center gap-4">
      <button class="bg-green-700 text-white py-1 px-3 text-sm rounded-3xl">
        Publish
      </button>

      <div class="relative" @click="toggleDropdown">
        <!-- Profile Button -->
        <div
          class="bg-purple-900 text-white w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
        >
          M
        </div>

        <!-- Dropdown -->
        <div
          v-if="isOpen"
          class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 text-gray-700"
        >
          <NuxtLink
            to="/newStory"
            class="block px-4 py-2 hover:bg-gray-100"
            @click="closeDropdown"
          >
            My Blogs
          </NuxtLink>
          <NuxtLink
            to="/reading"
            class="block px-4 py-2 hover:bg-gray-100"
            @click="closeDropdown"
          >
            Reading
          </NuxtLink>
          <button
            class="block w-full text-left px-4 py-2 hover:bg-gray-100"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- blog form -->
  <div class="flex justify-around mx-auto">
    <BlogForm />
  </div>
</template>

<script setup>
import { useAuthStore } from "~~/stores/Auth";
import BlogForm from "~/components/Blog/BlogForm.vue";
import { ref } from "vue";
const authStore = useAuthStore();

const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}

function logout() {
  authStore.logout();
  navigateTo("/");
}
</script>
