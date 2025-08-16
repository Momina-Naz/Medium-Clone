import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { useAuthStore } from "./Auth";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blogs: [], // always initialize as array
    loading: false,
    error: null,
  }),

  actions: {
    async fetchBlogs() {
      const nuxtApp = useNuxtApp();
      this.loading = true;
      this.error = null;

      try {
        const response = await nuxtApp.$api.get("api/v1/blogs");

        this.blogs = Array.isArray(response.data.data.blogs)
          ? response.data.data.blogs
          : [];
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.loading = false;
      }
    },

    async createBlog(title, content) {
      const nuxtApp = useNuxtApp();
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        this.error = "You must be logged in to create a blog.";
        console.error(this.error);
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await nuxtApp.$api.post(
          "api/v1/blogs",
          { title, content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const newBlog = response.data.data || response.data;

        // Ensure blogs is an array before pushing
        if (!Array.isArray(this.blogs)) this.blogs = [];
        this.blogs.push(newBlog);

        console.log("Blog created:", newBlog);
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
        console.error("Error creating blog:", this.error);
      } finally {
        this.loading = false;
      }
    },

    async deleteBlog(blogId) {
      const nuxtApp = useNuxtApp();
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        this.error = "You must be logged in to delete a blog.";
        console.error(this.error);
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        await nuxtApp.$api.delete(`/api/v1/blogs/${blogId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(this.blogs)) {
          this.blogs = this.blogs.filter((b) => b._id !== blogId);
        }

        console.log("Blog deleted:", blogId);
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
        console.error("Error deleting blog:", this.error);
      } finally {
        this.loading = false;
      }
    },
  },
});
