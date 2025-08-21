import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { useAuthStore } from "./Auth";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blogs: [], // All blogs from API
    filteredBlogs: [], // Blogs after search
    myBlogs: [], // Only my blogs
    loading: false,
    error: null,
  }),

  actions: {
    // Fetch all blogs
    async fetchBlogs() {
      const nuxtApp = useNuxtApp();
      this.loading = true;
      this.error = null;

      try {
        const response = await nuxtApp.$api.get("api/v1/blogs");

        this.blogs = Array.isArray(response.data.data.blogs)
          ? response.data.data.blogs
          : [];
        this.filteredBlogs = [...this.blogs];
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.loading = false;
      }
    },

    // Fetch my blogs
    async fetchMyBlogs() {
      const nuxtApp = useNuxtApp();
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        this.error = "You must be logged in to see your blogs.";
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await nuxtApp.$api.get("api/v1/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.myBlogs = Array.isArray(response.data.blogs)
          ? response.data.blogs
          : [];
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.loading = false;
      }
    },

    // Create a new blog
    async createBlog(title, content) {
      const nuxtApp = useNuxtApp();
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        this.error = "You must be logged in to create a blog.";
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await nuxtApp.$api.post(
          "api/v1/blogs",
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const newBlog = response.data.data || response.data;

        if (!Array.isArray(this.blogs)) this.blogs = [];
        this.blogs.push(newBlog);
        this.filteredBlogs = [...this.blogs];

        if (!Array.isArray(this.myBlogs)) this.myBlogs = [];
        this.myBlogs.push(newBlog);
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.loading = false;
      }
    },

    // Delete blog
    async deleteBlog(blogId) {
      const nuxtApp = useNuxtApp();
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        this.error = "You must be logged in to delete a blog.";
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        await nuxtApp.$api.delete(`/api/v1/blogs/${blogId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.blogs = this.blogs.filter((b) => b._id !== blogId);
        this.filteredBlogs = [...this.blogs];
        this.myBlogs = this.myBlogs.filter((b) => b._id !== blogId);
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.loading = false;
      }
    },

    // Search
    searchBlogs(query) {
      if (!query) {
        this.filteredBlogs = [...this.blogs];
      } else {
        const lowerQuery = query.toLowerCase();
        this.filteredBlogs = this.blogs.filter(
          (blog) =>
            blog.title?.toLowerCase().includes(lowerQuery) ||
            blog.content?.toLowerCase().includes(lowerQuery)
        );
      }
    },
  },
});
