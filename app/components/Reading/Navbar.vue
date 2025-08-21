<template>
  <main
    class="flex justify-between items-center px-10 py-4 border-b border-gray-100 relative"
  >
    <!-- Left side -->
    <div class="flex relative" ref="searchRef">
      <NuxtLink :to="`/`">
        <h1 class="text-3xl text-[#242424] font-bold font-serif tracking-tight">
          Medium
        </h1>
      </NuxtLink>

      <!-- Search input -->
      <div class="relative w-64 ml-6">
        <span
          class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          search
        </span>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search blogs..."
          class="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-3xl focus:outline-none"
        />

        <!-- Search results dropdown -->
        <ul
          v-if="showDropdown && blogStore.filteredBlogs.length"
          class="absolute top-full mt-2 bg-white border rounded shadow max-h-64 overflow-auto w-full z-50"
        >
          <li
            v-for="blog in blogStore.filteredBlogs"
            :key="blog._id"
            @click="selectBlog(blog)"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ blog.title }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Right side -->
    <div class="flex justify-center items-center gap-4 text-gray-500 text-lg">
      <NuxtLink to="/newStory" class="relative group flex items-center">
        <span class="material-icons text-2xl cursor-pointer"> edit </span>
        <span
          class="absolute top-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition"
        >
          Write
        </span>
      </NuxtLink>

      <span class="material-icons-outlined cursor-pointer">notifications</span>

      <div class="relative" @click="toggleDropdown">
        <div
          class="bg-purple-900 text-white w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
        >
          M
        </div>

        <div
          v-if="isOpen"
          class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 text-gray-700"
        >
          <NuxtLink
            to="/myblogs"
            class="block px-4 py-2 hover:bg-gray-100"
            @click="closeDropdown"
          >
            My Blogs
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
  </main>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "~~/stores/Auth";
import { useBlogStore } from "~~/stores/blog";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const blogStore = useBlogStore();
const router = useRouter();

const isOpen = ref(false);
const searchQuery = ref("");
const showDropdown = ref(false);
const searchRef = ref(null);

// Dropdown toggle
function toggleDropdown() {
  isOpen.value = !isOpen.value;
}
function closeDropdown() {
  isOpen.value = false;
}

// Logout
function logout() {
  authStore.logout();
  router.push("/");
}

// Fetch blogs when component mounts
onMounted(() => {
  blogStore.fetchBlogs();
});

// Watch input for search
watch(searchQuery, (val) => {
  blogStore.searchBlogs(val);
  // Show dropdown only if user typed something
  showDropdown.value =
    val.trim().length > 0 && blogStore.filteredBlogs.length > 0;
});

// Close dropdown when clicking outside
function handleClickOutside(event) {
  if (searchRef.value && !searchRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Select a blog
function selectBlog(blog) {
  showDropdown.value = false;
  searchQuery.value = "";
  router.push(`${blog._id}`);
}
</script>






