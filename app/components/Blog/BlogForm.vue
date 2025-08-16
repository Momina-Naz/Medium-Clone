<template>
  <div class="max-w-3xl mx-auto mt-10">
    <NuxtLink :to="`/reading`"
      ><button
        class="px-4 py-1 mr-2 mb-2 rounded font-semibod text-gray-900 border border-gray-400"
      >
        Back to readings
      </button></NuxtLink
    >
    <input
      v-model="title"
      type="text"
      placeholder="Title"
      class="w-full text-xl text-gray-700 py-3 px-4 mb-5 border border-gray-300 rounded focus:outline-none"
    />

    <textarea
      v-model="content"
      placeholder="Write your content here..."
      rows="10"
      class="w-full text-gray-700 py-3 px-4 mb-5 border border-gray-300 rounded focus:outline-none"
    ></textarea>

    <button
      @click="handleSubmit"
      class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      :disabled="loading"
    >
      {{ loading ? "Submitting..." : "Submit" }}
    </button>

    <div v-if="content" class="mt-4">
      <p class="font-semibold mb-2">Content Output:</p>
      <div class="p-3 border rounded bg-gray-50">{{ content }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBlogStore } from "~~/stores/blog";

const title = ref("");
const content = ref("");
const blogStore = useBlogStore();
const loading = ref(false);

const handleSubmit = async () => {
  if (!title.value || !content.value) {
    alert("Please enter both title and content!");
    return;
  }

  loading.value = true;

  await blogStore.createBlog(title.value, content.value);

  loading.value = false;
  alert("Blog created successfully!");

  // Clear form
  title.value = "";
  content.value = "";
};
</script>




