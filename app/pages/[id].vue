<template>
  <main class="bg-gray-50 min-h-screen">
    <Navbar />

    <div v-if="blog" class="max-w-3xl mx-auto bg-white rounded-lg p-8 mt-10">
      <!-- Author Info -->
      <div class="flex flex-col justify-center gap-4 mb-6">
        <p class="text-gray-800 font-semibold">
          Author: {{ blog.author.name }}
        </p>
        <p class="text-gray-500 text-sm">
          {{ new Date(blog.createdAt).toLocaleDateString() }}
        </p>
      </div>

      <!-- Blog Title -->
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ blog.title }}</h1>

      <!-- Blog Content -->
      <p class="text-gray-700 leading-relaxed whitespace-pre-line">
        {{ blog.content }}
      </p>
    </div>
  </main>
</template>

<script setup>
import { onMounted, computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Navbar from "~/components/Reading/Navbar.vue";
import { useBlogStore } from "~~/stores/blog";

const route = useRoute();
const id = route.params.id;

const blogStore = useBlogStore();
const blogs = computed(() => blogStore.blogs);
const blog = ref(null);

onMounted(async () => {
  await blogStore.fetchBlogs();
  blog.value = blogs.value.find((p) => p._id === id);
});

watch(blogs, (newBlogs) => {
  blog.value = newBlogs.find((p) => p._id === id);
});
</script>
