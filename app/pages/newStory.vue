

<template>
  <!-- header -->
  <nav class="flex justify-around items-center py-4">
    <h1 class="text-3xl text-[#242424] font-bold font-serif tracking-tight">
      Medium
      <span class="text-gray-500 text-sm font-normal">Draft in MominaNaz</span>
    </h1>
    <div class="flex items-center justify-center gap-4">
      <button class="bg-green-700 text-white py-1 px-3 text-sm rounded-3xl">
        Publish
      </button>
      <span class="material-icons-outlined cursor-pointer">notifications</span>
      <div
        class="bg-purple-900 text-white w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
      >
        M
      </div>
    </div>
  </nav>
  <!-- blog form -->
  <div class="flex justify-around">
    <BlogForm />
  </div>
</template>
<script setup>
import BlogForm from "~/components/Blog/BlogForm.vue";
</script>