<template>
  <main>
    <div class="bg-white">
      <div class="px-6 lg:px-8">
        <div
          class="flex flex-col items-center gap-7 pt-10 sm:mt-6 sm:pt-16 lg:max-w-none"
        >
          <!-- Loop through blogs -->
          <div
            v-for="blog in blogs"
            :key="blog._id"
            class="p-6 w-[330px] sm:w-[700px] bg-white border-b border-gray-300"
          >
            <NuxtLink :to="`${blog._id}`">
              <h2 class="text-xl font-bold text-gray-800 hover:text-green-700">
                {{ blog.title }}
              </h2>
            </NuxtLink>

            <p class="text-gray-700 mt-2">
              {{ blog.content.split(" ").slice(0, 20).join(" ") }}...
            </p>

            <p class="mt-2 text-sm text-gray-600">
              Author: {{ blog.author.name }}
            </p>
            <p class="text-sm text-gray-500">
              {{ new Date(blog.createdAt).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { onMounted, computed } from "vue";
import { useBlogStore } from "~~/stores/blog";
import { useAuthStore } from "~~/stores/Auth";

// Stores
const blogStore = useBlogStore();
const authStore = useAuthStore();

// Use filteredBlogs to reflect search results
const blogs = computed(() => blogStore.filteredBlogs);

// Load data
onMounted(() => {
  authStore.loadAuthFromStorage();
  blogStore.fetchBlogs();
});
</script>


