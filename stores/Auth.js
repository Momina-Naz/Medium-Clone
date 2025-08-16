import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null,
  }),

  actions: {
    setAuth(token, user) {
      this.token = token;
      this.user = user;

      // persist in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },

    loadAuthFromStorage() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

// ✅ Auto-load user/token when store is first used
export const useInitAuth = () => {
  const store = useAuthStore();
  if (!store.user && localStorage.getItem("user")) {
    store.loadAuthFromStorage();
  }
  return store;
};
