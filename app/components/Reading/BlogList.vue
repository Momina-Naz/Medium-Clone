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

            <!-- Delete Button (only if user is the author) -->
            <div
              v-if="
                authStore.user &&
                blog.author &&
                blog.author._id === authStore.user.id
              "
              class="mt-4 flex flex-col gap-2"
            >
              <p class="text-xs text-green-600 font-medium">
                You are the author of this blog, so you can delete it if you
                want.
              </p>

              <span
                @click="confirmDelete(blog._id)"
                class="material-icons text-red-900"
                >delete</span
              >
            </div>
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

// blogs
const blogs = computed(() => blogStore.blogs);

// Load data
onMounted(() => {
  authStore.loadAuthFromStorage();
  blogStore.fetchBlogs();
});

// confirm delete function
const confirmDelete = (id) => {
  if (confirm(" Are you sure you want to delete this blog?")) {
    blogStore.deleteBlog(id);
    alert("🗑 Blog deleted successfully!");
  }
};
</script>


